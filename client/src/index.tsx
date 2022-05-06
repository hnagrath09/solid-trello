/* @refresh reload */
import { HopeProvider } from "@hope-ui/solid";
import { render } from "solid-js/web";
// import "./index.css";

import App from "./App";

render(
  () => (
    <HopeProvider>
      <App />
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement
);
