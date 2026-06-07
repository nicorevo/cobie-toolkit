# Implementation Plan: COBie React Admin MVP

Status: Approved on 2026-06-06 for task execution.

## Overview

This plan breaks the refined requirements into small, verifiable tasks for the Fase 1 MVP: authenticated multi-tenant COBie CRUD, Supabase/PostgREST API, React Admin resources, RLS smoke tests, and minimal validation/read models. Import/export remains planned for Fase 2 and must not drive browser-side workbook processing in Fase 1.

## Dependency graph

```text
COBie template decision
  -> MVP scope/resource matrix
    -> DB migration review
      -> local Supabase apply/verify
        -> RLS smoke tests
        -> API endpoint contract
        -> generated frontend types
          -> dataProvider/authProvider
            -> React Admin vertical slices
              -> UI/API smoke tests
                -> MVP release checklist
```

## Architecture decisions

- Keep React Admin as the primary CRUD UI; use Material React Table only for custom operational grids.
- Keep Supabase REST/PostgREST as the primary API; use RPC only for non-trivial operations like `create_workbook` and `validate_workbook`.
- Treat the current migrations as starter assets to validate, not automatically trusted production schema.
- Keep all authorization in PostgreSQL RLS and reviewed RPC/Edge Function code; frontend permissions are UX only.
- Keep `.env` and `frontend/.env.local` local-only; ask for real credentials only at verification time.

## Phase 0: Planning gates and scope lock

### Task 1: Resolve MVP scope open questions

**Status:** Completed on 2026-06-06.

**Description:** Convert the open questions in `REQUIREMENTS.md` into explicit MVP decisions before implementation starts.

**Acceptance criteria:**
- [x] Roles beyond organization membership are accepted, deferred, or explicitly scoped.
- [x] Delete behavior is decided as none, soft delete, or physical delete per MVP.
- [x] Resource editability is decided for each MVP resource.

**Verification:**
- [x] `DECISIONS.md` contains the resulting decisions.
- [x] `REQUIREMENTS.md` no longer has unresolved Fase 1 blockers.

**Dependencies:** None.

**Files likely touched:**
- `DECISIONS.md`
- `REQUIREMENTS.md`

**Owner:** Project Manager Agent.

**Estimated scope:** S.

### Task 2: Produce MVP resource and field matrix

**Status:** Completed on 2026-06-06.

**Description:** Define the minimum list/form/filter fields for each MVP React Admin resource.

**Acceptance criteria:**
- [x] Every MVP resource has list fields.
- [x] Manually editable resources have create/edit field sets.
- [x] Filters include workbook and resource-specific searchable fields where applicable.

**Verification:**
- [x] `docs/mvp-resource-matrix.md` exists and maps resources to fields/actions/filters.
- [x] React Admin Agent can implement resources without inventing columns.

**Dependencies:** Task 1.

**Files likely touched:**
- `docs/mvp-resource-matrix.md`
- `docs/react-admin-frontend.md`

**Owner:** Project Manager Agent + React Admin Agent.

**Estimated scope:** M.

### Task 3: Freeze or re-confirm COBie template reference

**Status:** Completed on 2026-06-06.

**Description:** Confirm the COBie spreadsheet template used for schema/resource validation and record checksum/source.

**Acceptance criteria:**
- [x] Template source URL and retrieval date are documented.
- [x] Template checksum is recorded.
- [x] Any difference against existing worksheet map is reported.

**Verification:**
- [x] `docs/template-diff-report.md` exists.
- [x] `reference/` contains the updated catalog or a note explaining why it is deferred.

**Dependencies:** None.

**Files likely touched:**
- `docs/template-diff-report.md`
- `docs/cobie-xls-template-research.md`
- `docs/cobie-v24-worksheet-map.md`
- `reference/*`

**Owner:** COBie Standards Agent.

**Estimated scope:** M.

### Checkpoint: Scope gate

- [x] Tasks 1-3 completed or consciously deferred.
- [x] Human approves Fase 1 scope before migration or frontend implementation.
- [x] Any required credentials or external downloads are requested only for verification steps.

## Phase 1: Database, RLS, and API foundation

### Task 4: Review starter migrations against requirements

**Status:** Completed on 2026-06-06.

**Description:** Audit existing migrations for tenant isolation, `raw_row`, worksheet compatibility, indexes, grants, and destructive operations before applying changes.

