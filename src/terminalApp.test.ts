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

describe("TerminalApp walking skeleton", () => {
  it("loads the ink story and renders the first prologue line", () => {
    const { root } = mountApp();

    expect(root.textContent).toContain(
      "Si racconta che Vaargal sia nato quando il mondo era ancora senza strade"
    );
  });

  it("advances the rendered story with an empty Enter submit", () => {
    const { root, form, input } = mountApp();

    submitCommand(form, input, "");

    expect(root.textContent).toContain("Allora vennero i popoli");
  });

  it("accepts aspetta as the minimal command to advance through the sample scene", () => {
    const { root, form, input } = mountApp();

    for (let index = 0; index < 14; index += 1) {
      submitCommand(form, input, "aspetta");
    }

    expect(root.textContent).toContain("Hai dieci anni e Mezclar e' grande quanto basta");
  });
});
