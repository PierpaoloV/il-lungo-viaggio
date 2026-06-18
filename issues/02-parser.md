# Issue #2 — Parser italiano + comandi globali

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/2>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #1

## What to build
Strato **parser italiano** locale che traduce input in linguaggio naturale in comandi canonici, secondo `mechanics/interaction.md`: verbi globali (esamina/guarda, vai, segui, prendi, parla, dai, usa, inventario, aspetta, aiuto), mappa sinonimi, drop filler, lemmatizzazione leggera. `esamina <x>` e `inventario` funzionano end-to-end in scena.

## Acceptance criteria
- [ ] Verbi canonici + sinonimi riconosciuti; filler ignorati; accenti/maiuscole normalizzati
- [ ] Ambiguità chiede disambiguazione; input ignoto dà un messaggio utile
- [ ] `esamina <oggetto>` e `inventario` producono la risposta corretta in scena
- [ ] Corpus di test table-driven del parser

## Verifica / test
- Unit table-driven: `(input, contesto)` → comando canonico / ambiguità / sconosciuto (coniugazioni, sinonimi, filler, accenti).

## Blocked by
- #1 (Walking skeleton)

## Riferimenti
- `mechanics/interaction.md` §2 (vocabolario) e §3 (regole di parsing).
