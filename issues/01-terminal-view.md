# Issue 01 — TerminalView (UI TextMeshPro)

## What to build
UI a terminale (`Assets/Scripts/UI/TerminalView.cs` + costruzione runtime/
prefab via script). Requisiti:
- Area di **output scorrevole** (TextMeshPro) che accumula righe; auto-scroll
  in fondo. Effetto "macchina da scrivere" opzionale.
- **Riga di input** (TMP_InputField): invio con Enter → evento `OnCommand(string)`.
- Contenitore per **bottoni situazionali** (scelte chiave/affordance) creati
  dinamicamente da una lista `(label, id)` → evento `OnChoice(id)`.
- API: `Print(text)`, `PrintSystem(text)`, `ShowChoices(list)`, `ClearChoices()`,
  `SetDreamMode(bool)` (cambio di stile diegetico, vedi #07).
- Look diegetico di base (monospazio, palette calda; in dream-mode più freddo).

Costruzione scena: estendere/affiancare il bootstrap esistente o uno script
editor batchmode che genera la scena `Prologue.unity` con un Canvas + TerminalView.

## Porting reference (repo web)
- `src/terminalApp.ts` (render dell'output, input, bottoni), `src/styles.css`
  (stile del terminale, classi dream-mode).

## Verification
- Build verde; un bootstrap che stampa righe di prova, mostra 2 bottoni fittizi
  e accetta input (verificabile a Play dall'utente).

## Depends on
- #00 (per ricevere testo/scelte dall'ink, ma l'UI può nascere con dati fittizi).
