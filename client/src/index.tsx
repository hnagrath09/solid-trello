/* @refresh reload */
import { HopeProvider } from "@hope-ui/solid";
import { Router } from "solid-app-router";
import { render } from "solid-js/web";
// import "./index.css";

import App from "./App";

render(
  () => (
    <Router>
      <HopeProvider>
        <App />
      </HopeProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
