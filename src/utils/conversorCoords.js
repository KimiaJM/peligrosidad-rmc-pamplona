import proj4 from 'proj4';

/**
 * Define la proyección UTM para la zona 30N (EPSG:25830) que corresponde a Pamplona
 */
proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

/**
 * Convierte coordenadas UTM (ETRS89/UTM zone 30N - EPSG:25830) a WGS84 (EPSG:4326)
 * @param {Array<number>} utmCoords - Coordenadas UTM [este, norte] en metros
 * @returns {Array<number>} - Coordenadas WGS84 [longitud, latitud] en grados
 */
export function utmToWgs84(utmCoords) {
    return proj4("EPSG:25830", "WGS84", utmCoords);
}

/**
 * Convierte coordenadas WGS84 (EPSG:4326) a UTM (ETRS89/UTM zone 30N - EPSG:25830)
 * @param {Array<number>} wgs84Coords - Coordenadas WGS84 [longitud, latitud] en grados
 * @returns {Array<number>} - Coordenadas UTM [este, norte] en metros
 */
export function wgs84ToUtm(wgs84Coords) {
    return proj4("WGS84", "EPSG:25830", wgs84Coords);
}

// Ejemplo de uso:
// const utmCoords = [613251.0929, 4741213.2133];
// const wgs84Coords = utmToWgs84(utmCoords);
// console.log(wgs84Coords); // -> [lon, lat] (ej. [-1.640..., 42.817...])
