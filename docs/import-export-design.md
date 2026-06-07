# COBie Import/Export Design

Status: Task 18 complete. Architecture spike, no migration implemented yet.

Date: 2026-06-07

## Scope

This design covers Fase 2 import/export architecture for COBie UK 2.4 spreadsheet workbooks.

It intentionally does not implement SQL migrations, Edge Functions, parser code or React Admin screens. Those must be planned as follow-up tasks after human review of Fase 1 and this design.

## Source Constraints

- Target template: COBie UK 2.4 `COBie Template Q2 (April 2026)`.
- Template checksum and worksheet findings are recorded in `docs/template-diff-report.md`.
- The live template has `Picklist` singular and a column-oriented picklist sheet, so import/export cannot rely on the starter row-oriented `cobie.picklist` model without an explicit mapping step.
- Existing COBie tables are sheet-compatible and preserve `raw_row jsonb`.
- Import/export must not parse serious workbooks in the browser.

## External Documentation Notes

Supabase Edge Functions are server-side TypeScript functions on Deno-compatible Edge Runtime. Supabase documentation notes that Edge Functions should be designed for short-lived, idempotent operations and that heavier long-running work should move to background workers.

Supabase Storage access is controlled through RLS policies on `storage.objects`; private buckets require explicit policies, and service keys bypass Storage RLS, so service keys must remain server-side only.

Supabase RLS remains the authorization boundary for tenant data. Storage and import/export metadata should use the same organization membership model as the existing COBie tables.

Sources:

- https://supabase.com/docs/guides/functions
- https://supabase.com/docs/guides/storage/security/access-control
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/changelog/43644-edge-functions-rate-limits-on-recursive-nested-edge-functions-calls

## Architecture Boundary

### Browser SPA

Allowed:

- Select an organization/workbook.
- Request an import batch.
- Upload the workbook file to an approved private Storage path or signed upload URL.
- Poll import/export status.
- Review validation reports.
- Approve a validated import batch.
- Download an export through a short-lived signed URL.

Forbidden:

- Parse COBie workbook content for authoritative import.
- Hold service role, secret key, JWT secret or Storage secret.
- Commit staged rows directly to typed COBie tables.
- Read staging tables directly.

### Edge Functions

Edge Functions are the public server-side boundary for Fase 2:

- `initiate-import`: validate JWT, organization membership and requested workbook/import mode; create `import_batch`; return Storage upload target.
- `process-import-batch`: validate batch access, read source file from private Storage, identify template version, parse workbook or dispatch worker job.
- `commit-import-batch`: validate user/membership/role, require no blocking errors, call a transactional database commit routine.
- `request-export`: validate membership and workbook access, create `export_job`, dispatch export generation.
- `get-import-report` and `get-export-status` can be RPC/API views unless a function is needed for signed URL issuance.

Edge Functions may use service role internally only after validating the caller. Service role must never be returned to the browser or logged.

### Worker Boundary

Use an Edge Function directly only for small, fast orchestration. Use a worker when work is CPU-heavy, memory-heavy, long-running or retryable:

- large workbook parsing;
- XLSX/XLTX generation;
- checksum calculation for large files;
- batch validation that can exceed function runtime;
- retryable export generation.

The worker can be an Edge Function background task, self-hosted worker, or future Supabase-compatible job runner. The database contract should not depend on the worker implementation.

## Proposed Database Model

Use a new non-exposed schema:

```text
cobie_io
```

Do not add `cobie_io` to PostgREST exposed schemas. Expose only safe `api` views/RPCs.

### `cobie_io.import_batch`

Purpose: one uploaded workbook import attempt.

Suggested columns:

- `id uuid primary key`
- `organization_id uuid not null`
- `target_workbook_id uuid null`
- `created_workbook_id uuid null`
- `import_mode text not null`
- `status text not null`
- `source_bucket text not null`
- `source_path text not null`
- `original_filename text not null`
- `content_type text null`
- `file_size_bytes bigint null`
- `file_sha256 text null`
- `template_name text null`
- `template_checksum text null`
- `detected_standard_version text null`
- `created_by uuid not null`
- `approved_by uuid null`
- `committed_by uuid null`
- `created_at timestamptz not null`
- `uploaded_at timestamptz null`
- `started_at timestamptz null`
- `validated_at timestamptz null`
- `approved_at timestamptz null`
- `committed_at timestamptz null`
- `failed_at timestamptz null`
- `summary jsonb not null default '{}'::jsonb`
- `error_message text null`

Initial `import_mode` values:

