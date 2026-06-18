import type { InkStory, InkVariableValue } from "../story/inkTypes";

/**
 * Memoria e salvataggio del prologo (issue #4).
 *
 * Lo stato persistente del gioco e' interamente lo stato ink: posizione nella
 * storia + variabili globali (i "flag" del blueprint). Qui ci sono i mattoni:
 * lettura/scrittura dei flag, serializzazione dello stato, e save/load su uno
 * storage (di default `localStorage`, iniettabile per i test).
 */

export const SAVE_STORAGE_KEY = "il-lungo-viaggio/save/v1";
export const SAVE_VERSION = 1;

/** Sottoinsieme di `Storage` che ci serve. Iniettabile (test, ambienti diversi). */
export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type SaveOptions = {
  storage?: StorageLike;
  key?: string;
};

export type SaveData = {
  version: number;
  savedAt: string;
  ink: string;
};

function resolveStorage(storage?: StorageLike): StorageLike {
  if (storage) {
    return storage;
  }

  const ambient = (globalThis as { localStorage?: StorageLike }).localStorage;

  if (!ambient) {
    throw new Error("Nessuno storage disponibile: passa `storage` esplicitamente.");
  }

  return ambient;
}

// --- Flag (variabili globali ink) ---------------------------------------

/** Vero se nello story esiste una variabile globale con questo nome. */
export function hasFlag(story: InkStory, name: string): boolean {
  return story.variablesState.GlobalVariableExistsWithName(name);
}

/** Legge un flag; restituisce `null` se il flag non e' dichiarato. */
export function getFlag(story: InkStory, name: string): InkVariableValue {
  if (!hasFlag(story, name)) {
    return null;
  }

  return story.variablesState.$(name);
}

/** Scrive un flag. Lancia se il flag non e' dichiarato con VAR nello story. */
export function setFlag(story: InkStory, name: string, value: InkVariableValue): void {
  if (!hasFlag(story, name)) {
    throw new Error(`Flag ink non dichiarata: "${name}". Dichiarala con VAR nello story.`);
  }

  story.variablesState.$(name, value);
}

// --- Serializzazione dello stato ----------------------------------------

/** Serializza l'intero stato ink (posizione + variabili) in JSON. */
export function serializeStory(story: InkStory): string {
  return story.state.ToJson();
}

/** Ripristina lo stato ink da un JSON prodotto da `serializeStory`. */
export function restoreStory(story: InkStory, json: string): void {
  story.state.LoadJson(json);
}

/** Costruisce il blob di salvataggio versionato. */
export function createSaveData(story: InkStory): SaveData {
  return {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    ink: serializeStory(story)
  };
}

// --- Save / load su storage ---------------------------------------------

/** Salva la partita corrente sullo storage. */
export function saveGame(story: InkStory, options: SaveOptions = {}): void {
  const storage = resolveStorage(options.storage);
  const key = options.key ?? SAVE_STORAGE_KEY;
  storage.setItem(key, JSON.stringify(createSaveData(story)));
}

/** Vero se esiste un salvataggio sullo storage. */
export function hasSavedGame(options: SaveOptions = {}): boolean {
  const storage = resolveStorage(options.storage);
  const key = options.key ?? SAVE_STORAGE_KEY;
  return storage.getItem(key) !== null;
}

/**
 * Carica e applica il salvataggio nello story passato. Robusta: restituisce
 * `false` (senza lanciare) se non c'e' salvataggio, se il JSON e' corrotto o se
 * la versione non e' supportata.
 */
export function loadGame(story: InkStory, options: SaveOptions = {}): boolean {
  const storage = resolveStorage(options.storage);
  const key = options.key ?? SAVE_STORAGE_KEY;
  const raw = storage.getItem(key);

  if (raw === null) {
    return false;
  }

  let data: Partial<SaveData>;

  try {
    data = JSON.parse(raw) as Partial<SaveData>;
  } catch {
    return false;
  }

  if (!data || typeof data.ink !== "string" || data.version !== SAVE_VERSION) {
    return false;
  }

  restoreStory(story, data.ink);
  return true;
}

/** Cancella il salvataggio. */
export function clearSavedGame(options: SaveOptions = {}): void {
  const storage = resolveStorage(options.storage);
  const key = options.key ?? SAVE_STORAGE_KEY;
  storage.removeItem(key);
}
