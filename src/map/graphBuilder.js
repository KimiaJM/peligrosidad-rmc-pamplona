
/**
 * Construye un grafo a partir de un archivo GeoJSON de líneas.
 * @param {Object} geojsonData - GeoJSON cargado (FeatureCollection con LineStrings)
 * @returns {Object} Grafo para cálculo de rutas
 */
export function construirGrafo(geojsonData) {
    const graph = {
        nodes: {},  // Almacena información sobre cada nodo (intersección)
        edges: {}   // Almacena información sobre cada arista (segmento de calle)
    };
    
    // Precisión para redondear coordenadas y evitar duplicados
    const precision = 1e-5;
    
    // Función para redondear coordenadas con la precisión dada
    const roundCoord = coord => coord.map(c => Math.round(c / precision) * precision);
    
    // Procesar cada feature en el GeoJSON
    if (geojsonData.features && Array.isArray(geojsonData.features)) {
        geojsonData.features.forEach((feature, featureIndex) => {
            // Solo procesar LineString y MultiLineString
            if (feature.geometry && 
                (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString')) {
                
                // Preparar las coordenadas
                let coordsCollection = [];
                if (feature.geometry.type === 'LineString') {
                    coordsCollection = [feature.geometry.coordinates];
                } else { // MultiLineString
                    coordsCollection = feature.geometry.coordinates;
                }
                
                // Procesar cada línea
                coordsCollection.forEach((coords, lineIndex) => {
                    // Verificar que hay al menos 2 puntos
                    if (coords.length < 2) return;
                    
                    // Procesar cada segmento de la línea
                    for (let i = 0; i < coords.length - 1; i++) {
                        const start = roundCoord(coords[i]).toString();
                        const end = roundCoord(coords[i + 1]).toString();
                        
                        // Ignorar segmentos de longitud cero
                        if (start === end) continue;
                        
                        // Añadir nodos si no existen
                        if (!graph.nodes[start]) graph.nodes[start] = [];
                        if (!graph.nodes[end]) graph.nodes[end] = [];
                        
                        // Calcular peso del segmento (distancia)
                        const weight = calculateDistance(coords[i], coords[i + 1]);
                        
                        // Añadir arista bidireccional (para poder ir en ambas direcciones)
                        if (!graph.edges[start]) graph.edges[start] = [];
                        if (!graph.edges[end]) graph.edges[end] = [];
                        
                        // Añadir aristas con información
                        const edgeId = `${featureIndex}-${lineIndex}-${i}`;
                        graph.edges[start].push({
                            to: end,
                            weight: weight,
                            coords: [coords[i], coords[i + 1]],
                            id: edgeId,
                            properties: feature.properties || {}
                        });
                        
                        graph.edges[end].push({
                            to: start,
                            weight: weight,
                            coords: [coords[i + 1], coords[i]],  // Invertir orden para esta dirección
                            id: edgeId,
                            properties: feature.properties || {}
                        });
                        
                        // Actualizar referencias en los nodos
                        if (!graph.nodes[start].includes(end)) graph.nodes[start].push(end);
                        if (!graph.nodes[end].includes(start)) graph.nodes[end].push(start);
                    }
                });
            }
        });
    }
    
    console.log(`✔️ Grafo construido con ${Object.keys(graph.nodes).length} nodos y ${countEdges(graph)} aristas.`);
    return graph;
}

/**
 * Calcula la distancia entre dos puntos usando distancia euclídea simple
 * @param {Array} point1 - Punto [longitud, latitud]
 * @param {Array} point2 - Punto [longitud, latitud]
 * @returns {Number} Distancia en unidades de coordenadas
 */
function calculateDistance(point1, point2) {
    // Distancia euclídea simple (adecuada para áreas geográficas pequeñas como ciudades)
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Cuenta el número total de aristas en el grafo
 * @param {Object} graph - El grafo
 * @returns {Number} Número total de aristas
 */
function countEdges(graph) {
    let count = 0;
    for (const node in graph.edges) {
        count += graph.edges[node].length;
    }
    return count / 2; // Dividir por 2 porque cada arista se cuenta dos veces (ida y vuelta)
}