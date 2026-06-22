import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useDataProvider } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentWorkbookId } from '../../app/store';
import {
  type BreadcrumbTrailItem,
  getRecordDisplayName,
  getResourceLabel,
  parseJsonSearchParam,
  WORKBOOK_SCOPED_RESOURCES,
} from '../navigation';

type NamedRecord = Record<string, unknown> & {
  id: string;
};

type RouteInfo = {
  resource: string | null;
  id: string | null;
};

const NAVIGATION_TRAIL_STORAGE_KEY = 'cobie.adminBreadcrumbTrail.v1';
const MAX_NAVIGATION_TRAIL_ITEMS = 8;

const baseBreadcrumbBarStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 16px',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: '0.875rem',
} satisfies CSSProperties;

const baseHistoryButtonStyle = {
  alignItems: 'center',
  borderRadius: 4,
  cursor: 'pointer',
  display: 'inline-flex',
  font: 'inherit',
  height: 26,
  justifyContent: 'center',
  lineHeight: 1,
  minWidth: 28,
  padding: '0 8px',
} satisfies CSSProperties;

const breadcrumbItemsStyle = {
  alignItems: 'center',
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: 8,
  minWidth: 0,
} satisfies CSSProperties;

const baseBreadcrumbLinkStyle = {
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
} satisfies CSSProperties;

const baseBreadcrumbCurrentStyle = {
  fontWeight: 600,
} satisfies CSSProperties;

function parseRoute(pathname: string): RouteInfo {
  const normalizedPath = pathname.replace(/^\/admin\/?/, '');
  const [resource = null, maybeId = null] = normalizedPath.split('/');

  return {
    resource: resource && resource.length > 0 ? resource : null,
    id: maybeId && maybeId !== 'create' ? maybeId : null,
  };
}

function getCurrentLocationPath(pathname: string, search: string) {
  return `${pathname}${search}`;
}

function getNavigationTrailStorageKey(workbookId: string | null) {
  return `${NAVIGATION_TRAIL_STORAGE_KEY}:${workbookId ?? 'no-workbook'}`;
}

function readNavigationTrail(storageKey: string) {
  if (typeof window === 'undefined') return [];

  try {
    const rawTrail = window.sessionStorage.getItem(storageKey);
    if (!rawTrail) return [];

    const parsedTrail = JSON.parse(rawTrail) as BreadcrumbTrailItem[];
    if (!Array.isArray(parsedTrail)) return [];

    return parsedTrail.filter(
      (item) =>
        typeof item?.label === 'string' &&
        item.label.length > 0 &&
        (typeof item.to === 'string' || typeof item.to === 'undefined'),
    );
  } catch {
    return [];
  }
}

function writeNavigationTrail(storageKey: string, items: BreadcrumbTrailItem[]) {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify(items),
    );
  } catch {
    // Browsers can deny storage in private contexts; breadcrumb navigation still works.
  }
}

function dedupeBreadcrumbItems(items: BreadcrumbTrailItem[]) {
  const seen = new Set<string>();
  const nextItems: BreadcrumbTrailItem[] = [];

  items.forEach((item) => {
    const key = item.to ?? `label:${item.label}`;
    if (seen.has(key)) return;

    seen.add(key);
    nextItems.push(item);
  });

  return nextItems;
}

function useRecordName(resource: string | null, id: string | null) {
  const dataProvider = useDataProvider();
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!resource || !id) {
      setName(null);
      setIsLoading(false);
      return undefined;
    }

    setIsLoading(true);

    dataProvider
      .getOne(resource, { id })
      .then(({ data }) => {
        if (!isActive) return;
        setName(
          getRecordDisplayName(data as NamedRecord) ?? 'Nome non disponibile',
        );
      })
      .catch(() => {
        if (!isActive) return;
        setName('Nome non disponibile');
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [dataProvider, id, resource]);

  return { isLoading, name };
}

function BreadcrumbLink({
  currentStyle,
  item,
  linkStyle,
}: {
  currentStyle: CSSProperties;
  item: BreadcrumbTrailItem;
  linkStyle: CSSProperties;
}) {
  if (!item.to) {
    return <span style={currentStyle}>{item.label}</span>;
  }

  return (
    <RouterLink
      to={item.to}
      style={linkStyle}
      onMouseEnter={(event) => {
        event.currentTarget.style.textDecorationThickness = '2px';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.textDecorationThickness = 'auto';
      }}
    >
      {item.label}
    </RouterLink>
  );
}

