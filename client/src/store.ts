import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import { apiSlice } from "./slices/api";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
