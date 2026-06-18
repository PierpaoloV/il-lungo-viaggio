# Meccanica — Combattimento (spec riferibile)

Spec riutilizzabile del combattimento di *Il Lungo Viaggio*. Va **referenziata** ogni volta che si progetta un nuovo scontro, così la meccanica resta coerente. Non è canone narrativo (cartella `mechanics/`, fuori dalla bibbia).

Origine: il combattimento del sogno del prologo (fonte `old/Ambientazione/Storia/Lo Strano Sogno.docx`), generalizzato.

Ultimo aggiornamento: 2026-06-18.

---

## 1. Principi di design

- **Leggibile, non a indovinello.** Il testo **mostra le aperture** del nemico (es. "il fianco è scoperto, le ginocchia cedono"). Il giocatore sceglie *dove* colpire tra opzioni già suggerite → niente guess-the-verb in un momento di tensione (coerente con D3).
- **Visibilità delle aperture scalabile (regola futura).** Nel **tutorial** le aperture sono **sempre** mostrate, per insegnare. In futuro la loro visibilità **scala**: più il protagonista **conosce** quel tipo di nemico e più è **intelligente** (stat, v2), più aperture vede; un nemico ignoto o un Ernesto poco sveglio ne mostra poche o nessuna.
- **Cinematografico più che simulativo.** Ogni scelta produce una **risposta narrativa ricca**, non numeri a schermo. Nessuna barra HP.
- **Coerente con l'input ibrido.** Si gioca col parser (`attacca fianco`, `esamina nemico`) **e** con bottoni-affordance per le aperture disponibili.

## 2. Modello v1 — vincere e perdere senza stat

In v1 non ci sono stat: la **posta in gioco è la lettura del nemico**.

