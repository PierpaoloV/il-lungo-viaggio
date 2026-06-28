VAR leggenda_ascoltata = false
VAR bosco_tracce_osservate = false
// Statistiche diegetiche invisibili (0-3): seminate dai gesti dell'incontro.
VAR stat_empatia = 0
VAR stat_coraggio = 0
VAR stat_acume = 0
// Flag-ponte: il sistema topics confronta solo per uguaglianza, quindi una soglia
// (stat_acume >= 2) viene "tradotta" in un booleano da gatare scelte e argomenti.
VAR acume_vivo = false
VAR panino_dato = false
VAR vecchio_accompagnato = false
VAR aiuto_vecchio = ""
VAR rimorso_tornato = false
VAR seed_curiosita_vecchio = "bassa"
VAR seed_mostro_affamato = ""
VAR dialogo_errol_ricevuto = false
VAR vecchio_ha_nominato_spada = false
VAR lesmidoom_rivelato = false
VAR fai_buon_viaggio_sentito = false
VAR orco_allarme = false
VAR colpo_tutorial = "nessuno"
VAR sogno_rianimato = false
VAR sogno_primo_scontro = "saltato"
VAR rinforzi_post_orco = "non_applicabile"
VAR sogno_bivio = ""
VAR sogno_perdite = ""
VAR medaglione_errol_preso = false
VAR spada_lungo_viaggio_recuperata = false
VAR spada_consegnata_errol = false
VAR segno_notato = false
VAR seed_curiosita_segno = ""
VAR prologo_completato = false

-> p00

=== p00 ===
Si racconta che Vaargal sia nato quando il mondo era ancora senza strade e senza nomi. # scene: p00 # mode: normal # blocco: leggenda
Allora vennero i popoli: uomini, nani, elfi, halfling e orchi. # blocco: leggenda
Ognuno ricevette un posto, una lingua, un modo di guardare il cielo. # blocco: leggenda
Per molto tempo il mondo resto' intero. # blocco: leggenda
Poi, come succede nelle storie, qualcuno dimentico' che un posto dato non si strappa via senza ferire anche la terra. # blocco: leggenda

Mirea abbassa la voce sull'ultima frase.
Tu tieni gli occhi aperti solo per farle vedere che non hai sonno.
In realta' hai sonno.
Ma le storie, quando finiscono piano, sembrano piu' vere.

* [Resta sveglio un altro momento]
    ~ leggenda_ascoltata = true
    Mirea sorride e ti passa una mano tra i capelli.
    "Domani ti racconto un altro pezzo." # voce: mirea
    -> p01

=== p01 ===
Hai dieci anni e Mezclar e' grande quanto basta: i campi, il bosco, la mensa di tua madre, le facce che conosci anche quando non sai i nomi. # scene: p01
Oggi giochi da solo vicino agli alberi.
La *spada di legno* ti pesa alla cintura come se fosse vera, e questo basta a raddrizzarti la schiena.
-> p02

=== p02 ===
Nella tasca hai mezzo panino avvolto in un panno. # scene: p02
Stamattina era intero; la prima meta' e' sparita mentre correvi tra i campi.
L'altra meta' aspetta il momento giusto. Forse dopo. Forse tra poco.
-> p03

=== p03 ===
Qualcosa fruscia tra l'erba. Uno *scoiattolo* si ferma a pochi passi da te, con le zampette strette intorno a qualcosa che sta rosicchiando. # scene: p03
Ti guarda. Tu guardi lui. Poi scatta verso il bosco.
Ti viene quella spinta nello stomaco che arriva quando una cosa nuova sta per succedere.

* [Segui lo scoiattolo]
    Scatti dietro di lui, tra i primi tronchi.
    -> p04

=== p04 ===
Nel bosco l'aria cambia. Sa di foglie fredde e terra smossa. # scene: p04
Lo scoiattolo sparisce dietro un tronco, ma sul terreno restano segni piccoli, quasi ridicoli: zampette, graffi, una briciola caduta.
Se guardi bene, sembra tutto una pista.

- (opzioni)
+ [Segui le tracce]
    Tieni gli occhi sui segni e prosegui.
    -> p05
+ [Torna verso il prato]
    Fai un passo indietro verso casa. Poi un fruscio tra le foglie ti richiama: lo scoiattolo non ha ancora finito con te.
    -> opzioni

=== p05 ===
Cammini con gli occhi bassi per non perdere la pista. Un passo, un altro, una radice da saltare. # scene: p05
Poi lo vedi.
Un vecchio in tunica marrone e' seduto contro il tronco piu' grosso, una gamba tesa davanti come un ramo caduto. La caviglia e' piegata su una radice che spunta dalla terra. Non ha urlato. Non ha chiamato nessuno. Aspetta, con la testa bassa e le mani sulle ginocchia, che il dolore faccia quello che deve fare.
Ti fermi. Non decidi di fermarti: accade.
Il vecchio ti sente, alza gli occhi. La sua faccia e' quella di qualcuno che ha camminato troppo e dormito poco.
"Non ti spaventare," dice. "E' la radice che non avevo visto." # voce: vecchio # peso: scelta

