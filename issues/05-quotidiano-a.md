# Issue #5 — Quotidiano A (P00–P09): apertura, bosco, 4 scenari D9

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/5>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #2, #3, #4

## What to build
Implementare in ink le scene **P00–P09** del blueprint: leggenda, Mezclar/inventario/scoiattolo/tracce, incontro col vecchio, panino (asse 1), richiesta accompagna/indica (asse 2), rimorso B, instradamento verso la mensa. I **4 scenari D9** con i flag e la convergenza.

## Acceptance criteria
- [ ] Scene P00–P09 giocabili con prosa e azioni del blueprint
- [ ] I 4 rami D9 (A/B/C/D) impostano i flag corretti (`aiuto_vecchio`, `panino_dato`, `vecchio_accompagnato`, `rimorso_tornato`) e convergono all'ingresso mensa
- [ ] Scenario B esegue il rimorso e ritrova Lesmidoom alla mensa
- [ ] `bosco_tracce_osservate` impostato se si esaminano le tracce

## Verifica / test
- Story-walk: percorrendo i 4 rami D9 i flag sono corretti e tutti convergono alla mensa.

## Blocked by
- #2 (Parser), #3 (Affordance), #4 (Memoria)

## Riferimenti
- `game-outline/blueprint-prologo.md` (scene P00–P09), `game-outline/project-plan.md` D9.
