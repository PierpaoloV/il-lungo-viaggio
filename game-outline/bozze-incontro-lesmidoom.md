# Bozze prosa — Incontro Ernesto / Lesmidoom

Copione **approvato** della scena d'incontro nel bosco (inizio + centro + finale).
Vedi `design-incontro-lesmidoom.md` per il piano strutturale e il sistema statistiche.

Convenzioni:
- `[scelta]` = opzione mostrata al giocatore.
- `→ tratto` = incremento statistica diegetica invisibile (empatia / coraggio / acume; range 0-3, soglia effetti ≥2).
- `{flag: …}` = variante condizionale.
- *[connettivo]* = righe di raccordo da rifinire in fase ink.

---

## STRUTTURA GENERALE

```
PARTE A — APERTURA (sempre)
  Beat 1  La caduta (aiuto NON rifiutabile)   → SEME PIANTATO
  Beat 2  Panino (scelta) + presentazione      → bag tic stabilito
  Beat 3  Scelta: accompagnare o no (paura)

PARTE B — PERCORSO IN CAMMINO (se accompagni)
  "Non hai paura dei boschi" → seme (Phiwen/Nylph) → D1 → D2 → p10

PARTE C — PERCORSO RIMORSO/MENSA (se non accompagni)
  Rimorso (p08) → riunione mensa → seme (al tavolo) → D1 → D2 → p10

PARTE D — CONFLUENZA (sempre)
  p10 (Bella arma…) → p11 → p12 (mostro affamato) → p13 (Errol, FISSATA)
```

Il contenuto di D1/D2 è IDENTICO nei due percorsi: cambiano solo le righe-cornice
("in cammino" vs "al tavolo"). Punto di confluenza unico: p10.

---

# PARTE A — APERTURA (sempre)

## Beat 1 — La caduta  *(sostituisce l'urto di p05; aiuto non rifiutabile → pianta il seme)*

> Cammini con gli occhi bassi per non perdere la pista. Un passo, un altro, una radice da saltare.
>
> Poi lo vedi.
>
> Un vecchio in tunica marrone è seduto contro il tronco più grosso, una gamba tesa davanti come un ramo caduto. La caviglia è piegata su una radice che spunta dalla terra. Non ha urlato. Non ha chiamato nessuno. Aspetta, con la testa bassa e le mani sulle ginocchia, che il dolore faccia quello che deve fare.
>
> Ti fermi. Non decidi di fermarti: accade.
>
> Il vecchio ti sente, alza gli occhi. La sua faccia è quella di qualcuno che ha camminato troppo e dormito poco.
>
> «Non ti spaventare,» dice. «È la radice che non avevo visto.»

**[Avvicinati subito]** → empatia
> Ti metti in ginocchio accanto alla gamba tesa senza pensarci. Il vecchio ti guarda come se il gesto lo avesse sorpreso, ma non arretra.
> «Sai cosa stai guardando?» chiede.
> «No,» dici. «Ma stai qua.»

**[Chiedi se sta bene]** → acume
> «Stai bene?» La domanda è piccola, un po' inutile data la posizione, e lo sai anche tu mentre la dici.
> Il vecchio ti guarda. «Abbastanza. La caviglia regge. Il problema è rimettersi in piedi.»
> Ti inginocchi accanto a lui.

**[Guarda la caviglia]** → acume
> Guardi la caviglia senza sapere bene cosa cercare. È gonfia ma non esce sangue, quindi forse non è rotta.
> «Neanche a me sembra,» dice il vecchio. «Ma aiutarmi a rialzarmi non sarebbe una cattiva idea.»

**Gather (sempre):**
> Lo aiuti a rimettersi in piedi. Lui pesa meno di quanto pensi. O forse hai solo tirato più forte del necessario, perché vi trovate entrambi un po' più scomposti di quanto vorreste.
> Si regge. Fa qualche passo cauto. La caviglia tiene.
> «Grazie,» dice. Non lo dice come se fosse dovuto. Lo dice come chi è abituato a bastare a se stesso e trova strano doverlo a qualcun altro.

> Nota: il SEME è piantato qui, dal primo gesto involontario. Da questo punto Lesmidoom
> ha scelto Ernesto; tutto il resto ne colora solo la texture.

---

## Beat 2 — Panino + presentazione  *(il bag tic si stabilisce qui)*

