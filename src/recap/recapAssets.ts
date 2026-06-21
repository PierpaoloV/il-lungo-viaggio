/**
 * Asset del recap di fine prologo.
 *
 * Ogni card usa la propria tavola dipinta quando presente; le entry mancanti
 * ricadono sul placeholder universale.
 */

const SOGNO_SPADA = new URL(
  "../../art/scenes/sogno-consegna-spada-v1.png",
  import.meta.url
).href;

/** Placeholder mostrato da ogni card priva di asset definitivo. */
export const RECAP_PLACEHOLDER_SRC = SOGNO_SPADA;

/**
 * Mappa id-card -> URL dell'immagine definitiva. Le entry mancanti ricadono sul
 * placeholder.
 */
export const RECAP_ASSET_SRCS: Partial<Record<string, string>> = {
  "panino-dato": new URL(
    "../../art/scenes/recap-panino-dato.png",
    import.meta.url
  ).href,
  "panino-tenuto": new URL(
    "../../art/scenes/recap-panino-tenuto.png",
    import.meta.url
  ).href,
  "cammino-insieme": new URL(
    "../../art/scenes/recap-cammino-insieme.png",
    import.meta.url
  ).href,
  "cammino-rimorso": new URL(
    "../../art/scenes/recap-cammino-rimorso.png",
    import.meta.url
  ).href,
  "cammino-solo": new URL(
    "../../art/scenes/recap-cammino-solo.png",
    import.meta.url
  ).href,
  "mostro-netto": new URL(
    "../../art/scenes/recap-mostro-netto.png",
    import.meta.url
  ).href,
  "mostro-difensivo": new URL(
    "../../art/scenes/recap-mostro-difensivo.png",
    import.meta.url
  ).href,
  "mostro-esitante": new URL(
    "../../art/scenes/recap-mostro-esitante.png",
    import.meta.url
  ).href,
  "sogno-coordinato": new URL(
    "../../art/scenes/recap-sogno-coordinato.png",
    import.meta.url
  ).href,
  "sogno-solo": new URL(
    "../../art/scenes/recap-sogno-solo.png",
    import.meta.url
  ).href,
  "segno-osserva": new URL(
    "../../art/scenes/recap-segno-osserva.png",
    import.meta.url
  ).href,
  "segno-nasconde": new URL(
    "../../art/scenes/recap-segno-nasconde.png",
    import.meta.url
  ).href,
  "segno-minimizza": new URL(
    "../../art/scenes/recap-segno-minimizza.png",
    import.meta.url
  ).href,
};
