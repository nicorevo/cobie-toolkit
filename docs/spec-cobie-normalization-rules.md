# Spec: COBie normalization rules

## Assumptions

1. The target model is normalized: operational columns that duplicate values
   obtainable from a referenced row must be removed after backfill.
2. Every new normalized table is scoped by `organization_id` and `workbook_id`.
3. During migration only, old text columns can coexist with new FK columns so
   data can be backfilled and verified. The final accepted model must not keep
   both when they represent the same fact.
4. Text-list fields such as `space_names`, `component_names`, `child_names`,
   component `Space`, `resource_names` and `suppliers` require junction tables,
   not one UUID column, because a COBie cell can contain more than one
   referenced value.
5. `raw_row` remains allowed only as immutable import/audit evidence. It is not
   a query model and must not be used to justify redundant operational columns.
6. `Component.TypeName` must normalize to the natural COBie entity
   `cobie.type.id`, not to an extra `component_type` lookup.

## Objective

Define a repository-wide normalization contract for COBie tables. The user
should be able to query and edit by stable UUID references and lookup rows,
without duplicating values that can already be obtained through those
relationships.

Success means every currently modeled COBie table has explicit rules for:

- lookup tables derived from category/type-like text fields;
- single-row references converted from text columns to UUID foreign keys;
- multi-value text references converted to junction tables;
- redundant text fields removed from the operational schema after migration;
- tenant/workbook-safe foreign keys and indexes;
- RLS/API/documentation updates required before release.

## Tech Stack

- PostgreSQL through Supabase migrations in `supabase/migrations/`.
- Supabase RLS and PostgREST as the API layer.
- React Admin frontend consumes generated Supabase types from
  `frontend/src/lib/supabase/types.ts`.
- COBie tables remain in schema `cobie`; API read models remain in schema
  `api`.

## Commands

Database migration status:

```bash
HOME=$PWD/.local/supabase-home ./node_modules/.bin/supabase migration list --local
```

Apply local migrations:

```bash
HOME=$PWD/.local/supabase-home ./node_modules/.bin/supabase migration up
```

Generate frontend types:

```bash
HOME=$PWD/.local/supabase-home SUPABASE_BIN=$PWD/.local/bin/supabase ./scripts/generate-types.sh
```

RLS smoke test:

```bash
docker exec -i supabase_db_cobie-react-admin psql -v ON_ERROR_STOP=1 -U postgres -d postgres < scripts/rls-smoke-tests.sql
```

API smoke test:

```bash
HOME=$PWD/.local/supabase-home SUPABASE_BIN=$PWD/.local/bin/supabase ./scripts/api-smoke-tests.sh
```

Frontend checks:

```bash
cd frontend && npm run lint
cd frontend && npm run typecheck
cd frontend && npm run build
```

## Project Structure

- `supabase/migrations/`: schema, backfill, drop-column, index, RLS and grant
  migrations.
- `reference/relationships.json`: relationship catalog to update with canonical
  normalized UUID references.
- `docs/data-model-cobie.md`: high-level data model and compatibility notes.
- `docs/validation-rules.md`: validation distinctions and unresolved lookups.
- `api/postgrest-endpoints.md`: PostgREST resources and filterable fields.
- `api/openapi.cobie-rest.yaml`: documented REST contract.
- `frontend/src/lib/supabase/types.ts`: generated types after migrations.

## Code Style

Use singular snake_case names and explicit constraint names. Add the normalized
relationship, backfill it, verify it, then remove the redundant text field from
the final operational model.

```sql
create table if not exists cobie.category_zone (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_zone_workbook_id_category_name_key unique (workbook_id, category_name)
);

alter table cobie.zone
  add column if not exists category_zone_id uuid
    references cobie.category_zone(id);

create index if not exists idx_zone_category_zone_id
  on cobie.zone(category_zone_id);

-- After successful backfill and validation:
alter table cobie.zone
  drop column if exists category;
```

Do not add `not null` to normalized FK columns until the source field is COBie
mandatory or contractually mandatory and backfill has proven no unresolved
values. Optional relationships can remain nullable, but they must still replace
the redundant text value.

## Normalization Rules

### Common Lookup Table Rules

Each lookup table must include:

- `id uuid primary key default gen_random_uuid()`;
- `organization_id uuid not null references app.organizations(id)`;
- `workbook_id uuid not null references cobie.workbook(id)`;
- one non-null display column such as `category_name`, `type_name`,
  `asset_type_name`, `status_name`, `risk_name`, or `stage_name`;
- `inserted_at` and `updated_at`;
- `unique (workbook_id, <display_column>)`;
- index on `(organization_id, workbook_id)`;
- RLS enabled with policies equivalent to current COBie sheet policies.

### Common FK Rules

For each normalized text field:

- add `<semantic>_id uuid` or `<referenced_table>_id uuid`;
- scope matching by `workbook_id` during backfill;
- validate missing or ambiguous matches through `api.cobie_validation_issues`;
- index all FK columns;
- drop the source text column once backfill and validation pass, unless the
  value is not derivable from the referenced row.

For foreign keys across workbook-scoped COBie records, prefer composite
constraints that include workbook scope where practical:

