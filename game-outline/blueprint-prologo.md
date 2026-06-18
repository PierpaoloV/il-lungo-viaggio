# Blueprint giocabile — Prologo

Documento operativo per implementazione ink + parser del prologo di *Il Lungo Viaggio*.

Voce base: presente, seconda persona, sguardo di Ernesto bambino. Eccezioni: leggenda iniziale in registro da fiaba; sogno in prosa fredda, adulta, frammentata, con styling diegetico del terminale.

## Stato globale

Inventario iniziale:

- `spada_legno`: presente.
- `mezzo_panino`: presente. Il panino era intero al mattino; Ernesto ne ha gia' mangiata meta'.

Comandi globali disponibili dove sensati: `guarda`, `esamina <x>`, `vai <luogo|direzione>`, `segui <x>`, `prendi <oggetto>`, `parla <persona>`, `dai <oggetto>`, `usa <oggetto>`, `inventario`, `aspetta`, `aiuto`/`?`. In combattimento si aggiunge `attacca <apertura>`.

## Flag usati

- `leggenda_ascoltata`: `false|true`.
- `bosco_tracce_osservate`: `false|true`. Letto nel sogno quando Ernesto segue le scie di sangue dal medaglione.
- `panino_dato`: `false|true`.
- `vecchio_accompagnato`: `false|true`.
- `aiuto_vecchio`: `A_panino_accompagna|B_panino_non_accompagna|C_no_panino_accompagna|D_no_panino_indica`.
- `rimorso_tornato`: `false|true`. Solo ramo B.
- `seed_mostro_affamato`: `netto|difensivo|esitante`. Seme lungo termine, non usato in v1.
- `seed_curiosita_vecchio`: `bassa|alta`. Seme lungo termine, non usato in v1.
- `dialogo_errol_ricevuto`: `false|true`.
- `lesmidoom_rivelato`: `false|true`.
- `fai_buon_viaggio_sentito`: `false|true`.
- `sogno_bivio`: `coordinato|solo`.
- `sogno_perdite`: `ridotte|alte`.
- `sogno_rianimato`: `false|true`.
- `sogno_primo_scontro`: `saltato|vinto|rianimato`.
- `medaglione_errol_preso`: `false|true`.
- `orco_allarme`: `false|true`.
- `colpo_tutorial`: `ginocchia|fianco|maldestro_non_finale`. Il valore finale deve diventare `ginocchia` o `fianco` quando la creatura viene finita; `maldestro_non_finale` e' solo transitorio.
- `rinforzi_post_orco`: `non_applicabile|vinti|rianimato`.
- `spada_lungo_viaggio_recuperata`: `false|true`.
- `spada_consegnata_errol`: `false|true`.
- `segno_notato`: `false|true`.
- `seed_curiosita_segno`: `minimizza|osserva|nasconde`. Seme lungo termine, non usato in v1.
- `prologo_completato`: `false|true`.

## Scene

### P00 — La storia di Mirea
- Obiettivo narrativo: Aprire il prologo con una leggenda breve, vaga, da racconto, senza spiegoni e senza rivelare le verita' profonde.
- Luogo / atmosfera: Sera quieta a Mezclar, voce di Mirea vicina, calore domestico.
- Prosa (presente, 2ª persona):  
  "Si racconta che Vaargal sia nato quando il mondo era ancora senza strade e senza nomi. Allora vennero i popoli: uomini, nani, elfi, halfling e orchi. Ognuno ricevette un posto, una lingua, un modo di guardare il cielo. Per molto tempo il mondo resto' intero. Poi, come succede nelle storie, qualcuno dimentico' che un posto dato non si strappa via senza ferire anche la terra."
  
  Mirea abbassa la voce sull'ultima frase. Tu tieni gli occhi aperti solo per farle vedere che non hai sonno. In realta' hai sonno. Ma le storie, quando finiscono piano, sembrano piu' vere.
- Azioni sempre disponibili rilevanti qui: `aspetta` chiude la leggenda; `parla Mirea` fa dire "Domani ti racconto un altro pezzo"; `aiuto` suggerisce `aspetta`.
- Scelte situazionali (bottoni): [Resta sveglio un altro momento] -> Mirea sorride e chiude la storia -> `leggenda_ascoltata=true`.
- Oggetti/personaggi interagibili: Mirea -> "Ha le mani ferme e la voce bassa; quando racconta, sembra guardare qualcosa che tu non vedi."; stanza -> "Piccola, nota, sicura.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `leggenda_ascoltata=true`.
- Uscite / transizione: Transizione a P01 la mattina o il pomeriggio seguente.
- Note di resa (audio/immagine/styling): Registro fiabesco; terminale caldo, nessun effetto diegetico.

### P01 — Mezclar, dieci anni
- Obiettivo narrativo: Stabilire Ernesto bambino, Mezclar come casa, e il quotidiano caldo prima del mito.
- Luogo / atmosfera: Prati vicino a Mezclar, margine del bosco, luce dorata.
- Prosa (presente, 2ª persona):  
  Hai dieci anni e Mezclar e' grande quanto basta: i campi, il bosco, la mensa di tua madre, le facce che conosci anche quando non sai i nomi. Oggi giochi da solo vicino agli alberi. La spada di legno ti pesa alla cintura come se fosse vera, e questo basta a raddrizzarti la schiena.
- Azioni sempre disponibili rilevanti qui: `guarda` descrive prato, citta' e margine del bosco; `inventario` mostra spada di legno e mezzo panino; `esamina spada` rinforza il gioco eroico; `vai citta` dice che puoi tornarci, ma il gioco ti invita prima a guardarti intorno.
- Scelte situazionali (bottoni): Nessuna.
- Oggetti/personaggi interagibili: spada di legno -> "Una spada storta, liscia dove la mano la stringe sempre. Non taglia niente, ma nella tua testa e' sufficiente."; Mezclar -> "Non sembra una citta' da storie. E' casa."; bosco -> "Fresco, fitto, un po' proibito.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: `guarda` o `aspetta` rivela lo scoiattolo e porta a P02.
- Note di resa (audio/immagine/styling): Suoni morbidi di prato e vento. Nessuna immagine obbligatoria.

### P02 — Inventario da bambino
- Obiettivo narrativo: Rendere giocabili gli oggetti iniziali e preparare la scelta del panino.
- Luogo / atmosfera: Stesso margine del bosco.
- Prosa (presente, 2ª persona):  
  Nella tasca hai mezzo panino avvolto in un panno. Stamattina era intero; la prima meta' e' sparita mentre correvi tra i campi. L'altra meta' aspetta il momento giusto. Forse dopo. Forse tra poco.
- Azioni sempre disponibili rilevanti qui: `inventario` mostra `spada_legno` e `mezzo_panino`; `esamina panino` descrive pane semplice e briciole; `mangia panino` deve essere trattato come `usa panino` e chiedere conferma, per non bruciare per errore la scelta D9.
- Scelte situazionali (bottoni): [Mangia il panino] -> reazione: "Ti viene fame solo a guardarlo, ma decidi di tenerlo per dopo." -> nessun flag, scelta non consuma in questa scena.
- Oggetti/personaggi interagibili: mezzo panino -> "Pane comune, un po' schiacciato. Ha l'odore della mattina."; panno -> "Tiene insieme le briciole.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: `guarda bosco` o `aspetta` porta a P03.
- Note di resa (audio/immagine/styling): Onboarding implicito di `inventario` e `esamina`.

### P03 — Lo scoiattolo
- Obiettivo narrativo: Innescare l'incidente casuale che porta Ernesto nel bosco.
- Luogo / atmosfera: Confine tra prato e alberi.
- Prosa (presente, 2ª persona):  
  Qualcosa fruscia tra l'erba. Uno scoiattolo si ferma a pochi passi da te, con le zampette strette intorno a qualcosa che sta rosicchiando. Ti guarda. Tu guardi lui. Poi scatta verso il bosco.
  
  Ti viene quella spinta nello stomaco che arriva quando una cosa nuova sta per succedere.
