import { createTheme, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    greyButton: PaletteColorOptions;
  }
  interface PaletteOptions {
    greyButton: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    greyButton: true;
  }
}

const { palette } = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#22AA6F",
      contrastText: "#FFFFFF",
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
    greyButton: palette.augmentColor({
      color: {
        main: "#D8D8D8",
      },
    }),
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
      },
    },
    MuiAvatar: {
      defaultProps: {},
    },
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
