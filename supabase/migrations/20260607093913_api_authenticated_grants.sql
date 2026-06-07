-- Grants required by PostgREST for authenticated users.
-- RLS remains the authorization boundary; DELETE is intentionally not granted for the MVP.

grant usage on schema api to authenticated;
grant usage on schema cobie to authenticated;
grant usage on schema app to authenticated;

grant select on all tables in schema api to authenticated;
grant select, insert, update on all tables in schema cobie to authenticated;
grant select on app.organizations, app.organization_members to authenticated;

grant execute on function api.create_workbook(uuid, text, text) to authenticated;
grant execute on function api.validate_workbook(uuid) to authenticated;
