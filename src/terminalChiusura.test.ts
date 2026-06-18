import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./story/createStory";
import type { InkStory } from "./story/inkTypes";
import { getFlag, hasSavedGame, loadGame, type StorageLike } from "./state/saveLoad";
import { TerminalApp } from "./terminalApp";

/**
 * Integration dell'Issue #10: una run completa raggiunge il risveglio (P34-P36),
 * la modalita' sogno viene rimossa, compare la schermata "Fine del Prologo" e il
 * progresso e' salvato automaticamente.
 */

function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => (map.has(key) ? map.get(key)! : null),
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    }
  };
}

function mountApp(story: InkStory, storage: StorageLike) {
  document.body.innerHTML = `<main id="app"></main>`;
  const root = document.querySelector<HTMLElement>("#app")!;
  const app = new TerminalApp(story, { root, storage });
  app.start();

  const form = root.querySelector<HTMLFormElement>("[data-testid='command-form']")!;
  const input = root.querySelector<HTMLInputElement>("[data-testid='command-input']")!;

  const send = (value: string) => {
    input.value = value;
    form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
  };

  const buttons = () => Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice"));
  const combatButtons = () =>
    Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice--combat"));

  const autoPlayUntil = (needle: string) => {
    for (let index = 0; index < 160; index += 1) {
      if (root.textContent?.includes(needle)) {
        return;
      }
      const [first] = buttons();
      if (first) {
        first.click();
      } else {
        send("aspetta");
      }
    }
    throw new Error(`Non ho raggiunto: "${needle}"`);
  };

  const clickWhenAvailable = (text: string) => {
    for (let index = 0; index < 60; index += 1) {
      const target = buttons().find((button) => button.textContent?.includes(text));
      if (target) {
        target.click();
        return;
      }
      if (buttons().length === 0) {
        send("aspetta");
        continue;
      }
      const available = buttons().map((button) => button.textContent).join(" | ");
      throw new Error(`Bottoni presenti ma "${text}" assente: ${available}`);
    }
    throw new Error(`Non ho trovato il bottone "${text}"`);
  };

  const advanceUntilCombat = () => {
    for (let index = 0; index < 40; index += 1) {
      if (combatButtons().length > 0) {
        return;
      }
      send("aspetta");
    }
    throw new Error("Lo scontro non e' partito");
  };

  const advanceUntilText = (needle: string) => {
    for (let index = 0; index < 40; index += 1) {
      if (root.textContent?.includes(needle)) {
        return;
      }
      send("aspetta");
    }
    throw new Error(`Non ho raggiunto: "${needle}"`);
  };

  const isDream = () => root.querySelector(".terminal")!.classList.contains("terminal--dream");
  const prologueEnd = () => root.querySelector("[data-testid='prologue-end']");

  return {
    root,
    send,
    autoPlayUntil,
    clickWhenAvailable,
    advanceUntilCombat,
    advanceUntilText,
    isDream,
    prologueEnd
  };
}

describe("Chiusura del prologo nel terminale (P34-P36)", () => {
  it("dal sogno al risveglio: rimuove dream-mode, mostra 'Fine del Prologo' e salva", () => {
    const storage = createMemoryStorage();
    const story = createPrologueStory();
    const app = mountApp(story, storage);

    // Sogno (percorso coordinato + colpo pulito: un solo scontro).
    app.autoPlayUntil("Apri gli occhi. Non sei nel letto.");
    expect(app.isDream()).toBe(true);

    app.clickWhenAvailable("Apri gli occhi nel sogno");
    app.clickWhenAvailable("Parla col fabbro");
    app.clickWhenAvailable("Lascia che la scorta apra il passaggio");
    app.clickWhenAvailable("Vai a est");
    app.clickWhenAvailable("Raccogli il medaglione");
    app.clickWhenAvailable("Segui le tracce di sangue");
    app.advanceUntilCombat();
    app.send("attacca fianco");
    app.clickWhenAvailable("Prendi la Spada");
    app.clickWhenAvailable("Lancia la Spada a Errol");
    app.clickWhenAvailable("Lascia che il sogno si chiuda");

    // P33 -> P34: il risveglio riporta il terminale alla modalita' normale.
    app.clickWhenAvailable("Svegliati");
    expect(app.root.textContent).toContain("Ti svegli di colpo");
    expect(app.isDream()).toBe(false);

    // P35: il segno sul braccio sinistro, reazione "osserva".
    app.clickWhenAvailable("Riprendi fiato");
    expect(app.root.textContent).toContain("braccio sinistro");
    app.clickWhenAvailable("Guardalo meglio");

    // P36: la chiamata di Mirea chiude il prologo.
    app.clickWhenAvailable("Rispondi a Mirea");
    app.advanceUntilText("Fine del Prologo");

    expect(app.prologueEnd()).not.toBeNull();
    expect(app.prologueEnd()!.textContent).toBe("Fine del Prologo");
    expect(getFlag(story, "segno_notato")).toBe(true);
    expect(getFlag(story, "seed_curiosita_segno")).toBe("osserva");
    expect(getFlag(story, "prologo_completato")).toBe(true);

    // Autosave: il progresso e' su storage e ricarica un prologo completato.
    expect(hasSavedGame({ storage })).toBe(true);
    const reloaded = createPrologueStory();
    expect(loadGame(reloaded, { storage })).toBe(true);
    expect(getFlag(reloaded, "prologo_completato")).toBe(true);
  });
});
