import { describe, expect, it } from "vitest";

import { createPrologueStory } from "../story/createStory";
import type { InkStory } from "../story/inkTypes";
import { setFlag } from "../state/saveLoad";
import { buildRecapCards, toRecapCardViews } from "./recapCards";
import { RECAP_ASSET_SRCS, RECAP_PLACEHOLDER_SRC } from "./recapAssets";

/**
 * Il recap di fine prologo e' lo specchio della partita: ogni card riflette una
 * scelta reale del giocatore, letta dai flag ink. Questi test fissano il
 * contratto card-per-flag e l'ordine cronologico.
 */

function storyWith(flags: Record<string, string | boolean>): InkStory {
  const story = createPrologueStory();
  for (const [name, value] of Object.entries(flags)) {
    setFlag(story, name, value);
  }
  return story;
}

function ids(story: InkStory): string[] {
  return buildRecapCards(story).map((c) => c.id);
}

describe("buildRecapCards", () => {
  it("mappa il panino dato sulla card 'panino-dato'", () => {
    expect(ids(storyWith({ panino_dato: true }))).toContain("panino-dato");
  });

  it("mappa il panino tenuto sulla card 'panino-tenuto'", () => {
    expect(ids(storyWith({ panino_dato: false }))).toContain("panino-tenuto");
  });

  it("distingue accompagnare, rimorso e abbandono nel ramo del cammino", () => {
    expect(ids(storyWith({ vecchio_accompagnato: true }))).toContain("cammino-insieme");
    expect(
      ids(storyWith({ vecchio_accompagnato: false, rimorso_tornato: true }))
    ).toContain("cammino-rimorso");
    expect(
      ids(storyWith({ vecchio_accompagnato: false, rimorso_tornato: false }))
    ).toContain("cammino-solo");
  });

  it("lascia muta (senza didascalia) la card del mostro 'netto'", () => {
    const cards = buildRecapCards(storyWith({ seed_mostro_affamato: "netto" }));
    const netto = cards.find((c) => c.id === "mostro-netto");
    expect(netto).toBeDefined();
    expect(netto!.caption).toBeUndefined();
  });

  it("da' voce alle altre risposte sul mostro affamato", () => {
    const difensivo = buildRecapCards(
      storyWith({ seed_mostro_affamato: "difensivo" })
    ).find((c) => c.id === "mostro-difensivo");
    expect(difensivo!.caption).toBe("Se mi viene vicino, mi difendo.");
  });

  it("riporta la citazione esatta per il segno 'minimizza'", () => {
    const card = buildRecapCards(storyWith({ seed_curiosita_segno: "minimizza" })).find(
      (c) => c.id === "segno-minimizza"
    );
    expect(card!.caption).toBe(
      "Decidi che e' soltanto un graffio. Lo decidi con troppa cura per crederci davvero."
    );
  });

  it("mantiene l'ordine cronologico: panino, cammino, mostro, sogno, segno", () => {
    const story = storyWith({
      panino_dato: true,
      vecchio_accompagnato: true,
      seed_mostro_affamato: "esitante",
      sogno_bivio: "solo",
      seed_curiosita_segno: "osserva"
    });
    expect(ids(story)).toEqual([
      "panino-dato",
      "cammino-insieme",
      "mostro-esitante",
      "sogno-solo",
      "segno-osserva"
    ]);
  });

  it("non emette card per le scelte non incrociate (flag stringa vuoti)", () => {
    // Sogno e segno non scelti: nessuna loro card.
    const story = storyWith({ sogno_bivio: "", seed_curiosita_segno: "" });
    const out = ids(story);
    expect(out.some((id) => id.startsWith("sogno-"))).toBe(false);
    expect(out.some((id) => id.startsWith("segno-"))).toBe(false);
  });
});

describe("toRecapCardViews", () => {
  it("usa l'asset definitivo quando registrato", () => {
    const [view] = toRecapCardViews(buildRecapCards(storyWith({ panino_dato: true })));
    expect(view.src).toBe(RECAP_ASSET_SRCS["panino-dato"]);
  });

  it("ricade sul placeholder quando la card non ha un asset definitivo", () => {
    const [view] = toRecapCardViews([{ id: "asset-mancante", alt: "Asset mancante." }]);
    expect(view.src).toBe(RECAP_PLACEHOLDER_SRC);
  });
});
