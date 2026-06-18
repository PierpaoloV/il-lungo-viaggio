import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./story/createStory";
import type { InkStory } from "./story/inkTypes";
import { getFlag } from "./state/saveLoad";
import { TerminalApp } from "./terminalApp";

/**
 * End-to-end dell'Issue #8 nel terminale: i tag `# combat:` del sogno avviano
 * davvero gli scontri, gli attacchi del giocatore impostano i flag della matrice
 * e la sconfitta morbida riporta all'accampamento (P23) senza game over.
 */

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

  const buttons = () => Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice"));
  const combatButtons = () =>
    Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice--combat"));
  const climaxImage = () => root.querySelector<HTMLImageElement>("[data-testid='dream-climax-image']");

  /** Avanza con `aspetta` fino a `needle`, cliccando la prima scelta disponibile. */
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

  /** Avanza la narrazione (con `aspetta`) finche' non appare il bottone richiesto, poi lo clicca. */
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

  /** Avanza la narrazione finche' uno scontro non e' attivo. */
  const advanceUntilCombat = () => {
    for (let index = 0; index < 40; index += 1) {
      if (combatButtons().length > 0) {
        return;
      }
      send("aspetta");
    }
    throw new Error("Lo scontro non e' partito");
  };

  /** Avanza la narrazione (solo `aspetta`) finche' `needle` non compare nel transcript. */
  const advanceUntilText = (needle: string) => {
    for (let index = 0; index < 40; index += 1) {
      if (root.textContent?.includes(needle)) {
        return;
      }
      send("aspetta");
    }
    throw new Error(`Non ho raggiunto: "${needle}"`);
  };

  const attack = (opening: string) => send(`attacca ${opening}`);
  const isDream = () => root.querySelector(".terminal")!.classList.contains("terminal--dream");

  return {
    root,
    send,
    autoPlayUntil,
    clickWhenAvailable,
    advanceUntilCombat,
    advanceUntilText,
    attack,
    climaxImage,
    isDream
  };
}

/** Percorre Quotidiano A+B e si ferma al bivio [Apri gli occhi nel sogno] di P22. */
function enterDream(app: ReturnType<typeof mountApp>): void {
  app.autoPlayUntil("Apri gli occhi. Non sei nel letto.");
  app.clickWhenAvailable("Apri gli occhi nel sogno");
}

