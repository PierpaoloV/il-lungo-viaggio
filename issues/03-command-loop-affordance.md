# Issue 03 — Command loop + verbi globali + affordance

## What to build
Il "cervello" del prologo a terminale (`Assets/Scripts/PrologueController.cs`):
collega **InkDriver** (#00), **TerminalView** (#01) e **ItalianParser** (#02).

- Avanzamento storia: stampa il testo ink, mostra scelte come bottoni
  situazionali, gestisce `aspetta`/Enter per proseguire.
- **Verbi globali** sempre disponibili: esamina/guarda/vai/segui/prendi/parla/
  dai/usa/inventario/aspetta/aiuto, mappati su knot/funzioni ink o su risposte
  locali (vedi come `terminalApp.ts` instrada i comandi).
- **Bottoni situazionali** (D3/D9): le scelte chiave compaiono sia come bottone
  sia digitabili.
- **Affordance** anti guess-the-verb: `aiuto` elenca azioni di scena; sostantivi
  interagibili evidenziabili.
- Dialoghi knowledge-gated ("chiedi di X") come nel web.

## Porting reference (repo web)
- `src/terminalApp.ts` (instradamento comandi, bottoni, affordance), test:
  `terminalInteractivity.test.ts`, `terminalTopics.test.ts`,
  `terminalApp.test.ts`, `prologo.*.test.ts`.

## Verification
- Si gioca il filo principale del prologo a Play; i comandi globali e i bottoni
  funzionano; `aiuto` mostra le azioni. Build verde.

## Depends on
- #00, #01, #02.
