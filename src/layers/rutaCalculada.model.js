/**
 * Definición de la capa para mostrar la ruta calculada
 */
export const rutaCalculada = {
    id: "rutaCalculada",
    title: "Ruta calculada",
    type: SITNA.Consts.layerType.VECTOR,
    owner: "app",
    stealth: false
};

/**
 * Función para crear una polilínea a partir de coordenadas
 * @param {Array} coordenadas - Array de coordenadas [lon, lat] que forman la ruta
 * @param {Object} opciones - Opciones de estilo para la polilínea
 * @returns {Object} Objeto polilínea de SITNA
 */
export function crearPolyline(coordenadas, opciones = null) {
    const estiloDefecto = {
        strokeColor: '#522852', // Violeta oscuro
        strokeWidth: 6
    };
    
    const estilo = opciones || estiloDefecto;
    
    return new SITNA.feature.Polyline(coordenadas, estilo);
}