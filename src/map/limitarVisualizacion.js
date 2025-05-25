/**
 * Función para limitar la visualización del mapa al municipio de Pamplona
 * usando coordenadas predefinidas
 * @param {Object} map - Instancia de SITNA.Map
 */
export function limitarAPamplona(map) {
    // Coordenadas aproximadas del municipio de Pamplona/Iruña (ETRS89 / UTM zone 30N)
    const pamplonaExtent = [
        606014, 4738070,  // Esquina suroeste aproximada
        614358, 4744166   // Esquina noreste aproximada
    ];
    
    setTimeout(() => {
        map.setExtent(pamplonaExtent);
        console.log("Vista limitada en la ciudad de Pamplona");
    }, 1000); // Pequeño retraso para asegurar que el mapa esté listo
}
