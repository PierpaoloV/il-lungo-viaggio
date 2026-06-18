import "./styles.css";

import { createPrologueStory } from "./story/createStory";
import { TerminalApp } from "./terminalApp";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root element.");
}

const app = new TerminalApp(createPrologueStory(), { root });
app.start();
