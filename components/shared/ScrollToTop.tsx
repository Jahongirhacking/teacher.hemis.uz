"use client";

import paths from "@/lib/paths";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname?.includes(paths.private.dashboard)) {
      document
        .getElementById("main-outlet")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};
