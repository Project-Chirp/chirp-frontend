import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Theme";
import AuthProvider from "./components/Auth/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./state/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
