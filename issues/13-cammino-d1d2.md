# Issue #13 — Beat 3 + percorso in cammino fino a p10

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/13>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #12

## What to build
Aggiungere la scelta di accompagnare il vecchio (NON da' stat: sceglie solo il percorso). Ramo "in cammino" (`vecchio_accompagnato=true`): scambio «Non hai paura dei boschi» (→coraggio), segnale del seme (Phiwen/Nylph), dialogo D1 (cosa fai) + D2 (cosa vuoi diventare, →stat su D2), confluenza nel knot p10 esistente. Questo slice scrive il contenuto CONDIVISO di D1/D2 (riusato dal percorso mensa, #14).

## Acceptance criteria
- [x] Scelta accompagnamento (`vecchio_accompagnato`), senza incremento stat
- [x] Ramo in cammino: «Non hai paura dei boschi» con 3 risposte; «A volte si'» → coraggio
- [x] Segnale del seme (Phiwen/Nylph) in cammino
- [x] D1 (3 opzioni, nessuno stat) → D2 (eroe→coraggio, sapere→acume, aiutare→empatia)
- [x] Confluenza in p10 invariato; rimossi i vecchi rami "in cammino" del rifiuto di aiutare
- [x] Test: percorso in cammino end-to-end fino a p10; stat di D2

## Blocked by
- #12

## Riferimenti
- `game-outline/bozze-incontro-lesmidoom.md` (Beat 3, Parte B, D1/D2 condivisi)