- Azioni sempre disponibili rilevanti qui: `segui scoiattolo` avanza; `esamina scoiattolo` lo fa fuggire lasciando tracce; `vai bosco` equivale a seguirlo; `vai citta` permette un breve ripensamento ma non chiude la scena.
- Scelte situazionali (bottoni): [Segui lo scoiattolo] -> vai a P04.
- Oggetti/personaggi interagibili: scoiattolo -> "Troppo veloce per essere preso, abbastanza vicino da sembrare un invito."; margine del bosco -> "Le ombre cominciano subito dopo i primi tronchi.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: `segui scoiattolo` o bottone -> P04.
- Note di resa (audio/immagine/styling): Evidenziare `scoiattolo` come sostantivo interagibile.

### P04 — Le tracce
- Obiettivo narrativo: Dare una piccola esplorazione opzionale che riaffiora nel sogno.
- Luogo / atmosfera: Primo tratto del bosco, ancora vicino alla citta'.
- Prosa (presente, 2ª persona):  
  Nel bosco l'aria cambia. Sa di foglie fredde e terra smossa. Lo scoiattolo sparisce dietro un tronco, ma sul terreno restano segni piccoli, quasi ridicoli: zampette, graffi, una briciola caduta.
  
  Se guardi bene, sembra tutto una pista.
- Azioni sempre disponibili rilevanti qui: `esamina tracce` imposta il dettaglio di esplorazione; `segui tracce` avanza; `vai nord` risponde "Ti allontanerai troppo dalla citta'. Senza una torcia ti perderesti."; `vai sud` mostra la direzione di casa ma mantiene la scena; `aiuto` suggerisce `esamina tracce` e `segui tracce`.
- Scelte situazionali (bottoni): [Segui le tracce] -> P05; [Torna verso il prato] -> breve riga di esitazione, poi lo scoiattolo richiama con un fruscio.
- Oggetti/personaggi interagibili: tracce -> "Sono leggere, ma continue. Ti piace capirle."; alberi -> "Troppo fitti verso nord."; briciola -> "Forse dello scoiattolo. Forse tua.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: `esamina tracce` scrive `bosco_tracce_osservate=true`.
- Uscite / transizione: `segui tracce` -> P05.
- Note di resa (audio/immagine/styling): Se `bosco_tracce_osservate=true`, nel sogno P24 aggiungere richiamo sensoriale alle tracce.

### P05 — L'urto
- Obiettivo narrativo: Far incontrare Ernesto con il vecchio viandante senza presentarlo ancora come Lesmidoom.
- Luogo / atmosfera: Bosco piu' fitto, ma non remoto.
- Prosa (presente, 2ª persona):  
  Cammini con gli occhi bassi per non perdere la pista. Un passo, un altro, una radice da saltare. Poi sbatti contro qualcosa di grande e morbido.
  
  "Ehi, attento a dove vai, ragazzino."
  
  Davanti a te c'e' un anziano in tunica marrone. Sembra stanco come chi ha camminato troppo e dormito poco.
- Azioni sempre disponibili rilevanti qui: `parla vecchio` avvia il dialogo; `esamina vecchio` alza `seed_curiosita_vecchio` se ripetuto o seguito da domande; `guarda` descrive il punto del bosco; `segui tracce` dice che le tracce si interrompono vicino al vecchio.
- Scelte situazionali (bottoni): [Chiedi scusa] -> reazione calda, nessun flag; [Resta zitto] -> il vecchio sospira, poi parla lui, nessun blocco.
- Oggetti/personaggi interagibili: vecchio -> "Tunica marrone, mani magre, passo incerto. Non fa paura; sembra perso."; tracce -> "Finiscono proprio qui."; spada di legno -> "Ti accorgi di tenerla stretta.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: `esamina vecchio` o `parla vecchio` piu' volte puo' scrivere `seed_curiosita_vecchio=alta`; default `bassa`.
- Uscite / transizione: `parla vecchio` -> P06.
- Note di resa (audio/immagine/styling): Lesmidoom non viene nominato.

### P06 — Il mezzo panino
- Obiettivo narrativo: Realizzare il primo asse D9: dare o non dare il panino.
- Luogo / atmosfera: Bosco, vicino al vecchio.
- Prosa (presente, 2ª persona):  
  Il vecchio guarda il panno che spunta dalla tua tasca. Non lo chiede. Lo nota soltanto. Tu senti il peso del mezzo panino come se fosse diventato piu' grande.
  
  Hai fame, ma lui sembra averne di piu'.
- Azioni sempre disponibili rilevanti qui: `dai panino` equivale al bottone di offerta; `esamina panino` ricorda che e' tutto cio' che resta; `inventario` mostra il panino finche' non viene dato; `parla vecchio` fa dire "Non voglio rubarti la merenda, ragazzo.".
- Scelte situazionali (bottoni): [Offri il panino] -> il vecchio accetta senza fronzoli, mangia piano -> `panino_dato=true`, rimuove `mezzo_panino`; [Tienilo] -> ti stringi nelle spalle, il vecchio non insiste -> `panino_dato=false`.
- Oggetti/personaggi interagibili: mezzo panino -> "Adesso sembra meno tuo."; vecchio -> "Quando mangia, non fa commenti: ha fame davvero.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `panino_dato`.
- Uscite / transizione: Dopo scelta -> P07.
- Note di resa (audio/immagine/styling): Non giudicare esplicitamente il giocatore; mostrare solo gesto e calore/freddezza.

### P07 — La richiesta
- Obiettivo narrativo: Realizzare il secondo asse D9: accompagnare il vecchio o limitarsi a indicare la strada.
- Luogo / atmosfera: Bosco, direzione Mezclar.
- Prosa (presente, 2ª persona):  
  Il vecchio si pulisce le dita sulla tunica e guarda tra gli alberi.
  
  "Vieni dalla citta' vicina, vero? Mi hanno detto che a Mezclar c'e' una mensa per i viandanti. Da solo potrei perdermi. Mi accompagneresti?"
  
  Il sentiero verso casa sembra facile quando lo conosci. Per lui no.
- Azioni sempre disponibili rilevanti qui: `vai mensa` o `accompagna vecchio` sceglie accompagnare; `indica strada` sceglie aiuto minimo; `parla vecchio` fa ripetere la richiesta; `guarda sud` mostra Mezclar lontana.
- Scelte situazionali (bottoni): [Accompagnalo alla mensa] -> `vecchio_accompagnato=true`; se `panino_dato=true`, `aiuto_vecchio=A_panino_accompagna`, altrimenti `C_no_panino_accompagna`; [Indicagli la strada] -> il vecchio insiste: "Un povero anziano non puo' viaggiare da solo, mi sono gia' perso tre volte."; confermando, `vecchio_accompagnato=false`; se `panino_dato=true`, `aiuto_vecchio=B_panino_non_accompagna` e vai a P08, altrimenti `D_no_panino_indica` e vai a P09.
- Oggetti/personaggi interagibili: sentiero -> "Da qui si torna verso i campi."; vecchio -> "Aspetta una risposta con pazienza, ma sembra davvero stanco.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `panino_dato`; scrive `vecchio_accompagnato`, `aiuto_vecchio`.
- Uscite / transizione: Ramo A/C -> P09; ramo B -> P08; ramo D -> P09 con dialogo condensato piu' avanti in mensa.
- Note di resa (audio/immagine/styling): Il vecchio insiste una volta, come baseline originale, ma D9 consente il rifiuto.

### P08 — Il rimorso
- Obiettivo narrativo: Coprire lo scenario B D9: panino dato, non accompagnato, ritorno per senso di colpa, Lesmidoom sparito.
- Luogo / atmosfera: Sentiero verso Mezclar, poi ritorno al punto dell'incontro.
- Prosa (presente, 2ª persona):  
  Cammini verso casa da solo. Hai fatto una cosa buona, ti dici. Gli hai dato il panino. Gli hai indicato la strada.
  
  Dopo pochi passi, il bosco sembra piu' grande di prima. Ti torna in testa la sua voce: "Mi sono gia' perso tre volte."
  
  Quando torni indietro, il vecchio non c'e' piu'. Le tracce dello scoiattolo, le tue impronte, le foglie schiacciate: tutto si mescola. Ti viene caldo alle orecchie.
