import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({});
export const MuiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
