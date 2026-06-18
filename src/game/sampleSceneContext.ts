import type { CanonicalVerb, ParserContext, ParserObject } from "../parser/italianParser";
import type { InkVariableValue } from "../story/inkTypes";

export type SceneId = string;

export type InventoryItem = {
  id: string;
  label: string;
};

/** Effetto su un flag ink (es. esaminare le tracce imposta `bosco_tracce_osservate`). */
export type FlagEffect = {
  name: string;
  value: InkVariableValue;
};

/**
 * Risposta testuale per un verbo che NON fa avanzare la storia (es. `vai nord`
 * nel bosco). Si abbina al verbo e, opzionalmente, al testo del bersaglio
 * normalizzato (`nord`, `citta`, `strada`...).
 */
export type VerbResponse = {
  verb: CanonicalVerb;
  target?: string;
  text: string;
};

/**
 * Collega i comandi testuali canonici a una scelta situazionale (bottone) della
 * scena corrente, in modo che `dai panino` o `accompagna vecchio` attivino lo
 * stesso ramo del bottone corrispondente.
 */
export type ChoiceCommand = {
  commands: string[];
  choice: string;
};

export type SceneContext = ParserContext & {
  sceneId: SceneId;
  look: string;
  inventory: InventoryItem[];
  descriptions: Record<string, string>;
  examineEffects?: Record<string, FlagEffect>;
  verbResponses?: VerbResponse[];
  choiceCommands?: ChoiceCommand[];
};

const INVENTORY: InventoryItem[] = [
  { id: "spada_legno", label: "spada di legno" },
  { id: "mezzo_panino", label: "mezzo panino" }
];

const SPADA: ParserObject = {
  id: "spada_legno",
  label: "la spada di legno",
  aliases: ["spada", "spada di legno"]
};

const PANINO: ParserObject = {
  id: "mezzo_panino",
  label: "il mezzo panino",
  aliases: ["panino", "mezzo panino", "panno"]
};

const VECCHIO: ParserObject = {
  id: "vecchio",
  label: "il vecchio",
  aliases: ["vecchio", "anziano", "viandante"]
};

const TRACCE: ParserObject = {
  id: "tracce",
  label: "le tracce",
  aliases: ["tracce", "pista", "segni", "impronte"]
};

const SHARED_OBJECTS: ParserObject[] = [SPADA, PANINO];

const SPADA_DESC =
  "Una spada storta, liscia dove la mano la stringe sempre. Non taglia niente, ma nella tua testa e' sufficiente.";
const PANINO_DESC = "Pane comune, un po' schiacciato. Ha l'odore della mattina.";
const VECCHIO_DESC =
  "Tunica marrone, mani magre, passo incerto. Non fa paura; sembra perso.";