```sql
foreign key (workbook_id, space_id) references cobie.space(workbook_id, id)
```

If PostgreSQL requires a supporting unique constraint, add it explicitly and
document why.

### Common Junction Rules

For multi-value text fields, create junction tables with:

- `id`, `organization_id`, `workbook_id`;
- parent row id;
- referenced row id or lookup id;
- `source_position integer` when parser order is known;
- `unique (workbook_id, parent_id, referenced_id)` when the target exists;
- RLS policies equivalent to other COBie tables.

Do not keep the original list column once the junction table is populated and
validated. If parser diagnostics are needed, store unresolved tokens in a
staging/import diagnostic table or validation view, not in the normalized
business table.

## Table-by-Table Rules

| Source table | Source field | Add normalized target | Rule |
|---|---|---|---|
| `cobie.contact` | `category` | `cobie.category_contact.category_name`, `contact.category_contact_id` | Replace text with lookup FK. |
| `cobie.facility` | `category` | `cobie.category_facility.category_name`, `facility.category_facility_id` | Replace text with lookup FK. |
| `cobie.floor` | `category` | `cobie.category_floor.category_name`, `floor.category_floor_id` | Replace text with lookup FK. |
| `cobie.space` | `category` | `cobie.category_space.category_name`, `space.category_space_id` | Replace text with lookup FK. |
| `cobie.space` | `floor_name` | `space.floor_id -> cobie.floor.id` | Replace text with FK. |
| `cobie.zone` | `category` | `cobie.category_zone.category_name`, `zone.category_zone_id` | Replace text with lookup FK. |
| `cobie.zone` | `space_names` | `cobie.zone_space(zone_id, space_id)` | Replace list text with junction table. |
| `cobie.type` | `category` | `cobie.category_type.category_name`, `type.category_type_id` | Replace text with lookup FK. |
| `cobie.type` | `asset_type` | `cobie.asset_type.asset_type_name`, `type.asset_type_id` | Replace text with lookup FK. |
| `cobie.component` | `type_name` | `component.type_id -> cobie.type.id` | Replace text with natural COBie entity FK. Do not create `component_type`. |
| `cobie.component` | `space_name` / COBie `Space` | `cobie.component_space(component_id, space_id)` | Replace text with junction table because the sample workbook contains comma-separated multi-space components. |
| `cobie.system` | `category` | `cobie.category_system.category_name`, `system.category_system_id` | Replace text with lookup FK. |
| `cobie.system` | `component_names` | `cobie.system_component(system_id, component_id)` | Replace list text with junction table. |
| `cobie.assembly` | `assembly_type` | `cobie.assembly_type.assembly_type_name`, `assembly.assembly_type_id` | Replace text with lookup FK. |
| `cobie.assembly` | `parent_name` | `assembly.parent_id -> cobie.assembly.id` | Replace text with self-reference FK. |
| `cobie.assembly` | `child_names` | `cobie.assembly_child(parent_assembly_id, child_assembly_id)` | Replace list text with self-reference junction table. |
| `cobie.connection` | `connection_type` | `cobie.connection_type.type_name`, `connection.connection_type_id` | Replace text with lookup FK. |
| `cobie.connection` | `row_name_1`, `row_name_2` | target resolver or typed FK columns | Must be normalized before text removal; target depends on `sheet_name`. |
| `cobie.spare` | `category` | `cobie.category_spare.category_name`, `spare.category_spare_id` | Replace text with lookup FK. |
| `cobie.spare` | `type_name` | `spare.type_id -> cobie.type.id` | Replace text with FK. |
| `cobie.spare` | `suppliers` | `cobie.spare_supplier(spare_id, contact_id)` | Replace list text with junction table where suppliers resolve to contacts. |
| `cobie.resource` | `category` | `cobie.category_resource.category_name`, `resource.category_resource_id` | Replace text with lookup FK. |
| `cobie.job` | `category` | `cobie.category_job.category_name`, `job.category_job_id` | Replace text with lookup FK. |
| `cobie.job` | `status` | `cobie.job_status.status_name`, `job.status_id` | Replace text with lookup FK. |
| `cobie.job` | `type_name` | `job.type_id -> cobie.type.id` | Replace text with FK. |
| `cobie.job` | `resource_names` | `cobie.job_resource(job_id, resource_id)` | Replace list text with junction table. |
| `cobie.job` | `priors` | `cobie.job_prior(job_id, prior_job_id)` | Replace list text with self-reference junction table. |
| `cobie.impact` | `impact_type` | `cobie.impact_type.type_name`, `impact.impact_type_id` | Replace text with lookup FK. |
| `cobie.impact` | `impact_stage` | `cobie.impact_stage.stage_name`, `impact.impact_stage_id` | Replace text with lookup FK. |
| `cobie.impact` | `sheet_name`, `row_name` | target resolver or typed FK columns | Must be normalized before text removal; target depends on `sheet_name`. |
| `cobie.document` | `category` | `cobie.category_document.category_name`, `document.category_document_id` | Replace text with lookup FK. |
| `cobie.document` | `approval_by` | `document.approval_contact_id -> cobie.contact.id` | Replace text with FK when the approver is a contact. |
| `cobie.document` | `stage` | `cobie.document_stage.stage_name`, `document.stage_id` | Replace text with lookup FK. |
| `cobie.document` | `sheet_name`, `row_name` | target resolver or typed FK columns | Must be normalized before text removal; target depends on `sheet_name`. |
| `cobie.attribute` | `category` | `cobie.category_attribute.category_name`, `attribute.category_attribute_id` | Replace text with lookup FK. |
| `cobie.attribute` | `sheet_name`, `row_name` | target resolver or typed FK columns | Must be normalized before text removal; target depends on `sheet_name`. |
| `cobie.coordinate` | `category` | `cobie.category_coordinate.category_name`, `coordinate.category_coordinate_id` | Replace text with lookup FK. |
| `cobie.coordinate` | `sheet_name`, `row_name` | target resolver or typed FK columns | Must be normalized before text removal; target depends on `sheet_name`. |
| `cobie.issue` | `type` | `cobie.issue_type.type_name`, `issue.issue_type_id` | Replace text with lookup FK. |
| `cobie.issue` | `risk` | `cobie.issue_risk.risk_name`, `issue.risk_id` | Replace text with lookup FK. |
| `cobie.issue` | `chance` | `cobie.issue_chance.chance_name`, `issue.chance_id` | Replace text with lookup FK. |
| `cobie.issue` | `impact` | `cobie.issue_impact.impact_name`, `issue.issue_impact_id` | Replace text with lookup FK. |
| `cobie.issue` | `owner` | `issue.owner_contact_id -> cobie.contact.id` | Replace text with FK when the owner is a contact. |
| `cobie.issue` | `sheet_name`, `row_name` | target resolver or typed FK columns | Must be normalized before text removal; target depends on `sheet_name`. |
| `cobie.picklist` | `sheet_name`, `field_name`, `value` | no new table initially | Picklist already behaves as a workbook-scoped value catalog. |

