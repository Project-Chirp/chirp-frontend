import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import appTheme from "./styles/Theme.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8e2eney2zngtvaof.us.auth0.com"
      clientId="J1dv2HbpggopctXuZX7Y4i4LnZKJsP0t"
      redirectUri={window.location.origin}
      audience="tweeter identifier"
      scope="openid profile email"
    >
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
