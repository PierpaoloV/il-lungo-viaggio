import { describe, expect, it, vi } from "vitest";

import { BackgroundMusic, MUSIC_ENABLED_STORAGE_KEY } from "./backgroundMusic";

function createFixture(savedValue?: string) {
  const values = new Map<string, string>();
  if (savedValue !== undefined) {
    values.set(MUSIC_ENABLED_STORAGE_KEY, savedValue);
  }

  const audio = {
    loop: false,
    preload: "none",
    volume: 1,
    pause: vi.fn(),
    play: vi.fn(() => Promise.resolve())
  };
  const storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => values.set(key, value))
  };
  const music = new BackgroundMusic("/theme.mp3", {
    audioFactory: () => audio,
    storage
  });

  return { audio, music, storage };
}

describe("BackgroundMusic", () => {
  it("configures and starts looping background playback", () => {
    const { audio, music } = createFixture();

    expect(music.enabled).toBe(true);
    expect(audio.loop).toBe(true);
    expect(audio.preload).toBe("auto");
    expect(audio.volume).toBe(0.24);

    music.start();

    expect(audio.play).toHaveBeenCalledOnce();
  });

  it("honours a previously disabled preference", () => {
    const { audio, music } = createFixture("false");

    expect(music.enabled).toBe(false);

    music.start();

    expect(audio.play).not.toHaveBeenCalled();
  });

  it("pauses, resumes and persists when toggled", () => {
    const { audio, music, storage } = createFixture();

    expect(music.toggle()).toBe(false);
    expect(audio.pause).toHaveBeenCalledOnce();
    expect(storage.setItem).toHaveBeenLastCalledWith(MUSIC_ENABLED_STORAGE_KEY, "false");

    expect(music.toggle()).toBe(true);
    expect(audio.play).toHaveBeenCalledOnce();
    expect(storage.setItem).toHaveBeenLastCalledWith(MUSIC_ENABLED_STORAGE_KEY, "true");
  });
});
