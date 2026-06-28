# Issue 06 — Recap finale delle scelte

## What to build
- **RecapSequence** (`Assets/Scripts/UI/RecapSequence.cs`): montaggio di fine
  prologo che mostra le carte/immagini in base alle scelte fatte (ramo aiuto,
  bivio sogno, ecc.), poi schermata "Fine del Prologo".
- Copiare gli asset recap dal repo web in `Assets/Resources/recap/` e mapparli
  alle scelte (come fa `recapAssets.ts`).

## Porting reference (repo web)
- `src/recap/recapCards.ts`, `src/recap/recapAssets.ts`,
  `src/recap/recapCards.test.ts`.
- Asset: `il-lungo-viaggio/dist/assets/recap-*.png` (o `art/scenes/`).

## Verification
- A Play: a fine prologo il recap mostra le carte coerenti con le scelte. Build verde.

## Depends on
- #00, #04 (legge i flag delle scelte).
