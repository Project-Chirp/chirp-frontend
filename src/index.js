import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Auth0Provider } from "@auth0/auth0-react";
import appTheme from "./styles/Theme.tsx";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENTID;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
