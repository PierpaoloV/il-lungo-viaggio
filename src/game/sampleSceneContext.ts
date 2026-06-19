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

/**
 * Argomento di conversazione (`chiedi di <x>`), sul modello Roadwarden. Puo'
 * essere knowledge-gated: disponibile solo quando `requiresFlag` e' soddisfatto;
 * finche' no, risponde con `lockedText`. Chiedere puo' a sua volta `setsFlag`.
 */
export type Topic = {
  aliases: string[];
  text: string;
  requiresFlag?: FlagEffect;
  lockedText?: string;
  setsFlag?: FlagEffect;
};

export type SceneContext = ParserContext & {
  sceneId: SceneId;
  look: string;
  inventory: InventoryItem[];
  descriptions: Record<string, string>;
  examineEffects?: Record<string, FlagEffect>;
  verbResponses?: VerbResponse[];
  choiceCommands?: ChoiceCommand[];
  topics?: Topic[];
  /**
   * Risposta in voce (serif) per un'azione sensata che NON avanza la storia e
   * non ha un `verbResponse` su misura. Sostituisce il messaggio di sistema
   * generico; scritta a mano per restare nel registro della scena.
   */
  sceneResponse?: string;
  /**
   * Riga in voce quando il giocatore `aspetta` in una scena-azione (tag ink
   * `# input: richiesto`): rimanda all'azione esplicita senza dire "non puoi".
   */
  waitNudge?: string;
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

const BORSA: ParserObject = {
  id: "borsa",
  label: "la borsa",
  aliases: ["borsa", "borsa di cuoio", "sacca", "cuoio"]
};

const MIREA: ParserObject = {
  id: "mirea",
  label: "Mirea",
  aliases: ["mirea", "mamma", "madre"]
};

const LESMIDOOM: ParserObject = {
  id: "lesmidoom",
  label: "Lesmidoom",
  aliases: ["lesmidoom", "vecchio", "anziano", "viandante", "ospite"]
};

const FABBRO: ParserObject = {
  id: "fabbro",
  label: "il fabbro",
  aliases: ["fabbro"]
};

const SOLDATI: ParserObject = {
  id: "soldati",
  label: "i soldati",
  aliases: ["soldati", "soldato"]
};

const NEMICI: ParserObject = {
  id: "nemici",
  label: "i nemici",
  aliases: ["nemico", "nemici", "creatura", "creature", "orco", "orchi"]
};

const SPADA_VERA: ParserObject = {
  id: "spada_lungo_viaggio",
  label: "la Spada del Lungo Viaggio",
  aliases: ["spada", "spada del lungo viaggio", "lama", "arma"]
};

const ERROL: ParserObject = {
  id: "errol",
  label: "Errol",
  aliases: ["errol", "liberatore", "eroe"]
};

const TRACCE_SANGUE: ParserObject = {
  id: "tracce",
  label: "le tracce di sangue",
  aliases: ["tracce", "tracce di sangue", "scie", "pista", "sangue"]
};

const SHARED_OBJECTS: ParserObject[] = [SPADA, PANINO];

/** Nel sogno la spada di legno scompare: resti con l'arma vera del corpo adulto. */
const DREAM_INVENTORY: InventoryItem[] = [
  { id: "arma_vera", label: "un'arma vera alla cintura" }
];

const SPADA_DESC =
  "Una spada storta, liscia dove la mano la stringe sempre. Non taglia niente, ma nella tua testa e' sufficiente.";
const PANINO_DESC = "Pane comune, un po' schiacciato. Ha l'odore della mattina.";
const VECCHIO_DESC =
  "Tunica marrone, mani magre, passo incerto. Non fa paura; sembra perso.";
const BORSA_DESC_BOSCO =
  "Cuoio consunto, legata alla cintura con un nodo doppio. Non pesa niente, eppure la sua mano ci torna sopra ogni tanto, come per sentire che c'e' ancora. Non vedi cosa contiene.";
const BORSA_DESC_MENSA =
  "Posata accanto a lui come un animale tranquillo. Sembra vuota, o quasi. La sua mano ci torna sopra ogni tanto.";
const LESMIDOOM_DESC = "Adesso ha un nome, ma non e' diventato piu' facile da capire.";

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
    sceneResponse:
      "Lo scoiattolo e' gia' piu' veloce di te, e gli alberi troppo lisci per le tue mani. Resti con la spada di legno e la pista davanti.",
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
    look: "Bosco piu' fitto, ma non remoto. Un vecchio e' seduto contro il tronco piu' grosso, la caviglia piegata su una radice.",
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
      { commands: ["parla vecchio", "parla anziano"], choice: "Chiedi se sta bene" },
      { commands: ["aiuta vecchio", "aiuta anziano", "avvicinati"], choice: "Avvicinati subito" },
      { commands: ["esamina caviglia", "guarda caviglia"], choice: "Guarda la caviglia" }
    ]
  },
  p06: {
    sceneId: "p06",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, VECCHIO, BORSA],
    look: "Bosco, vicino al vecchio. Il panno del panino spunta dalla tua tasca, e lui controlla la borsa alla cintura.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: "Adesso sembra meno tuo.",
      vecchio: "Quando guarda il panino, non lo chiede. Lo nota soltanto.",
      borsa: BORSA_DESC_BOSCO
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
      BORSA,
      { id: "sentiero", label: "il sentiero", aliases: ["sentiero", "strada", "mensa"] },
      { id: "sud", label: "sud", aliases: ["sud"] }
    ],
    look: "Bosco, in direzione di Mezclar. Il sentiero verso casa sembra facile quando lo conosci.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Aspetta una risposta con pazienza, ma sembra davvero stanco.",
      borsa: BORSA_DESC_BOSCO,
      sentiero: "Da qui si torna verso i campi.",
      sud: "Mezclar e' laggiu', lontana ma raggiungibile."
    },
    verbResponses: [
      { verb: "parla", target: "vecchio", text: '"Mi accompagneresti? Da solo potrei perdermi," ripete il vecchio.' }
    ],
    choiceCommands: [
      { commands: ["vai mensa", "accompagna vecchio", "vai sentiero"], choice: "Accompagnalo alla mensa" },
      { commands: ["indica strada", "indica sentiero", "lascialo"], choice: "Lascialo andare da solo" }
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
      BORSA,
      { id: "strada", label: "la strada", aliases: ["strada", "sentiero"] },
      { id: "mensa", label: "la mensa", aliases: ["mensa"] }
    ],
    look: "Campi, polvere, Mezclar che si avvicina. Il vecchio parla di strade lunghe.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Parla poco di se', ma ogni frase sembra venire da lontano.",
      borsa: BORSA_DESC_BOSCO,
      strada: "Campi, polvere, Mezclar che si avvicina.",
      mensa: "Odore di zuppa e legno caldo."
    },
    examineEffects: {
      vecchio: { name: "seed_curiosita_vecchio", value: "alta" }
    }
  },
  p10: {
    sceneId: "p10",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, VECCHIO, BORSA],
    look: "Sentiero o tavolo della mensa: in entrambi i casi il vecchio guarda la tua spada.",
    descriptions: {
      spada_legno:
        "Quando la impugni, il mondo diventa piu' semplice: tu da una parte, i mostri dall'altra.",
      mezzo_panino: PANINO_DESC,
      vecchio: "Non ride della tua spada.",
      borsa: BORSA_DESC_BOSCO
    },
    choiceCommands: [
      { commands: ["parla vecchio"], choice: "Serve a combattere i mostri" }
    ]
  },
  p11: {
    sceneId: "p11",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, VECCHIO, BORSA],
    look: "La conversazione continua. Il vecchio ti ascolta con calma.",
    descriptions: {
      spada_legno: "Leggera, tua, coraggiosa.",
      mezzo_panino: PANINO_DESC,
      vecchio: "Ti ascolta come se la risposta fosse importante, ma non sembra sorpreso.",
      borsa: BORSA_DESC_BOSCO
    }
  },
  p12: {
    sceneId: "p12",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, VECCHIO, BORSA],
    look: "La conversazione resta sospesa. La domanda del vecchio ti pesa addosso.",
    descriptions: {
      spada_legno: "Ti fa sentire piu' sicuro mentre rispondi.",
      mezzo_panino: PANINO_DESC,
      vecchio: "Non ti corregge. Non sembra neanche voler vincere la discussione.",
      borsa: BORSA_DESC_BOSCO
    }
  },
  p13: {
    sceneId: "p13",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      BORSA,
      { id: "errol", label: "Errol", aliases: ["errol", "liberatore"] }
    ],
    look: "Ultimo tratto verso Mezclar, o tavolo della mensa. Il vecchio parla di Errol.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Sembra sapere piu' di quanto dice.",
      borsa: BORSA_DESC_BOSCO,
      errol: "Per te e' un eroe. Uno di quelli veri."
    },
    choiceCommands: [
      {
        commands: ["parla vecchio", "parla errol"],
        choice: "Chiedi se conosce Errol"
      }
    ],
    topics: [
      {
        aliases: ["nylph"],
        text: "\"Lontana,\" dice il vecchio. \"Tanto da far dimenticare il tuo nome a chi ci arriva.\"",
        setsFlag: { name: "seed_curiosita_vecchio", value: "alta" }
      },
      {
        aliases: ["guerra"],
        text: "\"Le guerre le raccontano i vincitori,\" dice. \"In questa, raccontano di una lama: la Spada del Lungo Viaggio.\"",
        setsFlag: { name: "vecchio_ha_nominato_spada", value: true }
      },
      {
        aliases: ["spada lungo viaggio", "spada errol"],
        requiresFlag: { name: "vecchio_ha_nominato_spada", value: true },
        lockedText:
          "Il vecchio non l'ha ancora nominata. Non sapresti nemmeno cosa chiedergli.",
        text: "\"Era di Errol,\" dice il vecchio. \"Dicono pesasse piu' del braccio che la reggeva.\""
      }
    ]
  },
  p14: {
    sceneId: "p14",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      BORSA,
      MIREA,
      { id: "tavoli", label: "i tavoli", aliases: ["tavoli", "tavolo"] }
    ],
    look: "Tavoli, ciotole, persone che entrano ed escono. La mensa di tua madre.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Ora che e' seduto, la stanchezza gli cade addosso.",
      borsa: BORSA_DESC_MENSA,
      mirea: "Si muove tra i tavoli senza alzare la voce. Se serve qualcosa, lei lo vede.",
      tavoli: "Segni di coltelli, ciotole, gomiti, giorni tutti uguali."
    }
  },
  p15: {
    sceneId: "p15",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      VECCHIO,
      BORSA,
      MIREA,
      { id: "ciotola", label: "la ciotola", aliases: ["ciotola", "scodella"] },
      { id: "pane", label: "il pane", aliases: ["pane"] }
    ],
    look: "Il tavolo del vecchio. Lui mangia davvero, con tutte e due le mani.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      vecchio: "Mangia senza fingere: ha fame davvero.",
      borsa: BORSA_DESC_MENSA,
      mirea: "Ti guarda lavorare, poi guarda il vecchio.",
      ciotola: "Quasi vuota in fretta.",
      pane: "Pane semplice, di quello che non manca mai sui tavoli di Mezclar."
    },
    sceneResponse:
      "Tua madre ha le mani piene, e tu hai imparato da un pezzo quando non e' il momento. Le passi accanto, porti il pane dove va portato."
  },
  p16: {
    sceneId: "p16",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, LESMIDOOM, BORSA, MIREA],
    look: "Davanti a Mirea, il vecchio dice il suo nome: Lesmidoom.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      lesmidoom: LESMIDOOM_DESC,
      borsa: BORSA_DESC_MENSA,
      mirea: "Per un istante resta immobile."
    }
  },
  p17: {
    sceneId: "p17",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      LESMIDOOM,
      BORSA,
      MIREA,
      { id: "mano", label: "la mano di Mirea", aliases: ["mano", "mani", "dita"] }
    ],
    look: "La mensa intorno e' rumore attenuato. La mano di tua madre e' ferma sullo schienale.",
    descriptions: {
      spada_legno: SPADA_DESC,
      lesmidoom: "Sembra accorgersene, ma non la costringe a parlare.",
      borsa: BORSA_DESC_MENSA,
      mirea: "Ferma. Troppo ferma.",
      mano: "Ferma. Troppo ferma."
    }
  },
  p18: {
    sceneId: "p18",
    inventory: INVENTORY,
    objects: [...SHARED_OBJECTS, LESMIDOOM, BORSA, MIREA],
    look: "Lesmidoom si volta verso di te e ti guarda come se ti stesse aspettando.",
    descriptions: {
      spada_legno: SPADA_DESC,
      lesmidoom: "Non sembra potente. Sembra certo.",
      borsa: BORSA_DESC_MENSA,
      mirea: "Vorrebbe dire qualcosa, ma non trova una forma semplice."
    }
  },
  p19: {
    sceneId: "p19",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      LESMIDOOM,
      BORSA,
      MIREA,
      { id: "frase", label: "la frase", aliases: ["frase", "viaggio", "saluto"] }
    ],
    look: "Il momento del congedo. Lesmidoom saluta tua madre.",
    descriptions: {
      spada_legno: SPADA_DESC,
      lesmidoom: "Si congeda con un sorriso stanco.",
      borsa: BORSA_DESC_MENSA,
      mirea: "Si e' fermata di nuovo.",
      frase: "Non capisci perche' dovrebbe pesare."
    }
  },
  p20: {
    sceneId: "p20",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      MIREA,
      { id: "cucchiaio", label: "il cucchiaio", aliases: ["cucchiaio"] },
      { id: "porta", label: "la porta", aliases: ["porta", "uscita"] }
    ],
    look: "La mensa riprende il suo rumore. Lesmidoom non e' piu' al tavolo.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mirea: "Dice a qualcuno che la zuppa e' calda, come se niente fosse.",
      cucchiaio: "Una cosa normale, ferma in un momento non normale.",
      porta: "Lesmidoom non e' piu' li'."
    }
  },
  p21: {
    sceneId: "p21",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "letto", label: "il letto", aliases: ["letto", "coperta"] }
    ],
    look: "La tua stanza, di notte. La spada di legno e' vicino al letto.",
    descriptions: {
      spada_legno: "Domani potrai giocarci ancora.",
      mezzo_panino: PANINO_DESC,
      letto: "Sa di casa."
    },
    waitNudge: "Il sonno non viene se lo aspetti e basta. Devi lasciarti andare.",
    verbResponses: [
      { verb: "parla", target: "mirea", text: "Mirea e' nell'altra stanza." }
    ],
    choiceCommands: [{ commands: ["dormi"], choice: "Dormi" }]
  },
  p22: {
    sceneId: "p22",
    inventory: DREAM_INVENTORY,
    objects: [
      { id: "terminale", label: "il terminale", aliases: ["terminale", "schermo", "testo"] },
      { id: "fumo", label: "il fumo", aliases: ["fumo"] }
    ],
    look:
      "Non sei nel letto. Un accampamento militare, freddo e frammentato; a nord la pianura brucia.",
    descriptions: {
      terminale: "Non e' un oggetto del mondo, ma reagisce: freddo, instabile.",
      fumo: "Brucia gli occhi."
    }
  },
  p23: {
    sceneId: "p23",
    inventory: DREAM_INVENTORY,
    objects: [
      FABBRO,
      SOLDATI,
      { id: "armatura", label: "l'armatura", aliases: ["armatura", "stemma", "corazza"] },
      { id: "corpo", label: "il corpo", aliases: ["corpo", "mani", "braccio"] },
      { id: "nord", label: "il campo a nord", aliases: ["nord", "campo", "battaglia"] }
    ],
    look:
      "Un accampamento vicino al campo di battaglia. A est un fabbro affila lame tra i soldati; a nord la guerra divora il cielo.",
    descriptions: {
      fabbro: "Mani nere, braccia stanche, voce dura.",
      soldati: "Aspettano un ordine, o una scusa per muoversi.",
      armatura: "Raffinata, non tua. Uno stemma sul petto.",
      corpo: "Troppo alto, troppo pesante. Calli che non riconosci.",
      nord: "Li' Errol ha bisogno di noi, grida qualcuno."
    },
    choiceCommands: [
      { commands: ["parla fabbro", "parla soldati"], choice: "Parla col fabbro e i soldati" },
      { commands: ["vai nord", "corri nord"], choice: "Corri subito a nord" }
    ]
  },
  p24: {
    sceneId: "p24",
    inventory: DREAM_INVENTORY,
    objects: [
      FABBRO,
      { id: "scorta", label: "la scorta", aliases: ["scorta", "soldati", "uomini"] },
      NEMICI
    ],
    look: "Accampamento, poi il bordo del campo. La scorta si stringe intorno a te.",
    descriptions: {
      fabbro: "Resta indietro, gia' tornato al lavoro.",
      scorta: "Non ti copre per eroismo elegante. Ti copre per necessita'.",
      nemici: "Corpi grandi, rabbia vicina, armi sollevate."
    }
  },
  p25: {
    sceneId: "p25",
    inventory: DREAM_INVENTORY,
    objects: [NEMICI, SOLDATI, SPADA_VERA],
    look: "Campo di battaglia senza scorta preparata. Tre nemici ti sbarrano la via.",
    descriptions: {
      nemici:
        "Creature alte, verdastre, troppo vicine. Un soldato alle tue spalle grida 'orchi!' con odio.",
      soldati: "Cambiano direzione per coprirti. Non guardarli troppo a lungo.",
      spada_lungo_viaggio: "Pesante, sporca, necessaria."
    }
  },
  p26: {
    sceneId: "p26",
    inventory: DREAM_INVENTORY,
    objects: [
      { id: "terreno", label: "il terreno", aliases: ["terreno", "fango", "campo"] },
      SOLDATI,
      { id: "est", label: "est", aliases: ["est"] }
    ],
    look: "Campo piu' aperto. Un soldato indica una zona piu' sgombra a est.",
    descriptions: {
      terreno: "Sangue, impronte, segni di trascinamento.",
      soldati: "Hanno paura, ma la tengono dietro ai denti.",
      est: "Meno nemici. Piu' cadaveri."
    },
    verbResponses: [
      { verb: "vai", target: "nord", text: "Il fronte e' troppo fitto. Non di li'." },
      { verb: "vai", target: "sud", text: "L'accampamento e' alle spalle. Non ora." }
    ]
  },
  p27: {
    sceneId: "p27",
    inventory: DREAM_INVENTORY,
    objects: [
      { id: "medaglione", label: "il medaglione", aliases: ["medaglione", "ciondolo"] },
      TRACCE_SANGUE,
      { id: "stemma", label: "lo stemma", aliases: ["stemma"] }
    ],
    look: "Zona piu' sgombra del campo. Nel fango brilla un medaglione.",
    descriptions: {
      medaglione: "Il nome di Errol inciso con cura. Non sembra una cosa da perdere.",
      tracce: "Scie di sangue verso nord. Una pista e' una pista.",
      stemma: "Lo stesso dell'armatura che indossi."
    },
    choiceCommands: [
      { commands: ["prendi medaglione", "raccogli medaglione"], choice: "Raccogli il medaglione" },
      { commands: ["segui tracce", "vai nord"], choice: "Segui le tracce di sangue" }
    ]
  },
  p28: {
    sceneId: "p28",
    inventory: DREAM_INVENTORY,
    objects: [NEMICI, SPADA_VERA],
    look:
      "Il fumo si apre. Una creatura ti sbarra la strada, la Spada del Lungo Viaggio nella mano sinistra.",
    descriptions: {
      nemici: "Non riesci a guardarla bene. I sensi sono troppo lenti. Sai solo che e' nemica.",
      spada_lungo_viaggio: "La lama sembra trattenere luce anche sotto il cielo plumbeo."
    }
  },
  p29: {
    sceneId: "p29",
    inventory: DREAM_INVENTORY,
    objects: [
      SPADA_VERA,
      { id: "cadavere", label: "il cadavere", aliases: ["cadavere", "creatura", "corpo"] },
      TRACCE_SANGUE
    ],
    look: "Il cadavere della creatura nel fango. La Spada resta nella sua mano sinistra.",
    descriptions: {
      spada_lungo_viaggio: "Non e' tua. Lo senti prima ancora di pensarlo.",
      cadavere: "Troppo vicino, troppo reale, eppure il sogno lo sfoca.",
      tracce: "Finiscono qui."
    },
    waitNudge:
      "Aspetti, ma la Spada resta li' nel fango. Finche' non la prendi, niente cambia.",
    choiceCommands: [
      { commands: ["prendi spada", "raccogli spada"], choice: "Prendi la Spada" }
    ]
  },
  p30: {
    sceneId: "p30",
    inventory: DREAM_INVENTORY,
    objects: [NEMICI, SPADA_VERA],
    look: "Il varco verso Errol si richiude: tre nemici emergono dal fumo.",
    descriptions: {
      nemici: "Stanchi anche loro, ma abbastanza vicini da fermarti.",
      spada_lungo_viaggio: "Non puoi perderla."
    }
  },
  p31: {
    sceneId: "p31",
    inventory: DREAM_INVENTORY,
    objects: [
      ERROL,
      { id: "capo_nemico", label: "il capo nemico", aliases: ["capo", "capo nemico", "comandante"] },
      SPADA_VERA
    ],
    look: "Il centro della battaglia. Errol, in ginocchio e sanguinante, affronta il capo nemico.",
    descriptions: {
      errol: "Eroe umano, vivo solo perche' non ha ancora accettato di cadere.",
      capo_nemico: "Sagoma grande, feroce. Il suo nome non ti arriva ancora.",
      spada_lungo_viaggio: "Ora sai a chi deve arrivare."
    },
    choiceCommands: [
      {
        commands: ["dai spada", "lancia spada", "usa spada"],
        choice: "Lancia la Spada a Errol"
      }
    ]
  },
  p32: {
    sceneId: "p32",
    inventory: DREAM_INVENTORY,
    objects: [
      ERROL,
      { id: "campo", label: "il campo", aliases: ["campo", "battaglia"] },
      SPADA_VERA
    ],
    look: "Il campo al climax: Errol si rialza e si scaglia contro il capo nemico.",
    descriptions: {
      errol: "Il Liberatore, come nelle storie.",
      campo: "La battaglia si spezza in urla e fumo.",
      spada_lungo_viaggio: "Nelle mani di Errol sembra essere sempre stata li'."
    }
  },
  p33: {
    sceneId: "p33",
    inventory: DREAM_INVENTORY,
    objects: [
      { id: "buio", label: "il buio", aliases: ["buio"] },
      { id: "corpo", label: "il corpo", aliases: ["corpo", "mani"] }
    ],
    look: "Buio.",
    descriptions: {
      buio: "Non ha bordi.",
      corpo: "Sta diventando di nuovo piccolo."
    }
  },
  p34: {
    sceneId: "p34",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "letto", label: "il letto", aliases: ["letto", "coperta"] },
      { id: "finestra", label: "la finestra", aliases: ["finestra"] }
    ],
    look:
      "La tua stanza, reale: la coperta attorcigliata alle gambe, la spada di legno al suo posto, la luce normale alla finestra. Niente fumo, niente ferro.",
    descriptions: {
      spada_legno: "Piccola, di legno. Quasi buffa, dopo la Spada del sogno.",
      mezzo_panino: PANINO_DESC,
      letto: "Caldo, reale.",
      finestra: "Luce normale."
    }
  },
  p35: {
    sceneId: "p35",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      { id: "segno", label: "il segno", aliases: ["segno", "marchio"] },
      { id: "braccio", label: "il braccio sinistro", aliases: ["braccio", "braccio sinistro"] },
      { id: "manica", label: "la manica", aliases: ["manica"] }
    ],
    look:
      "La stanza, intima e silenziosa. Sul braccio sinistro c'e' un segno che prima non c'era.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      segno:
        "La forma non si lascia nominare. Potrebbe essere quasi qualunque cosa, e proprio per questo continui a guardarla.",
      braccio: "La pelle e' tua, il segno no.",
      manica: "Puo' coprirlo in fretta."
    },
    sceneResponse:
      "Non c'e' niente da pulire, niente da fasciare. Il segno sta sotto la pelle, e tu non sai cosa si fa con una cosa cosi'.",
    choiceCommands: [
      { commands: ["esamina segno", "guarda segno", "tocca segno"], choice: "Guardalo meglio" },
      { commands: ["copri braccio", "copri segno", "copri manica"], choice: "Copri il braccio" }
    ]
  },
  p36: {
    sceneId: "p36",
    inventory: INVENTORY,
    objects: [
      ...SHARED_OBJECTS,
      MIREA,
      { id: "segno", label: "il segno", aliases: ["segno", "marchio"] },
      { id: "porta", label: "la porta", aliases: ["porta", "uscita"] }
    ],
    look: "La stanza. La voce di Mirea arriva da fuori, normale e vicina.",
    descriptions: {
      spada_legno: SPADA_DESC,
      mezzo_panino: PANINO_DESC,
      mirea: "Non e' nella stanza. Non vede il segno.",
      segno: "Sempre li'.",
      porta: "Chiusa, ma non per molto."
    },
    choiceCommands: [
      { commands: ["parla mirea", "rispondi mirea"], choice: "Rispondi a Mirea" },
      { commands: ["esamina segno", "guarda segno"], choice: "Guarda ancora il segno" }
    ]
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
