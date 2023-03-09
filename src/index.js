import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Theme";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        redirectUri={window.location.origin}
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
