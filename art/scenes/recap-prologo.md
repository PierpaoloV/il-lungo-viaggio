# Scene — Recap di fine prologo (13 card)

Le immagini del recap di fine prologo: una per ogni variante di scelta del giocatore.
Ogni card del codice (`src/recap/recapCards.ts`) ha un **id** che è anche la chiave
dell'asset in `src/recap/recapAssets.ts` (`RECAP_ASSET_SRCS`).

- **Tipo:** scena
- **Formato:** 16:9 (tutte)
- **Registro cromatico:** QUOTIDIANO (card 1-8) · SOGNO (9-10) · MISTERIOSO (11-13)

### Come agganciare le immagini al gioco
Genera il file, salvalo in `art/scenes/` col nome indicato, poi aggiungi la riga
corrispondente in `RECAP_ASSET_SRCS` (chiave = id della card):

```ts
"panino-dato": new URL("../../art/scenes/recap-panino-dato.png", import.meta.url).href,
```

> ⚠️ **Coerenza dei soggetti.** Non esiste ancora un'ancora fissa per Ernesto
> bambino e per Lesmidoom. Usa i due blocchi-ancora qui sotto **incollandoli in
> ogni prompt** che li contiene, così i 13 fotogrammi sembrano la stessa mano e
> lo stesso mondo. Se generi prima un ritratto-ancora di ciascuno, ancora meglio.

---

## Ancora — Ernesto bambino
> Bambino di circa 10 anni, corporatura minuta, abiti semplici da villaggio
> medievale (tunica di lana grezza color terra, cintura di cuoio), capelli
> scuri scompigliati, espressione curiosa e sensibile. Alla cintura una **spada
> di legno** intagliata a mano, liscia dove la mano la stringe sempre. Inquadrature
> **a misura di bambino** (punto di vista basso, gli alberi e gli adulti grandi).

## Ancora — Lesmidoom (il vecchio)
> Anziano viandante, monaco-pellegrino, **tunica marrone** liscia e consunta,
> figura asciutta, mani nodose. Porta una **borsa di cuoio chiusa con un nodo
> doppio**. Niente di esplicitamente magico o minaccioso: la sua stranezza è
> solo nella compostezza, nello sguardo troppo fermo. Volto segnato ma quieto.

---

## Blocco di stile (base, da adattare nel registro per ogni card)

```
Stile: illustrazione fantasy pittorica e atmosferica (digital painting), impronta da mito/leggenda,
pennellate visibili, luce motivata, forte mood emotivo. No 3D/fotorealismo, no anime/cartoon, no pixel-art.
Registro cromatico: <vedi card>.
Composizione: luce naturale, chiaroscuro nelle scene epiche; coerente con le ancore dei soggetti.
Evita: testo/lettere nell'immagine, watermark, volti deformi, mani sbagliate, anacronismi, estetica cartoon/anime, dettaglio eccessivo.
Formato: 16:9.
```

---

# CARD 1 — `panino-dato`  ·  file: `recap-panino-dato.png`
**Registro:** QUOTIDIANO · *Didascalia in gioco: «Il panno è vuoto nella tua tasca. Pesa meno di quanto dovrebbe.»*

### Prompt
[incolla Ancora Ernesto bambino + Ancora Lesmidoom]
Sottobosco di fine pomeriggio, luce dorata che filtra tra gli alberi. Il **bambino**
porge **mezzo panino** avvolto in un panno al **vecchio in tunica marrone** seduto
contro il tronco più grosso, una caviglia piegata. Il gesto è semplice, naturale,
senza enfasi: due mani che si incontrano a metà. Il vecchio non recita gratitudine.
Atmosfera intima e calda, quotidiano sicuro prima che tutto cambi.

```
Registro cromatico: QUOTIDIANO caldo e dorato, luce di fine pomeriggio, saturazioni morbide.
```

# CARD 2 — `panino-tenuto`  ·  file: `recap-panino-tenuto.png`
**Registro:** QUOTIDIANO · *«Il panino è ancora lì. Non hai più voglia di finirlo.»*

### Prompt
[Ancora Ernesto bambino + Ancora Lesmidoom]
Stesso sottobosco dorato. Il **bambino** tiene la mano chiusa sulla tasca della
tunica, il panino non esce. Il **vecchio in tunica marrone** è sullo sfondo, di
**tre quarti o di spalle**, non lo guarda. Distanza sottile tra i due. Niente
giudizio nella luce: la scena resta calda, ma c'è un piccolo vuoto al centro,
qualcosa che non è successo.

```
Registro cromatico: QUOTIDIANO caldo e dorato, ma con un piccolo vuoto compositivo al centro.
```

