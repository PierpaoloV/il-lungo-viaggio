VAR leggenda_ascoltata = false
VAR bosco_tracce_osservate = false
VAR panino_dato = false
VAR vecchio_accompagnato = false
VAR aiuto_vecchio = ""
VAR rimorso_tornato = false
VAR seed_curiosita_vecchio = "bassa"
VAR orco_allarme = false
VAR colpo_tutorial = "nessuno"
VAR sogno_rianimato = false
VAR sogno_primo_scontro = "saltato"
VAR rinforzi_post_orco = "non_applicabile"

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
Hai fame, ma lui sembra averne di piu'.

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
Il sentiero verso casa sembra facile quando lo conosci. Per lui no.

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
    -> mensa
* [Ascolta in silenzio]
    Lo ascolti senza interrompere, mentre la citta' si avvicina.
    -> mensa

=== mensa ===
Poco dopo varchi la soglia della mensa di Mezclar. # scene: mensa
L'odore di zuppa, pane e legno caldo ti dice subito che sei a casa: per gli altri e' la mensa di Mezclar, per te e' il posto di tua madre.
-> END
