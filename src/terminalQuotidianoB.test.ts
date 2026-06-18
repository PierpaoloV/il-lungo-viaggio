import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./story/createStory";
import type { InkStory } from "./story/inkTypes";
import { getFlag } from "./state/saveLoad";
import { TerminalApp } from "./terminalApp";

function mountApp(story: InkStory) {
  document.body.innerHTML = `<main id="app"></main>`;
  const root = document.querySelector<HTMLElement>("#app")!;
  const app = new TerminalApp(story, { root });
  app.start();

  const form = root.querySelector<HTMLFormElement>("[data-testid='command-form']")!;
  const input = root.querySelector<HTMLInputElement>("[data-testid='command-input']")!;

  const send = (value: string) => {
    input.value = value;
    form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
  };

  const firstButton = () => root.querySelector<HTMLButtonElement>(".terminal__choice");

  /**
   * Gioca automaticamente: avanza con `aspetta` e, quando si arriva a un bivio,
   * clicca la prima scelta disponibile, finche' `needle` non compare.
   */
  const autoPlayUntil = (needle: string) => {
    for (let index = 0; index < 120; index += 1) {
      if (root.textContent?.includes(needle)) {
        return;
      }

      const button = firstButton();

      if (button) {
        button.click();
      } else {
        send("aspetta");
      }
    }

    throw new Error(`Non ho raggiunto: "${needle}"`);
  };

  return { root, autoPlayUntil };
}

describe("Quotidiano B — gioco completo nel terminale fino a P22", () => {
  it("attraversa i dialoghi e attiva la modalita' sogno a P22", () => {
    const story = createPrologueStory();
    const { root, autoPlayUntil } = mountApp(story);

    // Punti di controllo lungo la catena P10-P21.
    autoPlayUntil("A cosa serve?"); // P10
    autoPlayUntil("E se il mostro avesse fame?"); // P12
    autoPlayUntil("Errol il Liberatore"); // P13
    autoPlayUntil("il mio nome e' Lesmidoom"); // P16
    autoPlayUntil("Fai buon viaggio"); // P19
    autoPlayUntil("Apri gli occhi. Non sei nel letto."); // P22

    expect(getFlag(story, "lesmidoom_rivelato")).toBe(true);
    expect(getFlag(story, "fai_buon_viaggio_sentito")).toBe(true);
    expect(getFlag(story, "dialogo_errol_ricevuto")).toBe(true);

    // P22 entra nel sogno: il terminale passa in modalita' "dream".
    const terminal = root.querySelector(".terminal")!;
    expect(terminal.classList.contains("terminal--dream")).toBe(true);
  });
});
