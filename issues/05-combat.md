# Issue 05 — Combat (matrice D13)

## What to build
- **CombatSystem** (`Assets/Scripts/Core/CombatSystem.cs`, logica pura): la
  matrice 2×2 del sogno (D13) — *coordini vs da solo* × *colpo pulito vs
  maldestro* → numero/durezza scontri (canon 1 / medio 2 / difficile 3). Aperture
  `ginocchia/fianco/braccio`. Nessun fail-state duro (sconfitta → rianimato).
- **Combat UI**: aperture di attacco come **bottoni** nel TerminalView; semina
  i flag del colpo-tutorial in GameState.

## Porting reference (repo web)
- `src/combat/combat.ts`, `src/combat/combat.test.ts` (spec esatta).
- `mechanics/combat.md` §5 (matrice), `game-outline/project-plan.md` D11/D13.

## Verification
- EditMode test che replicano `combat.test.ts` (esiti della matrice). Build verde.

## Depends on
- #00 (flag), #01 (bottoni). Logica pura indipendente.
