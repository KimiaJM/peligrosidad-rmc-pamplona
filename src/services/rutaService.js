import { dijkstra } from '../utils/dijkstra.js';
import { encontrarNodoMasCercano } from '../utils/graphUtils.js';

/**
 * Servicio para gestionar el cálculo y visualización de rutas
 */
export class RutaService {
    constructor(map, graphService) {
        this.map = map;
        this.graphService = graphService;
        this.rutaActual = null;
        this.marcadores = [];
    }

    /**
     * Calcula una ruta entre dos puntos
     * @param {Array} puntoInicio - Coordenadas de inicio [lon, lat]
     * @param {Array} puntoFin - Coordenadas de fin [lon, lat]
     * @param {number} [safetyFactor] - Factor de seguridad para priorizar rutas más seguras
     * @returns {Promise<Array|boolean>} Promesa con las coordenadas de la ruta o false si falla
     */
    calcularRuta(puntoInicio, puntoFin, safetyFactor) {
        return new Promise((resolve, reject) => {
            if (!this.graphService.isValid()) {
                console.error("❌ No se puede calcular la ruta: el grafo no está inicializado");
                resolve(false);
                return;
            }

            const grafo = this.graphService.getGrafo();
            
            // Encontrar los nodos más cercanos en el grafo
            const nodoInicio = encontrarNodoMasCercano(grafo, puntoInicio);
            const nodoFin = encontrarNodoMasCercano(grafo, puntoFin);
            
            console.log(`✔️ Nodo inicio: ${nodoInicio}, Nodo fin: ${nodoFin}`);
            
            if (!nodoInicio || !nodoFin) {
                console.error('❌ No se encontraron nodos cercanos para los puntos seleccionados.');
                resolve(false);
                return;
            }
            
            // Calcular la ruta usando Dijkstra
            const ruta = dijkstra(grafo, nodoInicio, nodoFin, safetyFactor);

            if (!ruta || ruta.length === 0) {
                console.error('❌ No se pudo encontrar una ruta entre los puntos seleccionados.');
                resolve(false);
                return;
            }
            
            resolve(ruta);
        });
    }
}
