# Issue 00 — Fondamenta: ink-unity-integration + InkDriver

## What to build
- Aggiungere il pacchetto **`com.inkle.ink-unity-integration`** al progetto
  (via `Packages/manifest.json`, da OpenUPM o git URL ufficiale inkle) + la
  runtime `Ink`.
- Copiare `prologo.ink` dal repo web in `Assets/Ink/prologo.ink` (e eventuali
  include). Compilarlo (l'integrazione genera il `.json`).
- **InkDriver** (`Assets/Scripts/Core/InkDriver.cs`): wrapper C# attorno a
  `Ink.Runtime.Story` che esponga: `Continue()`, testo corrente, **tag** della
  riga, **scelte** disponibili, `ChooseChoiceIndex(i)`, get/set di **variabili**
  (i flag del prologo), e un evento per "storia finita".
- Walking skeleton: un bootstrap che fa partire la storia e stampa le prime
  righe in Console (verifica che l'ink compili e giri in Unity).

## Porting reference (repo web)
- `src/story/prologo.ink` — il contenuto da copiare.
- `src/story/createStory.ts`, `src/story/inkTypes.ts` — come viene compilata/usata.

## Verification
- Build batchmode verde.
- Un metodo editor batchmode che avvia la storia e logga le prime ~10 righe +
  i nomi delle variabili globali → confermano che ink gira.

## Depends on
- Niente. **Blocca quasi tutto.**
