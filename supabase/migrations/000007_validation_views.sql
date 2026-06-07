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
left join cobie.type t
  on t.workbook_id = c.workbook_id
 and t.name = c.type_name
where c.type_name is not null
  and c.type_name <> ''
  and t.id is null

union all

select
  c.organization_id,
  c.workbook_id,
  'warning'::text as severity,
  'VAL-004'::text as rule_id,
  'Component'::text as sheet_name,
  c.name as row_name,
  'Space'::text as field_name,
  'Component.Space does not reference an existing Space in the same workbook'::text as message
from cobie.component c
left join cobie.space s
  on s.workbook_id = c.workbook_id
 and s.name = c.space_name
where c.space_name is not null
  and c.space_name <> ''
  and s.id is null

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
left join cobie.floor f
  on f.workbook_id = s.workbook_id
 and f.name = s.floor_name
where s.floor_name is not null
  and s.floor_name <> ''
  and f.id is null;