- `create_new_workbook`: Fase 2 MVP default. Safer because it avoids destructive replacement.
- `append_to_workbook`: optional only after duplicate strategy is explicit.
- `replace_workbook`: deferred until soft delete/archive semantics are designed.

Initial `status` values:

- `created`
- `uploaded`
- `parsing`
- `validated`
- `ready_for_commit`
- `committing`
- `committed`
- `failed`
- `abandoned`

### `cobie_io.import_sheet`

Purpose: workbook sheet-level structure and header diagnostics.

Suggested columns:

- `id uuid primary key`
- `batch_id uuid not null`
- `organization_id uuid not null`
- `sheet_name text not null`
- `sheet_index integer not null`
- `header_row_number integer null`
- `detected_headers text[] not null`
- `expected_headers text[] not null`
- `missing_headers text[] not null default '{}'::text[]`
- `extra_headers text[] not null default '{}'::text[]`
- `row_count integer not null default 0`
- `status text not null`
- `created_at timestamptz not null`

### `cobie_io.import_row`

Purpose: raw and normalized staging for each worksheet row.

Suggested columns:

- `id uuid primary key`
- `batch_id uuid not null`
- `organization_id uuid not null`
- `sheet_name text not null`
- `source_row_number integer not null`
- `row_name text null`
- `raw_row jsonb not null`
- `typed_row jsonb not null default '{}'::jsonb`
- `row_hash text null`
- `status text not null`
- `created_at timestamptz not null`

Constraints:

- unique `(batch_id, sheet_name, source_row_number)`;
- indexes on `(organization_id, batch_id)`, `(batch_id, sheet_name)`, `(batch_id, sheet_name, row_name)`.

### `cobie_io.import_issue`

Purpose: validation report rows.

Suggested columns:

- `id uuid primary key`
- `batch_id uuid not null`
- `organization_id uuid not null`
- `sheet_name text null`
- `source_row_number integer null`
- `row_name text null`
- `field_name text null`
- `rule_id text not null`
- `code text not null`
- `severity text not null`
- `message text not null`
- `remediation_hint text null`
- `raw_value text null`
- `expected_value text null`
- `is_blocking boolean not null`
- `created_at timestamptz not null`

Indexes:

- `(organization_id, batch_id)`;
- `(batch_id, severity)`;
- `(batch_id, sheet_name)`;
- `(batch_id, code)`.

### `cobie_io.export_job`

Purpose: server-side workbook export request.

Suggested columns:

- `id uuid primary key`
- `organization_id uuid not null`
- `workbook_id uuid not null`
- `status text not null`
- `requested_by uuid not null`
- `template_name text not null`
- `template_checksum text null`
- `target_bucket text not null`
- `target_path text null`
- `generated_filename text null`
- `file_sha256 text null`
- `file_size_bytes bigint null`
- `expires_at timestamptz null`
- `created_at timestamptz not null`
- `started_at timestamptz null`
- `completed_at timestamptz null`
- `failed_at timestamptz null`
- `summary jsonb not null default '{}'::jsonb`
- `error_message text null`

## API Surface

Expose safe read models in `api`, not raw staging tables:

- `api.import_batches`
- `api.import_batch_issues`
- `api.export_jobs`

Planned RPC/Function contracts:

### `POST /functions/v1/initiate-import`

Input:

```json
{
  "organization_id": "uuid",
  "target_workbook_id": "uuid or null",
  "import_mode": "create_new_workbook",
  "filename": "COBie.xlsx",
  "content_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "file_size_bytes": 123456
}
```

Output:

```json
{
  "batch_id": "uuid",
  "bucket": "cobie-workbooks",
  "path": "organizations/<organization_id>/imports/<batch_id>/source/COBie.xlsx",
  "upload_method": "signed_upload_url",
  "upload_url": "short-lived-url"
}
```

### `POST /functions/v1/process-import-batch`

Input:

```json
{
  "batch_id": "uuid"
}
```

Output:

```json
{
  "batch_id": "uuid",
  "status": "validated",
  "summary": {
    "sheets": 19,
    "rows": 1200,
    "errors": 0,
    "warnings": 17
  }
}
```

### `POST /rest/v1/rpc/commit_import_batch`

Input:

```json
{
  "p_batch_id": "uuid"
}
```

Behavior:

- validates membership and role;
- rejects if blocking `import_issue` rows exist;
- locks the batch and target workbook;
- commits rows in one database transaction for `create_new_workbook`;
- leaves staging rows for audit/report after commit.

### `POST /functions/v1/request-export`

Input:

