// import * as turf from '@turf/turf';

// /**
//  * Construye un grafo a partir de los datos GeoJSON de la red ciclista.
//  * @param {Object} geojson - Datos GeoJSON de la red ciclista.
//  * @returns {Object} Grafo para el algoritmo de Dijkstra.
//  */
// export function buildGraph(geojson) {
//     const graph = {};
//     let edgeCount = 0;
    
//     geojson.features.forEach(f => {
//         if (!f.geometry || !f.geometry.coordinates || f.geometry.coordinates.length < 2) {
//             console.warn("Feature sin coordenadas válidas:", f.id);
//             return;
//         }
        
//         const coords = f.geometry.coordinates;
//         // Usamos strings como claves para los nodos (puntos)
//         const from = coords[0].join(',');
//         const to = coords[coords.length - 1].join(',');
//         const length = turf.length(f); // en km
//         const danger = f.properties.peligrosidad || 1.0;
//         const weight = length * danger;

//         // Inicializar listas de adyacencia si es necesario
//         if (!graph[from]) graph[from] = [];
//         if (!graph[to]) graph[to] = [];

//         // Añadir arista en ambas direcciones (grafo bidireccional)
//         graph[from].push({ to, weight, coords });
//         // Para la dirección inversa, invertimos el array de coordenadas
//         graph[to].push({ to: from, weight, coords: [...coords].reverse() });
        
//         edgeCount += 2; // Contamos ambas direcciones
//     });
    
//     console.log(`Grafo construido con ${Object.keys(graph).length} nodos y ${edgeCount} aristas`);
//     return graph;
// }
