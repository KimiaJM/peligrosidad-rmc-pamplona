import { peligrosidadPorTipoVia } from '../data/prep/indicesPeligrosidad.js';
import { dijkstra } from '../utils/dijkstra.js';
import { buildGraph } from '../utils/graphBuilder.js';
import { enrichFeaturesWithDanger } from '../utils/procesadorGeoJson.js';
import { addRouteToMap } from './routingLayer.js';

/**
 * Función principal para calcular una ruta segura.
 * @param {SITNA.Map} map - Instancia del mapa SITNA.
 * @param {string|Object} geoJsonData - Ruta al archivo GeoJSON o objeto GeoJSON ya cargado.
 * @param {Array<number>} startCoords - Coordenadas [lng, lat] del punto de inicio.
 * @param {Array<number>} endCoords - Coordenadas [lng, lat] del punto de fin.
 */
export async function calcularRutaSegura(map, geoJsonData, startCoords, endCoords) {
    console.log('... Iniciando cálculo de ruta segura...');
    
    try {
        let geojson;
        
        // Comprobar si geoJsonData es una URL (string) o un objeto GeoJSON
        if (typeof geoJsonData === 'string') {
            console.log(`... Intentando cargar GeoJSON desde URL: ${geoJsonData}`);
            
            const response = await fetch(geoJsonData);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, URL: ${geoJsonData}`);
            }
            
            geojson = await response.json();
        } else {
            console.log('... Usando objeto GeoJSON proporcionado directamente');
            geojson = geoJsonData;
        }
        
        // Validar que el objeto es un GeoJSON válido
        if (!geojson || !geojson.features) {
            throw new Error('El objeto no parece ser un GeoJSON válido (no contiene features)');
        }

        console.log(`GeoJSON válido con ${geojson.features.length} features`);

        // Enriquecer features con peligrosidad
        const enriched = enrichFeaturesWithDanger(geojson, peligrosidadPorTipoVia);

        // Crear grafo
        const graph = buildGraph(enriched);

        // Convertir coordenadas a claves de nodo
        const startKey = startCoords.join(',');
        const endKey = endCoords.join(',');

        // Calcular ruta
        const rutaCoords = dijkstra(graph, startKey, endKey);

        if (!rutaCoords || rutaCoords.length === 0) {
            console.warn('---> No se ha podido calcular la ruta.');
            return;
        }

        // Añadir ruta al mapa
        addRouteToMap(map, rutaCoords);
    } catch (error) {
        console.error('---> Error al calcular la ruta:', error);
    }
}
