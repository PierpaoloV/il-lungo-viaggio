#!/usr/bin/env python3
"""Build the generated story bible from canonical Markdown sources."""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "story" / "story-bible.md"

SOURCE_DIRS = [
    ROOT / "story",
    ROOT / "world",
    ROOT / "characters",
    ROOT / "game-outline",
]

EXCLUDED = {
    ROOT / "story" / "story-bible.md",
    ROOT / "README.md",
    ROOT / "old" / "README.md",
    # Process / planning docs, not narrative canon: keep them out of the bible.
    ROOT / "game-outline" / "project-plan.md",
    ROOT / "game-outline" / "prd-prologo.md",
    ROOT / "game-outline" / "agent-brief-prologo.md",
    ROOT / "game-outline" / "blueprint-prologo.md",
}

PRIORITY = {
    "story/canon.md": 10,
    "story/long-arc.md": 20,
    "story/time-travel.md": 30,
    "world/vaargal.md": 100,
    "world/orcs.md": 110,
    "world/mezclar.md": 120,
    "world/sword-and-sign.md": 130,
    "characters/ernesto.md": 200,
    "characters/lesmidoom.md": 210,
    "characters/mirea.md": 220,
    "characters/eireen.md": 230,
    "characters/errol.md": 240,
    "game-outline/scope.md": 300,
    "game-outline/prologue.md": 310,
    "game-outline/future-expansions.md": 320,
    "story/open-questions.md": 900,
}

LINK_RE = re.compile(r"(!?\[[^\]]*\]\()([^)]+)(\))")
HEADING_RE = re.compile(r"^(#{1,6})(\s+.+)$")


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def source_sort_key(path: Path) -> tuple[int, str]:
    relative = rel(path)
    return (PRIORITY.get(relative, 500), relative)


def collect_sources() -> list[Path]:
    sources: list[Path] = []
    for directory in SOURCE_DIRS:
        for path in directory.rglob("*.md"):
            if path in EXCLUDED or path.name == "README.md":
                continue
            sources.append(path)
    return sorted(sources, key=source_sort_key)


def is_external_destination(destination: str) -> bool:
    stripped = destination.strip()
    return (
        not stripped
        or stripped.startswith("#")
        or stripped.startswith("/")
        or "://" in stripped
        or stripped.startswith("mailto:")
    )


def split_destination(destination: str) -> tuple[str, str, str]:
    leading = ""
    trailing = ""
    value = destination

    if value.startswith("<") and ">" in value:
        end = value.index(">")
        return "<", value[1:end], value[end:]

    stripped_left = len(value) - len(value.lstrip())
    if stripped_left:
        leading = value[:stripped_left]
        value = value[stripped_left:]

    match = re.match(r"([^\s]+)(.*)", value, flags=re.DOTALL)
    if not match:
        return leading, value, trailing

    return leading, match.group(1), match.group(2)


def rewrite_relative_links(text: str, source: Path) -> str:
    def replace(match: re.Match[str]) -> str:
        prefix, destination, suffix = match.groups()
        if is_external_destination(destination):
            return match.group(0)

        leading, path_value, trailing = split_destination(destination)
        if is_external_destination(path_value):
            return match.group(0)

        anchor = ""
        if "#" in path_value:
            path_value, anchor = path_value.split("#", 1)
            anchor = "#" + anchor

        absolute = (source.parent / path_value).resolve(strict=False)
        rewritten = Path(
            Path("../") / absolute.relative_to(ROOT)
            if absolute.is_relative_to(ROOT)
            else path_value
        )

        if isinstance(rewritten, Path):
            target = rewritten.as_posix()
        else:
            target = str(rewritten)

        return f"{prefix}{leading}{target}{anchor}{trailing}{suffix}"

    return LINK_RE.sub(replace, text)


def demote_headings(text: str) -> str:
    lines: list[str] = []
    in_fence = False

    for line in text.splitlines():
        if line.startswith("```") or line.startswith("~~~"):
            in_fence = not in_fence
            lines.append(line)
            continue

        if not in_fence:
            match = HEADING_RE.match(line)
            if match:
                hashes, title = match.groups()
                hashes = "#" * min(len(hashes) + 1, 6)
                lines.append(f"{hashes}{title}")
                continue

        lines.append(line)

    return "\n".join(lines).rstrip()


def render_source(source: Path) -> str:
    text = source.read_text(encoding="utf-8").strip()
    text = rewrite_relative_links(text, source)
    text = demote_headings(text)
    return f"<!-- Source: {rel(source)} -->\n\n{text}"


def build() -> str:
    sources = collect_sources()
    rendered_sources = "\n\n---\n\n".join(render_source(source) for source in sources)

    source_list = "\n".join(f"- `{rel(source)}`" for source in sources)

    return f"""# Bibbia Narrativa

<!--
GENERATED FILE.
Do not edit directly.
Run: python scripts/build_story_bible.py
-->

Documento unico generato dai file canonici del progetto.

Quando espandi personaggi, mondo, geografia, mappe o struttura del gioco, modifica i file sorgente nelle cartelle dedicate e rigenera questo documento.

## Fonti Incluse

{source_list}

---

{rendered_sources}
"""


def main() -> None:
    OUTPUT.write_text(build(), encoding="utf-8")
    print(f"Generated {rel(OUTPUT)}")


if __name__ == "__main__":
    main()