> Il vecchio sistema la tunica con due mani, poi porta una mano alla borsa di cuoio legata alla cintura con un nodo doppio, strano. La controlla con le dita — una volta, veloce — come chi verifica che una cosa sia ancora al suo posto.
>
> Ti viene da chiedere cosa ci sia dentro. Non lo fai.
>
> Nella tua tasca c'è il mezzo panino nel panno. Lo senti attraverso il tessuto. Hai fame. Lui sembra averne di più: è il tipo di stanchezza che include anche il mangiare, o non mangiare.

**[Offri il panino]** `{panino_dato = true}` → empatia
> Allunghi il panno senza spiegare niente. Non sei sicuro di cosa ti abbia mosso: forse il fatto che lui non lo ha chiesto.
> Il vecchio guarda la tua mano. Poi il panino. Poi te.
> «Non ho niente da darti in cambio,» dice.
> «Non ti ho chiesto niente,» dici tu.
> Accetta. Mangia piano, come chi non spreca niente.

**[Tienilo]** `{panino_dato = false}`
> Il mezzo panino resta dov'è. Il vecchio non lo guarda una seconda volta.

**Presentazione (sempre):**
> «Come ti chiami?» chiede il vecchio.
> «Ernesto.»
> Annuisce, lento. «Lesmidoom. Ma i vecchi si confondono con i nomi: chiamami come vuoi.»
> Lesmidoom. Il nome è troppo grande per questo bosco. Non sai dove metterlo.
> Lui abbassa lo sguardo sulla spada di legno alla tua cintura. Non ride.
> «Di dove sei?»
> «Di Mezclar. Il paese qui vicino.»
> «Lo so dov'è. Ci vengo.» Una pausa. «O ci provo.»

> Nota: il nome "Lesmidoom" cade di sfuggita → déjà-vu prima del reveal ufficiale a p16.

---

## Beat 3 — Scelta: accompagnare o no  *(l'accompagnamento NON dà stat: sceglie solo il percorso)*

> *[connettivo]* «La mensa di tua madre dà da sedere ai viandanti, vero?» dice. «Con questa caviglia, però, non so se trovo la strada da solo.»
> Il sentiero verso casa lo conosci a memoria. Per lui no.

**[Accompagnalo alla mensa]** `{vecchio_accompagnato = true}` → **PARTE B (in cammino)**
> *[connettivo]* Gli fai cenno di seguirti verso i campi. Procede piano, ma ti tiene il passo.

**[Lascialo andare da solo]** `{vecchio_accompagnato = false}` → **PARTE C (rimorso/mensa)**
> *[connettivo]* Gli indichi la direzione di Mezclar e ti volti verso casa. C'è qualcosa, in lui, che non sai nominare — e i piedi decidono per te, verso il conosciuto.

---

# PARTE B — PERCORSO IN CAMMINO  *(se `vecchio_accompagnato = true`)*

## "Non hai paura dei boschi"

> Il sentiero verso Mezclar lo conosci meglio di chiunque altro. Hai la sensazione che lui no, anche se non glielo chiedi.
> Camminate. Il vecchio mette il piede con attenzione, prima il tallone, poi le dita, come chi non si fida del terreno. Tu rallenti senza accorgertene.
> A un certo punto lui si ferma, guarda il cielo attraverso i rami, e dice una cosa che non è una domanda ma suona come se lo fosse:
> «Non hai paura dei boschi.»
> Non è un complimento. È un'osservazione, come si fa con le cose che meritano di essere notate.

**[«No. Li conosco.»]**
> Il vecchio ti guarda di lato. «La paura non dipende da quanto conosci un posto.»
> Non capisci bene cosa vuol dire. Camminate.

**[«A volte sì.»]** → coraggio
> «A volte sì,» dici. «Ma poi passo lo stesso.»
> Il vecchio non dice niente per un momento. Poi: «Quella è la definizione corretta di coraggio. Non l'assenza di paura.»

**[Stringi le spalle]**
> Stringi le spalle. Non è una risposta e lo sai, ma è quello che ti viene.
> Il vecchio annuisce, come se lo capisse.

## Seme (in cammino)

> Camminate un altro tratto in silenzio.
> Poi il vecchio dice: «Phiwen, se ti interessa saperlo. Vengo da Phiwen. E sto andando a Nylph.»
> Nylph. Il nome di una città lontana che hai sentito citare solo quando gli adulti parlano di commercio e di strade lunghe.
> «È lontana?»
> «Abbastanza da far male ai piedi.»
> Camminate ancora. Qualcosa nell'aria è cambiato, ma non sai nominarlo.

→ prosegue con **D1 / D2 (cornice "in cammino")**, vedi PARTE SHARED.

---

# PARTE C — PERCORSO RIMORSO / MENSA  *(se `vecchio_accompagnato = false`)*

