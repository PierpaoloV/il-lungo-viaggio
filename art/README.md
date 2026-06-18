# Art — Prompt per immagini AI

Questa cartella contiene lo **standard visivo** e i **prompt** (file `.md`) per generare con AI (ChatGPT) tutte le immagini del gioco: mondo, personaggi, mappe, scene. Obiettivo numero uno: **coerenza**. Non è canone narrativo (fuori dalla bibbia).

## Struttura

```
art/
├── README.md      ← questo file (workflow)
├── STYLE.md       ← art direction globale + blocco di stile da appendere a OGNI prompt
├── TEMPLATE.md    ← formato standard di ogni file-prompt
├── world/         ← ambienti e atmosfere di Vaargal/Mezclar
├── characters/    ← schede visive canoniche dei personaggi (ancore di coerenza)
├── maps/          ← mappe
└── scenes/        ← scene specifiche (es. la consegna della Spada a Errol)
```

## Regola d'oro della coerenza

Ogni prompt **deve**:
1. appendere il **blocco di stile** condiviso definito in [STYLE.md](./STYLE.md);
2. **referenziare le ancore** dei soggetti ricorrenti — la descrizione fisica canonica di un personaggio/luogo vive una sola volta (in `characters/` o `world/`) e viene **incollata** dentro i prompt di scena, così lo stesso personaggio resta identico in ogni immagine;
3. rispettare il **registro cromatico** giusto per il contesto (quotidiano caldo vs sogno freddo — vedi STYLE.md).

## Ordine di generazione (futuro)

Si genera dal generale al particolare, così il particolare eredita la coerenza del generale:

1. **Mondo** — atmosfere e palette di Vaargal e Mezclar (fissano luce e colore).
2. **Personaggi** — schede visive canoniche (fissano i volti/le silhouette ricorrenti).
3. **Scene** — composizioni che combinano mondo + personaggi già fissati.

> Stato attuale: **solo standard impostato**. Unico prompt-scena già pronto e necessario in v1: [scenes/sogno-consegna-spada.md](./scenes/sogno-consegna-spada.md).

## Come si usa con ChatGPT

- Si parte sempre dai prompt di `world/` e `characters/` per fissare le ancore.
- Per una scena: si incolla il corpo del file-prompt **+** le ancore dei soggetti coinvolti **+** il blocco di stile di STYLE.md.
- Si rigenera finché l'immagine rispetta ancore e registro; si annota nel file-prompt la variante scelta.
