# Spec: Workbook-Scoped Object Navigation

## Assumptions

1. The feature targets the existing Vite React Admin SPA under `frontend/`.
2. Workbook selection is UI/application state and may stay in Redux; server data remains owned by React Admin/PostgREST.
3. Selecting a current workbook means all COBie resource list calls, lookup calls and reference inputs should be constrained to that `workbook_id`, except the `workbook` list itself and app-level organization resources.
4. Facility-to-Floor navigation uses the normalized FK `floor.facility_id -> facility.id`.
5. Floor-to-Space navigation must use the actual normalized FK `space.floor_id`.
6. Breadcrumb state is derived from routes, current workbook and selected records, not from duplicated server record caches in Redux.

## Objective

Build a React Admin navigation model that lets an operator move through COBie objects by workbook and by relationship, preserving workbook scope at every step.

The core axiom is:

> The interface must allow navigation from one COBie object to another through workbook-safe relationships, like database foreign keys do. From Floor I can go to Spaces and come back without losing workbook context.

Primary user stories:

- As an operator, I select one workbook and every COBie table view shows only rows from that workbook.
- As an operator, I open Facilities and use the final `Floors` column to navigate to floors linked to that facility.
- As an operator, I open Floors and use the final `Spaces` column to navigate to spaces for that floor.
- As an operator, I can see a breadcrumb trail such as `Workbooks / <Workbook> / Floors / <Floor> / Spaces`.
- As an operator, I can use browser back/forward or breadcrumb links to return to parent objects without losing filters.

## Tech Stack

- Vite SPA
- React
- TypeScript strict
- Redux Toolkit for UI state only
- React Admin resources, list controllers, filters and routing
- Material UI for layout/breadcrumb controls
- Supabase/PostgREST via `ra-supabase`
- PostgreSQL/Supabase RLS remains the authorization boundary

Version note: use the versions declared in `frontend/package.json`; do not assume Next.js, SSR, Server Components, API routes, `@supabase/ssr`, React Native patterns or service-role frontend access.

## Commands

Run from `frontend/`:

```bash
npm run typecheck
npm run lint
npm run build
npm run dev -- --host 127.0.0.1
```

Run from repo root for database/RLS work only if schema or policy changes are introduced:

```bash
./scripts/api-smoke-tests.sh
```

## Project Structure

```text
frontend/src/admin/AdminApp.tsx
  React Admin layout/resource registration.

frontend/src/admin/AdminMenu.tsx
  Main resource navigation.

frontend/src/admin/dataProvider.ts
  ra-supabase wrapper; candidate place for global workbook filter injection.

frontend/src/admin/resources/
  Resource list/show/create/edit files for workbook, facility, floor, space and shared reference inputs.

frontend/src/app/store.ts
  Redux UI state for current workbook selection.

docs/spec-workbook-scoped-navigation.md
  This specification.

docs/react-admin-frontend.md
  Frontend documentation to update after implementation.

api/postgrest-endpoints.md
  API documentation to update only if endpoint/query contract changes.
```

## Navigation Model

### Workbook Scope

The selected workbook is a global UI scope.

- `workbook` resource remains unscoped so users can select/change workbook.
- A workbook must be selected before workbook-scoped COBie resources can be browsed.
- The selected workbook persists across browser refreshes.
- Workbook changes happen from the dedicated `workbook` resource page, not from a global change/clear toolbar.
- COBie resources with `workbook_id` are scoped automatically to the selected workbook for list and reference reads.
- Lookup resources such as `category_floor` and `category_space` are also scoped to the selected workbook.
- Create/edit forms should default `workbook_id` to the selected workbook when available and keep `organization_id` consistent with that workbook.
- RLS and DB constraints remain mandatory; frontend filtering is a usability rule, not a security rule.

### Relationship Links

Relationship navigation should use route/query state that React Admin can translate into filters.

Recommended route intent:

```text
/admin/floor?filter={"workbook_id":"<workbookId>","facility_id":"<facilityId>"}
/admin/space?filter={"workbook_id":"<workbookId>","floor_id":"<floorId>"}
```

Facility -> Floors:

- Final column label: `Floors`.
- Link target: `floor` list filtered by `workbook_id` and `facility_id`.
- This uses the real FK `floor.facility_id -> facility.id`.

Floor -> Spaces:

- Final column label: `Spaces`.
- Link target: `space` list filtered by `workbook_id` and `floor_id`.
- This uses the real FK `space.floor_id -> floor.id`.

