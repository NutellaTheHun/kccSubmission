import { MantineProvider } from "@mantine/core";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
