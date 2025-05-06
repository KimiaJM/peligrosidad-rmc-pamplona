export const municipios = {
    "id": "municipios",
    "title": "Municipios",
    "type": "WMS",
    "url": "https://idena.navarra.es/ogc/wms",
    "layerNames": "IDENA:CATAST_Pol_Municipio",
    "transparent": true,
    "customParams": {
        "CQL_FILTER": "CMUNICIPIO='201'"
    }
}