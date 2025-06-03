/**
 * Definición de la capa de Red de movilidad ciclista obtenida del servicio WMS de IDENA
 */
export const redCiclista = {
    id: "redCiclista",
    title: "Red de movilidad ciclista",
    type: "WMS",
    url: "https://idena.navarra.es/ogc/wms",
    layerNames: "INFRAE_Lin_TrazadoSIGMC",
    transparent: true
}