* [Avvicinati subito]
    ~ stat_empatia = stat_empatia + 1
    Ti metti in ginocchio accanto alla gamba tesa senza pensarci. Il vecchio ti guarda come se il gesto lo avesse sorpreso, ma non arretra.
    "Sai cosa stai guardando?" chiede. # voce: vecchio
    "No," dici. "Ma stai qua." # voce: ernesto
    -> p05_gather
* [Chiedi se sta bene]
    ~ stat_acume = stat_acume + 1
    "Stai bene?" La domanda e' piccola, un po' inutile data la posizione, e lo sai anche tu mentre la dici. # voce: ernesto
    Il vecchio ti guarda. "Abbastanza. La caviglia regge. Il problema e' rimettersi in piedi." # voce: vecchio
    Ti inginocchi accanto a lui.
    -> p05_gather
* [Guarda la caviglia]
    ~ stat_acume = stat_acume + 1
    Guardi la caviglia senza sapere bene cosa cercare. E' gonfia ma non esce sangue, quindi forse non e' rotta.
    "Neanche a me sembra," dice il vecchio. "Ma aiutarmi a rialzarmi non sarebbe una cattiva idea." # voce: vecchio
    -> p05_gather

=== p05_gather ===
Lo aiuti a rimettersi in piedi. Lui pesa meno di quanto pensi. O forse hai solo tirato piu' forte del necessario, perche' vi trovate entrambi un po' piu' scomposti di quanto vorreste. # scene: p05
Si regge. Fa qualche passo cauto. La caviglia tiene.
"Grazie," dice. Non lo dice come se fosse dovuto. Lo dice come chi e' abituato a bastare a se stesso e trova strano doverlo a qualcun altro. # voce: vecchio
-> p06

=== p06 ===
Il vecchio sistema la tunica con due mani, poi porta una mano alla borsa di cuoio legata alla cintura con un nodo doppio, strano. La controlla con le dita, una volta, veloce, come chi verifica che una cosa sia ancora al suo posto. # scene: p06
Ti viene da chiedere cosa ci sia dentro. Non lo fai.
Nella tua tasca c'e' il mezzo panino nel panno. Lo senti attraverso il tessuto. Hai fame. Lui sembra averne di piu': e' il tipo di stanchezza che include anche il mangiare, o non mangiare. # peso: scelta

* [Offri il panino]
    ~ panino_dato = true
    ~ stat_empatia = stat_empatia + 1
    Allunghi il panno senza spiegare niente. Non sei sicuro di cosa ti abbia mosso: forse il fatto che lui non lo ha chiesto.
    Il vecchio guarda la tua mano. Poi il panino. Poi te.
    "Non ho niente da darti in cambio," dice. # voce: vecchio
    "Non ti ho chiesto niente," dici tu. # voce: ernesto
    Accetta. Mangia piano, come chi non spreca niente.
    -> p06b
* [Tienilo]
    ~ panino_dato = false
    Il mezzo panino resta dov'e'. Il vecchio non lo guarda una seconda volta.
    -> p06b

=== p06b ===
"Come ti chiami?" chiede il vecchio. # scene: p06 # voce: vecchio
"Ernesto." # voce: ernesto
Annuisce, lento. "Lesmidoom. Ma i vecchi si confondono con i nomi: chiamami come vuoi." # voce: vecchio
Lesmidoom. Il nome e' troppo grande per questo bosco. Non sai dove metterlo.
Lui abbassa lo sguardo sulla spada di legno alla tua cintura. Non ride.
"Di dove sei?" # voce: vecchio
"Di Mezclar. Il paese qui vicino." # voce: ernesto
"Lo so dov'e'. Ci vengo." Una pausa. "O ci provo." # voce: vecchio
-> p07

=== p07 ===
Il vecchio si pulisce le dita sulla tunica e guarda tra gli alberi. # scene: p07
"La mensa di tua madre da' da sedere ai viandanti, vero?" dice. "Con questa caviglia, pero', non so se trovo la strada da solo." # voce: vecchio
Il sentiero verso casa lo conosci a memoria. Per lui no. # peso: scelta

* [Accompagnalo alla mensa]
    ~ vecchio_accompagnato = true
    { panino_dato:
        ~ aiuto_vecchio = "A_panino_accompagna"
    - else:
        ~ aiuto_vecchio = "C_no_panino_accompagna"
    }
    Gli fai cenno di seguirti verso i campi. Procede piano, ma ti tiene il passo.
    -> cammino
* [Lascialo andare da solo]
    ~ vecchio_accompagnato = false
    { panino_dato:
        ~ aiuto_vecchio = "B_panino_non_accompagna"
    - else:
        ~ aiuto_vecchio = "D_no_panino_indica"
    }
    Gli indichi la direzione di Mezclar e ti volti verso casa. C'e' qualcosa, in lui, che non sai nominare, e i piedi decidono per te, verso il conosciuto.
    -> p08

