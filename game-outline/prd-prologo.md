# PRD — Il Lungo Viaggio, Prologo (v1)

> Documento di prodotto per la prima versione giocabile. Sintetizza le decisioni prese in sessione di planning + grilling. Non è canone narrativo (escluso dalla bibbia). **Riconciliato 2026-06-18 con le decisioni D7–D13** (voce, 4 scenari dell'aiuto, scena del sogno, combattimento, stat→v2, immagine, stile).
>
> Fonti: `game-outline/project-plan.md` (decisioni D1–D13), `research/genre-inspiration.md`, `mechanics/interaction.md`, `mechanics/combat.md`, `art/STYLE.md`, `docs/adr/0001-stack-tecnico-v1.md`, bibbia `story/story-bible.md`.
>
> `needs-triage`

## Problem Statement

Esiste molto materiale narrativo organizzato (canone, personaggi, mondo, e una sequenza di prologo in 36 beat), ma niente di giocabile e nessuna scelta tecnica fatta. Lo sviluppatore lavora **da solo** e vuole una **prima versione rifinita del solo prologo** (Ernesto a 10 anni, ~30 minuti, in italiano) che funzioni anche come **palestra** per padroneggiare e rendere proprie le meccaniche di gioco e il sistema di memoria, prima di coinvolgere un team per la UI ricca.

## Solution

Un gioco **web-based** che si presenta come **terminale narrativo** in italiano, nella direzione "**il quotidiano che diventa mito**" (voce in **presente, seconda persona**, sguardo di Ernesto bambino). Il giocatore interagisce con **input testuale in linguaggio naturale controllato** (modalità principale) affiancato da **bottoni a schermo** per le scelte situazionali e le aperture di combattimento. La storia, il branching e la memoria sono gestiti da **ink** (via inkjs); uno **strato parser italiano custom** traduce il testo del giocatore in azioni/scelte.

Il prologo segue la **spina narrativa principale** dei 36 beat, è **autoconclusivo**, non ha game over duro, e include **2-3 scelte con impatto reale** (gradiente di aiuto al vecchio; biforcazione del sogno) più **1-2 semi** salvati per il lungo termine. Il **sogno** è una **rottura tonale**: prosa più fredda e il **terminale stesso si altera** (styling diegetico, alla *Stories Untold*); al climax la **consegna della Spada a Errol è mostrata come singola immagine 2D**. Per il resto la transizione 2D è solo **predisposta** in v1 (la UI ricca è demandata al futuro team).

## User Stories

### Giocatore — interazione e parser
1. Come giocatore, voglio scrivere comandi in italiano naturale (es. `segui scoiattolo`, `esamina spada`), così da interagire col mondo come parlerei.
2. Come giocatore, voglio che sinonimi equivalenti siano accettati (es. `prendi`/`raccogli`/`afferra`), così da non dover indovinare la parola esatta.
3. Come giocatore, voglio che articoli e parole di riempimento siano ignorati (`guarda il sasso` = `guarda sasso`), così da scrivere in modo naturale.
4. Come giocatore, quando un comando non è capito, voglio un messaggio utile che mi orienti, così da non restare bloccato.
5. Come giocatore, voglio poter chiedere le azioni disponibili (`?`/`aiuto`), così da scoprire cosa posso fare senza un manuale.
6. Come giocatore, voglio che le scelte situazionali compaiano come bottoni a schermo, così da non dover indovinare il comando nei momenti importanti.
7. Come giocatore, voglio poter esaminare l'ambiente e gli oggetti di colore, così da immergermi nella scena anche fuori dalla spina principale.
8. Come giocatore, voglio consultare il mio inventario (spada di legno, mezzo panino), così da sapere cosa possiedo.

### Giocatore — esperienza narrativa del prologo
9. Come giocatore, voglio una leggenda iniziale breve e vaga raccontata da Mirea (registro da racconto/fiaba), così da entrare nel mondo senza spiegoni.
10. Come giocatore, voglio giocare Ernesto bambino che vive il mito (Errol eroe, umani buoni, creature pericolose), così da vivere il mondo come lo vive lui.
11. Come giocatore, voglio seguire lo scoiattolo nel bosco e incontrare l'anziano viandante, così da innescare l'incontro centrale.
12. Come giocatore, voglio che il **modo in cui aiuto il vecchio** cambi la scena — offrire o no il panino, accompagnarlo, o solo indicargli la strada — incluso il poter tornare indietro per rimorso, così che la mia gentilezza abbia un peso (4 scenari che convergono alla mensa).
13. Come giocatore, voglio rispondere alla domanda sul "mostro affamato", così da esprimere la convinzione di Ernesto (con sfumature registrate come seme per il futuro).
14. Come giocatore, voglio vivere la scena della mensa e la presentazione di Lesmidoom davanti a Mirea, così da percepire che qualcosa è cambiato.
15. Come giocatore, voglio che entrando nel sogno il **terminale stesso cambi pelle** (più freddo, alterato), così da sentire la rottura tra quotidiano e mito.
16. Come giocatore, voglio vivere il sogno della battaglia di Errol nel corpo del soldato adulto, recuperare la Spada del Lungo Viaggio e consegnarla, così da raggiungere il climax epico.
17. Come giocatore, nel sogno voglio scegliere se coordinarmi col fabbro o correre da solo a nord, così che la mia scelta cambi le perdite e quanti scontri affronto, e resti registrata.
18. Come giocatore, voglio combattere **leggendo le aperture** del nemico (es. ginocchia/fianco) con azioni chiare, così da non restare bloccato in un momento di tensione.
19. Come giocatore, voglio che **chiudere male** il combattimento dell'orco faccia arrivare rinforzi, così che la mia abilità cambi la difficoltà del sogno.
20. Come giocatore, se vengo sconfitto nel sogno, voglio essere rianimato e ripartire dall'accampamento (niente game over duro), così da non essere punito con un fallimento secco.
21. Come giocatore, al climax voglio vedere a schermo l'**immagine della consegna della Spada a Errol**, così da vivere l'apice in modo epico.
22. Come giocatore, al risveglio voglio notare da solo il segno sul **braccio sinistro**, così da chiudere il prologo su una nota misteriosa.
23. Come giocatore, voglio una schermata/testo di chiusura del prologo, così da percepire la fine dell'episodio.

### Giocatore — sistema e sessione
24. Come giocatore, voglio che le mie scelte importanti siano ricordate dal gioco, così da sentirne il peso.
25. Come giocatore, voglio poter salvare e riprendere la partita, così da non perdere i progressi.
26. Come giocatore, voglio che il prologo duri circa 30 minuti e mantenga il tono intimo→epico→misterioso, così da avere un'esperienza completa e ritmata.
27. Come giocatore, voglio giocare nel browser senza installare nulla, così da iniziare subito.

### Autore / sviluppatore
28. Come autore, voglio scrivere la storia e le diramazioni in file ink, così da iterare sul testo senza toccare il codice di sistema.
29. Come autore, voglio definire il vocabolario (verbi canonici, sinonimi, sostantivi per scena) come dati, così da estenderlo senza modificare la logica del parser.
30. Come autore, voglio una **spec di combattimento riutilizzabile** (`mechanics/combat.md`), così da aggiungere scontri coerenti senza riprogettare la meccanica.
31. Come autore, voglio uno **standard di prompt per le immagini AI** (`art/`), così che tutti gli asset restino coerenti.
32. Come sviluppatore, voglio un parser isolato e testabile, così da garantirne la robustezza sul vocabolario del prologo.
33. Come sviluppatore, voglio usare il prologo come banco di prova per capire a fondo meccaniche e memoria, così da poterle riusare e far evolvere nelle espansioni.

## Implementation Decisions

**Architettura (vedi ADR-0001).** Web-based; **ink/inkjs** per narrativa, branching e stato persistente; **parser italiano custom** come strato di input separato. ink possiede la *storia e lo stato*; il parser possiede l'*interpretazione dell'input*. Terminal-first; livello 2D solo predisposto, salvo la singola immagine del climax.

**Moduli principali (candidati a moduli "profondi", da confermare):**

- **Parser italiano** — modulo profondo, cuore custom. Data una stringa + il contesto (oggetti/azioni disponibili), restituisce un comando canonico, un'ambiguità, o un "non capito". Incapsula normalizzazione, sinonimi, drop filler, lemmatizzazione leggera. Spec: `mechanics/interaction.md`. Testabile in isolamento.
- **Vocabolario** — dati: verbi canonici + sinonimi (§2A di `interaction.md`), sostantivi interagibili per scena. Alimenta parser e affordance.
- **Motore narrativo (adapter inkjs)** — espone testo corrente, scelte disponibili, get/set delle variabili di stato; nasconde i dettagli di inkjs.
- **Router comando→storia** — mappa il comando canonico sulla scelta/azione ink valida nel contesto; gestisce i fallback senza rompere l'immersione.
- **Combattimento** — implementa il modello di `mechanics/combat.md`: aperture leggibili, input ibrido, matrice 2×2 del sogno, allarme→rinforzi, sconfitta morbida.
- **Stato e memoria persistente** — serializzazione dello stato ink + flag nostri; salvataggio/ripresa.
- **Shell di presentazione (UI)** — renderer del terminale, bottoni situazionali/aperture, evidenziazione affordance, **styling diegetico** per il sogno, slot per la singola immagine del climax; predisposizione (stub) del pannello 2D.

**Modello di interazione.** Ibrido a prevalenza testuale (`mechanics/interaction.md`): **comandi sempre disponibili** (esamina/guarda, vai, segui, prendi, parla, dai, usa, inventario, aspetta, aiuto) + **scelte situazionali** mostrate come bottoni. Obiettivo: neutralizzare il "guess-the-verb".

**Modello di scelte/memoria.** In **v1 si salvano solo flag** (le stat sono **rimandate alla v2**). Flag con impatto nel prologo: scenario di aiuto al vecchio (panino × accompagnamento, 4 esiti, D9); biforcazione del sogno (coordinati/da solo) e relative perdite; stile del colpo-tutorial (ginocchia/fianco) ed eventuale allarme che aggiunge uno scontro (D13); grado di esplorazione (con un dettaglio che riaffiora nel sogno). Semi a lungo termine (solo salvati): tono della risposta sul "mostro affamato"; curiosità verso il vecchio/segno. La v2 mapperà i flag su stat (forza, intelligenza, empatia).

**Combattimento.** Per `mechanics/combat.md`: leggibile (mostra le aperture), cinematografico, input ibrido. Nel sogno la **matrice 2×2** (coordinarsi × chiudere pulito l'orco) produce 1/2/2/3 scontri. Nessun HP a schermo; 2 errori negli scontri perdibili → rianimato.

**Contenuto da produrre.** Leggenda iniziale (forma definitiva), prosa e dialoghi dei 36 beat, 4 scenari dell'aiuto, scena del sogno con wording delle conseguenze e styling diegetico, **prompt+immagine della consegna a Errol**, testo di chiusura. Mappa dei luoghi come grafo di scene ink. Il **blueprint** sarà prodotto a partire da `game-outline/agent-brief-prologo.md`.

**Canone recepito.** Nome completo di Ernesto: ignoto a tutti. Segno: braccio sinistro, forma vaga. Nel sogno si sfumano i riferimenti adulti (Eireen/Accademia).

Nessun percorso file o snippet di codice è fissato qui: si definiscono in implementazione.

## Testing Decisions

- **Cosa rende buono un test:** verifica il *comportamento esterno*, non i dettagli implementativi.
- **Moduli da testare in isolamento:**
  - **Parser italiano** (priorità massima): test a tabella con frasi reali, sinonimi, coniugazioni, filler, maiuscole/accenti → comando canonico atteso; più ambiguità e input ignoto.
  - **Router comando→storia**: dato comando + stato → scelta/azione ink corretta o fallback corretto.
  - **Combattimento**: la **matrice 2×2** produce il numero di scontri atteso (coordinati+pulito=1; …; solo+allarme=3); chiudere male l'orco innesca i rinforzi; 2 errori → rianimazione.
  - **Stato e memoria**: roundtrip salva→carica preserva lo stato; le scelte chiave impostano i flag attesi; la biforcazione del sogno registra le perdite attese.
- **Prior art:** progetto greenfield → questo PRD stabilisce il pattern (test table-driven sul parser come riferimento).
- **Conferma richiesta allo sviluppatore:** quali moduli coprire con test fin da subito (raccomandati: Parser, Combattimento, Memoria).

## Out of Scope

- Archi a 13 / 16 / 20 anni e tutto il post-Nylph (materiale canonico per espansioni).
- **Vie parallele/trasversali** del prologo: si aggiungono *dopo* la spina principale, non nel primo taglio.
- **Sistema di stat**: rimandato alla **v2**; in v1 le scelte salvano solo flag riusabili, nessuna stat visibile o usata.
- UI 2D rifinita e asset elaborati (demandati al futuro team). **Eccezione**: la singola immagine statica del climax (consegna a Errol) è in scope.
- Forma definitiva del segno; nome di Ernesto (resta ignoto per scelta).
- Multilingua e qualsiasi uso di LLM dentro al gioco (parser locale e controllato).

## Further Notes

- Il prologo è un **veicolo di apprendimento**: padroneggiare meccaniche e memoria per riusarle nelle espansioni.
- La separazione ink (storia/stato) ↔ parser (input) è il principio architetturale portante.
- La transizione terminale→2D è una **leva narrativa** (il sogno): styling diegetico + un'immagine al climax in v1; UI 2D ricca al team.
- **Stile visivo**: scelto **Stile 1 (pittorico)** in via provvisoria; alternative in `art/STYLE-ALTERNATIVES.md`, decisione finale col team.
- Riferimenti: decisioni in `game-outline/project-plan.md` §3-bis; interazione/combattimento in `mechanics/`; stack in `docs/adr/0001-stack-tecnico-v1.md`; brief per generare il blueprint in `game-outline/agent-brief-prologo.md`.
- Non essendoci un issue tracker, questo PRD vive come file nel repo; con un tracker, va pubblicato con label `needs-triage`.
