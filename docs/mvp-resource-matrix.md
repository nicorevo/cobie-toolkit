# MVP Resource Matrix

Status: Task 2 complete, ready for React Admin implementation.

## Scope rules

- React Admin Datagrid is the default for all MVP resources.
- Material React Table is not needed for the first CRUD pass; reserve it for future operational grids.
- Every List must be server-side paginated and filterable by `workbook_id` when the backing resource has it.
- Create/Edit must not expose `raw_row`.
- Delete is not exposed in the MVP UI.
- Document files are metadata-only in Fase 1; file upload is Fase 2+.

## Resource summary

| Resource | Backing object | MVP actions | Primary filters | Notes |
|---|---|---|---|---|
| Workbooks | `cobie.workbook` / `api.create_workbook` | List, Create, Edit, Show | `name`, `status` | Current workbook selection is UI state. |
| Contacts | `cobie.contact` | List, Create, Edit, Show | `workbook_id`, `email`, `company` | Email is primary display. |
| Facilities | `cobie.facility` | List, Create, Edit, Show | `workbook_id`, `name`, `category` | Core location root. |
| Floors | `cobie.floor` | List, Create, Edit, Show | `workbook_id`, `name`, `category` | References Facility by workbook context. |
| Spaces | `cobie.space` | List, Create, Edit, Show | `workbook_id`, `name`, `floor_name`, `category` | Uses textual `floor_name` initially. |
| Zones | `cobie.zone` | List, Create, Edit, Show | `workbook_id`, `name`, `category` | `space_names` remains textual. |
| Types | `cobie.type` | List, Create, Edit, Show | `workbook_id`, `name`, `category`, `asset_type` | Existing frontend file is `assets.tsx`; label should be Type. |
| Components | `cobie.component` | List, Create, Edit, Show | `workbook_id`, `name`, `type_name`, `space_name` | Core asset slice. |
| Systems | `cobie.system` | List, Create, Edit, Show | `workbook_id`, `name`, `category` | `component_names` remains textual. |
| Attributes | `cobie.attribute` | List, Create, Edit, Show | `workbook_id`, `sheet_name`, `row_name`, `name` | Preserve `SheetName`/`RowName` semantics. |
| Documents | `cobie.document` | List, Create, Edit, Show | `workbook_id`, `sheet_name`, `row_name`, `name`, `category` | Metadata only; no file upload. |
| Jobs | `cobie.job` | List, Show | `workbook_id`, `name`, `status`, `type_name` | Read-only first pass. |
| Resources | `cobie.resource` | List, Show | `workbook_id`, `name`, `category` | Read-only first pass. |
| Issues | `cobie.issue` | List, Show | `workbook_id`, `name`, `type`, `risk` | Read-only first pass pending template diff review. |
| Picklists | `cobie.picklist` | List, Show | `workbook_id`, `sheet_name`, `field_name`, `value` | Read-only; current schema may not match Q2 2026 Picklist sheet. |
| Validation Issues | `api.cobie_validation_issues` | List, Show | `workbook_id`, `severity`, `sheet_name`, `rule_id` | Read-only diagnostic view. |

## Field matrix

### Workbooks

- List: `name`, `standard_version`, `template_name`, `status`, `updated_at`.
- Create/Edit: `name`, `standard_version`, `template_name`, `template_source_url`, `template_checksum`, `ifc_schema`, `status`, `notes`.
- Show: all list fields plus `id`, `organization_id`, `created_at`.
- Filters: `name`, `status`.

### Contacts

- List: `email`, `company`, `given_name`, `family_name`, `phone`.
- Create/Edit: `email`, `category`, `company`, `phone`, `department`, `organization_code`, `given_name`, `family_name`, address fields.
- Show: list fields plus COBie external/source metadata, excluding raw JSON by default.
- Filters: `workbook_id`, `email`, `company`, `family_name`.

### Facilities

