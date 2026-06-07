# Pattern RLS

## Helper Function

Le tabelle COBie devono verificare sia membership reale sia coerenza tra
`organization_id` e `workbook_id`. Non basta fidarsi di `organization_id`
passato dal client.

```sql
create or replace function app.is_org_member(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = app, public
as $$
  select exists (
    select 1
    from app.organization_members m
    where m.organization_id = org_id
      and m.user_id = auth.uid()
  );
$$;
```

```sql
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
```

## SELECT

```sql
create policy select_own_org
on cobie.component
for select
to authenticated
using (app.is_valid_cobie_scope(organization_id, workbook_id));
```

## INSERT

```sql
create policy insert_own_org
on cobie.component
for insert
to authenticated
with check (app.is_valid_cobie_scope(organization_id, workbook_id));
```

## UPDATE

```sql
create policy update_own_org
on cobie.component
for update
to authenticated
using (app.is_valid_cobie_scope(organization_id, workbook_id))
with check (app.is_valid_cobie_scope(organization_id, workbook_id));
```

## DELETE

Preferire soft delete. Se necessario:

```sql
create policy delete_own_org
on cobie.component
for delete
to authenticated
using (
  app.is_org_admin(organization_id)
  and app.is_valid_cobie_scope(organization_id, workbook_id)
);
```

## Smoke Test

Eseguire `scripts/rls-smoke-tests.sql` dopo ogni modifica a RLS, grant, helper
function o schema COBie tenant-scoped.
