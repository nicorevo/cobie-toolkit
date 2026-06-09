# Migration Plan: COBie normalized database

## Overview

Move the current sheet-compatible COBie schema toward a normalized operational
database. The migration must replace redundant text references with UUID
relationships, use lookup tables only where the value is an actual controlled
category/status/type value, and use junction tables for multi-value references.

The sample workbook `/home/nicro/Scaricati/SampleCOBieSpreadsheet.xlsx` confirms
that most COBie values arrive as spreadsheet strings, so the importer/staging
layer can continue treating source values as text. The normalized operational
tables should not keep redundant text columns once backfill and validation pass.

## Findings From Sample Workbook

- Spreadsheet cell values are mostly strings, including dates, numbers, areas,
  elevations and coordinates.
- `Space.FloorName -> Floor.Name` resolves cleanly: 269/269.
- `Component.TypeName -> Type.Name` resolves cleanly: 3956/3956.
- `Component.Space` is not always single-valued: 321 component rows contain
  comma-separated spaces; all 4277 parsed space tokens resolve to `Space.Name`.
- `Zone.SpaceNames -> Space.Name` resolves cleanly: 260/260 tokens.
- `System.ComponentNames -> Component.Name` resolves cleanly: 779/779 tokens.
- The workbook uses `ExtSystem`, `ExtObject`, `ExtIdentifier` on many sheets,
  while the current schema often uses `external_system`, `external_object`,
  `external_identifier`.
- The sample adds `Area` and `Length` columns on `Type` and `Component`.
- The sample `Issue` sheet uses `SheetName1`, `RowName1`, `SheetName2`,
  `RowName2`, not the current single `sheet_name`, `row_name` pair.
- `PickLists` is wide-format and must be unpivoted into the current
  `cobie.picklist(sheet_name, field_name, value)` shape.

## Architecture Decisions

- Keep `raw_row jsonb` for import/audit evidence.
- Do not keep redundant operational text fields after normalized relationships
  are backfilled and verified.
- Normalize `Component.TypeName` to the natural COBie entity `cobie.type`.
- Normalize `Component.Space` as many-to-many through `cobie.component_space`.
- Model `PickLists` as unpivoted rows in `cobie.picklist`.
- Treat `Area` and `Length` from the sample as imported extra data or
  attributes first; do not add core operational columns until their COBie source
  semantics are confirmed.
- Prefer sheet-specific category lookup tables for the first migration pass
  because the user's examples name them explicitly and the sample picklists are
  sheet/field-specific.

## Proposed Migration Phases

### Phase 1: Compatibility aliases and source mapping

Create importer/source mapping rules before destructive normalization.

Acceptance:

- `ExtSystem`, `ExtObject`, `ExtIdentifier` map to the existing external fields
  or renamed canonical fields consistently.
- `PickLists` wide columns can be unpivoted into `field_name` and `value`.
- `Type.Area`, `Type.Length`, `Component.Area`, `Component.Length` are captured
  in `raw_row` and/or staging diagnostics without being lost.

Likely touched:

- `docs/spec-cobie-normalization-rules.md`
- `docs/validation-rules.md`
- importer/staging design docs or migration comments

### Phase 2: Lookup tables

Create lookup tables for category/status/stage/type-like values, with
`organization_id`, `workbook_id`, uniqueness by workbook and RLS.

Tables:

- `category_contact`, `category_facility`, `category_floor`, `category_space`
- `category_zone`, `category_type`, `asset_type`
- `category_system`, `assembly_type`, `connection_type`
- `category_spare`, `category_resource`, `category_job`, `job_status`
- `impact_type`, `impact_stage`
- `category_document`, `document_stage`
- `category_attribute`, `category_coordinate`
- `issue_type`, `issue_risk`, `issue_chance`, `issue_impact`

Acceptance:

- Each lookup table has tenant/workbook scope.
- RLS is enabled and uses the same tenant/workbook membership checks as COBie
  sheet tables.
- Backfill inserts distinct non-empty, non-`n/a` values by workbook.
- Source text columns are not dropped in this phase.

### Phase 3: Single-object foreign keys

Add and backfill FK columns for true single-object relationships.

Relationships:

- `space.floor_id -> floor.id`
- `component.type_id -> type.id`
- `spare.type_id -> type.id`
- `job.type_id -> type.id`
- `document.approval_contact_id -> contact.id` where resolvable
- `issue.owner_contact_id -> contact.id` where resolvable
- `assembly.parent_id -> assembly.id` where resolvable

Acceptance:

- Backfill has no unresolved required references for `space.floor_id` and
  `component.type_id` on the sample workbook.
- Nullable FK columns remain nullable where COBie/source values can be `n/a`.
- Validation views report unresolved or ambiguous matches.

