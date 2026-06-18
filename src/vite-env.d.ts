/// <reference types="vite/client" />

declare module "*.ink?raw" {
  const content: string;
  export default content;
}

declare module "inkjs/full" {
  export class Compiler {
    constructor(source: string);
    Compile(): import("./story/inkTypes").InkStory | null;
  }
}