// PARTE C — percorso rimorso / mensa (vecchio_accompagnato = false).
=== p08 ===
~ rimorso_tornato = true
Torni verso casa da solo. # scene: p08
All'inizio sembra giusto. Hai fatto quello che potevi: gli hai indicato la strada, e lui sa dove andare. O quasi.{ panino_dato:  E poi gli hai anche dato il panino, quindi.}
Pero' il bosco non si riduce come dovrebbe. I tronchi sembrano piu' larghi, le ombre piu' profonde, e il sentiero che conosci a memoria fa una curva che giuri non c'era prima.
Ti torna in testa la sua voce. *Mi sono gia' perso tre volte.*
Non era una lamentela. Lo capisci adesso, a qualche passo di distanza. Era solo un fatto.
Ti fermi. Fai mezzo giro. Poi ti dici che sei stupido a tornare indietro per un vecchio che ha le gambe e sa parlare. Ti dici che la mensa e' la', che lui trovera' la strada, che hai cose da fare. Non sai bene quali. # peso: scelta

* [Torna a cercarlo]
    Torni indietro lo stesso.
    Il punto dove l'hai lasciato e' vuoto. Le foglie schiacciate dai suoi piedi si mescolano con le tue impronte, con le zampette dello scoiattolo, con qualcos'altro che non riesci a leggere. Cerchi un po', senza ammettere a te stesso che stai cercando.
    Niente.
    { panino_dato:
        Hai ancora il panno vuoto in tasca. Ti sembra piu' leggero del necessario.
    - else:
        Il mezzo panino e' ancora in tasca. Non hai piu' voglia di finirlo.
    }
    Non ti senti in colpa, non sai ancora bene cos'e' la colpa. Senti solo qualcosa di caldo alle orecchie e qualcosa di pesante sotto lo sterno, come quando corri troppo forte e il respiro non riesce a stare dietro.
    -> p09
* [Vai alla mensa]
    Non torni indietro. Prendi la strada di casa, e cerchi di non pensarci.
    { panino_dato:
        Hai ancora il panno vuoto in tasca. Ti sembra piu' leggero del necessario.
    - else:
        Il mezzo panino e' ancora in tasca, ma non hai piu' voglia di finirlo.
    }
    -> p09

// Riunione alla mensa + seme al tavolo (il bag-tic e' RIMOSSO qui per tenerlo raro).
=== p09 ===
La mensa ha l'odore che ha sempre: zuppa, legno, il sapone che tua madre mette nei panni del tavolo. # scene: p09
Lui e' gia' seduto.
Non dove si siedono i passanti di solito, nell'angolo vicino alla porta, quello che non da' le spalle a niente. Le mani appoggiate al bordo del tavolo, la borsa posata accanto come un animale tranquillo. Ti guarda arrivare senza sorprendersi.
Non capisci come ci sia arrivato prima. Non gliene chiedi.
Ti avvicini. Non sai perche'. Un momento fa eri in mezzo al bosco a cercare le sue tracce, adesso sei qui, a due passi da lui, e la cosa piu' onesta da fare sembra sedersi. # peso: scelta

* [Siediti con lui]
    Ti siedi.
    Non parla subito. Guarda la mensa come chi guarda un posto buono senza volerlo trattenere.
    Poi dice, come se la cosa non richiedesse un'introduzione: "Vengo da lontano. Da Phiwen. E sto andando a Nylph, se le gambe reggono ancora qualche giorno." # voce: vecchio
    Non te l'ha chiesto nessuno.
    Tu non sai cos'e' Phiwen. Nylph la conosci di nome, tua madre la nomina quando qualcuno arriva da fuori. E' lontana abbastanza da essere quasi un posto immaginario.
    -> dialogo_d1

// PARTE B — percorso in cammino (vecchio_accompagnato = true).
=== cammino ===
Il sentiero verso Mezclar lo conosci meglio di chiunque altro. Hai la sensazione che lui no, anche se non glielo chiedi. # scene: p09
Camminate. Il vecchio mette il piede con attenzione, prima il tallone, poi le dita, come chi non si fida del terreno. Tu rallenti senza accorgertene.
A un certo punto lui si ferma, guarda il cielo attraverso i rami, e dice una cosa che non e' una domanda ma suona come se lo fosse:
"Non hai paura dei boschi." # voce: vecchio
Non e' un complimento. E' un'osservazione, come si fa con le cose che meritano di essere notate. # peso: scelta

* ["No. Li conosco."]
    Il vecchio ti guarda di lato. "La paura non dipende da quanto conosci un posto." # voce: vecchio
    Non capisci bene cosa vuol dire. Camminate.
    -> cammino_seme
* ["A volte si'."]
    ~ stat_coraggio = stat_coraggio + 1
    "A volte si'," dici. "Ma poi passo lo stesso." # voce: ernesto
    Il vecchio non dice niente per un momento. Poi: "Quella e' la definizione corretta di coraggio. Non l'assenza di paura." # voce: vecchio
    -> cammino_seme
* [Stringi le spalle]
    Stringi le spalle. Non e' una risposta e lo sai, ma e' quello che ti viene.
    Il vecchio annuisce, come se lo capisse.
    -> cammino_seme

=== cammino_seme ===
Camminate un altro tratto in silenzio. # scene: p09
Poi il vecchio dice: "Phiwen, se ti interessa saperlo. Vengo da Phiwen. E sto andando a Nylph." # voce: vecchio
Nylph. Il nome di una citta' lontana che hai sentito citare solo quando gli adulti parlano di commercio e di strade lunghe. # peso: scelta

