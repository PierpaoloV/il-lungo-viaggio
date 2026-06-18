VAR leggenda_ascoltata = false
VAR bosco_tracce_osservate = false
VAR panino_dato = false
VAR vecchio_accompagnato = false
VAR aiuto_vecchio = ""
VAR rimorso_tornato = false
VAR seed_curiosita_vecchio = "bassa"
VAR seed_mostro_affamato = ""
VAR dialogo_errol_ricevuto = false
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
Poi sbatti contro qualcosa di grande e morbido.
"Ehi, attento a dove vai, ragazzino." # voce: vecchio
Davanti a te c'e' un anziano in tunica marrone. Sembra stanco come chi ha camminato troppo e dormito poco.

* [Chiedi scusa]
    "Scusa, non ti avevo visto," dici. Il vecchio fa un gesto morbido con la mano, senza rancore.
    -> p06
* [Resta zitto]
    Resti in silenzio, la spada stretta in pugno. Il vecchio sospira, poi parla lui.
    -> p06

=== p06 ===
Il vecchio guarda il panno che spunta dalla tua tasca. Non lo chiede. Lo nota soltanto. # scene: p06
Tu senti il peso del mezzo panino come se fosse diventato piu' grande.
Hai fame, ma lui sembra averne di piu'. # peso: scelta

* [Offri il panino]
    ~ panino_dato = true
    Allunghi il panno. Il vecchio accetta senza fronzoli e mangia piano, come chi non spreca niente.
    -> p07
* [Tienilo]
    ~ panino_dato = false
    Ti stringi nelle spalle e lasci il panino dov'e'. Il vecchio non insiste.
    -> p07

=== p07 ===
Il vecchio si pulisce le dita sulla tunica e guarda tra gli alberi. # scene: p07
"Vieni dalla citta' vicina, vero? Mi hanno detto che a Mezclar c'e' una mensa per i viandanti. Da solo potrei perdermi. Mi accompagneresti?" # voce: vecchio
Il sentiero verso casa sembra facile quando lo conosci. Per lui no. # peso: scelta

* [Accompagnalo alla mensa]
    ~ vecchio_accompagnato = true
    { panino_dato:
        ~ aiuto_vecchio = "A_panino_accompagna"
    - else:
        ~ aiuto_vecchio = "C_no_panino_accompagna"
    }
    Annuisci e gli fai cenno di seguirti verso i campi.
    -> p09
* [Indicagli la strada]
    "Un povero anziano non puo' viaggiare da solo, mi sono gia' perso tre volte," dice il vecchio. # voce: vecchio
    ** [Indica la strada e basta]
        ~ vecchio_accompagnato = false
        { panino_dato:
            ~ aiuto_vecchio = "B_panino_non_accompagna"
            Gli mostri la direzione di Mezclar e lo saluti. Lui ti guarda andare via.
            -> p08
        - else:
            ~ aiuto_vecchio = "D_no_panino_indica"
            Gli mostri la direzione di Mezclar e lo saluti. Lui ti guarda andare via.
            -> p09
        }
    ** [Va bene, ti accompagno]
        ~ vecchio_accompagnato = true
        { panino_dato:
            ~ aiuto_vecchio = "A_panino_accompagna"
        - else:
            ~ aiuto_vecchio = "C_no_panino_accompagna"
        }
        Sospiri, poi gli fai cenno di seguirti.
        -> p09

=== p08 ===
~ rimorso_tornato = true
Cammini verso casa da solo. Hai fatto una cosa buona, ti dici. Gli hai dato il panino. Gli hai indicato la strada. # scene: p08
Dopo pochi passi, il bosco sembra piu' grande di prima. Ti torna in testa la sua voce: "Mi sono gia' perso tre volte."
Quando torni indietro, il vecchio non c'e' piu'. Le tracce dello scoiattolo, le tue impronte, le foglie schiacciate: tutto si mescola. Ti viene caldo alle orecchie.

* [Vai alla mensa]
    Lasci perdere e prendi la strada di casa.
    -> p09

=== p09 ===
{ vecchio_accompagnato:
    Cammini accanto al vecchio. Procede piano e parla a tratti, come se misurasse il fiato. # scene: p09
- else:
    Quando entri in vista della mensa, lo ritrovi gia' seduto a un tavolo, piu' piccolo di quanto sembrava nel bosco. In qualche modo e' arrivato prima di te. # scene: p09
}
Dice di aver visto strade lunghe, citta' dove nessuno conosce il tuo nome e posti in cui una scodella calda vale piu' di una moneta.

