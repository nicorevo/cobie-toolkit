-- RLS smoke test for the COBie Supabase schema.
--
-- Run only against a local/dev Supabase database. The test creates temporary
-- tenant data inside a transaction and finishes with ROLLBACK.
--
-- Example:
--   docker exec -i supabase_db_cobie-react-admin \
--     psql -v ON_ERROR_STOP=1 -U postgres -d postgres \
--     < scripts/rls-smoke-tests.sql

\set ON_ERROR_STOP on

\echo 'RLS smoke: starting'

begin;

create or replace function pg_temp.assert_eq(
  test_name text,
  actual bigint,
  expected bigint
)
returns void
language plpgsql
as $$
begin
  if actual is distinct from expected then
    raise exception 'RLS smoke failed: %, expected %, got %', test_name, expected, actual;
  end if;

  raise notice 'ok: %', test_name;
end;
$$;

create or replace function pg_temp.assert_raises(
  test_name text,
  statement text
)
returns void
language plpgsql
as $$
begin
  begin
    execute statement;
  exception
    when others then
      if sqlstate in ('42501', '23503', '23514')
        or sqlerrm ilike '%row-level security%'
        or sqlerrm ilike '%permission denied%'
      then
        raise notice 'ok: %', test_name;
        return;
      end if;

      raise exception 'RLS smoke failed: % raised unexpected SQLSTATE %: %',
        test_name,
        sqlstate,
        sqlerrm;
  end;

  raise exception 'RLS smoke failed: % did not raise', test_name;
end;
$$;

-- Test tenants and users. These are not real Supabase Auth users; auth.uid()
-- is simulated with request.jwt.claim.sub for local database smoke tests.
insert into app.organizations (id, name, slug)
values
  ('10000000-0000-4000-8000-000000000001', 'RLS Smoke Org A', 'rls-smoke-org-a'),
  ('10000000-0000-4000-8000-000000000002', 'RLS Smoke Org B', 'rls-smoke-org-b');

insert into app.organization_members (organization_id, user_id, role)
values
  ('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'admin'),
  ('10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'admin');

insert into cobie.workbook (id, organization_id, name)
values
  ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'RLS Smoke Workbook A'),
  ('30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', 'RLS Smoke Workbook B');

insert into cobie.component (id, organization_id, workbook_id, name, description)
values
  (
    '40000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000001',
    'RLS Smoke Component A',
    'Tenant A component'
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000002',
    '30000000-0000-4000-8000-000000000002',
    'RLS Smoke Component B',
    'Tenant B component'
  );

-- User A can see and mutate only tenant A rows.
select set_config('request.jwt.claim.sub', '20000000-0000-4000-8000-000000000001', true);
set local role authenticated;

select pg_temp.assert_eq('user A sees one organization', (select count(*) from app.organizations), 1);
select pg_temp.assert_eq('user A sees one workbook', (select count(*) from cobie.workbook), 1);
select pg_temp.assert_eq('user A sees one component', (select count(*) from cobie.component), 1);

insert into cobie.component (id, organization_id, workbook_id, name, description)
values (
  '40000000-0000-4000-8000-000000000011',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000001',
  'RLS Smoke Component A Insert',
  'Inserted by tenant A'
);

select pg_temp.assert_eq('user A can insert tenant A component', (select count(*) from cobie.component), 2);

update cobie.component
set description = 'Updated by tenant A'
where id = '40000000-0000-4000-8000-000000000001';

select pg_temp.assert_eq(
  'user A can update tenant A component',
  (
    select count(*)
    from cobie.component
    where id = '40000000-0000-4000-8000-000000000001'
      and description = 'Updated by tenant A'
  ),
  1
);

do $$
declare
  affected_rows bigint;
begin
  update cobie.component
  set description = 'Should not update tenant B'
  where id = '40000000-0000-4000-8000-000000000002';

  get diagnostics affected_rows = row_count;
  perform pg_temp.assert_eq('user A cannot update tenant B component', affected_rows, 0);
end;
$$;

select pg_temp.assert_raises(
  'user A cannot insert component in tenant B',
  $sql$
    insert into cobie.component (id, organization_id, workbook_id, name)
    values (
      '40000000-0000-4000-8000-000000000021',
      '10000000-0000-4000-8000-000000000002',
      '30000000-0000-4000-8000-000000000002',
      'RLS Smoke Bad Tenant B Insert'
    )
  $sql$
);

select pg_temp.assert_raises(
  'user A cannot pair tenant A organization with tenant B workbook',
  $sql$
    insert into cobie.component (id, organization_id, workbook_id, name)
    values (
      '40000000-0000-4000-8000-000000000022',
      '10000000-0000-4000-8000-000000000001',
      '30000000-0000-4000-8000-000000000002',
      'RLS Smoke Bad Cross Workbook Insert'
    )
  $sql$
);

select pg_temp.assert_raises(
  'user A cannot move tenant A component to tenant B organization',
  $sql$
    update cobie.component
    set
      organization_id = '10000000-0000-4000-8000-000000000002',
      workbook_id = '30000000-0000-4000-8000-000000000002'
    where id = '40000000-0000-4000-8000-000000000001'
  $sql$
);

select pg_temp.assert_raises(
  'user A cannot move tenant A component into tenant B workbook',
  $sql$
    update cobie.component
    set workbook_id = '30000000-0000-4000-8000-000000000002'
    where id = '40000000-0000-4000-8000-000000000001'
  $sql$
);

reset role;

-- User B sees only tenant B data, even after tenant A inserts another row.
select set_config('request.jwt.claim.sub', '20000000-0000-4000-8000-000000000002', true);
set local role authenticated;

select pg_temp.assert_eq('user B sees one organization', (select count(*) from app.organizations), 1);
select pg_temp.assert_eq('user B sees one workbook', (select count(*) from cobie.workbook), 1);
select pg_temp.assert_eq('user B sees one component', (select count(*) from cobie.component), 1);

reset role;

-- Anonymous users are stricter than zero rows: they have no tenant data access.
select set_config('request.jwt.claim.sub', '', true);
set local role anon;

select pg_temp.assert_raises(
  'anon cannot select tenant components',
  $sql$ select count(*) from cobie.component $sql$
);

select pg_temp.assert_raises(
  'anon cannot call validate_workbook',
  $sql$ select * from api.validate_workbook('30000000-0000-4000-8000-000000000001') $sql$
);

reset role;

rollback;

\echo 'RLS smoke: passed'