* [Chiedi dove sta andando]
    ~ seed_curiosita_vecchio = "alta"
    "E' lontana?" # voce: ernesto
    "Abbastanza da far male ai piedi." # voce: vecchio
    Camminate ancora. Qualcosa nell'aria e' cambiato, ma non sai nominarlo.
    -> dialogo_d1
* [Ascolta in silenzio]
    Non chiedi altro. Camminate ancora. Qualcosa nell'aria e' cambiato, ma non sai nominarlo.
    -> dialogo_d1

// D1 / D2 — contenuto CONDIVISO (due cornici: in cammino / al tavolo).
// L'incremento di tratto e' SOLO su D2; D1 e' caratterizzazione/legame.
=== dialogo_d1 ===
{ vecchio_accompagnato:
    "Cosa fai, tu, quando non segui gli scoiattoli?" # scene: p09 # voce: vecchio
    La domanda e' strana. Non e' una domanda da adulti. Gli adulti chiedono come ti chiami, quanti anni hai, se vai a scuola. Questa sembra quasi che si aspetti una risposta vera.
- else:
    Rimane qualche istante in silenzio. Poi ti guarda come si guarda una persona, non come si guarda un bambino, e chiede: # scene: p09
    "Cosa fai, di solito, in un posto come questo?" # voce: vecchio
}

* ["Combatto i mostri."]
    "Combatto i mostri," dici. Poi, per essere preciso: "O mi esercito. Per quando arrivano davvero." # voce: ernesto
    Il vecchio ascolta. Non ride.
    "Mostri," ripete, come se stesse mettendo la parola al posto giusto in una frase che sta costruendo da sola. # voce: vecchio
    -> dialogo_d2
* ["Guardo le cose. E penso."]
    "Guardo le cose," dici. "Le tracce, gli animali, come si muovono. E penso a perche' fanno quello che fanno." # voce: ernesto
    Fai una pausa. "Mia mamma dice che faccio troppe domande. Il maestro anche." # voce: ernesto
    Il vecchio annuisce piano, come chi riceve una notizia che si aspettava.
    "Capire il perche'," dice. Solo quello. # voce: vecchio
    -> dialogo_d2
* ["Aiuto mia mamma alla mensa."]
    "Aiuto mia mamma alla mensa," dici. "Porto ciotole, sparecchio. A volte ascolto le storie di chi arriva." # voce: ernesto
    Ti viene in mente la faccia di certi viandanti quando mangiano davvero, con entrambe le mani sulla ciotola.
    "Le storie, soprattutto," aggiungi. # voce: ernesto
    Il vecchio ti guarda un momento in piu' del solito.
    "Ascolti le persone," dice. Non e' una domanda. # voce: vecchio
    -> dialogo_d2

=== dialogo_d2 ===
{ vecchio_accompagnato:
    Poi il vecchio alza gli occhi verso il sentiero. "E da grande?" dice. "Quando non devi piu' seguire gli scoiattoli perche' hai gia' deciso dove andare, cosa fai?" # scene: p09 # voce: vecchio
    Non lo dice come gli adulti che chiedono cosa vuoi fare da grande e nel frattempo pensano gia' ad altro. Lo dice come chi ha ancora voglia di sentire la risposta. # peso: scelta
- else:
    Il rumore della mensa vi riempie lo spazio tra le parole. Il vecchio lascia che passi, come chi non ha fretta di niente. Poi posa una mano sul tavolo, piatta, ferma. # scene: p09
    "E tu, cosa vuoi diventare?" # voce: vecchio # peso: scelta
}

* ["Voglio diventare un eroe che sconfigge i mostri."]
    ~ stat_coraggio = stat_coraggio + 1
    "Voglio diventare un eroe," dici. "Uno che sconfigge i mostri. Sul serio, non con la spada di legno." # voce: ernesto
    Il vecchio { vecchio_accompagnato: cammina qualche passo in silenzio|resta in silenzio un momento }.
    "Un eroe," dice alla fine. "Ho incontrato alcuni. Quasi nessuno pensava di esserlo mentre ci era dentro." # voce: vecchio
    Non sembra una critica. Sembra una cosa che ha visto.
    "Ma ci vuole qualcosa, per sconfiggere i mostri," aggiunge. "Bisogna riconoscerli." # voce: vecchio
    -> p10
* ["Voglio sapere tutto del mondo."]
    ~ stat_acume = stat_acume + 1
    "Voglio sapere tutto," dici. "Come funzionano le cose. Perche' succedono. Tutto." # voce: ernesto
    Il vecchio sorride, non di superiorita', ma di qualcosa che assomiglia al riconoscimento.
    "Tutto e' tanto," dice. "Ho passato anni a cercare di capire una sola cosa, e alla fine ho capito che mi mancavano le domande giuste." # voce: vecchio
    "Cosa non sai ancora, tu, che ti piacerebbe sapere?" # voce: vecchio
    Rispondi qualcosa, non sai bene cosa: i posti lontani, com'e' fatto il mare. Il vecchio non commenta, e abbassa lo sguardo sulla spada.
    -> p10