export function AdminBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const currentWorkbookId = useAppSelector(selectCurrentWorkbookId);
  const navigationTrailStorageKey = useMemo(
    () => getNavigationTrailStorageKey(currentWorkbookId),
    [currentWorkbookId],
  );
  const route = useMemo(() => parseRoute(location.pathname), [location.pathname]);
  const currentPath = useMemo(
    () => getCurrentLocationPath(location.pathname, location.search),
    [location.pathname, location.search],
  );
  const [navigationTrail, setNavigationTrail] = useState<BreadcrumbTrailItem[]>(
    () => readNavigationTrail(navigationTrailStorageKey),
  );
  const filter = parseJsonSearchParam<Record<string, string>>(
    location.search,
    'filter',
  );
  const trail =
    parseJsonSearchParam<BreadcrumbTrailItem[]>(location.search, 'trail') ?? [];
  const canResolveCurrentRecord =
    route.resource &&
    (!WORKBOOK_SCOPED_RESOURCES.has(route.resource) || Boolean(currentWorkbookId));
  const workbook = useRecordName('workbook', currentWorkbookId);
  const currentRecord = useRecordName(
    canResolveCurrentRecord ? route.resource : null,
    canResolveCurrentRecord ? route.id : null,
  );
  const floorFromFilter = useRecordName(
    filter?.floor_id && currentWorkbookId ? 'floor' : null,
    filter?.floor_id && currentWorkbookId ? filter.floor_id : null,
  );
  const facilityFromFilter = useRecordName(
    filter?.facility_id && currentWorkbookId ? 'facility' : null,
    filter?.facility_id && currentWorkbookId ? filter.facility_id : null,
  );

  const routeItems = useMemo<BreadcrumbTrailItem[]>(() => {
    const nextItems: BreadcrumbTrailItem[] = [
      {
        label: 'Workbooks',
        to: '/admin/workbook',
      },
    ];

    if (!currentWorkbookId) {
      nextItems.push({ label: 'Seleziona un workbook' });
      return nextItems;
    }

    nextItems.push({
      label: workbook.isLoading ? 'Caricamento workbook...' : workbook.name ?? '',
      to: '/admin/workbook',
    });

    nextItems.push(...trail);

    if (
      route.resource === 'floor' &&
      filter?.facility_id &&
      trail.length === 0
    ) {
      nextItems.push({
        label: 'Facilities',
        to: '/admin/facility',
      });
      nextItems.push({
        label: facilityFromFilter.isLoading
          ? 'Caricamento facility...'
          : facilityFromFilter.name ?? '',
      });
    }

    if (route.resource === 'space' && filter?.floor_id && trail.length === 0) {
      nextItems.push({
        label: 'Floors',
        to: '/admin/floor',
      });
      nextItems.push({
        label: floorFromFilter.isLoading
          ? 'Caricamento floor...'
          : floorFromFilter.name ?? '',
      });
    }

    if (route.resource) {
      nextItems.push({
        label: getResourceLabel(route.resource),
        to: route.id ? `/admin/${route.resource}` : undefined,
      });
    }

    if (route.id) {
      nextItems.push({
        label: currentRecord.isLoading
          ? 'Caricamento nome...'
          : currentRecord.name ?? '',
      });
    }

    return nextItems.filter((item) => item.label.length > 0);
  }, [
    currentRecord.isLoading,
    currentRecord.name,
    currentWorkbookId,
    facilityFromFilter.isLoading,
    facilityFromFilter.name,
    filter?.facility_id,
    filter?.floor_id,
    floorFromFilter.isLoading,
    floorFromFilter.name,
    route.id,
    route.resource,
    trail,
    workbook.isLoading,
    workbook.name,
  ]);

  const currentNavigationItem = useMemo<BreadcrumbTrailItem | null>(() => {
    if (!route.resource) return null;
    if (route.id && currentRecord.isLoading) return null;

    if (route.id) {
      const label = currentRecord.name ?? getResourceLabel(route.resource);
      return {
        label,
        to: currentPath,
      };
    }

    return {
      label: getResourceLabel(route.resource),
      to: currentPath,
    };
  }, [
    currentPath,
    currentRecord.isLoading,
    currentRecord.name,
    route.id,
    route.resource,
  ]);

  useEffect(() => {
    setNavigationTrail(readNavigationTrail(navigationTrailStorageKey));
  }, [navigationTrailStorageKey]);

  useEffect(() => {
    if (!currentNavigationItem) return;

    setNavigationTrail((previousTrail) => {
      const existingTrail =
        previousTrail.length > 0
          ? previousTrail
          : readNavigationTrail(navigationTrailStorageKey);
      const withoutCurrent = existingTrail.filter(
        (item) => item.to !== currentNavigationItem.to,
      );
      const nextTrail = [...withoutCurrent, currentNavigationItem].slice(
        -MAX_NAVIGATION_TRAIL_ITEMS,
      );

      writeNavigationTrail(navigationTrailStorageKey, nextTrail);
      return nextTrail;
    });
  }, [currentNavigationItem, navigationTrailStorageKey]);

  const items = useMemo<BreadcrumbTrailItem[]>(() => {
    if (!currentWorkbookId) return routeItems;

    const rootItems = routeItems.slice(0, 2);
    const currentRouteItems = routeItems.slice(2);
    const historicItems = navigationTrail.filter((item) => item.to !== currentPath);

    return dedupeBreadcrumbItems([
      ...rootItems,
      ...historicItems,
      ...currentRouteItems,
    ]);
  }, [currentPath, currentWorkbookId, navigationTrail, routeItems]);

  const themeStyles = useMemo(() => {
    const textColor = theme.palette.text.primary;

    return {
      bar: {
        ...baseBreadcrumbBarStyle,
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: textColor,
      },
      button: {
        ...baseHistoryButtonStyle,
        background: theme.palette.action.hover,
        border: `1px solid ${theme.palette.divider}`,
        color: textColor,
      },
      current: {
        ...baseBreadcrumbCurrentStyle,
        color: textColor,
      },
      link: {
        ...baseBreadcrumbLinkStyle,
        color: textColor,
      },
    } satisfies Record<string, CSSProperties>;
  }, [theme]);

  return (
    <nav aria-label="COBie navigation breadcrumb" style={themeStyles.bar}>
      <button
        aria-label="Indietro"
        style={themeStyles.button}
        type="button"
        onClick={() => navigate(-1)}
      >
        ‹
      </button>
      <button
        aria-label="Avanti"
        style={themeStyles.button}
        type="button"
        onClick={() => navigate(1)}
      >
        ›
      </button>
      <span style={breadcrumbItemsStyle}>
        {items.map((item, index) => (
          <span
            key={`${item.to ?? item.label}-${index}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <BreadcrumbLink
              currentStyle={themeStyles.current}
              item={index === items.length - 1 ? { label: item.label } : item}
              linkStyle={themeStyles.link}
            />
            {index < items.length - 1 ? <span>/</span> : null}
          </span>
        ))}
      </span>
    </nav>
  );
}
