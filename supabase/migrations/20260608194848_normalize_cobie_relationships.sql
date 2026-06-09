-- Normalize COBie relationships while preserving source rows in raw_row.
-- This migration adds canonical lookup/FK/junction structures and backfills
-- from the existing sheet-compatible text columns. Redundant text columns are
-- dropped in a later migration after the normalized structures exist.

-- Existing workbook-scoped tables need composite uniqueness to support
-- workbook-safe foreign keys from normalized relationships.
alter table cobie.contact add constraint contact_workbook_id_id_key unique (workbook_id, id);
alter table cobie.facility add constraint facility_workbook_id_id_key unique (workbook_id, id);
alter table cobie.floor add constraint floor_workbook_id_id_key unique (workbook_id, id);
alter table cobie.space add constraint space_workbook_id_id_key unique (workbook_id, id);
alter table cobie.zone add constraint zone_workbook_id_id_key unique (workbook_id, id);
alter table cobie.type add constraint type_workbook_id_id_key unique (workbook_id, id);
alter table cobie.component add constraint component_workbook_id_id_key unique (workbook_id, id);
alter table cobie.system add constraint system_workbook_id_id_key unique (workbook_id, id);
alter table cobie.assembly add constraint assembly_workbook_id_id_key unique (workbook_id, id);
alter table cobie.connection add constraint connection_workbook_id_id_key unique (workbook_id, id);
alter table cobie.spare add constraint spare_workbook_id_id_key unique (workbook_id, id);
alter table cobie.resource add constraint resource_workbook_id_id_key unique (workbook_id, id);
alter table cobie.job add constraint job_workbook_id_id_key unique (workbook_id, id);
alter table cobie.impact add constraint impact_workbook_id_id_key unique (workbook_id, id);
alter table cobie.document add constraint document_workbook_id_id_key unique (workbook_id, id);
alter table cobie.attribute add constraint attribute_workbook_id_id_key unique (workbook_id, id);
alter table cobie.coordinate add constraint coordinate_workbook_id_id_key unique (workbook_id, id);
alter table cobie.issue add constraint issue_workbook_id_id_key unique (workbook_id, id);

