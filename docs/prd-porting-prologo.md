# PRD — Porting del prologo su Unity

## Obiettivo
Portare il **prologo giocabile** (oggi web: TypeScript + inkjs) dentro il
progetto Unity (`il-lungo-viaggio-unity`), così da poterlo giocare **tutto di
seguito**: schermata titolo → prologo a terminale → (libro che si apre) →
scena 2D della cameretta (`Act1Slice`, già fatta).

## Contesto / sorgente da portare
Repo web: `/Users/pierpaolovendittelli/projects/personal-projects/il-lungo-viaggio`

- **`src/story/prologo.ink`** (694 righe) — TUTTO il contenuto/flusso/stato del
  prologo. **Si riusa quasi verbatim** via `ink-unity-integration` (pacchetto
  ufficiale inkle). È la parte di valore: non si riscrive a mano.
- Guscio TS da **riscrivere in C#** (logica/UI, non contenuto):
  - `src/parser/italianParser.ts` — parser italiano (~300 righe + test).
  - `src/terminalApp.ts` (1053) — UI terminale, loop comandi, bottoni
    situazionali, glue con ink, render di recap/combat.
  - `src/state/saveLoad.ts` + `terminalSave` — salvataggio/ripresa.
  - `src/combat/combat.ts` — matrice combattimento D13.
  - `src/recap/recapCards.ts` + `recapAssets.ts` — montaggio finale delle scelte.
  - `src/audio/backgroundMusic.ts` — musica + styling diegetico del sogno.
- **Ogni modulo ha test** (`*.test.ts`): sono la **spec di correttezza** da
  riportare come EditMode test in Unity dove ha senso.

## Vincoli tecnici (importanti per l'esecuzione)
- **Nessun dotnet/mono installato** → il C# si compila **solo** via Unity.
- **Unity ha lock di progetto singolo** → niente build concorrenti: la
  verifica di compilazione è **seriale** (un solo `-batchmode` per volta).
- Gli agenti **non possono pilotare l'editor né fare playtest visivo**: scrivono
  C#, costruiscono la scena via **bootstrap a runtime** / script editor batchmode;
  la **prova di giocabilità finale la fa l'utente** premendo Play.
- Engine target: Unity **6000.5.0f1**. Input: Input Manager classico.

## Architettura target
- Riusare `prologo.ink` → compilato → guidato da un **InkDriver** C#.
- **TerminalView**: UI a terminale con **TextMeshPro** (uGUI), look diegetico
  (testo che scorre, riga di input, bottoni situazionali).
- Logica **engine-agnostica** dove possibile (parser, combat, modello di stato)
  in classi C# pure (namespace `IlLungoViaggio.Core`), così sono testabili e
  non dipendono da UnityEngine.
- Flusso scene: `Title` → `Prologue` → transizione "libro" → `Act1Slice`.

## Criteri di "fatto"
- Dalla schermata titolo si gioca il prologo end-to-end a terminale (~30 min),
  con parser italiano robusto, bottoni situazionali, bivio del sogno, combat
  tutorial, recap finale, autosave/resume.
- Alla fine del prologo parte la transizione e si carica `Act1Slice`.
- Il progetto **compila senza errori** (`-batchmode` build verde).
- Parità di comportamento col web sui casi coperti dai test esistenti.

## Fuori scope
- Rifinitura artistica del terminale oltre il funzionale.
- Animazione "libro" definitiva (basta una transizione semplice in v1 del port).
- Contenuti oltre il prologo (Atto 1 vero e proprio).

## Modello di esecuzione (agenti)
Vedi `issues/`. Decomposizione in moduli a basso accoppiamento. Ordine guidato
dalle dipendenze; **gate di compilazione seriale**: dopo ogni modulo, l'orchestratore
(Opus) lancia la build batchmode e rimanda gli errori all'agente per il fix.
Implementazione affidata ad agenti **Sonnet 4.6**.
