-- Enable RLS and basic tenant-isolation policies.

alter table cobie.workbook enable row level security;
alter table cobie.contact enable row level security;
alter table cobie.facility enable row level security;
alter table cobie.floor enable row level security;
alter table cobie.space enable row level security;
alter table cobie.zone enable row level security;
alter table cobie.type enable row level security;
alter table cobie.component enable row level security;
alter table cobie.system enable row level security;
alter table cobie.assembly enable row level security;
alter table cobie.connection enable row level security;
alter table cobie.spare enable row level security;
alter table cobie.resource enable row level security;
alter table cobie.job enable row level security;
alter table cobie.impact enable row level security;
alter table cobie.document enable row level security;
alter table cobie.attribute enable row level security;
alter table cobie.coordinate enable row level security;
alter table cobie.issue enable row level security;
alter table cobie.picklist enable row level security;

-- Workbooks
create policy workbook_select_member on cobie.workbook
for select to authenticated
using (app.is_org_member(organization_id));

create policy workbook_insert_member on cobie.workbook
for insert to authenticated
with check (app.is_org_member(organization_id));

create policy workbook_update_member on cobie.workbook
for update to authenticated
using (app.is_org_member(organization_id))
with check (app.is_org_member(organization_id));

-- Generic COBie sheet policies generated for all sheet tables.
do $$
declare
  t text;
begin
  foreach t in array array[
    'contact','facility','floor','space','zone','type','component','system','assembly','connection',
    'spare','resource','job','impact','document','attribute','coordinate','issue','picklist'
  ]
  loop
    execute format('drop policy if exists %I_select_member on cobie.%I', t, t);
    execute format('create policy %I_select_member on cobie.%I for select to authenticated using (organization_id is not null and app.is_org_member(organization_id))', t, t);

    execute format('drop policy if exists %I_insert_member on cobie.%I', t, t);
    execute format('create policy %I_insert_member on cobie.%I for insert to authenticated with check (organization_id is not null and app.is_org_member(organization_id))', t, t);

    execute format('drop policy if exists %I_update_member on cobie.%I', t, t);
    execute format('create policy %I_update_member on cobie.%I for update to authenticated using (organization_id is not null and app.is_org_member(organization_id)) with check (organization_id is not null and app.is_org_member(organization_id))', t, t);

    execute format('drop policy if exists %I_delete_admin on cobie.%I', t, t);
    execute format('create policy %I_delete_admin on cobie.%I for delete to authenticated using (organization_id is not null and app.is_org_admin(organization_id))', t, t);
  end loop;
end $$;

-- Note: picklist can be global if organization_id is null. This starter policy currently exposes only org-scoped picklists.
-- Add a separate audited policy for global read-only picklists if needed.
