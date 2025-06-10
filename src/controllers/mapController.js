import { crearPolyline } from '../layers/rutaCalculada.model.js';

/**
 * Controlador centralizado para manejar todas las interacciones y visualizaciones del mapa
 */
export class MapController {
    /**
     * @param {Object} map - Instancia del mapa SITNA
     * @param {Object} rutaService - Servicio para calcular rutas
     */
    constructor(map, rutaService) {
        this.map = map;
        this.rutaService = rutaService;
        this.puntosSeleccionados = [];
        this.rutaActual = null;
        this.limpiarRutaBtn = document.getElementById('limpiarRuta');
    }

    /**
     * Inicializa todos los eventos y configuración inicial del mapa
     */
    init() {
        // Escuchar eventos de click en el mapa
        this.map.on(SITNA.Consts.event.CLICK, this.handleMapClick.bind(this));
        
        // Hacer zoom inicial a Pamplona
        this.zoomEnPamplona();
        
        // Opción de que el usuario limpie la ruta a mano
        if (this.limpiarRutaBtn) {
            this.limpiarRutaBtn.addEventListener('click', () => {
                this.limpiarRuta();
            });
        }
        
        console.log("✔️ Mapa inicializado: click para seleccionar puntos de ruta");
    }

    /**
     * Configura el zoom inicial del mapa al municipio de Pamplona
     */
    zoomEnPamplona() {
        const pamplonaExtent = [
            606014, 4738070,  // Esquina suroeste aproximada de Pamplona
            614358, 4744166   // Esquina noreste aproximada de Pamplona
        ];
        
        setTimeout(() => {
            this.map.setExtent(pamplonaExtent);
        }, 1000);
    }

    /**
     * Maneja los eventos de click en el mapa
     * @param {Object} e - Evento de click
     */
    handleMapClick(e) {
        // Verificar que el evento tiene coordenadas
        if (!e || !e.coordinate) {
            console.error('❌ Evento de click sin coordenadas válidas:', e);
            return;
        }
        
        // Usar e.coordinate para obtener las coordenadas del punto
        const coords = [e.coordinate[0], e.coordinate[1]];
        
        // Añadir el punto a la lista de seleccionados
        this.puntosSeleccionados.push(coords);
        const indice = this.puntosSeleccionados.length;
        
        console.log(`Punto ${indice} seleccionado: [${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}]`);
        
        // Si ya hay dos puntos, calcular la ruta
        if (this.puntosSeleccionados.length === 2) {
            const origen = this.puntosSeleccionados[0];
            const destino = this.puntosSeleccionados[1];
            
            // Calcular la ruta entre los puntos
            this.rutaService.calcularRuta(origen, destino, this.getSafetyFactor())
                .then(coordenadasRuta => {
                    if (coordenadasRuta) {
                        this.dibujarRutaEnMapa(coordenadasRuta);
                    } else {
                        console.error('❌ No se pudo calcular la ruta entre los puntos seleccionados.');
                    }
                })
                .catch(error => {
                    console.error('❌ Error al calcular la ruta:', error);
                });
            
            // Reiniciar puntos seleccionados
            this.puntosSeleccionados = [];
        }
    }

    /**
     * Añade una ruta al mapa como una capa vectorial
     * @param {Array} coordenadasRuta - Array de coordenadas [lon, lat] que forman la ruta
     */
    dibujarRutaEnMapa(coordenadasRuta) {
        if (!coordenadasRuta || coordenadasRuta.length === 0) {
            console.error("❌ No hay coordenadas para dibujar la ruta");
            return;
        }

        // Limpiar la ruta (si existe)
        this.limpiarRuta();
        
        try {
            // Obtener la capa vectorial
            const vectorLayer = this.map.getLayer("rutaCalculada");
            
            if (!vectorLayer) {
                console.error("❌ No se encontró la capa 'rutaCalculada'");
                return;
            }
            
            // Crear una nueva polilínea usando la función del modelo
            const rutaPolyline = crearPolyline(coordenadasRuta);
            
            // Añadir la polilínea a la capa vectorial
            vectorLayer.addPolyline(rutaPolyline);
            
            // Guardar referencia a la ruta actual
            this.rutaActual = rutaPolyline;
            
            // Habilitar el botón de limpiar ruta solo cuando haya una ruta dibujada
            if (this.limpiarRutaBtn) {
                this.limpiarRutaBtn.disabled = false;
            }
            
            console.log("✔️ Ruta dibujada en el mapa");
        } catch (error) {
            console.error(`❌ Error al dibujar la ruta: ${error.message}`);
        }
    }

    /**
     * Elimina la ruta actual dibujada en el mapa
     */
    limpiarRuta() {
        if (this.rutaActual) {
            const vectorLayer = this.map.getLayer("rutaCalculada");
            if (vectorLayer) {
                vectorLayer.removeFeature(this.rutaActual);
                console.log("✔️ Ruta eliminada del mapa");
            } else {
                console.error("❌ No se encontró la capa 'rutaCalculada' para limpiar la ruta");
            }
            this.rutaActual = null;
            
            // Deshabilitar el botón de limpiar ruta cuando no haya ruta
            if (this.limpiarRutaBtn) {
                this.limpiarRutaBtn.disabled = true;
            }
            
            // Limpiar el resumen de la ruta
            window.mostrarResumenRuta && window.mostrarResumenRuta({
                distancia: "",
                peligrosidad: "",
                tramos: ""
            });
        } else {
            console.warn("⚠️ No hay ruta actual para limpiar");
        }
    }

    /**
     * Actualiza el nivel de seguridad para recalcular rutas
     * @param {number} safetyFactor - Nuevo factor de seguridad
     */
    setSafetyFactor(factor) {
        this.safetyFactor = factor;
        console.log(`✔️ Safety factor actualizado a: ${factor}`);
    }

    /**
     * Lee el nivel de seguridad actual del mapa
     * @returns {number} safetyFactor - Factor de seguridad actual
     */
    getSafetyFactor() {
        return this.safetyFactor ? this.safetyFactor : 5; // Valor por defecto si no se ha establecido
    }
}
