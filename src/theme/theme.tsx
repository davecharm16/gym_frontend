// theme.ts
import { createTheme } from "@mui/material/styles";

// Shared typography settings
const typography = {
  fontFamily: "Poppins, sans-serif",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography,
});
