# Implementation Plan: Workbook-Scoped Object Navigation

## Overview

Implement the approved navigation model from `docs/spec-workbook-scoped-navigation.md`: workbook selection is mandatory, persists across refreshes, scopes all workbook-owned COBie reads, and enables relationship navigation from Facility to Floors through `floor.facility_id` and from Floor to Spaces through `space.floor_id`. Breadcrumbs must always show human-readable names, including direct deep links.

## Architecture Decisions

- Add a workbook-safe `floor.facility_id -> facility.id` FK and keep navigation tied to normalized DB relationships.
- Keep `currentWorkbookId` in Redux as UI state, backed by localStorage for refresh persistence.
- Add lightweight shared admin helpers/components for workbook scope, route filter creation and breadcrumb rendering.
- Use React Admin/dataProvider reads to resolve missing breadcrumb names on direct deep links.
- Block workbook-scoped COBie resources until a workbook is selected, rather than issuing unscoped list calls.

## Task List

### Phase 1: Workbook Scope Foundation

#### Task 1: Persist Current Workbook Selection

**Description:** Make the Redux `currentWorkbookId` initialize from localStorage and write changes back to localStorage.

**Acceptance criteria:**
- [ ] Selecting a workbook updates Redux and localStorage.
- [ ] Refreshing the page restores `currentWorkbookId`.
- [ ] Selecting another workbook replaces the persisted value.

**Verification:**
- [ ] `npm run typecheck`
- [ ] Manual check in browser devtools localStorage.

**Dependencies:** None.

**Files likely touched:**
- `frontend/src/app/store.ts`
- `frontend/src/admin/resources/workbooks.tsx`

**Estimated scope:** Small.

#### Task 2: Keep Workbook Changes On Dedicated Page

**Description:** Keep workbook selection and changes on the `workbook` resource page without a global change/clear toolbar.

**Acceptance criteria:**
- [ ] No global workbook change/clear toolbar is rendered above the breadcrumb.
- [ ] Users change the current workbook from the `workbook` resource page.
- [ ] The breadcrumb still includes the selected workbook name.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Manual check with selected and unselected states.

**Dependencies:** Task 1.

**Files likely touched:**
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/AdminApp.tsx`

**Estimated scope:** Medium.

#### Task 3: Enforce Workbook-Scoped List Blocking

**Description:** Prevent workbook-scoped COBie resources from rendering unscoped lists when no workbook is selected, and inject selected `workbook_id` into list filters when selected.

**Acceptance criteria:**
- [ ] COBie resources with `workbook_id` show a blocking empty/select-workbook state when no workbook is selected.
- [ ] When selected, list calls include `workbook_id`.
- [ ] `workbook`, `organizations`, `organization_members` remain unblocked.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Manual check in network calls or React Admin request params.

**Dependencies:** Task 1.

**Files likely touched:**
- `frontend/src/admin/dataProvider.ts`
- `frontend/src/admin/components/WorkbookScopedList.tsx`
- resource list files as needed.

**Estimated scope:** Medium.

### Checkpoint: Workbook Scope

- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Workbook selection survives refresh.
- [ ] No workbook-scoped COBie list shows unscoped data.

### Phase 2: Relationship Navigation

#### Task 4: Add Typed Relationship Link Helpers

**Description:** Create shared helpers that build React Admin list URLs with encoded filters and optional breadcrumb context.

**Acceptance criteria:**
- [ ] Helper creates `/admin/<resource>?filter=...` paths with valid JSON filters.
- [ ] Helper supports breadcrumb context for parent route labels.
- [ ] Helper avoids `any` and ad hoc URL string duplication.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`

**Dependencies:** None.

**Files likely touched:**
- `frontend/src/admin/navigation.ts`

**Estimated scope:** Small.

#### Task 5: Add Facility -> Floors And Floor -> Spaces Link Columns

**Description:** Add a final `Floors` column to the Facilities datagrid and a final `Spaces` column to the Floors datagrid. The links open child lists filtered by selected/record `workbook_id` plus the FK id.

