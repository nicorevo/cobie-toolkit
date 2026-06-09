-- Remove redundant COBie operational text columns after normalized
-- relationships have been created and backfilled.

drop view if exists api.cobie_assets;
drop view if exists api.cobie_space_index;
drop view if exists api.cobie_document_index;
drop view if exists api.cobie_validation_issues;

alter table cobie.contact drop column if exists category;

alter table cobie.facility drop column if exists category;

alter table cobie.floor drop column if exists category;

alter table cobie.space drop column if exists category;
alter table cobie.space drop column if exists floor_name;

alter table cobie.zone drop column if exists category;
alter table cobie.zone drop column if exists space_names;

alter table cobie.type drop column if exists category;
alter table cobie.type drop column if exists asset_type;

alter table cobie.component drop column if exists type_name;
alter table cobie.component drop column if exists space_name;

alter table cobie.system drop column if exists category;
alter table cobie.system drop column if exists component_names;

alter table cobie.assembly drop column if exists assembly_type;
alter table cobie.assembly drop column if exists parent_name;
alter table cobie.assembly drop column if exists child_names;

alter table cobie.connection drop column if exists connection_type;
alter table cobie.connection drop column if exists sheet_name;
alter table cobie.connection drop column if exists row_name_1;
alter table cobie.connection drop column if exists row_name_2;

alter table cobie.spare drop column if exists category;
alter table cobie.spare drop column if exists type_name;
alter table cobie.spare drop column if exists suppliers;

alter table cobie.resource drop column if exists category;

alter table cobie.job drop column if exists category;
alter table cobie.job drop column if exists status;
alter table cobie.job drop column if exists type_name;
alter table cobie.job drop column if exists priors;
alter table cobie.job drop column if exists resource_names;

alter table cobie.impact drop column if exists impact_type;
alter table cobie.impact drop column if exists impact_stage;
alter table cobie.impact drop column if exists sheet_name;
alter table cobie.impact drop column if exists row_name;

alter table cobie.document drop column if exists category;
alter table cobie.document drop column if exists approval_by;
alter table cobie.document drop column if exists stage;
alter table cobie.document drop column if exists sheet_name;
alter table cobie.document drop column if exists row_name;

alter table cobie.attribute drop column if exists category;
alter table cobie.attribute drop column if exists sheet_name;
alter table cobie.attribute drop column if exists row_name;

alter table cobie.coordinate drop column if exists category;
alter table cobie.coordinate drop column if exists sheet_name;
alter table cobie.coordinate drop column if exists row_name;

alter table cobie.issue drop column if exists type;
alter table cobie.issue drop column if exists risk;
alter table cobie.issue drop column if exists chance;
alter table cobie.issue drop column if exists impact;
alter table cobie.issue drop column if exists sheet_name;
alter table cobie.issue drop column if exists row_name;
alter table cobie.issue drop column if exists owner;

create or replace view api.cobie_assets
with (security_invoker = true) as
select
  c.id,
  c.organization_id,
  c.workbook_id,
  c.name as component_name,
  c.type_id,
  t.name as type_name,
  ct.category_name as type_category,
  string_agg(distinct s.name, ', ' order by s.name) as space_name,
  string_agg(distinct f.name, ', ' order by f.name) as floor_name,
  c.serial_number,
  c.asset_identifier,
  c.tag_number,
  c.description,
  c.inserted_at,
  c.updated_at
from cobie.component c
left join cobie.type t
  on t.workbook_id = c.workbook_id
 and t.id = c.type_id
left join cobie.category_type ct
  on ct.workbook_id = t.workbook_id
 and ct.id = t.category_type_id
left join cobie.component_space cs
  on cs.workbook_id = c.workbook_id
 and cs.component_id = c.id
left join cobie.space s
  on s.workbook_id = cs.workbook_id
 and s.id = cs.space_id
left join cobie.floor f
  on f.workbook_id = s.workbook_id
 and f.id = s.floor_id
group by
  c.id,
  c.organization_id,
  c.workbook_id,
  c.name,
  c.type_id,
  t.name,
  ct.category_name,
  c.serial_number,
  c.asset_identifier,
  c.tag_number,
  c.description,
  c.inserted_at,
  c.updated_at;

create or replace view api.cobie_space_index
with (security_invoker = true) as
select
  s.id,
  s.organization_id,
  s.workbook_id,
  s.name as space_name,
  s.floor_id,
  f.name as floor_name,
  cf.category_name as floor_category,
  cs.category_name as category,
  s.room_tag,
  s.gross_area,
  s.net_area,
  s.description
from cobie.space s
left join cobie.floor f
  on f.workbook_id = s.workbook_id
 and f.id = s.floor_id
left join cobie.category_floor cf
  on cf.workbook_id = f.workbook_id
 and cf.id = f.category_floor_id
left join cobie.category_space cs
  on cs.workbook_id = s.workbook_id
 and cs.id = s.category_space_id;

create or replace view api.cobie_document_index
with (security_invoker = true) as
select
  d.id,
  d.organization_id,
  d.workbook_id,
  d.name,
  cd.category_name as category,
  ds.stage_name as stage,
  d.approval_contact_id,
  c.email as approval_by,
  count(rr.id)::integer as target_count,
  d.directory,
  d.file,
  d.reference,
  d.description
from cobie.document d
left join cobie.category_document cd
  on cd.workbook_id = d.workbook_id
 and cd.id = d.category_document_id
left join cobie.document_stage ds
  on ds.workbook_id = d.workbook_id
 and ds.id = d.stage_id
left join cobie.contact c
  on c.workbook_id = d.workbook_id
 and c.id = d.approval_contact_id
left join cobie.row_reference rr
  on rr.workbook_id = d.workbook_id
 and rr.source_table = 'document'
 and rr.source_id = d.id
group by
  d.id,
  d.organization_id,
  d.workbook_id,
  d.name,
  cd.category_name,
  ds.stage_name,
  d.approval_contact_id,
  c.email,
  d.directory,
  d.file,
  d.reference,
  d.description;

create or replace view api.cobie_validation_issues
with (security_invoker = true) as
select
  c.organization_id,
  c.workbook_id,
  'error'::text as severity,
  'VAL-003'::text as rule_id,
  'Component'::text as sheet_name,
  c.name as row_name,
  'TypeName'::text as field_name,
  'Component is missing a normalized Type reference'::text as message
from cobie.component c
where c.type_id is null

union all

select
  c.organization_id,
  c.workbook_id,
  'warning'::text as severity,
  'VAL-004'::text as rule_id,
  'Component'::text as sheet_name,
  c.name as row_name,
  'Space'::text as field_name,
  'Component has no normalized Space relationships'::text as message
from cobie.component c
where not exists (
  select 1
  from cobie.component_space cs
  where cs.workbook_id = c.workbook_id
    and cs.component_id = c.id
)

union all

select
  s.organization_id,
  s.workbook_id,
  'warning'::text as severity,
  'VAL-005'::text as rule_id,
  'Space'::text as sheet_name,
  s.name as row_name,
  'FloorName'::text as field_name,
  'Space is missing a normalized Floor reference'::text as message
from cobie.space s
where s.floor_id is null;

grant select on all tables in schema api to authenticated;
