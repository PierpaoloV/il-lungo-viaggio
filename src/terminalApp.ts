import type { InkStory } from "./story/inkTypes";

type TerminalElements = {
  root: HTMLElement;
};

export class TerminalApp {
  private readonly story: InkStory;
  private readonly root: HTMLElement;
  private readonly transcript: HTMLOListElement;
  private readonly form: HTMLFormElement;
  private readonly input: HTMLInputElement;
  private readonly choices: HTMLDivElement;

  constructor(story: InkStory, elements: TerminalElements) {
    this.story = story;
    this.root = elements.root;
    this.root.className = "game-shell";
    this.root.innerHTML = `
      <section class="terminal" aria-label="Terminale narrativo">
        <header class="terminal__header">
          <span class="terminal__status" aria-hidden="true"></span>
          <h1>Il Lungo Viaggio</h1>
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

    this.transcript = this.root.querySelector("[data-testid='transcript']")!;
    this.form = this.root.querySelector("[data-testid='command-form']")!;
    this.input = this.root.querySelector("[data-testid='command-input']")!;
    this.choices = this.root.querySelector("[data-testid='choices']")!;

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
    const normalized = command.toLocaleLowerCase("it-IT");

    if (command.length > 0) {
      this.writeLine("input", command);
    }

    if (normalized.length > 0 && normalized !== "aspetta") {
      this.writeLine("system", "Non succede nulla.");
      return;
    }

    this.advanceStory();
  }

  private advanceStory(choiceIndex?: number): void {
    if (typeof choiceIndex === "number") {
      this.story.ChooseChoiceIndex(choiceIndex);
    } else if (!this.story.canContinue && this.story.currentChoices.length > 0) {
      this.story.ChooseChoiceIndex(0);
    }

    while (this.story.canContinue) {
      const line = this.story.Continue().trim();
      if (line.length > 0) {
        this.writeLine("story", line);
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
      button.addEventListener("click", () => this.advanceStory(choice.index));
      this.choices.append(button);
    }
  }

  private writeLine(kind: "story" | "input" | "system", text: string): void {
    const row = document.createElement("li");
    row.className = `terminal__line terminal__line--${kind}`;
    row.textContent = kind === "input" ? `> ${text}` : text;
    this.transcript.append(row);

    if (typeof row.scrollIntoView === "function") {
      row.scrollIntoView({ block: "nearest" });
    }
  }
}
