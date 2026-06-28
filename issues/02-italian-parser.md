# Issue 02 — ItalianParser (C# core)

## What to build
Portare il parser italiano in C# puro (`Assets/Scripts/Core/ItalianParser.cs`,
namespace `IlLungoViaggio.Core`, **nessuna dipendenza UnityEngine**).

Comportamento (da `mechanics/interaction.md` §3 nel repo web):
1. Normalizza (minuscole, accenti, spazi).
2. Droppa filler (articoli/preposizioni).
3. Sinonimo → canonico (tabella verbi: esamina/guarda/vai/segui/prendi/parla/
   dai/usa/inventario/aspetta/aiuto).
4. Lemmatizzazione leggera (coniugazioni/numero).
5. Forma verbo-oggetto (1-2 parole); supporta verbo-prep-oggetto (`usa X con Y`).
6. Ambiguità → richiesta di disambiguazione.
7. Sconosciuto → messaggio utile.

Output: una struct/record `ParsedCommand { Verb, Object, Object2, Kind }`.

## Porting reference (repo web)
- `src/parser/italianParser.ts` (logica)
- `src/parser/italianParser.test.ts` → **portare come EditMode test** (NUnit):
  è la spec esatta del comportamento atteso.
- `mechanics/interaction.md` §2-3 (tabella sinonimi/regole).

## Verification
- EditMode test che replicano i casi del test TS (verde via batchmode test run).

## Depends on
- Niente (logica pura). Usato da #03.