# CARD 3 — `cammino-insieme`  ·  file: `recap-cammino-insieme.png`
**Registro:** QUOTIDIANO · *«Rallenti senza accorgertene.»*

### Prompt
[Ancora Ernesto bambino + Ancora Lesmidoom]
Sentiero che esce dal bosco verso il villaggio di Mezclar, luce dorata bassa. Il
**bambino** e il **vecchio in tunica marrone** camminano fianco a fianco, passo
lento, in sintonia silenziosa. Il bambino regola il passo su quello del vecchio.
Alberi grandi attorno (punto di vista basso). Senso di compagnia quieta, due
sagome calde controluce.

```
Registro cromatico: QUOTIDIANO caldo e dorato, controluce morbido di fine pomeriggio.
```

# CARD 4 — `cammino-rimorso`  ·  file: `recap-cammino-rimorso.png`
**Registro:** QUOTIDIANO che vira al MISTERIOSO · *«Torni a cercarlo. Il posto dove era seduto è vuoto.»*

### Prompt
[Ancora Ernesto bambino]
Il punto del bosco dove prima sedeva il vecchio: ora **vuoto**. L'erba e le foglie
ancora schiacciate nella forma di chi c'era, contro il tronco più grosso. Il
**bambino** è piccolo nell'inquadratura, fermo, guarda il posto vuoto. La luce
dorata si è abbassata, le ombre più lunghe. Assenza, non paura: qualcosa è andato
via mentre non guardavi.

```
Registro cromatico: QUOTIDIANO che si raffredda verso il MISTERIOSO, ombre lunghe, un'assenza al centro.
```

# CARD 5 — `cammino-solo`  ·  file: `recap-cammino-solo.png`
**Registro:** QUOTIDIANO · *«I piedi decidono per te, verso il conosciuto.»*

### Prompt
[Ancora Ernesto bambino]
Margine del bosco che si apre sul villaggio. Il **bambino**, **da solo**, ha il
braccio teso a indicare la strada verso Mezclar, già voltato verso casa. Il bosco
alle spalle resta in ombra. Il villaggio davanti è caldo e invitante. Movimento
verso il conosciuto, leggerezza che nasconde una piccola fuga.

```
Registro cromatico: QUOTIDIANO caldo e dorato verso il villaggio, bosco in ombra alle spalle.
```

# CARD 6 — `mostro-netto`  ·  file: `recap-mostro-netto.png`
**Registro:** QUOTIDIANO · *(card MUTA: nessuna didascalia in gioco)*

### Prompt
[Ancora Ernesto bambino]
Primissimo piano della **mano del bambino che stringe con sicurezza la spada di
legno** alla cintura. Nocche salde, presa decisa, nessuna esitazione. Sullo sfondo
sfocato il profilo del vecchio. La semplicità sicura di un bambino che non dubita.
Niente testo, immagine e silenzio: lascia parlare il gesto.

```
Registro cromatico: QUOTIDIANO caldo, fuoco netto sulla mano e sulla spada di legno.
```

# CARD 7 — `mostro-difensivo`  ·  file: `recap-mostro-difensivo.png`
**Registro:** QUOTIDIANO · *«Se mi viene vicino, mi difendo.»*

### Prompt
[Ancora Ernesto bambino + Ancora Lesmidoom]
Il **bambino** con la **mano appoggiata sulla spada di legno**, postura di attesa
prudente, non di attacco: pronto ma non aggressivo. Il **vecchio in tunica marrone**
è di profilo, ascolta, lo sguardo lontano davanti a sé. Equilibrio sospeso tra i
due. Luce dorata calma.

```
Registro cromatico: QUOTIDIANO caldo e dorato, atmosfera sospesa e calma.
```

# CARD 8 — `mostro-esitante`  ·  file: `recap-mostro-esitante.png`
**Registro:** QUOTIDIANO · *«Prima gli grido di andare via.»*

### Prompt
[Ancora Ernesto bambino + Ancora Lesmidoom]
Il **bambino** con la bocca aperta nell'atto di **gridare** qualcosa in avanti
(un avvertimento), la spada di legno ancora alla cintura, **non** impugnata. Il
**vecchio in tunica marrone** di profilo ascolta senza giudicare. Gesto istintivo,
infantile, esitante: difendere con la voce prima che con le mani.

```
Registro cromatico: QUOTIDIANO caldo e dorato, luce ferma sul gesto del grido.
```

# CARD 9 — `sogno-coordinato`  ·  file: `recap-sogno-coordinato.png`
**Registro:** SOGNO · *«Hai aspettato. Siete andati insieme.»*

