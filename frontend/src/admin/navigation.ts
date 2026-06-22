export type ResourceFilter = Record<string, string>;

export type BreadcrumbTrailItem = {
  label: string;
  to?: string;
};

export const WORKBOOK_SCOPED_RESOURCES = new Set([
  'contact',
  'facility',
  'floor',
  'space',
  'zone',
  'type',
  'component',
  'system',
  'attribute',
  'document',
  'job',
  'resource',
  'issue',
  'picklist',
  'category_contact',
  'category_facility',
  'category_floor',
  'category_space',
  'category_zone',
  'category_type',
  'asset_type',
  'category_system',
  'assembly_type',
  'connection_type',
  'category_spare',
  'category_resource',
  'category_job',
  'job_status',
  'impact_type',
  'impact_stage',
  'category_document',
  'document_stage',
  'category_attribute',
  'category_coordinate',
  'issue_type',
  'issue_risk',
  'issue_chance',
  'issue_impact',
  'component_space',
  'zone_space',
  'system_component',
  'assembly_child',
  'spare_supplier',
  'job_resource',
  'job_prior',
  'row_reference',
  'issue_target',
  'cobie_assets',
  'cobie_space_index',
  'cobie_document_index',
  'cobie_validation_issues',
]);

const RESOURCE_LABELS: Record<string, string> = {
  workbook: 'Workbooks',
  contact: 'Contacts',
  facility: 'Facilities',
  floor: 'Floors',
  space: 'Spaces',
  zone: 'Zones',
  component: 'Components',
  type: 'Types',
  system: 'Systems',
  attribute: 'Attributes',
  document: 'Documents',
  job: 'Jobs',
  resource: 'Resources',
  issue: 'Issues',
  picklist: 'Picklists',
  cobie_validation_issues: 'Validation Issues',
};

export function getResourceLabel(resource: string) {
  return RESOURCE_LABELS[resource] ?? resource;
}

export function buildResourceListPath(
  resource: string,
  filter: ResourceFilter,
  trail: BreadcrumbTrailItem[] = [],
) {
  const searchParams = new URLSearchParams({
    filter: JSON.stringify(filter),
  });

  if (trail.length > 0) {
    searchParams.set('trail', JSON.stringify(trail));
  }

  return `/admin/${resource}?${searchParams.toString()}`;
}

export function parseJsonSearchParam<T>(search: string, key: string): T | null {
  const value = new URLSearchParams(search).get(key);

  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getRecordDisplayName(record: Record<string, unknown> | null) {
  if (!record) return null;

  const name =
    record.name ??
    record.category_name ??
    record.type_name ??
    record.status_name ??
    record.stage_name ??
    record.asset_type_name ??
    record.assembly_type_name ??
    record.connection_type_name ??
    record.risk_name ??
    record.chance_name ??
    record.impact_name;

  return typeof name === 'string' && name.length > 0 ? name : null;
}
