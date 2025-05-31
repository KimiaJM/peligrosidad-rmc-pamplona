import { dijkstra } from '../utils/dijkstra.js';
import { encontrarNodoMasCercano } from '../utils/graphUtils.js';
import { addRouteToMap } from '../utils/routeUtils.js';

/**
 * Servicio para gestionar el cálculo y visualización de rutas
 */
export class RutaService {
    constructor(map, grafoService) {
        this.map = map;
        this.grafoService = grafoService;
        this.rutaActual = null;
        this.marcadores = [];
    }

    /**
     * Calcula y muestra una ruta entre dos puntos
     * @param {Array} puntoInicio - Coordenadas de inicio [lon, lat]
     * @param {Array} puntoFin - Coordenadas de fin [lon, lat]
     * @returns {boolean} true si la ruta se calculó correctamente
     */
    calcularRuta(puntoInicio, puntoFin) {
        if (!this.grafoService.esValido()) {
            console.error("No se puede calcular la ruta: el grafo no está inicializado");
            return false;
        }

        const grafo = this.grafoService.obtenerGrafo();
        
        // Encontrar los nodos más cercanos en el grafo
        const nodoInicio = encontrarNodoMasCercano(grafo, puntoInicio);
        const nodoFin = encontrarNodoMasCercano(grafo, puntoFin);
        
        console.log(`Nodo inicio: ${nodoInicio}, Nodo fin: ${nodoFin}`);
        
        if (!nodoInicio || !nodoFin) {
            console.error('No se encontraron nodos cercanos para los puntos seleccionados.');
            return false;
        }
        
        // Calcular la ruta usando Dijkstra
        const ruta = dijkstra(grafo, nodoInicio, nodoFin);
        
        if (!ruta || ruta.length === 0) {
            console.error('No se pudo encontrar una ruta entre los puntos seleccionados.');
            return false;
        }
        
        // Mostrar la ruta en el mapa
        this.mostrarRutaEnMapa(ruta);
        return true;
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
        addRouteToMap(this.map, coordenadasRuta);
    }

    /**
     * Limpia la ruta actual del mapa
     */
    limpiarRutaActual() {
        if (this.rutaActual) {
            try {
                this.map.removeLayer('ruta-calculada');
            } catch (e) {
                console.log("No se encontró una ruta anterior para eliminar");
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
                console.log("Error al eliminar marcador:", e);
            }
        });
        
        this.marcadores = [];
    }
}
