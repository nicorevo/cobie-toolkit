# Pattern RLS

## Helper function

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

## SELECT

```sql
create policy select_own_org
on cobie.component
for select
to authenticated
using (app.is_org_member(organization_id));
```

## INSERT

```sql
create policy insert_own_org
on cobie.component
for insert
to authenticated
with check (app.is_org_member(organization_id));
```

## UPDATE

```sql
create policy update_own_org
on cobie.component
for update
to authenticated
using (app.is_org_member(organization_id))
with check (app.is_org_member(organization_id));
```

## DELETE

Preferire soft delete. Se necessario:

```sql
create policy delete_own_org
on cobie.component
for delete
to authenticated
using (app.is_org_member(organization_id));
```
