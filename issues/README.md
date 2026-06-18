# Issues (locale)

Un file per issue, allineato a GitHub (<https://github.com/PierpaoloV/il-lungo-viaggio/issues>) e al riepilogo `game-outline/issues-prologo.md`. Pensati per essere dati **uno alla volta** a un agente implementatore.

Stack: web + inkjs + parser italiano custom (`docs/adr/0001-stack-tecnico-v1.md`). Reference comuni: `game-outline/blueprint-prologo.md`, `mechanics/interaction.md`, `mechanics/combat.md`, `game-outline/prd-prologo.md`.

| # | File | Tipo | Bloccata da |
|---|---|---|---|
| 1 | [01-walking-skeleton.md](./01-walking-skeleton.md) | AFK | — |
| 2 | [02-parser.md](./02-parser.md) | AFK | #1 |
| 3 | [03-affordance.md](./03-affordance.md) | AFK | #2 |
| 4 | [04-memoria.md](./04-memoria.md) | AFK | #1 |
| 5 | [05-quotidiano-a.md](./05-quotidiano-a.md) | AFK | #2,#3,#4 |
| 6 | [06-quotidiano-b.md](./06-quotidiano-b.md) | AFK | #5 |
| 7 | [07-combattimento.md](./07-combattimento.md) | AFK | #2,#3,#4 |
| 8 | [08-sogno-matrice.md](./08-sogno-matrice.md) | AFK | #6,#7 |
| 9 | [09-immagine-climax.md](./09-immagine-climax.md) | HITL | #8 (asset pronto) |
| 10 | [10-risveglio-chiusura.md](./10-risveglio-chiusura.md) | AFK | #8 |

Ordine consigliato: 1 → (2,4) → 3 → (5,7) → 6 → 8 → (9,10).
