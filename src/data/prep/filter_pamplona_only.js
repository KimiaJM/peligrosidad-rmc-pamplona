const fs = require('fs');
const path = require('path');

// Function to filter GeoJSON features for a specific municipality
function filterByMunicipality(inputFilePath, outputFilePath, municipalityName) {
    try {
        // Read the input GeoJSON file
        const data = fs.readFileSync(inputFilePath, 'utf8');
        const geojson = JSON.parse(data);
        
        // Filter features for the specified municipality
        const filteredFeatures = geojson.features.filter(feature => 
            feature.properties && feature.properties.MUNICIPIO === municipalityName
        );
        
        // Create a new GeoJSON object with the filtered features
        const filteredGeojson = {
            type: geojson.type,
            name: geojson.name + '_' + municipalityName.toLowerCase().replace(/\s+\/\s+\w+/, '').replace(/\s+/g, '_'),
            crs: geojson.crs,
            features: filteredFeatures
        };
        
        // Write the filtered GeoJSON to the output file
        fs.writeFileSync(outputFilePath, JSON.stringify(filteredGeojson, null, 2));
        
        console.log(`Filtered ${filteredFeatures.length} features for ${municipalityName}`);
        console.log(`Output saved to: ${outputFilePath}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage
const inputFile = path.join(__dirname, 'mapaVectorial_carrilesBici.geojson');
const outputFile = path.join(__dirname, 'mapaVectorial_carrilesBici_pamplona.geojson');
filterByMunicipality(inputFile, outputFile, 'Pamplona / Iruña');