## Testing Strategy

Schema checks:

- migrations apply locally without modifying old migration files;
- every new table has `organization_id`, `workbook_id`, indexes and RLS;
- every lookup has a uniqueness rule by workbook and value;
- no operational table keeps both a redundant text field and the FK/lookup that
  determines that same value in the final migration state.

Data checks:

- backfill extracts lookup rows from existing text fields;
- duplicate source text in the same workbook maps to one lookup row;
- cross-workbook values with the same display name remain separate;
- multi-value fields preserve every resolved relationship in junction tables;
- unresolved source values are reported by validation/import diagnostics instead
  of being retained as duplicate business columns.

Security checks:

- RLS smoke tests cover at least one new lookup table and one new junction
  table for same-tenant allow and cross-tenant deny;
- INSERT and UPDATE policies include `WITH CHECK`;
- no frontend code receives or uses `service_role`.

API checks:

- PostgREST can filter by normalized UUID fields and expose related display
  values through joins or read models;
- read models expose normalized display fields without bypassing RLS;
- API docs list newly exposed resources or explain why they stay internal.

## Boundaries

- Always: create new migrations for schema changes.
- Always: remove redundant operational text columns once their normalized
  relationship has been backfilled and verified.
- Always: preserve imported source data in `raw_row` or import/audit records
  when needed for traceability, not as duplicate query fields.
- Always: enable RLS and explicit policies on exposed normalized tables.
- Always: update docs and generated Supabase types after schema changes.
- Always: normalize `component.type_name` to the natural COBie `type` entity.
- Ask first: making any normalized FK `not null`.
- Ask first: changing importer/exporter parsing semantics.
- Ask first: keeping any redundant text column in the final operational schema.
- Never: edit already-applied migrations in shared environments.
- Never: lose source values during normalization; preserve them through
  backfill, diagnostics, `raw_row`, or audited import records.
- Never: use frontend authorization as a substitute for RLS.

## Success Criteria

- This spec is reviewed and accepted before implementation starts.
- A follow-up plan lists migrations, docs, API, type generation and smoke tests.
- All normalized tables, FKs and junction tables are tenant/workbook-scoped.
- Redundant text columns are absent from the final operational schema wherever
  the same value is derivable from a related entity or lookup.
- `zone.space_names`, `system.component_names`, `assembly.child_names`,
  `component.space_name`, `job.resource_names`, `job.priors` and
  `spare.suppliers` become junction tables, not text-list columns.
- React Admin and API resources are updated to use normalized IDs and read
  models for display labels.
- RLS, API smoke, lint, typecheck and build commands pass after implementation.

## Open Questions

1. Should category lookup tables be sheet-specific as specified here
   (`category_zone`, `category_contact`, etc.) or consolidated into one generic
   `category` table with `sheet_name`?
2. What delimiter rules should be used for multi-value COBie cells before
   creating junction rows?
3. Should dynamic `sheet_name` plus `row_name` references get a polymorphic
   resolver table, or should each dynamic reference become typed nullable FK
   columns for allowed target sheets?
4. Which existing text fields are COBie names that remain natural attributes
   of their own row, and which are references that must be removed after
   normalization?
