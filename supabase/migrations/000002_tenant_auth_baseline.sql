create table if not exists app.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger organizations_set_updated_at
before update on app.organizations
for each row execute function app.set_updated_at();

create table if not exists app.organization_members (
  organization_id uuid not null references app.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'editor', 'viewer', 'member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create index if not exists idx_organization_members_user_id
on app.organization_members(user_id);

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

create or replace function app.is_org_admin(org_id uuid)
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
      and m.role in ('owner', 'admin')
  );
$$;

alter table app.organizations enable row level security;
alter table app.organization_members enable row level security;

create policy organizations_select_member
on app.organizations
for select
to authenticated
using (app.is_org_member(id));

create policy organization_members_select_member
on app.organization_members
for select
to authenticated
using (app.is_org_member(organization_id));