describe("Sogno nel terminale — scontri reali e matrice", () => {
  it("percorso 'solo + allarme': tre scontri reali fino a P33", () => {
    const story = createPrologueStory();
    const app = mountApp(story);
    enterDream(app);

    // P23: ramo da solo -> primo scontro coi tre nemici (vinto pulito).
    app.clickWhenAvailable("Corri subito a nord");
    app.advanceUntilCombat();
    app.attack("ginocchia");
    app.attack("fianco");
    app.attack("braccio");

    // P26 -> P27: medaglione e tracce.
    app.clickWhenAvailable("Esamina il terreno");
    app.clickWhenAvailable("Raccogli il medaglione");
    app.clickWhenAvailable("Segui le tracce di sangue");

    // P28: tutorial creatura-con-Spada con colpo maldestro -> allarme.
    app.advanceUntilCombat();
    app.attack("testa"); // errore: la creatura urla, parte l'allarme
    app.attack("ginocchia"); // chiude comunque lo scontro
    expect(getFlag(story, "orco_allarme")).toBe(true);

    // P29 -> P30: l'allarme richiama i rinforzi (terzo scontro).
    app.clickWhenAvailable("Prendi la Spada");
    app.advanceUntilCombat();
    app.attack("ginocchia");
    app.attack("fianco");
    app.attack("braccio");

    // P31 -> P32 -> P33: consegna e chiusura.
    app.clickWhenAvailable("Lancia la Spada a Errol");
    app.clickWhenAvailable("Lascia che il sogno si chiuda");
    app.advanceUntilText("Rimane il buio");

    expect(app.isDream()).toBe(true);
    expect(getFlag(story, "sogno_bivio")).toBe("solo");
    expect(getFlag(story, "sogno_perdite")).toBe("alte");
    expect(getFlag(story, "sogno_primo_scontro")).toBe("vinto");
    expect(getFlag(story, "rinforzi_post_orco")).toBe("vinti");
    expect(getFlag(story, "spada_lungo_viaggio_recuperata")).toBe(true);
    expect(getFlag(story, "spada_consegnata_errol")).toBe(true);
  });

  it("percorso 'coordinato + colpo pulito': un solo scontro (il tutorial)", () => {
    const story = createPrologueStory();
    const app = mountApp(story);
    enterDream(app);

    // P23: ramo coordinato -> la scorta apre il passaggio, primo scontro saltato.
    app.clickWhenAvailable("Parla col fabbro");
    app.clickWhenAvailable("Lascia che la scorta apra il passaggio");
    expect(getFlag(story, "sogno_primo_scontro")).toBe("saltato");

    app.clickWhenAvailable("Vai a est");
    app.clickWhenAvailable("Raccogli il medaglione");
    app.clickWhenAvailable("Segui le tracce di sangue");

    // P28: tutorial chiuso pulito -> nessun allarme, nessun rinforzo.
    app.advanceUntilCombat();
    app.attack("fianco");
    expect(getFlag(story, "orco_allarme")).toBe(false);
    expect(getFlag(story, "colpo_tutorial")).toBe("fianco");

    app.clickWhenAvailable("Prendi la Spada");
    app.clickWhenAvailable("Lancia la Spada a Errol");
    app.clickWhenAvailable("Lascia che il sogno si chiuda");
    app.advanceUntilText("Rimane il buio");

    expect(getFlag(story, "sogno_bivio")).toBe("coordinato");
    expect(getFlag(story, "rinforzi_post_orco")).toBe("non_applicabile");
    expect(getFlag(story, "spada_consegnata_errol")).toBe(true);
  });

  it("all'evento spada_consegnata_errol mostra l'immagine del climax nel registro sogno", () => {
    const story = createPrologueStory();
    const app = mountApp(story);
    enterDream(app);

    app.clickWhenAvailable("Parla col fabbro");
    app.clickWhenAvailable("Lascia che la scorta apra il passaggio");
    app.clickWhenAvailable("Vai a est");
    app.clickWhenAvailable("Raccogli il medaglione");
    app.clickWhenAvailable("Segui le tracce di sangue");

    app.advanceUntilCombat();
    app.attack("fianco");

    app.clickWhenAvailable("Prendi la Spada");
    expect(app.climaxImage()).toBeNull();

    app.clickWhenAvailable("Lancia la Spada a Errol");

    const image = app.climaxImage();
    expect(image).not.toBeNull();

    if (!image) {
      throw new Error("Immagine del climax non trovata");
    }

    expect(image.getAttribute("src")).toContain("sogno-consegna-spada-v1.png");
    expect(image.alt).toContain("il soldato che la lancia resta di spalle");
    expect(image.width).toBe(1672);
    expect(image.height).toBe(941);
    expect(image.hasAttribute("hidden")).toBe(false);
    expect(image.closest("[data-category='image']")).not.toBeNull();
    expect(getFlag(story, "spada_consegnata_errol")).toBe(true);
  });

  it("due errori in uno scontro: sconfitta morbida e ritorno a P23 (nessun game over)", () => {
    const story = createPrologueStory();
    const app = mountApp(story);
    enterDream(app);

    app.clickWhenAvailable("Corri subito a nord");
    app.advanceUntilCombat();
    app.attack("testa"); // primo errore
    app.attack("testa"); // secondo errore -> rianimazione

    // Il sogno riporta all'accampamento: il bivio di P23 e' di nuovo disponibile.
    app.clickWhenAvailable("Parla col fabbro");

    expect(getFlag(story, "sogno_rianimato")).toBe(true);
    expect(getFlag(story, "sogno_primo_scontro")).toBe("rianimato");
    expect(app.isDream()).toBe(true);
  });
});
