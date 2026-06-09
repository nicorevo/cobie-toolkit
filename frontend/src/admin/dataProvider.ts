import { supabaseDataProvider } from 'ra-supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataProvider } from 'react-admin';
import { supabaseConfig } from '../lib/supabase/config';
import { supabase } from '../lib/supabase/client';

const COBIE_RESOURCES = new Set([
  'workbook',
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
]);

const API_RESOURCES = new Set([
  'cobie_assets',
  'cobie_space_index',
  'cobie_document_index',
  'cobie_validation_issues',
]);

const APP_RESOURCES = new Set(['organizations', 'organization_members']);

type ParamsWithMeta = {
  meta?: Record<string, unknown>;
};

function getResourceSchema(resource: string) {
  if (COBIE_RESOURCES.has(resource)) return 'cobie';
  if (API_RESOURCES.has(resource)) return 'api';
  if (APP_RESOURCES.has(resource)) return 'app';
  return 'api';
}

function withResourceSchema<Params extends ParamsWithMeta>(
  resource: string,
  params: Params,
): Params {
  return {
    ...params,
    meta: {
      ...params.meta,
      schema: params.meta?.schema ?? getResourceSchema(resource),
    },
  };
}

const postgrestDataProvider = supabaseDataProvider({
  instanceUrl: supabaseConfig.url,
  apiKey: supabaseConfig.publishableKey,
  supabaseClient: supabase as unknown as SupabaseClient,
  defaultListOp: 'eq',
});

export const dataProvider: DataProvider = {
  ...postgrestDataProvider,
  getList: (resource, params) =>
    postgrestDataProvider.getList(resource, withResourceSchema(resource, params)),
  getOne: (resource, params) =>
    postgrestDataProvider.getOne(resource, withResourceSchema(resource, params)),
  getMany: (resource, params) =>
    postgrestDataProvider.getMany(resource, withResourceSchema(resource, params)),
  getManyReference: (resource, params) =>
    postgrestDataProvider.getManyReference(
      resource,
      withResourceSchema(resource, params),
    ),
  create: (resource, params) =>
    postgrestDataProvider.create(resource, withResourceSchema(resource, params)),
  update: (resource, params) =>
    postgrestDataProvider.update(resource, withResourceSchema(resource, params)),
  updateMany: (resource, params) =>
    postgrestDataProvider.updateMany(
      resource,
      withResourceSchema(resource, params),
    ),
  delete: (resource, params) =>
    postgrestDataProvider.delete(resource, withResourceSchema(resource, params)),
  deleteMany: (resource, params) =>
    postgrestDataProvider.deleteMany(
      resource,
      withResourceSchema(resource, params),
    ),
};
