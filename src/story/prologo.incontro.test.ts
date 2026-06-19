import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./createStory";
import type { InkStory } from "./inkTypes";
import { getFlag } from "../state/saveLoad";

/**
 * Story-walk dell'Issue #11 (Beat 1 — la caduta). Verifica che:
 * - le statistiche diegetiche partano da 0;
 * - ognuno dei tre primi-gesti avanzi la scena e incrementi la stat attesa;
 * - l'aiuto sia non rifiutabile (gather comune -> p06 in ogni percorso).
 */

/** Avanza fino al prossimo blocco di scelte, raccogliendo i tag visti. */
function advanceToChoices(story: InkStory): string[] {
  const tags: string[] = [];

  while (story.canContinue) {
    story.Continue();
    for (const tag of story.currentTags ?? []) {
      tags.push(tag);
    }
  }

  return tags;
}

/** Sceglie, fra le scelte disponibili, quella il cui testo contiene `needle`. */
function choose(story: InkStory, needle: string): void {
  const choice = story.currentChoices.find((candidate) => candidate.text.includes(needle));

  if (!choice) {
    const available = story.currentChoices.map((candidate) => candidate.text).join(" | ");
    throw new Error(`Scelta "${needle}" non trovata. Disponibili: ${available || "(nessuna)"}`);
  }

  story.ChooseChoiceIndex(choice.index);
}

function sceneTags(allTags: string[]): string[] {
  return allTags
    .filter((tag) => tag.startsWith("scene:"))
    .map((tag) => tag.slice("scene:".length).trim());
}

/** Porta la storia fino al blocco di scelte di p05 (la caduta). */
function walkToCaduta(story: InkStory): void {
  advanceToChoices(story); // P00 (leggenda)
  choose(story, "Resta sveglio");
  advanceToChoices(story); // P01 -> P02 -> P03
  choose(story, "Segui lo scoiattolo");
  advanceToChoices(story); // P04: le tracce
  choose(story, "Segui le tracce");
  advanceToChoices(story); // P05: la caduta
}

/** Supera la caduta (gesto neutro per le stat: l'acume) e arriva alle scelte del panino. */
function walkToPanino(story: InkStory): void {
  walkToCaduta(story);
  choose(story, "Guarda la caviglia");
  advanceToChoices(story); // P06: il panino
}

describe("Beat 1 — la caduta (Issue #11)", () => {
  it("le statistiche partono da 0", () => {
    const story = createPrologueStory();

    expect(getFlag(story, "stat_empatia")).toBe(0);
    expect(getFlag(story, "stat_coraggio")).toBe(0);
    expect(getFlag(story, "stat_acume")).toBe(0);
  });

  it("mostra esattamente i tre primi-gesti del copione", () => {
    const story = createPrologueStory();
    walkToCaduta(story);

    const choices = story.currentChoices.map((candidate) => candidate.text);
    expect(choices).toEqual(["Avvicinati subito", "Chiedi se sta bene", "Guarda la caviglia"]);
  });

  const cases = [
    { gesto: "Avvicinati subito", stat: "stat_empatia" },
    { gesto: "Chiedi se sta bene", stat: "stat_acume" },
    { gesto: "Guarda la caviglia", stat: "stat_acume" }
  ] as const;

  for (const { gesto, stat } of cases) {
    it(`«${gesto}» avanza la scena, pianta il seme e incrementa ${stat}`, () => {
      const story = createPrologueStory();
      walkToCaduta(story);

      choose(story, gesto);
      const seen = sceneTags(advanceToChoices(story));

      // Ogni gesto incrementa solo la stat attesa.
      expect(getFlag(story, stat)).toBe(1);
      for (const other of ["stat_empatia", "stat_coraggio", "stat_acume"]) {
        if (other !== stat) {
          expect(getFlag(story, other)).toBe(0);
        }
      }

      // L'aiuto e' non rifiutabile: il gather comune avanza fino a p06.
      expect(seen).toContain("p05");
      expect(story.currentChoices.map((candidate) => candidate.text)).toContain("Offri il panino");
    });
  }
});

describe("Beat 2 — panino e presentazione (Issue #12)", () => {
  it("offre i due gesti del panino del copione", () => {
    const story = createPrologueStory();
    walkToPanino(story);

    const choices = story.currentChoices.map((candidate) => candidate.text);
    expect(choices).toEqual(["Offri il panino", "Tienilo"]);
  });

  it("«Offri il panino» imposta panino_dato e incrementa empatia, poi presenta Lesmidoom", () => {
    const story = createPrologueStory();
    walkToPanino(story); // gesto "Guarda la caviglia": empatia parte da 0 qui

    choose(story, "Offri il panino");
    const seen = sceneTags(advanceToChoices(story));

    expect(getFlag(story, "panino_dato")).toBe(true);
    expect(getFlag(story, "stat_empatia")).toBe(1);
    // La presentazione (p06b, etichettata scene p06) porta fino alla scelta di Beat 3.
    expect(seen).toContain("p06");
    expect(story.currentChoices.map((candidate) => candidate.text)).toContain(
      "Accompagnalo alla mensa"
    );
  });

  it("«Tienilo» imposta panino_dato=false senza toccare empatia, poi presenta Lesmidoom", () => {
    const story = createPrologueStory();
    walkToPanino(story); // gesto "Guarda la caviglia": empatia parte da 0 qui

    choose(story, "Tienilo");
    advanceToChoices(story);

    expect(getFlag(story, "panino_dato")).toBe(false);
    expect(getFlag(story, "stat_empatia")).toBe(0);
    expect(story.currentChoices.map((candidate) => candidate.text)).toContain(
      "Accompagnalo alla mensa"
    );
  });
});
