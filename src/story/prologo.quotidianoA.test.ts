import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./createStory";
import type { InkStory } from "./inkTypes";
import { getFlag } from "../state/saveLoad";

/**
 * Story-walk dell'Issue #5 (Quotidiano A, P00-P09): percorrendo i quattro rami
 * D9 i flag devono essere corretti e tutti i percorsi devono convergere alla
 * mensa. Si guida la storia scegliendo le scelte situazionali per testo, come
 * farebbe il giocatore con i bottoni.
 */

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

/** Tutte le righe + i tag raccolti fino al raggiungimento del knot `mensa`. */
function sceneTags(allTags: string[]): string[] {
  return allTags
    .filter((tag) => tag.startsWith("scene:"))
    .map((tag) => tag.slice("scene:".length).trim());
}

type WalkOptions = {
  examineTracce?: boolean;
  panino: boolean;
  accompagna: boolean;
};

/** Percorre P00 fino alla mensa applicando le scelte D9, restituendo le scene viste. */
function walk(story: InkStory, options: WalkOptions): string[] {
  const seen: string[] = [];

  advanceToChoices(story); // P00 (leggenda)
  choose(story, "Resta sveglio");

  // P01 -> P02 -> P03 (lineari, fino alla prima scelta: lo scoiattolo)
  seen.push(...sceneTags(advanceToChoices(story)));
  choose(story, "Segui lo scoiattolo");

  // P04: le tracce
  seen.push(...sceneTags(advanceToChoices(story)));

  if (options.examineTracce) {
    // Simula `esamina tracce` impostando il flag come fa il terminale.
    story.variablesState.$("bosco_tracce_osservate", true);
  }

  choose(story, "Segui le tracce");

  // P05: l'urto
  seen.push(...sceneTags(advanceToChoices(story)));
  choose(story, "Chiedi scusa");

  // P06: il mezzo panino
  seen.push(...sceneTags(advanceToChoices(story)));
  choose(story, options.panino ? "Offri il panino" : "Tienilo");

  // P07: la richiesta
  seen.push(...sceneTags(advanceToChoices(story)));

  if (options.accompagna) {
    choose(story, "Accompagnalo alla mensa");
  } else {
    choose(story, "Indicagli la strada");
    advanceToChoices(story);
    choose(story, "Indica la strada e basta");
  }

  // P08 (solo ramo B) e/o P09, poi convergenza alla mensa
  seen.push(...sceneTags(advanceToChoices(story)));

  if (story.currentChoices.some((candidate) => candidate.text.includes("Vai alla mensa"))) {
    // Ramo B: rimorso, poi prosegue verso la mensa.
    choose(story, "Vai alla mensa");
    seen.push(...sceneTags(advanceToChoices(story)));
  }

  // P09: verso la mensa
  choose(story, "Ascolta in silenzio");
  seen.push(...sceneTags(advanceToChoices(story)));

  return seen;
}

describe("Quotidiano A — story-walk dei 4 rami D9", () => {
  it("Ramo A: panino dato + accompagnato", () => {
    const story = createPrologueStory();
    const seen = walk(story, { panino: true, accompagna: true });

    expect(getFlag(story, "panino_dato")).toBe(true);
    expect(getFlag(story, "vecchio_accompagnato")).toBe(true);
    expect(getFlag(story, "aiuto_vecchio")).toBe("A_panino_accompagna");
    expect(getFlag(story, "rimorso_tornato")).toBe(false);
    expect(seen).toContain("p10");
  });

  it("Ramo B: panino dato + non accompagnato -> rimorso, ritrovato alla mensa", () => {
    const story = createPrologueStory();
    const seen = walk(story, { panino: true, accompagna: false });

    expect(getFlag(story, "panino_dato")).toBe(true);
    expect(getFlag(story, "vecchio_accompagnato")).toBe(false);
    expect(getFlag(story, "aiuto_vecchio")).toBe("B_panino_non_accompagna");
    expect(getFlag(story, "rimorso_tornato")).toBe(true);
    expect(seen).toContain("p08");
    expect(seen).toContain("p10");
  });

  it("Ramo C: niente panino + accompagnato", () => {
    const story = createPrologueStory();
    const seen = walk(story, { panino: false, accompagna: true });

    expect(getFlag(story, "panino_dato")).toBe(false);
    expect(getFlag(story, "vecchio_accompagnato")).toBe(true);
    expect(getFlag(story, "aiuto_vecchio")).toBe("C_no_panino_accompagna");
    expect(getFlag(story, "rimorso_tornato")).toBe(false);
    expect(seen).toContain("p10");
  });

  it("Ramo D: niente panino + indica la strada", () => {
    const story = createPrologueStory();
    const seen = walk(story, { panino: false, accompagna: false });

    expect(getFlag(story, "panino_dato")).toBe(false);
    expect(getFlag(story, "vecchio_accompagnato")).toBe(false);
    expect(getFlag(story, "aiuto_vecchio")).toBe("D_no_panino_indica");
    expect(getFlag(story, "rimorso_tornato")).toBe(false);
    expect(seen).not.toContain("p08");
    expect(seen).toContain("p10");
  });

  it("bosco_tracce_osservate resta false se non si esaminano le tracce", () => {
    const story = createPrologueStory();
    walk(story, { panino: true, accompagna: true, examineTracce: false });
    expect(getFlag(story, "bosco_tracce_osservate")).toBe(false);
  });

  it("bosco_tracce_osservate diventa true esaminando le tracce in P04", () => {
    const story = createPrologueStory();
    walk(story, { panino: true, accompagna: true, examineTracce: true });
    expect(getFlag(story, "bosco_tracce_osservate")).toBe(true);
  });
});
