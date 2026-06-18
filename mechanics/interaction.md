# Meccanica — Interazione e parser (spec riferibile)

Modello di interazione di *Il Lungo Viaggio*: come il giocatore agisce e come il gioco risponde. Reference per scrivere scene e per implementare il parser. Non è canone narrativo (cartella `mechanics/`, fuori dalla bibbia).

Sintetizza: D3 (modello parser ibrido), `game-outline/scope.md` (esempi di comandi), `research/genre-inspiration.md` §1-2.

Ultimo aggiornamento: 2026-06-18.

---

## 1. Principio

**Ibrido a prevalenza testuale** (D3): l'input testuale in italiano è la modalità principale; **bottoni a schermo** compaiono per le **scelte situazionali** e per le **aperture di combattimento**. Obiettivo costante: evitare il *guess-the-verb* (le azioni possibili sono sempre raggiungibili). Niente LLM: parser **locale, controllato**, vocabolario ristretto.

## 2. Due tipi di azione

### A. Scelte SEMPRE disponibili (comandi globali)
Funzionano in qualunque scena in cui abbiano senso. Sono il vocabolario base che il giocatore impara una volta e riusa ovunque.

| Comando canonico | Sinonimi accettati | Funzione |
|---|---|---|
| `esamina <x>` | guarda, osserva, ispeziona | ispeziona un oggetto/persona/luogo |
| `guarda` / `guarda intorno` | osserva, guardati intorno | descrizione della scena corrente |
| `vai <direzione\|luogo>` | cammina, raggiungi, entra | spostati (direzioni: nord/sud/est/ovest) |
| `segui <x>` | insegui, vai dietro | segui un soggetto in movimento |
| `prendi <oggetto>` | raccogli, afferra | metti in inventario |
| `parla <persona>` | parla con, chiedi, di' a | dialogo |
| `dai <oggetto>` | offri, porgi, regala | dona un oggetto (es. il panino) |
| `usa <oggetto>` | adopera; `usa <a> con <b>` | usa/combina |
| `inventario` | inv, zaino, oggetti | mostra ciò che possiedi |
| `aspetta` | attendi | lascia passare il momento |
| `aiuto` / `?` | comandi, azioni | mostra le azioni disponibili nel contesto |

In combattimento si aggiunge `attacca <apertura>` (vedi `mechanics/combat.md`).

### B. Scelte SITUAZIONALI
Esistono solo in una scena specifica e spesso sono **mostrate come bottoni** (affordance). Sono i punti in cui la storia si dirama e che **impostano i flag** di memoria. Esempi nel prologo:

- `offri il panino` (sì/no) e `accompagna il vecchio` / `indica la strada` → i quattro scenari D9.
- `coordinati col fabbro` / `corri a nord` → bivio del sogno (D13).
- `attacca ginocchia` / `attacca fianco` → stile del colpo-tutorial (flag).

Una scelta situazionale è sempre attivabile **sia** scrivendola **sia** premendo il bottone corrispondente.

## 3. Regole di parsing (italiano)

1. **Normalizza**: minuscole, accenti, spazi.
2. **Droppa le filler word**: articoli e preposizioni di riempimento (`esamina la spada` → `esamina spada`; `guarda al sasso` → `guarda sasso`).
3. **Sinonimo → canonico** (tabella §2A).
4. **Lemmatizzazione leggera**: riconosci coniugazioni/numero (`prendo`, `prendere`, `prendi` → `prendi`).
5. **Forma dominante** verbo-oggetto (1-2 parole); supporta verbo-prep-oggetto quando serve (`usa chiave con porta`).
6. **Ambiguità** → chiedi: "Quale? Il panino o la spada?".
7. **Sconosciuto** → messaggio utile + invito: "Non capisco. Prova `aiuto` per vedere cosa puoi fare."

## 4. Affordance anti guess-the-verb

- `aiuto` / `?` elenca le azioni disponibili nella scena corrente.
- I **sostantivi interagibili** possono essere evidenziati nel testo.
- Le **scelte situazionali** e le **aperture di combattimento** compaiono come **bottoni**.
- Il vocabolario si insegna **dentro** la narrazione (niente manuale).

## 5. Memoria

- Le scelte situazionali che contano impostano **flag persistenti** (vedi `game-outline/project-plan.md` D4/D9/D10/D13).
- In **v1**: si salvano solo i **flag** (le stat sono v2).
- Stato salvabile/ripristinabile (save/load).

## 6. Punti aperti

- Set definitivo dei sinonimi per ogni verbo (dizionario curato).
- Quanto evidenziare i sostantivi interagibili (sempre vs su `aiuto`).
- Formato di serializzazione dei flag.
