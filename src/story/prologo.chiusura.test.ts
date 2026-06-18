import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./createStory";
import type { InkStory } from "./inkTypes";
import { getFlag, setFlag } from "../state/saveLoad";

/**
 * Story-walk dell'Issue #10 (Risveglio + segno + chiusura, P34-P36): dopo il
 * sogno si raggiungono risveglio, segno sul braccio sinistro e chiamata di
 * Mirea, impostando `segno_notato`, le tre varianti di `seed_curiosita_segno` e
 * `prologo_completato`.
 */

type DrainResult = { scenes: string[]; lines: string[] };

function drain(story: InkStory): DrainResult {
  const result: DrainResult = { scenes: [], lines: [] };

  while (story.canContinue) {
    const line = story.Continue().trim();
    if (line.length > 0) {
      result.lines.push(line);
    }
    for (const tag of story.currentTags ?? []) {
      if (tag.startsWith("scene:")) {
        result.scenes.push(tag.slice("scene:".length).trim());
      }
    }
  }

  return result;
}

function choose(story: InkStory, needle: string): void {
  const choice = story.currentChoices.find((candidate) => candidate.text.includes(needle));
  if (!choice) {
    const available = story.currentChoices.map((candidate) => candidate.text).join(" | ");
    throw new Error(`Scelta "${needle}" non trovata. Disponibili: ${available || "(nessuna)"}`);
  }
  story.ChooseChoiceIndex(choice.index);
}

/** Salta direttamente alla fine del sogno posizionando lo stato a P33. */
function jumpToP33(story: InkStory): void {
  // P33 e' raggiungibile da qualunque percorso della matrice; per la chiusura
  // bastano i flag minimi del sogno completato.
  story.ChoosePathString("p33");
  setFlag(story, "spada_consegnata_errol", true);
}

type SegnoChoice = "osserva" | "nasconde" | "minimizza";

const SEGNO_CHOICE: Record<SegnoChoice, string> = {
  osserva: "Guardalo meglio",
  nasconde: "Copri il braccio",
  minimizza: "Decidi che e' un graffio"
};

/** Percorre P33 -> P36 scegliendo la reazione al segno e rispondendo a Mirea. */
function walkChiusura(story: InkStory, segno: SegnoChoice): DrainResult {
  jumpToP33(story);

  const all: DrainResult = { scenes: [], lines: [] };
  const collect = (result: DrainResult) => {
    all.scenes.push(...result.scenes);
    all.lines.push(...result.lines);
  };

  collect(drain(story)); // P33
  choose(story, "Svegliati");
  collect(drain(story)); // P34
  choose(story, "Riprendi fiato");
  collect(drain(story)); // P35
  choose(story, SEGNO_CHOICE[segno]);
  collect(drain(story)); // P36
  choose(story, "Rispondi a Mirea");
  collect(drain(story)); // chiusura -> END

  return all;
}

describe("Chiusura del prologo (P34-P36)", () => {
  it("raggiunge risveglio, segno e chiamata di Mirea fino alla fine", () => {
    const story = createPrologueStory();
    const walk = walkChiusura(story, "osserva");

    for (const scene of ["p34", "p35", "p36"]) {
      expect(walk.scenes).toContain(scene);
    }

    expect(getFlag(story, "segno_notato")).toBe(true);
    expect(getFlag(story, "prologo_completato")).toBe(true);
    expect(walk.lines.some((line) => line.includes("Il prologo finisce qui"))).toBe(true);
  });

  it.each(["osserva", "nasconde", "minimizza"] as const)(
    "P35 imposta seed_curiosita_segno=%s",
    (segno) => {
      const story = createPrologueStory();
      walkChiusura(story, segno);
      expect(getFlag(story, "seed_curiosita_segno")).toBe(segno);
      expect(getFlag(story, "segno_notato")).toBe(true);
    }
  );

  it("a P36 si puo' riguardare il segno prima di rispondere (loop senza chiudere)", () => {
    const story = createPrologueStory();
    jumpToP33(story);
    drain(story);
    choose(story, "Svegliati");
    drain(story);
    choose(story, "Riprendi fiato");
    drain(story);
    choose(story, "Guardalo meglio");
    drain(story);

    // Guardare ancora il segno non chiude il prologo: l'opzione resta.
    choose(story, "Guarda ancora il segno");
    drain(story);
    expect(getFlag(story, "prologo_completato")).toBe(false);

    choose(story, "Rispondi a Mirea");
    drain(story);
    expect(getFlag(story, "prologo_completato")).toBe(true);
  });
});
