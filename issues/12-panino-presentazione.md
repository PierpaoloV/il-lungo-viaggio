# Issue #12 — Panino + presentazione + oggetto borsa (Beat 2)

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/12>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #11

## What to build
Ristrutturare la scena del panino (p06) nel nuovo contesto post-caduta: il panino diventa una scelta di aiuto a un viandante affaticato (→empatia). Presentazione: Lesmidoom dice il nome di sfuggita (deja-vu prima del reveal a p16), nota la spada, chiede "di dove sei". Stabilire il "tic" della borsa (gesto fisico ricorrente). Aggiungere l'oggetto `borsa` esaminabile.

## Acceptance criteria
- [x] p06 riscritta: «Offri il panino» (`panino_dato=true`, →empatia) / «Tienilo» (`panino_dato=false`)
- [x] Presentazione con nome "Lesmidoom" di sfuggita, spada notata, "di dove sei?/Mezclar"
- [x] Bag-tic stabilito (mano alla borsa) nel testo
- [x] Oggetto `borsa` + `esamina borsa` in `src/game/sampleSceneContext.ts`, descrizione coerente per scena
- [x] Test: entrambe le scelte del panino avanzano e impostano il flag

## Blocked by
- #11

## Riferimenti
- `game-outline/bozze-incontro-lesmidoom.md` (Parte A, Beat 2)
