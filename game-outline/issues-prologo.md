# Issue del Prologo (v1) — fette verticali

Specchio nel repo delle issue di implementazione, generate con `to-issues` da PRD + blueprint + meccaniche. Tracciate anche su GitHub: <https://github.com/PierpaoloV/il-lungo-viaggio/issues>. Non è canone narrativo (escluso dalla bibbia).

Ogni fetta è un **tracer-bullet**: un incremento giocabile/verificabile end-to-end. Stack: web + inkjs + parser italiano custom (ADR-0001). I test stanno *dentro* ogni fetta.

| # | Titolo | Tipo | Bloccata da | GitHub |
|---|---|---|---|---|
| 1 | Walking skeleton: terminale web + inkjs | AFK | — | [#1](https://github.com/PierpaoloV/il-lungo-viaggio/issues/1) |
| 2 | Parser italiano + comandi globali | AFK | #1 | [#2](https://github.com/PierpaoloV/il-lungo-viaggio/issues/2) |
| 3 | Affordance ibride (bottoni + aiuto) | AFK | #2 | [#3](https://github.com/PierpaoloV/il-lungo-viaggio/issues/3) |
| 4 | Memoria & save/load | AFK | #1 | [#4](https://github.com/PierpaoloV/il-lungo-viaggio/issues/4) |
| 5 | Quotidiano A (P00–P09): apertura, bosco, 4 scenari D9 | AFK | #2,#3,#4 | [#5](https://github.com/PierpaoloV/il-lungo-viaggio/issues/5) |
| 6 | Quotidiano B (P10–P21): mensa, Lesmidoom, notte | AFK | #5 | [#6](https://github.com/PierpaoloV/il-lungo-viaggio/issues/6) |
| 7 | Meccanica di combattimento | AFK | #2,#3,#4 | [#7](https://github.com/PierpaoloV/il-lungo-viaggio/issues/7) |
| 8 | Sogno + matrice 2×2 (P22–P33) | AFK | #6,#7 | [#8](https://github.com/PierpaoloV/il-lungo-viaggio/issues/8) |
| 9 | Immagine del climax (consegna a Errol) | HITL | #8 + asset | [#9](https://github.com/PierpaoloV/il-lungo-viaggio/issues/9) |
| 10 | Risveglio + segno + chiusura (P34–P36) | AFK | #8 | [#10](https://github.com/PierpaoloV/il-lungo-viaggio/issues/10) |

Tutte le issue portano la label `needs-triage`.

---

## Dettaglio

### #1 — Walking skeleton: terminale web + inkjs
**Cosa:** scaffold app web (es. Vite) + inkjs; carica una scena ink del prologo, la renderizza nel terminale, avanza con Invio/`aspetta`. Avviabile con un comando, apribile nel browser.
**Accettazione:** `npm install && npm run dev` apre l'app nel browser · scena ink caricata e testo renderizzato · Invio/`aspetta` avanza · README con istruzioni.
**Verifica:** integrazione (storia carica + assert DOM) + smoke manuale.
**Bloccata da:** nessuna.

### #2 — Parser italiano + comandi globali
**Cosa:** parser IT locale → comandi canonici (`mechanics/interaction.md`): verbi globali, sinonimi, drop filler, lemmatizzazione leggera; `esamina <x>` e `inventario` end-to-end.
**Accettazione:** verbi+sinonimi riconosciuti, filler/accenti gestiti · ambiguità chiede, ignoto dà messaggio utile · `esamina`/`inventario` corretti · corpus di test.
**Verifica:** unit table-driven `(input,contesto)→comando`.
**Bloccata da:** #1.

### #3 — Affordance ibride
**Cosa:** scelte situazionali come bottoni equivalenti al comando; `aiuto`/`?` elenca azioni; sostantivi evidenziati.
**Accettazione:** bottoni == comando digitato · `aiuto` lista le azioni · sostantivi evidenziati.
**Verifica:** component/integration (bottone==comando; lista `aiuto` attesa).
**Bloccata da:** #2.

### #4 — Memoria & save/load
**Cosa:** stato persistente (variabili ink + flag), salvataggio/ripresa, serializzazione.
**Accettazione:** flag leggibili/scrivibili · save/resume preserva lo stato · roundtrip test.
**Verifica:** roundtrip salva→carica.
**Bloccata da:** #1.

### #5 — Quotidiano A (P00–P09)
**Cosa:** scene P00–P09 in ink: leggenda, bosco, incontro, panino, accompagna/indica, rimorso B, verso la mensa. I 4 scenari D9.
**Accettazione:** scene giocabili · 4 rami D9 impostano i flag e convergono alla mensa · rimorso B · `bosco_tracce_osservate`.
**Verifica:** story-walk sui 4 rami → flag + convergenza.
**Bloccata da:** #2, #3, #4.

### #6 — Quotidiano B (P10–P21)
**Cosa:** scene P10–P21: dialoghi spada/mostri/affamato, Errol, mensa, Lesmidoom, segnale di Mirea, "Fai buon viaggio", notte; doppia modalità (accompagnato vs ritrovato).
**Accettazione:** scene giocabili in entrambe le modalità · `seed_mostro_affamato`/`lesmidoom_rivelato`/`fai_buon_viaggio_sentito` · si raggiunge P22.
**Verifica:** story-walk → flag + raggiungimento P22.
**Bloccata da:** #5.

### #7 — Meccanica di combattimento
**Cosa:** modello `mechanics/combat.md`: aperture leggibili, `attacca <apertura>`+bottoni, tutorial (allarme) e multi-bersaglio, sconfitta morbida.
**Accettazione:** aperture e attacchi · tutorial pulito vs allarme · 3-nemici (2 errori → rianimato) · nessun game over duro · test.
**Verifica:** unit/integration su esiti e flag.
**Bloccata da:** #2, #3, #4.

### #8 — Sogno + matrice 2×2 (P22–P33)
**Cosa:** scene P22–P33: dream-mode, bivio, medaglione/tracce, tutorial orco, rinforzi condizionali, consegna a Errol, vittoria, buio; integra il combattimento.
**Accettazione:** dream-mode on/off · 4 percorsi → 1/2/2/3 scontri + flag perdite · payoff tracce a P27 · si raggiunge P31 e P33.
**Verifica:** end-to-end sui 4 percorsi (conteggio scontri + flag).
**Bloccata da:** #6, #7.

### #9 — Immagine del climax (HITL)
**Cosa:** slot UI per l'immagine 2D a P31 (registro sogno), asset da `art/scenes/sogno-consegna-spada.md`.
**Accettazione:** all'evento `spada_consegnata_errol` l'immagine compare · rispetta lo standard (volto adulto non visibile).
**Verifica:** assert presenza/visibilità `<img>`; qualità visiva manuale. Richiede l'asset generato.
**Bloccata da:** #8 + asset immagine.

### #10 — Risveglio + segno + chiusura (P34–P36)
**Cosa:** scene P34–P36: risveglio, segno a sinistra, seed curiosità, chiamata di Mirea, schermata "Fine del Prologo", autosave.
**Accettazione:** `segno_notato`/`seed_curiosita_segno` · chiamata di Mirea, `prologo_completato=true` · schermata finale + autosave.
**Verifica:** integration → flag + schermata + autosave.
**Bloccata da:** #8.
