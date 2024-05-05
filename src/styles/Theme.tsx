import { createTheme } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    gray: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
    black: PaletteOptions["primary"];
  }
  interface Palette {
    gray: Palette["primary"];
    white: Palette["primary"];
    black: Palette["primary"];
  }
}

const palette = createPalette({
  primary: {
    contrastText: "#FFFFFF",
    light: "#C6EBD4",
    main: "#22AA6F",
  },
  secondary: {
    main: "#212529",
  },
  error: {
    main: "#F44336",
  },
  warning: {
    main: "#FFA726",
  },
  success: {
    main: "#22AA6F",
  },
  gray: {
    dark: "#808080",
    main: "#ADB5BD",
    light: "#F4F5F6",
  },
  white: {
    main: "#FFFFFF",
  },
  black: {
    main: "#000000",
  },
});

const theme = createTheme({
  palette: palette,
  typography: {
    button: {
      textTransform: "none",
    },
    body1: { fontSize: "0.9375rem" },
    body2: { color: palette.gray.dark, fontSize: "0.8125rem" },
    fontFamily: ["Inter"].join(","), // If we want to add more fonts, we can append to the array.
    h1: { fontSize: "1.75rem", fontWeight: 400 },
    h2: { fontSize: "1.5rem", fontWeight: 500 },
    h3: { fontSize: "1.25rem", fontWeight: 600 },
    subtitle1: {
      color: palette.black.main,
      fontSize: "0.9375rem",
      fontWeight: "bold",
    },
    subtitle2: { color: palette.gray.dark, fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "40px",
          "&.Mui-disabled": {
            backgroundColor: palette.primary.light,
            color: palette.primary.contrastText,
          },
        },
      },
    },
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
      styleOverrides: {
        root: {
          color: palette.gray.main,
          "&:hover": {
            color: palette.primary.main,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: { disableUnderline: true },
      },
      styleOverrides: {
        root: {
          "&.MuiFormControl-root": {
            padding: "0px",
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "4px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "8px 16px 16px 16px",
        },
      },
    },
  },
});

export default theme;
