// store.ts
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";

export function makeStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState,
  });
}

// Types
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<ReturnType<typeof makeStore>["dispatch"]>;
