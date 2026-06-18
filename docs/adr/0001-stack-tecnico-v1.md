# Stack tecnico della prima versione: web + ink + parser italiano custom

La v1 (prologo) viene sviluppata da una sola persona, con l'obiettivo di passare in seguito a un team che curi una UI 2D più ricca. Decidiamo una build **web-based** (HTML/JS nel browser): il livello narrativo (branching, variabili, memoria persistente delle scelte) è gestito da **ink** tramite **inkjs**, mentre uno **strato parser italiano custom** traduce il linguaggio naturale controllato in scelte/azioni che ink elabora.

Scelto perché: ink è battle-tested per choice & consequence con stato persistente e separa nettamente *storia* (ink) da *input* (parser), così il parser resta l'unico pezzo davvero custom; il web azzera l'installazione, rende immediato il playtest/condivisione da soli, e rende naturale la transizione diegetica terminale→2D nel DOM/canvas. In v1 la UI resta terminal-first con la transizione 2D solo predisposta (non rifinita): la UI ricca è demandata al futuro team.

## Considered Options
- **Engine desktop (Godot/Unity) + ink**: più potenza per 2D/audio, ma iterazione più lenta e build native non necessarie per un solo sviluppatore in fase di prototipo.
- **Custom puro senza ink**: massimo controllo ma costringe a reinventare branching, memoria e tooling narrativo.
- **Prototipo Twine**: rapido per la sola storia a nodi, ma lascia fuori parser e linguaggio naturale, che sono il cuore della visione.
