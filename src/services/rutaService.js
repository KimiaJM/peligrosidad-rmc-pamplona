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
     * Calcula y muestra una ruta entre dos puntos
     * @param {Array} puntoInicio - Coordenadas de inicio [lon, lat]
     * @param {Array} puntoFin - Coordenadas de fin [lon, lat]
     * @returns {Promise<Array|boolean>} Promesa con las coordenadas de la ruta o false si falla
     */
    calcularRuta(puntoInicio, puntoFin) {
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
            const ruta = dijkstra(grafo, nodoInicio, nodoFin);
            
            if (!ruta || ruta.length === 0) {
                console.error('❌ No se pudo encontrar una ruta entre los puntos seleccionados.');
                resolve(false);
                return;
            }
            
            // Devolver las coordenadas de la ruta
            resolve(ruta);
        });
    }

    /**
     * Muestra una ruta en el mapa
     * @param {Array} coordenadasRuta - Coordenadas de la ruta a mostrar
     */
    mostrarRutaEnMapa(coordenadasRuta) {
        // Eliminar ruta anterior si existe
        this.limpiarRutaActual();
        
        // Guardar referencia a la ruta actual
        this.rutaActual = coordenadasRuta;
        
        // Añadir la ruta al mapa
        this.dibujarRutaEnMapa(coordenadasRuta);
    }

    /**
     * Dibuja una ruta en el mapa
     * @param {Array} coordenadasRuta - Array de coordenadas [lon, lat] que forman la ruta
     */
    dibujarRutaEnMapa(coordenadasRuta) {
        if (!coordenadasRuta || coordenadasRuta.length === 0) {
            console.error("❌ No hay coordenadas para dibujar la ruta");
            return;
        }

        // Crear una feature de tipo LineString con las coordenadas
        const rutaFeature = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: coordenadasRuta
            },
            properties: {
                name: "Ruta calculada"
            }
        };

        // Añadir la feature como una capa al mapa
        this.map.addLayer({
            id: "ruta-calculada",
            title: "Ruta calculada",
            type: SITNA.Consts.layerType.VECTOR,
            data: rutaFeature,
            styles: {
                line: {
                    strokeColor: "#FF0000",
                    strokeWidth: 4,
                    strokeOpacity: 0.8
                }
            }
        });
    }

    /**
     * Limpia la ruta actual del mapa
     */
    limpiarRutaActual() {
        if (this.rutaActual) {
            try {
                this.map.removeLayer('ruta-calculada');
            } catch (e) {
                console.log("❌ No se encontró una ruta anterior para eliminar");
            }
            this.rutaActual = null;
        }
    }

    /**
     * Añade un marcador en el mapa
     * @param {Array} coords - Coordenadas [lon, lat]
     * @param {string} titulo - Título del marcador
     */
    agregarMarcador(coords, titulo) {
        const marker = this.map.addMarker({
            id: `marker-${Date.now()}`,
            position: coords,
            title: titulo,
            showPopup: true,
            data: {
                point: true
            }
        });
        
        this.marcadores.push(marker);
        return marker;
    }

    /**
     * Limpia todos los marcadores del mapa
     */
    limpiarMarcadores() {
        this.marcadores.forEach(marker => {
            try {
                this.map.removeMarker(marker);
            } catch (e) {
                console.log("❌ Error al eliminar marcador:", e);
            }
        });
        
        this.marcadores = [];
    }
}
