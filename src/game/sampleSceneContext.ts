import type { ParserContext, ParserObject } from "../parser/italianParser";

export type SceneId = "p00" | "p01";

export type InventoryItem = {
  id: string;
  label: string;
};

export type SceneContext = ParserContext & {
  sceneId: SceneId;
  look: string;
  inventory: InventoryItem[];
  descriptions: Record<string, string>;
};

const INVENTORY: InventoryItem[] = [
  { id: "spada_legno", label: "spada di legno" },
  { id: "mezzo_panino", label: "mezzo panino" }
];

const SHARED_OBJECTS: ParserObject[] = [
  {
    id: "spada_legno",
    label: "la spada di legno",
    aliases: ["spada", "spada di legno"]
  },
  {
    id: "mezzo_panino",
    label: "il mezzo panino",
    aliases: ["panino", "mezzo panino"]
  }
];

const SCENES: Record<SceneId, SceneContext> = {
  p00: {
    sceneId: "p00",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      {
        id: "mirea",
        label: "Mirea",
        aliases: ["mirea", "mamma"]
      },
      {
        id: "stanza",
        label: "la stanza",
        aliases: ["stanza", "camera"]
      }
    ],
    look:
      "La stanza e' piccola, nota, sicura. La voce di Mirea tiene lontano il buio.",
    descriptions: {
      mirea:
        "Ha le mani ferme e la voce bassa; quando racconta, sembra guardare qualcosa che tu non vedi.",
      stanza: "Piccola, nota, sicura.",
      spada_legno:
        "Una spada storta, liscia dove la mano la stringe sempre. Non taglia niente, ma nella tua testa e' sufficiente.",
      mezzo_panino: "Pane comune, un po' schiacciato. Ha l'odore della mattina."
    }
  },
  p01: {
    sceneId: "p01",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      {
        id: "mezclar",
        label: "Mezclar",
        aliases: ["mezclar", "citta", "citta vicina"]
      },
      {
        id: "bosco",
        label: "il bosco",
        aliases: ["bosco", "alberi", "margine del bosco"]
      }
    ],
    look:
      "I campi sono bassi e dorati. Il bosco resta poco piu' in la', fresco, fitto, un po' proibito.",
    descriptions: {
      spada_legno:
        "Una spada storta, liscia dove la mano la stringe sempre. Non taglia niente, ma nella tua testa e' sufficiente.",
      mezzo_panino: "Pane comune, un po' schiacciato. Ha l'odore della mattina.",
      mezclar: "Non sembra una citta' da storie. E' casa.",
      bosco: "Fresco, fitto, un po' proibito."
    }
  }
};

export function getSceneContext(sceneId: SceneId): SceneContext {
  return SCENES[sceneId];
}
