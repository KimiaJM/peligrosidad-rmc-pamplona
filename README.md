# Peligrosidad RMC Pamplona

Cálculo de índices de peligrosidad asociados a la Red de Movilidad Ciclista de la ciudad de Pamplona

## Project Structure

```
sitna-map-project
├── src
│   ├── index.html        # HTML structure of the application
│   ├── main.js           # Main JavaScript entry point
│   └── styles
│       └── main.css      # CSS styles for the application
├── webpack.config.js     # Webpack configuration file
├── package.json          # npm configuration file
└── tsconfig.json         # TypeScript configuration file
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Basic knowledge of JavaScript and web development.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd peligrosidad-rmc-pamplona
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Build for production environment
To build the application for production environment, use the following command:
```
npm run build
```

### Running the Application

To start the application, use the following command:

```
npm start
```

This will build the project and serve it locally. Open your browser and navigate to `http://localhost:8080` to view the interactive map.

### Using the SITNA API

The SITNA API is included in this project and is used to render the map in the `index.html` file. The map will be displayed in the div element with the id "mapa".

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.