- Le **aperture mostrate sono le risposte giuste**: colpirle → esito riuscito.
- **Agire male** (colpire dove non c'è apertura, esitare, fuggire) → **danno narrativo** (solo testo) + un monito che rimanda alle aperture.
- Due tipi di conseguenza dell'errore, a seconda dello scontro (§5):
  - negli **scontri perdibili** (i 3 nemici): **due errori → sconfitta morbida → rianimato** all'accampamento (da scope, nessun game over duro);
  - nel **tutorial** (l'orco con la Spada): l'errore non ti uccide, fa **chiamare rinforzi** all'orco → aggiunge uno scontro.

Niente numeri, niente HP a schermo: danno e sconfitta sono raccontati.

## 3. Struttura di uno scontro (contratto)

Un `Combattimento` è definito da:

- **nemico**: descrittore + tono.
- **aperture**: lista di bersagli leggibili, ciascuno con `nome`, `indizio` narrativo, `esito`, e `seed_flag` *(opzionale, solo tutorial — §6)*.
- **risoluzione**: nel **tutorial** una **chiusura rapida** (vedi §5-bis); negli scontri *multi-bersaglio* più aperture/nemici in sequenza.
- **sconfitta / conseguenza dell'errore**: per gli scontri perdibili = 2 errori → rianimazione; per il tutorial = allarme + scontro aggiuntivo.
- **post-combattimento**: aggancio narrativo.

## 4. Loop di gioco

1. **Incontro**: il nemico si para davanti, il testo lo descrive.
2. **Osserva** (`esamina nemico`): il testo evidenzia le **aperture** disponibili.
3. **Scegli il bersaglio** (parser o bottone): `attacca <apertura>`.
4. **Esito**: descrizione ricca; se multi-bersaglio si ripresenta una nuova apertura; se tutorial, si chiude (o scatta l'allarme). Azione sbagliata → conseguenza secondo §2.
5. **Chiusura**: aggancio narrativo.

## 5. I combattimenti del sogno (esito di DUE scelte)

Il numero e la durezza degli scontri dipendono da **due bivi** indipendenti:

- **Bivio 1 — ti coordini o vai da solo?** (all'accampamento)
  - *Coordini*: la scorta affronta i primi 3 nemici per te ("qui ci pensiamo noi") → **salti** quel combattimento, meno perdite.
  - *Da solo*: combatti tu i **3 nemici** → scontro *perdibile* (2 errori → rianimato), i compagni muoiono per coprirti, parte il trigger "le tue scelte contano".
- **Bivio 2 — come chiudi l'orco con la Spada?** (il tutorial, comune a tutti)
  - *Pulito* (colpisci il punto debole): lo uccidi prima che reagisca → niente allarme.
  - *Maldestro* (sbagli bersaglio): l'orco fa in tempo a **chiamare rinforzi** → **+1 scontro coi 3 nemici** che cercano di impedirti di consegnare la Spada a Errol.

### Matrice dei quattro scenari

| | Orco chiuso **pulito** | Orco **maldestro** (allarme) |
|---|---|---|
| **Coordini** | **canon** — 1 scontro (solo l'orco) | **medio** — 2 scontri (orco → +3 nemici) |
| **Da solo** | **medio** — 2 scontri (3 nemici → orco) | **difficile** — 3 scontri (3 nemici → orco → +3 nemici) |

Sequenze:
- **Canon:** coordini → medaglione → orco (esamina + punto debole) → doni la Spada. *(1 scontro)*
- **Medio A:** coordini → medaglione → orco (colpisci male, avverte i nemici) → uccidi orco, prendi Spada → 3 nemici → doni la Spada. *(2 scontri)*
- **Medio B:** vai da solo → 3 nemici → medaglione → orco (esamina + punto debole) → doni la Spada. *(2 scontri)*
- **Difficile:** vai da solo → 3 nemici → orco (colpisci male, allarme) → 3 nemici → doni la Spada. *(3 scontri)*

L'orco con la Spada **muore comunque** (è malfermo): il Bivio 2 non decide *se* lo uccidi, ma *se fa in tempo ad allertare* i rinforzi.

## 5-bis. Il combattimento-tutorial (l'orco con la Spada)

1. **Comparsa**: l'orco ti sbarra la strada, impugna la Spada nella mano sinistra; è stanco e malfermo per i molti scontri.
2. **Osserva**: `esamina nemico` (o automatico) → il testo **mostra le aperture** ("le ginocchia cedono", "il fianco è scoperto") + bottoni [attacca ginocchia] / [attacca fianco].
3. **Chiusura**: l'orco regge **un paio di colpi**.
   - colpisci un'**apertura** → lo finisci **pulito**, prima che reagisca → niente allarme. Salvi il **flag** di stile, prendi la Spada.
   - sbagli bersaglio (`attacca testa`, esiti, `fuggi`) → l'orco **urla e chiama rinforzi**; lo uccidi comunque al colpo dopo e prendi la Spada, ma ora **3 nemici** arrivano a sbarrarti la strada verso Errol (scontro perdibile, §5).
4. **Flag di stile** (in base al colpo che lo uccide):
   - `ginocchia`: ti abbassi sotto il fendente, passi alle spalle, gli tranci la gamba → cade dissanguato. → `seed_flag` *tattica/intelligenza*.
   - `fianco`: stessa schivata, poi colpo diretto al torace/cuore → cade in ginocchio. → `seed_flag` *forza*.

> Nota di scena: nel prologo a 10 anni si **sfumano** i riferimenti dell'originale a Eireen e all'Accademia mentre si osserva la creatura (memoria dell'Ernesto adulto, fuori posto a quest'età). Vedi D11.

## 5-ter. Lo scontro dei 3 nemici (multi-bersaglio)

Usato in due punti del sogno: il **ramo solitario** (blueprint P25) e i **rinforzi dopo l'allarme** (blueprint P30). Regole:

- Tre nemici, **un'apertura ciascuno** tra `ginocchia`, `fianco`, `braccio`.
- Colpire l'apertura giusta **elimina** quel nemico.
- Azione fuori bersaglio, esitazione o fuga = **1 errore**.
- **Due errori** → sconfitta morbida → rianimato all'accampamento (mai game over duro).
- Aperture **sempre visibili** in v1 (§1). **Nessun** `seed_flag`: solo il tutorial semina (§6).

## 6. Aggancio alle stat / flag

> Regola (D11): **solo il combattimento-tutorial** registra qualcosa; gli altri combattimenti **no**.
>
> **v1 vs v2:** il sistema di stat è rimandato alla **v2**. In **v1** il tutorial **salva solo il flag** dello stile di colpo (`ginocchia` vs `fianco`). La **v2** mapperà il flag su stat (candidate: ginocchia → intelligenza, fianco → forza) e userà l'intelligenza per la regola di visibilità delle aperture (§1).

## 7. Scontri futuri — contratto di riuso

1. Definisci un `Combattimento` secondo §3 (nemico, aperture leggibili, esiti).
2. Riusa il loop §4 e l'input ibrido.
3. **Non** assegnare `seed_flag` se non è il tutorial (regola §6).
4. Scegli una conseguenza dell'errore adatta al contesto (sconfitta morbida, allarme, o altro).
5. Applica la regola di visibilità delle aperture (§1) in base a conoscenza del nemico + intelligenza.

## 8. Punti aperti

- Fail-state fuori dal prologo.
- Formula esatta della visibilità delle aperture (conoscenza + intelligenza) in v2.
