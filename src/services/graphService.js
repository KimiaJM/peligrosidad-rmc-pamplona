import { peligrosidadPorTipoVia } from '../data/indicesPeligrosidad.js';
import { construirGrafo } from '../map/graphBuilder.js';

/**
 * Servicio para manejar la inicialización y operaciones sobre el grafo
 */
export class GraphService {
    constructor() {
        this.grafo = null;
    }

    /**
     * Inicializa el grafo a partir del archivo GeoJSON
     * @param {string} rutaArchivo - Ruta al archivo GeoJSON
     * @returns {Promise<Object>} Grafo generado
     */
    async init(rutaArchivo = 'data/mapaVectorial_carrilesBici_Pamplona.geojson') {
        try {
            console.log("Comenzando la carga del archivo GeoJSON...");
            const response = await fetch(rutaArchivo);
            
            if (!response.ok) {
                throw new Error(`❌ Error al cargar el archivo GeoJSON: ${response.status}`);
            }
            
            const geojson = await response.json();
            console.log(`✔️ GeoJSON cargado con ${geojson.features ? geojson.features.length : 0} features`);
            
            // Verificar que el geojson tiene features
            if (!geojson.features || !Array.isArray(geojson.features) || geojson.features.length === 0) {
                throw new Error("❌ El archivo GeoJSON no contiene features");
            }

            // Enriquecer GeoJSON con índices de peligrosidad
            geojson.features.forEach(f => {
                f.properties.peligrosidad = peligrosidadPorTipoVia[f.properties.TIPOVIACIC.trim()] ?? null;
            });

            console.log("Construyendo grafo desde el GeoJSON...");
            this.grafo = construirGrafo(geojson);
            
            const numNodos = Object.keys(this.grafo.nodes).length;
            console.log(`✔️ Grafo generado con ${numNodos} nodos.`);
            
            if (numNodos === 0) {
                console.warn("⚠️ WARNING: El grafo se ha generado sin nodos. Esto puede indicar un problema con los datos GeoJSON.");
            }
            
            return this.grafo;
        } catch (error) {
            console.error("❌ Error al inicializar el grafo:", error);
            this.grafo = { nodes: {}, edges: {} };
            return this.grafo;
        }
    }

    /**
     * Verifica si el grafo está inicializado y contiene nodos
     * @returns {boolean} true si el grafo es válido
     */
    isValid() {
        return this.grafo && this.grafo.nodes && Object.keys(this.grafo.nodes).length > 0;
    }

    
    /**
     * Obtiene el grafo inicializado
     * @returns {Object} El grafo o null si no está inicializado
     */
    getGrafo() {
        return this.grafo;
    }
}
