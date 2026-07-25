import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/variables.css";
import "./styles/common.css";
import "./styles/globals.css";
import "./styles/responsive.css";

import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