## Rimorso  *(riscrittura di p08; fisico, pre-verbale)*

> Torni verso casa da solo.
> All'inizio sembra giusto. Hai fatto quello che potevi: gli hai indicato la strada, e lui sa dove andare. O quasi. {panino_dato: E poi gli hai anche dato il panino, quindi.}
> Però il bosco non si riduce come dovrebbe. I tronchi sembrano più larghi, le ombre più profonde, e il sentiero che conosci a memoria fa una curva che giuri non c'era prima.
> Ti torna in testa la sua voce. *Mi sono già perso tre volte.*
> Non era una lamentela. Lo capisci adesso, a qualche passo di distanza. Era solo un fatto.
> Ti fermi. Fai mezzo giro. Poi ti dici che sei stupido a tornare indietro per un vecchio che ha le gambe e sa parlare. Ti dici che la mensa è là, che lui troverà la strada, che hai cose da fare. Non sai bene quali.
> Torni indietro lo stesso.
> Il punto dove l'hai lasciato è vuoto. Le foglie schiacciate dai suoi piedi si mescolano con le tue impronte, con le zampette dello scoiattolo, con qualcos'altro che non riesci a leggere. Cerchi un po', senza ammettere a te stesso che stai cercando.
> Niente.
> {panino_dato: Hai ancora il panno vuoto in tasca. Ti sembra più leggero del necessario.}
> {not panino_dato: Il mezzo panino è ancora in tasca. Non hai più voglia di finirlo.}
> Non ti senti in colpa — non sai ancora bene cos'è la colpa. Senti solo qualcosa di caldo alle orecchie e qualcosa di pesante sotto lo sterno, come quando corri troppo forte e il respiro non riesce a stare dietro.

## Riunione alla mensa

> La mensa ha l'odore che ha sempre: zuppa, legno, il sapone che tua madre mette nei panni del tavolo.
> Lui è già seduto.
> Non dove si siedono i passanti di solito — nell'angolo vicino alla porta, quello che non dà le spalle a niente. Le mani appoggiate al bordo del tavolo, la borsa posata accanto come un animale tranquillo. Ti guarda arrivare senza sorprendersi.
> Non capisci come ci sia arrivato prima. Non gliene chiedi.
> Ti avvicini. Non sai perché. Un momento fa eri in mezzo al bosco a cercare le sue tracce, adesso sei qui, a due passi da lui, e la cosa più onesta da fare sembra sedersi.
> Ti siedi.

## Seme (al tavolo)  *(tic della borsa RIMOSSO per tenerlo raro)*

> Non parla subito. Guarda la mensa come chi guarda un posto buono senza volerlo trattenere.
> Poi dice, come se la cosa non richiedesse un'introduzione: «Vengo da lontano. Da Phiwen. E sto andando a Nylph, se le gambe reggono ancora qualche giorno.»
> Non te l'ha chiesto nessuno.
> Tu non sai cos'è Phiwen. Nylph la conosci di nome — tua madre la nomina quando qualcuno arriva da fuori. È lontana abbastanza da essere quasi un posto immaginario.

→ prosegue con **D1 / D2 (cornice "al tavolo")**, vedi PARTE SHARED.

---

# D1 / D2 — contenuto condiviso (due cornici)

> Lo scambio è in tre tempi: D1 (cosa fai) → Lesmidoom riprende una parola → D2 (cosa
> vuoi diventare). L'incremento di tratto è SOLO su D2 (D1 è caratterizzazione/legame).

## D1 — cornice

- **In cammino:** «Cosa fai, tu, quando non segui gli scoiattoli?» — *La domanda è strana. Non è una domanda da adulti. Gli adulti chiedono come ti chiami, quanti anni hai, se vai a scuola. Questa sembra quasi che si aspetti una risposta vera.*
- **Al tavolo:** *Rimane qualche istante in silenzio. Poi ti guarda come si guarda una persona — non come si guarda un bambino — e chiede:* «Cosa fai, di solito, in un posto come questo?»

## D1 — opzioni (contenuto condiviso)

**[«Combatto i mostri.»]**
> «Combatto i mostri,» dici. Poi, per essere preciso: «O mi esercito. Per quando arrivano davvero.»
> Il vecchio ascolta. Non ride.
> «Mostri,» ripete, come se stesse mettendo la parola al posto giusto in una frase che sta costruendo da sola.

**[«Guardo le cose. E penso.»]**
> «Guardo le cose,» dici. «Le tracce, gli animali, come si muovono. E penso a perché fanno quello che fanno.»
> Fai una pausa. «Mia mamma dice che faccio troppe domande. Il maestro anche.»
> Il vecchio annuisce piano, come chi riceve una notizia che si aspettava.
> «Capire il perché,» dice. Solo quello.

