import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ThemeColor {
  Light = "light",
  Dark = "dark",
}

export interface IThemeSliceProps {
  color?: ThemeColor;
}

const initialState: IThemeSliceProps = {
  color: undefined,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeThemeColor: (state, action: PayloadAction<ThemeColor>) => {
      state.color = action.payload;
    },

    toggleThemeColor: (state) => {
      state.color = getToggleTheme(state?.color || ThemeColor.Light);
    },
  },
});

export const getToggleTheme = (color: ThemeColor) => {
  if (color === ThemeColor.Light) return ThemeColor.Dark;
  return ThemeColor.Light;
};

export const { changeThemeColor, toggleThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
