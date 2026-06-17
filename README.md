# Il Lungo Viaggio

Working repository for the future short game based on the old Gico material.

The current goal is narrative organization, not implementation.

## Structure

- `old/`: original 2018 material, preserved without cleanup.
- `story/`: canon, themes, long-term arc and open questions.
- `characters/`: character notes.
- `world/`: setting, races, places and symbolic objects.
- `game-outline/`: playable structure, scope and interaction notes.
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
