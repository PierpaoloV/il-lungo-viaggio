import type { InkVariableValue } from "../story/inkTypes";

export type CombatId =
  | "TutorialOrcoSpada"
  | "ScontroTreNemici.initial"
  | "ScontroTreNemici.rinforzi";

export type OpeningId = "ginocchia" | "fianco" | "braccio";

export type CombatFlagPatch = {
  name: string;
  value: InkVariableValue;
};

export type CombatState = {
  encounterId: CombatId;
  alerted: boolean;
  errors: number;
  remainingOpenings: OpeningId[];
  completed: boolean;
};

export type CombatOpeningView = {
  id: OpeningId;
  label: string;
  clue: string;
};

export type CombatView = {
  encounterId: CombatId;
  title: string;
  observeText: string;
  openings: CombatOpeningView[];
  choices: string[];
};

export type CombatStepResult = {
  state: CombatState;
  lines: string[];
  flags: CombatFlagPatch[];
  status: "ongoing" | "completed";
  outcome?: "tutorial_clean" | "tutorial_alerted" | "three_enemies_victory" | "soft_defeat";
};

export type CombatParserObject = {
  id: string;
  label: string;
  aliases: string[];
};

const OPENING_ALIASES: Record<OpeningId, string[]> = {
  ginocchia: ["ginocchia", "ginocchio", "gambe", "gamba"],
  fianco: ["fianco", "lato", "torace", "cuore"],
  braccio: ["braccio", "braccia", "arto", "arma"]
};

const OPENING_CLUES: Record<OpeningId, string> = {
  ginocchia: "Le ginocchia cedono a ogni passo: se colpisci basso, il nemico perde equilibrio.",
  fianco: "Il fianco resta scoperto quando la lama si alza: la guardia e' troppo larga.",
  braccio: "Il braccio armato resta teso troppo a lungo: puoi spezzare l'attacco prima che cada."
};

const TUTORIAL_SUCCESS: Record<Exclude<OpeningId, "braccio">, string> = {
  ginocchia:
    "Ti abbassi sotto il fendente e tagli basso. La creatura perde la gamba, cade nel fango e la Spada le sfugge dalla mano.",
  fianco:
    "Scivoli di lato mentre la lama passa oltre. Il tuo colpo entra nel fianco scoperto e la creatura crolla in ginocchio."
};

const THREE_ENEMY_SUCCESS: Record<OpeningId, string> = {
  ginocchia:
    "Colpisci le ginocchia del primo nemico. Si piega in avanti e sparisce sotto l'urto dei soldati dietro di te.",
  fianco:
    "Entri nel fianco del secondo nemico mentre ruota troppo largo. Il varco si apre per un istante.",
  braccio:
    "Ferisci il braccio armato del terzo nemico. L'arma cade prima di arrivare su di te."
};

const THREE_ENEMY_RESULT_FLAGS: Record<
  Exclude<CombatId, "TutorialOrcoSpada">,
  { name: string; victory: string; defeat: string }
> = {
  "ScontroTreNemici.initial": {
    name: "sogno_primo_scontro",
    victory: "vinto",
    defeat: "rianimato"
  },
  "ScontroTreNemici.rinforzi": {
    name: "rinforzi_post_orco",
    victory: "vinti",
    defeat: "rianimato"
  }
};

const COMBAT_TAG_ALIASES: Record<string, CombatId> = {
  tutorialorcospada: "TutorialOrcoSpada",
  tutorialorco: "TutorialOrcoSpada",
  orcotutorial: "TutorialOrcoSpada",
  orcospada: "TutorialOrcoSpada",
  scontrotrenemiciinitial: "ScontroTreNemici.initial",
  "tre nemici initial": "ScontroTreNemici.initial",
  "tre nemici iniziale": "ScontroTreNemici.initial",
  "tre nemici": "ScontroTreNemici.initial",
  scontrotrenemicirinforzi: "ScontroTreNemici.rinforzi",
  "tre nemici rinforzi": "ScontroTreNemici.rinforzi",
  rinforzi: "ScontroTreNemici.rinforzi"
};

