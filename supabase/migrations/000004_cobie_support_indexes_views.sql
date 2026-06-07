-- Indexes

create index if not exists idx_contact_org_workbook on cobie.contact(organization_id, workbook_id);
create index if not exists idx_facility_org_workbook on cobie.facility(organization_id, workbook_id);
create index if not exists idx_floor_org_workbook on cobie.floor(organization_id, workbook_id);
create index if not exists idx_space_org_workbook on cobie.space(organization_id, workbook_id);
create index if not exists idx_zone_org_workbook on cobie.zone(organization_id, workbook_id);
create index if not exists idx_type_org_workbook on cobie.type(organization_id, workbook_id);
create index if not exists idx_component_org_workbook on cobie.component(organization_id, workbook_id);
create index if not exists idx_system_org_workbook on cobie.system(organization_id, workbook_id);
create index if not exists idx_attribute_org_workbook on cobie.attribute(organization_id, workbook_id);
create index if not exists idx_document_org_workbook on cobie.document(organization_id, workbook_id);
create index if not exists idx_job_org_workbook on cobie.job(organization_id, workbook_id);
create index if not exists idx_resource_org_workbook on cobie.resource(organization_id, workbook_id);
create index if not exists idx_issue_org_workbook on cobie.issue(organization_id, workbook_id);

create index if not exists idx_component_type_name on cobie.component(workbook_id, type_name);
create index if not exists idx_component_space_name on cobie.component(workbook_id, space_name);
create index if not exists idx_space_floor_name on cobie.space(workbook_id, floor_name);
create index if not exists idx_attribute_target on cobie.attribute(workbook_id, sheet_name, row_name);
create index if not exists idx_document_target on cobie.document(workbook_id, sheet_name, row_name);

-- API read models.
-- PostgREST can expose views if schema api is enabled.

create or replace view api.cobie_assets
with (security_invoker = true) as
select
  c.id,
  c.organization_id,
  c.workbook_id,
  c.name as component_name,
  c.type_name,
  t.category as type_category,
  c.space_name,
  s.floor_name,
  c.serial_number,
  c.asset_identifier,
  c.tag_number,
  c.description,
  c.inserted_at,
  c.updated_at
from cobie.component c
left join cobie.type t
  on t.workbook_id = c.workbook_id
 and t.name = c.type_name
left join cobie.space s
  on s.workbook_id = c.workbook_id
 and s.name = c.space_name;

create or replace view api.cobie_space_index
with (security_invoker = true) as
select
  s.id,
  s.organization_id,
  s.workbook_id,
  s.name as space_name,
  s.floor_name,
  f.category as floor_category,
  s.category,
  s.room_tag,
  s.gross_area,
  s.net_area,
  s.description
from cobie.space s
left join cobie.floor f
  on f.workbook_id = s.workbook_id
 and f.name = s.floor_name;

create or replace view api.cobie_document_index
with (security_invoker = true) as
select
  d.id,
  d.organization_id,
  d.workbook_id,
  d.name,
  d.category,
  d.sheet_name,
  d.row_name,
  d.directory,
  d.file,
  d.reference,
  d.description
from cobie.document d;
