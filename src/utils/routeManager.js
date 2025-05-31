import { encontrarNodoMasCercano } from './graphUtils.js';
import { addRouteToMap } from './routeUtils';

/**
 * Clase para gestionar el cálculo y visualización de rutas
 */
export class RouteManager {
    /**
     * Constructor
     * @param {Object} map - Instancia del mapa SITNA
     */
    constructor(map) {
        this.map = map;
        this.grafo = null;
    }

    /**
     * Establece el grafo para cálculos de ruta
     * @param {Object} grafo - El grafo inicializado
     */
    setGrafo(grafo) {
        this.grafo = grafo;
    }

    /**
     * Calcula y muestra una ruta entre dos puntos dados
     * @param {Array} origen - Coordenadas de origen [lon, lat]
     * @param {Array} destino - Coordenadas de destino [lon, lat]
     * @returns {Promise} Promise que resuelve cuando se procesa la ruta
     */
    async calcularRuta(origen, destino) {
        if (!this.grafo) {
            console.error("❌ El grafo no está inicializado. No se puede calcular la ruta.");
            return null;
        }
        
        try {
            console.log(`Calculando ruta desde [${origen}] hasta [${destino}]...`);
            
            const nodoInicio = encontrarNodoMasCercano(this.grafo, origen);
            const nodoFin = encontrarNodoMasCercano(this.grafo, destino);

            console.log(`✔️ Nodos encontrados: inicio=${nodoInicio}, fin=${nodoFin}`);

            if (!nodoInicio || !nodoFin) {
                console.error('❌ No se encontraron nodos cercanos en el grafo para los puntos dados.');
                return null;
            }

            let ruta;
            
            // Verificar si el grafo tiene el método shortestPath o usamos dijkstra directamente
            if (typeof this.grafo.shortestPath === 'function') {
                ruta = this.grafo.shortestPath(nodoInicio, nodoFin);
                return this.procesarRuta(ruta);
            } else {
                // Importar dijkstra dinámicamente
                const { dijkstra } = await import('./dijkstra.js');
                ruta = dijkstra(this.grafo, nodoInicio, nodoFin);
                return this.procesarRuta(ruta);
            }
        } catch (error) {
            console.error("Error al calcular la ruta:", error);
            return null;
        }
    }

    /**
     * Calcula y muestra una ruta de ejemplo
     */
    async mostrarRutaEjemplo() {
        const origen = [-1.6402, 42.8165];
        const destino = [-1.6305, 42.8193];
        
        return this.calcularRuta(origen, destino);
    }

    /**
     * Procesa y muestra una ruta en el mapa
     * @param {Array} ruta - Ruta calculada
     * @returns {Array|null} Las coordenadas procesadas o null si hubo error
     */
    procesarRuta(ruta) {
        if (!ruta || ruta.length === 0) {
            console.error("❌ No se pudo calcular la ruta entre los puntos dados.");
            return null;
        }
        
        console.log(`✅ Ruta calculada con éxito (${ruta.length} puntos)`);
        
        let coordenadas;
        // Determinar si la ruta ya son coordenadas o nodos que necesitan ser convertidos
        if (Array.isArray(ruta[0])) {
            // Ya son coordenadas
            coordenadas = ruta;
        } else {
            // Son nodos (strings) que deben convertirse a coordenadas
            coordenadas = ruta.map(k => typeof k === 'string' ? k.split(',').map(Number) : k);
        }
        
        addRouteToMap(this.map, coordenadas);
        return coordenadas;
    }
}
