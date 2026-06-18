import { describe, expect, it } from "vitest";

import { createPrologueStory } from "../story/createStory";
import { TerminalApp } from "../terminalApp";
import type { StorageLike } from "./saveLoad";

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

function mount(storage: StorageLike) {
  document.body.innerHTML = `<main id="app"></main>`;
  const root = document.querySelector<HTMLElement>("#app")!;
  const app = new TerminalApp(createPrologueStory(), { root, storage });
  app.start();

  return {
    root,
    saveButton: root.querySelector<HTMLButtonElement>("[data-testid='save-button']")!,
    resumeButton: root.querySelector<HTMLButtonElement>("[data-testid='resume-button']")!,
    form: root.querySelector<HTMLFormElement>("[data-testid='command-form']")!,
    input: root.querySelector<HTMLInputElement>("[data-testid='command-input']")!
  };
}

function submitCommand(form: HTMLFormElement, input: HTMLInputElement, value: string) {
  input.value = value;
  form.dispatchEvent(new SubmitEvent("submit", { bubbles: true, cancelable: true }));
}

describe("TerminalApp save/load wiring", () => {
  it("salva dai bottoni e poi riprende", () => {
    const { root, saveButton, resumeButton, form, input } = mount(createMemoryStorage());

    submitCommand(form, input, "");
    saveButton.click();
    expect(root.textContent).toContain("Partita salvata.");

    submitCommand(form, input, "");
    resumeButton.click();
    expect(root.textContent).toContain("— Partita ripresa —");
  });

  it("avvisa se si riprende senza un salvataggio", () => {
    const { root, resumeButton } = mount(createMemoryStorage());

    resumeButton.click();

    expect(root.textContent).toContain("Nessuna partita salvata.");
  });

  it("riconosce i comandi testuali salva e riprendi", () => {
    const { root, form, input } = mount(createMemoryStorage());

    submitCommand(form, input, "salva");
    expect(root.textContent).toContain("Partita salvata.");

    submitCommand(form, input, "riprendi");
    expect(root.textContent).toContain("— Partita ripresa —");
  });
});