- Azioni sempre disponibili rilevanti qui: `guarda` descrive il punto vuoto; `chiama vecchio` non riceve risposta; `vai mensa` avanza; `segui tracce` dice che non aiutano piu'.
- Scelte situazionali (bottoni): [Vai alla mensa] -> P09 in modalita' «ritrovato alla mensa», come lo scenario D (cosi' B non salta i beat 10-15 ne' il seme del «mostro affamato»).
- Oggetti/personaggi interagibili: punto vuoto -> "Sembra impossibile che una persona lenta sparisca cosi' in fretta."; tracce confuse -> "Non sai piu' quali siano sue, tue o dello scoiattolo.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `rimorso_tornato=true`; conferma `aiuto_vecchio=B_panino_non_accompagna`.
- Uscite / transizione: P09 (modalita' «ritrovato alla mensa»); B prosegue poi come lo scenario D lungo P09-P13.
- Note di resa (audio/immagine/styling): Senso di colpa infantile, non condanna morale.

### P09 — Verso la mensa
- Obiettivo narrativo: Coprire beat 9 e dare al vecchio una voce da viandante senza rivelazioni.
- Luogo / atmosfera: Sentiero dal bosco a Mezclar; nei rami B/D, ingresso o tavolo della mensa con dialogo condensato.
- Prosa (presente, 2ª persona):  
  Se cammini con lui, il vecchio procede piano e parla a tratti, come se misurasse il fiato. Dice di aver visto strade lunghe, citta' dove nessuno conosce il tuo nome e posti in cui una scodella calda vale piu' di una moneta.
  
  Se lo ritrovi alla mensa, racconta le stesse cose tra un boccone e l'altro. In qualche modo e' arrivato prima di te.
- Azioni sempre disponibili rilevanti qui: `parla vecchio` chiede dei viaggi; `esamina vecchio` nota stanchezza vera; `guarda strada` o `guarda mensa` descrive il contesto in base al ramo; `inventario` mostra assenza/presenza del panino.
- Scelte situazionali (bottoni): [Chiedi dove sta andando] -> "Verso Nylph, se le gambe mi reggono." -> `seed_curiosita_vecchio=alta`; [Ascolta in silenzio] -> nessun flag.
- Oggetti/personaggi interagibili: vecchio -> "Parla poco di se', ma ogni frase sembra venire da lontano."; strada -> "Campi, polvere, Mezclar che si avvicina."; mensa -> "Odore di zuppa e legno caldo.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `aiuto_vecchio`; puo' scrivere `seed_curiosita_vecchio=alta`.
- Uscite / transizione: P10.
- Note di resa (audio/immagine/styling): Per A/C, scena in movimento; per B/D, stessa funzione narrativa spostata alla mensa.

### P10 — La spada di legno
- Obiettivo narrativo: Coprire beat 10-11: il vecchio nota la spada e chiede a cosa serva.
- Luogo / atmosfera: Sentiero o tavolo della mensa, a seconda del ramo.
- Prosa (presente, 2ª persona):  
  Il vecchio abbassa lo sguardo sulla tua spada.
  
  "Bella arma, giovane Ernesto. Anche se e' di legno, la porti come una cosa seria. A cosa serve?"
  
  La domanda sembra facile. Le spade servono a quello. Lo sanno tutti.
- Azioni sempre disponibili rilevanti qui: `esamina spada` ripete la descrizione infantile; `parla vecchio` ripete la domanda; `usa spada` fa fare a Ernesto un piccolo gesto eroico, ma non avanza.
- Scelte situazionali (bottoni): [Serve a combattere i mostri] -> P11.
- Oggetti/personaggi interagibili: spada di legno -> "Quando la impugni, il mondo diventa piu' semplice: tu da una parte, i mostri dall'altra."; vecchio -> "Non ride della tua spada.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: Scelta o comando `parla vecchio` con risposta -> P11.
- Note di resa (audio/immagine/styling): Preparare la rigidita' infantile senza metterla in crisi.

### P11 — I mostri
- Obiettivo narrativo: Coprire beat 12: Ernesto afferma la visione eroica.
- Luogo / atmosfera: Continuazione della conversazione.
- Prosa (presente, 2ª persona):  
  "Serve a combattere i mostri," dici.
  
  Lo dici con la sicurezza delle cose che non hanno ancora avuto bisogno di spiegazioni. Gli eroi combattono i mostri. Gli umani stanno dalla parte degli eroi. E se hai una spada, anche di legno, almeno puoi provarci.
- Azioni sempre disponibili rilevanti qui: `guarda` descrive la reazione calma del vecchio; `parla vecchio` prosegue; `esamina spada` mantiene tono infantile.
- Scelte situazionali (bottoni): Nessuna.
- Oggetti/personaggi interagibili: vecchio -> "Ti ascolta come se la risposta fosse importante, ma non sembra sorpreso."; spada -> "Leggera, tua, coraggiosa.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: Automatico -> P12.
- Note di resa (audio/immagine/styling): Non contraddire Ernesto; non introdurre ambiguita' morale esplicita.

### P12 — Il mostro affamato
- Obiettivo narrativo: Coprire beat 13-15 e salvare il seme del tono della risposta.
- Luogo / atmosfera: Conversazione sospesa; suono della mensa o del sentiero attenuato.
- Prosa (presente, 2ª persona):  
  Il vecchio inclina appena la testa.
  
  "E se il mostro avesse fame?"
  
  La domanda ti resta addosso per un istante. Fame la capisci. Mostro anche. Le due cose insieme no.
- Azioni sempre disponibili rilevanti qui: `parla vecchio` mostra le opzioni; `aspetta` fa dire al vecchio "Rispondi come ti viene."; `inventario` se il panino non e' stato dato lo mostra ancora, ma non apre una nuova donazione qui.
- Scelte situazionali (bottoni): [Lo uccido. E' un mostro.] -> "Vuole mangiare me." -> `seed_mostro_affamato=netto`; [Se viene verso di me, lo uccido.] -> risposta difensiva -> `seed_mostro_affamato=difensivo`; [Prima gli grido di andare via. Poi lo uccido.] -> esitazione infantile minima -> `seed_mostro_affamato=esitante`.
- Oggetti/personaggi interagibili: vecchio -> "Non ti corregge. Non sembra neanche voler vincere la discussione."; spada -> "Ti fa sentire piu' sicuro mentre rispondi.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `seed_mostro_affamato`.
- Uscite / transizione: Dopo scelta -> P13.
- Note di resa (audio/immagine/styling): Qualunque opzione resta dentro la visione bambino: il mostro rimane pericolo, non rivelazione morale.

### P13 — Errol il Liberatore
- Obiettivo narrativo: Coprire beat 16: Lesmidoom parla di Errol come leggenda sospesa.
- Luogo / atmosfera: Ultimo tratto verso Mezclar o tavolo della mensa.
- Prosa (presente, 2ª persona):  
  Il vecchio non dice che hai torto. Si limita a guardare davanti a se'.
  
  "Una volta, nel continente di Vaargal, c'era un eroe. Errol il Liberatore. I bardi lo nominano ancora, ma spesso saltano il pezzo in cui era solo un uomo stanco, con troppa guerra intorno."
  
  Tu conosci quel nome. Errol. Il tipo di nome che sulle bocche degli adulti diventa piu' grande della persona.
- Azioni sempre disponibili rilevanti qui: `parla vecchio` chiede un altro pezzo; `chiedi Errol` accetta come sinonimo; `esamina vecchio` nota che parla con rispetto; `aspetta` lascia il racconto ellittico.
- Scelte situazionali (bottoni): [Chiedi della battaglia] -> il vecchio accenna alla Spada del Lungo Viaggio senza spiegare origine -> `dialogo_errol_ricevuto=true`; [Lascia che il racconto resti li'] -> `dialogo_errol_ricevuto=true`.
- Oggetti/personaggi interagibili: Errol (nome nel testo) -> "Per te e' un eroe. Uno di quelli veri."; vecchio -> "Sembra sapere piu' di quanto dice.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `dialogo_errol_ricevuto=true`; puo' scrivere `seed_curiosita_vecchio=alta`.
- Uscite / transizione: P14.
- Note di resa (audio/immagine/styling): Racconto volutamente incompleto. Non nominare Viaggiatore, Corruttrice o natura profonda di Errol.

### P14 — Arrivo alla mensa
- Obiettivo narrativo: Coprire beat 17-18 e portare tutti i rami D9 nello stesso luogo.
- Luogo / atmosfera: Mensa di Mezclar, luogo civico e comunitario.
- Prosa (presente, 2ª persona):  
  La mensa e' piena dell'odore delle cose semplici: zuppa, pane, legno bagnato lavato troppe volte. Per gli altri e' la mensa di Mezclar. Per te e' il posto di tua madre.
  
  Se arrivi con il vecchio, lui si ferma sulla soglia come chi trova finalmente una sedia. Se non lo hai accompagnato, lo vedi gia' seduto a un tavolo, piu' piccolo di quanto sembrava nel bosco.
- Azioni sempre disponibili rilevanti qui: `guarda` descrive tavoli e persone; `parla Mirea` richiama le abitudini; `parla vecchio` prosegue; `aiuta mensa` porta a P15; `vai fuori` viene dissuaso da Mirea.
- Scelte situazionali (bottoni): [Aiuta come sempre] -> P15; [Resta vicino al vecchio] -> P15 con testo di curiosita' piu' marcato -> `seed_curiosita_vecchio=alta`.
- Oggetti/personaggi interagibili: Mirea -> "Si muove tra i tavoli senza alzare la voce. Tutti sanno che se serve qualcosa, lei lo vede."; vecchio -> "Ora che e' seduto, la stanchezza gli cade addosso."; tavoli -> "Segni di coltelli, ciotole, gomiti, giorni tutti uguali.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `aiuto_vecchio`; puo' scrivere `seed_curiosita_vecchio=alta`.
- Uscite / transizione: P15.
- Note di resa (audio/immagine/styling): Qui convergono A/B/C/D. Variare una riga di Mirea in base al gradiente: A piu' calorosa, D piu' asciutta.

### P15 — Il vecchio mangia
- Obiettivo narrativo: Coprire beat 19-20: il vecchio mangia davvero, Ernesto aiuta ma resta incuriosito.
- Luogo / atmosfera: Tavolo della mensa.
- Prosa (presente, 2ª persona):  
  Il vecchio mangia davvero. Non assaggia per cortesia, non finge. Tiene la ciotola con entrambe le mani e lascia che il calore gli salga fino al viso.
  
  Tu porti pane, sposti ciotole, rispondi quando tua madre ti chiama. Pero' torni sempre vicino a lui. Non sai perche'. Forse perche' nel bosco sembrava perso. Forse perche' adesso non lo sembra piu'.
- Azioni sempre disponibili rilevanti qui: `aiuta mensa` ripete le azioni quotidiane; `parla vecchio` ottiene frasi brevi; `esamina ciotola` mostra concretezza della fame; `parla Mirea` fa notare che Ernesto e' distratto.
- Scelte situazionali (bottoni): [Chiedigli di Nylph] -> "E' lontana. Abbastanza da far male ai piedi." -> `seed_curiosita_vecchio=alta`; [Torna da Mirea] -> Mirea ti affida un piccolo compito, nessun flag.
- Oggetti/personaggi interagibili: ciotola -> "Quasi vuota in fretta."; pane -> "Se hai dato il panino, pensi al panno vuoto; se non lo hai dato, senti il panino ancora in tasca."; Mirea -> "Ti guarda lavorare, poi guarda il vecchio.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `panino_dato`; puo' scrivere `seed_curiosita_vecchio=alta`.
- Uscite / transizione: Quando il vecchio finisce di mangiare -> P16.
- Note di resa (audio/immagine/styling): La fame del vecchio deve validare retroattivamente l'offerta del panino senza punire il rifiuto.

### P16 — Il nome Lesmidoom
- Obiettivo narrativo: Coprire beat 21: il vecchio si presenta davanti a Mirea.
- Luogo / atmosfera: Mensa, davanti a Mirea.
- Prosa (presente, 2ª persona):  
  Tua madre arriva al tavolo e posa una mano sullo schienale della sedia.
  
  "Ernesto, chi e' il nostro ospite?"
  
  Il vecchio si alza quel tanto che riesce. "Signora, il mio nome e' Lesmidoom. Vengo da Phiwen, e nei miei viaggi mi sono ritrovato a passare di qui. Solo per poco."
  
  Lesmidoom. Il nome resta nell'aria piu' a lungo degli altri.
- Azioni sempre disponibili rilevanti qui: `esamina Mirea` nota il primo irrigidimento; `esamina Lesmidoom` mostra compostezza; `parla Mirea` riceve una risposta pratica; `parla Lesmidoom` porta a P17.
- Scelte situazionali (bottoni): Nessuna.
- Oggetti/personaggi interagibili: Lesmidoom -> "Adesso ha un nome, ma non e' diventato piu' facile da capire."; Mirea -> "Per un istante resta immobile.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `lesmidoom_rivelato=true`.
- Uscite / transizione: Automatico o `parla Lesmidoom` -> P17.
- Note di resa (audio/immagine/styling): Mirea non affronta Lesmidoom e non spiega cio' che teme.

### P17 — Quello che Mirea non dice
- Obiettivo narrativo: Coprire beat 22 e iniziare la percezione che qualcosa cambi.
- Luogo / atmosfera: Mensa, rumore intorno attenuato.
- Prosa (presente, 2ª persona):  
  Tua madre non dice nulla di strano. Non arretra, non alza la voce, non fa domande difficili. Ma interrompe un gesto a meta': la mano resta ferma sullo schienale, le dita strette.
  
  Tu lo noti solo perche' conosci le sue mani.
- Azioni sempre disponibili rilevanti qui: `esamina Mirea` rende esplicito il piccolo segnale; `parla Mirea` fa dire "Tutto bene, Ernesto."; `parla Lesmidoom` prosegue.
- Scelte situazionali (bottoni): [Guarda tua madre] -> rafforza la percezione ma non crea nuovo flag; [Guarda Lesmidoom] -> `seed_curiosita_vecchio=alta`.
- Oggetti/personaggi interagibili: mano di Mirea -> "Ferma. Troppo ferma."; Lesmidoom -> "Sembra accorgersene, ma non la costringe a parlare.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Puo' scrivere `seed_curiosita_vecchio=alta`.
- Uscite / transizione: P18.
- Note di resa (audio/immagine/styling): Paura materna, non dottrinale. Nessuna profezia esplicitata.

### P18 — La scelta
- Obiettivo narrativo: Coprire beat 23: Lesmidoom sceglie Ernesto senza spiegare la natura del gesto.
- Luogo / atmosfera: Mensa, tavolo di Lesmidoom.
- Prosa (presente, 2ª persona):  
  Lesmidoom si volta verso di te. Non fa niente di teatrale. Non ti tocca la fronte, non pronuncia parole che fanno tremare le finestre.
  
  Ti guarda soltanto come se, tra tutte le persone nella mensa, avesse trovato proprio quella che stava aspettando senza saperlo.
- Azioni sempre disponibili rilevanti qui: `parla Lesmidoom` fa avvicinare la frase finale; `esamina Lesmidoom` restituisce mistero non spiegato; `aspetta` lascia che sia lui a parlare.
- Scelte situazionali (bottoni): [Resta vicino] -> nessun flag; [Fai un passo indietro] -> Mirea ti guarda, Lesmidoom non insiste, poi P19.
- Oggetti/personaggi interagibili: Lesmidoom -> "Non sembra potente. Sembra certo."; Mirea -> "Vorrebbe dire qualcosa, ma non trova una forma semplice.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno esplicito oltre a `lesmidoom_rivelato` gia' scritto.
- Uscite / transizione: P19.
- Note di resa (audio/immagine/styling): Non nominare seme/reincarnazione/Thusiel.

### P19 — Fai buon viaggio
- Obiettivo narrativo: Coprire beat 24-25: frase chiave davanti a Mirea; Ernesto non sente subito il peso.
- Luogo / atmosfera: Mensa, momento di separazione.
- Prosa (presente, 2ª persona):  
  Lesmidoom si sistema la tunica.
  
  "Le nostre strade si dividono qui, giovane Ernesto. Ti ringrazio."
  
  Poi, davanti a tua madre, aggiunge: "Fai buon viaggio."
  
  Tu pensi che sia un modo elegante per salutare. Tua madre no. O almeno: le sue mani no.
- Azioni sempre disponibili rilevanti qui: `parla Lesmidoom` riceve solo un sorriso stanco; `esamina Mirea` porta a P20; `aspetta` lascia uscire Lesmidoom.
- Scelte situazionali (bottoni): [Rispondi "anche tu"] -> reazione tenera, nessun flag; [Resta zitto] -> la frase resta sospesa, nessun flag.
- Oggetti/personaggi interagibili: frase -> se `esamina frase` o `pensa viaggio`, "Non capisci perche' dovrebbe pesare."; Mirea -> "Si e' fermata di nuovo.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `fai_buon_viaggio_sentito=true`.
- Uscite / transizione: P20.
- Note di resa (audio/immagine/styling): Per Ernesto nessuna esplosione interiore in v1; il peso e' soprattutto su Mirea.

### P20 — Il gesto interrotto
- Obiettivo narrativo: Coprire beat 26: mostrare il segnale visibile di Mirea.
- Luogo / atmosfera: Mensa che riprende il suo rumore.
- Prosa (presente, 2ª persona):  
  Il cucchiaio che tua madre stava per prendere resta sul tavolo. Solo un istante. Poi lei lo afferra, lo porta via, dice a qualcuno che la zuppa e' calda.
  
  Tutto torna normale cosi' in fretta che quasi ti vergogni di averci fatto caso.
- Azioni sempre disponibili rilevanti qui: `parla Mirea` fa dire "Va' a lavarti le mani, Ernesto."; `esamina cucchiaio` sottolinea il gesto interrotto; `guarda uscita` mostra Lesmidoom che se ne va o e' gia' andato.
- Scelte situazionali (bottoni): [Chiedi a Mirea se sta bene] -> "Si', piccolo. Sono solo stanca." -> nessun nuovo flag; [Lascia stare] -> transizione piu' rapida.
- Oggetti/personaggi interagibili: cucchiaio -> "Una cosa normale, ferma in un momento non normale."; porta -> "Lesmidoom non e' piu' li'.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `fai_buon_viaggio_sentito`.
- Uscite / transizione: Fine giornata -> P21.
- Note di resa (audio/immagine/styling): Mantenere quiete, niente musica profetica esplicita.

### P21 — La stanza
- Obiettivo narrativo: Coprire beat 27: micro-scena quotidiana prima del sogno.
- Luogo / atmosfera: Stanza di Ernesto, notte, non carica di destino.
- Prosa (presente, 2ª persona):  
  La tua stanza e' la tua stanza: la coperta piegata male, la spada di legno vicino al letto, il panno del panino se e' rimasto, o solo le briciole se lo hai dato via.
  
  Fuori, tua madre chiude la mensa. Ogni rumore arriva piccolo. Tu ripensi allo scoiattolo, al vecchio, a Errol. Poi il sonno prende tutto senza chiedere permesso.
- Azioni sempre disponibili rilevanti qui: `esamina spada` richiama il gioco; `inventario` mostra oggetti rimasti; `parla Mirea` non disponibile direttamente, risposta: "E' nell'altra stanza."; `dormi` o `aspetta` avanza.
- Scelte situazionali (bottoni): [Dormi] -> P22.
- Oggetti/personaggi interagibili: letto -> "Sa di casa."; spada di legno -> "Domani potrai giocarci ancora."; panno -> varia in base a `panino_dato`.
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `panino_dato`, `dialogo_errol_ricevuto`.
- Uscite / transizione: `dormi` -> P22.
- Note di resa (audio/immagine/styling): Ultima scena calda prima della rottura. Nessuna premonizione esplicita.

### P22 — Il terminale cambia
- Obiettivo narrativo: Coprire beat 28: ingresso nel sogno come rottura tonale.
- Luogo / atmosfera: Transizione letto -> accampamento militare. Freddo, frammentato.
- Prosa (presente, 2ª persona):  
  Apri gli occhi.
  
  Non sei nel letto.
  
  Il testo sul terminale perde calore. Le lettere sembrano piu' sottili, piu' bianche. Per un istante alcune parole arrivano in ritardo, come se qualcuno le stesse battendo da molto lontano.
  
  Fumo. Ferro. Sangue. Una pianura spezzata dal rumore.
- Azioni sempre disponibili rilevanti qui: `guarda` descrive accampamento e campo a nord; `inventario` restituisce "Non trovi la spada di legno. Hai un'arma vera alla cintura."; `aspetta` fa aumentare il rumore della battaglia.
- Scelte situazionali (bottoni): [Apri gli occhi nel sogno] -> P23.
- Oggetti/personaggi interagibili: terminale -> "Non e' un oggetto del mondo, ma reagisce: freddo, instabile."; fumo -> "Brucia gli occhi.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: P23.
- Note di resa (audio/immagine/styling): Applicare classe UI `dream-mode`: palette fredda grigio-blu, lieve glitch testuale, input cursor piu' rigido.

### P23 — Un corpo adulto
- Obiettivo narrativo: Coprire beat 29: Ernesto abita un corpo adulto, ferito, armato.
- Luogo / atmosfera: Accampamento militare vicino al campo di battaglia.
- Prosa (presente, 2ª persona):  
  Sei in piedi, ma il corpo non e' il tuo. Troppo alto. Troppo pesante. Le mani hanno calli che non riconosci. Il braccio fa male dove non dovrebbe. L'armatura e' di metallo pregiato, sporca di sangue, con uno stemma sul petto.
  
  A est, un fabbro affila lame circondato da soldati. A nord, la battaglia divora il cielo.
- Azioni sempre disponibili rilevanti qui: `esamina corpo` descrive estraneita' senza rivelare identita'; `esamina armatura` nota lo stemma dell'esercito; `parla fabbro` porta alla coordinazione; `vai nord` sceglie il ramo da solo; `guarda nord` descrive guerra.
- Scelte situazionali (bottoni): [Parla col fabbro e i soldati] -> `sogno_bivio=coordinato`, `sogno_perdite=ridotte`, P24; [Corri subito a nord] -> `sogno_bivio=solo`, `sogno_perdite=alte`, P25.
- Oggetti/personaggi interagibili: fabbro -> "Mani nere, braccia stanche, voce dura."; soldati -> "Aspettano un ordine, o una scusa per muoversi."; armatura -> "Raffinata, non tua."; campo a nord -> "Li' Errol ha bisogno di noi, grida qualcuno.".
- Combattimento (se presente): Nessuno in scena; scelta avvia matrice D13.
- Flag letti/scritti: Scrive `sogno_bivio`, `sogno_perdite`.
- Uscite / transizione: Coordinato -> P24; solo -> P25.
- Note di resa (audio/immagine/styling): Se `parla fabbro`: un soldato dice "Errol ha bisogno di noi"; se `vai nord`: la stessa informazione arriva piu' tardi e peggio.

### P24 — Coordinarsi
- Obiettivo narrativo: Realizzare il ramo coordinato D13: scorta, perdite ridotte, primo scontro saltato.
- Luogo / atmosfera: Accampamento, poi bordo del campo.
- Prosa (presente, 2ª persona):  
  Il fabbro ti vede muovere.
  
  "Finalmente ti sei ripreso. Errol ha bisogno della sua Spada. Se vai, non vai da solo."
  
  I soldati si stringono intorno a te. Non sembrano salvi. Sembrano pronti.
  
  Quando tre nemici sbarrano la strada, due uomini della scorta avanzano prima che tu possa decidere. "Qui ci pensiamo noi. Tu trova la Spada."
- Azioni sempre disponibili rilevanti qui: `parla soldati` riceve ordine di proseguire; `esamina nemici` mostra che la scorta li ingaggia; `vai est` o `prosegui` porta alla ricerca tracce; `vai nord` viene corretto: "Non di li', il fronte e' chiuso.".
- Scelte situazionali (bottoni): [Lascia che la scorta apra il passaggio] -> `sogno_primo_scontro=saltato`, P26.
- Oggetti/personaggi interagibili: scorta -> "Non ti copre per eroismo elegante. Ti copre per necessita'."; tre nemici -> "Corpi grandi, rabbia vicina, armi sollevate."; fabbro -> "Resta indietro, gia' tornato al lavoro.".
- Combattimento (se presente): Rimando a `mechanics/combat.md` §5: ramo coordinato salta lo scontro dei 3 nemici.
- Flag letti/scritti: Legge `sogno_bivio=coordinato`; scrive `sogno_primo_scontro=saltato`.
- Uscite / transizione: P26.
- Note di resa (audio/immagine/styling): Conseguenza visibile: meno morti intorno a Ernesto, ma non assenza di guerra.

### P25 — Da solo
- Obiettivo narrativo: Realizzare il ramo solo D13: perdite alte, scontro perdibile coi 3 nemici, eventuale rianimazione.
- Luogo / atmosfera: Campo di battaglia senza scorta preparata.
- Prosa (presente, 2ª persona):  
  Corri a nord senza aspettare nessuno. La strada e' fango scavato da carri e piedi. La battaglia ti viene incontro prima che tu capisca dove guardare.
  
  Tre nemici ti sbarrano la via. Intorno a te alcuni soldati cambiano direzione per coprirti. Uno cade subito. Un altro urla il nome di Errol e si getta avanti.
  
  La scelta e' gia' diventata costo.
- Azioni sempre disponibili rilevanti qui: `esamina nemici` mostra aperture; `attacca <apertura>` combatte; `parla soldato` fa gridare "Cerca la Spada del Lungo Viaggio!"; `fuggi` conta come errore; `aiuto` mostra aperture disponibili.
- Scelte situazionali (bottoni): Aperture combattimento: [attacca ginocchia primo nemico], [attacca fianco secondo nemico], [attacca braccio terzo nemico]. Due errori complessivi -> sconfitta morbida.
- Oggetti/personaggi interagibili: tre nemici -> "Creature alte, verdastre, troppo vicine. Il narratore le chiama nemici; un soldato alle tue spalle grida 'orchi!' con odio."; soldati caduti -> "Non guardarli troppo a lungo."; spada vera -> "Pesante, sporca, necessaria.".
- Combattimento (se presente): `ScontroTreNemici.initial`; scontro perdibile da `mechanics/combat.md` §2, §5 e §5-ter. Aperture sempre visibili: ginocchia, fianco, braccio. Ogni bersaglio corretto elimina un nemico; azione sbagliata/esitazione/fuga = 1 errore. A 2 errori: `sogno_rianimato=true`, `sogno_primo_scontro=rianimato`, ritorno a P23. Vittoria: `sogno_primo_scontro=vinto`, P26.
- Flag letti/scritti: Legge `sogno_bivio=solo`; scrive `sogno_perdite=alte`, `sogno_primo_scontro`, eventualmente `sogno_rianimato=true`.
- Uscite / transizione: Vittoria -> P26; sconfitta morbida -> P23 con breve testo di rianimazione.
- Note di resa (audio/immagine/styling): Nessun game over. La rianimazione e' fredda: buio, voce lontana, ritorno all'accampamento.

### P26 — Il campo e le tracce
- Obiettivo narrativo: Avviare il recupero della Spada: esplorazione del campo, direzione corretta verso est.
- Luogo / atmosfera: Campo di battaglia piu' aperto, caos controllabile per un istante.
- Prosa (presente, 2ª persona):  
  Il campo e' pieno di corpi, ferro e fango. Il rumore non sta intorno a te: ti attraversa.
  
  Un soldato indica una zona piu' sgombra a est. "Errol e' passato di li'. Dove lui avanza, i nemici cadono."
  
  Devi trovare una traccia. Qualcosa che appartenga a Errol. Qualcosa che porti alla Spada.
- Azioni sempre disponibili rilevanti qui: `guarda nord` mostra fronte troppo fitto; `guarda est` mostra percorso piu' sgombro; `vai est` avanza; `esamina terreno` prepara il medaglione; `vai sud` risponde "L'accampamento e' alle spalle. Non ora."; `vai ovest` e `vai nord` vengono bloccati da combattimenti fuori scope, con invito a est.
- Scelte situazionali (bottoni): [Esamina il terreno] -> P27; [Vai a est] -> P27 ma senza bonus di osservazione.
- Oggetti/personaggi interagibili: terreno -> "Sangue, impronte, segni di trascinamento."; soldato -> "Ha paura, ma la tiene dietro ai denti."; est -> "Meno nemici. Piu' cadaveri.".
- Combattimento (se presente): Nessuno, salvo blocchi narrativi se il giocatore forza nord/ovest.
- Flag letti/scritti: Legge `sogno_bivio`, `bosco_tracce_osservate`.
- Uscite / transizione: P27.
- Note di resa (audio/immagine/styling): Se `sogno_bivio=solo`, aggiungere una riga sui compagni morti per coprire Ernesto.

### P27 — Il medaglione
- Obiettivo narrativo: Coprire elemento sogno "medaglione" e agganciare le tracce verso la Spada.
- Luogo / atmosfera: Zona piu' sgombra del campo.
- Prosa (presente, 2ª persona):  
  A pochi passi da te, quasi sepolto nel fango, c'e' un medaglione. Oro sporco, argento vivo, sangue fresco nelle incisioni.
  
  Quando lo raccogli, leggi un nome: Errol.
  
  Un soldato trattiene il fiato. "E' suo. Guarda li': le tracce."
- Azioni sempre disponibili rilevanti qui: `prendi medaglione` obbligatorio per avanzare; `esamina medaglione` descrive nome e stemma; `esamina tracce` mostra scie di sangue verso nord; `segui tracce` avanza.
- Scelte situazionali (bottoni): [Raccogli il medaglione] -> `medaglione_errol_preso=true`; [Segui le tracce di sangue] -> P28, disponibile dopo il medaglione.
- Oggetti/personaggi interagibili: medaglione -> "Il nome di Errol inciso con cura. Non sembra una cosa da perdere."; tracce di sangue -> se `bosco_tracce_osservate=true`: "Per un attimo pensi alle zampette dello scoiattolo. Una pista e' una pista. Poi ricordi che questa e' fatta di sangue."; stemma -> "Lo stesso dell'armatura che indossi.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `medaglione_errol_preso=true`; legge `bosco_tracce_osservate`.
- Uscite / transizione: `segui tracce` -> P28.
- Note di resa (audio/immagine/styling): Questo e' il payoff dell'esplorazione bosco, piccolo e sensoriale.

### P28 — La creatura con la Spada
- Obiettivo narrativo: Coprire recupero della Spada e tutorial combattimento: la creatura malferma impugna la Spada del Lungo Viaggio.
- Luogo / atmosfera: Tracce verso nord, varco tra corpi e fumo.
- Prosa (presente, 2ª persona):  
  Le tracce finiscono dove il fumo si apre.
  
  Una creatura ti sbarra la strada. E' alta, verdastra, sporca di sangue non tutto suo. Nella mano sinistra tiene un'arma che non appartiene al suo corpo, ne' al suo modo di muoversi: una spada lucente, umana, troppo preziosa per quel fango.
  
  La Spada del Lungo Viaggio.
  
  La creatura e' stanca. Le ginocchia cedono. Il fianco resta scoperto quando solleva la lama.
- Azioni sempre disponibili rilevanti qui: `esamina nemico` ripete aperture; `attacca ginocchia` o `attacca fianco` chiude pulito; `attacca testa`, `fuggi`, `aspetta` o bersagli non suggeriti causano allarme; `aiuto` mostra aperture.
- Scelte situazionali (bottoni): [attacca ginocchia] -> colpo pulito, `orco_allarme=false`, `colpo_tutorial=ginocchia`, P29; [attacca fianco] -> colpo pulito, `orco_allarme=false`, `colpo_tutorial=fianco`, P29; scelta errata testuale -> la creatura urla, `orco_allarme=true`, `colpo_tutorial=maldestro_non_finale`, poi obbliga a scegliere [attacca ginocchia] o [attacca fianco] per finirla e andare a P29.
- Oggetti/personaggi interagibili: creatura -> "Non riesci a guardarla bene. I sensi sono troppo lenti. Sai solo che e' nemica."; Spada del Lungo Viaggio -> "La lama sembra trattenere luce anche sotto il cielo plumbeo."; ginocchia -> "Cedono a ogni passo."; fianco -> "Scoperto quando la creatura alza la lama.".
- Combattimento (se presente): `TutorialOrcoSpada`, da `mechanics/combat.md` §5-bis. L'avversario muore comunque. Colpo su apertura = niente allarme; errore = allarme e rinforzi dopo il recupero. Nessun HP.
- Flag letti/scritti: Scrive `orco_allarme`, `colpo_tutorial`.
- Uscite / transizione: P29.
- Note di resa (audio/immagine/styling): Non usare riferimenti a Eireen o Accademia. In prose e descrizioni del narratore usare "creatura/nemico"; "orco" puo' comparire solo se un soldato grida in dialogo.

### P29 — La Spada recuperata
- Obiettivo narrativo: Completare beat 30: Ernesto prende la Spada del Lungo Viaggio e la matrice decide se arrivano rinforzi.
- Luogo / atmosfera: Cadavere della creatura, campo ancora in movimento.
- Prosa (presente, 2ª persona):  
  La creatura cade. La lingua in cui impreca non assomiglia a niente che tu conosca. Poi anche quella si spegne.
  
  La Spada resta nella sua mano sinistra per un istante di troppo. Devi piegarti per prenderla. Quando le tue dita chiudono l'elsa, il freddo ti sale fino al gomito.
- Azioni sempre disponibili rilevanti qui: `prendi spada` obbligatorio; `esamina spada` descrive fattura pregiata; `esamina cadavere` resta sfocato, niente dettagli lore; `parla soldato` se presente grida di portarla a Errol.
- Scelte situazionali (bottoni): [Prendi la Spada] -> `spada_lungo_viaggio_recuperata=true`; se `orco_allarme=false` -> P31; se `orco_allarme=true` -> P30.
- Oggetti/personaggi interagibili: Spada del Lungo Viaggio -> "Non e' tua. Lo senti prima ancora di pensarlo."; cadavere -> "Troppo vicino, troppo reale, eppure il sogno lo sfoca."; tracce -> "Finiscono qui.".
- Combattimento (se presente): Nessuno in questa scena; transizione condizionale a rinforzi.
- Flag letti/scritti: Legge `orco_allarme`; scrive `spada_lungo_viaggio_recuperata=true`.
- Uscite / transizione: No allarme -> P31; allarme -> P30.
- Note di resa (audio/immagine/styling): Breve effetto terminale sulla parola "Spada": lieve bagliore o enfasi, non UI 2D completa.

### P30 — Rinforzi
- Obiettivo narrativo: Realizzare secondo effetto D13: se la creatura ha dato l'allarme, arrivano tre nemici prima della consegna.
- Luogo / atmosfera: Varco verso Errol, improvvisamente richiuso.
- Prosa (presente, 2ª persona):  
  L'urlo della creatura non muore con lei.
  
  Tre nemici emergono dal fumo e si mettono tra te e il punto in cui i soldati indicano Errol. La Spada pesa nella tua mano come se sapesse di essere in ritardo.
- Azioni sempre disponibili rilevanti qui: `esamina nemici` mostra aperture; `attacca <apertura>` combatte; `parla soldato` ottiene "Non farli passare!"; `fuggi` conta come errore; `aiuto` mostra aperture.
- Scelte situazionali (bottoni): Aperture combattimento: [attacca ginocchia], [attacca fianco], [attacca braccio]. Due errori complessivi -> sconfitta morbida.
- Oggetti/personaggi interagibili: nemici -> "Stanchi anche loro, ma abbastanza vicini da fermarti."; Spada -> "Non puoi perderla."; direzione di Errol -> "Ovest, tra fumo e urla.".
- Combattimento (se presente): `ScontroTreNemici.rinforzi`; stesso contratto del P25. A 2 errori: `sogno_rianimato=true`, `rinforzi_post_orco=rianimato`, ritorno a P23. Vittoria: `rinforzi_post_orco=vinti`, P31.
- Flag letti/scritti: Legge `orco_allarme=true`; scrive `rinforzi_post_orco`, eventualmente `sogno_rianimato=true`.
- Uscite / transizione: Vittoria -> P31; sconfitta morbida -> P23.
- Note di resa (audio/immagine/styling): Se il giocatore viene rianimato, mantiene memoria di fallimento solo come `sogno_rianimato=true`; il sogno puo' essere rigiocato.

### P31 — Errol e la consegna
- Obiettivo narrativo: Coprire beat 31: consegnare la Spada a Errol e mostrare l'unica immagine 2D prevista.
- Luogo / atmosfera: Centro della battaglia; Errol sanguinante affronta il capo nemico.
- Prosa (presente, 2ª persona):  
  Lo vedi tra il fumo: Errol.
  
  Non e' pulito come nelle storie. E' in ginocchio, sanguinante, quasi piegato dal peso della battaglia. Davanti a lui, il capo nemico incombe come una fine.
  
  I soldati intorno a te urlano. Alcuni cadono per aprirti un varco. Tu sollevi la Spada del Lungo Viaggio.
- Azioni sempre disponibili rilevanti qui: `dai spada`, `lancia spada`, `usa spada con Errol` consegnano; `esamina Errol` descrive eroe provato; `esamina capo nemico` resta generico e minaccioso; `aspetta` fa aumentare il rischio ma non fallisce.
- Scelte situazionali (bottoni): [Lancia la Spada a Errol] -> immagine climax, `spada_consegnata_errol=true`, P32.
- Oggetti/personaggi interagibili: Errol -> "Eroe umano, vivo solo perche' non ha ancora accettato di cadere."; capo nemico -> "Sagoma grande, feroce. Il suo nome non ti arriva ancora."; Spada -> "Ora sai a chi deve arrivare.".
- Combattimento (se presente): Nessuno; scena di consegna.
- Flag letti/scritti: Legge `sogno_bivio`, `orco_allarme`, `rinforzi_post_orco`; scrive `spada_consegnata_errol=true`.
- Uscite / transizione: P32.
- Note di resa (audio/immagine/styling): Mostrare immagine 16:9 definita in `art/scenes/sogno-consegna-spada.md`. Volto del soldato/Ernesto adulto non visibile; registro cromatico sogno freddo desaturato con accento rosso-sangue.

### P32 — La vittoria di Errol
- Obiettivo narrativo: Coprire beat 32: Errol vince, scena epica dal punto di vista mitico di Ernesto.
- Luogo / atmosfera: Campo di battaglia al climax.
- Prosa (presente, 2ª persona):  
  Errol afferra la Spada al volo.
  
  Per un istante il campo sembra trattenere il respiro. Poi lui si rialza. Sangue, polvere, metallo: tutto gli resta addosso, ma non lo tiene piu' giu'.
  
  Si scaglia contro il capo nemico. Un nome ti affiora dal nulla, e non sai perche' lo riconosci: Grumlok. La lama disegna una linea chiara nel fumo. Il corpo enorme crolla.
  
  Le grida degli umani salgono verso il cielo. I nemici arretrano. Qualcuno urla che la guerra e' finita, che il continente e' libero, che Errol ha vinto.
  
  Tu gli credi.
- Azioni sempre disponibili rilevanti qui: `guarda` ripete il quadro epico; `esamina Errol` mostra l'eroe come mito; `esamina nemici` li descrive in ritirata, senza umanizzarli; `aspetta` porta alla dissolvenza.
- Scelte situazionali (bottoni): [Lascia che il sogno si chiuda] -> P33.
- Oggetti/personaggi interagibili: Errol -> "Il Liberatore, come nelle storie."; campo -> "La battaglia si spezza in urla e fumo."; Spada -> "Nelle mani di Errol sembra essere sempre stata li'.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `spada_consegnata_errol=true`.
- Uscite / transizione: P33.
- Note di resa (audio/immagine/styling): Epico, non ambiguo. Non svelare la verita' su Errol o sugli orchi.

### P33 — Buio
- Obiettivo narrativo: Coprire transizione dal sogno al risveglio.
- Luogo / atmosfera: Campo che si dissolve, terminale che perde segnale.
- Prosa (presente, 2ª persona):  
  Le urla diventano un fischio.
  
  Il fischio diventa freddo.
  
  Perdi il peso dell'armatura. Perdi la Spada. Perdi le mani grandi, il sangue, il fumo.
  
  Rimane il buio.
- Azioni sempre disponibili rilevanti qui: `aspetta` o qualunque input semplice avanza; `inventario` restituisce output corrotto: "vuoto / non tuo / vuoto"; `guarda` dice "buio".
- Scelte situazionali (bottoni): [Svegliati] -> P34.
- Oggetti/personaggi interagibili: buio -> "Non ha bordi."; corpo -> "Sta diventando di nuovo piccolo.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: P34.
- Note di resa (audio/immagine/styling): Glitch terminale breve; poi rimozione progressiva di `dream-mode`.

### P34 — Il risveglio
- Obiettivo narrativo: Coprire beat 33: Ernesto si sveglia nella sua stanza.
- Luogo / atmosfera: Stanza di Ernesto, mattina o primo chiarore, quiete dopo il sogno.
- Prosa (presente, 2ª persona):  
  Ti svegli di colpo.
  
  La stanza e' ancora tua. La coperta e' attorcigliata alle gambe. La spada di legno e' dove l'hai lasciata. Non c'e' fumo. Non c'e' ferro. Non c'e' Errol.
  
  Il cuore, pero', continua a correre come se il campo fosse appena fuori dalla finestra.
- Azioni sempre disponibili rilevanti qui: `guarda` descrive stanza normale; `inventario` torna a oggetti reali; `esamina spada legno` contrasta con la Spada del sogno; `aspetta` fa notare fastidio al braccio.
- Scelte situazionali (bottoni): [Riprendi fiato] -> P35.
- Oggetti/personaggi interagibili: letto -> "Caldo, reale."; spada di legno -> "Piccola. Quasi buffa."; finestra -> "Luce normale.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Nessuno.
- Uscite / transizione: P35.
- Note di resa (audio/immagine/styling): Terminale torna caldo, ma piu' silenzioso.

### P35 — Il segno sul braccio sinistro
- Obiettivo narrativo: Coprire beat 34: Ernesto nota da solo il segno sul braccio sinistro.
- Luogo / atmosfera: Stanza, intima, misteriosa.
- Prosa (presente, 2ª persona):  
  Ti gratta il braccio sinistro.
  
  Tiri su la manica pensando a un graffio, magari fatto dormendo o giocando nei prati. Sulla pelle c'e' un segno che prima non c'era. Piccolo. Vago. Non sembra una ferita aperta, ma nemmeno un livido normale.
  
  Lo tocchi con un dito. Non fa male. Questo lo rende peggiore.
- Azioni sempre disponibili rilevanti qui: `esamina segno` descrive forma vaga senza definirla; `tocca segno` scrive curiosita' osservativa; `copri segno` scrive curiosita' nascosta; `parla Mirea` non ancora, lei e' fuori; `inventario` normale.
- Scelte situazionali (bottoni): [Guardalo meglio] -> `seed_curiosita_segno=osserva`; [Copri il braccio] -> `seed_curiosita_segno=nasconde`; [Decidi che e' un graffio] -> `seed_curiosita_segno=minimizza`.
- Oggetti/personaggi interagibili: segno -> "La forma non si lascia nominare. Potrebbe essere quasi qualunque cosa, e proprio per questo continui a guardarla."; braccio sinistro -> "La pelle e' tua, il segno no."; manica -> "Puo' coprirlo in fretta.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Scrive `segno_notato=true`, `seed_curiosita_segno`.
- Uscite / transizione: Dopo scelta -> P36.
- Note di resa (audio/immagine/styling): Registro misterioso: un solo elemento fuori palette sul segno se visualizzato; forma non definitiva.

### P36 — La chiamata di Mirea
- Obiettivo narrativo: Coprire beat 35-36: Mirea non vede subito il segno, chiama da fuori, chiusura del prologo.
- Luogo / atmosfera: Stanza di Ernesto, voce di Mirea dalla casa.
- Prosa (presente, 2ª persona):  
  "Ernesto?"
  
  La voce di tua madre arriva da fuori stanza, normale e vicina. "Sei sveglio?"
  
  Tu abbassi la manica. O forse no. Per un momento resti tra la voce di Mirea e il segno sul braccio, tra la stanza piccola e il campo enorme che hai appena sognato.
  
  Poi rispondi.
  
  Il prologo finisce qui.
- Azioni sempre disponibili rilevanti qui: `rispondi Mirea` chiude; `esamina segno` consentito una volta prima della chiusura; `copri segno` se non gia' scelto imposta `seed_curiosita_segno=nasconde`; `aspetta` fa ripetere la chiamata.
- Scelte situazionali (bottoni): [Rispondi a Mirea] -> `prologo_completato=true`; [Guarda ancora il segno] -> torna alla descrizione breve, poi richiede risposta.
- Oggetti/personaggi interagibili: Mirea (voce) -> "Non e' nella stanza. Non vede il segno."; porta -> "Chiusa, ma non per molto."; segno -> "Sempre li'.".
- Combattimento (se presente): Nessuno.
- Flag letti/scritti: Legge `segno_notato`, `seed_curiosita_segno`; scrive `prologo_completato=true`.
- Uscite / transizione: Schermata finale: "Fine del Prologo". Save automatico consigliato.
- Note di resa (audio/immagine/styling): Mirea non vede il segno in v1. Chiusura quieta, non trailer esplicativo.

## Matrice del sogno

La sequenza P23-P31 implementa D13:

| `sogno_bivio` | `orco_allarme` | Sequenza | Esito |
|---|---|---|---|
| `coordinato` | `false` | P24 -> P26 -> P27 -> P28/P29 -> P31 | Canon, 1 scontro: solo tutorial creatura con Spada |
| `coordinato` | `true` | P24 -> P26 -> P27 -> P28/P29 -> P30 -> P31 | Medio, 2 scontri: tutorial + rinforzi |
| `solo` | `false` | P25 -> P26 -> P27 -> P28/P29 -> P31 | Medio, 2 scontri: tre nemici + tutorial |
| `solo` | `true` | P25 -> P26 -> P27 -> P28/P29 -> P30 -> P31 | Difficile, 3 scontri: tre nemici + tutorial + rinforzi |

Due errori negli scontri P25 o P30 causano sconfitta morbida e rianimazione all'accampamento (ritorno a P23), mai game over duro.

## Domande aperte

- Forma precisa del segno: resta volutamente vaga; non definirla nel blueprint.
- Aspetto fisico di Errol: risolto, ancora visiva in `art/characters/errol.md` (occhi grigio-ferro, biondo cenere spento, cicatrice sullo zigomo destro, armatura fredda consumata). Nel sogno puo' essere piu' sanguinante e provato, ma resta riconoscibile.
- Nome del capo nemico del sogno: risolto, e' **Grumlok** (recepito in `characters/errol.md`); nel sogno il nome affiora a Ernesto al momento della decapitazione (P32).
- Dettagli sul primo indizio lasciato da Errol e su chi dona la Spada a Errol: fuori scope del prologo v1, non spiegare.
- Forma precisa di Lesmidoom (eco, avatar, frammento): non chiarire nel prologo.
