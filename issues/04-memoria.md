# Issue #4 — Memoria & save/load

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/4>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #1

## What to build
Stato persistente basato su **variabili ink + flag**; salvataggio e ripresa della partita; serializzazione robusta dello stato.

## Acceptance criteria
- [ ] Le scelte impostano flag leggibili/scrivibili
- [ ] Salvataggio e ripresa preservano lo stato
- [ ] Roundtrip test salva → carica

## Verifica / test
- Roundtrip: imposta flag → serializza → ricarica → stato preservato.

## Blocked by
- #1 (Walking skeleton)

## Riferimenti
- `game-outline/blueprint-prologo.md` (sezione "Flag usati"), `mechanics/interaction.md` §5.
