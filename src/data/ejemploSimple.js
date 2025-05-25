// Ejemplo de GeoJSON simple con coordenadas válidas para Pamplona y una red conectada
export default {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": "ruta1",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [610500, 4741500],
                    [610550, 4741550],
                    [610600, 4741600]
                ]
            },
            "properties": {
                "MUNICIPIO": "Pamplona / Iruña",
                "TIPOVIACIC": "PBI (Pista bici)",
                "peligrosidad": 1.2
            }
        },
        {
            "type": "Feature",
            "id": "ruta2",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [610600, 4741600],
                    [610650, 4741625],
                    [610700, 4741650]
                ]
            },
            "properties": {
                "MUNICIPIO": "Pamplona / Iruña",
                "TIPOVIACIC": "CBL (Carril bici en plataforma peatonal)",
                "peligrosidad": 1.5
            }
        },
        {
            "type": "Feature",
            "id": "ruta3",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [610700, 4741650],
                    [610750, 4741675],
                    [610800, 4741700]
                ]
            },
            "properties": {
                "MUNICIPIO": "Pamplona / Iruña",
                "TIPOVIACIC": "SCI (Senda ciclable)",
                "peligrosidad": 2.0
            }
        },
        {
            "type": "Feature",
            "id": "ruta4",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [610800, 4741700],
                    [610850, 4741725],
                    [610900, 4741750]
                ]
            },
            "properties": {
                "MUNICIPIO": "Pamplona / Iruña",
                "TIPOVIACIC": "PBI (Pista bici)",
                "peligrosidad": 1.3
            }
        },
        {
            "type": "Feature",
            "id": "ruta5",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [610900, 4741750],
                    [610950, 4741775],
                    [611000, 4741800]
                ]
            },
            "properties": {
                "MUNICIPIO": "Pamplona / Iruña",
                "TIPOVIACIC": "PBI (Pista bici)",
                "peligrosidad": 1.0
            }
        }
    ]
};