Object reference fields:

- Existing fields such as `Space.floor_id` should be linkable to the referenced record where useful.
- Linkable fields must preserve `workbook_id` in the destination context.

## Breadcrumb Model

Add an application breadcrumb visible in the React Admin layout above content.

Breadcrumb requirements:

- Shows the current workbook when selected.
- Shows an explicit "select a workbook" state when none is selected.
- Always shows selected object names, including direct deep links; if route context lacks the label, the UI must fetch the record name before rendering the final label.
- Shows relationship trails when navigating through link columns.
- Provides clickable ancestors that restore the corresponding route/filter.
- Does not duplicate full server records in Redux.

Example trails:

```text
Workbooks / Sample Workbook / Floors / Level 01 / Spaces
```

Implementation can store lightweight navigation context in URL query/meta state when following relationship links, for example parent labels and parent routes. If a page is loaded directly without that context, the breadcrumb must fetch the needed record names using React Admin/dataProvider reads and then render names rather than raw IDs.

## Code Style

Prefer small typed helpers over ad hoc string concatenation for filter links.

```tsx
type ResourceFilter = Record<string, string>;

function buildResourceListPath(resource: string, filter: ResourceFilter) {
  return `/admin/${resource}?filter=${encodeURIComponent(JSON.stringify(filter))}`;
}
```

Conventions:

- Keep TypeScript strict; avoid `any`.
- Keep workbook-aware helpers in shared frontend/admin files, not duplicated in each resource.
- Use React Admin primitives for `List`, `Datagrid`, `ReferenceField`, filters and route navigation.
- Keep Redux limited to `currentWorkbookId` and lightweight UI preferences.

## Testing Strategy

Automated:

- Typecheck verifies strict TypeScript and typed route/filter helpers.
- Lint verifies import/style issues.
- Build verifies Vite and React Admin compile.

Manual smoke with authenticated Supabase session:

- Select workbook A, open Facility/Floor/Space lists and confirm only workbook A rows are requested/shown.
- Switch to workbook B and confirm filters update.
- Refresh the browser and confirm workbook B remains selected.
- When no workbook is selected, confirm workbook-scoped resources show a blocking empty state instead of unscoped COBie data.
- Facility `Floors` link opens floors with `facility_id` filter.
- Floor `Spaces` link opens spaces with `floor_id` filter.
- Open a direct deep link such as `/admin/floor/<id>/show` and confirm the breadcrumb shows the floor name, not the raw ID.
- Breadcrumb links return to parent routes and preserve workbook context.
- Direct page load of `/admin/space` without breadcrumb context still scopes to current workbook when selected.

RLS/API smoke is required only if schema, grants, policies or exposed API contracts change.

## Boundaries

- Always: preserve workbook scope on COBie list/reference calls.
- Always: keep RLS as the real authorization boundary.
- Always: use `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; no service key in frontend.
- Always: run `npm run typecheck`, `npm run lint` and `npm run build` before marking implementation complete.
- Ask first: adding any navigation link that implies a database relationship not present in the normalized schema.
- Ask first: adding relationship links that require new DB relationships not already approved in this spec.
- Ask first: adding production dependencies.
- Ask first: replacing `ra-supabase` with a custom dataProvider.
- Never: implement authorization only by hiding UI actions.
- Never: introduce Next.js, SSR, Server Components, API routes or `@supabase/ssr`.
- Never: edit applied migrations to force navigation behavior.

## Success Criteria

- Selecting a workbook globally constrains every workbook-scoped COBie resource list to that `workbook_id`.
- The selected workbook persists across browser refreshes.
- Changing or clearing the current workbook is available only from the `workbook` resource page.
- Workbook-scoped COBie resources are blocked until a workbook is selected.
- Workbook-scoped lookup/reference inputs only show rows from the selected or form workbook.
- Facilities list has a final `Floors` navigation column.
- Facility-to-Floors navigation filters by both `workbook_id` and `facility_id`.
- Floors list has a final `Spaces` navigation column.
- Floor-to-Spaces navigation filters by both `workbook_id` and `floor_id`.
- Breadcrumb appears in the admin layout and reflects workbook/resource/object relationship navigation.
- Breadcrumb labels always use human-readable names, fetching missing labels on direct deep links.
- Browser back/forward remains usable because navigation state is encoded in routes/query parameters.
- Typecheck, lint and build pass.
- `docs/react-admin-frontend.md` is updated with the workbook-scoped navigation behavior.

## Open Questions

None.
