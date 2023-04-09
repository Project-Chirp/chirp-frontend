import { createTheme } from "@mui/material/styles";

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
