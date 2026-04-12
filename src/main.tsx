// Disable Lit dev mode for production
// Must be set before any Lit components are imported
// @ts-ignore
window.LIT_DEV_MODE = false;
import "@m3e/web/app-bar";
import "@m3e/web/divider";
import "@m3e/web/tabs";
import "@m3e/web/button";
import "@m3e/web/card";
import "@m3e/web/heading";
import "@m3e/web/theme";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<m3e-theme mode="dark" seed="#00C853">
		<App />
	</m3e-theme>
);
