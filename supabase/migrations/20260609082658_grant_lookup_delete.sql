-- Allow authenticated organization admins to delete lookup values through
-- PostgREST. Row-level security still restricts the operation to org admins
-- and foreign keys still prevent deleting values currently referenced by
-- COBie rows.
grant delete on table
  cobie.category_contact,
  cobie.category_facility,
  cobie.category_floor,
  cobie.category_space,
  cobie.category_zone,
  cobie.category_type,
  cobie.asset_type,
  cobie.category_system,
  cobie.assembly_type,
  cobie.connection_type,
  cobie.category_spare,
  cobie.category_resource,
  cobie.category_job,
  cobie.job_status,
  cobie.impact_type,
  cobie.impact_stage,
  cobie.category_document,
  cobie.document_stage,
  cobie.category_attribute,
  cobie.category_coordinate,
  cobie.issue_type,
  cobie.issue_risk,
  cobie.issue_chance,
  cobie.issue_impact
to authenticated;
