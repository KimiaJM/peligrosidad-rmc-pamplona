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
        this.markers = [];
        this.rutaActual = null; // Agregamos esta propiedad para rastrear la ruta actual
    }

    /**
     * Inicializa todos los eventos y configuración inicial del mapa
     */
    inicializar() {
        // Escuchar eventos de click en el mapa
        this.map.on(SITNA.Consts.event.CLICK, this.handleMapClick.bind(this));
        
        // Hacer zoom inicial a Pamplona
        this.zoomEnPamplona();
        
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
        }, 1000); // Pequeño retraso para asegurar que el mapa esté cargado
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
        
        // Mostrar marcador en el mapa
        const indice = this.puntosSeleccionados.length;
        this.addMarker(coords, `Punto ${indice}`);
        
        console.log(`Punto ${indice} seleccionado: [${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}]`);
        
        // Si ya hay dos puntos, calcular la ruta
        if (this.puntosSeleccionados.length === 2) {
            const origen = this.puntosSeleccionados[0];
            const destino = this.puntosSeleccionados[1];
            
            // Calcular la ruta entre los puntos
            this.rutaService.calcularRuta(origen, destino)
                .then(coordenadasRuta => {
                    if (coordenadasRuta) {
                        this.dibujarRutaEnMapa(coordenadasRuta);
                    } else {
                        console.error('❌ No se pudo calcular la ruta entre los puntos seleccionados.');
                        setTimeout(() => this.removeMarkers(), 3000);
                    }
                })
                .catch(error => {
                    console.error('❌ Error al calcular la ruta:', error);
                    setTimeout(() => this.removeMarkers(), 3000);
                });
            
            // Reiniciar puntos seleccionados
            this.puntosSeleccionados = [];
        }
    }

    /**
     * Añade un marcador en el mapa
     * @param {Array} coords - Coordenadas [lon, lat]
     * @param {String} title - Título del marcador
     * @returns {Object} Identificador del marcador
     */
    addMarker(coords, title) {
        const marker = this.map.addMarker({
            id: `marker-${Date.now()}`,
            position: coords,
            title: title,
            showPopup: true,
            data: {
                point: true
            },
            style: {
                cls: 'tc-marker-route-point'
            }
        });
        this.markers.push(marker);
        return marker;
    }

    /**
     * Elimina todos los marcadores del mapa
     */
    removeMarkers() {
        this.markers.forEach(marker => {
            try {
                // Se llama al removeLayer nativo de la API de Sitna para eliminar marcadores
                const markerId = marker.id || marker;
                if (this.map.getLayer(markerId)) {
                    this.map.removeLayer(markerId);
                }
            } catch (e) {
                console.warn(`⚠️ Error al eliminar marcador: ${e.message}`);
            }
        });
        this.markers = [];
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

        // Limpiar la ruta anterior si existe
        this.limpiarRutaActual();
        
        // Guardar referencia a la ruta actual transformando el sistema de coordenadas
        this.rutaActual = coordenadasRuta;

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

        try {
            // Añadir la feature como una capa al mapa
            this.map.addLayer({
                id: "ruta-calculada",
                title: "Ruta calculada",
                type: SITNA.Consts.layerType.VECTOR,
                data: rutaFeature,
                styles: {
                    line: {
                        strokeColor: "#000000",
                        strokeWidth: 4,
                        strokeOpacity: 0.8
                    }
                }
            });
            
            console.log("✔️ Ruta dibujada en el mapa");
            console.log(rutaFeature);
        } catch (error) {
            console.error(`❌ Error al dibujar la ruta: ${error.message}`);
            
            // Si el error es que la capa ya existe, intentamos eliminarla y volver a añadirla
            if (error.message.includes("already exists")) {
                try {
                    this.map.removeLayer("ruta-calculada");
                    this.dibujarRutaEnMapa(coordenadasRuta); // Llamada recursiva una vez eliminada la capa
                } catch (e) {
                    console.error(`❌ Error al reintentar dibujar la ruta: ${e.message}`);
                }
            }
        }
    }

    /**
     * Elimina la capa de ruta actual del mapa
     */
    limpiarRutaActual() {
        const layerId = "ruta-calculada";
        try {
            if (this.map.getLayer(layerId)) {
                this.map.removeLayer(layerId);
                console.log("✔️ Ruta anterior eliminada");
            }
            this.rutaActual = null;
        } catch (error) {
            console.warn(`⚠️ No se pudo eliminar la ruta: ${error.message}`);
        }
    }

    /**
     * Limpia todos los elementos en el mapa (rutas y marcadores)
     */
    limpiarMapa() {
        this.limpiarRutaActual();
        this.removeMarkers();
        this.puntosSeleccionados = [];
    }
}
