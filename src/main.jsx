import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyTokens } from "./design/tokens";
import "./index.css";
import App from "./App.jsx";

applyTokens();

// SVG displacement in backdrop-filter only renders correctly on desktop Chromium.
const ua = navigator.userAgent;
if (/Chrome|Chromium|Edg\//.test(ua) && !/Mobile|Android|Firefox|FxiOS|CriOS/.test(ua)) {
  document.documentElement.classList.add("liquid-ok");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