const SCENES: Record<string, SceneContext> = {
  p00: {
    sceneId: "p00",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "mirea", label: "Mirea", aliases: ["mirea", "mamma"] },
      { id: "stanza", label: "la stanza", aliases: ["stanza", "camera"] }
    ],
    look: "La stanza e' piccola, nota, sicura. La voce di Mirea tiene lontano il buio.",
    descriptions: {
      mirea:
        "Ha le mani ferme e la voce bassa; quando racconta, sembra guardare qualcosa che tu non vedi.",
      stanza: "Piccola, nota, sicura.",
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC
    },
    verbResponses: [
      { verb: "parla", target: "mirea", text: '"Domani ti racconto un altro pezzo," dice Mirea.' }
    ]
  },
  p01: {
    sceneId: "p01",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "mezclar", label: "Mezclar", aliases: ["mezclar", "citta", "citta vicina"] },
      { id: "bosco", label: "il bosco", aliases: ["bosco", "alberi", "margine del bosco"] }
    ],
    look:
      "I campi sono bassi e dorati. Il bosco resta poco piu' in la', fresco, fitto, un po' proibito.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      mezclar: "Non sembra una citta' da storie. E' casa.",
      bosco: "Fresco, fitto, un po' proibito."
    },
    verbResponses: [
      {
        verb: "vai",
        target: "citta",
        text: "Puoi sempre tornare a Mezclar. Ma prima ti viene voglia di guardarti intorno."
      },
      {
        verb: "vai",
        target: "mezclar",
        text: "Puoi sempre tornare a Mezclar. Ma prima ti viene voglia di guardarti intorno."
      }
    ]
  },
  p02: {
    sceneId: "p02",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "bosco", label: "il bosco", aliases: ["bosco", "alberi", "margine del bosco"] }
    ],
    look: "Lo stesso margine del bosco. Hai mezzo panino in tasca e tutta la giornata davanti.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: "Pane comune, un po' schiacciato. Ha l'odore della mattina.",
      bosco: "Fresco, fitto, un po' proibito."
    },
    verbResponses: [
      {
        verb: "usa",
        target: "panino",
        text: "Ti viene fame solo a guardarlo, ma decidi di tenerlo per dopo."
      },
      {
        verb: "usa",
        target: "mezzo panino",
        text: "Ti viene fame solo a guardarlo, ma decidi di tenerlo per dopo."
      }
    ]
  },
  p03: {
    sceneId: "p03",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "scoiattolo", label: "lo scoiattolo", aliases: ["scoiattolo"] },
      { id: "bosco", label: "il bosco", aliases: ["bosco", "alberi", "margine del bosco"] }
    ],
    look: "Il confine tra il prato e gli alberi. Le ombre cominciano subito dopo i primi tronchi.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      scoiattolo: "Troppo veloce per essere preso, abbastanza vicino da sembrare un invito.",
      bosco: "Le ombre cominciano subito dopo i primi tronchi."
    },
    choiceCommands: [
      { commands: ["segui scoiattolo", "vai bosco"], choice: "Segui lo scoiattolo" }
    ]
  },
  p04: {
    sceneId: "p04",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      TRACCE,
      { id: "alberi", label: "gli alberi", aliases: ["alberi", "tronchi"] },
      { id: "briciola", label: "la briciola", aliases: ["briciola"] }
    ],
    look: "Il primo tratto del bosco, ancora vicino alla citta'. Sul terreno restano segni piccoli.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      tracce: "Sono leggere, ma continue. Ti piace capirle.",
      alberi: "Troppo fitti verso nord.",
      briciola: "Forse dello scoiattolo. Forse tua."
    },
    examineEffects: {
      tracce: { name: "bosco_tracce_osservate", value: true }
    },
    verbResponses: [
      {
        verb: "vai",
        target: "nord",
        text: "Ti allontaneresti troppo dalla citta'. Senza una torcia ti perderesti."
      },
      {
        verb: "vai",
        target: "sud",
        text: "Verso sud c'e' la strada di casa. Ma lo scoiattolo e' andato dall'altra parte."
      }
    ],
    choiceCommands: [{ commands: ["segui tracce"], choice: "Segui le tracce" }]
  },
  p05: {
    sceneId: "p05",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      TRACCE
    ],
    look: "Bosco piu' fitto, ma non remoto. Davanti a te il vecchio aspetta.",
    descriptions: {
      spada_legno: "Ti accorgi di tenerla stretta.",
      mezzo_panino: PANINO_DESC,
      vecchio: VECCHIO_DESC,
      tracce: "Finiscono proprio qui, vicino al vecchio."
    },
    examineEffects: {
      vecchio: { name: "seed_curiosita_vecchio", value: "alta" }
    },
    choiceCommands: [
      { commands: ["parla vecchio", "parla anziano"], choice: "Chiedi scusa" }
    ]
  },
  p06: {
    sceneId: "p06",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, VECCHIO],
    look: "Bosco, vicino al vecchio. Il panno del panino spunta dalla tua tasca.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: "Adesso sembra meno tuo.",
      vecchio: "Quando guarda il panino, non lo chiede. Lo nota soltanto."
    },
    verbResponses: [
      { verb: "parla", target: "vecchio", text: '"Non voglio rubarti la merenda, ragazzo," dice il vecchio.' }
    ],
    choiceCommands: [
      { commands: ["dai panino", "dai mezzo panino", "dai panno"], choice: "Offri il panino" }
    ]
  },
  p07: {
    sceneId: "p07",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      { id: "sentiero", label: "il sentiero", aliases: ["sentiero", "strada", "mensa"] },
      { id: "sud", label: "sud", aliases: ["sud"] }
    ],
    look: "Bosco, in direzione di Mezclar. Il sentiero verso casa sembra facile quando lo conosci.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Aspetta una risposta con pazienza, ma sembra davvero stanco.",
      sentiero: "Da qui si torna verso i campi.",
      sud: "Mezclar e' laggiu', lontana ma raggiungibile."
    },
    verbResponses: [
      { verb: "parla", target: "vecchio", text: '"Mi accompagneresti? Da solo potrei perdermi," ripete il vecchio.' }
    ],
    choiceCommands: [
      { commands: ["vai mensa", "accompagna vecchio", "vai sentiero"], choice: "Accompagnalo alla mensa" },
      { commands: ["indica strada", "indica sentiero"], choice: "Indicagli la strada" }
    ]
  },
  p08: {
    sceneId: "p08",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      TRACCE,
      { id: "sentiero", label: "il sentiero", aliases: ["sentiero", "strada", "mensa"] }
    ],
    look: "Il punto dell'incontro, adesso vuoto. Sembra impossibile che una persona lenta sparisca cosi' in fretta.",
    descriptions: {
      spada_legno: SPADA_DESC,
      vecchio: "Non c'e' piu'. Solo il vuoto dove era seduto.",
      tracce: "Non sai piu' quali siano sue, tue o dello scoiattolo. Non aiutano piu'."
    },
    verbResponses: [
      { verb: "parla", target: "vecchio", text: "Chiami il vecchio, ma nessuno risponde." }
    ],
    choiceCommands: [
      { commands: ["vai mensa", "vai sentiero"], choice: "Vai alla mensa" }
    ]
  },
  p09: {
    sceneId: "p09",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      { id: "strada", label: "la strada", aliases: ["strada", "sentiero"] },
      { id: "mensa", label: "la mensa", aliases: ["mensa"] }
    ],
    look: "Campi, polvere, Mezclar che si avvicina. Il vecchio parla di strade lunghe.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Parla poco di se', ma ogni frase sembra venire da lontano.",
      strada: "Campi, polvere, Mezclar che si avvicina.",
      mensa: "Odore di zuppa e legno caldo."
    },
    examineEffects: {
      vecchio: { name: "seed_curiosita_vecchio", value: "alta" }
    }
  },
  mensa: {
    sceneId: "mensa",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "mensa", label: "la mensa", aliases: ["mensa"] },
      { id: "mirea", label: "Mirea", aliases: ["mirea", "mamma"] }
    ],
    look: "La mensa e' piena dell'odore delle cose semplici: zuppa, pane, legno caldo.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      mensa: "Odore di zuppa e legno caldo. Per te e' il posto di tua madre.",
      mirea: "Si muove tra i tavoli senza alzare la voce."
    }
  }
};

const FALLBACK_SCENE: SceneContext = {
  sceneId: "?",
  inventory: INVENTORY,
  objects: [...SHARED_OBJECTS],
  look: "Ti guardi intorno.",
  descriptions: {
    spada_legno: SPADA_DESC,
    mezzo_panino: PANINO_DESC
  }
};

export function getSceneContext(sceneId: SceneId): SceneContext {
  return SCENES[sceneId] ?? FALLBACK_SCENE;
}
