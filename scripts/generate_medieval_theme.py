#!/usr/bin/env python3
"""Generate the original background theme used by Il Lungo Viaggio.

The composition is deliberately procedural so the source asset remains
reproducible. It uses NumPy for synthesis and LAME for MP3 encoding.
"""

from __future__ import annotations

import argparse
import math
import shutil
import subprocess
import tempfile
import wave
from pathlib import Path

import numpy as np


SAMPLE_RATE = 44_100
BPM = 64
BEAT_SECONDS = 60 / BPM
BAR_BEATS = 4
BARS = 16
DURATION_SECONDS = BEAT_SECONDS * BAR_BEATS * BARS
RNG = np.random.default_rng(18_052_018)


def midi_frequency(note: int) -> float:
    return 440.0 * 2 ** ((note - 69) / 12)


def tone_time(duration: float) -> np.ndarray:
    return np.arange(round(duration * SAMPLE_RATE), dtype=np.float64) / SAMPLE_RATE


def lute(note: int, duration: float = 2.2) -> np.ndarray:
    """Bright, quickly decaying plucked-string approximation."""
    frequency = midi_frequency(note)
    t = tone_time(duration)
    signal = np.zeros_like(t)

    for harmonic, strength in enumerate((1.0, 0.62, 0.34, 0.2, 0.12, 0.07), start=1):
        detune = 1 + (harmonic - 1) * 0.00045
        decay = np.exp(-t * (2.05 + harmonic * 0.62))
        signal += strength * decay * np.sin(2 * np.pi * frequency * harmonic * detune * t)

    attack = 1 - np.exp(-t * 120)
    pick = RNG.normal(0, 0.035, len(t)) * np.exp(-t * 52)
    return (signal * attack + pick).astype(np.float32)


def bowed(note: int, duration: float) -> np.ndarray:
    """Soft bowed-string/drone approximation with slow movement."""
    frequency = midi_frequency(note)
    t = tone_time(duration)
    vibrato = 0.0022 * np.sin(2 * np.pi * 4.1 * t + note)
    phase = 2 * np.pi * frequency * (t + vibrato / 4.1)
    signal = (
        np.sin(phase)
        + 0.38 * np.sin(phase * 2 + 0.25)
        + 0.17 * np.sin(phase * 3 + 0.7)
        + 0.08 * np.sin(phase * 4 + 1.1)
    )
    attack = np.minimum(t / 0.65, 1)
    release = np.minimum((duration - t) / 0.75, 1)
    envelope = np.maximum(0, attack * release)
    movement = 0.88 + 0.12 * np.sin(2 * np.pi * 0.13 * t + note * 0.3)
    return (signal * envelope * movement).astype(np.float32)


def flute(note: int, duration: float) -> np.ndarray:
    """Breathy wooden-flute lead with gentle vibrato."""
    frequency = midi_frequency(note)
    t = tone_time(duration)
    vibrato = 0.0035 * np.sin(2 * np.pi * 5.0 * t + 0.4)
    phase = 2 * np.pi * frequency * (t + vibrato / 5.0)
    signal = np.sin(phase) + 0.16 * np.sin(phase * 2) + 0.055 * np.sin(phase * 3)

    breath = RNG.normal(0, 1, len(t))
    breath = np.convolve(breath, np.ones(21) / 21, mode="same")
    attack = np.minimum(t / 0.18, 1)
    release = np.minimum((duration - t) / 0.35, 1)
    envelope = np.maximum(0, attack * release)
    return ((signal + 0.045 * breath) * envelope).astype(np.float32)


def drum(low: bool = True) -> np.ndarray:
    """Muted hand/frame-drum pulse."""
    duration = 0.7 if low else 0.42
    t = tone_time(duration)
    start_frequency = 94 if low else 145
    phase = 2 * np.pi * (start_frequency * t - 27 * t**2)
    body = np.sin(phase) * np.exp(-t * (7.5 if low else 10.5))
    skin = RNG.normal(0, 0.24, len(t)) * np.exp(-t * 22)
    return (body + skin).astype(np.float32)


def pan_gains(pan: float) -> tuple[float, float]:
    angle = (max(-1, min(1, pan)) + 1) * math.pi / 4
    return math.cos(angle), math.sin(angle)


def add_note(
    mix: np.ndarray,
    signal: np.ndarray,
    start_beat: float,
    gain: float,
    pan: float = 0,
) -> None:
    start = round(start_beat * BEAT_SECONDS * SAMPLE_RATE)
    if start >= mix.shape[1]:
        return

    end = min(start + len(signal), mix.shape[1])
    left, right = pan_gains(pan)
    mix[0, start:end] += signal[: end - start] * gain * left
    mix[1, start:end] += signal[: end - start] * gain * right


