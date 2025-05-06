import 'api-sitna'; // Importing the SITNA API
import { municipios } from './layers/municipios.model';
import { puntosRiesgo } from './layers/puntosRiesgo.model';
import { redCiclista } from './layers/redCiclista.model';

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
});
