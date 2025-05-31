/**
 * Configura el zoom inicial del mapa al municipio de Pamplona
 * usando coordenadas predefinidas
 * @param {Object} map - Instancia de SITNA.Map
 */
export function zoomEnPamplona(map) {
    const pamplonaExtent = [
        606014, 4738070,  // Esquina suroeste aproximada de Pamplona
        614358, 4744166   // Esquina noreste aproximada de Pamplona
    ];
    
    setTimeout(() => {
        map.setExtent(pamplonaExtent);
    }, 1000); // Pequeño retraso para asegurar que el mapa esté cargado
}

/**
 * Configura los eventos de interacción del mapa
 * @param {Object} map - Instancia del mapa SITNA
 * @param {Object} routeManager - Instancia del gestor de rutas
 */
export function setupMapEvents(map, routeManager) {
    // Array para almacenar los puntos seleccionados
    let puntosSeleccionados = [];
    
    // Marcador para mostrar puntos seleccionados
    let markers = [];
    
    // Agregar un listener para clicks en el mapa
    map.on(SITNA.Consts.event.CLICK, async function(e) {
        if (!routeManager.grafo) {
            console.error("❌ El grafo no está inicializado. No se puede calcular la ruta.");
            return;
        }
        
        // Obtener las coordenadas del punto clickeado
        const punto = [e.point[0], e.point[1]];
        puntosSeleccionados.push(punto);
        
        // Añadir un marcador temporal en el punto seleccionado
        addMarker(map, punto, `Punto ${puntosSeleccionados.length}`);
        
        console.log(`Punto ${puntosSeleccionados.length} seleccionado: [${punto[0].toFixed(4)}, ${punto[1].toFixed(4)}]`);
        
        // Si ya tenemos dos puntos, calcular la ruta
        if (puntosSeleccionados.length === 2) {
            const origen = puntosSeleccionados[0];
            const destino = puntosSeleccionados[1];
            
            // Calcular la ruta
            const coordenadas = await routeManager.calcularRuta(origen, destino);
            
            // Reiniciar puntos seleccionados
            puntosSeleccionados = [];
            
            // Si la ruta no se pudo calcular, mostrar mensaje
            if (!coordenadas) {
                console.error('❌ No se pudo calcular la ruta entre los puntos seleccionados.');
                clearMarkers(map);
            }
            
            // Los marcadores se mantienen si la ruta se calculó correctamente
            setTimeout(() => clearMarkers(map), 5000); // Limpiar marcadores después de 5 segundos
        }
    });
    
    /**
     * Añade un marcador en el mapa
     * @param {Object} map - Instancia del mapa
     * @param {Array} coords - Coordenadas [lon, lat]
     * @param {String} title - Título del marcador
     */
    function addMarker(map, coords, title) {
        const marker = map.addMarker({
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
        markers.push(marker);
    }
    
    /**
     * Elimina todos los marcadores del mapa
     * @param {Object} map - Instancia del mapa
     */
    function clearMarkers(map) {
        markers.forEach(marker => {
            map.removeMarker(marker);
        });
        markers = [];
    }
}
