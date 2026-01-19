"use client";

import { useIsMounted } from "@/lib/hooks/useDispatchActions";
import { DarkThemeIcon, LightThemeIcon } from "@/public/icons";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { ThemeColor } from "./types";

export const ThemeSwitchButton = () => {
  const { isMounted } = useIsMounted();
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="rounded-full h-[40px]"
      variant={"ghost"}
      onClick={handleChangeTheme}
    >
      {isMounted && theme === ThemeColor.Dark ? (
        <LightThemeIcon />
      ) : (
        <DarkThemeIcon />
      )}
    </Button>
  );
};
