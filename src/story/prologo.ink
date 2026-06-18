VAR leggenda_ascoltata = false

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
-> END
