import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import RemoteApp from "./exposes/RemoteApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RemoteApp />
    </BrowserRouter>
  </StrictMode>,
);
