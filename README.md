# Il Lungo Viaggio — Unity

Porting in Unity (6000.5.0f1) di *Il Lungo Viaggio*. Modello scelto: avventura
narrativa 2D "alla Pentiment" — Ernesto si muove dentro scene-pagina curate,
le scelte contano e il mondo ricorda. Il progetto web originale resta intatto
nella cartella accanto (`il-lungo-viaggio/`, tag `backup-pre-unity-pivot`).

## Stato attuale — Vertical slice

Obiettivo 1: **una scena in cui Ernesto si muove.**

- `Assets/Scenes/Act1Slice.unity` — scena di partenza (già nei Build Settings).
- `Assets/Scripts/PlayerController2D.cs` — movimento 2D (frecce / WASD).
- `Assets/Scripts/SceneBootstrap.cs` — costruisce camera, sfondo e Ernesto a
  runtime, così "Play" funziona anche senza arte (placeholder colorati).
- `Assets/Editor/SliceSceneBuilder.cs` — rigenera la scena
  (menu: *Il Lungo Viaggio > Rigenera scena slice*).

### Come provarla

1. Apri il progetto da Unity Hub (versione 6000.5.0f1).
2. Apri `Assets/Scenes/Act1Slice.unity` se non è già aperta.
3. Premi **Play**: un rettangolo (Ernesto placeholder) si muove con
   frecce / WASD su uno sfondo placeholder; la camera lo segue.

### Mettere l'arte vera

Appena hai le immagini (AI-dirette), trascinale in `Assets/Resources/` con
questi nomi e il bootstrap le userà al posto dei placeholder:

- `scene-bg` — sfondo della scena (lo sfondo "pagina" del libro).
- `ernesto` — sprite di Ernesto.

Import: seleziona l'immagine → *Texture Type: Sprite (2D and UI)* → Apply.

## Prossimi passi

- Validare la pipeline arte 2D (sprite di Ernesto: serve un walk-cycle —
  cutout stile Pentiment o poche frame).
- Porting del prologo (ink ha integrazione Unity ufficiale:
  `com.inkle.ink-unity-integration`) + parser C#.
- Animazione del libro che si apre come transizione terminale → 2D.