- List: `name`, `category`, `project_name`, `site_name`, `phase`.
- Create/Edit: `name`, `category`, `project_name`, `site_name`, units fields, descriptions, `phase`.
- Show: list fields plus external identifiers and unit fields.
- Filters: `workbook_id`, `name`, `category`, `project_name`.

### Floors

- List: `name`, `category`, `elevation`, `height`, `description`.
- Create/Edit: `name`, `category`, `elevation`, `height`, `description`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `name`, `category`.

### Spaces

- List: `name`, `floor_name`, `category`, `room_tag`, `gross_area`, `net_area`.
- Create/Edit: `name`, `category`, `floor_name`, `description`, `room_tag`, `usable_height`, `gross_area`, `net_area`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `name`, `floor_name`, `category`, `room_tag`.

### Zones

- List: `name`, `category`, `space_names`, `description`.
- Create/Edit: `name`, `category`, `space_names`, `description`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `name`, `category`.

### Types

- List: `name`, `category`, `asset_type`, `manufacturer`, `model_number`.
- Create/Edit: `name`, `category`, `description`, `asset_type`, `manufacturer`, `model_number`, warranty fields, physical descriptor fields.
- Show: list fields plus warranty, physical descriptor and external/source metadata.
- Filters: `workbook_id`, `name`, `category`, `asset_type`, `manufacturer`.

### Components

- List: `name`, `type_name`, `space_name`, `serial_number`, `asset_identifier`, `tag_number`.
- Create/Edit: `name`, `type_name`, `space_name`, `description`, `serial_number`, `installation_date`, `warranty_start_date`, `tag_number`, `bar_code`, `asset_identifier`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `name`, `type_name`, `space_name`, `asset_identifier`, `tag_number`.

### Systems

- List: `name`, `category`, `component_names`, `description`.
- Create/Edit: `name`, `category`, `component_names`, `description`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `name`, `category`.

### Attributes

- List: `name`, `sheet_name`, `row_name`, `category`, `value`, `unit`.
- Create/Edit: `name`, `category`, `sheet_name`, `row_name`, `value`, `unit`, `description`, `allowed_values`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `sheet_name`, `row_name`, `name`, `category`.

### Documents

- List: `name`, `category`, `sheet_name`, `row_name`, `file`, `reference`.
- Create/Edit: `name`, `category`, `approval_by`, `stage`, `sheet_name`, `row_name`, `directory`, `file`, `reference`, `description`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `sheet_name`, `row_name`, `name`, `category`, `stage`.

### Jobs

- List: `name`, `status`, `category`, `type_name`, `duration`, `frequency`.
- Show: list fields plus task/resource fields and source metadata.
- Filters: `workbook_id`, `name`, `status`, `type_name`, `category`.

### Resources

- List: `name`, `category`, `description`.
- Show: list fields plus external/source metadata.
- Filters: `workbook_id`, `name`, `category`.

### Issues

- List: `name`, `type`, `risk`, `chance`, `impact`, `owner`.
- Show: list fields plus sheet/row target, mitigation and source metadata.
- Filters: `workbook_id`, `name`, `type`, `risk`, `owner`.

### Picklists

- List: `sheet_name`, `field_name`, `value`, `description`.
- Show: list fields plus `source_version`.
- Filters: `workbook_id`, `sheet_name`, `field_name`, `value`.
- Note: the Q2 2026 template has a column-oriented `Picklist` worksheet. This schema/resource should remain read-only until the import/export mapping is reconciled.

### Validation Issues

- List: `severity`, `rule_id`, `sheet_name`, `row_name`, `field_name`, `message`.
- Show: same fields plus `workbook_id` if available.
- Filters: `workbook_id`, `severity`, `sheet_name`, `rule_id`.

## Implementation notes

- Use `ReferenceInput` only where the backing relationship is stable and paginated; otherwise keep COBie textual references for the MVP.
- Prefer `TextInput` filters for textual COBie references until generated types and data provider behavior are verified.
- Use Show views for diagnostics, not raw JSON editing.
- If `ra-supabase` cannot express required filters or count behavior, document the blocker before building a custom provider.
