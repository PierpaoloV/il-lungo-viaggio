import { describe, expect, it } from "vitest";

import { createPrologueStory } from "../story/createStory";
import type { InkStory } from "../story/inkTypes";
import {
  SAVE_VERSION,
  clearSavedGame,
  getFlag,
  hasFlag,
  hasSavedGame,
  loadGame,
  saveGame,
  setFlag,
  type StorageLike
} from "./saveLoad";

const STORY_SOURCE = `
VAR colpo = "nessuno"
VAR perdite = 0
Inizio del test.
* [vai avanti] -> mezzo
=== mezzo ===
~ colpo = "fianco"
~ perdite = 2
Sei a meta'.
* [continua] -> fine
=== fine ===
Sei alla fine.
-> DONE
`;

const KEY = "test-save";

function newStory(): InkStory {
  return createPrologueStory(STORY_SOURCE);
}

function runToStop(story: InkStory): string {
  const out: string[] = [];
  while (story.canContinue) {
    out.push(story.Continue());
  }
  return out.join("");
}

function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => (map.has(key) ? map.get(key)! : null),
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    }
  };
}

function choiceTexts(story: InkStory): string[] {
  return story.currentChoices.map((choice) => choice.text);
}

describe("flag (variabili ink)", () => {
  it("legge e scrive un flag dichiarato", () => {
    const story = newStory();

    expect(hasFlag(story, "colpo")).toBe(true);
    expect(getFlag(story, "colpo")).toBe("nessuno");

    setFlag(story, "colpo", "fianco");
    expect(getFlag(story, "colpo")).toBe("fianco");

    setFlag(story, "perdite", 3);
    expect(getFlag(story, "perdite")).toBe(3);
  });

  it("tratta un flag non dichiarato come assente", () => {
    const story = newStory();

    expect(hasFlag(story, "inesistente")).toBe(false);
    expect(getFlag(story, "inesistente")).toBeNull();
    expect(() => setFlag(story, "inesistente", "x")).toThrow(/non dichiarata/);
  });
});

describe("save/load roundtrip", () => {
  it("preserva flag e posizione tra salvataggio e ripresa", () => {
    const storage = createMemoryStorage();

    const story1 = newStory();
    runToStop(story1);
    story1.ChooseChoiceIndex(0);
    runToStop(story1);

    expect(getFlag(story1, "colpo")).toBe("fianco");
    expect(getFlag(story1, "perdite")).toBe(2);
    expect(choiceTexts(story1)).toContain("continua");

    saveGame(story1, { storage, key: KEY });

    const story2 = newStory();
    expect(loadGame(story2, { storage, key: KEY })).toBe(true);

    // Flag preservati...
    expect(getFlag(story2, "colpo")).toBe("fianco");
    expect(getFlag(story2, "perdite")).toBe(2);
    // ...e posizione preservata: siamo allo stesso bivio.
    expect(choiceTexts(story2)).toContain("continua");

    // E si puo' proseguire da li'.
    story2.ChooseChoiceIndex(choiceTexts(story2).indexOf("continua"));
    expect(runToStop(story2)).toContain("Sei alla fine.");
  });

  it("hasSavedGame riflette presenza e cancellazione del salvataggio", () => {
    const storage = createMemoryStorage();
    const story = newStory();

    expect(hasSavedGame({ storage, key: KEY })).toBe(false);
    saveGame(story, { storage, key: KEY });
    expect(hasSavedGame({ storage, key: KEY })).toBe(true);
    clearSavedGame({ storage, key: KEY });
    expect(hasSavedGame({ storage, key: KEY })).toBe(false);
  });
});

describe("loadGame robusto", () => {
  it("restituisce false se non c'e' salvataggio", () => {
    const storage = createMemoryStorage();
    expect(loadGame(newStory(), { storage, key: KEY })).toBe(false);
  });

  it("restituisce false se il JSON e' corrotto", () => {
    const storage = createMemoryStorage();
    storage.setItem(KEY, "{ non-json");
    expect(loadGame(newStory(), { storage, key: KEY })).toBe(false);
  });

  it("restituisce false se la versione non e' supportata", () => {
    const storage = createMemoryStorage();
    storage.setItem(KEY, JSON.stringify({ version: SAVE_VERSION + 1, savedAt: "x", ink: "{}" }));
    expect(loadGame(newStory(), { storage, key: KEY })).toBe(false);
  });
});

describe("storage di default", () => {
  it("ripiega su globalThis.localStorage quando non si passa uno storage", () => {
    const memory = createMemoryStorage();
    const globalRef = globalThis as { localStorage?: StorageLike };
    const previous = globalRef.localStorage;
    globalRef.localStorage = memory;

    try {
      const story = newStory();
      expect(hasSavedGame({ key: "amb" })).toBe(false);
      saveGame(story, { key: "amb" });
      expect(hasSavedGame({ key: "amb" })).toBe(true);
      expect(memory.getItem("amb")).not.toBeNull();
    } finally {
      if (previous === undefined) {
        delete globalRef.localStorage;
      } else {
        globalRef.localStorage = previous;
      }
    }
  });

  it("lancia un errore chiaro se nessuno storage e' disponibile", () => {
    const globalRef = globalThis as { localStorage?: StorageLike };
    const previous = globalRef.localStorage;
    delete globalRef.localStorage;

    try {
      expect(() => hasSavedGame()).toThrow(/Nessuno storage/);
    } finally {
      if (previous !== undefined) {
        globalRef.localStorage = previous;
      }
    }
  });
});
