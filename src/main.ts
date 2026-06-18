import "./styles.css";

import { createPrologueStory } from "./story/createStory";
import { TerminalApp } from "./terminalApp";

const titleBackground = new URL("../art/title-bg.png", import.meta.url).href;

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root element.");
}

showTitleScreen(root, () => {
  const app = new TerminalApp(createPrologueStory(), { root });
  app.start();
});

/**
 * Schermata d'apertura: sfondo dipinto, titolo e un solo pulsante per partire.
 * Quando il giocatore avvia, l'overlay si dissolve e cede il `root` al gioco.
 */
function showTitleScreen(host: HTMLElement, onStart: () => void): void {
  host.className = "title-screen";
  host.style.setProperty("--title-bg", `url("${titleBackground}")`);
  host.innerHTML = `
    <div class="title-screen__scrim">
      <div class="title-screen__content">
        <p class="title-screen__kicker">Un racconto interattivo</p>
        <h1 class="title-screen__title">Il Lungo Viaggio</h1>
        <button type="button" class="title-screen__start" data-testid="start-button">
          Inizia il viaggio
        </button>
      </div>
    </div>
  `;

  const startButton = host.querySelector<HTMLButtonElement>("[data-testid='start-button']")!;

  startButton.addEventListener("click", () => {
    host.removeAttribute("style");
    host.innerHTML = "";
    onStart();
  });

  startButton.focus();
}
