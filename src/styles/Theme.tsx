import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#22AA6F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#212529",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default appTheme;
