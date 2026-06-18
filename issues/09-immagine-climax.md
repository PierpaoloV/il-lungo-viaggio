# Issue #9 — Immagine del climax (consegna a Errol)

- **GitHub:** <https://github.com/PierpaoloV/il-lungo-viaggio/issues/9>
- **Tipo:** HITL · **Label:** needs-triage · **Bloccata da:** #8 (asset già pronto)

## What to build
Slot UI per la singola **immagine 2D** a P31 (registro sogno), mostrata alla consegna della Spada. Asset già generato: `art/scenes/sogno-consegna-spada-v1.png`.

## Acceptance criteria
- [ ] All'evento `spada_consegnata_errol` l'immagine compare nel registro sogno
- [ ] L'immagine rispetta lo standard (volto dell'adulto non visibile)

## Verifica / test
- Automatica: assert presenza/visibilità dell'`<img>` del climax. Qualità visiva = verifica manuale.

## Blocked by
- #8 (Sogno). L'asset immagine è **già pronto** (`art/scenes/sogno-consegna-spada-v1.png`).

## Riferimenti
- `art/scenes/sogno-consegna-spada.md`, `art/scenes/sogno-consegna-spada-v1.png`.
