import { describe, expect, it, vi } from "vitest";

import type { MusicController } from "./audio/backgroundMusic";
import { createPrologueStory } from "./story/createStory";
import { TerminalApp } from "./terminalApp";

describe("Terminal music control", () => {
  it("renders the current state and toggles playback from the header", () => {
    document.body.innerHTML = `<main id="app"></main>`;
    const root = document.querySelector<HTMLElement>("#app")!;
    let enabled = true;
    const music: MusicController = {
      get enabled() {
        return enabled;
      },
      start: vi.fn(),
      toggle: vi.fn(() => {
        enabled = !enabled;
        return enabled;
      })
    };

    const app = new TerminalApp(createPrologueStory(), { root, music });
    app.start();

    const button = root.querySelector<HTMLButtonElement>("[data-testid='music-button']")!;
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.getAttribute("aria-label")).toBe("Disattiva la musica");

    button.click();

    expect(music.toggle).toHaveBeenCalledOnce();
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.getAttribute("aria-label")).toBe("Attiva la musica");
  });
});
