"use client";

import { useIsMounted } from "@/lib/hooks/useDispatchActions";
import { DarkThemeIcon, LightThemeIcon } from "@/public/icons";
import { ThemeColor, toggleThemeColor } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

export const ThemeSwitchButton = () => {
  const themeColor = useSelector((store: RootState) => store?.theme?.color);
  const dispatch = useDispatch();
  const { isMounted } = useIsMounted();

  const handleChangeTheme = () => {
    dispatch(toggleThemeColor());
  };

  return (
    <Button
      className="rounded-full h-[40px]"
      variant={"ghost"}
      onClick={handleChangeTheme}
    >
      {isMounted && themeColor === ThemeColor.Dark ? (
        <LightThemeIcon />
      ) : (
        <DarkThemeIcon />
      )}
    </Button>
  );
};
