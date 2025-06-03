/**
 * Definición de la capa de "Puntos de Riesgo" obtenida del servicio WMS de IDENA
 */
export const puntosRiesgo = {
    id: "puntosRiesgo",
    title: "Puntos de riesgo",
    type: "WMS",
    url: "https://idena.navarra.es/ogc/wms",
    layerNames: "INFRAE_Sym_PtoRiesgoSIGMC",
    isDefault: false,
    transparent: true
}