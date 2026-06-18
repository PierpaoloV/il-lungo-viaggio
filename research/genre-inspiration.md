# Ricerca Di Genere e Ispirazioni Per Le Meccaniche

Traccia di ricerca sui giochi affini a *Il Lungo Viaggio* (interactive fiction / parser, narrativi terminale→2D, choice & consequence). Serve come fonte d'ispirazione per le meccaniche, non come specifica vincolante.

Ultimo aggiornamento: 2026-06-17.

---

## 1. Parser testuale: come progettarlo bene

Riferimento principale: analisi di Emily Short sul parser e statistiche sui comandi in IF classica.

**Dati utili sul comportamento dei comandi**
- Oltre il **90% delle azioni** dei giocatori è lungo **una o due parole**.
- Forma dominante: **verbo-oggetto** ("apri porta", "prendi spada"). Le azioni a tre parole sono quasi sempre **verbo-preposizione-oggetto** ("guarda sotto letto").
- Su centinaia di verbi unici, **i 100 più comuni coprono ~95%** delle azioni. → conviene implementare benissimo un set piccolo di verbi.

**Tecniche standard di un parser robusto**
- **Normalizzazione sinonimi**: "prendi" = "raccogli" = "afferra" → un solo verbo canonico.
- **Drop delle filler words**: articoli e preposizioni di riempimento ("guarda *il* sasso" → `guarda sasso`).
- **Riduzione a forma canonica** prima del matching.

**Il problema centrale del parser: "guess-the-verb"**
- Il prompt è una "promessa bugiarda": dice "scrivi e ti capirò", ma spesso non capisce → frustrazione iniziale.
- Il parser è nascosto: il giocatore non sa quali azioni esistono → deve indovinare.
- Onere per l'autore: bisogna gestire input implausibili ("tocca la luna") solo per non sembrare buggato.

**Mitigazioni consigliate (molto rilevanti per noi)**
- **Interfaccia ibrida nome-verbo**: il giocatore seleziona un sostantivo evidenziato e il gioco mostra i verbi disponibili per quell'oggetto, mantenendo comunque la riga di comando per chi la vuole.
- **Suggerimenti contestuali nel testo** e **parole-chiave evidenziate/cliccabili** (modello *Blue Lacuna*).
- **Finestra separata per gli errori**, così il testo significativo non scorre via.
- Insegnare il vocabolario al giocatore *dentro* la narrazione invece che con un manuale.

> Implicazione per *Il Lungo Viaggio*: parser locale con set di verbi piccolo e canonico, sinonimi mappati, e affordance esplicite (verbi/nomi suggeriti) per evitare il guess-the-verb. Coerente con la decisione "parser locale, robusto e controllato, niente LLM".

## 2. Lingua italiana: attenzione specifica

- L'italiano è morfologicamente più ricco dell'inglese (coniugazioni, genere/numero, articoli) → il matching non può essere puro confronto di stringhe.
- Esistono precedenti di librerie parser non-inglesi (es. InformATE per lo spagnolo su Inform) → la localizzazione del parser è un problema noto e affrontabile, ma va progettata.
- Strategia praticabile: **stemming/lemmatizzazione leggera** + dizionario di sinonimi curato a mano per il vocabolario ristretto del gioco, invece di un parser linguistico generale.

## 3. Interfaccia diegetica: terminale come parte del mondo

Riferimento: *Stories Untold* (NoCode) e *A Dark Room* (Doublespeak Games).

**Stories Untold**
- Il terminale/computer non è solo UI: è **un'entità dentro il mondo di gioco**. Si gioca a un'avventura testuale *dentro* una stanza 3D, su un CRT.
- L'ambiente attorno reagisce e "rispecchia" ciò che accade nel testo → l'interfaccia diventa **medium e mostro** insieme.
- Lezione: una UI testuale "arcaica" diventa esperienza moderna grazie a presentazione, sonoro e contesto.

**A Dark Room**
- Interfaccia minimale (testo scuro su bianco) che crea mistero e "spirito di frontiera".
- **Evoluzione progressiva**: il mondo e le meccaniche si svelano e crescono col tempo, sorprendendo il giocatore. Inizia come puro testo e si stratifica.

> Implicazione per noi: la transizione voluta "terminale a schermo intero → struttura 2D affianco" non è un vezzo tecnico ma una **leva narrativa**. Il passaggio può coincidere col sogno/risveglio. Modello mentale: il terminale è diegetico e si "apre" quando la storia lo richiede.

## 4. Motori narrativi: ink vs Twine vs Yarn

| | Filosofia | Punti di forza | Note |
|---|---|---|---|
| **ink** (inkle) | Markup-first: il testo viene prima, logica inserita inline. File di testo semplici. | Diverts ("come hyperlink"), variabili e stato, ricorda automaticamente le scelte già fatte e i passaggi già visti. Pensato come middleware da integrare in un engine (Unity/Unreal/custom). Open source MIT. | Usato in *80 Days*, *Heaven's Vault*, *Sorcery!*. Ottimo per branching + memoria persistente. |
| **Twine** | Autoria visuale a nodi ("post-it e spago"). | Facilissimo per IF web, prototipazione rapida. | Le diramazioni complesse diventano difficili da leggere come grafo. |
| **Yarn Spinner** | Dialoghi a copione, integrazione Unity. | Buono per dialoghi di gioco. | Più orientato al dialogo che alla IF completa. |

