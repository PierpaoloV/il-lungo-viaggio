# Issue #16 — Sweep regressione + conditionals downstream

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/16>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #13, #14, #15

## What to build
Passata finale di coerenza dopo la riscrittura dell'incontro: allineare i conditionals a valle che usano `aiuto_vecchio`/`panino_dato`/`vecchio_accompagnato` (p14 mensa, p15), e aggiornare/riparare i test impattati cosi' che `npm test` sia verde end-to-end.

## Acceptance criteria
- [ ] Conditionals di p14/p15 coerenti con la nuova struttura
- [ ] Test aggiornati: `prologo.curiosita`, `terminalTopics`, `prologo.quotidianoA`, `terminalApp`
- [ ] `npm test` verde
- [ ] Nessun ramo morto o VAR orfana

## Blocked by
- #13, #14, #15

## Riferimenti
- `game-outline/bozze-incontro-lesmidoom.md`
