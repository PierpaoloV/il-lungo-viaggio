export const MUSIC_ENABLED_STORAGE_KEY = "il-lungo-viaggio.music-enabled";

const DEFAULT_VOLUME = 0.24;

type AudioPort = {
  loop: boolean;
  preload: string;
  volume: number;
  pause: () => void;
  play: () => Promise<void> | void;
};

type MusicStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

type BackgroundMusicOptions = {
  audioFactory?: (src: string) => AudioPort;
  storage?: MusicStorage;
  volume?: number;
};

export type MusicController = {
  readonly enabled: boolean;
  start: () => void;
  toggle: () => boolean;
};

/** Owns background playback and the user's persisted on/off preference. */
export class BackgroundMusic implements MusicController {
  private readonly audio: AudioPort;
  private readonly storage?: MusicStorage;
  private _enabled: boolean;

  constructor(src: string, options: BackgroundMusicOptions = {}) {
    const audioFactory = options.audioFactory ?? ((audioSrc: string) => new Audio(audioSrc));

    this.audio = audioFactory(src);
    this.storage = options.storage ?? getBrowserStorage();
    this._enabled = this.readEnabledPreference();

    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = options.volume ?? DEFAULT_VOLUME;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  /** Called from a user gesture so browser playback policies permit audio. */
  start(): void {
    if (this._enabled) {
      this.play();
    }
  }

  toggle(): boolean {
    this._enabled = !this._enabled;
    this.writeEnabledPreference();

    if (this._enabled) {
      this.play();
    } else {
      this.audio.pause();
    }

    return this._enabled;
  }

  private play(): void {
    try {
      const playback = this.audio.play();
      if (playback) {
        void playback.catch(() => {
          // Playback can still be rejected by browser policy. The next direct
          // click on the music control retries it.
        });
      }
    } catch {
      // Some embedded browsers throw synchronously instead of returning a
      // rejected promise. Keep the interface usable and allow a later retry.
    }
  }

  private readEnabledPreference(): boolean {
    try {
      return this.storage?.getItem(MUSIC_ENABLED_STORAGE_KEY) !== "false";
    } catch {
      return true;
    }
  }

  private writeEnabledPreference(): void {
    try {
      this.storage?.setItem(MUSIC_ENABLED_STORAGE_KEY, String(this._enabled));
    } catch {
      // Private browsing or disabled storage should not break playback.
    }
  }
}

function getBrowserStorage(): MusicStorage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
