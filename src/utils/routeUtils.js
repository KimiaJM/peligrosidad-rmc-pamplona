import { dijkstra } from './dijkstra';
import { encontrarNodoMasCercano } from './graphUtils';

/**
 * Calcula la ruta más segura entre dos puntos
 * @param {Object} grafo - Grafo generado
 * @param {Array} origen - Coordenadas [lon, lat] del punto de origen
 * @param {Array} destino - Coordenadas [lon, lat] del punto de destino
 * @returns {Array} Ruta calculada como lista de coordenadas
 */
export function calcularRuta(grafo, origen, destino) {
    const nodoInicio = encontrarNodoMasCercano(grafo, origen);
    const nodoFin = encontrarNodoMasCercano(grafo, destino);

    if (!nodoInicio || !nodoFin) {
        console.error("🚫 No se encontraron nodos en el grafo para los puntos dados.");
        return null;
    }

    console.log(`Calculando ruta desde ${nodoInicio} hasta ${nodoFin}`);
    const ruta = dijkstra(grafo, nodoInicio, nodoFin);
    
    if (!ruta || ruta.length === 0) {
        console.error("⚠️ No se pudo calcular la ruta entre los puntos dados.");
        return null;
    }
    
    // Modificar para trabajar con el formato de coordenadas de nuestra implementación personalizada
    if (ruta && Array.isArray(ruta)) {
        // Si ruta ya es un array de coordenadas (como devuelve nuestra implementación de dijkstra),
        // simplemente devolvemos esas coordenadas
        console.log(`Ruta encontrada con ${ruta.length} puntos`);
        return ruta;
    }
    
    return null;
}

/**
 * Añade una ruta al mapa como una capa vectorial
 * @param {Object} map - Instancia del mapa SITNA
 * @param {Array} coordenadasRuta - Array de coordenadas [lon, lat] que forman la ruta
 */
export function addRouteToMap(map, coordenadasRuta) {
    if (!coordenadasRuta || coordenadasRuta.length === 0) {
        console.error("No hay coordenadas para dibujar la ruta");
        return;
    }

    // Crear una feature de tipo LineString con las coordenadas
    const rutaFeature = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: coordenadasRuta
        },
        properties: {
            name: "Ruta calculada"
        }
    };

    // Añadir la feature como una capa al mapa
    map.addLayer({
        id: "ruta-calculada",
        title: "Ruta calculada",
        type: SITNA.Consts.layerType.VECTOR,
        data: rutaFeature,
        styles: {
            line: {
                strokeColor: "#FF0000",
                strokeWidth: 4,
                strokeOpacity: 0.8
            }
        }
    });
}
