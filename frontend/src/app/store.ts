import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  currentWorkbookId: string | null;
};

const initialState: UiState = {
  currentWorkbookId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentWorkbookId(state, action: PayloadAction<string | null>) {
      state.currentWorkbookId = action.payload;
    },
  },
});

export const { setCurrentWorkbookId } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
