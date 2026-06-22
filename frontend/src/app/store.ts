import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const CURRENT_WORKBOOK_STORAGE_KEY = 'cobie.currentWorkbookId';
export const CURRENT_WORKBOOK_NAME_STORAGE_KEY = 'cobie.currentWorkbookName';
export const CURRENT_ORGANIZATION_STORAGE_KEY = 'cobie.currentOrganizationId';
export const CURRENT_ORGANIZATION_NAME_STORAGE_KEY =
  'cobie.currentOrganizationName';

type UiState = {
  currentWorkbookId: string | null;
  currentWorkbookName: string | null;
  currentOrganizationId: string | null;
  currentOrganizationName: string | null;
};

type WorkbookContext = {
  workbookId: string;
  workbookName?: string | null;
  organizationId: string;
  organizationName?: string | null;
};

type OrganizationContext = {
  organizationId: string;
  organizationName?: string | null;
};

function readStoredValue(key: string) {
  if (typeof window === 'undefined') return null;

  return window.localStorage.getItem(key);
}

const initialState: UiState = {
  currentWorkbookId: readStoredValue(CURRENT_WORKBOOK_STORAGE_KEY),
  currentWorkbookName: readStoredValue(CURRENT_WORKBOOK_NAME_STORAGE_KEY),
  currentOrganizationId: readStoredValue(CURRENT_ORGANIZATION_STORAGE_KEY),
  currentOrganizationName: readStoredValue(CURRENT_ORGANIZATION_NAME_STORAGE_KEY),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentWorkbookId(state, action: PayloadAction<string | null>) {
      state.currentWorkbookId = action.payload;
      if (!action.payload) {
        state.currentWorkbookName = null;
      }
    },
    setCurrentWorkbookContext(state, action: PayloadAction<WorkbookContext>) {
      state.currentWorkbookId = action.payload.workbookId;
      state.currentWorkbookName = action.payload.workbookName ?? null;
      state.currentOrganizationId = action.payload.organizationId;
      state.currentOrganizationName = action.payload.organizationName ?? null;
    },
    setCurrentOrganizationContext(
      state,
      action: PayloadAction<OrganizationContext | null>,
    ) {
      state.currentOrganizationId = action.payload?.organizationId ?? null;
      state.currentOrganizationName = action.payload?.organizationName ?? null;
    },
  },
});

export const {
  setCurrentOrganizationContext,
  setCurrentWorkbookContext,
  setCurrentWorkbookId,
} = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

store.subscribe(() => {
  if (typeof window === 'undefined') return;

  const state = store.getState();
  const values = [
    [CURRENT_WORKBOOK_STORAGE_KEY, selectCurrentWorkbookId(state)],
    [CURRENT_WORKBOOK_NAME_STORAGE_KEY, selectCurrentWorkbookName(state)],
    [CURRENT_ORGANIZATION_STORAGE_KEY, selectCurrentOrganizationId(state)],
    [CURRENT_ORGANIZATION_NAME_STORAGE_KEY, selectCurrentOrganizationName(state)],
  ] as const;

  values.forEach(([key, value]) => {
    if (value) {
      window.localStorage.setItem(key, value);
      return;
    }

    window.localStorage.removeItem(key);
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectCurrentWorkbookId = (state: RootState) =>
  state.ui.currentWorkbookId;
export const selectCurrentWorkbookName = (state: RootState) =>
  state.ui.currentWorkbookName;
export const selectCurrentOrganizationId = (state: RootState) =>
  state.ui.currentOrganizationId;
export const selectCurrentOrganizationName = (state: RootState) =>
  state.ui.currentOrganizationName;