**Acceptance criteria:**
- [x] Every exposed application table has an RLS plan.
- [x] Every COBie sheet-compatible table has `organization_id`, `workbook_id`, source metadata, and `raw_row`.
- [x] Any `security definer` function is listed for security review.

**Verification:**
- [x] `docs/db-migration-review.md` lists pass/fail findings and required patches.
- [x] No migration is modified unless the patch is explicitly planned.

**Dependencies:** Tasks 1 and 3.

**Files likely touched:**
- `docs/db-migration-review.md`

**Owner:** Database Architect Agent + Supabase Security Agent.

**Estimated scope:** M.

### Task 5: Apply migrations in local Supabase environment

**Status:** Completed on 2026-06-07 using the remote Linux Docker host `192.168.1.150`. The local workstation remains unsuitable for this verification path. See `docs/local-bootstrap-report.md`.

**Description:** Bring up local Supabase and apply migrations without destructive reset unless explicitly approved.

**Acceptance criteria:**
- [x] Local migration status is known.
- [x] Migration application errors are captured with exact SQL/error context.
- [x] No real credentials are committed.

**Verification:**
- [x] `supabase migration list --local` succeeds.
- [x] `supabase migration up` succeeds.
- [x] `docs/local-bootstrap-report.md` records commands and outcomes.

**Dependencies:** Task 4.

**Files likely touched:**
- `docs/local-bootstrap-report.md`

**Owner:** Database Architect Agent.

**Estimated scope:** S.

### Task 6: Build RLS smoke test fixture

**Status:** Completed on 2026-06-07. The fixture initially exposed a workbook/organization mismatch hole; `20260607095410_enforce_workbook_tenant_scope.sql` now hardens COBie sheet RLS and the smoke test passes on the remote Docker host.

**Description:** Make the cross-tenant smoke test executable and aligned with the schema and membership model.

**Acceptance criteria:**
- [x] Test fixture covers organization A/B isolation.
- [x] SELECT, INSERT, UPDATE, and unauthorized access cases are included.
- [x] The test does not require frontend service keys.

**Verification:**
- [x] `scripts/rls-smoke-tests.sql` has documented setup and assertions.
- [x] `docs/testing-strategy.md` references the smoke procedure.

**Dependencies:** Task 5.

**Files likely touched:**
- `scripts/rls-smoke-tests.sql`
- `docs/testing-strategy.md`
- `docs/rls-policy-patterns.md`

**Owner:** Supabase Security Agent + QA Agent.

**Estimated scope:** M.

### Task 7: Align API contract with actual exposed schema

**Status:** Completed on 2026-06-07. REST docs and OpenAPI now describe the MVP `api`, `cobie`, and `app` PostgREST profiles, read models, table resources, RPC inputs/outputs, auth headers, pagination/filtering, and tenant/RLS behavior.

**Description:** Update REST endpoint docs and OpenAPI with MVP tables/views/RPC that are actually exposed and protected.

**Acceptance criteria:**
- [x] MVP table/view endpoints are listed with filters, pagination, and sorting examples.
- [x] RPC endpoints include input/output and authorization behavior.
- [x] Tenant behavior is documented for each endpoint class.

**Verification:**
- [x] `api/postgrest-endpoints.md` includes all MVP resources.
- [x] `api/openapi.cobie-rest.yaml` validates structurally if a YAML validator is available.

**Dependencies:** Task 5.

**Files likely touched:**
- `api/postgrest-endpoints.md`
- `api/openapi.cobie-rest.yaml`
- `docs/api-rest.md`

**Owner:** API Agent.

**Estimated scope:** M.

### Task 8: Generate or stub Supabase TypeScript types

**Status:** Completed on 2026-06-07 using the remote Linux Docker host `192.168.1.150`. Types were generated from the active local Supabase stack and the frontend now imports `src/lib/supabase/types.ts`.

**Description:** Produce `frontend/src/lib/supabase/types.ts` from local/remote Supabase or document the blocker and keep a placeholder isolated.

**Acceptance criteria:**
- [x] Types are generated from the active schema, or generation is blocked with a clear reason.
- [x] Frontend imports a stable types module path.
- [x] No secrets are embedded in generated files.

**Verification:**
- [x] `scripts/generate-types.sh` succeeds after required env is provided, or `docs/local-bootstrap-report.md` documents the blocker.
- [x] `cd frontend && npm run typecheck` reaches only implementation-related errors, not missing type path errors.

**Dependencies:** Task 5.

