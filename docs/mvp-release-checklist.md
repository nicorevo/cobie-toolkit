# MVP Release Checklist

Date: 2026-06-07

Current revalidation note: the 2026-06-18 environment check is recorded in
`docs/test-report-mvp.md`. The historical automated passes below remain valid
for the worktree tested on 2026-06-07, but they do not replace a fresh gate on
the current uncommitted changes.

## Release Position

Fase 1 MVP is implementation-complete for automated gates and ready for human browser/Auth review.

This is not a production launch approval. The remaining gate is manual UI smoke with a real or seeded Supabase Auth user.

## Evidence Index

| Area | Evidence | Status |
| --- | --- | --- |
| Scope and decisions | `REQUIREMENTS.md`, `DECISIONS.md`, `docs/mvp-resource-matrix.md` | Pass |
| COBie template reference | `docs/template-diff-report.md`, `reference/cobie_sheet_catalog_v24_uk_2026_q2.review.md` | Pass |
| Database migrations | `docs/local-bootstrap-report.md`, `docs/db-migration-review.md` | Pass on remote Docker host |
| RLS/security smoke | `scripts/rls-smoke-tests.sql`, `docs/test-report-mvp.md` | Pass |
| REST/API contract | `api/postgrest-endpoints.md`, `api/openapi.cobie-rest.yaml` | Pass |
| API smoke | `scripts/api-smoke-tests.sh`, `docs/test-report-mvp.md` | Pass |
| React Admin frontend | `frontend/src/admin/AdminApp.tsx`, `docs/react-admin-frontend.md` | Pass automated gates |
| Frontend quality | lint, typecheck, build in remote Node container | Pass with known bundle warning |
| Browser/Auth smoke | `docs/test-report-mvp.md` | Pending |

## Functional Requirements Mapping

| Requirement | Result | Evidence | Remaining Risk |
| --- | --- | --- | --- |
| RF-01 authenticated access and organization isolation | Pass automated | RLS smoke verifies cross-tenant SELECT/INSERT/UPDATE denial; API smoke verifies tenant-scoped component reads. | Manual UI authorization error rendering pending. |
| RF-02 COBie workbook | Pass automated, UI smoke pending | `workbook` Resource has List/Create/Edit/Show; API docs expose `/workbook` and `create_workbook`; workbook list API smoke passes. | Manual workbook create/select flow pending. |
| RF-03 manual COBie resource management | Pass automated | All MVP resources are registered in React Admin. Editable resources have Create/Edit; Job/Resource/Issue/Picklist are read-only per matrix. | Manual CRUD smoke pending. |
| RF-04 component asset management | Pass automated | `component` Resource has List/Create/Edit/Show with workbook/type/space filters; API create/update smoke passes. | Manual UI create/filter pending. |
| RF-05 entity attributes | Pass automated for MVP CRUD/API | `attribute` Resource has List/Create/Edit/Show; API smoke filters attributes by target sheet. | Deeper reference validation remains part of validation rule expansion. |
| RF-06 document metadata | Pass automated | `document` Resource has List/Create/Edit/Show; API smoke filters documents; file upload remains out of Fase 1. | Storage/file lifecycle deferred to Fase 2. |
| RF-07 REST COBie API | Pass | OpenAPI/PostgREST docs are aligned; API smoke covers all MVP resources and validation RPC. | None for MVP automation. |
| RF-08 paginated non-bulk grids | Pass automated | React Admin Lists use `perPage={25}` and server-side dataProvider. | Browser runtime pagination smoke pending. |
| RF-09 raw row preservation | Pass schema/documentation | Migration review and generated types show COBie sheet tables carry `raw_row`; forms do not edit `raw_row`. | Import/export round-trip deferred to Fase 2. |
| RF-10 minimal validations | Pass for MVP minimum | `api.cobie_validation_issues` and `validate_workbook` are exposed and API-smoked. | Contract/project-specific validation rules deferred by ADR-011. |

## React Admin Resource Coverage

| Resource | Actions | Status |
| --- | --- | --- |
| `workbook` | List, Show, Create, Edit | Pass automated |
| `contact` | List, Show, Create, Edit | Pass automated |
| `facility` | List, Show, Create, Edit | Pass automated |
| `floor` | List, Show, Create, Edit | Pass automated |
| `space` | List, Show, Create, Edit | Pass automated |
| `zone` | List, Show, Create, Edit | Pass automated |
| `type` | List, Show, Create, Edit | Pass automated |
| `component` | List, Show, Create, Edit | Pass automated |
| `system` | List, Show, Create, Edit | Pass automated |
| `attribute` | List, Show, Create, Edit | Pass automated |
| `document` | List, Show, Create, Edit | Pass automated |
| `job` | List, Show | Pass automated |
| `resource` | List, Show | Pass automated |
| `issue` | List, Show | Pass automated |
| `picklist` | List, Show | Pass automated |
| `cobie_validation_issues` | List, Show | Pass automated |

## Automated Gate Results

| Gate | Result | Notes |
| --- | --- | --- |
| RLS smoke | Pass | Uses local development DB fixture; no service role in frontend. |
| API smoke | Pass | Covers all MVP resources, component create/update, cross-tenant denial, validation view and RPC. |
| `npm run typecheck` | Pass | Run in remote Node 22 container. |
| `npm run lint` | Pass | Run in remote Node 22 container. |
| `npm run build` | Pass with warning | React Admin bundle chunk remains above 500 kB. |
| `git diff --check` | Pass | No whitespace or patch formatting issues found after documentation updates. |

## Required Human Review Before Fase 2

- Login/logout in React Admin.
- Workbook create/list/select.
- Facility, Floor, Space, Zone, Type, Component, System CRUD smoke.
- Contact, Attribute and Document CRUD smoke.
- Job, Resource, Issue, Picklist read-only list/show smoke.
- Validation Issues read-only list/show smoke.
- Authorization error rendering when RLS denies a write.

## Fase 2 Deferred Items

- COBie Excel import/export processing.
- Storage private bucket lifecycle for uploaded workbooks and document files.
- Edge Functions for import/export and privileged operations.
- Staging tables, commit workflow and validation report UI.
- Round-trip workbook preservation tests.
- Contract/project-specific validation matrix.
- Production bundle splitting/performance hardening.

## Go/No-Go

| Decision | Status |
| --- | --- |
| Continue to human UI smoke | Go |
| Start Fase 2 import/export implementation | Hold until human review |
| Production deployment | No-go |
