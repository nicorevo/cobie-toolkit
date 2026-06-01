-- RPC examples. Keep privileged behavior out until security review.

create or replace function api.create_workbook(
  p_organization_id uuid,
  p_name text,
  p_template_name text default null
)
returns cobie.workbook
language plpgsql
security invoker
as $$
declare
  result cobie.workbook;
begin
  if not app.is_org_member(p_organization_id) then
    raise exception 'not authorized';
  end if;

  insert into cobie.workbook (organization_id, name, template_name)
  values (p_organization_id, p_name, p_template_name)
  returning * into result;

  return result;
end;
$$;

create or replace function api.validate_workbook(p_workbook_id uuid)
returns table (
  severity text,
  rule_id text,
  sheet_name text,
  row_name text,
  field_name text,
  message text
)
language sql
security invoker
as $$
  select *
  from api.cobie_validation_issues
  where workbook_id = p_workbook_id;
$$;