**[«Aiuto mia mamma alla mensa.»]**
> «Aiuto mia mamma alla mensa,» dici. «Porto ciotole, sparecchio. A volte ascolto le storie di chi arriva.»
> Ti viene in mente la faccia di certi viandanti quando mangiano davvero, con entrambe le mani sulla ciotola.
> «Le storie, soprattutto,» aggiungi.
> Il vecchio ti guarda un momento in più del solito.
> «Ascolti le persone,» dice. Non è una domanda.

## Rilancio → D2 — cornice

- **In cammino:** *Poi il vecchio alza gli occhi verso il sentiero.* «E da grande?» *dice.* «Quando non devi più seguire gli scoiattoli perché hai già deciso dove andare — cosa fai?» *Non lo dice come gli adulti che chiedono cosa vuoi fare da grande e nel frattempo pensano già ad altro. Lo dice come chi ha ancora voglia di sentire la risposta.*
- **Al tavolo:** *Il rumore della mensa vi riempie lo spazio tra le parole. Il vecchio lascia che passi, come chi non ha fretta di niente. Poi posa una mano sul tavolo, piatta, ferma.* «E tu, cosa vuoi diventare?»

## D2 — opzioni (contenuto condiviso)

**[«Voglio diventare un eroe che sconfigge i mostri.»]** → coraggio
> «Voglio diventare un eroe,» dici. «Uno che sconfigge i mostri. Sul serio, non con la spada di legno.»
> Il vecchio cammina qualche passo in silenzio. *(al tavolo: resta in silenzio un momento.)*
> «Un eroe,» dice alla fine. «Ho incontrato alcuni. Quasi nessuno pensava di esserlo mentre ci era dentro.»
> Non sembra una critica. Sembra una cosa che ha visto.
> «Ma ci vuole qualcosa, per sconfiggere i mostri,» aggiunge. «Bisogna riconoscerli.»

**[«Voglio sapere tutto del mondo.»]** → acume
> «Voglio sapere tutto,» dici. «Come funzionano le cose. Perché succedono. Tutto.»
> Il vecchio sorride — non di superiorità, ma di qualcosa che assomiglia al riconoscimento.
> «Tutto è tanto,» dice. «Ho passato anni a cercare di capire una sola cosa, e alla fine ho capito che mi mancavano le domande giuste.»
> Ti guarda. «Cosa non sai ancora, tu, che ti piacerebbe sapere?»
> *(Ernesto risponde in flusso, non è una scelta — es. "come sono fatti i posti lontani"; il vecchio non commenta e abbassa lo sguardo sulla spada.)*

**[«Voglio aiutare le persone, come mia mamma.»]** → empatia
> «Voglio aiutare le persone,» dici. «Come fa mia mamma. Lei li vede quando entrano — se hanno freddo, se hanno camminato troppo, se stanno fingendo che vada bene. E poi gli dà quello di cui hanno bisogno.»
> Ti fermi un istante. «Non sempre è la zuppa.»
> Il vecchio non dice niente per qualche passo.
> «Tua madre sa vedere le persone,» dice alla fine. «È raro.»
> Una pausa. «Tu, le sai vedere?»

## Raccordo → p10

- **In cammino:** *Qualunque sia stata la risposta, il vecchio non insiste. Non tira le somme, non valuta. Camminate ancora un po'. Poi lui abbassa gli occhi.* → p10
- **Al tavolo:** *Il vecchio abbassa lo sguardo. La spada di legno è appoggiata sul bordo del tavolo, o forse è ancora alla tua cintura — non ci pensi, la porti ovunque. Lui la guarda un momento. Poi dice:* → p10

---

# PARTE D — CONFLUENZA (sempre)

## p10 / p11 / p12 — invariati

> p10: «Bella arma, giovane Ernesto. Anche se è di legno, la porti come una cosa seria. A cosa serve?»
> p11: «Serve a combattere i mostri.» → p12: «E se il mostro avesse fame?» (testi esistenti, nessuna modifica)

## p13 — slice Errol (FISSATA)

Gesto di chiusura ricorrente di Lesmidoom = **mano alla borsa + passo che si allunga**.
Aggancio: Lesmidoom ha appena detto «…spesso saltano il pezzo in cui era solo un uomo
stanco, con troppa guerra intorno.» Errol lo introduce SEMPRE Lesmidoom (mai Ernesto).

