import { describe, expect, it } from "vitest";

import type { ParserContext, ParserResult } from "./italianParser";
import { normalizeItalianText, parseItalianCommand } from "./italianParser";

const context: ParserContext = {
  objects: [
    { id: "spada_legno", label: "la spada di legno", aliases: ["spada", "spada di legno"] },
    { id: "mezzo_panino", label: "il mezzo panino", aliases: ["panino", "mezzo panino"] },
    { id: "mirea", label: "Mirea", aliases: ["mirea"] }
  ]
};

describe("parseItalianCommand", () => {
  it("normalizes case, accents and punctuation", () => {
    expect(normalizeItalianText("DÌ, alla MIREA!")).toBe("di alla mirea");
  });

  it.each([
    ["", { verb: "aspetta" }],
    ["aspetta", { verb: "aspetta" }],
    ["attendi", { verb: "aspetta" }],
    ["?", { verb: "aiuto" }],
    ["AIUTO?", { verb: "aiuto" }],
    ["comandi", { verb: "aiuto" }],
    ["inv", { verb: "inventario" }],
    ["guarda intorno", { verb: "guarda" }],
    ["cammina a nord", { verb: "vai", targetText: "nord" }],
    ["raggiungi la citta", { verb: "vai", targetText: "citta" }],
    ["guarda la spada", { verb: "esamina", targetId: "spada_legno", targetText: "spada" }],
    ["osserva al panino", { verb: "esamina", targetId: "mezzo_panino", targetText: "panino" }],
    ["prendo la spada", { verb: "prendi", targetId: "spada_legno", targetText: "spada" }],
    ["raccogli il panino", { verb: "prendi", targetId: "mezzo_panino", targetText: "panino" }],
    ["di' a Mirea", { verb: "parla", targetId: "mirea", targetText: "mirea" }],
    ["offri il panino", { verb: "dai", targetId: "mezzo_panino", targetText: "panino" }],
    [
      "usa la spada con il panino",
      {
        verb: "usa",
        targetId: "spada_legno",
        secondaryTargetId: "mezzo_panino",
        targetText: "spada",
        secondaryTargetText: "panino"
      }
    ]
  ])("parses %s", (input, expectedCommand) => {
    expect(parseItalianCommand(input, context)).toEqual({
      status: "command",
      command: expectedCommand
    });
  });

  it("asks for disambiguation when a target matches more than one object", () => {
    const ambiguousContext: ParserContext = {
      objects: [
        { id: "spada_legno", label: "la spada di legno", aliases: ["spada"] },
        { id: "spada_lungo_viaggio", label: "la Spada del Lungo Viaggio", aliases: ["spada"] }
      ]
    };
    const result = parseItalianCommand("esamina la spada", ambiguousContext);

    expect(result.status).toBe("ambiguity");
    expect((result as Extract<ParserResult, { status: "ambiguity" }>).message).toBe(
      "Quale? la spada di legno o la Spada del Lungo Viaggio."
    );
  });

  it("returns a useful unknown result for unsupported verbs or missing objects", () => {
    expect(parseItalianCommand("balla forte", context)).toEqual({
      status: "unknown",
      message: "Non capisco. Prova aiuto per vedere cosa puoi fare."
    });
    expect(parseItalianCommand("esamina luna", context)).toEqual({
      status: "unknown",
      message: "Non capisco. Prova aiuto per vedere cosa puoi fare."
    });
  });
});
