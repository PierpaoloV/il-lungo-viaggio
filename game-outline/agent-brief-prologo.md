# Brief per Agente — Genera il Blueprint Giocabile del Prologo

> Questo file è un **prompt operativo** da dare a un agente. L'agente, leggendo le reference elencate, deve produrre il **blueprint completo del prologo**: la storia trasformata in scene giocabili, con prosa, scelte, reazioni del parser, flag e combattimenti, pronta perché un altro agente la implementi in codice (ink + parser).

## Ruolo e obiettivo

Sei un **narrative designer** di *Il Lungo Viaggio*. Devi scrivere il **blueprint giocabile del prologo** (Ernesto a 10 anni, ~30 minuti, in italiano). Non inventi la storia: la **realizzi** a partire dal canone e dalle decisioni già prese, riempiendo lo scheletro dei 36 beat con testo e meccaniche concrete.

## Leggi PRIMA queste reference (in quest'ordine)

1. `story/story-bible.md` — **canone** (mondo, personaggi, temi, verità profonde). Vincolante.
2. `game-outline/prologue.md` — **scheletro** del prologo: i 36 beat + struttura del sogno. È la spina dorsale da seguire.
3. `game-outline/project-plan.md` §3-bis (decisioni **D1–D13**) — tutte le scelte di design/voce/meccaniche già prese. Vincolanti.
4. `mechanics/interaction.md` — comandi sempre disponibili + scelte situazionali + regole del parser.
5. `mechanics/combat.md` — modello di combattimento e **matrice 2×2** del sogno.
6. `art/STYLE.md` e `art/scenes/sogno-consegna-spada.md` — l'unica immagine prevista in v1.
7. `characters/*` — dettaglio sui personaggi.

## Vincoli inviolabili

**Canone**
- Non contraddire `story/story-bible.md`. Dove una scena esiste nei documenti originali, **quella è la baseline** (principio operativo del canone).
- Ernesto **vive il mito**: nel prologo Errol è l'eroe, gli umani i buoni, le creature il pericolo. **Non** mettere in crisi questa visione né svelare le verità profonde (Viaggiatore/Corruttrice/orchi/viaggio nel tempo/natura di Eireen).
- Orchi: nel prologo chiamali soprattutto **creature, nemici, mostri, esseri verdastri**; "orchi" solo in bocca a soldati/leggende/propaganda.
- **Segno** sul **braccio sinistro**, forma vaga. **Nome** completo di Ernesto: nessuno lo conosce.
- Nel sogno **sfuma/rimuovi** i riferimenti dell'originale a Eireen e all'Accademia (memoria dell'Ernesto adulto, fuori posto a 10 anni).

**Voce (D7–D8)**
- Direzione "**il quotidiano che diventa mito**": prosa semplice, sensoriale, calda; lo sguardo è quello di Ernesto bambino.
- **Presente, seconda persona**, con brevi incisi di interiorità infantile.
- La **leggenda iniziale di Mirea** usa un registro "da racconto"/fiaba.
- Il **sogno** è una **rottura tonale**: prosa più fredda, adulta, frammentata; il terminale "reagisce" (styling diegetico).

**Meccaniche**
- Interazione ibrida secondo `mechanics/interaction.md` (comandi globali + scelte situazionali a bottone).
- Combattimenti secondo `mechanics/combat.md` (matrice 2×2; l'orco muore comunque; errore tutorial = allarme + 3 nemici; i 3 nemici sono lo scontro perdibile; 2 errori → rianimato).
- **Niente game over duro.**
- **Stat → v2**: in v1 salva solo **flag**. Non introdurre stat visibili.

## Struttura da seguire

Segui i **36 beat** di `game-outline/prologue.md`, incorporando i raffinamenti:
- Beat 6–8 (aiuto al vecchio): realizza i **4 scenari D9** (dai panino × accompagni) che **convergono tutti alla mensa**.
- Beat 28–33 (sogno): realizza la **matrice di combattimento D13** e la **biforcazione** coordinati/da solo, con la **consegna della Spada a Errol mostrata come immagine** (`art/scenes/sogno-consegna-spada.md`).
- Beat 34–36 (risveglio): il segno sul braccio sinistro, Mirea che chiama, chiusura del prologo.

Macro-sequenza: **leggenda → bosco/scoiattolo → incontro col vecchio → tragitto (4 scenari) → mensa & Lesmidoom → micro-scena notte → sogno (bivio + combattimenti + Spada a Errol) → risveglio col segno → chiusura.**

## Scelte e memoria

- **2–3 scelte con impatto sul prologo**: gradiente di aiuto al vecchio (D9), biforcazione del sogno (D13), grado di esplorazione (con un dettaglio che **riaffiora nel sogno**).
- **1–2 semi a lungo termine** (solo salvati): tono della risposta sul "mostro affamato", curiosità verso il vecchio/segno.
- Per ogni scelta che conta, dichiara il **flag** impostato e dove viene (eventualmente) riletto.

## Formato di output (per OGNI scena)

Produci un file `game-outline/blueprint-prologo.md` con una sezione per scena, in questo schema:

```
### <id-scena> — <titolo>
- Obiettivo narrativo:
- Luogo / atmosfera:
- Prosa (presente, 2ª persona):  <testo introduttivo della scena>
- Azioni sempre disponibili rilevanti qui: <verbi globali + risposte specifiche>
- Scelte situazionali (bottoni): <opzione → reazione → flag impostato>
- Oggetti/personaggi interagibili: <nome → descrizione di `esamina`>
- Combattimento (se presente): <rimando a combat.md + parametri della scena>
- Flag letti/scritti:
- Uscite / transizione: <verso quale scena, a quali condizioni>
- Note di resa (audio/immagine/styling): <se applicabile>
```

In testa al file, dichiara lo **stato globale**: inventario iniziale (spada di legno, mezzo panino) e l'elenco di tutti i **flag** usati, con valori possibili.

## Regole di processo

- Scrivi in **italiano**.
- **Non inventare** elementi di mondo/canone non presenti nelle reference: dove il canone tace, **segnala** la lacuna in una sezione "Domande aperte" in fondo, invece di riempirla a caso.
- Punta a un **pacing ~30 minuti**: prosa essenziale, niente riempitivi.
- Mantieni coerenza tra le scene (oggetti, nomi, flag).

## Definition of done

- Tutte le scene dei 36 beat coperte, dall'inizio alla chiusura del prologo.
- 4 scenari dell'aiuto al vecchio + matrice di combattimento del sogno implementati come testo+scelte+flag.
- Stato globale e flag dichiarati e coerenti.
- Voce e vincoli di canone rispettati.
- Eventuali lacune raccolte in "Domande aperte".
