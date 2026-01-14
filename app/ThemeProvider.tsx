"use client";

import { useThemeActions } from "@/lib/hooks/useDispatchActions";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  useThemeActions();
  return children;
}
