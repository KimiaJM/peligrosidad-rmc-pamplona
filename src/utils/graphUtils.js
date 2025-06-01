
/**
 * Encuentra el nodo más cercano en el grafo a las coordenadas dadas
 * @param {Object} grafo - El grafo donde buscar
 * @param {Array} punto - Coordenadas [lon, lat] para buscar el nodo más cercano
 * @returns {string|null} Clave del nodo más cercano o null si no se encuentra
 */
export function encontrarNodoMasCercano(grafo, punto) {
    // Verificar que el grafo existe y tiene nodos
    if (!grafo || !grafo.nodes) {
        console.error("❌ Error: El grafo no está correctamente inicializado.");
        return null;
    }
    
    // Obtener las claves de los nodos
    const keys = typeof grafo.nodes === 'function' 
        ? grafo.nodes() 
        : Object.keys(grafo.nodes);
    
    if (!keys || keys.length === 0) {
        console.error("❌ Error: El grafo no contiene nodos.");
        return null;
    }
    
    let minKey = null;
    let minDist = Infinity;

    // Calcular distancia euclídea simple (adecuada para áreas pequeñas como ciudades)
    const calcularDistancia = (p1, p2) => {
        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Encontrar el nodo más cercano
    for (const key of keys) {
        const nodeCoord = key.split(',').map(Number);
        const dist = calcularDistancia(punto, nodeCoord);

        if (dist < minDist) {
            minDist = dist;
            minKey = key;
        }
    }

    return minKey;
}