create table if not exists cobie.category_contact (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_contact_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_contact_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_facility (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_facility_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_facility_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_floor (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_floor_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_floor_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_space (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_space_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_space_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_zone (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_zone_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_zone_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_type (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_type_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_type_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.asset_type (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  asset_type_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint asset_type_workbook_id_asset_type_name_key unique (workbook_id, asset_type_name),
  constraint asset_type_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_system (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_system_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_system_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.assembly_type (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  assembly_type_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint assembly_type_workbook_id_assembly_type_name_key unique (workbook_id, assembly_type_name),
  constraint assembly_type_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.connection_type (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  type_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint connection_type_workbook_id_type_name_key unique (workbook_id, type_name),
  constraint connection_type_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_spare (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_spare_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_spare_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_resource (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_resource_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_resource_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_job (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_job_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_job_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.job_status (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  status_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint job_status_workbook_id_status_name_key unique (workbook_id, status_name),
  constraint job_status_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.impact_type (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  type_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint impact_type_workbook_id_type_name_key unique (workbook_id, type_name),
  constraint impact_type_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.impact_stage (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  stage_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint impact_stage_workbook_id_stage_name_key unique (workbook_id, stage_name),
  constraint impact_stage_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_document (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_document_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_document_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.document_stage (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  stage_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint document_stage_workbook_id_stage_name_key unique (workbook_id, stage_name),
  constraint document_stage_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_attribute (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_attribute_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_attribute_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.category_coordinate (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  category_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint category_coordinate_workbook_id_category_name_key unique (workbook_id, category_name),
  constraint category_coordinate_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.issue_type (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  type_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint issue_type_workbook_id_type_name_key unique (workbook_id, type_name),
  constraint issue_type_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.issue_risk (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  risk_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint issue_risk_workbook_id_risk_name_key unique (workbook_id, risk_name),
  constraint issue_risk_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.issue_chance (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  chance_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint issue_chance_workbook_id_chance_name_key unique (workbook_id, chance_name),
  constraint issue_chance_workbook_id_id_key unique (workbook_id, id)
);

create table if not exists cobie.issue_impact (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  impact_name text not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint issue_impact_workbook_id_impact_name_key unique (workbook_id, impact_name),
  constraint issue_impact_workbook_id_id_key unique (workbook_id, id)
);

alter table cobie.contact add column if not exists category_contact_id uuid;
alter table cobie.facility add column if not exists category_facility_id uuid;
alter table cobie.floor add column if not exists category_floor_id uuid;
alter table cobie.space add column if not exists category_space_id uuid;
alter table cobie.space add column if not exists floor_id uuid;
alter table cobie.zone add column if not exists category_zone_id uuid;
alter table cobie.type add column if not exists category_type_id uuid;
alter table cobie.type add column if not exists asset_type_id uuid;
alter table cobie.component add column if not exists type_id uuid;
alter table cobie.system add column if not exists category_system_id uuid;
alter table cobie.assembly add column if not exists assembly_type_id uuid;
alter table cobie.assembly add column if not exists parent_id uuid;
alter table cobie.connection add column if not exists connection_type_id uuid;
alter table cobie.spare add column if not exists category_spare_id uuid;
alter table cobie.spare add column if not exists type_id uuid;
alter table cobie.resource add column if not exists category_resource_id uuid;
alter table cobie.job add column if not exists category_job_id uuid;
alter table cobie.job add column if not exists status_id uuid;
alter table cobie.job add column if not exists type_id uuid;
alter table cobie.impact add column if not exists impact_type_id uuid;
alter table cobie.impact add column if not exists impact_stage_id uuid;
alter table cobie.document add column if not exists category_document_id uuid;
alter table cobie.document add column if not exists approval_contact_id uuid;
alter table cobie.document add column if not exists stage_id uuid;
alter table cobie.attribute add column if not exists category_attribute_id uuid;
alter table cobie.coordinate add column if not exists category_coordinate_id uuid;
alter table cobie.issue add column if not exists issue_type_id uuid;
alter table cobie.issue add column if not exists risk_id uuid;
alter table cobie.issue add column if not exists chance_id uuid;
alter table cobie.issue add column if not exists issue_impact_id uuid;
alter table cobie.issue add column if not exists owner_contact_id uuid;

do $$
declare
  r record;
begin
  for r in
    select * from (values
      ('contact','category','category_contact','category_name','category_contact_id'),
      ('facility','category','category_facility','category_name','category_facility_id'),
      ('floor','category','category_floor','category_name','category_floor_id'),
      ('space','category','category_space','category_name','category_space_id'),
      ('zone','category','category_zone','category_name','category_zone_id'),
      ('type','category','category_type','category_name','category_type_id'),
      ('type','asset_type','asset_type','asset_type_name','asset_type_id'),
      ('system','category','category_system','category_name','category_system_id'),
      ('assembly','assembly_type','assembly_type','assembly_type_name','assembly_type_id'),
      ('connection','connection_type','connection_type','type_name','connection_type_id'),
      ('spare','category','category_spare','category_name','category_spare_id'),
      ('resource','category','category_resource','category_name','category_resource_id'),
      ('job','category','category_job','category_name','category_job_id'),
      ('job','status','job_status','status_name','status_id'),
      ('impact','impact_type','impact_type','type_name','impact_type_id'),
      ('impact','impact_stage','impact_stage','stage_name','impact_stage_id'),
      ('document','category','category_document','category_name','category_document_id'),
      ('document','stage','document_stage','stage_name','stage_id'),
      ('attribute','category','category_attribute','category_name','category_attribute_id'),
      ('coordinate','category','category_coordinate','category_name','category_coordinate_id'),
      ('issue','type','issue_type','type_name','issue_type_id'),
      ('issue','risk','issue_risk','risk_name','risk_id'),
      ('issue','chance','issue_chance','chance_name','chance_id'),
      ('issue','impact','issue_impact','impact_name','issue_impact_id')
    ) as x(source_table, source_column, lookup_table, lookup_column, fk_column)
  loop
    execute format(
      'insert into cobie.%I (organization_id, workbook_id, %I)
       select organization_id, workbook_id, trim(%I)
       from cobie.%I
       where %I is not null
         and trim(%I) <> ''''
         and lower(trim(%I)) <> ''n/a''
       group by organization_id, workbook_id, trim(%I)
       on conflict do nothing',
      r.lookup_table, r.lookup_column, r.source_column, r.source_table,
      r.source_column, r.source_column, r.source_column, r.source_column
    );

    execute format(
      'update cobie.%I s
       set %I = l.id
       from cobie.%I l
       where l.workbook_id = s.workbook_id
         and l.%I = trim(s.%I)
         and s.%I is not null
         and trim(s.%I) <> ''''
         and lower(trim(s.%I)) <> ''n/a''',
      r.source_table, r.fk_column, r.lookup_table, r.lookup_column,
      r.source_column, r.source_column, r.source_column, r.source_column
    );
  end loop;
end $$;

update cobie.space s
set floor_id = f.id
from cobie.floor f
where f.workbook_id = s.workbook_id
  and f.name = trim(s.floor_name)
  and s.floor_name is not null
  and trim(s.floor_name) <> ''
  and lower(trim(s.floor_name)) <> 'n/a';

update cobie.component c
set type_id = t.id
from cobie.type t
where t.workbook_id = c.workbook_id
  and t.name = trim(c.type_name)
  and c.type_name is not null
  and trim(c.type_name) <> ''
  and lower(trim(c.type_name)) <> 'n/a';

update cobie.spare s
set type_id = t.id
from cobie.type t
where t.workbook_id = s.workbook_id
  and t.name = trim(s.type_name)
  and s.type_name is not null
  and trim(s.type_name) <> ''
  and lower(trim(s.type_name)) <> 'n/a';

update cobie.job j
set type_id = t.id
from cobie.type t
where t.workbook_id = j.workbook_id
  and t.name = trim(j.type_name)
  and j.type_name is not null
  and trim(j.type_name) <> ''
  and lower(trim(j.type_name)) <> 'n/a';

update cobie.document d
set approval_contact_id = c.id
from cobie.contact c
where c.workbook_id = d.workbook_id
  and c.email = trim(d.approval_by)
  and d.approval_by is not null
  and trim(d.approval_by) <> ''
  and lower(trim(d.approval_by)) <> 'n/a';

update cobie.issue i
set owner_contact_id = c.id
from cobie.contact c
where c.workbook_id = i.workbook_id
  and c.email = trim(i.owner)
  and i.owner is not null
  and trim(i.owner) <> ''
  and lower(trim(i.owner)) <> 'n/a';

update cobie.assembly a
set parent_id = p.id
from cobie.assembly p
where p.workbook_id = a.workbook_id
  and p.name = trim(a.parent_name)
  and a.parent_name is not null
  and trim(a.parent_name) <> ''
  and lower(trim(a.parent_name)) <> 'n/a';

create table if not exists cobie.component_space (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  component_id uuid not null,
  space_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint component_space_component_fk foreign key (workbook_id, component_id) references cobie.component(workbook_id, id) on delete cascade,
  constraint component_space_space_fk foreign key (workbook_id, space_id) references cobie.space(workbook_id, id) on delete cascade,
  constraint component_space_workbook_component_space_key unique (workbook_id, component_id, space_id)
);

create table if not exists cobie.zone_space (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  zone_id uuid not null,
  space_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint zone_space_zone_fk foreign key (workbook_id, zone_id) references cobie.zone(workbook_id, id) on delete cascade,
  constraint zone_space_space_fk foreign key (workbook_id, space_id) references cobie.space(workbook_id, id) on delete cascade,
  constraint zone_space_workbook_zone_space_key unique (workbook_id, zone_id, space_id)
);

create table if not exists cobie.system_component (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  system_id uuid not null,
  component_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint system_component_system_fk foreign key (workbook_id, system_id) references cobie.system(workbook_id, id) on delete cascade,
  constraint system_component_component_fk foreign key (workbook_id, component_id) references cobie.component(workbook_id, id) on delete cascade,
  constraint system_component_workbook_system_component_key unique (workbook_id, system_id, component_id)
);

create table if not exists cobie.assembly_child (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  parent_assembly_id uuid not null,
  child_assembly_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint assembly_child_parent_fk foreign key (workbook_id, parent_assembly_id) references cobie.assembly(workbook_id, id) on delete cascade,
  constraint assembly_child_child_fk foreign key (workbook_id, child_assembly_id) references cobie.assembly(workbook_id, id) on delete cascade,
  constraint assembly_child_workbook_parent_child_key unique (workbook_id, parent_assembly_id, child_assembly_id)
);

create table if not exists cobie.spare_supplier (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  spare_id uuid not null,
  contact_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint spare_supplier_spare_fk foreign key (workbook_id, spare_id) references cobie.spare(workbook_id, id) on delete cascade,
  constraint spare_supplier_contact_fk foreign key (workbook_id, contact_id) references cobie.contact(workbook_id, id) on delete cascade,
  constraint spare_supplier_workbook_spare_contact_key unique (workbook_id, spare_id, contact_id)
);

create table if not exists cobie.job_resource (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  job_id uuid not null,
  resource_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint job_resource_job_fk foreign key (workbook_id, job_id) references cobie.job(workbook_id, id) on delete cascade,
  constraint job_resource_resource_fk foreign key (workbook_id, resource_id) references cobie.resource(workbook_id, id) on delete cascade,
  constraint job_resource_workbook_job_resource_key unique (workbook_id, job_id, resource_id)
);

create table if not exists cobie.job_prior (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  job_id uuid not null,
  prior_job_id uuid not null,
  source_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint job_prior_job_fk foreign key (workbook_id, job_id) references cobie.job(workbook_id, id) on delete cascade,
  constraint job_prior_prior_fk foreign key (workbook_id, prior_job_id) references cobie.job(workbook_id, id) on delete cascade,
  constraint job_prior_workbook_job_prior_key unique (workbook_id, job_id, prior_job_id)
);

insert into cobie.component_space (organization_id, workbook_id, component_id, space_id, source_position)
select c.organization_id, c.workbook_id, c.id, s.id, token.ordinality::integer
from cobie.component c
cross join lateral regexp_split_to_table(coalesce(c.space_name, ''), '\s*,\s*') with ordinality as token(space_name, ordinality)
join cobie.space s on s.workbook_id = c.workbook_id and s.name = trim(token.space_name)
where trim(token.space_name) <> ''
  and lower(trim(token.space_name)) <> 'n/a'
on conflict do nothing;

insert into cobie.zone_space (organization_id, workbook_id, zone_id, space_id, source_position)
select z.organization_id, z.workbook_id, z.id, s.id, token.ordinality::integer
from cobie.zone z
cross join lateral regexp_split_to_table(coalesce(z.space_names, ''), '\s*,\s*') with ordinality as token(space_name, ordinality)
join cobie.space s on s.workbook_id = z.workbook_id and s.name = trim(token.space_name)
where trim(token.space_name) <> ''
  and lower(trim(token.space_name)) <> 'n/a'
on conflict do nothing;

insert into cobie.system_component (organization_id, workbook_id, system_id, component_id, source_position)
select sys.organization_id, sys.workbook_id, sys.id, c.id, token.ordinality::integer
from cobie.system sys
cross join lateral regexp_split_to_table(coalesce(sys.component_names, ''), '\s*,\s*') with ordinality as token(component_name, ordinality)
join cobie.component c on c.workbook_id = sys.workbook_id and c.name = trim(token.component_name)
where trim(token.component_name) <> ''
  and lower(trim(token.component_name)) <> 'n/a'
on conflict do nothing;

insert into cobie.assembly_child (organization_id, workbook_id, parent_assembly_id, child_assembly_id, source_position)
select a.organization_id, a.workbook_id, a.id, child.id, token.ordinality::integer
from cobie.assembly a
cross join lateral regexp_split_to_table(coalesce(a.child_names, ''), '\s*,\s*') with ordinality as token(child_name, ordinality)
join cobie.assembly child on child.workbook_id = a.workbook_id and child.name = trim(token.child_name)
where trim(token.child_name) <> ''
  and lower(trim(token.child_name)) <> 'n/a'
on conflict do nothing;

insert into cobie.spare_supplier (organization_id, workbook_id, spare_id, contact_id, source_position)
select sp.organization_id, sp.workbook_id, sp.id, c.id, token.ordinality::integer
from cobie.spare sp
cross join lateral regexp_split_to_table(coalesce(sp.suppliers, ''), '\s*,\s*') with ordinality as token(contact_email, ordinality)
join cobie.contact c on c.workbook_id = sp.workbook_id and c.email = trim(token.contact_email)
where trim(token.contact_email) <> ''
  and lower(trim(token.contact_email)) <> 'n/a'
on conflict do nothing;

insert into cobie.job_resource (organization_id, workbook_id, job_id, resource_id, source_position)
select j.organization_id, j.workbook_id, j.id, r.id, token.ordinality::integer
from cobie.job j
cross join lateral regexp_split_to_table(coalesce(j.resource_names, ''), '\s*,\s*') with ordinality as token(resource_name, ordinality)
join cobie.resource r on r.workbook_id = j.workbook_id and r.name = trim(token.resource_name)
where trim(token.resource_name) <> ''
  and lower(trim(token.resource_name)) <> 'n/a'
on conflict do nothing;

insert into cobie.job_prior (organization_id, workbook_id, job_id, prior_job_id, source_position)
select j.organization_id, j.workbook_id, j.id, prior.id, token.ordinality::integer
from cobie.job j
cross join lateral regexp_split_to_table(coalesce(j.priors, ''), '\s*,\s*') with ordinality as token(prior_name, ordinality)
join cobie.job prior on prior.workbook_id = j.workbook_id and prior.name = trim(token.prior_name)
where trim(token.prior_name) <> ''
  and lower(trim(token.prior_name)) <> 'n/a'
on conflict do nothing;

create table if not exists cobie.row_reference (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  source_table text not null,
  source_id uuid not null,
  target_table text not null,
  target_id uuid not null,
  target_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint row_reference_source_table_check check (
    source_table in ('attribute', 'coordinate', 'document', 'impact', 'connection', 'issue')
  ),
  constraint row_reference_target_table_check check (
    target_table in ('contact', 'facility', 'floor', 'space', 'zone', 'type', 'component', 'system', 'assembly', 'connection', 'spare', 'resource', 'job', 'impact', 'document', 'attribute', 'coordinate', 'issue')
  ),
  constraint row_reference_workbook_source_target_key unique (workbook_id, source_table, source_id, target_position, target_table, target_id)
);

create table if not exists cobie.issue_target (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references app.organizations(id) on delete cascade,
  workbook_id uuid not null references cobie.workbook(id) on delete cascade,
  issue_id uuid not null,
  target_table text not null,
  target_id uuid not null,
  target_position integer not null default 1,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint issue_target_issue_fk foreign key (workbook_id, issue_id) references cobie.issue(workbook_id, id) on delete cascade,
  constraint issue_target_target_table_check check (
    target_table in ('contact', 'facility', 'floor', 'space', 'zone', 'type', 'component', 'system', 'assembly', 'connection', 'spare', 'resource', 'job', 'impact', 'document', 'attribute', 'coordinate', 'issue')
  ),
  constraint issue_target_workbook_issue_target_key unique (workbook_id, issue_id, target_position, target_table, target_id)
);

-- Backfill dynamic row references from existing SheetName/RowName pairs where
-- they resolve to the known COBie row tables.
do $$
declare
  source record;
  target record;
begin
  for source in
    select * from (values
      ('attribute', 'id', 'sheet_name', 'row_name'),
      ('coordinate', 'id', 'sheet_name', 'row_name'),
      ('document', 'id', 'sheet_name', 'row_name'),
      ('impact', 'id', 'sheet_name', 'row_name'),
      ('issue', 'id', 'sheet_name', 'row_name')
    ) as s(source_table, id_column, sheet_column, row_column)
  loop
    for target in
      select * from (values
        ('Contact', 'contact', 'email'),
        ('Facility', 'facility', 'name'),
        ('Floor', 'floor', 'name'),
        ('Space', 'space', 'name'),
        ('Zone', 'zone', 'name'),
        ('Type', 'type', 'name'),
        ('Component', 'component', 'name'),
        ('System', 'system', 'name'),
        ('Assembly', 'assembly', 'name'),
        ('Connection', 'connection', 'name'),
        ('Spare', 'spare', 'name'),
        ('Resource', 'resource', 'name'),
        ('Job', 'job', 'name'),
        ('Impact', 'impact', 'name'),
        ('Document', 'document', 'name'),
        ('Attribute', 'attribute', 'name'),
        ('Coordinate', 'coordinate', 'name'),
        ('Issue', 'issue', 'name')
      ) as t(sheet_name, target_table, target_name_column)
    loop
      execute format(
        'insert into cobie.row_reference (organization_id, workbook_id, source_table, source_id, target_table, target_id, target_position)
         select s.organization_id, s.workbook_id, %L, s.id, %L, t.id, 1
         from cobie.%I s
         join cobie.%I t on t.workbook_id = s.workbook_id and t.%I = trim(s.%I)
         where s.%I = %L
           and s.%I is not null
           and trim(s.%I) <> ''''
           and lower(trim(s.%I)) <> ''n/a''
         on conflict do nothing',
        source.source_table, target.target_table, source.source_table, target.target_table,
        target.target_name_column, source.row_column, source.sheet_column, target.sheet_name,
        source.row_column, source.row_column, source.row_column
      );
    end loop;
  end loop;
end $$;

do $$
declare
  source record;
  target record;
begin
  for source in
    select * from (values
      ('connection', 'id', 'sheet_name', 'row_name_1', 1),
      ('connection', 'id', 'sheet_name', 'row_name_2', 2)
    ) as s(source_table, id_column, sheet_column, row_column, target_position)
  loop
    for target in
      select * from (values
        ('Contact', 'contact', 'email'),
        ('Facility', 'facility', 'name'),
        ('Floor', 'floor', 'name'),
        ('Space', 'space', 'name'),
        ('Zone', 'zone', 'name'),
        ('Type', 'type', 'name'),
        ('Component', 'component', 'name'),
        ('System', 'system', 'name'),
        ('Assembly', 'assembly', 'name'),
        ('Connection', 'connection', 'name'),
        ('Spare', 'spare', 'name'),
        ('Resource', 'resource', 'name'),
        ('Job', 'job', 'name'),
        ('Impact', 'impact', 'name'),
        ('Document', 'document', 'name'),
        ('Attribute', 'attribute', 'name'),
        ('Coordinate', 'coordinate', 'name'),
        ('Issue', 'issue', 'name')
      ) as t(sheet_name, target_table, target_name_column)
    loop
      execute format(
        'insert into cobie.row_reference (organization_id, workbook_id, source_table, source_id, target_table, target_id, target_position)
         select s.organization_id, s.workbook_id, %L, s.id, %L, t.id, %s
         from cobie.%I s
         join cobie.%I t on t.workbook_id = s.workbook_id and t.%I = trim(s.%I)
         where s.%I = %L
           and s.%I is not null
           and trim(s.%I) <> ''''
           and lower(trim(s.%I)) <> ''n/a''
         on conflict do nothing',
        source.source_table, target.target_table, source.target_position,
        source.source_table, target.target_table, target.target_name_column,
        source.row_column, source.sheet_column, target.sheet_name,
        source.row_column, source.row_column, source.row_column
      );
    end loop;
  end loop;
end $$;

insert into cobie.issue_target (organization_id, workbook_id, issue_id, target_table, target_id, target_position)
select rr.organization_id, rr.workbook_id, rr.source_id, rr.target_table, rr.target_id, rr.target_position
from cobie.row_reference rr
where rr.source_table = 'issue'
on conflict do nothing;

alter table cobie.contact add constraint contact_category_contact_fk foreign key (workbook_id, category_contact_id) references cobie.category_contact(workbook_id, id);
alter table cobie.facility add constraint facility_category_facility_fk foreign key (workbook_id, category_facility_id) references cobie.category_facility(workbook_id, id);
alter table cobie.floor add constraint floor_category_floor_fk foreign key (workbook_id, category_floor_id) references cobie.category_floor(workbook_id, id);
alter table cobie.space add constraint space_category_space_fk foreign key (workbook_id, category_space_id) references cobie.category_space(workbook_id, id);
alter table cobie.space add constraint space_floor_fk foreign key (workbook_id, floor_id) references cobie.floor(workbook_id, id);
alter table cobie.zone add constraint zone_category_zone_fk foreign key (workbook_id, category_zone_id) references cobie.category_zone(workbook_id, id);
alter table cobie.type add constraint type_category_type_fk foreign key (workbook_id, category_type_id) references cobie.category_type(workbook_id, id);
alter table cobie.type add constraint type_asset_type_fk foreign key (workbook_id, asset_type_id) references cobie.asset_type(workbook_id, id);
alter table cobie.component add constraint component_type_fk foreign key (workbook_id, type_id) references cobie.type(workbook_id, id);
alter table cobie.system add constraint system_category_system_fk foreign key (workbook_id, category_system_id) references cobie.category_system(workbook_id, id);
alter table cobie.assembly add constraint assembly_assembly_type_fk foreign key (workbook_id, assembly_type_id) references cobie.assembly_type(workbook_id, id);
alter table cobie.assembly add constraint assembly_parent_fk foreign key (workbook_id, parent_id) references cobie.assembly(workbook_id, id);
alter table cobie.connection add constraint connection_connection_type_fk foreign key (workbook_id, connection_type_id) references cobie.connection_type(workbook_id, id);
alter table cobie.spare add constraint spare_category_spare_fk foreign key (workbook_id, category_spare_id) references cobie.category_spare(workbook_id, id);
alter table cobie.spare add constraint spare_type_fk foreign key (workbook_id, type_id) references cobie.type(workbook_id, id);
alter table cobie.resource add constraint resource_category_resource_fk foreign key (workbook_id, category_resource_id) references cobie.category_resource(workbook_id, id);
alter table cobie.job add constraint job_category_job_fk foreign key (workbook_id, category_job_id) references cobie.category_job(workbook_id, id);
alter table cobie.job add constraint job_status_fk foreign key (workbook_id, status_id) references cobie.job_status(workbook_id, id);
alter table cobie.job add constraint job_type_fk foreign key (workbook_id, type_id) references cobie.type(workbook_id, id);
alter table cobie.impact add constraint impact_impact_type_fk foreign key (workbook_id, impact_type_id) references cobie.impact_type(workbook_id, id);
alter table cobie.impact add constraint impact_impact_stage_fk foreign key (workbook_id, impact_stage_id) references cobie.impact_stage(workbook_id, id);
alter table cobie.document add constraint document_category_document_fk foreign key (workbook_id, category_document_id) references cobie.category_document(workbook_id, id);
alter table cobie.document add constraint document_approval_contact_fk foreign key (workbook_id, approval_contact_id) references cobie.contact(workbook_id, id);
alter table cobie.document add constraint document_stage_fk foreign key (workbook_id, stage_id) references cobie.document_stage(workbook_id, id);
alter table cobie.attribute add constraint attribute_category_attribute_fk foreign key (workbook_id, category_attribute_id) references cobie.category_attribute(workbook_id, id);
alter table cobie.coordinate add constraint coordinate_category_coordinate_fk foreign key (workbook_id, category_coordinate_id) references cobie.category_coordinate(workbook_id, id);
alter table cobie.issue add constraint issue_issue_type_fk foreign key (workbook_id, issue_type_id) references cobie.issue_type(workbook_id, id);
alter table cobie.issue add constraint issue_risk_fk foreign key (workbook_id, risk_id) references cobie.issue_risk(workbook_id, id);
alter table cobie.issue add constraint issue_chance_fk foreign key (workbook_id, chance_id) references cobie.issue_chance(workbook_id, id);
alter table cobie.issue add constraint issue_issue_impact_fk foreign key (workbook_id, issue_impact_id) references cobie.issue_impact(workbook_id, id);
alter table cobie.issue add constraint issue_owner_contact_fk foreign key (workbook_id, owner_contact_id) references cobie.contact(workbook_id, id);

do $$
declare
  t text;
begin
  foreach t in array array[
    'category_contact','category_facility','category_floor','category_space','category_zone',
    'category_type','asset_type','category_system','assembly_type','connection_type',
    'category_spare','category_resource','category_job','job_status','impact_type','impact_stage',
    'category_document','document_stage','category_attribute','category_coordinate',
    'issue_type','issue_risk','issue_chance','issue_impact',
    'component_space','zone_space','system_component','assembly_child','spare_supplier',
    'job_resource','job_prior','row_reference','issue_target'
  ]
  loop
    execute format('create index if not exists %I on cobie.%I(organization_id, workbook_id)', 'idx_' || t || '_org_workbook', t);
    execute format('alter table cobie.%I enable row level security', t);

    execute format('drop policy if exists %I_select_member on cobie.%I', t, t);
    execute format(
      'create policy %I_select_member on cobie.%I for select to authenticated using (app.is_valid_cobie_scope(organization_id, workbook_id))',
      t,
      t
    );

    execute format('drop policy if exists %I_insert_member on cobie.%I', t, t);
    execute format(
      'create policy %I_insert_member on cobie.%I for insert to authenticated with check (app.is_valid_cobie_scope(organization_id, workbook_id))',
      t,
      t
    );

    execute format('drop policy if exists %I_update_member on cobie.%I', t, t);
    execute format(
      'create policy %I_update_member on cobie.%I for update to authenticated using (app.is_valid_cobie_scope(organization_id, workbook_id)) with check (app.is_valid_cobie_scope(organization_id, workbook_id))',
      t,
      t
    );

    execute format('drop policy if exists %I_delete_admin on cobie.%I', t, t);
    execute format(
      'create policy %I_delete_admin on cobie.%I for delete to authenticated using (organization_id is not null and app.is_org_admin(organization_id) and app.is_valid_cobie_scope(organization_id, workbook_id))',
      t,
      t
    );

    execute format('drop trigger if exists %I_set_updated_at on cobie.%I', t, t);
    execute format('create trigger %I_set_updated_at before update on cobie.%I for each row execute function app.set_updated_at()', t, t);
  end loop;
end $$;

create index if not exists idx_space_floor_id on cobie.space(workbook_id, floor_id);
create index if not exists idx_component_type_id on cobie.component(workbook_id, type_id);
create index if not exists idx_component_space_component on cobie.component_space(workbook_id, component_id);
create index if not exists idx_component_space_space on cobie.component_space(workbook_id, space_id);
create index if not exists idx_zone_space_zone on cobie.zone_space(workbook_id, zone_id);
create index if not exists idx_zone_space_space on cobie.zone_space(workbook_id, space_id);
create index if not exists idx_system_component_system on cobie.system_component(workbook_id, system_id);
create index if not exists idx_system_component_component on cobie.system_component(workbook_id, component_id);
create index if not exists idx_row_reference_source on cobie.row_reference(workbook_id, source_table, source_id);
create index if not exists idx_row_reference_target on cobie.row_reference(workbook_id, target_table, target_id);

grant select, insert, update on all tables in schema cobie to authenticated;

drop view if exists api.cobie_assets;
drop view if exists api.cobie_space_index;
drop view if exists api.cobie_document_index;

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
  'Component.TypeName does not reference an existing Type in the same workbook'::text as message
from cobie.component c
where c.type_name is not null
  and trim(c.type_name) <> ''
  and lower(trim(c.type_name)) <> 'n/a'
  and c.type_id is null

union all

select
  c.organization_id,
  c.workbook_id,
  'warning'::text as severity,
  'VAL-004'::text as rule_id,
  'Component'::text as sheet_name,
  c.name as row_name,
  'Space'::text as field_name,
  'Component.Space has unresolved Space token(s) in the same workbook'::text as message
from cobie.component c
where c.space_name is not null
  and trim(c.space_name) <> ''
  and lower(trim(c.space_name)) <> 'n/a'
  and exists (
    select 1
    from regexp_split_to_table(c.space_name, '\s*,\s*') as token(space_name)
    where trim(token.space_name) <> ''
      and lower(trim(token.space_name)) <> 'n/a'
      and not exists (
        select 1
        from cobie.space s
        where s.workbook_id = c.workbook_id
          and s.name = trim(token.space_name)
      )
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
  'Space.FloorName does not reference an existing Floor in the same workbook'::text as message
from cobie.space s
where s.floor_name is not null
  and trim(s.floor_name) <> ''
  and lower(trim(s.floor_name)) <> 'n/a'
  and s.floor_id is null;
