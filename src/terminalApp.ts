import { getSceneContext, type SceneContext, type SceneId } from "./game/sampleSceneContext";
import {
  normalizeItalianText,
  parseItalianCommand,
  type ParsedCommand,
  type ParserResult
} from "./parser/italianParser";
import type { InkChoice, InkStory } from "./story/inkTypes";
import { loadGame, saveGame, type StorageLike } from "./state/saveLoad";

type TerminalElements = {
  root: HTMLElement;
  storage?: StorageLike;
};

type StoryPresentation = {
  category: "narration" | "dialogue" | "legend";
  speaker?: string;
};

const SPEAKER_CLASS_NAMES: Record<string, string> = {
  mirea: "mirea",
  lesmidoom: "lesmidoom",
  vecchio: "lesmidoom",
  ernest: "ernesto",
  ernesto: "ernesto",
  soldati: "soldati",
  fabbro: "fabbro"
};

export class TerminalApp {
  private readonly story: InkStory;
  private readonly root: HTMLElement;
  private readonly terminal: HTMLElement;
  private readonly transcript: HTMLOListElement;
  private readonly form: HTMLFormElement;
  private readonly input: HTMLInputElement;
  private readonly choices: HTMLDivElement;
  private readonly saveButton: HTMLButtonElement;
  private readonly resumeButton: HTMLButtonElement;
  private readonly storage?: StorageLike;
  private sceneId: SceneId = "p00";

  constructor(story: InkStory, elements: TerminalElements) {
    this.story = story;
    this.storage = elements.storage;
    this.root = elements.root;
    this.root.className = "game-shell";
    this.root.innerHTML = `
      <section class="terminal" aria-label="Terminale narrativo">
        <header class="terminal__header">
          <span class="terminal__status" aria-hidden="true"></span>
          <h1>Il Lungo Viaggio</h1>
          <div class="terminal__controls">
            <button type="button" class="terminal__control" data-testid="save-button">Salva</button>
            <button type="button" class="terminal__control" data-testid="resume-button">Riprendi</button>
          </div>
        </header>
        <ol class="terminal__transcript" data-testid="transcript" aria-live="polite"></ol>
        <div class="terminal__choices" data-testid="choices"></div>
        <form class="terminal__form" data-testid="command-form">
          <span class="terminal__prompt" aria-hidden="true">&gt;</span>
          <input
            class="terminal__input"
            data-testid="command-input"
            name="command"
            autocomplete="off"
            placeholder="aspetta"
            aria-label="Comando"
          />
        </form>
      </section>
    `;

    this.terminal = this.root.querySelector(".terminal")!;
    this.transcript = this.root.querySelector("[data-testid='transcript']")!;
    this.form = this.root.querySelector("[data-testid='command-form']")!;
    this.input = this.root.querySelector("[data-testid='command-input']")!;
    this.choices = this.root.querySelector("[data-testid='choices']")!;
    this.saveButton = this.root.querySelector("[data-testid='save-button']")!;
    this.resumeButton = this.root.querySelector("[data-testid='resume-button']")!;

    this.saveButton.addEventListener("click", () => {
      this.save();
      this.input.focus();
    });
    this.resumeButton.addEventListener("click", () => {
      this.resume();
      this.input.focus();
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const command = this.input.value;
      this.input.value = "";
      this.handleCommand(command);
    });
  }

  start(): void {
    this.advanceStory();
    this.input.focus();
  }

  private handleCommand(rawCommand: string): void {
    const command = rawCommand.trim();

    if (command.length > 0) {
      this.writeLine("input", command);
    }

    if (this.handleMetaCommand(command)) {
      return;
    }

    const situationalChoice = this.resolveSituationalChoice(command);

    if (situationalChoice) {
      this.advanceStory(situationalChoice.index);
      return;
    }

    const parsed = parseItalianCommand(command, this.sceneContext);

    this.executeParserResult(parsed);
  }

  private advanceStory(choiceIndex?: number): void {
    if (typeof choiceIndex === "number") {
      this.story.ChooseChoiceIndex(choiceIndex);
    } else if (!this.story.canContinue && this.story.currentChoices.length > 0) {
      this.story.ChooseChoiceIndex(0);
    }

    while (this.story.canContinue) {
      const line = this.story.Continue().trim();
      const tags = this.story.currentTags ?? [];
      this.applyMode(tags);
      this.applyScene(tags);

      if (line.length > 0) {
        this.writeStoryLine(line, tags);
        this.renderChoices();
        return;
      }
    }

    if (this.story.currentChoices.length > 0) {
      this.renderChoices();
      return;
    }

    this.renderChoices();
    this.writeLine("system", "Fine della scena d'esempio.");
    this.input.disabled = true;
  }

