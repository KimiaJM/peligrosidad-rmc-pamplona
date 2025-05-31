import 'api-sitna';
import { MapaController } from './controllers/mapaController.js';
import { puntosRiesgo } from './layers/puntosRiesgo.model';
import { redCiclista } from './layers/redCiclista.model';
import { zoomEnPamplona } from './map/mapEvents.js';
import { GrafoService } from './services/grafoService.js';
import { RutaService } from './services/rutaService.js';

// Crear la instancia base del SITNA.Map
const map = new SITNA.Map('mapa');

// Cuando esté todo cargado se procede a trabajar con el mapa
map.loaded(async function () {
    console.log("Mapa cargado, inicializando aplicación...");
    
    // Añadir capas al mapa
    map.addLayer(redCiclista);
    map.addLayer(puntosRiesgo);

    // Centrar el mapa en Pamplona
    zoomEnPamplona(map);

    // Inicializar servicios
    const grafoService = new GrafoService();
    await grafoService.init();
    
    if (grafoService.isValid()) {
        console.log("✔️ Grafo inicializado correctamente.");
        
        // Inicializar el servicio de rutas
        const rutaService = new RutaService(map, grafoService);
        
        // Inicializar el controlador del mapa
        const mapaController = new MapaController(map, rutaService);
        mapaController.inicializarEventos();
        
        // Exponer el controlador globalmente para depuración (opcional)
        window.mapaController = mapaController;
    } else {
        console.error("❌ No se pudo inicializar el grafo correctamente.");
    }
});