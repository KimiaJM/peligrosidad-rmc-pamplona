import 'api-sitna';
import { MapController } from './controllers/mapController.js';
import { puntosRiesgo } from './layers/puntosRiesgo.model.js';
import { redCiclista } from './layers/redCiclista.model.js';
import { rutaCalculada } from './layers/rutaCalculada.model.js';
import { GraphService } from './services/graphService.js';
import { RutaService } from './services/rutaService.js';

// Crear la instancia base del SITNA.Map
const map = new SITNA.Map('mapa');

// Cuando esté todo cargado se procede a trabajar con el mapa
map.loaded(async function () {
    console.log("Mapa cargado, inicializando aplicación...");

    // Añadir capas al mapa
    map.addLayer(redCiclista);
    map.addLayer(puntosRiesgo);
    map.addLayer(rutaCalculada);

    // Inicializar servicios
    const graphService = new GraphService();
    await graphService.init();
    
    if (graphService.isValid()) {
        console.log("✔️ Grafo inicializado correctamente.");
        
        // Inicializar el servicio de rutas
        const rutaService = new RutaService(map, graphService);
        
        // Inicializar el controlador del mapa
        const mapController = new MapController(map, rutaService);
        mapController.init();
        
        // Exponer el controlador globalmente para depuración
        window.mapController = mapController;
    } else {
        console.error("❌ No se pudo inicializar el grafo correctamente.");
    }
});