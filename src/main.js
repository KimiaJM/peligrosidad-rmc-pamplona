import 'api-sitna';
import { municipios } from './layers/municipios.model';
import { puntosRiesgo } from './layers/puntosRiesgo.model';
import { redCiclista } from './layers/redCiclista.model';
import { limitarAPamplona } from './map/limitarVisualizacion.js';
import { calcularRutaSegura } from './map/routingController.js';
// Importar directamente el archivo JSON para que webpack lo gestione

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
});

let puntos = [];

// Selección interactiva de puntos en el mapa
map.on(TC.Consts.event.CLICK, function (e) {
    const coords = [e.point[0], e.point[1]];
    puntos.push(coords);

    console.log(`Punto de inicio: ${puntos[0]}`);
    console.log(`Punto de destino: ${puntos[1]}`);
    // Si ya hay dos puntos, calcular la ruta
    

    const geoJsonURL = 'data/INFRAE_Lin_TrazadoSIGMC_Pamplona.geojson'
    if (puntos.length === 2) {
        calcularRutaSegura(map, geoJsonURL, puntos[0], puntos[1]);
        puntos = [];
    }
});