**Files likely touched:**
- `frontend/src/lib/supabase/types.ts`
- `frontend/src/lib/supabase/types.placeholder.ts`
- `scripts/generate-types.sh`
- `docs/local-bootstrap-report.md`

**Owner:** Database Architect Agent + React Admin Agent.

**Estimated scope:** S.

### Checkpoint: Foundation

- [x] Migrations apply or blockers are documented.
- [x] RLS smoke procedure is ready.
- [x] API contract reflects actual schema exposure.
- [x] Frontend type strategy is known.

## Phase 2: React Admin vertical slices

### Task 9: Make Supabase auth/data providers usable

**Status:** Implemented on 2026-06-07. Automated lint/typecheck/build passed on the remote Docker host. Manual browser smoke with a real Supabase/Auth session is still pending.

**Description:** Replace placeholders enough for React Admin to authenticate and query Supabase REST for MVP resources.

**Acceptance criteria:**
- [x] Auth provider supports login, logout, checkAuth, checkError, getIdentity.
- [x] Data provider can list at least `workbook`, `facility`, `type`, and `component`.
- [x] Missing env vars fail with a clear local developer error.

**Verification:**
- [x] `cd frontend && npm run typecheck`.
- [x] `cd frontend && npm run build`.
- [ ] Manual dev check reaches React Admin login without a runtime provider crash.

**Dependencies:** Tasks 7 and 8.

**Files likely touched:**
- `frontend/src/admin/authProvider.ts`
- `frontend/src/admin/dataProvider.ts`
- `frontend/src/lib/supabase/client.ts`
- `frontend/src/lib/supabase/types.ts`

**Owner:** React Admin Agent.

**Estimated scope:** M.

### Task 10: Workbook and organization context slice

**Status:** Implemented on 2026-06-07. Automated lint/typecheck/build passed on the remote Docker host. Manual authenticated workbook selection smoke is still pending.

**Description:** Implement the first vertical slice: authenticated user can see/select workbooks in their organization.

**Acceptance criteria:**
- [x] `workbook` resource is registered in React Admin.
- [x] Workbook list is paginated and filterable by name/status.
- [x] Current workbook selection is represented as UI state, not server record cache.

**Verification:**
- [x] `cd frontend && npm run typecheck`.
- [x] `cd frontend && npm run build`.
- [ ] Manual check: login, list workbooks, select current workbook.

**Dependencies:** Task 9.

**Files likely touched:**
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/resources/workbooks.tsx`
- `frontend/src/app/store.ts`
- `frontend/src/app/providers.tsx`
- `docs/react-admin-frontend.md`

**Owner:** React Admin Agent.

**Estimated scope:** M.

### Task 11: Facility/Floor/Space location slice

**Status:** Implemented on 2026-06-07. Automated lint/typecheck/build passed on the remote Docker host. Manual authenticated list/filter smoke is still pending.

**Description:** Implement location-oriented resources with server-side list behavior and workbook filtering.

**Acceptance criteria:**
- [x] Facility, Floor, and Space resources have List views.
- [x] Filters include workbook and name/category where applicable.
- [x] Create/Edit availability matches the resource matrix.

**Verification:**
- [x] `cd frontend && npm run typecheck`.
- [x] `cd frontend && npm run build`.
- [ ] Manual check: list/filter Facility and Space by workbook.

**Dependencies:** Tasks 2 and 10.

**Files likely touched:**
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/resources/facilities.tsx`
- `frontend/src/admin/resources/floors.tsx`
- `frontend/src/admin/resources/spaces.tsx`
- `docs/react-admin-frontend.md`

**Owner:** React Admin Agent.

**Estimated scope:** M.

### Task 12: Type/Component asset slice

**Status:** Implemented on 2026-06-07. Automated lint/typecheck/build passed on the remote Docker host. Manual authenticated Component create/list/filter smoke is still pending.

**Description:** Implement the core asset management slice around Type and Component.

**Acceptance criteria:**
- [x] Type and Component resources have List views.
- [x] Component list shows name, workbook, type, space, serial/asset identifiers where present.
- [x] Filters include workbook, name, type, and space where applicable.

**Verification:**
- [x] `cd frontend && npm run typecheck`.
- [x] `cd frontend && npm run build`.
- [ ] Manual check: create/list/filter Component, respecting tenant and workbook.

**Dependencies:** Tasks 2, 9, and 10.

