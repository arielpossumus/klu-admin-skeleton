import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import "./index.css";
import RemoteApp from "./exposes/RemoteApp";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RemoteApp />
      </BrowserRouter>
      <Toaster richColors closeButton />
    </QueryClientProvider>
  </StrictMode>,
);
