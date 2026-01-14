/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { makeStore } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
  preloadedState?: any;
}

export default function ReduxProvider({ children, preloadedState }: Props) {
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
