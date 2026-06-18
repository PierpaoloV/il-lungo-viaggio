import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./story/createStory";
import { TerminalApp } from "./terminalApp";

function mountApp() {
  document.body.innerHTML = `<main id="app"></main>`;
  const root = document.querySelector<HTMLElement>("#app")!;
  const app = new TerminalApp(createPrologueStory(), { root });
  app.start();

  return {
    root,
    form: root.querySelector<HTMLFormElement>("[data-testid='command-form']")!,
    input: root.querySelector<HTMLInputElement>("[data-testid='command-input']")!
  };
}

function submitCommand(form: HTMLFormElement, input: HTMLInputElement, value: string) {
  input.value = value;
  form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
}

function advanceToFirstChoice(form: HTMLFormElement, input: HTMLInputElement) {
  for (let index = 0; index < 8; index += 1) {
    submitCommand(form, input, "aspetta");
  }
}

describe("TerminalApp walking skeleton", () => {
  it("loads the ink story and renders the first prologue line", () => {
    const { root } = mountApp();
    const firstLine = root.querySelector<HTMLElement>("[data-testid='transcript'] li");

    expect(root.textContent).toContain(
      "Si racconta che Vaargal sia nato quando il mondo era ancora senza strade"
    );
    expect(firstLine?.dataset.category).toBe("legend");
    expect(firstLine?.classList.contains("terminal__line--legend")).toBe(true);
  });

  it("advances the rendered story with an empty Enter submit", () => {
    const { root, form, input } = mountApp();

    submitCommand(form, input, "");

    expect(root.textContent).toContain("Allora vennero i popoli");
  });

  it("renders ink dialogue tags with speaker-specific dialogue styling", () => {
    const { root, form, input } = mountApp();

    for (let index = 0; index < 11; index += 1) {
      submitCommand(form, input, "aspetta");
    }

    const dialogueLine = Array.from(root.querySelectorAll<HTMLElement>("li")).find((line) =>
      line.textContent?.includes("Domani ti racconto un altro pezzo")
    );

    expect(dialogueLine?.dataset.category).toBe("dialogue");
    expect(dialogueLine?.dataset.speaker).toBe("mirea");
    expect(dialogueLine?.classList.contains("terminal__line--dialogue")).toBe(true);
    expect(dialogueLine?.classList.contains("terminal__line--speaker-mirea")).toBe(true);
  });

  it("renders parser feedback as system text", () => {
    const { root, form, input } = mountApp();

    submitCommand(form, input, "salta");

    const systemLine = Array.from(root.querySelectorAll<HTMLElement>("li")).find((line) =>
      line.textContent?.includes("Non capisco. Prova aiuto")
    );

    expect(systemLine?.dataset.category).toBe("system");
    expect(systemLine?.classList.contains("terminal__line--system")).toBe(true);
  });

  it("handles inventario end-to-end through the Italian parser", () => {
    const { root, form, input } = mountApp();

    submitCommand(form, input, "INV");

    expect(root.textContent).toContain("Hai con te: spada di legno, mezzo panino.");
  });

  it("handles esamina end-to-end in the current scene", () => {
    const { root, form, input } = mountApp();

    for (let index = 0; index < 11; index += 1) {
      submitCommand(form, input, "aspetta");
    }

    submitCommand(form, input, "guarda la spada");

    expect(root.textContent).toContain("Una spada storta, liscia dove la mano la stringe sempre.");
  });

  it("runs visible choices through the same command path as typed input", () => {
    const clicked = mountApp();
    advanceToFirstChoice(clicked.form, clicked.input);

    const button = clicked.root.querySelector<HTMLButtonElement>(".terminal__choice")!;
    const command = button.dataset.command!;

    button.click();

    expect(clicked.root.textContent).toContain(`> ${command}`);
    expect(clicked.root.textContent).toContain("Mirea sorride e ti passa una mano tra i capelli.");

    const typed = mountApp();
    advanceToFirstChoice(typed.form, typed.input);
    submitCommand(typed.form, typed.input, command);

    expect(typed.root.textContent).toContain(`> ${command}`);
    expect(typed.root.textContent).toContain("Mirea sorride e ti passa una mano tra i capelli.");
  });

  it("lists contextual actions and objects with aiuto and question mark", () => {
    const { root, form, input } = mountApp();

    submitCommand(form, input, "?");

    expect(root.textContent).toContain("Azioni disponibili: aspetta, inventario, guarda");
    expect(root.textContent).toContain("Oggetti: la spada di legno, il mezzo panino, Mirea, la stanza.");

    advanceToFirstChoice(form, input);
    submitCommand(form, input, "aiuto");

    expect(root.textContent).toContain("Scelte disponibili: Resta sveglio un altro momento.");
  });

  it("accepts aspetta as the minimal command to advance through the sample scene", () => {
    const { root, form, input } = mountApp();

    for (let index = 0; index < 14; index += 1) {
      submitCommand(form, input, "aspetta");
    }

    expect(root.textContent).toContain("Hai dieci anni e Mezclar e' grande quanto basta");
    expect(root.querySelector(".terminal__emphasis")?.textContent).toBe("spada di legno");
    expect(root.querySelector("[data-object-id='mezclar']")?.textContent).toBe("Mezclar");
    expect(root.querySelector("[data-object-id='bosco']")?.textContent).toBe("bosco");
  });
});
