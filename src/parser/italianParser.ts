export type CanonicalVerb =
  | "esamina"
  | "guarda"
  | "vai"
  | "segui"
  | "prendi"
  | "parla"
  | "dai"
  | "usa"
  | "accompagna"
  | "indica"
  | "attacca"
  | "fuggi"
  | "inventario"
  | "aspetta"
  | "aiuto";

export type ParserObject = {
  id: string;
  label: string;
  aliases: string[];
};

export type ParserContext = {
  objects: ParserObject[];
};

export type ParsedCommand = {
  verb: CanonicalVerb;
  targetId?: string;
  secondaryTargetId?: string;
  targetText?: string;
  secondaryTargetText?: string;
};

export type ParserResult =
  | { status: "command"; command: ParsedCommand }
  | { status: "ambiguity"; message: string; verb: CanonicalVerb; matches: ParserObject[] }
  | { status: "unknown"; message: string };

const UNKNOWN_MESSAGE = "Non capisco. Prova aiuto per vedere cosa puoi fare.";

const FILLER_WORDS = new Set([
  "il",
  "lo",
  "la",
  "l",
  "i",
  "gli",
  "le",
  "un",
  "uno",
  "una",
  "del",
  "dello",
  "della",
  "dei",
  "degli",
  "delle",
  "al",
  "allo",
  "alla",
  "ai",
  "agli",
  "alle",
  "a",
  "ad",
  "da",
  "dal",
  "dallo",
  "dalla",
  "dai",
  "dagli",
  "dalle",
  "di",
  "nel",
  "nello",
  "nella",
  "nei",
  "negli",
  "nelle",
  "per",
  "verso"
]);

const VERBS = new Map<string, CanonicalVerb>([
  ["esamina", "esamina"],
  ["esamino", "esamina"],
  ["esaminare", "esamina"],
  ["ispeziona", "esamina"],
  ["ispeziono", "esamina"],
  ["ispezionare", "esamina"],
  ["guarda", "guarda"],
  ["guardo", "guarda"],
  ["guardare", "guarda"],
  ["guardati", "guarda"],
  ["osserva", "guarda"],
  ["osservo", "guarda"],
  ["osservare", "guarda"],
  ["vai", "vai"],
  ["vado", "vai"],
  ["andare", "vai"],
  ["cammina", "vai"],
  ["cammino", "vai"],
  ["camminare", "vai"],
  ["raggiungi", "vai"],
  ["raggiungo", "vai"],
  ["raggiungere", "vai"],
  ["entra", "vai"],
  ["entro", "vai"],
  ["entrare", "vai"],
  ["segui", "segui"],
  ["seguo", "segui"],
  ["seguire", "segui"],
  ["insegui", "segui"],
  ["inseguo", "segui"],
  ["inseguire", "segui"],
  ["prendi", "prendi"],
  ["prendo", "prendi"],
  ["prendere", "prendi"],
  ["raccogli", "prendi"],
  ["raccolgo", "prendi"],
  ["raccogliere", "prendi"],
  ["afferra", "prendi"],
  ["afferro", "prendi"],
  ["afferrare", "prendi"],
  ["parla", "parla"],
  ["parlo", "parla"],
  ["parlare", "parla"],
  ["chiedi", "parla"],
  ["chiedo", "parla"],
  ["chiedere", "parla"],
  ["chiama", "parla"],
  ["chiamo", "parla"],
  ["chiamare", "parla"],
  ["di", "parla"],
  ["dico", "parla"],
  ["dire", "parla"],
  ["dai", "dai"],
  ["do", "dai"],
  ["dare", "dai"],
  ["offri", "dai"],
  ["offro", "dai"],
  ["offrire", "dai"],
  ["porgi", "dai"],
  ["porgo", "dai"],
  ["porgere", "dai"],
  ["regala", "dai"],
  ["regalo", "dai"],
  ["regalare", "dai"],
  ["usa", "usa"],
  ["uso", "usa"],
  ["usare", "usa"],
  ["adopera", "usa"],
  ["adopero", "usa"],
  ["adoperare", "usa"],
  ["mangia", "usa"],
  ["mangio", "usa"],
  ["mangiare", "usa"],
  ["accompagna", "accompagna"],
  ["accompagno", "accompagna"],
  ["accompagnare", "accompagna"],
  ["indica", "indica"],
  ["indico", "indica"],
  ["indicare", "indica"],
  ["mostra", "indica"],
  ["mostro", "indica"],
  ["mostrare", "indica"],
  ["attacca", "attacca"],
  ["attacco", "attacca"],
  ["attaccare", "attacca"],
  ["colpisci", "attacca"],
  ["colpisco", "attacca"],
  ["colpire", "attacca"],
  ["ferisci", "attacca"],
  ["ferisco", "attacca"],
  ["ferire", "attacca"],
  ["fuggi", "fuggi"],
  ["fuggo", "fuggi"],
  ["fuggire", "fuggi"],
  ["scappa", "fuggi"],
  ["scappo", "fuggi"],
  ["scappare", "fuggi"],
  ["inventario", "inventario"],
  ["inv", "inventario"],
  ["zaino", "inventario"],
  ["oggetti", "inventario"],
  ["aspetta", "aspetta"],
  ["attendi", "aspetta"],
  ["attendo", "aspetta"],
  ["attendere", "aspetta"],
  ["esita", "aspetta"],
  ["esito", "aspetta"],
  ["esitare", "aspetta"],
  ["aiuto", "aiuto"],
  ["comandi", "aiuto"],
  ["azioni", "aiuto"]
]);

