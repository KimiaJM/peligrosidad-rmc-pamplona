/**
 * Proyecto: Peligrosidad RMC Pamplona
 * Autor: Kimia Jiménez Majidí ([@KimiaJM](https://github.com/KimiaJM))
 * Descripción: Main JavaScript (entry point). Carga mapa Sitna, añade capas y carga los servicios necesarios para la visualización de la ruta y su resumen.
 */

import 'api-sitna';
import { MapController } from './controllers/mapController.js';
import { puntosRiesgo } from './layers/puntosRiesgo.model.js';
import { redCiclista } from './layers/redCiclista.model.js';
import { rutaCalculada } from './layers/rutaCalculada.model.js';
import { GraphService } from './services/graphService.js';
import { RutaService } from './services/rutaService.js';

// Crear la instancia base del SITNA.Map
const map = new SITNA.Map('mapa');

let mapController;

// Añadimos el medidor de seguridad escogido por el usuario y su valor
const safetyRangeInput = document.getElementById('safetyRange');
const safetyValueDisplay = document.getElementById('safetyValue');

safetyRangeInput.addEventListener('input', () => {
    const value = parseInt(safetyRangeInput.value, 10);
    safetyValueDisplay.textContent = value;

    if (mapController && typeof mapController.setSafetyFactor === 'function') {
        mapController.setSafetyFactor(value);
    }
});

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
        
        mapController = new MapController(map, rutaService);
        mapController.init();
        
        // Exponer el controlador globalmente para depuración
        window.mapController = mapController;
    } else {
        console.error("❌ No se pudo inicializar el grafo correctamente.");
    }

    // Mostramos el resumen de la ruta
    window.mostrarResumenRuta = ({ distancia, peligrosidad, tramos }) => {
        document.getElementById("resumen-distancia").textContent = distancia;
        document.getElementById("resumen-peligrosidad").textContent = peligrosidad;
        document.getElementById("resumen-tramos").textContent = tramos;
    };

});