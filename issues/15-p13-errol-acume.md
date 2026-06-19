# Issue #15 — p13: slice Errol + soglia acume

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/15>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #11 (parallelizzabile con #12-#14)

## What to build
Riscrivere p13 secondo il copione fissato: dopo che Lesmidoom nomina Errol, Ernesto ha una domanda (3 opzioni: «Perche' era stanco?» con insistenza da bambino, «Lo conosci, Errol?», «Non chiedere niente»). Lesmidoom risponde vero-ma-incompleto e chiude col gesto ricorrente borsa+passo. Errol introdotto SEMPRE da Lesmidoom (mai Ernesto). Aggiungere il flag-ponte `acume_vivo` (`{ stat_acume>=2: ~ acume_vivo=true }`) che sblocca la domanda extra «Com'era Errol da vicino».

## Acceptance criteria
- [ ] p13 con le 3 domande + gesto di chiusura ricorrente, testi del copione
- [ ] Domanda extra «Com'era Errol da vicino» gated su `acume_vivo`
- [ ] flag-ponte `acume_vivo` impostato da `stat_acume>=2`
- [ ] Ernesto non nomina mai Errol
- [ ] Test: ramo base vs ramo con acume>=2 (extra sbloccata)

## Blocked by
- #11

## Riferimenti
- `game-outline/bozze-incontro-lesmidoom.md` (p13 FISSATA)