  private renderChoices(): void {
    this.choices.innerHTML = "";

    for (const choice of this.story.currentChoices) {
      const button = document.createElement("button");
      button.className = "terminal__choice";
      button.type = "button";
      button.textContent = choice.text;
      button.dataset.command = choice.text;
      button.addEventListener("click", () => {
        this.handleCommand(choice.text);
        this.input.focus();
      });
      this.choices.append(button);
    }
  }

  private writeLine(kind: "story" | "input" | "system", text: string): void {
    const row = document.createElement("li");
    row.className = `terminal__line terminal__line--${kind}`;
    row.dataset.category = kind;
    row.textContent = kind === "input" ? `> ${text}` : text;
    this.transcript.append(row);

    if (typeof row.scrollIntoView === "function") {
      row.scrollIntoView({ block: "nearest" });
    }
  }

  private writeStoryLine(text: string, tags: string[]): void {
    const presentation = getStoryPresentation(tags);
    const row = document.createElement("li");
    row.className = [
      "terminal__line",
      "terminal__line--story",
      `terminal__line--${presentation.category}`
    ].join(" ");
    row.dataset.category = presentation.category;

    if (presentation.speaker) {
      row.dataset.speaker = presentation.speaker;
      row.classList.add(`terminal__line--speaker-${getSpeakerClassName(presentation.speaker)}`);
    }

    row.append(renderStoryText(text, this.sceneContext));
    this.transcript.append(row);

    if (typeof row.scrollIntoView === "function") {
      row.scrollIntoView({ block: "nearest" });
    }
  }

  private applyMode(tags: string[]): void {
    const mode = findTagValue(tags, "mode");

    if (!mode) {
      return;
    }

    this.terminal.classList.toggle("terminal--dream", mode === "dream");
  }

  private applyScene(tags: string[]): void {
    const scene = findTagValue(tags, "scene");

    if (scene === "p00" || scene === "p01") {
      this.sceneId = scene;
    }
  }

  private executeParserResult(result: ParserResult): void {
    if (result.status === "unknown" || result.status === "ambiguity") {
      this.writeLine("system", result.message);
      return;
    }

    this.executeCommand(result.command);
  }

  private executeCommand(command: ParsedCommand): void {
    switch (command.verb) {
      case "aspetta":
        this.advanceStory();
        return;
      case "guarda":
        this.writeLine("system", this.sceneContext.look);
        return;
      case "inventario":
        this.writeLine("system", `Hai con te: ${formatInventory(this.sceneContext)}.`);
        return;
      case "aiuto":
        this.writeLine("system", formatHelp(this.sceneContext, this.story.currentChoices));
        return;
      case "esamina":
        this.writeLine("system", describeTarget(command, this.sceneContext));
        return;
      default:
        this.writeLine("system", "Comando riconosciuto, ma non ha ancora un effetto in questa scena.");
    }
  }

  private get sceneContext(): SceneContext {
    return getSceneContext(this.sceneId);
  }

  private resolveSituationalChoice(command: string): InkChoice | undefined {
    const normalizedCommand = normalizeItalianText(command);

    if (normalizedCommand.length === 0) {
      return undefined;
    }

    return this.story.currentChoices.find(
      (choice) => normalizeItalianText(choice.text) === normalizedCommand
    );
  }

  private handleMetaCommand(command: string): boolean {
    const lower = command.toLocaleLowerCase("it-IT").trim();

    if (lower === "salva" || lower === "salvare" || lower === "salva partita") {
      this.save();
      return true;
    }

    if (
      lower === "carica" ||
      lower === "caricare" ||
      lower === "carica partita" ||
      lower === "riprendi" ||
      lower === "riprendere" ||
      lower === "riprendi partita"
    ) {
      this.resume();
      return true;
    }

    return false;
  }

  private save(): void {
    saveGame(this.story, { storage: this.storage });
    this.writeLine("system", "Partita salvata.");
  }

  private resume(): void {
    if (!loadGame(this.story, { storage: this.storage })) {
      this.writeLine("system", "Nessuna partita salvata.");
      return;
    }

    this.transcript.innerHTML = "";
    this.choices.innerHTML = "";
    this.input.disabled = false;

    const tags = this.story.currentTags ?? [];
    this.applyMode(tags);
    this.applyScene(tags);

    this.writeLine("system", "— Partita ripresa —");
    this.renderCurrentState();
  }

