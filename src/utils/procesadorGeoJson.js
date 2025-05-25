
export function enrichFeaturesWithDanger(geojson, peligrosidadDict) {
    geojson.features.forEach(f => {
        const tipo = f.properties.TIPO_VIA || f.properties.TIPO_CARRIL || f.properties.tipo || '';
        f.properties.peligrosidad = peligrosidadDict[tipo.trim()] ?? null;
    });
    return geojson;
}

