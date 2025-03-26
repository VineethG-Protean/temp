import "regenerator-runtime/runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProteanPanRfp from "./pages/protean-pan-rfp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProteanPanRfp/>
  </StrictMode>
);
