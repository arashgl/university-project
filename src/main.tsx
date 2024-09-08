import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./assets/styles/App.tsx";
import "./assets/styles/index.css";
import { Providers } from "./components/Providers/Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
