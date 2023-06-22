import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    gray: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#22AA6F",
      contrastText: "#FFFFFF",
      light: "#c6ebd4",
    },
    secondary: {
      main: "#212529",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ffa726",
    },
    success: {
      main: "#22AA6F",
    },
    gray: {
      main: "#adb5bd",
    },
  },

  typography: {
    fontFamily: ["Inter"].join(","), // If we want to add more fonts, we can append to the array.
    button: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          whiteSpace: "pre-wrap",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: { sx: { borderRadius: 5 } },
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
    },
  },
});

export default theme;
