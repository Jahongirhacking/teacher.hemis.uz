"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SetOptions = {
  replace?: boolean;
  removeEmpty?: boolean; // null | undefined | '' bo‘lsa o‘chiradi
};

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const set = useCallback(
    (key: string, value: string, options?: { replace?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      const url = `${pathname}?${params.toString()}`;

      if (options?.replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [searchParams, pathname, router],
  );

  const setMany = useCallback(
    (
      values: Record<string, string | number | null | undefined>,
      options?: SetOptions,
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(values).forEach(([key, value]) => {
        if (
          options?.removeEmpty &&
          (value === undefined || value === null || value === "")
        ) {
          params.delete(key);
        } else if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      });

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      if (options?.replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [searchParams, pathname, router],
  );

  const remove = useCallback(
    (key: string, options?: { replace?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      if (options?.replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [searchParams, pathname, router],
  );

  const toggle = useCallback(
    (key: string, value: string, options?: { replace?: boolean }) => {
      const current = searchParams.get(key);
      if (current === value) {
        remove(key, options);
      } else {
        set(key, value, options);
      }
    },
    [searchParams, set, remove],
  );

  const clear = useCallback(
    (options?: { replace?: boolean }) => {
      if (options?.replace) {
        router.replace(pathname, { scroll: false });
      } else {
        router.push(pathname, { scroll: false });
      }
    },
    [pathname, router],
  );

  return {
    get,
    set,
    setMany,
    remove,
    toggle,
    clear,
    searchParams,
  };
}
