# STYLE — Art direction globale

Lo standard visivo di *Il Lungo Viaggio*. Tutte le immagini devono rispettarlo. Il **blocco di stile** in fondo va appeso a ogni prompt.

> Decisione-master: lo **stile di resa** (§1) è l'ancora di tutto. **Scelta provvisoria per la v1: Stile 1 — pittorico.** Da rivedere col team prima di generare in massa; le alternative valutate (coi prompt di test) sono in [STYLE-ALTERNATIVES.md](./STYLE-ALTERNATIVES.md).

## 1. Stile di resa *(scelto per v1: pittorico — provvisorio)*

**Illustrazione fantasy pittorica e atmosferica** (digital painting), impronta da **mito/leggenda**: pennellate visibili, luce motivata, forte mood emotivo. **No** look 3D/fotorealistico, **no** estetica anime/cartoon, **no** pixel-art.

Scelta **provvisoria** per la v1 (lo sviluppatore è da solo); decisione finale rimandata al momento in cui ci sarà il team. Le **due alternative** valutate e tenute in caldo — *pixel-art* (più "videogioco retrò/terminale") e *inchiostro/xilografia* (più "leggenda antica") — sono documentate coi rispettivi prompt di test in [STYLE-ALTERNATIVES.md](./STYLE-ALTERNATIVES.md).

## 2. Sistema cromatico per registro

Il colore racconta l'arco intimo → epico → misterioso:

- **Quotidiano (Mezclar, Ernesto a 10 anni):** caldo, terroso, luce dorata di fine pomeriggio; saturazioni morbide → intimità e sicurezza.
- **Sogno / battaglia:** freddo, desaturato, grigio-bluastro, con **un unico accento rosso-sangue** → epica cupa, rottura tonale.
- **Misterioso (il segno, Lesmidoom):** toni smorzati con **un solo elemento che "non torna"** (un bagliore, un colore fuori palette) → inquietudine sottile.

## 3. Luce e composizione

- Luce **naturale e motivata**; chiaroscuro deciso nelle scene epiche.
- **Volto dell'Ernesto adulto nel sogno: mai mostrato chiaramente** (di spalle, parziale, in controluce) — è "un corpo che non è il tuo", il mistero va protetto.
- Inquadrature del quotidiano **a misura di bambino**; inquadrature epiche ampie e drammatiche.

## 4. Formati

- Scene (affiancate al terminale): **16:9**.
- Ritratti/schede personaggio: **3:4** (o 1:1 per icone).
- Mappe: **1:1** o **4:3**.

## 5. Da evitare sempre (negative)

Testo o lettere nell'immagine, watermark/firme, volti deformi o mani sbagliate, anacronismi (tecnologia moderna, plastica, loghi), estetica cartoon/anime, eccesso di dettaglio che impedisce la coerenza tra immagini.

## 6. Blocco di stile da appendere a OGNI prompt

> Copia-incolla questo blocco in coda a ogni prompt, adattando solo il **registro cromatico** alla scena.

```
Stile: illustrazione fantasy pittorica e atmosferica (digital painting), impronta da mito/leggenda,
pennellate visibili, luce motivata, forte mood emotivo. No 3D/fotorealismo, no anime/cartoon, no pixel-art.
Registro cromatico: <QUOTIDIANO caldo e dorato | SOGNO freddo desaturato con accento rosso-sangue | MISTERIOSO smorzato con un elemento fuori palette>.
Composizione: luce naturale, chiaroscuro nelle scene epiche; coerente con le ancore dei soggetti fornite sopra.
Evita: testo/lettere nell'immagine, watermark, volti deformi, mani sbagliate, anacronismi, estetica cartoon/anime, dettaglio eccessivo.
Formato: <16:9 scene | 3:4 ritratti | 1:1 o 4:3 mappe>.
```
