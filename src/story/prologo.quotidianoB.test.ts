import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./createStory";
import type { InkStory } from "./inkTypes";
import { getFlag } from "../state/saveLoad";

/**
 * Story-walk dell'Issue #6 (Quotidiano B, P10-P21): la catena di dialoghi
 * (spada, mostro affamato, Errol, mensa, Lesmidoom, "Fai buon viaggio", notte)
 * imposta i flag attesi e raggiunge P22, sia nella modalita' "accompagnato" sia
 * in quella "ritrovato alla mensa".
 */

function drain(story: InkStory): string[] {
  const scenes: string[] = [];

  while (story.canContinue) {
    story.Continue();
    for (const tag of story.currentTags ?? []) {
      if (tag.startsWith("scene:")) {
        scenes.push(tag.slice("scene:".length).trim());
      }
    }
  }

  return scenes;
}

function choose(story: InkStory, needle: string): void {
  const choice = story.currentChoices.find((candidate) => candidate.text.includes(needle));

  if (!choice) {
    const available = story.currentChoices.map((candidate) => candidate.text).join(" | ");
    throw new Error(`Scelta "${needle}" non trovata. Disponibili: ${available || "(nessuna)"}`);
  }

  story.ChooseChoiceIndex(choice.index);
}

type WalkB = {
  /** true = ramo A (panino+accompagnato), false = ramo D (niente panino, indica). */
  accompagnato: boolean;
  /** Scelta in P12 -> seed_mostro_affamato. */
  mostro: "netto" | "difensivo" | "esitante";
};

const MOSTRO_CHOICE: Record<WalkB["mostro"], string> = {
  netto: "Lo uccido",
  difensivo: "Se viene verso di me",
  esitante: "Prima gli grido"
};

/** Percorre tutto il prologo fino a P22, raccogliendo le scene viste. */
function walkB(story: InkStory, options: WalkB): string[] {
  const scenes: string[] = [];

  // --- D9 (Quotidiano A) fino a P09 ---
  drain(story);
  choose(story, "Resta sveglio");
  drain(story);
  choose(story, "Segui lo scoiattolo");
  drain(story);
  choose(story, "Segui le tracce");
  drain(story);
  choose(story, "Avvicinati subito");
  drain(story);
  choose(story, options.accompagnato ? "Offri il panino" : "Tienilo");
  drain(story);

  if (options.accompagnato) {
    choose(story, "Accompagnalo alla mensa");
  } else {
    choose(story, "Indicagli la strada");
    drain(story);
    choose(story, "Indica la strada e basta");
  }

  drain(story);
  choose(story, "Ascolta in silenzio"); // P09 -> P10

  // --- Quotidiano B: P10 -> P21 ---
  scenes.push(...drain(story)); // P10
  choose(story, "Serve a combattere i mostri");
  scenes.push(...drain(story)); // P11 -> P12
  choose(story, MOSTRO_CHOICE[options.mostro]);
  scenes.push(...drain(story)); // P13
  choose(story, "Chiedi se conosce Errol");
  scenes.push(...drain(story)); // P14
  choose(story, "Aiuta come sempre");
  scenes.push(...drain(story)); // P15
  choose(story, "Torna da Mirea");
  scenes.push(...drain(story)); // P16 -> P17
  choose(story, "Guarda tua madre");
  scenes.push(...drain(story)); // P18
  choose(story, "Resta vicino");
  scenes.push(...drain(story)); // P19
  choose(story, 'Rispondi "anche tu"');
  scenes.push(...drain(story)); // P20
  choose(story, "Lascia stare");
  scenes.push(...drain(story)); // P21
  choose(story, "Dormi");
  scenes.push(...drain(story)); // P22

  return scenes;
}

describe("Quotidiano B — story-walk P10-P21", () => {
  it("ramo accompagnato imposta i flag e raggiunge P22", () => {
    const story = createPrologueStory();
    const scenes = walkB(story, { accompagnato: true, mostro: "netto" });

    expect(getFlag(story, "dialogo_errol_ricevuto")).toBe(true);
    expect(getFlag(story, "lesmidoom_rivelato")).toBe(true);
    expect(getFlag(story, "fai_buon_viaggio_sentito")).toBe(true);
    expect(getFlag(story, "seed_mostro_affamato")).toBe("netto");

    // Tutte le scene P10-P21 sono state attraversate, fino a P22.
    for (let n = 10; n <= 22; n += 1) {
      expect(scenes).toContain(`p${n}`);
    }
  });

  it("ramo ritrovato alla mensa e' giocabile e raggiunge P22", () => {
    const story = createPrologueStory();
    const scenes = walkB(story, { accompagnato: false, mostro: "esitante" });

    expect(getFlag(story, "vecchio_accompagnato")).toBe(false);
    expect(getFlag(story, "lesmidoom_rivelato")).toBe(true);
    expect(getFlag(story, "fai_buon_viaggio_sentito")).toBe(true);
    expect(scenes).toContain("p22");
  });

  it.each(["netto", "difensivo", "esitante"] as const)(
    "P12 imposta seed_mostro_affamato=%s",
    (mostro) => {
      const story = createPrologueStory();
      walkB(story, { accompagnato: true, mostro });
      expect(getFlag(story, "seed_mostro_affamato")).toBe(mostro);
    }
  );
});
