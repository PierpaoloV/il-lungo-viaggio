import { describe, expect, it } from "vitest";

import { getFlag } from "./state/saveLoad";
import { createPrologueStory } from "./story/createStory";
import type { InkStory } from "./story/inkTypes";
import { TerminalApp } from "./terminalApp";

/**
 * Tier 3 — dialoghi knowledge-gated (`chiedi di <argomento>`), modello Roadwarden.
 * A P13 il vecchio racconta di Errol; alcuni argomenti sono sempre disponibili,
 * mentre "la Spada del Lungo Viaggio" si sblocca solo dopo aver chiesto della guerra.
 */

function mount() {
  document.body.innerHTML = `<main id="app"></main>`;
  const root = document.querySelector<HTMLElement>("#app")!;
  const story = createPrologueStory();
  const app = new TerminalApp(story, { root });
  app.start();

  const form = root.querySelector<HTMLFormElement>("[data-testid='command-form']")!;
  const input = root.querySelector<HTMLInputElement>("[data-testid='command-input']")!;
  const send = (value: string) => {
    input.value = value;
    form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
  };
  const firstButton = () => root.querySelector<HTMLButtonElement>(".terminal__choice");

  /** Avanza cliccando la prima scelta (o `aspetta`) finche' `needle` non compare. */
  const autoPlayUntil = (needle: string) => {
    for (let i = 0; i < 120; i += 1) {
      if (root.textContent?.includes(needle)) return;
      const button = firstButton();
      if (button) button.click();
      else send("aspetta");
    }
    throw new Error(`Non ho raggiunto: "${needle}"`);
  };

  return { root, story, send, autoPlayUntil };
}

/** Porta la storia fino a P13 (il racconto su Errol) senza scegliere ancora. */
function atErrolScene(): ReturnType<typeof mount> {
  const app = mount();
  app.autoPlayUntil("Il vecchio non dice che hai torto");
  return app;
}

describe("Dialoghi knowledge-gated a P13 (chiedi di <x>)", () => {
  it("risponde a un argomento disponibile", () => {
    const app = atErrolScene();

    app.send("chiedi di Nylph");

    expect(app.root.textContent).toContain("Lontana,");
  });

  it("un argomento gated resta bloccato finche' non se ne acquisisce la conoscenza", () => {
    const app = atErrolScene();

    app.send("chiedi di spada lungo viaggio");
    expect(app.root.textContent).toContain("Il vecchio non l'ha ancora nominata");

    // Chiedere della guerra fa nominare la Spada: ora l'argomento si sblocca.
    app.send("chiedi di guerra");
    expect(getFlag(app.story, "vecchio_ha_nominato_spada")).toBe(true);

    app.send("chiedi di spada lungo viaggio");
    expect(app.root.textContent).toContain("Era di Errol");
  });

  it("aiuto elenca solo gli argomenti attualmente disponibili", () => {
    const app = atErrolScene();

    app.send("aiuto");
    const beforeHelp = app.root.textContent ?? "";
    expect(beforeHelp).toContain("Puoi chiedere di:");
    expect(beforeHelp).toContain("nylph");
    expect(beforeHelp).toContain("guerra");
    expect(beforeHelp).not.toContain("spada lungo viaggio");

    app.send("chiedi di guerra");
    app.send("aiuto");
    expect(app.root.textContent).toContain("spada lungo viaggio");
  });
});