### Prompt
[Ancora Errol → vedi `art/characters/errol.md` se compare il fabbro/scorta]
Campo di battaglia di un mondo fantasy medievale, **fumo e ferro**. Un gruppo di
soldati e un fabbro robusto **stretti insieme** in formazione, spalla a spalla,
avanzano coordinati nella foschia. Senso di forza condivisa, non di eroismo
solitario. Cielo plumbeo. Tutto freddo e desaturato **tranne** un unico accento
rosso-sangue (uno stendardo, una ferita, un riflesso).

```
Registro cromatico: SOGNO freddo desaturato grigio-bluastro, con UN unico accento rosso-sangue.
```

# CARD 10 — `sogno-solo`  ·  file: `recap-sogno-solo.png`
**Registro:** SOGNO · *«Sei corso avanti. Da solo.»*

### Prompt
Campo di battaglia di un mondo fantasy medievale nel fango e nel fumo. Un soldato
adulto (Ernesto-adulto) **di spalle, parziale, in controluce** — **il volto NON è
mai visibile** — **corre avanti da solo**, la schiena rivolta ai compagni rimasti
indietro. Armatura di metallo pregiato sporca di sangue. Solitudine impulsiva, lo
slancio che è già diventato costo. Cielo plumbeo, freddo e desaturato **tranne**
schizzi di rosso-sangue.

```
Registro cromatico: SOGNO freddo desaturato, accento rosso-sangue.
Composizione: protagonista adulto di spalle, volto NON visibile (protegge il mistero del viaggio nel tempo).
```

# CARD 11 — `segno-osserva`  ·  file: `recap-segno-osserva.png`
**Registro:** MISTERIOSO · *«Più lo guardi, più resti a guardarlo.»*

### Prompt
[Ancora Ernesto bambino]
Inquadratura stretta sul **braccio sinistro del bambino con la manica alzata**.
Sulla pelle un **segno piccolo e vago**, una forma che **non si lascia nominare**
— non una ferita, non un livido. Luce calma e ordinaria della stanza al mattino,
**tranne** un solo elemento che non torna: un bagliore o una tinta del segno fuori
palette. La mano è aperta, non difensiva: il bambino lo guarda e resta a guardarlo.

```
Registro cromatico: MISTERIOSO smorzato, luce mattutina ordinaria, UN solo elemento fuori palette sul segno.
```

# CARD 12 — `segno-nasconde`  ·  file: `recap-segno-nasconde.png`
**Registro:** MISTERIOSO · *«Tiri giù la manica. Come se non vederlo bastasse.»*

### Prompt
[Ancora Ernesto bambino]
Inquadratura stretta sul **braccio sinistro del bambino**: la **manica che scende
a coprire** il segno, intravisto un istante prima di sparire sotto la stoffa. Gesto
rapido, quasi di rifiuto. Stessa luce mattutina smorzata, l'elemento fuori palette
del segno appena visibile mentre viene nascosto. Inquietudine trattenuta.

```
Registro cromatico: MISTERIOSO smorzato, il segno (elemento fuori palette) che scompare sotto la manica.
```

# CARD 13 — `segno-minimizza`  ·  file: `recap-segno-minimizza.png`
**Registro:** MISTERIOSO · *«Decidi che è soltanto un graffio. Lo decidi con troppa cura per crederci davvero.»*

### Prompt
[Ancora Ernesto bambino]
Il **bambino** con la **manica già abbassata**, lo sguardo voltato **dall'altra
parte**, verso la finestra. Il braccio è coperto, il segno non si vede più, ma la
posa è troppo composta per essere sincera: la negazione visibile nella rigidità.
Luce mattutina ordinaria della stanza, un solo dettaglio freddo fuori palette a
ricordare che qualcosa resta.

```
Registro cromatico: MISTERIOSO smorzato, luce mattutina; un dettaglio freddo fuori palette resta nell'aria.
```

---

### Note
- **13 immagini** = tutte le varianti delle 5 card. Un giocatore ne vede al massimo 5 (una per scelta).
- Card 6 (`mostro-netto`) è **muta** di proposito: nessuna didascalia in gioco, l'immagine deve reggere il silenzio.
- Card 10 (`sogno-solo`): il **volto dell'adulto non si vede mai** — vincolo invariabile (vedi `sogno-consegna-spada.md`).
- Coerenza prioritaria: stessa resa di Ernesto bambino e di Lesmidoom in tutte le card. Valuta di fissare prima due ritratti-ancora in `art/characters/`.
- Le card del segno (11-13) condividono inquadratura e luce: cambiano solo il gesto e lo sguardo. Generale dalla stessa seed se possibile, per uniformità.
