/**
 * Implementación del algoritmo de Dijkstra para calcular la ruta más segura.
 * @param {Object} graph - Grafo representando la red ciclista.
 * @param {string} start - Nodo de inicio.
 * @param {string} end - Nodo de destino.
 * @param {number} safetyFactor - Factor multiplicador para priorizar la seguridad (default: 10).
 * @returns {Array} Coordenadas de la ruta calculada.
 */
export function dijkstra(graph, start, end, safetyFactor) {
    console.log(`... Ejecutando Dijkstra desde ${start} hasta ${end} con prioridad en la seguridad`);
    console.log(`Nodos en el grafo: ${Object.keys(graph.nodes).length}`);
    
    // Si el nodo de inicio o fin no existe en el grafo, retornar error
    if (!graph.nodes[start]) {
        console.error(`❌  Error: El nodo de inicio ${start} no existe en el grafo.`);
        return null;
    }
    
    if (!graph.nodes[end]) {
        console.error(`❌  Error: El nodo de destino ${end} no existe en el grafo.`);
        return null;
    }

    const visited = new Set();
    const distances = {};
    const previous = {};
    const queue = new Set(Object.keys(graph.nodes));

    // Inicializar distancias
    for (const node of queue) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    console.log(`... Iniciando búsqueda de ruta priorizando seguridad...`);

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
            console.warn("❌  No hay más nodos alcanzables");
            break;
        }
        
        // Si llegamos al destino, terminar
        if (currentNode === end) {
            console.log(`✔️ Destino alcanzado con una distancia de ${distances[end]}`);
            break;
        }

        // Eliminar el nodo actual de la cola y marcarlo como visitado
        queue.delete(currentNode);
        visited.add(currentNode);
        
        // Para cada vecino del nodo actual, actualizar distancias
        const neighbors = graph.edges[currentNode] || [];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor.to)) continue;
            
            // Calcular el peso combinando la distancia y la peligrosidad
            // Usar un valor por defecto si la peligrosidad no está disponible (5 = valor medio)
            const peligrosidad = neighbor.properties.peligrosidad !== undefined && neighbor.properties.peligrosidad !== null ? 
                                neighbor.properties.peligrosidad : 5;
            
            // El peso final penaliza rutas más peligrosas en función del safetyFactor
            const pesoTotal = neighbor.weight + (peligrosidad * safetyFactor);
            
            const alt = distances[currentNode] + pesoTotal;
            
            if (alt < distances[neighbor.to]) {
                distances[neighbor.to] = alt;
                previous[neighbor.to] = {
                    node: currentNode,
                    edge: neighbor
                };
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
        console.warn(`❌  No se encontró un camino desde ${start} hasta ${end}`);
        return [];
    }

    // Reconstruir todas las coordenadas de la ruta
    const routeCoords = [];
    
    while (current !== start) {
        const prevInfo = previous[current];
        if (!prevInfo) break;
        
        const edge = prevInfo.edge;
        if (edge && edge.coords) {
            // Añadir las coordenadas en orden inverso
            for (let i = edge.coords.length - 1; i >= 0; i--) {
                routeCoords.unshift(edge.coords[i]);
            }
        }
        
        current = prevInfo.node;
    }

    console.log(`✔️ Ruta encontrada con ${routeCoords.length} puntos`);
    
    let totalDistancia = 0;
    let sumaPeligrosidad = 0;
    let totalPenalizacion = 0;
    let totalTramos = 0;

    current = end;
    while (current !== start) {
        const prevInfo = previous[current];
        if (!prevInfo) break;

        const edge = prevInfo.edge;
        if (edge) {
            totalDistancia += edge.weight;
            const peligrosidad = edge.properties.peligrosidad ?? 5;
            sumaPeligrosidad += peligrosidad;
            totalPenalizacion += peligrosidad * safetyFactor;
            totalTramos += 1;
        }

        current = prevInfo.node;
    }

    // Calcular peligrosidad media
    const peligrosidadMedia = totalTramos > 0 ? (sumaPeligrosidad / totalTramos).toFixed(2) : "–";

    // Llamar a una función de UI para mostrar el resumen
    if (typeof window.mostrarResumenRuta === "function") {
        window.mostrarResumenRuta({
            distancia: totalDistancia.toFixed(1),
            peligrosidad: peligrosidadMedia,
            penalizacion: totalPenalizacion.toFixed(1),
            tramos: totalTramos
        });
    }

    return routeCoords;
}