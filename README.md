# Peligrosidad RMC Pamplona
Proyecto basado en API Sitna.
El objetivo es realizar un cálculo de índices de peligrosidad asociados a cada tipo de vía de la Red de Movilidad Ciclista de la ciudad de Pamplona.

## Autoría

Proyecto desarrollado por Kimia Jiménez Majidí ([@KimiaJM](https://github.com/KimiaJM)).

Contacto: kjimenezma@uoc.edu

## Estructura del proyecto
```
peligrosidad-rmc-pamplona
├── src/
│   ├── controllers/ # Controlador que maneja las interacciones con el mapa
│   │   └── mapController.js
│   ├── data/        # Contiene datos requeridos para el funcionamiento de la aplicación
│   │   ├── INFRAE_Lin_TrazadoSIGMC.geojson
│   │   ├── prep/    # Contiene los archivos necesarios para algunos preparativos que hacen posible el funcionamiento de la aplicación
│   │   ├── indicesPeligrosidad.js
│   │   └── mapaVectorial_carrilesBici_Pamplona.geojson
│   ├── layers/      # Definición de las capas añadidas al mapa
│   │   ├── redCiclista.model.js
│   │   ├── puntosRiesgo.model.js
│   │   ├── rutaCalculada.model.js
│   ├── map/         # Definiciones necesarias para el mapa
│   │   └── graphBuilder.js      # Construcción del grafo a partir del GeoJson dado
│   ├── services/    # Servicios para cálculos y procesamientos
│   │   ├── graphService.js      # Verificaciones y enriquecimiento de grafo
│   │   └── rutaService.js       # Busca nodo cercano y calcula ruta
│   ├── utils/       # Contiene utilidades varias
│   │   ├── conversorCoords.js   # Ofrece la posibilidad de convertir entre coordenadas UMT y WGS84
│   │   ├── dijkstra.js          # Algoritmo específico para la búsqueda del camino óptimo
│   │   └── graphUtils.js        # Función para encontrar el nodo más cercano
│   ├── index.html        # Estructura HTML de la aplicación
│   ├── main.js           # Main JavaScript (entry point). Carga mapa Sitna, añade capas y carga los servicios necesarios para la visualización de la ruta y su resumen
│   └── styles/
│       └── main.css      # Estilos CSS de la aplicación
├── webpack.config.js     # Fichero de configuración Webpack 
├── package.json          # Fichero de configuración npm
└── README.md             # Documentación del proyecto
```

## ¿Cómo usarlo?

### Pre-requisitos
- Se requiere tener Node.js y npm instalados en la máquina local.

### Instalación
1. Clonar el repositorio:
   ```
   git clone <repository-url>
   cd peligrosidad-rmc-pamplona
   ```

2. Instalar las dependencias:
   ```
   npm install
   ```

### Compilar la aplicación para un entorno de producción
Para compilar la aplicación para un entorno de producción, utilizar el siguiente comando:
```
npm run build
```

### Ejecutar la aplicación
Para iniciar la aplicación, utilizar el siguiente comando:

```
npm start
```
Esto compilará el proyecto y lo servirá de forma loca.
Para acceder a la aplicación, se abrirá un navegador y accederá al sitio `http://localhost:8080` para visualizar el visor del mapa interactivo.


### Uso de API SITNA
La API SITNA API forma parte de este proyecto y es utilizada para renderizar el mapa en el fichero `index.html`. El mapa se mostrará en el elemento div con el id="mapa".

### Contribuir
Para contribuir con este proyecto, por favor, contacte con la autora.

### Licencia
Este proyecto está bajo licencia MIT.