```json
{
  "workbook_id": "uuid",
  "template_name": "COBie Template Q2 (April 2026)"
}
```

Output:

```json
{
  "export_job_id": "uuid",
  "status": "created"
}
```

### `POST /functions/v1/get-export-download`

Input:

```json
{
  "export_job_id": "uuid"
}
```

Output:

```json
{
  "download_url": "short-lived-signed-url",
  "expires_in_seconds": 900
}
```

## Storage Design

Bucket:

```text
cobie-workbooks
```

Bucket policy:

- private;
- no public reads;
- no browser access outside validated upload/download flows;
- service role allowed only in Edge Function/worker;
- browser receives only short-lived signed upload/download URLs or writes through tightly-scoped Storage RLS.

Path convention:

```text
organizations/<organization_id>/imports/<batch_id>/source/<filename>
organizations/<organization_id>/imports/<batch_id>/reports/<report-filename>.json
organizations/<organization_id>/exports/<export_job_id>/<filename>
```

Lifecycle:

- source import file retained for audit while import batch is retained;
- staging rows retained after commit until retention job removes or archives them;
- generated exports expire logically via `export_job.expires_at`;
- signed URLs should be short-lived, initially 15 minutes;
- cleanup policy should remove generated exports after a configurable retention window, for example 7 or 30 days.

## Validation Report Shape

Each issue row must be displayable and filterable without reading the uploaded workbook.

Minimum fields:

- `batch_id`
- `severity`
- `code`
- `rule_id`
- `sheet_name`
- `source_row_number`
- `row_name`
- `field_name`
- `message`
- `remediation_hint`
- `is_blocking`

Minimum codes:

- `STRUCTURE_MISSING_SHEET`
- `STRUCTURE_MISSING_COLUMN`
- `REQUIRED_FIELD_EMPTY`
- `REFERENCE_NOT_FOUND`
- `DUPLICATE_NAME`
- `PICKLIST_INVALID`
- `TYPE_PARSE_ERROR`
- `BUSINESS_RULE_WARNING`
- `TEMPLATE_VERSION_UNSUPPORTED`
- `FILE_TYPE_UNSUPPORTED`
- `FILE_TOO_LARGE`
- `INTERNAL_PROCESSING_ERROR`

Severity:

- `error`: blocks commit.
- `warning`: allows commit after user review.
- `info`: diagnostics only.

## Commit Strategy

Fase 2 MVP should support `create_new_workbook` first.

Rationale:

- avoids destructive delete/replace;
- preserves auditability;
- works cleanly with existing RLS and workbook scoping;
- keeps rollback simple because the commit transaction either inserts the new workbook and rows or inserts nothing.

Deferred:

- replacing existing workbook data;
- partial append with duplicate reconciliation;
- soft delete/archive semantics.

## Export Strategy

Export builds each worksheet from:

1. template/catalog sheet order and headers;
2. typed COBie table columns;
3. `raw_row` for unmapped or unknown original values.

Rules:

- preserve official sheet order from the frozen template catalog;
- emit expected headers even if typed columns are empty;
- prefer typed values for fields edited after import;
- merge unknown extra fields from `raw_row` only when compatible with target template;
- write generated workbook to private Storage;
- return only a short-lived signed URL.

## Security Model

- `cobie_io` is not exposed through PostgREST.
- All `cobie_io` tables still require RLS as defense in depth.
- Public API access goes through `api` views/RPC or Edge Functions.
- Edge Functions validate JWT, organization membership and intended operation before using service role.
- `organization_id`, `workbook_id`, `created_by`, `approved_by` and `committed_by` are assigned or verified server-side.
- Storage object paths must include `organization_id` and batch/export IDs.
- Storage policies must not trust only folder names; they should cross-check batch/job ownership where feasible.
- Logs must not include signed URLs, JWTs, service role keys or raw workbook contents.

## Required Follow-Up Tasks

1. Create migration for `cobie_io` schema, tables, indexes, RLS and safe `api` views.
2. Decide exact role threshold for import commit: `owner/admin/editor` or a new permission.
3. Implement Storage bucket and policies for `cobie-workbooks`.
4. Implement `initiate-import` Edge Function.
5. Implement parser/worker proof of concept for structure validation and staging.
6. Implement validation report views and React Admin read-only report screens.
7. Implement `commit_import_batch` transaction for `create_new_workbook`.
8. Implement export job table and `request-export` flow.
9. Add import/export smoke tests, including cross-tenant Storage and report access denial.
10. Reconcile template catalog differences before enabling production round-trip.