* ["Voglio aiutare le persone, come mia mamma."]
    ~ stat_empatia = stat_empatia + 1
    "Voglio aiutare le persone," dici. "Come fa mia mamma. Lei li vede quando entrano, se hanno freddo, se hanno camminato troppo, se stanno fingendo che vada bene. E poi gli da' quello di cui hanno bisogno." # voce: ernesto
    Ti fermi un istante. "Non sempre e' la zuppa." # voce: ernesto
    Il vecchio non dice niente { vecchio_accompagnato: per qualche passo|per un momento }.
    "Tua madre sa vedere le persone," dice alla fine. "E' raro." # voce: vecchio
    Una pausa. "Tu, le sai vedere?" # voce: vecchio
    -> p10

=== p10 ===
{ vecchio_accompagnato:
    Camminando accanto a te, il vecchio abbassa lo sguardo sulla tua spada. # scene: p10
- else:
    Seduto al tavolo, il vecchio abbassa lo sguardo sulla tua spada. # scene: p10
}
"Bella arma, giovane Ernesto. Anche se e' di legno, la porti come una cosa seria. A cosa serve?" # voce: vecchio
La domanda sembra facile. Le spade servono a quello. Lo sanno tutti.

* [Serve a combattere i mostri]
    -> p11

=== p11 ===
"Serve a combattere i mostri," dici. # scene: p11 # voce: ernesto
Lo dici con la sicurezza delle cose che non hanno ancora avuto bisogno di spiegazioni. Gli eroi combattono i mostri. Gli umani stanno dalla parte degli eroi. E se hai una spada, anche di legno, almeno puoi provarci.
-> p12

=== p12 ===
Il vecchio inclina appena la testa. # scene: p12
"E se il mostro avesse fame?" # voce: vecchio
La domanda ti resta addosso per un istante. Fame la capisci. Mostro anche. Le due cose insieme no.