### A — «Perché era stanco?»
> Glielo chiedi prima di decidere se fosse una domanda furba o no.
> Il vecchio si ferma un momento. Non per trovare le parole — le parole le ha già. Per scegliere quali dare.
> «Perché alcune vittorie costano più della sconfitta che evitano.»
> Tu aspetti un secondo. La frase è bella ma non la capisci del tutto, e quella parte che non capisci ti preme come un nodo.
> «Ma in che senso? Cosa pesava?»
> Il vecchio non risponde. Porta la mano alla borsa, la sistema con due dita — quella cura veloce di chi controlla qualcosa senza volerlo mostrare — e nel farlo allunga il passo di mezzo punto, tanto che quasi non lo noti. Ma lo noti.
> Camminate avanti. L'argomento non c'è più, o almeno non è più suo. Tu hai ancora la domanda in bocca, ma non sai più bene dove metterla.

### B — «Lo conosci, Errol?»
> Il vecchio non risponde subito. Lascia che i vostri passi riempiano il silenzio per qualche secondo.
> «Ho incontrato molta gente nel corso degli anni. Alcune persone restano.»
> Fa una pausa. Poi, quasi per sé: «Errol è rimasto.»
> Non aggiunge altro. Alza lo sguardo verso il sentiero davanti, e con quel gesto porta la mano alla borsa — quasi senza pensarci, due dita che sistemano la cinghia — e il passo si fa appena più lungo.
> Non sai cosa ha messo via. Ma sai che è messo via.

### C — Non chiedere niente
> Tu non dici niente. Forse aspetti che il racconto continui da solo.
> Il vecchio aspetta anche lui, un momento — non per imbarazzo, ma come chi misura se una porta è aperta. Poi annuisce, lento, per qualcosa che non ti riguarda.
> Sistema la borsa alla cintura con due dita e allunga il passo di mezzo punto. Insieme. Come se fossero la stessa cosa.
> Camminate avanti in silenzio, e il nome di Errol resta tra voi come una cosa appesa senza chiodo.

### Extra (solo se `stat_acume >= 2`) — «Com'era, Errol, da vicino?»
> Il vecchio ti guarda di lato — non sorpreso dalla domanda, ma quasi sorpreso da chi l'ha fatta.
> «Stanco,» dice. «Come chi ha vinto e non sa ancora cosa farne.»
> Porta la mano alla borsa, la sistema. Allunga il passo.
> Fine.

---

# MAPPA STATISTICHE (riepilogo)

| Punto | Scelta | Tratto |
|---|---|---|
| Beat 1 | Avvicinati subito | empatia |
| Beat 1 | Chiedi se sta bene / Guarda la caviglia | acume |
| Beat 2 | Offri il panino | empatia |
| PARTE B | «A volte sì, ma passo lo stesso» (solo in cammino) | coraggio |
| D2 | «un eroe che sconfigge i mostri» | coraggio |
| D2 | «sapere tutto del mondo» | acume |
| D2 | «aiutare le persone come mia mamma» | empatia |
| p04 (piano) | esamina/segui le tracce | acume |
| p12 | «Lo uccido. È un mostro.» | coraggio |
| p18 (piano) | «Resta vicino» | coraggio |

Asimmetria nota: «Non hai paura dei boschi» (coraggio) esiste solo nel percorso in cammino;
chi non accompagna ha un'occasione di coraggio in meno. Accettabile con range 0-3 e soglia ≥2.

---

# NOTE PER L'IMPLEMENTAZIONE INK

- Nuove VAR: `stat_empatia`, `stat_coraggio`, `stat_acume` (0-3); flag-ponte `acume_vivo`
  (`{ stat_acume >= 2: ~ acume_vivo = true }`) per gatare la domanda extra di p13.
- Mantenere: `panino_dato`, `vecchio_accompagnato`. RIMUOVERE i percorsi che dipendevano dal
  rifiuto di aiutare (l'aiuto ora è non rifiutabile); il rimorso (p08) ora si raggiunge dal
  ramo `vecchio_accompagnato = false` (con la variante `{panino_dato}`).
- D1/D2: scrivere il contenuto UNA volta, due cornici (in cammino / al tavolo) via condizionale
  `{ vecchio_accompagnato: … - else: … }`, come già fa p09 oggi.
- Tag: `# voce: lesmidoom` sui dialoghi del vecchio; `# peso: scelta` su D2 e sui bivi che
  contano; valutare `# input: richiesto` dove serve.
- Le righe *[connettivo]* del Beat 3 sono raccordi miei: rifinibili in fase ink.
- Test impattati: prologo.curiosita, terminalTopics, prologo.quotidianoA, terminalApp (flusso).