**Caratteristiche di ink utili per choice & consequence con memoria**
- Variabili e stato persistente nativi.
- Ricorda quali scelte/passaggi sono già stati visti (utile per reattività).
- Diverts e thread per intrecciare contenuti.

> Implicazione: ink è il candidato naturale per il **livello narrativo/branching + memoria persistente**. Resta aperta la questione di come integrarlo con il **parser** in italiano e con il rendering terminale→2D (decisione tecnica da prendere). ink gestisce la storia; il parser è uno strato di input separato che traduce il linguaggio naturale in scelte/azioni.

## 5. Choice & consequence: il peso delle scelte

Riferimento: *Citizen Sleeper*, *80 Days* e analisi sul design choice-driven.

- *Citizen Sleeper*: la forza non è la quantità di scelte ma il loro **peso emotivo**; ogni conseguenza è "tua". Le meccaniche (scarsità di risorse, dadi che calano col deteriorarsi del corpo) **rinforzano i temi** (precarietà). Molto world-building avviene "nella mente" del giocatore, stile TTRPG.
- Principio: le **meccaniche devono incarnare il tema**, non essere decorazione.

> Implicazione per noi: il tema è "riconoscere una colpa, cambiare idea, ricostruire dopo un errore" e "un errore non si cancella". Le meccaniche del prologo dovrebbero anticipare questo: la **biforcazione del sogno** (correre da solo a nord = più morti; coordinarsi = scorta e meno perdite) è esattamente una scelta a conseguenza **persistente e irreversibile**, in linea con il tema. Da valorizzare come prototipo del sistema di memoria.

## 6. Sintesi: meccaniche candidate per il prologo

Derivate dalla ricerca, da validare in fase di grilling/PRD:

1. **Parser canonico ristretto**: ~10-20 verbi (esamina, prendi, parla, vai, segui, dai, usa, guarda, inventario, aspetta...), dizionario sinonimi, drop filler, lemmatizzazione leggera per l'italiano.
2. **Affordance anti guess-the-verb**: nomi/verbi suggeriti o evidenziati, niente manuale; il vocabolario si insegna nel testo.
3. **Interfaccia diegetica evolutiva**: terminale full-screen all'inizio; apertura a 2D come beat narrativo (candidato: il sogno/risveglio).
4. **Memoria persistente delle scelte**: variabili di stato (modello ink) per registrare scelte chiave; prima conseguenza concreta = biforcazione del sogno.
5. **Niente fail-state duro nel prologo**: in caso di sconfitta nel sogno, rianimazione e ripartenza dall'accampamento (come da documento originale).
6. **Scelte > stat**: nessuna stat visibile nel prologo; eventuali stat restano latenti per espansioni future.

---

## Fonti

- [Interactive fiction — Wikipedia](https://en.wikipedia.org/wiki/Interactive_fiction)
- [Text parser — Wikipedia](https://en.wikipedia.org/wiki/Text_parser)
- [Emily Short — "So, Do We Need This Parser Thing Anyway?"](https://emshort.blog/2010/06/07/so-do-we-need-this-parser-thing-anyway/)
- [ink — inkle's narrative scripting language](https://www.inklestudios.com/ink/)
- [Authoring interactive narrative in Twine 2 vs Ink (Katharine Neil)](https://medium.com/@haikus_by_KN/authoring-interactive-narrative-in-twine-2-vs-ink-a-quick-and-dirty-comparison-using-examples-e695eb4dfc3e)
- [Twine vs Yarn Spinner vs Ink vs NarrativeFlow](https://narrativeflow.dev/blog/twine-vs-yarn-spinner-vs-ink-vs-narrativeflow-which-branching-dialogue-tool-is-right-for-your-game/)
- [A Dark Room — Game Developer: journey from web to iOS](https://www.gamedeveloper.com/design/-i-a-dark-room-i-s-unique-journey-from-the-web-to-ios)
- [A Dark Room (sito ufficiale)](https://adarkroom.doublespeakgames.com/)
- [Stories Untold — MobyGames](https://www.mobygames.com/game/86608/stories-untold/)
- [Stories Untold — PC Gamer review](https://www.pcgamer.com/stories-untold-review/)
- [The Weight of your choices in Citizen Sleeper (tonico.games)](https://tonico.games/post/2024-11-10-the-weight-of-your-choices-in-citizen-sleeper/)
- [Freedom and Consequence: Narrative in Choice-Driven Games (Game Developer)](https://www.gamedeveloper.com/design/freedom-and-consequence-the-importance-of-narrative-in-choice-driven-games)
- [Inform — Wikipedia (parser, world model, librerie non-inglesi)](https://en.wikipedia.org/wiki/Inform)
- [Morphological parsing — Wikipedia](https://en.wikipedia.org/wiki/Morphological_parsing)
