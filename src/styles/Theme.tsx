import { createTheme } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    gray: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
  interface Palette {
    gray: Palette["primary"];
    white: Palette["primary"];
  }
}

const palette = createPalette({
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
    light: "#F4F5F6",
  },
  white: {
    main: "#ffffff",
  },
});

const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: ["Inter"].join(","), // If we want to add more fonts, we can append to the array.
    button: {
      textTransform: "none",
    },
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
