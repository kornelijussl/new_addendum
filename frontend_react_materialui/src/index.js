// REACT
import * as React from "react";

// REACT DOM
import ReactDOM from "react-dom/client";

// NOTISTACK
import { SnackbarProvider } from "notistack";

// REACT BROWSER DOM
import { BrowserRouter as Router } from "react-router-dom";

// ROUTES
import Routes from "./router/Routes";

// i18n
import "./i18n/i18n";
import I18nContextProvider from "./context/I18nContext";

// ----------------------------------------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider>
        <I18nContextProvider>
          <Routes />
        </I18nContextProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>,
);
