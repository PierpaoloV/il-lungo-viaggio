# Meccanica — Presentazione e tipografia (spec riferibile)

Come il terminale **rende** il testo per categoria. È lo strato di *output*, complementare a `interaction.md` (input) e `combat.md` (combattimento). Diverso da `art/STYLE.md` (immagini): qui si parla di tipografia del terminale. Consumata dalla shell (issue #1), dall'affordance (#3) e dal dream-mode (#8).

Ultimo aggiornamento: 2026-06-18.

---

## 1. Principio

- Ogni **categoria di testo** ha un trattamento tipografico distinto, così narrazione, dialoghi e voce della macchina non si confondono.
- **Il colore non è mai l'unico segnale** (accessibilità): la distinzione passa sempre anche da **famiglia di font** e/o **stile** (corsivo), oltre che dal colore.
- Estetica: un terminale che **si apre in storia** → **mix**: *serif* per la storia (narrazione e dialoghi), *monospace* per la macchina (sistema, parser, bottoni).

## 2. Categorie e trattamento

| Categoria | Esempio | Font | Stile | Colore |
|---|---|---|---|---|
| **Narrazione** | "Lo scoiattolo guizza tra le foglie." | serif | normale | base del registro (caldo quotidiano / freddo sogno) |
| **Dialogo** | "Fai buon viaggio." | serif | **corsivo** | **colore per personaggio** (§3) |
| **Voce di sistema / parser** | "Non capisco. Prova `aiuto`." | monospace | normale | smorzato/grigio, staccato dalla storia |
| **Leggenda / schermate incorniciate** | la storia di Mirea (P00), "Fine del Prologo" | serif | corsivo, ritmo lento | base, blocco centrato |
| **Enfasi / termini chiave** | la *Spada del Lungo Viaggio*, il segno | serif | grassetto o accento | colore accento |
| **Affordance / bottoni** | `[Offri il panino]` | monospace | — | stile UI (box/colore) |

## 3. Colore per personaggio (dialoghi)

Il dialogo è **serif corsivo + colore del parlante**. Il corsivo garantisce la distinzione anche senza colore (daltonici). Palette **tenue** (non deve gridare). Token d'intento, valori esatti scelti in implementazione:

| Personaggio | Intento cromatico |
|---|---|
| **Mirea** | ambra calda, materna |
| **Lesmidoom / il vecchio** | verde-salvia smorzato, calmo e un po' misterioso |
| **Soldati / fabbro** (sogno) | grigio-acciaio freddo |
| **Ernesto** (le tue risposte parlate) | crema neutro e caldo |
| default / minori | neutro |

Il **colore-per-personaggio** è una capacità riusabile: ogni nuovo personaggio che parla riceve un token nella palette.

## 4. Registro (quotidiano vs sogno)

Il **registro** modula il colore base e l'atmosfera, non le regole di categoria:
- **Quotidiano**: caldo, dorato.
- **Sogno**: freddo, grigio-blu.

I colori-personaggio restano riconoscibili ma virano leggermente col registro (es. nel sogno più desaturati).

## 5. Dream-mode (overlay)

Attivato/disattivato da un **tag di scena** (`# mode: dream` a P22, `# mode: normal` a P34). Applica **sopra tutte le categorie**: palette fredda grigio-blu, **lieve glitch** testuale, cursore più rigido, parole occasionalmente "in ritardo". Vedi blueprint P22/P33.

## 6. Convenzione di tagging in ink

Perché il renderer sappia che categoria applicare, il contenuto ink dichiara la categoria con i **tag** (`#`):

- riga **senza tag** = **narrazione** (default);
- **dialogo**: `# voce: <personaggio>` (es. `# voce: mirea`) → serif corsivo + colore del parlante;
- **leggenda / incorniciato**: `# blocco: leggenda`;
- **enfasi inline**: marcatore `*...*` nel testo → termine in accento;
- **voce di sistema / parser**: generata dall'engine → sempre stile sistema (non serve tag);
- **modalità**: `# mode: dream` / `# mode: normal`.

## 7. Accessibilità

- Doppio segnale sempre (font/stile **+** colore), mai solo colore.
- Contrasto adeguato per ogni categoria su sfondo terminale.
- Opzione per **ridurre i glitch** del dream-mode (motion/leggibilità).

## 8. Mappatura col blueprint

- Le **battute tra virgolette** nelle scene del blueprint = categoria **dialogo**, con il parlante della scena (Mirea, il vecchio/Lesmidoom, soldati…).
- La **leggenda P00** e la **schermata "Fine del Prologo"** = categoria **leggenda**.
- Il **feedback del parser** (errori, `aiuto`, inventario) = categoria **sistema**.
- Le scene si implementano taggando le righe secondo §6 (issue #5/#6/#8).

## 9. Punti aperti

- Font esatti (quale serif, quale monospace) e fallback.
- Valori cromatici precisi della palette per personaggio e dei due registri.
- Intensità del glitch dream-mode e relativa opzione di accessibilità.
