# Project Plan — Finalizzazione Prima Versione

Obiettivo: portare la **prima versione** (solo prologo, Ernesto a 10 anni, ~30 minuti, italiano) da materiale narrativo organizzato a build giocabile e rifinita.

Questo documento individua **cosa va espanso**, in che ordine, e quali **decisioni** vanno chiuse prima di scrivere il PRD. Si appoggia a:
- canone e struttura: `story/`, `characters/`, `world/`, `game-outline/`
- ispirazioni meccaniche: `research/genre-inspiration.md`

---

## 1. Stato attuale

- **Forte**: canone, temi, personaggi, mondo. Sequenza del prologo già dettagliata in 36 beat (`game-outline/prologue.md`). Scope e tono decisi (`game-outline/scope.md`).
- **Mancante**: tutto il "come si gioca" e il testo effettivo. Nessuna scelta tecnica fatta. Nessuna prosa di gioco scritta.

## 2. Cose da espandere (gap per arrivare a v1)

### A. Contenuto narrativo (da outline a testo giocabile)
1. **Leggenda iniziale di Mirea** — dichiarata "non ancora scritta in forma definitiva" (`prologue.md`). Va scritta: breve, vaga, nomina razze e orchi in modo neutro, niente spiegoni.
2. **Prosa e dialoghi del prologo** — i 36 beat sono uno scheletro. Servono: descrizioni delle stanze/luoghi, battute dei dialoghi (vecchio/Lesmidoom, Mirea), reazioni del parser, testi di transizione.
3. **Scena del sogno** — struttura e biforcazione definite; serve il testo effettivo (accampamento, fabbro/soldati, campo di battaglia, medaglione, tracce, Spada, consegna a Errol, vittoria epica) e il **wording delle conseguenze** della biforcazione.
4. **Testo di chiusura del prologo** — schermata/testo finale dopo la scoperta del segno.

### B. Sistema di gioco
5. **Vocabolario del parser** — set di verbi canonici, mappa sinonimi, sostantivi interagibili per scena, gestione filler/lemmatizzazione italiana (vedi `research` §1-2).
6. **Modello di affordance** — come evitare il guess-the-verb (nomi/verbi suggeriti, parole evidenziate). (`research` §1)
7. **Modello di stato/memoria** — quali scelte sono persistenti; almeno la biforcazione del sogno. (`research` §5)
8. **Mappa dei luoghi del prologo** — grafo delle stanze e collegamenti (bosco, tragitto, mensa, stanza di Ernesto, scene del sogno).
9. **Transizione UI terminale → 2D** — quando e come avviene; quanto realizzarne in v1.

### C. Tecnica / produzione
10. **Scelta di engine e stack** — motore narrativo (es. ink), strato parser, rendering/piattaforma. (`research` §4)
11. **Salvataggio/caricamento** e ripresa.
12. **Asset 2D/audio** — quanti e quali servono per il livello di "polish" richiesto.
13. **Pacing ~30 minuti** — verifica della durata.
14. **Accessibilità e onboarding** del parser.

### D. Canone da chiudere che impatta v1
15. **Nome completo di Ernesto** (open question, compare nel prologo).
16. **Aspetto preciso del segno** (open question, il segno appare a fine prologo).
- Le altre open question riguardano archi 13/16/20 e finale → **non bloccano v1**.

## 3. Decisioni aperte da chiudere (input per il grilling)