  private renderCurrentState(): void {
    if (this.story.canContinue) {
      this.advanceStory();
    } else {
      this.renderChoices();
    }
  }
}

function getStoryPresentation(tags: string[]): StoryPresentation {
  const speaker = findTagValue(tags, "voce");

  if (speaker) {
    return { category: "dialogue", speaker };
  }

  const block = findTagValue(tags, "blocco");

  if (block === "leggenda") {
    return { category: "legend" };
  }

  return { category: "narration" };
}

function findTagValue(tags: string[], key: string): string | undefined {
  const prefix = `${key}:`;
  const tag = tags.find((candidate) => candidate.toLocaleLowerCase("it-IT").startsWith(prefix));
  return tag?.slice(prefix.length).trim().toLocaleLowerCase("it-IT");
}

function getSpeakerClassName(speaker: string): string {
  return SPEAKER_CLASS_NAMES[speaker] ?? "default";
}

function renderStoryText(text: string, context: SceneContext): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const emphasisPattern = /\*([^*]+)\*/g;
  let cursor = 0;

  for (const match of text.matchAll(emphasisPattern)) {
    if (match.index === undefined) {
      continue;
    }

    fragment.append(renderInteractables(text.slice(cursor, match.index), context));

    const strong = document.createElement("strong");
    strong.className = "terminal__emphasis";
    strong.textContent = match[1];
    fragment.append(strong);
    cursor = match.index + match[0].length;
  }

  fragment.append(renderInteractables(text.slice(cursor), context));
  return fragment;
}

type InteractableMatch = {
  index: number;
  end: number;
  text: string;
  objectId: string;
};

function renderInteractables(text: string, context: SceneContext): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const matches = findInteractableMatches(text, context);
  let cursor = 0;

  for (const match of matches) {
    fragment.append(document.createTextNode(text.slice(cursor, match.index)));

    const term = document.createElement("span");
    term.className = "terminal__interactable";
    term.dataset.objectId = match.objectId;
    term.textContent = match.text;
    fragment.append(term);

    cursor = match.end;
  }

  fragment.append(document.createTextNode(text.slice(cursor)));
  return fragment;
}

function findInteractableMatches(text: string, context: SceneContext): InteractableMatch[] {
  const matches: InteractableMatch[] = [];
  const candidates = context.objects
    .flatMap((object) =>
      object.aliases.map((alias) => ({
        alias: alias.trim(),
        objectId: object.id
      }))
    )
    .filter((candidate) => candidate.alias.length > 2)
    .sort((left, right) => right.alias.length - left.alias.length);

  for (const candidate of candidates) {
    const pattern = createAliasPattern(candidate.alias);
    const regex = new RegExp(pattern, "giu");

    for (const match of text.matchAll(regex)) {
      if (match.index === undefined) {
        continue;
      }

      const start = match.index;
      const end = start + match[0].length;

      if (matches.some((existing) => rangesOverlap(start, end, existing.index, existing.end))) {
        continue;
      }

      matches.push({
        index: start,
        end,
        text: match[0],
        objectId: candidate.objectId
      });
    }
  }

  return matches.sort((left, right) => left.index - right.index);
}

function createAliasPattern(alias: string): string {
  const escapedWords = alias.split(/\s+/).map(escapeRegExp).join("\\s+");
  return `(?<![\\p{L}\\p{N}])(${escapedWords})(?![\\p{L}\\p{N}])`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rangesOverlap(leftStart: number, leftEnd: number, rightStart: number, rightEnd: number): boolean {
  return leftStart < rightEnd && rightStart < leftEnd;
}

function formatInventory(context: SceneContext): string {
  return context.inventory.map((item) => item.label).join(", ");
}

function formatHelp(context: SceneContext, choices: InkChoice[]): string {
  const objects = context.objects.map((object) => object.label).join(", ");
  const baseActions = "aspetta, inventario, guarda, esamina <oggetto>";
  const choiceText = choices.map((choice) => choice.text).join(", ");

  if (choiceText.length === 0) {
    return `Azioni disponibili: ${baseActions}. Oggetti: ${objects}.`;
  }

  return `Azioni disponibili: ${baseActions}. Scelte disponibili: ${choiceText}. Oggetti: ${objects}.`;
}

function describeTarget(command: ParsedCommand, context: SceneContext): string {
  if (!command.targetId) {
    return "Che cosa vuoi esaminare?";
  }

  return context.descriptions[command.targetId] ?? "Non noti nulla di utile.";
}
