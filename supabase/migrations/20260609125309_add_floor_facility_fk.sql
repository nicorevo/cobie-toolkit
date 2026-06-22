-- Link Floors to Facilities with a workbook-safe FK.
--
-- COBie Floor rows are workbook-scoped and the historical sheet-compatible
-- schema did not carry a direct Facility column. Existing data is backfilled
-- only when a workbook has exactly one Facility, avoiding invented links when
-- multiple Facilities exist in the same workbook.

alter table cobie.floor
add column if not exists facility_id uuid;

with single_facility_workbooks as (
  select
    workbook_id,
    (array_agg(id order by id))[1] as facility_id,
    count(*) as facility_count
  from cobie.facility
  group by workbook_id
  having count(*) = 1
)
update cobie.floor f
set facility_id = sfw.facility_id
from single_facility_workbooks sfw
where sfw.workbook_id = f.workbook_id
  and f.facility_id is null;

alter table cobie.floor
drop constraint if exists floor_facility_fk;

alter table cobie.floor
add constraint floor_facility_fk
foreign key (workbook_id, facility_id)
references cobie.facility(workbook_id, id);

create index if not exists idx_floor_facility_id
on cobie.floor(workbook_id, facility_id);
