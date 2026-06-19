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

/** Come advanceToChoices, ma restituisce il testo concatenato della scena. */
function advanceText(story: InkStory): string {
  let text = "";
  while (story.canContinue) {
    text += `${story.Continue()}\n`;
  }
  return text;
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

/**
 * Beat 3 -> percorso in cammino. Arriva alla scelta "Non hai paura dei boschi".
 * Usa il gesto "Avvicinati subito" (empatia) e tiene il panino per non sporcare
 * coraggio/acume: cosi' gli incrementi di coraggio osservati vengono dal cammino.
 */
function walkToCammino(story: InkStory): void {
  walkToCaduta(story);
  choose(story, "Avvicinati subito");
  advanceToChoices(story); // P06: il panino
  choose(story, "Tienilo");
  advanceToChoices(story); // P07: accompagnare?
  choose(story, "Accompagnalo alla mensa");
  advanceToChoices(story); // cammino: "Non hai paura dei boschi"
}

/**
 * Beat 3 -> Parte C (non accompagna). Percorre rimorso (p08) + riunione mensa
 * (p09) e si ferma alle scelte D1, con la cornice "al tavolo". Restituisce le
 * scene viste lungo il percorso.
 */
function walkToMensaDialogo(story: InkStory): string[] {
  walkToCaduta(story);
  choose(story, "Avvicinati subito");
  advanceToChoices(story); // P06: il panino
  choose(story, "Tienilo");
  advanceToChoices(story); // P07: accompagnare?
  const seen: string[] = [];
  choose(story, "Lascialo andare da solo");
  seen.push(...sceneTags(advanceToChoices(story))); // p08: rimorso
  choose(story, "Vai alla mensa");
  seen.push(...sceneTags(advanceToChoices(story))); // p09: riunione + seme
  choose(story, "Siediti con lui");
  seen.push(...sceneTags(advanceToChoices(story))); // dialogo_d1
  return seen;
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

describe("Beat 3 + percorso in cammino, D1/D2 (Issue #13)", () => {
  it("scegliere di accompagnare non incrementa nessuna stat", () => {
    const story = createPrologueStory();
    walkToPanino(story); // gesto "Guarda la caviglia" -> acume = 1
    choose(story, "Tienilo");
    advanceToChoices(story); // P07

    choose(story, "Accompagnalo alla mensa");
    advanceToChoices(story); // cammino

    expect(getFlag(story, "vecchio_accompagnato")).toBe(true);
    expect(getFlag(story, "stat_acume")).toBe(1); // invariato dal gesto
    expect(getFlag(story, "stat_empatia")).toBe(0);
    expect(getFlag(story, "stat_coraggio")).toBe(0);
  });

  it("«A volte si'» a 'Non hai paura dei boschi' incrementa coraggio; le altre no", () => {
    const conCoraggio = createPrologueStory();
    walkToCammino(conCoraggio);
    choose(conCoraggio, "A volte si'");
    advanceToChoices(conCoraggio);
    expect(getFlag(conCoraggio, "stat_coraggio")).toBe(1);

    const senza = createPrologueStory();
    walkToCammino(senza);
    choose(senza, "No. Li conosco.");
    advanceToChoices(senza);
    expect(getFlag(senza, "stat_coraggio")).toBe(0);
  });

  const d2Cases = [
    { scelta: "un eroe che sconfigge i mostri", stat: "stat_coraggio" },
    { scelta: "sapere tutto del mondo", stat: "stat_acume" },
    { scelta: "aiutare le persone", stat: "stat_empatia" }
  ] as const;

  for (const { scelta, stat } of d2Cases) {
    it(`in cammino fino a p10: D2 «${scelta}» incrementa ${stat}`, () => {
      const story = createPrologueStory();
      walkToCammino(story); // empatia=1 (Avvicinati), acume/coraggio=0

      choose(story, "Stringi le spalle"); // "Non hai paura": nessuno stat
      advanceToChoices(story); // cammino_seme
      choose(story, "Ascolta in silenzio");
      advanceToChoices(story); // D1
      choose(story, "Combatto i mostri"); // D1: nessuno stat
      advanceToChoices(story); // D2

      const prima = getFlag(story, stat);
      choose(story, scelta);
      const seen = sceneTags(advanceToChoices(story));

      expect(getFlag(story, stat)).toBe((prima as number) + 1);
      // Confluenza nel knot p10 condiviso.
      expect(seen).toContain("p10");
      expect(story.currentChoices.map((candidate) => candidate.text)).toContain(
        "Serve a combattere i mostri"
      );
    });
  }
});

describe("Percorso rimorso/mensa, cornice al tavolo (Issue #14)", () => {
  it("non accompagnare passa dal rimorso e arriva al D1 con cornice al tavolo", () => {
    const story = createPrologueStory();
    const seen = walkToMensaDialogo(story);

    expect(getFlag(story, "vecchio_accompagnato")).toBe(false);
    expect(getFlag(story, "rimorso_tornato")).toBe(true);
    expect(seen).toContain("p08"); // rimorso
    // Stesso D1 condiviso del percorso in cammino.
    expect(story.currentChoices.map((candidate) => candidate.text)).toContain(
      "\"Combatto i mostri.\""
    );
  });

  it("il rimorso reagisce al panino: ramo D (senza panino) lo segnala in tasca", () => {
    const story = createPrologueStory();
    walkToCaduta(story);
    choose(story, "Avvicinati subito");
    advanceToChoices(story);
    choose(story, "Tienilo"); // niente panino
    advanceToChoices(story);
    choose(story, "Lascialo andare da solo");
    advanceText(story); // p08: rimorso (intro)
    choose(story, "Vai alla mensa");
    const testo = advanceText(story); // corpo della scelta + p09

    expect(testo).toContain("Il mezzo panino e' ancora in tasca");
  });

  it("D1/D2 al tavolo confluiscono in p10 e D2 incrementa la stat", () => {
    const story = createPrologueStory();
    walkToMensaDialogo(story); // empatia=1 (Avvicinati), al D1

    choose(story, "Guardo le cose"); // D1: nessuno stat
    advanceToChoices(story); // D2 (al tavolo)
    choose(story, "sapere tutto del mondo"); // -> acume
    const seen = sceneTags(advanceToChoices(story));

    expect(getFlag(story, "stat_acume")).toBe(1);
    expect(seen).toContain("p10");
    expect(story.currentChoices.map((candidate) => candidate.text)).toContain(
      "Serve a combattere i mostri"
    );
  });
});
