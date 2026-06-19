# Issue #11 — Incontro per caduta + fondamenta statistiche (Beat 1)

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/11>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** —

## What to build
Sostituire il primo incontro nel bosco (attuale urto a p05) con la "caduta silenziosa": Ernesto trova Lesmidoom gia' a terra (caviglia storta). L'aiuto ad alzarlo e' strutturale, **non rifiutabile**, ed e' il gesto che pianta il "seme" (Lesmidoom sceglie Ernesto). Tre primi-gesti come scelta, che alimentano le statistiche diegetiche invisibili. Introdurre le fondamenta del sistema statistiche: VAR ink `stat_empatia`, `stat_coraggio`, `stat_acume` (0-3).

## Acceptance criteria
- [x] p05 riscritta come caduta: Lesmidoom a terra, aiuto non rifiutabile
- [x] Tre scelte di primo gesto coi testi del copione: «Avvicinati subito» (→empatia), «Chiedi se sta bene» (→acume), «Guarda la caviglia» (→acume)
- [x] Gather "aiuto ad alzarsi" comune; il seme e' piantato qui in ogni percorso
- [x] VAR `stat_empatia/coraggio/acume` dichiarate e incrementate dalle scelte
- [x] Test: ogni gesto avanza la scena e imposta l'incremento atteso

## Blocked by
None - can start immediately

## Riferimenti
- `game-outline/bozze-incontro-lesmidoom.md` (Beat 1, Mappa statistiche)
- `game-outline/design-incontro-lesmidoom.md` (sistema statistiche)
