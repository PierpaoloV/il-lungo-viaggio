# Issues — Porting prologo su Unity

Decomposizione del PRD (`docs/prd-porting-prologo.md`) in moduli a basso
accoppiamento. Sorgente da portare: repo web
`/Users/pierpaolovendittelli/projects/personal-projects/il-lungo-viaggio`.

Ordine per dipendenze (gate di compilazione **seriale**: niente build concorrenti):

| # | Modulo | Dipende da | Tipo |
|---|---|---|---|
| 00 | Fondamenta: ink-unity-integration + InkDriver | — | spine |
| 02 | ItalianParser (C# core, logica pura) | — | logica |
| 04 | GameState + Save/Load | 00 | logica/glue |
| 05 | Combat (matrice D13) | 00 | logica |
| 01 | TerminalView (UI TMP) | 00 | UI |
| 03 | Command loop + verbi globali + affordance | 00,01,02 | integrazione |
| 06 | Recap finale | 00,04 | UI |
| 07 | Audio + styling diegetico sogno | 01 | UI |
| 08 | Title + flusso + handoff a Act1Slice | tutti | integrazione |

**Logica pura** (02, parti di 04/05): classi `IlLungoViaggio.Core`, senza
`UnityEngine`. **UI/glue**: MonoBehaviour, costruzione scena via bootstrap
runtime o script editor batchmode.

Ogni modulo: portare anche i **test** TS corrispondenti come EditMode test dove
sensato (sono la spec di correttezza).
