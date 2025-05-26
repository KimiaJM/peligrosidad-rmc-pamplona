import * as turf from '@turf/turf';
import { peligrosidadPorTipoVia } from '../data/prep/indicesPeligrosidad.js';
import { buildGraph } from './graphBuilder.js';
import { enrichFeaturesWithDanger } from './procesadorGeoJson.js';

/**
 * Encuentra los nodos más cercanos en el grafo a las coordenadas aproximadas proporcionadas
 * @param {Object} geojson - GeoJSON con los datos de la red ciclista
 * @param {Array<number>} approxStart - Coordenadas aproximadas [lng, lat] del punto de inicio
 * @param {Array<number>} approxEnd - Coordenadas aproximadas [lng, lat] del punto de fin
 * @returns {Object} Objeto con los nodos de inicio y fin válidos y el grafo construido
 */
export function encontrarNodoCercanoEnGrafo(geojson, approxStart, approxEnd) {
    // Enriquecer el GeoJSON con los índices de peligrosidad
    const enriched = enrichFeaturesWithDanger(geojson, peligrosidadPorTipoVia);
    
    // Construir el grafo
    const graph = buildGraph(enriched);
    
    // Extraer los nodos del grafo (las claves son strings de coordenadas)
    const nodes = Object.keys(graph).map(key => {
        const [lng, lat] = key.split(',').map(Number);
        return {
            node: key,
            coords: [lng, lat]
        };
    });
    
    // Buscar el nodo más cercano al punto de inicio aproximado
    let closestStartNode = null;
    let minStartDist = Infinity;
    
    // Buscar el nodo más cercano al punto de fin aproximado
    let closestEndNode = null;
    let minEndDist = Infinity;
    
    // Para cada nodo en el grafo
    for (const node of nodes) {
        // Calcular distancia al punto de inicio aproximado
        const startDist = turf.distance(
            turf.point(approxStart),
            turf.point(node.coords)
        );
        
        // Si es más cercano que el anterior más cercano
        if (startDist < minStartDist) {
            minStartDist = startDist;
            closestStartNode = node.node;
        }
        
        // Calcular distancia al punto de fin aproximado
        const endDist = turf.distance(
            turf.point(approxEnd),
            turf.point(node.coords)
        );
        
        // Si es más cercano que el anterior más cercano
        if (endDist < minEndDist) {
            minEndDist = endDist;
            closestEndNode = node.node;
        }
    }
    
    // Convertir de string a array de números
    const start = closestStartNode.split(',').map(Number);
    const end = closestEndNode.split(',').map(Number);
    
    console.log(`Nodo de inicio más cercano: ${closestStartNode} (a ${minStartDist.toFixed(4)} km)`);
    console.log(`Nodo de fin más cercano: ${closestEndNode} (a ${minEndDist.toFixed(4)} km)`);
    
    return { start, end, graph };
}
