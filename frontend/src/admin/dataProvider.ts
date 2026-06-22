import { supabaseDataProvider } from 'ra-supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataProvider } from 'react-admin';
import {
  CURRENT_ORGANIZATION_STORAGE_KEY,
  CURRENT_WORKBOOK_STORAGE_KEY,
} from '../app/store';
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

const WORKBOOK_SCOPED_RESOURCES = new Set([
  ...COBIE_RESOURCES,
  ...API_RESOURCES,
]);

WORKBOOK_SCOPED_RESOURCES.delete('workbook');

type ParamsWithMeta = {
  meta?: Record<string, unknown>;
};

type ParamsWithFilter = ParamsWithMeta & {
  filter?: Record<string, unknown>;
};

type ParamsWithData = ParamsWithMeta & {
  data: Record<string, unknown>;
};

type WorkbookOwnedRecord = {
  workbook_id?: unknown;
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

function getCurrentWorkbookId() {
  if (typeof window === 'undefined') return null;

  return window.localStorage.getItem(CURRENT_WORKBOOK_STORAGE_KEY);
}

function getCurrentOrganizationId() {
  if (typeof window === 'undefined') return null;

  return window.localStorage.getItem(CURRENT_ORGANIZATION_STORAGE_KEY);
}

function requiresWorkbookScope(resource: string) {
  return WORKBOOK_SCOPED_RESOURCES.has(resource);
}

function acceptsOrganizationScope(resource: string) {
  return COBIE_RESOURCES.has(resource);
}

function withWorkbookScope<Params extends ParamsWithFilter>(
  resource: string,
  params: Params,
): Params | null {
  if (!requiresWorkbookScope(resource)) return params;

  const currentWorkbookId = getCurrentWorkbookId();

  if (!currentWorkbookId) return null;

  return {
    ...params,
    filter: {
      ...params.filter,
      workbook_id: currentWorkbookId,
    },
  };
}

function emptyListResult() {
  return Promise.resolve({ data: [], total: 0 });
}

function missingWorkbookError(resource: string) {
  return Promise.reject(
    new Error(`Select a workbook before accessing ${resource}.`),
  );
}

function missingOrganizationError(resource: string) {
  return Promise.reject(
    new Error(`No organization context is available for ${resource}.`),
  );
}

function withWorkbookData<Params extends ParamsWithData>(
  resource: string,
  params: Params,
): Params | null {
  const currentWorkbookId = getCurrentWorkbookId();
  const currentOrganizationId = getCurrentOrganizationId();

  if (acceptsOrganizationScope(resource) && !currentOrganizationId) return null;

  if (!requiresWorkbookScope(resource)) {
    return {
      ...params,
      data: acceptsOrganizationScope(resource)
        ? {
            ...params.data,
            organization_id: currentOrganizationId,
          }
        : params.data,
    };
  }

  if (!currentWorkbookId) return null;

  return {
    ...params,
    data: {
      ...params.data,
      organization_id: currentOrganizationId,
      workbook_id: currentWorkbookId,
    },
  };
}

function isCurrentWorkbookRecord(record: WorkbookOwnedRecord) {
  const currentWorkbookId = getCurrentWorkbookId();

  return (
    !currentWorkbookId ||
    record.workbook_id === undefined ||
    record.workbook_id === currentWorkbookId
  );
}

const postgrestDataProvider = supabaseDataProvider({
  instanceUrl: supabaseConfig.url,
  apiKey: supabaseConfig.publishableKey,
  supabaseClient: supabase as unknown as SupabaseClient,
  defaultListOp: 'eq',
});

export const dataProvider: DataProvider = {
  ...postgrestDataProvider,
  getList: (resource, params) => {
    const scopedParams = withWorkbookScope(resource, params);

    if (!scopedParams) return emptyListResult();

    return postgrestDataProvider.getList(
      resource,
      withResourceSchema(resource, scopedParams),
    );
  },
  getOne: (resource, params) =>
    requiresWorkbookScope(resource) && !getCurrentWorkbookId()
      ? missingWorkbookError(resource)
      : postgrestDataProvider
          .getOne(resource, withResourceSchema(resource, params))
          .then((result) => {
            if (
              requiresWorkbookScope(resource) &&
              !isCurrentWorkbookRecord(result.data as WorkbookOwnedRecord)
            ) {
              throw new Error(`Record is outside the selected workbook.`);
            }

            return result;
          }),
  getMany: (resource, params) =>
    requiresWorkbookScope(resource) && !getCurrentWorkbookId()
      ? Promise.resolve({ data: [] })
      : postgrestDataProvider
          .getMany(resource, withResourceSchema(resource, params))
          .then((result) => ({
            ...result,
            data: requiresWorkbookScope(resource)
              ? result.data.filter((record) =>
                  isCurrentWorkbookRecord(record as WorkbookOwnedRecord),
                )
              : result.data,
          })),
  getManyReference: (resource, params) => {
    const scopedParams = withWorkbookScope(resource, params);

    if (!scopedParams) return emptyListResult();

    return postgrestDataProvider.getManyReference(
      resource,
      withResourceSchema(resource, scopedParams),
    );
  },
  create: (resource, params) => {
    const scopedParams = withWorkbookData(resource, params);

    if (!scopedParams) {
      return requiresWorkbookScope(resource)
        ? missingWorkbookError(resource)
        : missingOrganizationError(resource);
    }

    return postgrestDataProvider.create(
      resource,
      withResourceSchema(resource, scopedParams),
    );
  },
  update: (resource, params) => {
    const scopedParams = withWorkbookData(resource, params);

    if (!scopedParams) {
      return requiresWorkbookScope(resource)
        ? missingWorkbookError(resource)
        : missingOrganizationError(resource);
    }

    return postgrestDataProvider.update(
      resource,
      withResourceSchema(resource, scopedParams),
    );
  },
  updateMany: (resource, params) => {
    const scopedParams = withWorkbookData(resource, params);

    if (!scopedParams) {
      return requiresWorkbookScope(resource)
        ? missingWorkbookError(resource)
        : missingOrganizationError(resource);
    }

    return postgrestDataProvider.updateMany(
      resource,
      withResourceSchema(resource, scopedParams),
    );
  },
  delete: (resource, params) =>
    requiresWorkbookScope(resource) && !getCurrentWorkbookId()
      ? missingWorkbookError(resource)
      : postgrestDataProvider.delete(
          resource,
          withResourceSchema(resource, params),
        ),
  deleteMany: (resource, params) =>
    requiresWorkbookScope(resource) && !getCurrentWorkbookId()
      ? missingWorkbookError(resource)
      : postgrestDataProvider.deleteMany(
          resource,
          withResourceSchema(resource, params),
        ),
};