export function parseCombatId(value: string): CombatId | undefined {
  const compact = normalizeCombatText(value).replace(/\s+/g, "");
  const spaced = normalizeCombatText(value);
  return COMBAT_TAG_ALIASES[compact] ?? COMBAT_TAG_ALIASES[spaced];
}

export function startCombat(encounterId: CombatId): CombatState {
  return {
    encounterId,
    alerted: false,
    errors: 0,
    remainingOpenings:
      encounterId === "TutorialOrcoSpada"
        ? ["ginocchia", "fianco"]
        : ["ginocchia", "fianco", "braccio"],
    completed: false
  };
}

export function getCombatView(state: CombatState): CombatView {
  const openings = state.remainingOpenings.map((id) => ({
    id,
    label: id,
    clue: OPENING_CLUES[id]
  }));

  return {
    encounterId: state.encounterId,
    title:
      state.encounterId === "TutorialOrcoSpada"
        ? "Creatura con la Spada"
        : "Tre nemici",
    observeText: formatObserveText(state),
    openings,
    choices: openings.map((opening) => `attacca ${opening.label}`)
  };
}

export function attackCombat(state: CombatState, targetText?: string): CombatStepResult {
  if (state.completed) {
    return {
      state,
      lines: ["Lo scontro e' gia' finito."],
      flags: [],
      status: "completed"
    };
  }

  const opening = findOpening(state, targetText);

  if (!opening) {
    return registerCombatMistake(state);
  }

  if (state.encounterId === "TutorialOrcoSpada") {
    return resolveTutorialHit(state, opening);
  }

  return resolveThreeEnemiesHit(state, opening);
}

export function registerCombatMistake(state: CombatState): CombatStepResult {
  if (state.encounterId === "TutorialOrcoSpada") {
    if (state.alerted) {
      return {
        state,
        lines: [
          "Il colpo non trova niente. La creatura ha gia' chiamato i rinforzi: ora devi finirla sulle aperture rimaste."
        ],
        flags: [],
        status: "ongoing"
      };
    }

    return {
      state: { ...state, alerted: true, errors: state.errors + 1 },
      lines: [
        "Esiti un istante di troppo. La creatura riempie il petto d'aria e urla verso il campo.",
        "La raggiungi comunque prima che riprenda forza, ma l'allarme e' partito."
      ],
      flags: [
        { name: "orco_allarme", value: true },
        { name: "colpo_tutorial", value: "maldestro_non_finale" }
      ],
      status: "ongoing"
    };
  }

  const errors = state.errors + 1;

  if (errors >= 2) {
    const resultFlag = getThreeEnemyResultFlag(state.encounterId);

    return {
      state: { ...state, errors, completed: true },
      lines: [
        "Il secondo errore ti costa il respiro. Il campo si rovescia, il rumore diventa acqua scura.",
        "Quando riapri gli occhi sei di nuovo all'accampamento: vivo, rianimato, senza un game over a chiuderti fuori."
      ],
      flags: [
        { name: "sogno_rianimato", value: true },
        { name: resultFlag.name, value: resultFlag.defeat }
      ],
      status: "completed",
      outcome: "soft_defeat"
    };
  }

  return {
    state: { ...state, errors },
    lines: [
      "Il colpo va a vuoto. Il nemico ti spinge indietro e il campo ti ricorda quanto poco spazio resta.",
      formatObserveText({ ...state, errors })
    ],
    flags: [],
    status: "ongoing"
  };
}

export function getCombatParserObjects(state: CombatState): CombatParserObject[] {
  const enemy =
    state.encounterId === "TutorialOrcoSpada"
      ? {
          id: "combat_enemy",
          label: "la creatura",
          aliases: ["nemico", "creatura", "orco", "avversario"]
        }
      : {
          id: "combat_enemy",
          label: "i tre nemici",
          aliases: ["nemico", "nemici", "creature", "orchi", "avversari"]
        };

  return [
    enemy,
    ...state.remainingOpenings.map((opening) => ({
      id: `combat_opening_${opening}`,
      label: opening,
      aliases: OPENING_ALIASES[opening]
    }))
  ];
}

