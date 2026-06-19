import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./createStory";
import type { InkStory } from "./inkTypes";
import { getFlag, setFlag } from "../state/saveLoad";

/**
 * Payoff di `seed_curiosita_vecchio`: il seme, scritto lungo il Quotidiano ma
 * prima mai riletto, ora colora il pensiero di Ernesto prima di dormire (P21).
 * Si percorre il Quotidiano due volte: massimizzando la curiosita' e azzerandola.
 */

function advance(story: InkStory): string {
  let text = "";
  while (story.canContinue) {
    text += `${story.Continue()}\n`;
  }
  return text;
}

function choose(story: InkStory, needle: string): void {
  const choice = story.currentChoices.find((candidate) => candidate.text.includes(needle));

  if (!choice) {
    const available = story.currentChoices.map((candidate) => candidate.text).join(" | ");
    throw new Error(`Scelta "${needle}" non trovata. Disponibili: ${available || "(nessuna)"}`);
  }

  story.ChooseChoiceIndex(choice.index);
}

/** Percorre P00 -> P21 e restituisce il testo della scena della notte (P21). */
function walkToNight(story: InkStory, curiosita: boolean): string {
  advance(story);
  choose(story, "Resta sveglio");
  advance(story);
  choose(story, "Segui lo scoiattolo");
  advance(story);
  choose(story, "Segui le tracce");
  advance(story);
  choose(story, "Avvicinati subito");
  advance(story);
  choose(story, "Offri il panino");
  advance(story);
  choose(story, "Accompagnalo alla mensa");
  advance(story);
  choose(story, curiosita ? "Chiedi dove sta andando" : "Ascolta in silenzio");
  advance(story);
  choose(story, "Serve a combattere i mostri");
  advance(story);
  choose(story, "Lo uccido");
  advance(story);
  choose(story, "Chiedi se conosce Errol");
  advance(story);
  choose(story, curiosita ? "Resta vicino al vecchio" : "Aiuta come sempre");
  advance(story);
  choose(story, curiosita ? "Chiedigli di Nylph" : "Torna da Mirea");
  advance(story);
  choose(story, curiosita ? "Guarda Lesmidoom" : "Guarda tua madre");
  advance(story);
  choose(story, "Resta vicino");
  advance(story);
  choose(story, "anche tu");
  advance(story);
  choose(story, "Chiedi a Mirea");
  return advance(story); // P21
}

/**
 * Percorre P00 -> P13 e si ferma alle scelte sul racconto di Errol.
 * Con `acumeAlto` si porta `stat_acume` alla soglia (>= 2) prima di P13: il
 * flag-ponte `acume_vivo` deve sbloccare la domanda extra «Errol da vicino».
 */
function walkToErrolChoices(story: InkStory, acumeAlto: boolean): string[] {
  if (acumeAlto) {
    setFlag(story, "stat_acume", 2);
  }
  advance(story);
  choose(story, "Resta sveglio");
  advance(story);
  choose(story, "Segui lo scoiattolo");
  advance(story);
  choose(story, "Segui le tracce");
  advance(story);
  choose(story, "Avvicinati subito");
  advance(story);
  choose(story, "Offri il panino");
  advance(story);
  choose(story, "Accompagnalo alla mensa");
  advance(story);
  choose(story, "Ascolta in silenzio");
  advance(story);
  choose(story, "Serve a combattere i mostri");
  advance(story);
  choose(story, "Lo uccido");
  advance(story);
  return story.currentChoices.map((choice) => choice.text);
}

describe("Scelta bonus gated dall'acume (P13)", () => {
  it("con acume alto il flag-ponte sblocca la domanda extra su Errol", () => {
    const story = createPrologueStory();
    const choices = walkToErrolChoices(story, true);

    expect(getFlag(story, "acume_vivo")).toBe(true);
    expect(choices).toContain("Chiedi com'era Errol da vicino");
  });

  it("senza acume la domanda extra non compare", () => {
    const story = createPrologueStory();
    const choices = walkToErrolChoices(story, false);

    expect(getFlag(story, "acume_vivo")).toBe(false);
    expect(choices).not.toContain("Chiedi com'era Errol da vicino");
  });
});

describe("Payoff di seed_curiosita_vecchio (P21)", () => {
  it("con curiosita' alta lascia una domanda aperta sul vecchio", () => {
    const story = createPrologueStory();
    const night = walkToNight(story, true);

    expect(getFlag(story, "seed_curiosita_vecchio")).toBe("alta");
    expect(night).toContain("Del vecchio ti resta una domanda che non hai fatto");
    expect(night).not.toContain("e' gia' un'ombra tra le altre");
  });

  it("senza curiosita' il vecchio sfuma tra i ricordi del giorno", () => {
    const story = createPrologueStory();
    const night = walkToNight(story, false);

    expect(getFlag(story, "seed_curiosita_vecchio")).toBe("bassa");
    expect(night).toContain("e' gia' un'ombra tra le altre");
    expect(night).not.toContain("Del vecchio ti resta una domanda");
  });
});
