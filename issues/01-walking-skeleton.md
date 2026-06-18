# Issue #1 — Walking skeleton: terminale web + inkjs

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/1>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** nessuna

## What to build
Scaffold dell'app web (toolchain a scelta, es. Vite) con **inkjs** integrato. Carica una storia ink minima (una scena del prologo) e ne renderizza il testo in un terminale a schermo; un input minimo (Invio o `aspetta`) avanza alla battuta successiva. Avviabile con un comando e apribile nel browser.

## Acceptance criteria
- [ ] `npm install && npm run dev` avvia l'app e la apre nel browser (es. localhost)
- [ ] Una storia ink d'esempio (scena del prologo) viene caricata e il testo renderizzato nel terminale
- [ ] Invio / `aspetta` avanza alla battuta successiva
- [ ] README con istruzioni per avviare e provare
- [ ] Categorie di testo rese secondo `mechanics/presentation.md` (narrazione serif / dialogo corsivo + colore per personaggio / voce di sistema monospace), con il tagging ink di base

## Verifica / test
- Integrazione: la storia ink carica ed emette la prima riga attesa; assert DOM sul testo; smoke manuale nel browser.

## Blocked by
- Nessuna, si può iniziare subito.

## Riferimenti
- `docs/adr/0001-stack-tecnico-v1.md` (stack), `mechanics/interaction.md` (input), `mechanics/presentation.md` (tipografia), `game-outline/blueprint-prologo.md` (scena d'esempio: P00/P01).