export function isCombatObjectId(targetId?: string): boolean {
  return targetId === "combat_enemy" || targetId?.startsWith("combat_opening_") === true;
}

export function describeCombatTarget(state: CombatState, targetId?: string): string {
  if (!targetId || targetId === "combat_enemy") {
    return getCombatView(state).observeText;
  }

  const opening = targetId.replace("combat_opening_", "") as OpeningId;

  if (state.remainingOpenings.includes(opening)) {
    return OPENING_CLUES[opening];
  }

  return getCombatView(state).observeText;
}

function resolveTutorialHit(state: CombatState, opening: OpeningId): CombatStepResult {
  if (opening === "braccio") {
    return registerCombatMistake(state);
  }

  return {
    state: { ...state, completed: true },
    lines: [
      TUTORIAL_SUCCESS[opening],
      state.alerted
        ? "La creatura muore, ma l'urlo ha gia' attraversato il fumo."
        : "La creatura muore prima di poter chiamare aiuto."
    ],
    flags: [
      { name: "orco_allarme", value: state.alerted },
      { name: "colpo_tutorial", value: opening }
    ],
    status: "completed",
    outcome: state.alerted ? "tutorial_alerted" : "tutorial_clean"
  };
}

function resolveThreeEnemiesHit(state: CombatState, opening: OpeningId): CombatStepResult {
  const remainingOpenings = state.remainingOpenings.filter((candidate) => candidate !== opening);

  if (remainingOpenings.length === 0) {
    const resultFlag = getThreeEnemyResultFlag(state.encounterId);

    return {
      state: { ...state, remainingOpenings, completed: true },
      lines: [
        THREE_ENEMY_SUCCESS[opening],
        "L'ultimo nemico cade lontano dal tuo cammino. Il varco verso Errol resta aperto."
      ],
      flags: [{ name: resultFlag.name, value: resultFlag.victory }],
      status: "completed",
      outcome: "three_enemies_victory"
    };
  }

  const nextState = { ...state, remainingOpenings };

  return {
    state: nextState,
    lines: [THREE_ENEMY_SUCCESS[opening], formatObserveText(nextState)],
    flags: [],
    status: "ongoing"
  };
}

function findOpening(state: CombatState, targetText?: string): OpeningId | undefined {
  if (!targetText) {
    return undefined;
  }

  const normalizedTarget = normalizeCombatText(targetText);

  return state.remainingOpenings.find((opening) =>
    OPENING_ALIASES[opening].some((alias) => {
      const normalizedAlias = normalizeCombatText(alias);
      return (
        normalizedTarget === normalizedAlias ||
        normalizedTarget.startsWith(`${normalizedAlias} `) ||
        normalizedTarget.includes(` ${normalizedAlias} `)
      );
    })
  );
}

function getThreeEnemyResultFlag(encounterId: CombatId): {
  name: string;
  victory: string;
  defeat: string;
} {
  if (encounterId === "TutorialOrcoSpada") {
    throw new Error("Il tutorial non usa i flag dello scontro a tre nemici.");
  }

  return THREE_ENEMY_RESULT_FLAGS[encounterId];
}

function formatObserveText(state: CombatState): string {
  if (state.encounterId === "TutorialOrcoSpada") {
    const alarm = state.alerted
      ? "Ha gia' urlato; ora devi chiudere lo scontro prima che i rinforzi arrivino."
      : "La creatura e' stanca e non riesce a tenere compatta la guardia.";
    return `${alarm} Aperture: ${formatOpenings(state.remainingOpenings)}.`;
  }

  return `Tre nemici ti chiudono la strada. Aperture: ${formatOpenings(
    state.remainingOpenings
  )}. Errori: ${state.errors}/2.`;
}

function formatOpenings(openings: OpeningId[]): string {
  return openings.map((opening) => `${opening} (${OPENING_CLUES[opening]})`).join("; ");
}

function normalizeCombatText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, " ")
    .toLocaleLowerCase("it-IT")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
