# Issue #7 — Meccanica di combattimento

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/7>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #2, #3, #4

## What to build
Implementare la meccanica di `mechanics/combat.md`: aperture leggibili, `attacca <apertura>` + bottoni, **tutorial** (orco con allarme) e **scontro multi-bersaglio** dei 3 nemici, sconfitta morbida (2 errori → rianimato), flag.

## Acceptance criteria
- [ ] Aperture mostrate; `attacca <apertura>` e bottoni equivalenti
- [ ] Tutorial: colpo pulito vs errore → allarme (`orco_allarme`, `colpo_tutorial`)
- [ ] Scontro 3-nemici: colpo giusto elimina un nemico; 2 errori → `sogno_rianimato`
- [ ] Nessun game over duro; test della meccanica

## Verifica / test
- Unit/integration sugli esiti e i flag (modulo profondo): matrice tutorial pulito/allarme, 3-nemici vinto/perso.

## Blocked by
- #2 (Parser), #3 (Affordance), #4 (Memoria)

## Riferimenti
- `mechanics/combat.md` (§5 matrice, §5-bis tutorial, §5-ter multi-bersaglio).