**Files likely touched:**
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/resources/assets.tsx`
- `frontend/src/admin/resources/components.tsx`
- `docs/react-admin-frontend.md`

**Owner:** React Admin Agent.

**Estimated scope:** M.

### Task 13: Attribute and Document relationship slice

**Status:** Implemented on 2026-06-07. Automated lint/typecheck/build passed on the remote Docker host. Manual authenticated Attribute/Document filter smoke is still pending.

**Description:** Implement metadata resources that point at COBie entities through `SheetName`/`RowName` style references.

**Acceptance criteria:**
- [x] Attribute and Document resources have List views.
- [x] Filters include workbook, sheet/entity target, and row/name where applicable.
- [x] `raw_row` is not editable in standard forms.

**Verification:**
- [x] `cd frontend && npm run typecheck`.
- [x] `cd frontend && npm run build`.
- [ ] Manual check: filter Attribute/Document by target entity.

**Dependencies:** Tasks 2 and 10.

**Files likely touched:**
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/resources/attributes.tsx`
- `frontend/src/admin/resources/documents.tsx`
- `docs/react-admin-frontend.md`

**Owner:** React Admin Agent.

**Estimated scope:** M.

### Checkpoint: Core UI

- [ ] Login and Admin shell work.
- [x] Workbook, Facility/Space, Type/Component, Attribute/Document slices pass typecheck/build.
- [x] No resource loads unbounded data by default.
- [x] Any missing resource fields are added back to `docs/mvp-resource-matrix.md`.

## Phase 3: Validation, quality, and release readiness

### Task 14: Validation read model and UI/API exposure

**Status:** Implemented on 2026-06-07. No SQL changes were required because the validation view/RPC already existed; API smoke verified both the read model and `validate_workbook`.

**Description:** Expose minimal validation findings through API and a React Admin diagnostic view.

**Acceptance criteria:**
- [x] `api.cobie_validation_issues` or equivalent is documented.
- [x] React Admin has a read-only validation issues list.
- [x] Severity, rule, sheet, row, field, and message are visible.

**Verification:**
- [x] `supabase migration up` succeeds if SQL changes are needed. No SQL change was needed for this task.
- [x] `cd frontend && npm run build`.
- [x] Manual/API check: `validate_workbook` or validation view returns findings.

**Dependencies:** Tasks 7, 9, and 10.

