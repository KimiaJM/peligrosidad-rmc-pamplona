export const bikeLanesLayer = {
    id: 'bike-lanes',
    type: SITNA.Consts.layerType.WMS,
    url: 'https://idena.navarra.es/ogc/wms',
    layerNames: 'IDENA:INFRAE_Lin_TrazadoSIGMC',
    title: 'Bike Lanes',
    opacity: 0.8,
    legends: true
};