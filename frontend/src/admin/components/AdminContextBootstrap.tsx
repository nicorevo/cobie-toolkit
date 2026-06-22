import { useEffect } from 'react';
import { useDataProvider } from 'react-admin';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCurrentOrganizationId,
  selectCurrentWorkbookId,
  setCurrentOrganizationContext,
  setCurrentWorkbookContext,
} from '../../app/store';

type WorkbookRecord = {
  id: string;
  name?: string | null;
  organization_id?: string | null;
};

type OrganizationRecord = {
  id: string;
  name?: string | null;
};

function isWorkbookRecord(record: unknown): record is WorkbookRecord {
  return (
    typeof record === 'object' &&
    record !== null &&
    'id' in record &&
    typeof (record as { id: unknown }).id === 'string'
  );
}

function isOrganizationRecord(record: unknown): record is OrganizationRecord {
  return (
    typeof record === 'object' &&
    record !== null &&
    'id' in record &&
    typeof (record as { id: unknown }).id === 'string'
  );
}

export function AdminContextBootstrap() {
  const currentOrganizationId = useAppSelector(selectCurrentOrganizationId);
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);
  const dataProvider = useDataProvider();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isActive = true;

    async function getOrganizationName(organizationId: string) {
      try {
        const { data } = await dataProvider.getOne('organizations', {
          id: organizationId,
        });

        return isOrganizationRecord(data) ? data.name ?? null : null;
      } catch {
        return null;
      }
    }

    async function setWorkbook(record: WorkbookRecord) {
      if (!record.organization_id) return false;

      const organizationName = await getOrganizationName(record.organization_id);
      if (!isActive) return true;

      dispatch(
        setCurrentWorkbookContext({
          workbookId: record.id,
          workbookName: record.name ?? null,
          organizationId: record.organization_id,
          organizationName,
        }),
      );

      return true;
    }

    async function setFirstAvailableOrganization() {
      if (currentOrganizationId) return;

      const { data } = await dataProvider.getList('organizations', {
        filter: {},
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'name', order: 'ASC' },
      });
      const organization = data.find(isOrganizationRecord);

      if (!isActive || !organization) return;

      dispatch(
        setCurrentOrganizationContext({
          organizationId: organization.id,
          organizationName: organization.name ?? null,
        }),
      );
    }

    async function bootstrapContext() {
      if (currentWorkbookId) {
        try {
          const { data } = await dataProvider.getOne('workbook', {
            id: currentWorkbookId,
          });

          if (isWorkbookRecord(data) && (await setWorkbook(data))) return;
        } catch {
          // The persisted workbook may have been deleted or become inaccessible.
        }
      }

      const { data } = await dataProvider.getList('workbook', {
        filter: {},
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'created_at', order: 'DESC' },
      });
      const latestWorkbook = data.find(isWorkbookRecord);

      if (latestWorkbook && (await setWorkbook(latestWorkbook))) return;

      await setFirstAvailableOrganization();
    }

    void bootstrapContext();

    return () => {
      isActive = false;
    };
  }, [currentOrganizationId, currentWorkbookId, dataProvider, dispatch]);

  return null;
}