**Files likely touched:**
- `api/postgrest-endpoints.md`
- `docs/validation-rules.md`
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/resources/validationIssues.tsx`
- `supabase/migrations/*`

**Owner:** QA Agent + API Agent + React Admin Agent.

**Estimated scope:** M.

### Task 15: Execute RLS and API smoke tests

**Status:** Completed on 2026-06-07 on the remote Linux Docker host `192.168.1.150`.

**Description:** Run the security/API smoke suite against the local or approved remote Supabase environment.

**Acceptance criteria:**
- [x] Cross-tenant SELECT denial is verified.
- [x] Cross-tenant INSERT/UPDATE denial is verified.
- [x] MVP list/filter/create/update API paths are checked.

**Verification:**
- [x] `docs/test-report-mvp.md` records commands, environment, pass/fail, and findings.
- [x] Any failure is classified as blocker, high, medium, or low.

**Dependencies:** Tasks 6 and 7.

**Files likely touched:**
- `docs/test-report-mvp.md`
- `scripts/api-smoke-tests.sh`
- `scripts/rls-smoke-tests.sql`

**Owner:** QA Agent + Supabase Security Agent.

**Estimated scope:** M.

### Task 16: Frontend quality gate

**Status:** Automated quality gate completed on 2026-06-07 on the remote Linux Docker host. Manual UI smoke remains pending until a browser/Auth session is available.

**Description:** Run frontend checks and document remaining UI/runtime risks.

**Acceptance criteria:**
- [x] Typecheck passes.
- [x] Lint passes or findings are documented.
- [x] Build passes.
- [ ] Manual UI smoke covers login, logout, Facility list, Component list/filter, and authorization error handling.

**Verification:**
- [x] `cd frontend && npm run typecheck`.
- [x] `cd frontend && npm run lint`.
- [x] `cd frontend && npm run build`.
- [x] `docs/test-report-mvp.md` includes UI smoke results.

**Dependencies:** Tasks 9-14.

**Files likely touched:**
- `docs/test-report-mvp.md`
- `docs/testing-strategy.md`

**Owner:** QA Agent + React Admin Agent.

**Estimated scope:** S.

### Task 17: MVP release checklist and handoff

**Status:** Completed on 2026-06-07. The checklist maps Fase 1 requirements to evidence and records the remaining manual browser/Auth smoke gate before Fase 2.

**Description:** Consolidate what is done, what remains blocked, and what is deferred to Fase 2.

**Acceptance criteria:**
- [x] Fase 1 success criteria from `REQUIREMENTS.md` are mapped to pass/fail evidence.
- [x] Fase 2 import/export tasks remain clearly deferred.
- [x] Every agent handoff includes skills used and recommended next skills.

**Verification:**
- [x] `docs/mvp-release-checklist.md` exists.
- [x] `agents/HANDOFF_PROTOCOL.md` has been followed for final handoff.

**Dependencies:** Tasks 15 and 16.

**Files likely touched:**
- `docs/mvp-release-checklist.md`
- `docs/test-report-mvp.md`
- `agents/HANDOFF_MVP_RELEASE.md`

**Owner:** Project Manager Agent + QA Agent.

**Estimated scope:** S.

### Checkpoint: MVP complete

- [x] Fase 1 success criteria pass or have explicit blockers.
- [x] RLS/API/UI smoke reports exist.
- [x] Typecheck, lint, and build status are known.
- [ ] Human reviews before starting Fase 2 import/export implementation.

## Fase 2 seed tasks: Import/export discovery only

These are not implementation tasks for the Fase 1 MVP. They can begin only after Fase 1 scope is stable.

### Task 18: Import/export architecture spike

**Status:** Completed on 2026-06-07. Architecture documented without implementing migrations, Edge Functions or parser code.

**Description:** Decide the Edge Function/worker boundary, staging model, and file lifecycle for COBie workbook import/export.

**Acceptance criteria:**
- [x] Server-side processing boundary is documented.
- [x] Staging tables and report shape are proposed.
- [x] Storage bucket/privacy model is documented.

**Verification:**
- [x] `docs/import-export-design.md` exists.
- [x] No browser-side workbook processing is introduced.

**Dependencies:** Checkpoint: MVP complete.

**Files likely touched:**
- `docs/import-export-design.md`
- `docs/import-export-workflow.md`
- `docs/security-guardrails.md`
- `docs/api-rest.md`
- `DECISIONS.md`

**Owner:** Import/Export Agent + Supabase Security Agent.

**Estimated scope:** M.

## Parallelization opportunities

- Default project rule: parallelize whenever work is independent and does not touch the same files or sequential database/security state.
- Tasks 1 and 3 can run in parallel.
- Task 2 can start after Task 1 decisions are mostly stable, while Task 3 continues.
- Tasks 6 and 7 can run in parallel after migrations apply.
- Tasks 11, 12, and 13 can run in parallel after Tasks 2, 9, and 10, as long as they do not edit the same shared `AdminApp.tsx` at the same time without coordination.
- Tasks 15 and 16 can run in parallel after core UI/API slices are implemented.

## Sequential work

- Migration changes must be sequential and reviewed before application.
- RLS policy changes must wait for Database Architect and Supabase Security review.
- Frontend resource implementation should wait for the resource matrix to avoid field churn.
- Import/export implementation waits until Fase 1 MVP is reviewed.

## Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| COBie template has changed since the existing worksheet map | High | Freeze template and produce diff before schema hardening |
| Existing migrations contain RLS/security issues | High | Review migrations before applying or extending them |
| `ra-supabase` does not cover needed filters/reference behavior | Medium | Validate in Task 9; only plan custom dataProvider if needed |
| Frontend package versions are `latest` | Medium | Verify installed versions before applying React/MUI/Vite-specific patterns |
| API schema exposure/grants differ from assumptions | High | Align contract after local Supabase verification |
| Cross-tenant tests require real users/session setup | Medium | Ask for credentials only at smoke-test time and record setup |
| Too many agents touching shared frontend files | Medium | Coordinate `AdminApp.tsx` changes and favor one owner per slice merge |

## Remaining non-blocking follow-ups

- Delete is not exposed in MVP UI, but SQL delete policies still need a follow-up patch decision before production.
- Jobs, Resources, Issues and Picklists are read-only in the first frontend pass.
- Current migrations are starter assets: Task 4 found required patches before MVP release.
- Local Supabase is the first verification target; remote verification waits for credentials.
- Frontend dependency versions must be checked/pinned before applying version-specific React/MUI/Vite patterns.
- Manual browser/Auth smoke remains pending before Fase 2 import/export starts.
- Task 18 completed the import/export architecture spike; implementation awaits follow-up migration/function/parser tasks.
