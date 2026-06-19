# Design — Espansione incontro Ernesto / Lesmidoom (p05–p19)

Stato: **proposta da rivedere**. Nessuna implementazione finché non approvata.

Sintesi delle decisioni del committente:

- Statistiche **diegetiche invisibili** (nessun numero a schermo).
- Tre tratti tematici: `stat_empatia`, `stat_coraggio`, `stat_acume`, range 0–2 nel prologo,
  semi per gli archi futuri (13/16/20 anni).
- Le prove **non hanno risposta giusta**: sono caratterizzazione, non puzzle.
- Vincolo narrativo fermo (`game-outline/prologue.md`): nel prologo non si mette in crisi
  la visione mitica di Ernesto (Errol eroe, umani buoni, mostri pericolo).

---

## 1. Principi (sintesi del consiglio)

1. **Presentazione = gesto, non biografia.** Lesmidoom si rivela per metonimia (un oggetto,
   un'abitudine fisica), non con un info-dump. Il nome resta un déjà-vu prima del reveal a p16.
2. **Dialogo reciproco.** Lesmidoom interroga Ernesto; Ernesto può interrogare lui. Chi chiede
   di più ottiene di più, ma il dialogo procede comunque per chi tace.
3. **Reticenza attiva.** Il mistero non è assenza di informazioni: è presenza di qualcosa di
   trattenuto. Lesmidoom dice una cosa vera ma incompleta, poi **si chiude con un gesto visibile**.
4. **Prove diegetiche, senza risposta giusta**, somministrate come **scelte pesate**
   (`# peso: scelta`), mai input libero (rischio parser).
5. **Effetto delle stat invisibile**: cambia le battute di Lesmidoom e sblocca informazioni
   in più (topic / scelte ink), mai un pannello numerico.

---

## 2. Sistema statistiche (tecnico)

Nuove VAR in testa a `src/story/prologo.ink`:

```ink
VAR stat_empatia = 0
VAR stat_coraggio = 0
VAR stat_acume = 0
// Flag-ponte: impostati quando una soglia è raggiunta, per gatare i topic
// (il sistema topics confronta solo per uguaglianza, non sa fare ">= 2").
VAR acume_vivo = false
VAR empatia_viva = false
```

- Incremento: `~ stat_acume = stat_acume + 1` dentro le scelte.
- Soglie native in ink: `{ stat_acume >= 2: ... }` per scelte/battute condizionali.
- Per sbloccare un **topic** (es. `chiedi di Errol da vicino`) su una soglia, si imposta il
  flag-ponte: `{ stat_acume >= 2: ~ acume_vivo = true }`, e il topic usa `requiresFlag: acume_vivo=true`.
- Nessuna modifica all'engine TypeScript: `getFlag`/`setFlag` (`src/state/saveLoad.ts`) già
  leggono/scrivono VAR ink generiche, numeri inclusi.

### Mappa degli incrementi (2 occasioni per tratto → range 0–2)

| Tratto | Punto | Scelta che incrementa |
|---|---|---|
| empatia | p06 | `Offri il panino` (riusa `panino_dato`) |
| empatia | p07 | `Accompagnalo alla mensa` (riusa `vecchio_accompagnato`) |
| coraggio | p12 | `Lo uccido. È un mostro.` (risposta netta) |
| coraggio | p18 | `Resta vicino` (affrontare lo sguardo del vecchio) |
| acume | p04 | `Segui le tracce` / `esamina tracce` (riusa `bosco_tracce_osservate`) |
| acume | nuovo indovinello (p09) | risposta osservativa/riflessiva |

> Nota: gli incrementi si **appoggiano a scelte già esistenti** dove possibile, così non si
> moltiplicano i bivi. Solo l'indovinello è una prova nuova.

### Effetti soglia (diegetici, "informazioni in più")

| Condizione | Effetto |
|---|---|
| `stat_acume >= 2` | sblocca topic *Errol da vicino* (la battuta «Stanco. Come chi ha vinto…»), oggi gated su `seed_curiosita_vecchio`. Lesmidoom aggiunge una riga di riconoscimento. |
| `stat_empatia >= 2` | sblocca un accenno sulla **borsa vuota** di Lesmidoom: «Alcune cose le porti finché non trovi a chi darle.» (foreshadow, entro i limiti del prologo). |
| `stat_coraggio >= 2` | a p18/p19 Lesmidoom reagisce con una riga diversa, meno paterna e più diretta. |

---

## 3. Interventi knot per knot

### p05 — primo sguardo + borsa (presentazione per metonimia)
Aggiungere al testo narrativo il dettaglio fisico ricorrente (story-writer):

> Tiene una borsa di cuoio legata alla cintura con un nodo doppio, strano. Non pesa niente —
> si vede dalla piega del tessuto — eppure lui la controlla con la mano, una volta, come chi
> verifica che una cosa sia ancora al suo posto.

Nuovo oggetto esaminabile `BORSA` in `sampleSceneContext.ts`, con descrizione che cambia per scena:
- bosco: «Non vedi cosa contiene.»
- mensa (prima del pasto): «Sembra vuota, o quasi.»
- mensa (dopo p16): «La sua mano ci torna sopra ogni tanto, come un'abitudine.»

`esamina vecchio` arricchito e cumulativo (riusa `examineEffects`): primo sguardo denso, poi
dettagli progressivi (mani non da contadino; stanchezza che non passa col riposo).

### p05b (nuova) — scambio di nomi
Knot breve tra p05 e p06. Il vecchio chiede il nome; Ernesto risponde; "Lesmidoom" cade di
sfuggita (déjà-vu prima del reveal a p16). Una sola scelta (il vincolo non permette il rifiuto):

```ink
=== p05b ===
Il vecchio guarda la spada storta alla tua cintura. Non ride. # scene: p05b
"È di legno, ma la porti come una cosa seria. Come ti chiami, ragazzino?" # voce: vecchio

* [Digli il tuo nome]
    "Ernesto," dici.
    "Lesmidoom. Ma i vecchi si confondono, chiamami come vuoi." # voce: vecchio
    -> p06
```

### p09 — dialogo a turni (reciprocità) + indovinello del viandante
Trasformare p09 in un **gather con sticky choices** (riusa il pattern già esistente):

- Domande di Ernesto (topics): *dove va* (Nylph), *da dove viene* (Phiwen), *quante strade ha visto*.
- Domanda di Lesmidoom a Ernesto (reciprocità): **«Di chi sei figlio?»** → 3 risposte con
  micro-variante di tono; la risposta concreta/orgogliosa tende a `empatia`.
- **Indovinello del viandante** (prova, `# peso: scelta`, nessuna risposta giusta):
  «Se sei su una strada che non conosci e si divide in due, cosa fai?»
  - *quella più battuta* → (fiducia negli altri)
  - *quella verso il sole* → `+coraggio` (istinto)
  - *torno indietro e chiedo* → `+acume` (umiltà/riflessione)
  Chiusura comune: «Io ho usato tutti e tre i metodi. Ho sbagliato strada in tutti e tre i casi.»
  Imposta `scelta_strada` (seme riusabile a 13/16/20).

### p12 — risposta sul mostro affamato
Aggiungere l'incremento `coraggio` sulla risposta netta. Inserire la micro-variante di Lesmidoom
(story-writer) che non corregge ma si lascia intravedere:
- se `seed_mostro_affamato == "esitante"`: «Quello che hai detto — gridare prima di colpire —
  l'ho sentito dire anche da un generale.»
- se netto/difensivo: «Hai risposto come risponderei io, da giovane.»

### p13 — **slice prioritaria**: battuta su Errol + una domanda + chiusura visibile
Dopo la riga su Errol, dare a Ernesto **una sola** domanda; Lesmidoom risponde vero-ma-incompleto,
poi **si chiude con un gesto fisico** (si sistema la borsa, alza lo sguardo, accelera il passo):

```ink
* [Chiedi: perché era stanco?]
    "Perché alcune vittorie costano più della sconfitta che evitano. Un giorno capirai,
     e spero che ci metta molto tempo." # voce: vecchio
* [Chiedi: lo conosci, Errol?]
    Il vecchio non risponde subito. "Ho incontrato molte persone. Alcune restano."
    Pausa. "Errol è rimasto." # voce: vecchio
* [Non chiedere niente]
    Il vecchio aspetta un momento, come se la domanda stesse per arrivare. Quando non
    arriva, annuisce piano — non per approvazione, ma per qualcosa di più privato.
```

In tutti i casi, gesto di chiusura. Da quel punto, `parla lesmidoom` risponde «Non sembra voler
aggiungere altro» (coerenza parser ↔ personaggio).
Se `stat_acume >= 2` (`acume_vivo`), si sblocca la domanda extra *Com'era Errol da vicino* →
«Stanco. Come chi ha vinto e non sa ancora cosa farne.»

### p18 — coraggio
Aggiungere `+coraggio` su `Resta vicino`. Se `stat_coraggio >= 2`, riga diversa di Lesmidoom a p19.

### p16–p17, p19–p20 — **non toccare** la struttura
Funzionano già (Mirea silenziosa, segnali fisici). Si aggiunge solo la variante di battuta di
Lesmidoom a p19 se `coraggio` alto, e il ritorno della mano sulla borsa.

---

## 4. File coinvolti

- `src/story/prologo.ink` — nuove VAR, knot p05b, espansione p05/p09/p12/p13/p18.
- `src/game/sampleSceneContext.ts` — oggetto `BORSA`, descrizioni `esamina`, nuovi topics e
  `choiceCommands`/`verbResponses` per le scene dialogiche, flag-ponte nei topic gated.
- Nessuna modifica prevista a `terminalApp.ts`, `italianParser.ts`, `combat.ts`.

## 5. Impatto sui test (da aggiornare dopo l'approvazione)

Cambiare il flusso di p09/p13 tocca le suite esistenti:
- `src/story/prologo.curiosita.test.ts`, `src/terminalTopics.test.ts` (topics/curiosità)
- `src/story/prologo.quotidianoA.test.ts` (flusso bosco→mensa)
- `src/terminalApp.test.ts` (flusso generale)
Nuovi test da aggiungere: incrementi stat, soglie/flag-ponte, indovinello, gesto di chiusura p13.

## 6. Ordine di implementazione proposto

1. **Slice p13** (battuta Errol + domanda + chiusura) — massimo impatto drammatico, flag esistenti.
2. Sistema stat (VAR + incrementi sulle scelte esistenti) + effetti soglia.
3. Presentazione (borsa, `esamina`, p05b).
4. Dialogo a turni p09 + indovinello del viandante.
5. Aggiornamento/aggiunta test.

## 7. Domande aperte per la revisione

- Range stat 0–2 ok, o vuoi più granularità (0–3) con più occasioni di prova?
- L'indovinello del viandante va a p09 (in cammino) o a p13 (alla mensa, prima di Errol)?
- La borsa vuota: lasciarla pura suggestione nel prologo, o seminare già la battuta
  «finché non trovi a chi darle» (gated su empatia)?
