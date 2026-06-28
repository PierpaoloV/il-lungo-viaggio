# Issue 04 — GameState + Save/Load

## What to build
- **GameState** (`Assets/Scripts/Core/GameState.cs`): modello dei flag persistenti
  del prologo (ramo di aiuto al vecchio D9, biforcazione del sogno D13, colpo del
  combat-tutorial, `segno_notato`, `prologo_completato`, ecc.). Fonte di verità =
  le **variabili ink** (#00); GameState le legge/scrive tramite InkDriver.
- **Save/Load** (`Assets/Scripts/Core/SaveSystem.cs`): serializza stato ink +
  flag in JSON su file (`Application.persistentDataPath`) o PlayerPrefs.
  Autosave a fine prologo e in checkpoint; `HasSave()`, `Load()`, `Save()`.

## Porting reference (repo web)
- `src/state/saveLoad.ts`, `src/state/terminalSave.test.ts`,
  `src/state/saveLoad.test.ts` (browser localStorage → file/PlayerPrefs).
- Flag rilevanti: `game-outline/project-plan.md` D4/D9/D10/D13.

## Verification
- EditMode test: salva → carica → stato identico. Resume riparte dal punto giusto.

## Depends on
- #00.