* [Chiedi dove sta andando]
    "Verso Nylph, se le gambe mi reggono." # voce: vecchio
    ~ seed_curiosita_vecchio = "alta"
    -> p10
* [Ascolta in silenzio]
    Lo ascolti senza interrompere, mentre la citta' si avvicina.
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
"Serve a combattere i mostri," dici. # scene: p11
Lo dici con la sicurezza delle cose che non hanno ancora avuto bisogno di spiegazioni. Gli eroi combattono i mostri. Gli umani stanno dalla parte degli eroi. E se hai una spada, anche di legno, almeno puoi provarci.
-> p12

=== p12 ===
Il vecchio inclina appena la testa. # scene: p12
"E se il mostro avesse fame?" # voce: vecchio
La domanda ti resta addosso per un istante. Fame la capisci. Mostro anche. Le due cose insieme no.

* [Lo uccido. E' un mostro.]
    ~ seed_mostro_affamato = "netto"
    "Vuole mangiare me," dici.
    -> p13
* [Se viene verso di me, lo uccido.]
    ~ seed_mostro_affamato = "difensivo"
    "Se mi viene vicino, mi difendo," dici.
    -> p13
* [Prima gli grido di andare via. Poi lo uccido.]
    ~ seed_mostro_affamato = "esitante"
    "Prima gli grido di andare via," dici. "Poi, se non se ne va..."
    -> p13

=== p13 ===
Il vecchio non dice che hai torto. Si limita a guardare davanti a se'. # scene: p13
"Una volta, nel continente di Vaargal, c'era un eroe. Errol il Liberatore. I bardi lo nominano ancora, ma spesso saltano il pezzo in cui era solo un uomo stanco, con troppa guerra intorno." # voce: vecchio
Tu conosci quel nome. Errol. Il tipo di nome che sulle bocche degli adulti diventa piu' grande della persona.

* [Chiedi della battaglia]
    ~ dialogo_errol_ricevuto = true
    "Si batte' con la Spada del Lungo Viaggio," dice il vecchio, e non spiega altro. # voce: vecchio
    -> p14
* [Lascia che il racconto resti li']
    ~ dialogo_errol_ricevuto = true
    Lasci che il nome resti sospeso, senza chiedere altro.
    -> p14

=== p14 ===
La mensa e' piena dell'odore delle cose semplici: zuppa, pane, legno bagnato lavato troppe volte. Per te e' il posto di tua madre. # scene: p14
{ vecchio_accompagnato:
    Il vecchio si ferma sulla soglia come chi trova finalmente una sedia.
- else:
    Lo ritrovi gia' seduto a un tavolo, piu' piccolo di quanto sembrava nel bosco.
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
    "Anche tu," dici, senza pensarci.
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
Poi il sonno prende tutto senza chiedere permesso.

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
    Ti volti verso il fabbro. Un soldato, vedendoti muovere, mormora: "Errol ha bisogno di noi."
    -> p24
+ [Corri subito a nord]
    ~ sogno_bivio = "solo"
    ~ sogno_perdite = "alte"
    Non aspetti nessuno. La stessa voce ti raggiunge piu' tardi e peggio, gia' coperta dal fragore: "Errol... ha bisogno..."
    -> p25

=== p24 ===
Il fabbro ti vede muovere. "Finalmente ti sei ripreso. Errol ha bisogno della sua Spada. Se vai, non vai da solo." # scene: p24
I soldati si stringono intorno a te. Non sembrano salvi. Sembrano pronti.
Quando tre nemici sbarrano la strada, due uomini della scorta avanzano prima che tu possa decidere. "Qui ci pensiamo noi. Tu trova la Spada."
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
Un soldato indica una zona piu' sgombra a est. "Errol e' passato di li'. Dove lui avanza, i nemici cadono." Devi trovare una traccia, qualcosa che appartenga a Errol.

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
    Quando lo raccogli, leggi un nome: Errol. Un soldato trattiene il fiato. "E' suo. Guarda li': le tracce."
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
La Spada resta nella sua mano sinistra per un istante di troppo. Devi piegarti per prenderla.

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
La voce di tua madre arriva da fuori stanza, normale e vicina. "Sei sveglio?"
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
