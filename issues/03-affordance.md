# Issue #3 — Affordance ibride (bottoni + aiuto)

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/3>
- **Tipo:** AFK · **Label:** needs-triage · **Bloccata da:** #2

## What to build
Affordance ibride: le **scelte situazionali** compaiono come bottoni cliccabili equivalenti al comando testuale; comando `aiuto`/`?` elenca le azioni disponibili nel contesto; sostantivi interagibili evidenziati nel testo.

## Acceptance criteria
- [ ] In una scena con scelte, i bottoni compaiono e cliccarli equivale a digitare il comando
- [ ] `aiuto`/`?` elenca le azioni disponibili
- [ ] Sostantivi interagibili evidenziati nel testo

## Verifica / test
- Component/integration: bottone == comando digitato; `aiuto` mostra la lista attesa.

## Blocked by
- #2 (Parser)

## Riferimenti
- `mechanics/interaction.md` §2B (scelte situazionali) e §4 (affordance anti guess-the-verb); `mechanics/presentation.md` (stile di bottoni ed evidenziazioni).
