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

  /** Avanza con `aspetta` finche' `needle` non compare nel transcript. */
  const advanceUntil = (needle: string) => {
    for (let index = 0; index < 40; index += 1) {
      if (root.textContent?.includes(needle)) {
        return;
      }
      send("aspetta");
    }
    throw new Error(`Non ho raggiunto: "${needle}"`);
  };

  const findButton = (needle: string) =>
    Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice")).find(
      (candidate) => candidate.textContent?.includes(needle)
    );

  /** Avanza con `aspetta` finche' il bottone con `needle` non e' disponibile. */
  const advanceUntilButton = (needle: string) => {
    for (let index = 0; index < 40; index += 1) {
      if (findButton(needle)) {
        return;
      }
      send("aspetta");
    }
    throw new Error(`Bottone "${needle}" non comparso`);
  };

  /** Clicca il bottone della scelta situazionale che contiene `needle`. */
  const click = (needle: string) => {
    const button = findButton(needle);

    if (!button) {
      throw new Error(`Bottone "${needle}" non trovato`);
    }

    button.click();
  };

  return { root, send, advanceUntil, advanceUntilButton, click };
}

describe("Quotidiano A — comandi testuali nel terminale", () => {
  it("`esamina tracce` imposta bosco_tracce_osservate", () => {
    const story = createPrologueStory();
    const { root, advanceUntil, send } = mountApp(story);

    advanceUntil("Nel bosco l'aria cambia");
    send("esamina tracce");

    expect(root.textContent).toContain("Sono leggere, ma continue.");
    expect(getFlag(story, "bosco_tracce_osservate")).toBe(true);
  });

  it("`vai nord` nel bosco non fa avanzare ma risponde con un avviso", () => {
    const story = createPrologueStory();
    const { root, advanceUntil, send } = mountApp(story);

    advanceUntil("Nel bosco l'aria cambia");
    send("vai nord");

    expect(root.textContent).toContain("Ti allontaneresti troppo dalla citta'");
  });

  it("`dai panino` offre il panino, avanza e svuota l'inventario del panino", () => {
    const story = createPrologueStory();
    const { root, advanceUntilButton, send, click } = mountApp(story);

    advanceUntilButton("Segui le tracce");
    click("Segui le tracce");
    advanceUntilButton("Chiedi scusa");
    click("Chiedi scusa");
    advanceUntilButton("Offri il panino");

    send("dai panino");

    expect(getFlag(story, "panino_dato")).toBe(true);
    expect(root.textContent).toContain("Il vecchio accetta senza fronzoli");

    send("inventario");
    expect(root.textContent).toContain("Hai con te: spada di legno.");
  });

  it("`accompagna vecchio` imposta aiuto_vecchio e converge alla mensa", () => {
    const story = createPrologueStory();
    const { root, advanceUntil, advanceUntilButton, send, click } = mountApp(story);

    advanceUntilButton("Segui le tracce");
    click("Segui le tracce");
    advanceUntilButton("Chiedi scusa");
    click("Chiedi scusa");
    advanceUntilButton("Offri il panino");
    send("dai panino");
    advanceUntilButton("Accompagnalo alla mensa");

    send("accompagna vecchio");

    expect(getFlag(story, "vecchio_accompagnato")).toBe(true);
    expect(getFlag(story, "aiuto_vecchio")).toBe("A_panino_accompagna");

    advanceUntilButton("Ascolta in silenzio");
    click("Ascolta in silenzio");
    advanceUntil("varchi la soglia della mensa di Mezclar");
    advanceUntil("il posto di tua madre");
    expect(root.textContent).toContain("il posto di tua madre");
  });
});