* [Lo uccido. E' un mostro.]
    ~ seed_mostro_affamato = "netto"
    "Vuole mangiare me," dici. # voce: ernesto
    -> p13
* [Se viene verso di me, lo uccido.]
    ~ seed_mostro_affamato = "difensivo"
    "Se mi viene vicino, mi difendo," dici. # voce: ernesto
    -> p13
* [Prima gli grido di andare via. Poi lo uccido.]
    ~ seed_mostro_affamato = "esitante"
    "Prima gli grido di andare via," dici. "Poi, se non se ne va..." # voce: ernesto
    -> p13

=== p13 ===
{ stat_acume >= 2:
    ~ acume_vivo = true
}
Il vecchio non dice che hai torto. Si limita a guardare davanti a se'. # scene: p13
"Una volta, nel continente di Vaargal, c'era un eroe. Errol il Liberatore. I bardi lo nominano ancora, ma spesso saltano il pezzo in cui era solo un uomo stanco, con troppa guerra intorno." # voce: lesmidoom
Tu conosci quel nome. Errol. Il tipo di nome che sulle bocche degli adulti diventa piu' grande della persona. # peso: scelta

* [Chiedi perche' era stanco]
    ~ dialogo_errol_ricevuto = true
    Glielo chiedi prima di decidere se fosse una domanda furba o no.
    Il vecchio si ferma un momento. Non per trovare le parole — le parole le ha gia'. Per scegliere quali dare.
    "Perche' alcune vittorie costano piu' della sconfitta che evitano." # voce: lesmidoom
    Tu aspetti un secondo. La frase e' bella ma non la capisci del tutto, e quella parte che non capisci ti preme come un nodo.
    "Ma in che senso? Cosa pesava?" # voce: ernesto
    Il vecchio non risponde. Porta la mano alla borsa, la sistema con due dita — quella cura veloce di chi controlla qualcosa senza volerlo mostrare — e nel farlo allunga il passo di mezzo punto, tanto che quasi non lo noti. Ma lo noti.
    Camminate avanti. L'argomento non c'e' piu', o almeno non e' piu' suo. Tu hai ancora la domanda in bocca, ma non sai piu' bene dove metterla.
    -> p14
* [Chiedi se conosce Errol]
    ~ dialogo_errol_ricevuto = true
    Il vecchio non risponde subito. Lascia che i vostri passi riempiano il silenzio per qualche secondo.
    "Ho incontrato molta gente nel corso degli anni. Alcune persone restano." # voce: lesmidoom
    Fa una pausa. Poi, quasi per se': "Errol e' rimasto." # voce: lesmidoom
    Non aggiunge altro. Alza lo sguardo verso il sentiero davanti, e con quel gesto porta la mano alla borsa — quasi senza pensarci, due dita che sistemano la cinghia — e il passo si fa appena piu' lungo.
    Non sai cosa ha messo via. Ma sai che e' messo via.
    -> p14
* [Non chiedere niente]
    ~ dialogo_errol_ricevuto = true
    Tu non dici niente. Forse aspetti che il racconto continui da solo.
    Il vecchio aspetta anche lui, un momento — non per imbarazzo, ma come chi misura se una porta e' aperta. Poi annuisce, lento, per qualcosa che non ti riguarda.
    Sistema la borsa alla cintura con due dita e allunga il passo di mezzo punto. Insieme. Come se fossero la stessa cosa.
    Camminate avanti in silenzio, e il nome di Errol resta tra voi come una cosa appesa senza chiodo.
    -> p14
* { acume_vivo } [Chiedi com'era Errol da vicino]
    ~ dialogo_errol_ricevuto = true
    Il vecchio ti guarda di lato — non sorpreso dalla domanda, ma quasi sorpreso da chi l'ha fatta.
    "Stanco," dice. "Come chi ha vinto e non sa ancora cosa farne." # voce: lesmidoom
    Porta la mano alla borsa, la sistema. Allunga il passo.
    -> p14

=== p14 ===
{ vecchio_accompagnato:
    La mensa e' piena dell'odore delle cose semplici: zuppa, pane, legno bagnato lavato troppe volte. Per te e' il posto di tua madre. # scene: p14
    Il vecchio si ferma sulla soglia come chi trova finalmente una sedia.
- else:
    Siete al tavolo da un po'. Intorno a voi la mensa si riempie: zuppa, pane, le voci dei viandanti che entrano. Per te e' il posto di tua madre. # scene: p14
    Lui resta dov'e', le mani vicino al bordo, come chi aspetta senza chiedere.
}
{ aiuto_vecchio == "A_panino_accompagna":
    Mirea ti guarda con un calore in piu', come se avesse capito qualcosa.
- else:
    Mirea ti guarda lavorare, poi guarda l'ospite con un'attenzione asciutta.
}

* [Aiuta come sempre]
    -> p15
* [Resta vicino al vecchio]
    ~ seed_curiosita_vecchio = "alta"
    -> p15

=== p15 ===
Il vecchio mangia davvero. Non assaggia per cortesia, non finge. Tiene la ciotola con entrambe le mani e lascia che il calore gli salga fino al viso. # scene: p15
Tu porti pane, sposti ciotole, rispondi quando tua madre ti chiama. Pero' torni sempre vicino a lui.
{ panino_dato:
    Pensi al panno vuoto in tasca, e per un attimo sei contento di averlo dato.
- else:
    Senti il mezzo panino ancora in tasca, e non sai bene perche' ti pesa.
}

* [Chiedigli di Nylph]
    ~ seed_curiosita_vecchio = "alta"
    "E' lontana. Abbastanza da far male ai piedi," dice il vecchio. # voce: vecchio
    -> p16
* [Torna da Mirea]
    Mirea ti affida un piccolo compito e tu lo sbrighi, ma l'occhio torna al tavolo.
    -> p16

=== p16 ===
Tua madre arriva al tavolo e posa una mano sullo schienale della sedia. # scene: p16
"Ernesto, chi e' il nostro ospite?" # voce: mirea
Il vecchio si alza quel tanto che riesce.
"Signora, il mio nome e' Lesmidoom. Vengo da Phiwen, e nei miei viaggi mi sono ritrovato a passare di qui. Solo per poco." # voce: lesmidoom
~ lesmidoom_rivelato = true
Lesmidoom. Il nome resta nell'aria piu' a lungo degli altri.
-> p17

=== p17 ===
Tua madre non dice nulla di strano. Non arretra, non alza la voce, non fa domande difficili. Ma interrompe un gesto a meta': la mano resta ferma sullo schienale, le dita strette. # scene: p17
Tu lo noti solo perche' conosci le sue mani.

* [Guarda tua madre]
    Le sue dita sono strette. Troppo ferme.
    -> p18
* [Guarda Lesmidoom]
    ~ seed_curiosita_vecchio = "alta"
    Sembra accorgersene, ma non la costringe a parlare.
    -> p18

=== p18 ===
Lesmidoom si volta verso di te. Non fa niente di teatrale. Non ti tocca la fronte, non pronuncia parole che fanno tremare le finestre. # scene: p18
Ti guarda soltanto come se, tra tutte le persone nella mensa, avesse trovato proprio quella che stava aspettando senza saperlo.

* [Resta vicino]
    Resti dove sei, senza sapere bene perche'.
    -> p19
* [Fai un passo indietro]
    Fai un passo indietro. Mirea ti guarda; Lesmidoom non insiste.
    -> p19

=== p19 ===
Lesmidoom si sistema la tunica. # scene: p19
"Le nostre strade si dividono qui, giovane Ernesto. Ti ringrazio." # voce: lesmidoom
Poi, davanti a tua madre, aggiunge: "Fai buon viaggio." # voce: lesmidoom
~ fai_buon_viaggio_sentito = true
Tu pensi che sia un modo elegante per salutare. Tua madre no. O almeno: le sue mani no.

* [Rispondi "anche tu"]
    "Anche tu," dici, senza pensarci. # voce: ernesto
    -> p20
* [Resta zitto]
    Non dici niente. La frase resta sospesa nell'aria.
    -> p20

=== p20 ===
Il cucchiaio che tua madre stava per prendere resta sul tavolo. Solo un istante. Poi lei lo afferra, lo porta via, dice a qualcuno che la zuppa e' calda. # scene: p20
Tutto torna normale cosi' in fretta che quasi ti vergogni di averci fatto caso.

* [Chiedi a Mirea se sta bene]
    "Si', piccolo. Sono solo stanca," dice Mirea. # voce: mirea
    -> p21
* [Lascia stare]
    Lasci stare e ti avvii verso la tua stanza.
    -> p21

=== p21 ===
La tua stanza e' la tua stanza: la coperta piegata male, la spada di legno vicino al letto. # scene: p21
{ panino_dato:
    Sul tavolo restano solo le briciole del panino che hai dato via.
- else:
    Sul tavolo c'e' ancora il panno con il mezzo panino.
}
Fuori, tua madre chiude la mensa. Ogni rumore arriva piccolo. Tu ripensi allo scoiattolo, al vecchio, a Errol.
{ seed_curiosita_vecchio == "alta":
    Del vecchio ti resta una domanda che non hai fatto. Domani, forse.
- else:
    Il vecchio e' gia' un'ombra tra le altre della giornata.
}
Poi il sonno prende tutto senza chiedere permesso. # input: richiesto

* [Dormi]
    Chiudi gli occhi.
    -> p22

=== p22 ===
Apri gli occhi. Non sei nel letto. # scene: p22 # mode: dream
Il testo sul terminale perde calore. Le lettere sembrano piu' sottili, piu' bianche, e per un istante alcune parole arrivano in ritardo, come battute da molto lontano.
Fumo. Ferro. Sangue. Una pianura spezzata dal rumore.

+ [Apri gli occhi nel sogno]
    -> p23

=== p23 ===
Sei in piedi, ma il corpo non e' il tuo. Troppo alto, troppo pesante. Le mani hanno calli che non riconosci, il braccio fa male dove non dovrebbe. L'armatura e' di metallo pregiato, sporca di sangue, con uno stemma sul petto. # scene: p23
A est, un fabbro affila lame circondato da soldati. A nord, la battaglia divora il cielo. # peso: scelta

+ [Parla col fabbro e i soldati]
    ~ sogno_bivio = "coordinato"
    ~ sogno_perdite = "ridotte"
    Ti volti verso il fabbro. Un soldato, vedendoti muovere, mormora: "Errol ha bisogno di noi." # voce: soldato
    -> p24
+ [Corri subito a nord]
    ~ sogno_bivio = "solo"
    ~ sogno_perdite = "alte"
    Non aspetti nessuno. La stessa voce ti raggiunge piu' tardi e peggio, gia' coperta dal fragore: "Errol... ha bisogno..." # voce: soldato
    -> p25

=== p24 ===
Il fabbro ti vede muovere. "Finalmente ti sei ripreso. Errol ha bisogno della sua Spada. Se vai, non vai da solo." # scene: p24 # voce: fabbro
I soldati si stringono intorno a te. Non sembrano salvi. Sembrano pronti.
Quando tre nemici sbarrano la strada, due uomini della scorta avanzano prima che tu possa decidere. "Qui ci pensiamo noi. Tu trova la Spada." # voce: soldato
~ sogno_primo_scontro = "saltato"

+ [Lascia che la scorta apra il passaggio]
    La scorta ingaggia i tre nemici. Tu passi oltre, e per un istante ci sono meno morti intorno a te.
    -> p26

=== p25 ===
Corri a nord senza aspettare nessuno. La strada e' fango scavato da carri e piedi, e la battaglia ti viene incontro prima che tu capisca dove guardare. # scene: p25
Tre nemici ti sbarrano la via. Intorno a te alcuni soldati cambiano direzione per coprirti: uno cade subito, un altro urla il nome di Errol e si getta avanti. # combat: ScontroTreNemici.initial
-> p25_esito

=== p25_esito ===
{ sogno_primo_scontro == "rianimato":
    -> sogno_rianimazione
- else:
    -> p26
}

=== p26 ===
Il campo e' pieno di corpi, ferro e fango. Il rumore non sta intorno a te: ti attraversa. # scene: p26
{ sogno_bivio == "solo":
    Alle tue spalle, i compagni che ti hanno coperto non si rialzano. Non guardarli troppo a lungo.
}
Un soldato indica una zona piu' sgombra a est. "Errol e' passato di li'. Dove lui avanza, i nemici cadono." Devi trovare una traccia, qualcosa che appartenga a Errol. # voce: soldato

+ [Esamina il terreno]
    Sangue, impronte, segni di trascinamento. L'occhio ci si abitua: una pista e' una pista.
    -> p27
+ [Vai a est]
    Avanzi verso est senza fermarti a leggere il terreno.
    -> p27

=== p27 ===
A pochi passi da te, quasi sepolto nel fango, c'e' un medaglione. Oro sporco, argento vivo, sangue fresco nelle incisioni. # scene: p27

+ [Raccogli il medaglione]
    ~ medaglione_errol_preso = true
    Quando lo raccogli, leggi un nome: Errol. Un soldato trattiene il fiato. "E' suo. Guarda li': le tracce." # voce: soldato
    -> p27_tracce

=== p27_tracce ===
{ bosco_tracce_osservate:
    Per un attimo pensi alle zampette dello scoiattolo nel bosco. Una pista e' una pista. Poi ricordi che questa e' fatta di sangue. # scene: p27
- else:
    Le tracce di sangue si allontanano verso nord, dense, impossibili da non vedere. # scene: p27
}

+ [Segui le tracce di sangue]
    -> p28

=== p28 ===
Le tracce finiscono dove il fumo si apre. # scene: p28
Una creatura ti sbarra la strada. E' alta, verdastra, sporca di sangue non tutto suo. Nella mano sinistra tiene un'arma che non appartiene al suo corpo: una spada lucente, umana, troppo preziosa per quel fango. La Spada del Lungo Viaggio.
La creatura e' stanca. Le ginocchia cedono, il fianco resta scoperto quando solleva la lama. # combat: TutorialOrcoSpada
-> p29

=== p29 ===
La creatura cade. La lingua in cui impreca non assomiglia a niente che tu conosca, poi anche quella si spegne. # scene: p29
La Spada resta nella sua mano sinistra per un istante di troppo. Devi piegarti per prenderla. # input: richiesto

+ [Prendi la Spada]
    ~ spada_lungo_viaggio_recuperata = true
    Quando le tue dita chiudono l'elsa, il freddo ti sale fino al gomito.
    -> p29_esito

=== p29_esito ===
{ orco_allarme:
    -> p30
- else:
    -> p31
}

=== p30 ===
L'urlo della creatura non muore con lei. # scene: p30
Tre nemici emergono dal fumo e si mettono tra te e il punto in cui i soldati indicano Errol. La Spada pesa nella tua mano come se sapesse di essere in ritardo. # combat: ScontroTreNemici.rinforzi
-> p30_esito

=== p30_esito ===
{ rinforzi_post_orco == "rianimato":
    -> sogno_rianimazione
- else:
    -> p31
}

=== p31 ===
Lo vedi tra il fumo: Errol. # scene: p31
Non e' pulito come nelle storie. E' in ginocchio, sanguinante, quasi piegato dal peso della battaglia. Davanti a lui, il capo nemico incombe come una fine.
I soldati intorno a te urlano. Alcuni cadono per aprirti un varco. Tu sollevi la *Spada del Lungo Viaggio*.

+ [Lancia la Spada a Errol]
    ~ spada_consegnata_errol = true
    -> p32

=== p32 ===
Errol afferra la Spada al volo. # scene: p32 # event: spada_consegnata_errol
Per un istante il campo sembra trattenere il respiro. Poi lui si rialza: sangue, polvere, metallo, tutto gli resta addosso, ma non lo tiene piu' giu'.
Si scaglia contro il capo nemico. Un nome ti affiora dal nulla, e non sai perche' lo riconosci: Grumlok. La lama disegna una linea chiara nel fumo, e il corpo enorme crolla.
Le grida degli umani salgono verso il cielo. I nemici arretrano. Qualcuno urla che la guerra e' finita, che il continente e' libero, che Errol ha vinto. Tu gli credi.

+ [Lascia che il sogno si chiuda]
    -> p33

=== p33 ===
Le urla diventano un fischio. # scene: p33
Il fischio diventa freddo.
Perdi il peso dell'armatura. Perdi la Spada. Perdi le mani grandi, il sangue, il fumo.
Rimane il buio.

+ [Svegliati]
    -> p34

// Sconfitta morbida: due errori in uno scontro riportano al bivio dell'accampamento.
// Nessun game over duro: `sogno_rianimato` resta come unica memoria del fallimento.
=== sogno_rianimazione ===
Il campo si rovescia, il rumore diventa acqua scura. Buio, una voce lontana, il freddo dell'accampamento che ti riprende. # scene: p23
Sei di nuovo in piedi vicino al fabbro: vivo, rianimato, come se il sogno ti concedesse un altro tentativo.
-> p23

=== p34 ===
Ti svegli di colpo. # scene: p34 # mode: normal
La stanza e' ancora tua. La coperta e' attorcigliata alle gambe, la spada di legno e' dove l'hai lasciata. Non c'e' fumo, non c'e' ferro, non c'e' Errol.
Il cuore, pero', continua a correre come se il campo fosse appena fuori dalla finestra.

+ [Riprendi fiato]
    -> p35

=== p35 ===
Ti gratta il braccio sinistro. # scene: p35
Tiri su la manica pensando a un graffio fatto dormendo o giocando nei prati. Sulla pelle c'e' un segno che prima non c'era. Piccolo, vago: non sembra una ferita aperta, ma nemmeno un livido normale.
Lo tocchi con un dito. Non fa male. Questo lo rende peggiore.
~ segno_notato = true

+ [Guardalo meglio]
    ~ seed_curiosita_segno = "osserva"
    Lo studi senza riuscire a dargli un nome. Piu' lo guardi, piu' resti a guardarlo.
    -> p36
+ [Copri il braccio]
    ~ seed_curiosita_segno = "nasconde"
    Tiri giu' la manica in fretta, come se non vederlo bastasse a cancellarlo.
    -> p36
+ [Decidi che e' un graffio]
    ~ seed_curiosita_segno = "minimizza"
    Decidi che e' soltanto un graffio. Lo decidi con troppa cura per crederci davvero.
    -> p36

=== p36 ===
"Ernesto?" # scene: p36 # voce: mirea
La voce di tua madre arriva da fuori stanza, normale e vicina. "Sei sveglio?" # voce: mirea
Per un momento resti tra la voce di Mirea e il segno sul braccio, tra la stanza piccola e il campo enorme che hai appena sognato.

- (richiamo)
+ [Guarda ancora il segno]
    Il segno e' sempre li'. La forma non si lascia nominare, e proprio per questo continui a guardarla.
    -> richiamo
+ [Rispondi a Mirea]
    ~ prologo_completato = true
    Abbassi la manica. O forse no. Poi rispondi.
    Il prologo finisce qui.
    -> END
