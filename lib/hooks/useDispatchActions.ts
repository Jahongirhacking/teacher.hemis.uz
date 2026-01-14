/* eslint-disable react-hooks/set-state-in-effect */
import { ThemeColor, changeThemeColor } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageKeys } from "../const";
import { getLocalStorage, setLocalStorage } from "../utils";

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  return { isMounted: mounted };
};

export const useThemeActions = () => {
  const themeColor = useSelector((store: RootState) => store?.theme?.color);
  const dispatch = useDispatch();

  const getThemeColor = () => {
    if (typeof window === "undefined") return ThemeColor.Light;
    const stored = getLocalStorage(LocalStorageKeys.Theme) as ThemeColor | null;
    if (stored) return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return ThemeColor.Dark;
    return ThemeColor.Light;
  };

  useEffect(() => {
    if (themeColor) {
      setLocalStorage(LocalStorageKeys.Theme, themeColor || ThemeColor.Light);
      // Update <html> class for Tailwind
      const root = document.documentElement;

      if (themeColor === ThemeColor.Dark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    } else {
      dispatch(changeThemeColor(getThemeColor()));
    }
  }, [themeColor, dispatch]);

  return {
    themeColor,
  };
};
