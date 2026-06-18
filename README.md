# Il Lungo Viaggio

Working repository for the future short game based on the old Gico material.

The repository now includes the first playable walking skeleton: a web terminal
that loads a small prologue scene through inkjs and advances with Enter or
`aspetta`.

## Run The Web Prototype

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

The dev command starts Vite and opens the browser on localhost. In the terminale
narrativo, press Enter on an empty command or type `aspetta` to advance the ink
scene.

Run the integration smoke test with:

```bash
npm test
```

## Structure

- `old/`: original 2018 material, preserved without cleanup.
- `story/`: canon, themes, long-term arc and open questions.
- `characters/`: character notes.
- `world/`: setting, races, places and symbolic objects.
- `game-outline/`: playable structure, scope and interaction notes.
- `issues/`: implementation slices for the playable prologue.
- `src/`: web walking skeleton and sample ink scene.
- `scripts/`: local project automation.

## Story Bible Workflow

`story/story-bible.md` is generated from the canonical Markdown files in `story/`, `characters/`, `world/` and `game-outline/`.

Do not edit `story/story-bible.md` directly.

When adding or changing story material, edit the specific source file instead. For example:

- character changes go in `characters/`
- geography, lore and maps go in `world/`
- playable structure goes in `game-outline/`
- narrative canon and open questions go in `story/`

Then rebuild the full story bible:

```bash
python scripts/build_story_bible.py
```

## Current Scope

The first playable version covers only the prologue with Ernesto at 10 years old.

Future arcs at 13, 16 and 20 years old are canonical material for later expansions.