Ordinate per dipendenza (la #1 condiziona molte altre):

1. **Stack tecnico**: engine narrativo + come si integra il parser italiano + piattaforma (web? desktop?).
2. **Ambizione UI in v1**: terminale puro con accenno di 2D, oppure transizione 2D piena già nel prologo?
3. **Parser vs interfaccia ibrida**: riga di comando "pura" o nome-verbo assistito? Quanto assistere?
4. **Profondità del modello di memoria**: solo la biforcazione del sogno o più variabili tracciate?
5. **Quantità di rami opzionali** nel prologo (esplorazione libera vs binario guidato).
6. **Livello di polish per v1**: prototipo giocabile vs vertical slice rifinita con audio/2D.
7. **Nome di Ernesto** e **aspetto del segno**.

## 3-bis. Decisioni chiuse (grilling)

- **D1 — Stack**: web-based, **ink (inkjs)** per storia/stato + **parser italiano custom**. Terminal-first; 2D solo predisposto in v1, UI ricca demandata al futuro team. Sviluppo da solo in questa fase. → `docs/adr/0001-stack-tecnico-v1.md`.
- **D2 — Ambizione UI v1**: terminal-first; transizione 2D non rifinita in v1 (predisposta).
- **D3 — Modello parser**: **ibrido a prevalenza testuale** — input testuale come modalità principale nella maggior parte dei casi, con **bottoni premibili a schermo** che compaiono ogni tanto (scelte chiave e affordance puntuali, anti guess-the-verb).
- **D4 — Memoria**: prologo **autoconclusivo**; usato anche come palestra per padroneggiare meccaniche e memoria. **2-3 scelte con impatto reale sul prologo** + **1-2 semi** salvati per il lungo termine (non ripagati in v1).
  - Candidati con impatto sul prologo: (a) **biforcazione del sogno** (corri da solo → più morti / coordinati → scorta) — faro; (b) **come tratti il vecchio** (offri davvero il panino / calore vs minimo) → colora l'incontro con Lesmidoom e la reazione di Mirea; (c) **quanto esplori** bosco/mensa → piccoli richiami nel testo.
  - Candidati seme lungo termine (solo salvati): (a) **tono della risposta sul "mostro affamato"** (puramente infantile vs minima esitazione) → seme dell'arco "umani-eroi"; (b) **curiosità verso il vecchio/segno** notata da Ernesto.
- **D5 — Esplorazione**: v1 segue la **spina principale** (lineare guidata, ~30 min). Le **vie parallele/trasversali** che riconvergono sul finale con effetti più o meno marcati sono un'aggiunta **successiva** alla spina, non parte del primo taglio.
- **D6 — Canone chiuso in sessione**: il **nome completo di Ernesto non lo sa nessuno** (per tutti è solo Ernesto); il **segno è sul braccio sinistro**, forma ancora volutamente vaga. Recepito nei file sorgente e nella bibbia.
- **D7 — Direzione creativa del prologo**: **"Il quotidiano che diventa mito"** (Direzione A). Terminale = sguardo intimo di Ernesto bambino (prosa semplice, sensoriale); scelte piccole e umane prima del sogno; il sogno è una **rottura tonale** (terminale più freddo/adulto/frammentato + accenno 2D + biforcazione che pesa); risveglio quieto col segno. Insegnamento del parser intessuto nella narrazione, non a vignette. Scartate: B mystery-forward (tradisce "vivi il mito come lui"), C systems/vignette (piatta), D retrospettiva adulta (spoilera il sogno).
- **D8 — Voce e tempo**: **presente, seconda persona**, con brevi incisi di interiorità infantile. Eccezione: la **leggenda iniziale di Mirea** usa un registro "da racconto"/fiaba (default, da confermare).
- **D9 — Bivio "aiuto al vecchio" (4 scenari)**: due assi — *dai il panino?* × *lo accompagni subito alla mensa?* — con gradiente di generosità:
  - **A** (panino + accompagni) = canon, il più caloroso.
  - **B** (panino + non accompagni) = vai via, sensi di colpa, torni, Lesmidoom è sparito, lo ritrovi alla mensa.
  - **C** (no panino + accompagni) = simile a canon.
  - **D** (no panino + non accompagni) = gli **indichi solo dove si trova la mensa** (aiuto minimo, più freddo).
  - Tutti i rami **convergono alla mensa** (Lesmidoom si presenta lì davanti a Mirea in ogni caso) → canone preservato. Il gradiente semina stat nascoste (vedi D10).
  - Esplorazione bosco/mensa confermata, con **dettaglio che riaffiora nel sogno**.
- **D10 — Stat nascoste**: le scelte del prologo (gradiente di aiuto, biforcazione del sogno, esplorazione) **seminano stat nascoste**, **non visibili e non usate in v1**, attivate nelle espansioni. Set certo (almeno): **forza, intelligenza, empatia**. Candidate iniziali: aiuto al vecchio → empatia; biforcazione del sogno → intelligenza. **Aggiornamento: il sistema di stat è rimandato alla v2.** In v1 si **persistono solo i flag** delle scelte rilevanti (ramo di aiuto, biforcazione del sogno, colpo del combattimento-tutorial); la v2 definirà set completo e mappatura flag→stat. *(Riconciliare il PRD: stat fuori scope in v1; le scelte salvano flag riusabili.)*
- **D11 — Scena del sogno (riconciliazioni con l'originale `Lo Strano Sogno`)**:
  - **Segno**: confermato l'override sul **braccio sinistro** (l'originale diceva "destro (?)").
  - **Fughe di memoria adulta**: i riferimenti a Eireen e all'Accademia presenti nell'originale vengono **sfumati/rimossi** nel prologo (a 10 anni sarebbero confusivi e spoiler).
  - **Combattimento**: tenuto come **mini-tutorial leggibile** (aperture: ginocchia/fianco), senza fail-state duro (sconfitta → rianimato all'accampamento). La meccanica è **estratta in `mechanics/combat.md`** come spec riferibile dai combattimenti futuri.
  - **Stat da combattimento**: **solo il combattimento-tutorial** semina stat nascoste; gli altri combattimenti no.
- **D12 — Resa del sogno + immagini AI**:
  - Il sogno usa **styling diegetico del terminale** (testo + reazione visiva del terminale, alla *Stories Untold*) per tutta la sequenza.
  - **Una singola immagine 2D** mostrata al climax: la **consegna della Spada a Errol**. È l'unico asset visivo necessario in v1.
  - Le immagini si generano con **AI (ChatGPT)**. Si istituisce uno **standard di coerenza visiva** in `art/`: regole globali (`art/STYLE.md`), template di prompt (`art/TEMPLATE.md`), workflow (`art/README.md`) e i prompt per asset come file `.md`. Ordine futuro di generazione: **mondo → personaggi → scene**. Per ora si fissa solo lo standard (+ esempio della scena di Errol).
  - **Stile di resa**: scelto **Stile 1 (pittorico fantasy atmosferico)** in via **provvisoria** per la v1; le alternative (pixel-art, inchiostro/xilografia) sono salvate coi prompt di test in `art/STYLE-ALTERNATIVES.md` per la decisione finale col team. Le **stat sono rimandate alla v2** (in v1 si salvano solo i flag delle scelte).
- **D13 — Combattimento del sogno (matrice 2×2)**: due bivi indipendenti determinano numero e durezza degli scontri. *Bivio 1*: coordini (la scorta affronta i primi 3 nemici) vs da solo (li combatti tu, scontro perdibile). *Bivio 2*: chiudi l'orco-con-Spada **pulito** (punto debole → niente allarme) vs **maldestro** (l'orco chiama rinforzi → +3 nemici prima di consegnare la Spada). Esiti: **canon** (1 scontro), **medio** (2), **medio** (2), **difficile** (3). L'orco muore comunque (malfermo); il Bivio 2 decide solo se fa in tempo ad allertare. Dettaglio in `mechanics/combat.md` §5.
- **D14 — Revisione blueprint**: il blueprint del prologo (`game-outline/blueprint-prologo.md`, P00–P36) è stato generato da un agente e revisionato. Fix applicati: (1) scenario B non salta più i beat 10–15 (P08 → P09 in modalità «ritrovato», come D); (2) vocabolario delle aperture di combattimento standardizzato (`ginocchia/fianco/braccio`); (3) scontro multi-bersaglio dei 3 nemici recepito in `combat.md` §5-ter. **Grumlok canonizzato** come capo nemico (in `characters/errol.md`; nel sogno il nome affiora a Ernesto a P32). L'**ancora visiva di Errol** (`art/characters/errol.md`) la cura lo sviluppatore.

## 4. Fasi proposte

- **Fase 0 — Ricerca** ✅ (`research/genre-inspiration.md`).
- **Fase 1 — Decisioni** (grilling con `grill-with-docs`): chiudere le decisioni della §3.
- **Fase 2 — PRD** (`to-prd`): sintetizzare decisioni + scope in un PRD.
- **Fase 3 — Design di dettaglio**: vocabolario parser, mappa luoghi, modello di stato, copione completo del prologo.
- **Fase 4 — Implementazione**: engine, parser, scene, transizione UI, salvataggi.
- **Fase 5 — Polish & playtest**: pacing 30 min, onboarding, audio/2D, QA.

## 5. Criteri di "fatto" per v1

- Prologo giocabile dall'inizio alla scoperta del segno, ~30 minuti.
- Parser italiano robusto sul vocabolario del prologo, senza vicoli ciechi frustranti.
- Biforcazione del sogno funzionante e con conseguenza visibile/persistente.
- Nessun game over duro.
- Tono rispettato: intimo → epico → misterioso.
- Leggenda iniziale e testo di chiusura scritti in forma definitiva.

## 6. Rischi

- **Parser italiano** sottovalutato (morfologia ricca) → mitigare con vocabolario ristretto + affordance esplicite.
- **Scope creep** verso archi 13/16/20 → restano fuori da v1.
- **Transizione UI** troppo ambiziosa per una prima build → tenerla scoping-flessibile.
