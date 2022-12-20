import { ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      },

    }
}