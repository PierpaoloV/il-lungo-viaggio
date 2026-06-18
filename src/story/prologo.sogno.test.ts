import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./createStory";
import type { InkStory } from "./inkTypes";
import { getFlag, setFlag } from "../state/saveLoad";

/**
 * Story-walk dell'Issue #8 (Sogno + matrice 2x2, P22-P33).
 *
 * Il combattimento e' risolto dal motore del terminale (i tag `# combat:`), non
 * dall'ink: in questa camminata "pura" gli scontri non vengono giocati, ma i
 * loro tag restano osservabili. Contare i tag `# combat:` lungo ogni percorso
 * verifica direttamente la matrice "1/2/2/3 scontri", mentre l'esito del
 * tutorial (`orco_allarme`) viene iniettato come farebbe il motore per pilotare
 * il ramo dei rinforzi (P30).
 */

type DrainResult = { scenes: string[]; combats: string[]; lines: string[] };

function drain(story: InkStory): DrainResult {
  const result: DrainResult = { scenes: [], combats: [], lines: [] };

  while (story.canContinue) {
    const line = story.Continue().trim();

    if (line.length > 0) {
      result.lines.push(line);
    }

    for (const tag of story.currentTags ?? []) {
      if (tag.startsWith("scene:")) {
        result.scenes.push(tag.slice("scene:".length).trim());
      }
      if (tag.startsWith("combat:")) {
        result.combats.push(tag.slice("combat:".length).trim());
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

/** Percorre il prologo (Quotidiano A + B) fino al bivio [Apri gli occhi nel sogno] di P22. */
function walkToP22(story: InkStory): void {
  drain(story);
  choose(story, "Resta sveglio");
  drain(story);
  choose(story, "Segui lo scoiattolo");
  drain(story);
  choose(story, "Segui le tracce");
  drain(story);
  choose(story, "Chiedi scusa");
  drain(story);
  choose(story, "Offri il panino");
  drain(story);
  choose(story, "Accompagnalo alla mensa");
  drain(story);
  choose(story, "Ascolta in silenzio");
  drain(story);
  choose(story, "Serve a combattere i mostri");
  drain(story);
  choose(story, "Lo uccido");
  drain(story);
  choose(story, "Chiedi della battaglia");
  drain(story);
  choose(story, "Aiuta come sempre");
  drain(story);
  choose(story, "Torna da Mirea");
  drain(story);
  choose(story, "Guarda tua madre");
  drain(story);
  choose(story, "Resta vicino");
  drain(story);
  choose(story, 'Rispondi "anche tu"');
  drain(story);
  choose(story, "Lascia stare");
  drain(story);
  choose(story, "Dormi");
  drain(story);
}

type DreamWalk = {
  bivio: "coordinato" | "solo";
  /** Esito del tutorial creatura-con-Spada, iniettato come il motore di combattimento. */
  allarme: boolean;
  /** Payoff esplorazione: tracce del bosco osservate in Quotidiano A. */
  bosco?: boolean;
};

/** Percorre il sogno P22-P33 raccogliendo scene, scontri e testo lungo il cammino. */
function walkDream(story: InkStory, options: DreamWalk): DrainResult {
  walkToP22(story);

  const all: DrainResult = { scenes: [], combats: [], lines: [] };
  const collect = (result: DrainResult) => {
    all.scenes.push(...result.scenes);
    all.combats.push(...result.combats);
    all.lines.push(...result.lines);
  };

  if (options.bosco !== undefined) {
    setFlag(story, "bosco_tracce_osservate", options.bosco);
  }

  choose(story, "Apri gli occhi nel sogno");
  collect(drain(story)); // P23 (bivio)

  choose(story, options.bivio === "coordinato" ? "Parla col fabbro" : "Corri subito a nord");
  collect(drain(story)); // coordinato -> P24 (scorta); solo -> P25 (scontro) -> P26

  if (options.bivio === "coordinato") {
    choose(story, "Lascia che la scorta apra il passaggio");
    collect(drain(story)); // P26 (bivio tracce)
  }

  choose(story, "Esamina il terreno");
  collect(drain(story)); // P27 (medaglione)

  choose(story, "Raccogli il medaglione");
  collect(drain(story)); // P27_tracce (segui)

  choose(story, "Segui le tracce di sangue");
  collect(drain(story)); // P28 (tutorial) -> P29 (prendi la Spada)

  // Il motore avrebbe scritto orco_allarme in base al colpo del tutorial.
  setFlag(story, "orco_allarme", options.allarme);

  choose(story, "Prendi la Spada");
  collect(drain(story)); // P29_esito -> P30 (rinforzi) o direttamente P31

  choose(story, "Lancia la Spada a Errol");
  collect(drain(story)); // P32

  choose(story, "Lascia che il sogno si chiuda");
  collect(drain(story)); // P33 (Svegliati)

  return all;
}

const MATRICE: Array<DreamWalk & { scontriAttesi: number }> = [
  { bivio: "coordinato", allarme: false, scontriAttesi: 1 },
  { bivio: "coordinato", allarme: true, scontriAttesi: 2 },
  { bivio: "solo", allarme: false, scontriAttesi: 2 },
  { bivio: "solo", allarme: true, scontriAttesi: 3 }
];

describe("Sogno — matrice 2x2 (P22-P33)", () => {
  it.each(MATRICE)(
    "bivio=$bivio allarme=$allarme produce $scontriAttesi scontri e raggiunge P33",
    ({ bivio, allarme, scontriAttesi }) => {
      const story = createPrologueStory();
      const walk = walkDream(story, { bivio, allarme });

      expect(walk.combats).toHaveLength(scontriAttesi);
      expect(walk.scenes).toContain("p31");
      expect(walk.scenes).toContain("p33");

      // Flag perdite/bivio impostati dalla scelta D13 di P23.
      expect(getFlag(story, "sogno_bivio")).toBe(bivio);
      expect(getFlag(story, "sogno_perdite")).toBe(bivio === "coordinato" ? "ridotte" : "alte");
      expect(getFlag(story, "spada_lungo_viaggio_recuperata")).toBe(true);
      expect(getFlag(story, "spada_consegnata_errol")).toBe(true);
    }
  );

  it("la sequenza degli scontri rispetta l'ordine della matrice", () => {
    const coordinatoAllarme = walkDream(createPrologueStory(), {
      bivio: "coordinato",
      allarme: true
    });
    expect(coordinatoAllarme.combats).toEqual([
      "TutorialOrcoSpada",
      "ScontroTreNemici.rinforzi"
    ]);

    const soloAllarme = walkDream(createPrologueStory(), { bivio: "solo", allarme: true });
    expect(soloAllarme.combats).toEqual([
      "ScontroTreNemici.initial",
      "TutorialOrcoSpada",
      "ScontroTreNemici.rinforzi"
    ]);
  });

  it("il ramo coordinato salta il primo scontro (sogno_primo_scontro=saltato)", () => {
    const story = createPrologueStory();
    walkDream(story, { bivio: "coordinato", allarme: false });
    expect(getFlag(story, "sogno_primo_scontro")).toBe("saltato");
  });

  describe("payoff bosco_tracce_osservate a P27", () => {
    it("se osservate, le tracce richiamano lo scoiattolo del bosco", () => {
      const walk = walkDream(createPrologueStory(), {
        bivio: "coordinato",
        allarme: false,
        bosco: true
      });
      expect(walk.lines.some((line) => line.includes("scoiattolo"))).toBe(true);
    });

    it("se non osservate, il richiamo allo scoiattolo non compare", () => {
      const walk = walkDream(createPrologueStory(), {
        bivio: "coordinato",
        allarme: false,
        bosco: false
      });
      expect(walk.lines.some((line) => line.includes("scoiattolo"))).toBe(false);
    });
  });
});