**Acceptance criteria:**
- [ ] Facilities list final column is `Floors`.
- [ ] Clicking it opens Floors with `workbook_id` and `facility_id` filters.
- [ ] Floors list final column is `Spaces`.
- [ ] Clicking it opens Spaces with `workbook_id` and `floor_id` filters.
- [ ] Navigation context includes the parent object name for breadcrumb rendering.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Manual Facilities-to-Floors check.
- [ ] Manual check from Floors list to Spaces list.

**Dependencies:** Task 4.

**Files likely touched:**
- `frontend/src/admin/resources/facilities.tsx`
- `frontend/src/admin/resources/floors.tsx`
- `frontend/src/admin/navigation.ts`

**Estimated scope:** Small.

### Checkpoint: Relationship Navigation

- [ ] Floor `Spaces` link filters by the real `space.floor_id` FK.
- [ ] Browser back returns to Floors without losing workbook context.

### Phase 3: Breadcrumbs

#### Task 6: Add Workbook-Aware Breadcrumb Component

**Description:** Render breadcrumbs in the admin layout using current route, selected workbook and optional navigation context.

**Acceptance criteria:**
- [ ] Breadcrumb visible across admin pages.
- [ ] Breadcrumb includes selected workbook name.
- [ ] Breadcrumb includes resource labels and relationship parents when present.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Manual check on Workbooks, Floors and Spaces pages.

**Dependencies:** Tasks 2 and 4.

**Files likely touched:**
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/components/AdminBreadcrumbs.tsx`
- `frontend/src/admin/navigation.ts`

**Estimated scope:** Medium.

#### Task 7: Resolve Breadcrumb Names On Direct Deep Links

**Description:** Ensure breadcrumb labels fetch missing record names for direct show/edit/list-with-filter URLs.

**Acceptance criteria:**
- [ ] `/admin/floor/<id>/show` breadcrumb shows floor name.
- [ ] `/admin/space?filter={"floor_id":"<id>"}` breadcrumb resolves floor name when possible.
- [ ] Loading state is explicit while names are being fetched; raw IDs are not shown as final labels.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] Manual direct-link check.

**Dependencies:** Task 6.

**Files likely touched:**
- `frontend/src/admin/components/AdminBreadcrumbs.tsx`
- `frontend/src/admin/navigation.ts`

**Estimated scope:** Medium.

### Phase 4: Documentation and Final Verification

#### Task 8: Update Frontend Documentation

**Description:** Document workbook-scoped navigation behavior and smoke checks.

**Acceptance criteria:**
- [ ] `docs/react-admin-frontend.md` describes mandatory current workbook selection.
- [ ] Documentation mentions persistent selection, dedicated Workbooks-page selection, and Floor -> Spaces relationship navigation.
- [ ] Smoke test list includes breadcrumb name resolution.

**Verification:**
- [ ] Review docs diff.

**Dependencies:** Tasks 1-7.

**Files likely touched:**
- `docs/react-admin-frontend.md`

**Estimated scope:** Small.

#### Task 9: Final Quality Gate

**Description:** Run the required frontend quality commands.

**Acceptance criteria:**
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Build passes.

**Verification:**
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`

**Dependencies:** Tasks 1-8.

**Files likely touched:** None expected.

**Estimated scope:** Small.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Injecting workbook filters in both UI and dataProvider creates duplicate/conflicting filters. | Medium | Centralize filter behavior in one helper/provider layer and keep resource filters compatible. |
| React Admin URL encoding differs from helper output. | Medium | Use React Admin-compatible `filter` JSON query parameter and verify manually. |
| Breadcrumb direct-link name resolution causes extra reads. | Low | Fetch only labels needed for the current route/filter. |
| Blocking lists without workbook selection disrupts admin lookup workflows. | Medium | Exempt `workbook` and app-level resources; scope lookup resources only after workbook selection. |

## Open Questions

None.
