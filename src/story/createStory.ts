import { Compiler } from "inkjs/full";

import prologoInk from "./prologo.ink?raw";
import type { InkStory } from "./inkTypes";

export function createPrologueStory(source = prologoInk): InkStory {
  const story = new Compiler(source).Compile() as InkStory | null;

  if (!story) {
    throw new Error("Unable to compile the prologue ink story.");
  }

  return story;
}
