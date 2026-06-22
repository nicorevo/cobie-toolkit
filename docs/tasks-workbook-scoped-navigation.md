# Tasks: Workbook-Scoped Object Navigation

- [x] Task 1: Persist current workbook selection
  - Acceptance: selecting a workbook updates Redux/localStorage; refresh restores it; clearing removes it.
  - Verify: `cd frontend && npm run typecheck`; manual localStorage check.
  - Files: `frontend/src/app/store.ts`, `frontend/src/admin/resources/workbooks.tsx`.

- [x] Task 2: Keep workbook changes on dedicated page
  - Acceptance: no global workbook change/clear toolbar is rendered; users change workbook from the `workbook` resource page; breadcrumb still shows selected workbook name.
  - Verify: `cd frontend && npm run typecheck && npm run lint`; manual selected/unselected check.
  - Files: `frontend/src/admin/AdminApp.tsx`, `frontend/src/admin/resources/workbooks.tsx`, `frontend/src/admin/components/AdminBreadcrumbs.tsx`.

- [x] Task 3: Block unscoped workbook-owned COBie lists
  - Acceptance: workbook-scoped COBie lists require selected workbook; selected workbook injects `workbook_id`; workbook/app resources remain accessible.
  - Verify: `cd frontend && npm run typecheck && npm run lint`; manual request/filter check.
  - Files: `frontend/src/admin/dataProvider.ts`, `frontend/src/admin/components/WorkbookScopedList.tsx`, resource list files as needed.

- [x] Task 4: Add typed relationship link helpers
  - Acceptance: helper builds React Admin list paths with encoded filters and optional breadcrumb context; no `any`.
  - Verify: `cd frontend && npm run typecheck && npm run lint`.
  - Files: `frontend/src/admin/navigation.ts`.

- [x] Task 5: Add Facility -> Floors and Floor -> Spaces link columns
  - Acceptance: Facilities datagrid final column is `Floors`; link filters by `workbook_id` and `facility_id`; Floors datagrid final column is `Spaces`; link filters by `workbook_id` and `floor_id`; breadcrumb context includes parent names.
  - Verify: `cd frontend && npm run typecheck && npm run lint`; manual Facilities-to-Floors and Floors-to-Spaces checks.
  - Files: `frontend/src/admin/resources/facilities.tsx`, `frontend/src/admin/resources/floors.tsx`, `frontend/src/admin/navigation.ts`.

- [x] Task 6: Add workbook-aware breadcrumbs
  - Acceptance: breadcrumb appears in admin layout; includes selected workbook name; includes resource labels and relationship parents.
  - Verify: `cd frontend && npm run typecheck && npm run lint`; manual Workbooks/Floors/Spaces check.
  - Files: `frontend/src/admin/AdminApp.tsx`, `frontend/src/admin/components/AdminBreadcrumbs.tsx`, `frontend/src/admin/navigation.ts`.

- [x] Task 7: Resolve breadcrumb names on direct deep links
  - Acceptance: direct show/edit/list-with-filter URLs render names, not raw IDs; explicit loading while labels resolve.
  - Verify: `cd frontend && npm run typecheck && npm run lint`; manual deep-link check.
  - Files: `frontend/src/admin/components/AdminBreadcrumbs.tsx`, `frontend/src/admin/navigation.ts`.

- [x] Task 8: Update frontend documentation
  - Acceptance: docs describe mandatory workbook selection, persistence, dedicated Workbooks-page selection, Floor -> Spaces navigation and breadcrumb name resolution.
  - Verify: review docs diff.
  - Files: `docs/react-admin-frontend.md`.

- [x] Task 9: Final quality gate
  - Acceptance: typecheck, lint and build pass.
  - Verify: `cd frontend && npm run typecheck`; `cd frontend && npm run lint`; `cd frontend && npm run build`.
  - Files: none expected.
  - Status: passed on remote `codex@192.168.1.150` inside `cobie-frontend-dev`.
