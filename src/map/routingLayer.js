/**
 * Añade una ruta al mapa como una capa vectorial.
 * @param {SITNA.Map} map - Instancia del mapa SITNA.
 * @param {Array} rutaCoords - Coordenadas de la ruta.
 */
export function addRouteToMap(map, rutaCoords) {
    try {
        // Crear un feature de tipo LineString con las coordenadas
        const geometryCoords = rutaCoords.map(coord => {
            // Si las coordenadas están en formato "lng,lat" (string), convertirlas a array
            if (typeof coord === 'string') {
                return coord.split(',').map(Number);
            }
            return coord;
        });

        // Crear un GeoJSON para la ruta
        const routeGeoJson = {
            type: 'Feature',
            id: 'ruta-calculada', // ID necesario para el feature
            geometry: {
                type: 'LineString',
                coordinates: geometryCoords
            },
            properties: {
                name: 'Ruta calculada',
                description: 'Ruta óptima calculada'
            }
        };

        // Comprobar si ya existe una capa con el ID 'rutaCalculada'
        const existingLayer = map.getLayer('rutaCalculada');
        if (existingLayer) {
            // Si existe, eliminarla primero
            map.removeLayer(existingLayer);
        }

        // Añadir la nueva capa con la ruta
        map.addLayer({
            id: 'rutaCalculada',
            title: 'Ruta calculada',
            type: 'vector',
            data: [routeGeoJson],
            styles: {
                line: {
                    strokeColor: '#ff0000',
                    strokeWidth: 4,
                    strokeOpacity: 0.8
                }
            }
        });

        console.log('---> Ruta añadida al mapa correctamente');
    } catch (error) {
        console.error('---> Error al añadir la ruta al mapa:', error);
        throw error; // Re-lanzar el error para que se maneje en el nivel superior
    }
}
