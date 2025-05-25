/**
 * Implementación del algoritmo de Dijkstra para calcular la ruta más segura.
 * @param {Object} graph - Grafo representando la red ciclista.
 * @param {string} start - Nodo de inicio.
 * @param {string} end - Nodo de destino.
 * @returns {Array} Coordenadas de la ruta calculada.
 */
export function dijkstra(graph, start, end) {
    console.log(`... Ejecutando Dijkstra desde ${start} hasta ${end}`);
    console.log(`Nodos en el grafo: ${Object.keys(graph).length}`);
    
    // Si el nodo de inicio o fin no existe en el grafo, retornar error
    if (!graph[start]) {
        console.error(`---> Error: El nodo de inicio ${start} no existe en el grafo.`);
        return null;
    }
    
    if (!graph[end]) {
        console.error(`---> Error: El nodo de destino ${end} no existe en el grafo.`);
        return null;
    }

    const visited = new Set();
    const distances = {};
    const previous = {};
    const queue = new Set(Object.keys(graph));

    // Inicializar distancias
    for (const node of queue) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    console.log(`... Iniciando búsqueda de ruta...`);

    while (queue.size) {
        // Encontrar el nodo con la distancia mínima
        let currentNode = null;
        let minDistance = Infinity;
        
        for (const node of queue) {
            if (distances[node] < minDistance) {
                currentNode = node;
                minDistance = distances[node];
            }
        }
        
        // Si no hay nodos alcanzables, terminar
        if (currentNode === null || distances[currentNode] === Infinity) {
            console.warn("---> No hay más nodos alcanzables");
            break;
        }
        
        // Si llegamos al destino, terminar
        if (currentNode === end) {
            console.log(`Destino alcanzado con una distancia de ${distances[end]}`);
            break;
        }

        // Eliminar el nodo actual de la cola y marcarlo como visitado
        queue.delete(currentNode);
        visited.add(currentNode);
        
        // Para cada vecino del nodo actual, actualizar distancias
        if (graph[currentNode]) {
            for (const neighbor of graph[currentNode]) {
                if (visited.has(neighbor.to)) continue;
                
                const alt = distances[currentNode] + neighbor.weight;
                
                if (alt < distances[neighbor.to]) {
                    distances[neighbor.to] = alt;
                    previous[neighbor.to] = currentNode;
                }
            }
        }
    }

    // Reconstruir el camino desde el destino hasta el origen
    const path = [];
    let current = end;
    
    console.log(`... Reconstruyendo ruta...`);
    console.log(`Nodo final: ${end}, existe en previous: ${previous[end] !== undefined}`);

    // Si no hay un camino al destino, retornar una ruta vacía
    if (!previous[end]) {
        console.warn(`---> No se encontró un camino desde ${start} hasta ${end}`);
        return [];
    }

    // Reconstruir el camino inverso
    while (current) {
        path.unshift(current); // Añadir al principio del array
        if (current === start) break;
        current = previous[current];
    }

    if (path[0] !== start) {
        console.warn(`El camino no comienza en el nodo de inicio. Camino: ${path.join(' -> ')}`);
        return [];
    }

    // Reconstruir las coordenadas de la ruta
    const routeCoords = [];
    
    for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        
        // Buscar el segmento en el grafo que conecta from con to
        const segment = graph[from].find(edge => edge.to === to);
        
        if (segment && segment.coords) {
            // Si es el primer segmento, añadir todas las coordenadas
            if (i === 0) {
                segment.coords.forEach(coord => routeCoords.push(coord));
            } else {
                // Para segmentos posteriores, omitir la primera coordenada (ya está incluida)
                for (let j = 1; j < segment.coords.length; j++) {
                    routeCoords.push(segment.coords[j]);
                }
            }
        } else {
            console.error(`---> No se encontró el segmento entre ${from} y ${to}`);
        }
    }

    console.log(`Ruta encontrada con ${routeCoords.length} puntos`);
    return routeCoords;
}
