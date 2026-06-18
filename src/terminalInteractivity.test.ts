import { describe, expect, it } from "vitest";

import { createPrologueStory } from "./story/createStory";
import { TerminalApp } from "./terminalApp";

function mount(source?: string) {
  document.body.innerHTML = `<main id="app"></main>`;
  const root = document.querySelector<HTMLElement>("#app")!;
  const app = new TerminalApp(createPrologueStory(source), { root });
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

const WEIGHTED_SOURCE = `
La scena pesa. # peso: scelta
* [Scelta A]
    -> END
* [Scelta B]
    -> END
`;

const PLAIN_SOURCE = `
La scena non pesa.
* [Scelta A]
    -> END
* [Scelta B]
    -> END
`;

describe("Bivi che pesano (tag # peso: scelta)", () => {
  it("marca le scelte con la classe weighted quando la scena ha il tag peso", () => {
    const { root } = mount(WEIGHTED_SOURCE);

    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice"));

    expect(buttons).toHaveLength(2);
    expect(buttons.every((b) => b.classList.contains("terminal__choice--weighted"))).toBe(true);
  });

  it("lascia le scelte normali senza la classe weighted", () => {
    const { root } = mount(PLAIN_SOURCE);

    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(".terminal__choice"));

    expect(buttons).toHaveLength(2);
    expect(buttons.some((b) => b.classList.contains("terminal__choice--weighted"))).toBe(false);
  });
});

describe("Risposta di scena per azioni che non avanzano", () => {
  it("risponde in voce (narrazione) invece del vecchio messaggio di sistema", () => {
    const { root, form, input } = mount();

    // `prendi spada` in P00: verbo e oggetto validi, ma nessun effetto: deve
    // dare una riga di narrazione, non la confessione di sistema "non ha effetto".
    submitCommand(form, input, "prendi spada");

    const noop = Array.from(root.querySelectorAll<HTMLElement>("li")).find((line) =>
      line.textContent?.includes("Non succede niente che cambi qualcosa")
    );

    expect(noop).toBeTruthy();
    expect(noop?.dataset.category).toBe("narration");
    expect(root.textContent).not.toContain("non ha ancora un effetto");
  });
});