### Phase 4: Junction tables for multi-value relationships

Create junction tables for list-valued relationships.

Tables:

- `component_space(component_id, space_id, source_position)`
- `zone_space(zone_id, space_id, source_position)`
- `system_component(system_id, component_id, source_position)`
- `assembly_child(parent_assembly_id, child_assembly_id, source_position)`
- `spare_supplier(spare_id, contact_id, source_position)`
- `job_resource(job_id, resource_id, source_position)`
- `job_prior(job_id, prior_job_id, source_position)`

Acceptance:

- Sample `Component.Space` produces 4277 `component_space` rows with zero
  unresolved tokens.
- Sample `Zone.SpaceNames` produces 260 resolved `zone_space` rows.
- Sample `System.ComponentNames` produces 779 resolved `system_component` rows.
- Junction rows enforce workbook/tenant consistency.

### Phase 5: Dynamic references

Normalize `sheet_name`/`row_name` style references without guessing.

Affected sheets:

- `attribute`
- `coordinate`
- `document`
- `impact`
- `connection`
- `issue`

Recommended first step:

- Create a `cobie.row_reference` resolver table or view-backed resolver pattern
  that stores source sheet, source row name, target table, and target row id.

Open decision:

- For `Issue`, use two target pairs matching the sample:
  `issue_target_1_*` and `issue_target_2_*`, or a junction table
  `issue_target(issue_id, target_position, target_table, target_id)`.

Acceptance:

- Existing single `issue.sheet_name` / `issue.row_name` plan is retired.
- Sample `Issue` headers are represented without collapsing two references into
  one.
- Attribute and Coordinate sample targets resolve for known sheets:
  Component, Space, Type and Floor.

### Phase 6: Drop redundant text fields

After backfill and validation pass, remove fields whose values are derivable
from normalized relations.

Drop candidates:

- category/status/stage/type text fields replaced by lookup FKs.
- `space.floor_name`
- `component.type_name`
- `component.space_name`
- `zone.space_names`
- `system.component_names`
- `assembly.parent_name`, `assembly.child_names`, `assembly.assembly_type`
- `connection.connection_type`
- `spare.type_name`, `spare.suppliers`
- `job.type_name`, `job.priors`, `job.resource_names`
- dynamic `sheet_name`/`row_name` columns only after Phase 5 is accepted.

Acceptance:

- No redundant text column remains where the value can be derived from FK or
  junction rows.
- API read models expose display labels for frontend list/show screens.
- `raw_row` still preserves the imported source row.

### Phase 7: API, frontend types and docs

Update API and frontend contracts for normalized resources.

Acceptance:

- `api.cobie_assets` uses `component.type_id`, `component_space`, and related
  names instead of text columns.
- `api.cobie_space_index` uses `space.floor_id`.
- `api/postgrest-endpoints.md` and `api/openapi.cobie-rest.yaml` document new
  fields/resources.
- `frontend/src/lib/supabase/types.ts` is regenerated.

## Verification Checkpoints

After Phases 1-2:

```bash
HOME=$PWD/.local/supabase-home ./node_modules/.bin/supabase migration up
docker exec -i supabase_db_cobie-react-admin psql -v ON_ERROR_STOP=1 -U postgres -d postgres < scripts/rls-smoke-tests.sql
```

After Phases 3-4:

```bash
HOME=$PWD/.local/supabase-home SUPABASE_BIN=$PWD/.local/bin/supabase ./scripts/api-smoke-tests.sh
```

After Phases 5-7:

```bash
HOME=$PWD/.local/supabase-home SUPABASE_BIN=$PWD/.local/bin/supabase ./scripts/generate-types.sh
cd frontend && npm run lint
cd frontend && npm run typecheck
cd frontend && npm run build
```

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Dropping text columns before importer/exporter support is ready | High | Keep drop-column migration separate and only run after backfill validation. |
| `Component.Space` treated as single FK | High | Use `component_space` junction table from the start. |
| Dynamic references collapse multiple targets into one column | High | Design resolver or target junction before dropping `sheet_name`/`row_name`. |
| Wide `PickLists` imported as one row | Medium | Unpivot each populated cell into `(field_name, value)`. |
| Sample-specific `Area` and `Length` become premature core columns | Medium | Preserve in `raw_row`/attributes first, promote only after standard review. |

## Open Questions

1. For category lookup tables, do we keep sheet-specific tables as in the user
   examples, or consolidate into one typed `category` table?
2. For dynamic references, do we prefer a generic resolver table or explicit
   per-sheet nullable FK columns?
3. Should `Area` and `Length` from the sample be modeled as attributes, typed
   optional columns, or import-only raw data?