def compose() -> np.ndarray:
    total_samples = round(DURATION_SECONDS * SAMPLE_RATE)
    mix = np.zeros((2, total_samples), dtype=np.float32)

    # D Dorian: a medieval colour without turning the underscore too dark.
    chords = (
        (38, 45, 50),  # Dm
        (36, 43, 50),  # C(add9)
        (43, 50, 57),  # G5
        (38, 45, 53),  # Dm
    )
    arpeggios = (
        (50, 53, 57, 62, 57, 53, 50, 57),
        (48, 52, 55, 62, 55, 52, 48, 55),
        (43, 50, 55, 57, 55, 50, 43, 50),
        (50, 53, 57, 65, 57, 53, 50, 57),
    )

    for bar in range(BARS):
        bar_start = bar * BAR_BEATS
        chord_index = bar % len(chords)

        # Sustained low strings overlap slightly to avoid exposed transitions.
        for voice, note in enumerate(chords[chord_index]):
            add_note(
                mix,
                bowed(note, BAR_BEATS * BEAT_SECONDS + 0.8),
                bar_start,
                gain=(0.078, 0.052, 0.035)[voice],
                pan=(-0.35, 0.25, 0.05)[voice],
            )

        # Lute ostinato varies subtly in dynamics and stereo position.
        for step, note in enumerate(arpeggios[chord_index]):
            emphasis = 1.0 if step in (0, 4) else 0.78
            humanized_gain = 0.088 * emphasis * RNG.uniform(0.92, 1.07)
            add_note(
                mix,
                lute(note),
                bar_start + step * 0.5,
                gain=humanized_gain,
                pan=-0.24 + 0.08 * math.sin((bar * 8 + step) * 0.7),
            )

        # Sparse drum pattern: enough pulse to carry the loop, not enough to
        # compete with reading.
        add_note(mix, drum(low=True), bar_start, gain=0.088, pan=0.18)
        if bar % 2 == 1:
            add_note(mix, drum(low=False), bar_start + 2, gain=0.047, pan=0.28)

    # Two related eight-bar flute phrases. Notes are (beat, MIDI, duration).
    melody = (
        (4, 69, 1.65),
        (6, 67, 0.78),
        (7, 65, 0.8),
        (8, 62, 1.7),
        (10, 65, 0.8),
        (11, 67, 0.8),
        (12, 69, 1.7),
        (14, 72, 0.78),
        (15, 69, 0.8),
        (16, 67, 0.8),
        (17, 65, 0.8),
        (18, 64, 0.8),
        (19, 62, 1.7),
        (22, 57, 1.65),
        (24, 62, 1.65),
        (26, 65, 0.78),
        (27, 67, 0.8),
        (28, 69, 2.7),
        (36, 69, 1.65),
        (38, 72, 0.78),
        (39, 74, 0.8),
        (40, 72, 1.7),
        (42, 69, 0.78),
        (43, 67, 0.8),
        (44, 65, 1.7),
        (46, 67, 0.78),
        (47, 69, 0.8),
        (48, 74, 1.7),
        (50, 72, 0.78),
        (51, 69, 0.8),
        (52, 67, 0.8),
        (53, 65, 0.8),
        (54, 64, 0.8),
        (55, 62, 2.7),
        (59, 57, 1.65),
        (61, 62, 2.5),
    )

    for beat, note, beats_long in melody:
        add_note(
            mix,
            flute(note, beats_long * BEAT_SECONDS),
            beat,
            gain=0.105,
            pan=0.23,
        )

    # A compact circular room: stereo-crossed taps keep the MP3 suitable for
    # looping and give the synthetic instruments a shared acoustic space.
    dry = mix.copy()
    reverb = np.zeros_like(mix)
    for delay_seconds, gain, cross in (
        (0.113, 0.18, False),
        (0.179, 0.13, True),
        (0.293, 0.09, False),
        (0.431, 0.065, True),
        (0.677, 0.038, False),
    ):
        delay = round(delay_seconds * SAMPLE_RATE)
        source = dry[::-1] if cross else dry
        reverb += np.roll(source, delay, axis=1) * gain

    mix = dry * 0.88 + reverb

    # Gentle saturation/limiting and a very short edge fade to prevent clicks.
    mix = np.tanh(mix * 1.22)
    edge = round(0.025 * SAMPLE_RATE)
    fade = np.sin(np.linspace(0, math.pi / 2, edge)) ** 2
    mix[:, :edge] *= fade
    mix[:, -edge:] *= fade[::-1]

    peak = float(np.max(np.abs(mix)))
    return (mix / peak * 0.89).astype(np.float32)


def write_wav(path: Path, audio: np.ndarray) -> None:
    pcm = np.clip(audio.T * 32_767, -32_768, 32_767).astype("<i2")
    with wave.open(str(path), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(SAMPLE_RATE)
        output.writeframes(pcm.tobytes())


def encode_mp3(wav_path: Path, output_path: Path) -> None:
    lame = shutil.which("lame")
    if not lame:
        raise RuntimeError("LAME is required to encode the generated WAV as MP3")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            lame,
            "--silent",
            "-V",
            "2",
            "--tt",
            "Il Lungo Viaggio - Tema",
            "--ta",
            "Il Lungo Viaggio",
            "--tl",
            "Il Lungo Viaggio",
            "--ty",
            "2026",
            str(wav_path),
            str(output_path),
        ],
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "output",
        nargs="?",
        type=Path,
        default=Path("public/audio/il-lungo-viaggio-theme.mp3"),
    )
    args = parser.parse_args()

    audio = compose()
    with tempfile.TemporaryDirectory(prefix="il-lungo-viaggio-music-") as temp_dir:
        wav_path = Path(temp_dir) / "theme.wav"
        write_wav(wav_path, audio)
        encode_mp3(wav_path, args.output)

    print(f"Generated {args.output} ({DURATION_SECONDS:.0f}s, {BPM} BPM)")


if __name__ == "__main__":
    main()
