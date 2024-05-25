import { createTheme } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    black: PaletteOptions["primary"];
    gray: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
  interface Palette {
    black: Palette["primary"];
    gray: Palette["primary"];
    white: Palette["primary"];
  }
}

const palette = createPalette({
  black: {
    main: "#000000",
  },
  error: {
    main: "#F44336",
  },
  gray: {
    dark: "#808080",
    main: "#ADB5BD",
    light: "#F4F5F6",
  },
  primary: {
    contrastText: "#FFFFFF",
    light: "#C6EBD4",
    main: "#22AA6F",
  },
  secondary: {
    main: "#212529",
  },
  success: {
    main: "#22AA6F",
  },
  warning: {
    main: "#FFA726",
  },
  white: {
    main: "#FFFFFF",
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
      lineHeight: 1.43,
    },
    subtitle2: { color: palette.gray.dark, fontWeight: 400, lineHeight: 1.43 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(5),
          "&.Mui-disabled": {
            backgroundColor: palette.primary.light,
            color: palette.primary.contrastText,
          },
        }),
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
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1, 2, 2, 2),
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(0),
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(0.5),
        }),
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
        root: ({ theme }) => ({
          borderRadius: theme.spacing(5),
        }),
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
            padding: 0,
          },
        },
      },
    },
  },
});

export default theme;
