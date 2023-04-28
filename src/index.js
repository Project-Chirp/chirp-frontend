import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Theme";
import AuthProvider from "./components/Auth/AuthProvider";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </UserContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
