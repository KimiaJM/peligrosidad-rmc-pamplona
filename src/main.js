import 'api-sitna';
import { municipios } from './layers/municipios.model';
import { puntosRiesgo } from './layers/puntosRiesgo.model';
import { redCiclista } from './layers/redCiclista.model';
import { limitarAPamplona } from './map/limitarVisualizacion.js';
import { calcularRutaSegura } from './map/routingController.js';
// Importar directamente el archivo JSON para que webpack lo gestione
import ejemploSimple from './data/ejemploSimple.js';

// Crear la instancia base del SITNA.Map
const map = new SITNA.Map('mapa');

// Cuando esté todo cargado se procede a trabajar con el mapa
map.loaded(function () {
    // Se añade capa de red de movilidad ciclista
    map.addLayer(redCiclista);
    // Se añade capa de puntos de riesgo
    map.addLayer(puntosRiesgo);
    // Se añade capa de delimitación de municipios
    map.addLayer(municipios);

    // Centrar el mapa en Pamplona
    limitarAPamplona(map);
    
    console.log("Mapa inicializado y centrado en Pamplona");

    // Usar exactamente las coordenadas del primer y último punto del GeoJSON
    const start = ejemploSimple.features[0].geometry.coordinates[0];
    const end = ejemploSimple.features[ejemploSimple.features.length - 1].geometry.coordinates[ejemploSimple.features[ejemploSimple.features.length - 1].geometry.coordinates.length - 1];
    
    console.log(`Punto de inicio: ${start}`);
    console.log(`Punto de destino: ${end}`);
    
    // Usar el objeto GeoJSON directamente
    calcularRutaSegura(map, ejemploSimple, start, end);
});
