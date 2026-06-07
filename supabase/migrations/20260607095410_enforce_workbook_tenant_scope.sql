-- Harden COBie RLS so clients cannot pair a valid organization_id with a
-- workbook_id from another tenant. This keeps authorization tied to real
-- workbook ownership rather than trusting client-provided organization_id.

create or replace function app.is_valid_cobie_scope(
  p_organization_id uuid,
  p_workbook_id uuid
)
returns boolean
language sql
stable
security invoker
set search_path = app, cobie, public
as $$
  select
    p_organization_id is not null
    and app.is_org_member(p_organization_id)
    and (
      p_workbook_id is null
      or exists (
        select 1
        from cobie.workbook w
        where w.id = p_workbook_id
          and w.organization_id = p_organization_id
      )
    );
$$;

grant execute on function app.is_valid_cobie_scope(uuid, uuid) to authenticated;

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
  end loop;
end $$;
