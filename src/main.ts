import "./styles.css";

import { BackgroundMusic } from "./audio/backgroundMusic";
import { hasSavedGame } from "./state/saveLoad";
import { createPrologueStory } from "./story/createStory";
import { TerminalApp } from "./terminalApp";

const titleBackground = new URL("../art/title-bg.png", import.meta.url).href;
const themeMusic = new BackgroundMusic(
  `${import.meta.env.BASE_URL}audio/il-lungo-viaggio-theme.mp3`
);

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing #app root element.");
}

showTitleScreen(root, {
  onNewGame: () => {
    themeMusic.start();
    const app = new TerminalApp(createPrologueStory(), { root, music: themeMusic });
    app.start();
  },
  onResume: () => {
    themeMusic.start();
    const app = new TerminalApp(createPrologueStory(), { root, music: themeMusic });
    app.startResumed();
  }
});

type TitleScreenActions = {
  onNewGame: () => void;
  onResume: () => void;
};

/**
 * Schermata d'apertura: sfondo dipinto, titolo e i pulsanti per partire. "Nuova
 * partita" e' sempre presente; "Riprendi" compare solo se esiste un salvataggio
 * nel browser. Avviata una scelta, l'overlay si dissolve e cede il `root` al gioco.
 */
function showTitleScreen(host: HTMLElement, actions: TitleScreenActions): void {
  const canResume = hasSavedGame();

  host.className = "title-screen";
  host.style.setProperty("--title-bg", `url("${titleBackground}")`);
  host.innerHTML = `
    <div class="title-screen__scrim">
      <div class="title-screen__content">
        <p class="title-screen__kicker">Un racconto interattivo</p>
        <h1 class="title-screen__title">Il Lungo Viaggio</h1>
        <div class="title-screen__actions">
          ${
            canResume
              ? `<button type="button" class="title-screen__start" data-testid="resume-button">Riprendi</button>`
              : ""
          }
          <button
            type="button"
            class="title-screen__start ${canResume ? "title-screen__start--secondary" : ""}"
            data-testid="new-game-button"
          >Nuova partita</button>
        </div>
      </div>
    </div>
  `;

  const dismiss = (run: () => void): void => {
    host.removeAttribute("style");
    host.innerHTML = "";
    run();
  };

  host
    .querySelector<HTMLButtonElement>("[data-testid='new-game-button']")!
    .addEventListener("click", () => dismiss(actions.onNewGame));

  const resumeButton = host.querySelector<HTMLButtonElement>("[data-testid='resume-button']");
  resumeButton?.addEventListener("click", () => dismiss(actions.onResume));

  (resumeButton ?? host.querySelector<HTMLButtonElement>("[data-testid='new-game-button']")!).focus();
}