export function parseItalianCommand(input: string, context: ParserContext): ParserResult {
  const tokens = tokenize(input);

  if (tokens.length === 0) {
    return command({ verb: "aspetta" });
  }

  if (tokens[0] === "?") {
    return command({ verb: "aiuto" });
  }

  const verbToken = tokens[0];
  const parsedVerb = VERBS.get(verbToken);

  if (!parsedVerb) {
    return unknown();
  }

  const rest = tokens.slice(1);

  if (
    parsedVerb === "inventario" ||
    parsedVerb === "fuggi" ||
    parsedVerb === "aspetta" ||
    parsedVerb === "aiuto"
  ) {
    return command({ verb: parsedVerb });
  }

  if (parsedVerb === "guarda") {
    const targetWords = dropFillers(rest);

    if (targetWords.length === 0 || isLookAroundTarget(targetWords)) {
      return command({ verb: "guarda" });
    }

    return resolveObjectCommand("esamina", targetWords, context);
  }

  if (parsedVerb === "vai") {
    return command({ verb: "vai", targetText: targetText(dropFillers(rest)) });
  }

  if (parsedVerb === "attacca") {
    const targetWords = dropFillers(rest);

    if (targetWords.length === 0) {
      return {
        status: "unknown",
        message: missingTargetMessage("attacca")
      };
    }

    return command({ verb: "attacca", targetText: targetText(targetWords) });
  }

  if (parsedVerb === "usa") {
    const splitIndex = rest.indexOf("con");
    const firstTarget = splitIndex >= 0 ? rest.slice(0, splitIndex) : rest;
    const secondTarget = splitIndex >= 0 ? rest.slice(splitIndex + 1) : [];
    const primary = resolveObject(dropFillers(firstTarget), context);

    if (primary.status !== "match") {
      return objectResolutionToResult("usa", primary);
    }

    if (secondTarget.length === 0) {
      return command({
        verb: "usa",
        targetId: primary.object.id,
        targetText: targetText(dropFillers(firstTarget))
      });
    }

    const secondary = resolveObject(dropFillers(secondTarget), context);

    if (secondary.status !== "match") {
      return objectResolutionToResult("usa", secondary);
    }

    return command({
      verb: "usa",
      targetId: primary.object.id,
      secondaryTargetId: secondary.object.id,
      targetText: targetText(dropFillers(firstTarget)),
      secondaryTargetText: targetText(dropFillers(secondTarget))
    });
  }

  return resolveObjectCommand(parsedVerb, dropFillers(rest), context);
}

export function normalizeItalianText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, " ")
    .toLocaleLowerCase("it-IT")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string): string[] {
  if (input.trim() === "?") {
    return ["?"];
  }

  const normalized = normalizeItalianText(input);
  return normalized.length > 0 ? normalized.split(" ") : [];
}

function dropFillers(words: string[]): string[] {
  return words.filter((word) => !FILLER_WORDS.has(word));
}

function resolveObjectCommand(
  verb: CanonicalVerb,
  targetWords: string[],
  context: ParserContext
): ParserResult {
  return objectResolutionToResult(verb, resolveObject(targetWords, context));
}

function objectResolutionToResult(
  verb: CanonicalVerb,
  resolution: ObjectResolution
): ParserResult {
  if (resolution.status === "missing") {
    return {
      status: "unknown",
      message: missingTargetMessage(verb)
    };
  }

  if (resolution.status === "ambiguous") {
    return {
      status: "ambiguity",
      verb,
      matches: resolution.matches,
      message: `Quale? ${formatOptions(resolution.matches)}.`
    };
  }

  if (resolution.status === "unknown") {
    return unknown();
  }

  return command({
    verb,
    targetId: resolution.object.id,
    targetText: targetText(resolution.targetWords)
  });
}

type ObjectResolution =
  | { status: "match"; object: ParserObject; targetWords: string[] }
  | { status: "ambiguous"; matches: ParserObject[] }
  | { status: "missing" }
  | { status: "unknown" };

function resolveObject(targetWords: string[], context: ParserContext): ObjectResolution {
  if (targetWords.length === 0) {
    return { status: "missing" };
  }

  const target = targetText(targetWords);
  const matches = context.objects.filter((object) =>
    object.aliases.some((alias) => {
      const normalizedAlias = targetText(dropFillers(tokenize(alias)));
      return normalizedAlias === target || normalizedAlias.startsWith(`${target} `);
    })
  );

  if (matches.length === 0) {
    return { status: "unknown" };
  }

  if (matches.length > 1) {
    return { status: "ambiguous", matches };
  }

  return { status: "match", object: matches[0], targetWords };
}

function command(commandValue: ParsedCommand): ParserResult {
  return { status: "command", command: commandValue };
}

function unknown(): ParserResult {
  return {
    status: "unknown",
    message: UNKNOWN_MESSAGE
  };
}

function isLookAroundTarget(words: string[]): boolean {
  const target = targetText(words);
  return target === "intorno" || target === "attorno";
}

function targetText(words: string[]): string {
  return words.join(" ").trim();
}

function formatOptions(objects: ParserObject[]): string {
  return objects.map((object) => object.label).join(" o ");
}

function missingTargetMessage(verb: CanonicalVerb): string {
  switch (verb) {
    case "esamina":
      return "Che cosa vuoi esaminare?";
    case "prendi":
      return "Che cosa vuoi prendere?";
    case "parla":
      return "Con chi vuoi parlare?";
    case "dai":
      return "Che cosa vuoi dare?";
    case "usa":
      return "Che cosa vuoi usare?";
    case "attacca":
      return "Dove vuoi colpire?";
    case "segui":
      return "Chi vuoi seguire?";
    case "accompagna":
      return "Chi vuoi accompagnare?";
    case "indica":
      return "Che cosa vuoi indicare?";
    default:
      return UNKNOWN_MESSAGE;
  }
}
