// filepath: /sitna-map-project/sitna-map-project/src/main.js
import 'api-sitna'; // Importing the SITNA API
import { bikeLanesLayer } from './layers/red-movilidad-ciclista';

// Define the base URL for the SITNA resources
const SITNA_BASE_URL = '/js/api-sitna/';

// Create an instance of the SITNA.Map class
const map = new SITNA.Map('mapa', {
    baseLayer: 'default', // Default base layer
    center: [-1.645, 42.816], // Example coordinates (center of Navarra)
    zoom: 10 // Example zoom level
});

// Añadimos la capa con la red de movilidad ciclista
map.addLayer(bikeLanesLayer).then(() => {
    console.log('---> Capa de carriles bici añadida con éxito!');
}).catch(error => {
    console.error('Error añadiendo la capa de carriles bici:', error);
});