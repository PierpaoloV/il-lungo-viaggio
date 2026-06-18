# TEMPLATE — Formato standard di un file-prompt

Ogni file-prompt in `world/`, `characters/`, `maps/`, `scenes/` segue questa struttura. Copia questo schema in un nuovo file e compilalo.

---

## Titolo asset

- **Tipo:** mondo | personaggio | mappa | scena
- **Registro cromatico:** quotidiano | sogno | misterioso
- **Formato:** 16:9 | 3:4 | 1:1 | 4:3
- **Ancore referenziate:** elenco dei soggetti ricorrenti i cui file vanno incollati nel prompt (es. `characters/ernesto.md`, `characters/errol.md`). Per `world/` e `characters/` di base questo campo è vuoto: sono *loro* le ancore.

### Ancora canonica *(solo per `characters/` e `world/`)*
Descrizione fisica fissa e invariabile del soggetto (età, corporatura, capelli, abiti, tratti distintivi, palette personale). È il testo che verrà **incollato** in tutte le scene che lo contengono.

### Prompt
Il testo descrittivo da dare all'AI: soggetto, azione, ambiente, luce, inquadratura, emozione. Concreto e visivo, non narrativo.

### + Blocco di stile
Appendi il blocco di stile da `STYLE.md` §6, scegliendo il registro cromatico e il formato corretti.

### Note
Varianti provate, quale è stata scelta, cosa correggere alla prossima generazione.
