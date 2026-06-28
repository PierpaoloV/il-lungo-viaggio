# Issue 07 — Audio + styling diegetico del sogno

## What to build
- **MusicManager** (`Assets/Scripts/Audio/MusicManager.cs`): tema di sottofondo
  in loop con fade in/out; parte dalla schermata titolo.
- Hook per lo **styling diegetico del sogno** (D12): quando la storia entra nel
  sogno, segnale a TerminalView (`SetDreamMode(true)`) + variazione audio
  (più freddo/teso); ritorno al risveglio.
- Copiare `il-lungo-viaggio-theme.mp3` in `Assets/Resources/audio/`.

## Porting reference (repo web)
- `src/audio/backgroundMusic.ts`, `src/audio/backgroundMusic.test.ts`,
  `src/terminalMusic.test.ts`. Asset: `dist/audio/il-lungo-viaggio-theme.mp3`.

## Verification
- A Play: musica parte e fa loop; entrando nel sogno cambia mood. Build verde.

## Depends on
- #01 (dream-mode dell'UI).
