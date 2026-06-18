# Consiglio di design — subagent

Tre specialisti in sola lettura (Sonnet) che migliorano storia e game design di *Il Lungo Viaggio*. Non modificano file: producono proposte; gli umani valutano e implementano.

| Agent | Lente |
|---|---|
| `game-designer` | Interattività, agency, ritmo, meccaniche al servizio del tema |
| `story-writer` | Tema, personaggi, voce, prosa, dialoghi, canone |
| `text-game-designer` | Craft IF: parser, vocabolario, affordance, scopribilità |

## Come si usa (workflow del consiglio)

L'agente principale fa da **facilitatore**. Per una domanda di miglioramento (es. "come rendiamo più interattiva la scena del vecchio?"):

1. **Round 1 — proposte indipendenti.** Si invocano i tre agent in parallelo sulla stessa domanda. Ognuno legge i documenti rilevanti e propone alternative concrete dalla propria lente, con trade-off.
2. **Round 2 — confronto e convergenza.** Le proposte di ciascuno vengono passate agli altri due, che le criticano dalla propria lente e segnalano accordi/tensioni. Si cerca un punto d'incontro.
3. **Sintesi.** Il facilitatore raccoglie i punti d'accordo in **una proposta di miglioramento** (priorità, impatto, costo, file toccati) e la riporta agli umani.
4. **Decisione umana.** Voi valutate. Se piace, l'agente principale la implementa.

Per avviarlo basta chiedere all'agente principale, es.: *"Convoca il consiglio di design su \<argomento\>"*.

## Vincoli che tutti rispettano
- Italiano; niente LLM nel gioco (parser locale); niente *guess-the-verb*.
- Canone come baseline (`story/canon.md`); voce in presente/seconda persona.
- La bibbia narrativa (`story/story-bible.md`) è generata: si modificano i sorgenti, non il file generato.
