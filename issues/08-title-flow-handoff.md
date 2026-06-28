# Issue 08 — Title screen + flusso + handoff a Act1Slice

## What to build
- **Schermata titolo** (`Title.unity` o overlay): sfondo `title-bg.png`, titolo,
  bottoni **Nuova partita** / **Riprendi** (Riprendi solo se `SaveSystem.HasSave()`).
- **Flusso scene**: Title → `Prologue.unity` (terminale) → a `prologo_completato`
  parte la **transizione "libro che si apre"** (semplice in v1: fade/anim) →
  carica **`Act1Slice.unity`** (la cameretta 2D già fatta).
- Build Settings: registrare Title, Prologue, Act1Slice nell'ordine giusto.

## Porting reference (repo web)
- `src/main.ts` (title screen, new/resume, avvio storia), `art/title-bg.png`.

## Verification
- A Play dal Title si arriva, end-to-end, fino alla cameretta 2D. Build verde.

## Depends on
- Tutti i precedenti (è l'integrazione finale).
