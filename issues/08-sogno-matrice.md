# Issue #8 — Sogno + matrice 2×2 (P22–P33)

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/8>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #6, #7

## What to build
Scene **P22–P33**: dream-mode diegetico (terminale alterato), bivio coordinati/solo, medaglione + tracce (payoff esplorazione), tutorial orco, transizione condizionale rinforzi, consegna a Errol, vittoria, buio. Integra il combattimento (#7).

## Acceptance criteria
- [ ] dream-mode applicato/rimosso correttamente
- [ ] I 4 percorsi della matrice 2×2 producono 1/2/2/3 scontri e i flag perdite attesi
- [ ] Payoff `bosco_tracce_osservate` a P27
- [ ] Si raggiunge la consegna (P31) e P33

## Verifica / test
- End-to-end sui 4 percorsi: conteggio scontri (1/2/2/3) + flag attesi.

## Blocked by
- #6 (Quotidiano B), #7 (Combattimento)

## Riferimenti
- `game-outline/blueprint-prologo.md` (scene P22–P33 + "Matrice del sogno"), `mechanics/combat.md` §5.
