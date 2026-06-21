import { getFlag } from "../state/saveLoad";
import type { InkStory } from "../story/inkTypes";
import { RECAP_ASSET_SRCS, RECAP_PLACEHOLDER_SRC } from "./recapAssets";

/**
 * Una card del recap di fine prologo: un'immagine (placeholder finche' l'arte non
 * arriva) con una didascalia opzionale.
 *
 * La didascalia non riassume l'azione ("hai dato il panino"): restituisce il
 * residuo fisico della scelta, nella voce trattenuta del prologo (bambino di
 * dieci anni, sensazioni del corpo, mai un'emozione nominata). La card della
 * risposta "netta" sul mostro affamato resta volutamente muta: immagine e
 * silenzio.
 */
export type RecapCard = {
  /** Identificatore stabile di card+variante. Chiave dell'asset e usato nei test. */
  id: string;
  /** Testo alternativo, sempre presente (accessibilita'). */
  alt: string;
  /** Didascalia evocativa; assente nelle card volutamente mute. */
  caption?: string;
};

/** Card con la sorgente immagine gia' risolta (asset definitivo o placeholder). */
export type RecapCardView = RecapCard & { src: string };

function card(id: string, alt: string, caption?: string): RecapCard {
  return caption === undefined ? { id, alt } : { id, alt, caption };
}

/**
 * Costruisce la sequenza del recap leggendo i flag della partita: ogni card
 * riflette una scelta effettivamente compiuta, in ordine cronologico. Chi non ha
 * incrociato una scelta non vede la sua card — il recap e' lo specchio di QUELLA
 * partita, non un riassunto canonico. Cinque scelte cardine: il panino, il
 * cammino, il mostro affamato, il sogno, il segno.
 */
export function buildRecapCards(story: InkStory): RecapCard[] {
  const cards: RecapCard[] = [];

  // C1 - Il panino (P06).
  const panino = getFlag(story, "panino_dato");
  if (panino === true) {
    cards.push(
      card(
        "panino-dato",
        "Il mezzo panino passa di mano, nel bosco.",
        "Il panno e' vuoto nella tua tasca. Pesa meno di quanto dovrebbe."
      )
    );
  } else if (panino === false) {
    cards.push(
      card(
        "panino-tenuto",
        "Ernesto stringe il panino nella tasca.",
        "Il panino e' ancora li'. Non hai piu' voglia di finirlo."
      )
    );
  }

  // C2 - Il cammino (P07/P08). Il ramo "non accompagnato" si sdoppia col rimorso.
  const accompagnato = getFlag(story, "vecchio_accompagnato");
  if (accompagnato === true) {
    cards.push(
      card(
        "cammino-insieme",
        "Ernesto e il vecchio sul sentiero verso Mezclar.",
        "Rallenti senza accorgertene."
      )
    );
  } else if (accompagnato === false) {
    if (getFlag(story, "rimorso_tornato") === true) {
      cards.push(
        card(
          "cammino-rimorso",
          "Il punto vuoto nel bosco, dove sedeva il vecchio.",
          "Torni a cercarlo. Il posto dove era seduto e' vuoto."
        )
      );
    } else {
      cards.push(
        card(
          "cammino-solo",
          "Ernesto al margine del bosco, il braccio teso verso casa.",
          "I piedi decidono per te, verso il conosciuto."
        )
      );
    }
  }

  // C3 - Il mostro affamato (P12). La risposta "netto" resta senza parole.
  const mostro = getFlag(story, "seed_mostro_affamato");
  if (mostro === "netto") {
    cards.push(card("mostro-netto", "La spada di legno stretta nella mano di Ernesto."));
  } else if (mostro === "difensivo") {
    cards.push(
      card(
        "mostro-difensivo",
        "Ernesto con la mano sulla spada, in attesa.",
        "Se mi viene vicino, mi difendo."
      )
    );
  } else if (mostro === "esitante") {
    cards.push(
      card(
        "mostro-esitante",
        "La bocca aperta di Ernesto, il vecchio che ascolta.",
        "Prima gli grido di andare via."
      )
    );
  }

  // C4 - Il sogno: da soli o insieme (P23).
  const sogno = getFlag(story, "sogno_bivio");
  if (sogno === "coordinato") {
    cards.push(
      card(
        "sogno-coordinato",
        "Il fabbro e i soldati stretti intorno, nel fumo.",
        "Hai aspettato. Siete andati insieme."
      )
    );
  } else if (sogno === "solo") {
    cards.push(
      card(
        "sogno-solo",
        "Ernesto adulto corre nel fango, la schiena ai soldati.",
        "Sei corso avanti. Da solo."
      )
    );
  }

  // C5 - Il segno (P35). Card di chiusura: uno sguardo aperto, non una risposta.
  const segno = getFlag(story, "seed_curiosita_segno");
  if (segno === "osserva") {
    cards.push(
      card(
        "segno-osserva",
        "Il braccio con la manica alzata, la luce sul segno.",
        "Piu' lo guardi, piu' resti a guardarlo."
      )
    );
  } else if (segno === "nasconde") {
    cards.push(
      card(
        "segno-nasconde",
        "La manica che scende a coprire il braccio.",
        "Tiri giu' la manica. Come se non vederlo bastasse."
      )
    );
  } else if (segno === "minimizza") {
    cards.push(
      card(
        "segno-minimizza",
        "Ernesto con la manica gia' abbassata, lo sguardo altrove.",
        "Decidi che e' soltanto un graffio. Lo decidi con troppa cura per crederci davvero."
      )
    );
  }

  return cards;
}

/** Risolve l'immagine di ogni card: asset definitivo se registrato, altrimenti placeholder. */
export function toRecapCardViews(cards: RecapCard[]): RecapCardView[] {
  return cards.map((entry) => ({
    ...entry,
    src: RECAP_ASSET_SRCS[entry.id] ?? RECAP_PLACEHOLDER_SRC
  }));
}
