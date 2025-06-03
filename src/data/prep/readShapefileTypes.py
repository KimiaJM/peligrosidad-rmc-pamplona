# AI Generated code to read a shapefile and extract unique types of bike lanes:
# This script reads a shapefile containing bike lane data and extracts unique types of bike lanes.
# It then saves these types to a JSON file with a default danger index of 0 for each type.
# --> Input file: INFRAE_Lin_TrazadoSIGMC.shp
# --> Output file: tiposCarrilBici.json

import geopandas as gpd
import os
import json

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(script_dir, os.pardir, os.pardir))
shapefile_path = os.path.join(project_root, 'data', 'INFRAE_Lin_TrazadoSIGMC', 'INFRAE_Lin_TrazadoSIGMC.shp')

def extract_unique_types():
    try:
        # Read the shapefile
        gdf = gpd.read_file(shapefile_path)
        
        # Print the column names to help identify which column contains the type information
        # print("Available columns:", gdf.columns.tolist())
        
        type_column = 'TIPOVIACIC'
        
        if type_column in gdf.columns:
            # Get unique values
            unique_types = gdf[type_column].unique().tolist()
            
            # Print unique types
            print(f"Se encontraron {len(unique_types)} tipos de carril bici:")
            for t in unique_types:
                print(f"  - '{t}'")
            
            # Create a dictionary with default danger index (you can adjust this later)
            danger_index = {t: 0 for t in unique_types}
            
            # Write to a JSON file for easy reference
            output_path = os.path.join(script_dir, 'tiposCarrilBici.json')
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(danger_index, f, ensure_ascii=False, indent=4)
            
            print(f"Types saved to {output_path}")
            
            return unique_types
        else:
            print(f"Column '{type_column}' not found. Available columns: {gdf.columns.tolist()}")
            print("Available columns are:")
            for col in gdf.columns.tolist():
                sample_values = gdf[col].unique()[:3].tolist()  # Show first 3 values as examples
                print(f"  - {col}: Example values: {sample_values}")
            
            # Ask the user to specify the correct column
            new_column = input("\nEnter the correct column name from the list above: ").strip()
            if new_column and new_column in gdf.columns:
                unique_types = gdf[new_column].unique().tolist()
                print(f"Found {len(unique_types)} unique types in column '{new_column}':")
                for t in unique_types:
                    print(f"  - '{t}'")
                
                danger_index = {t: 0 for t in unique_types}
                output_path = os.path.join(script_dir, 'unique_types.json')
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(danger_index, f, ensure_ascii=False, indent=4)
                
                print(f"Types saved to {output_path}")
                return unique_types
            else:
                print("Invalid column name provided.")
                return []
    
    except Exception as e:
        print(f"Error reading shapefile: {str(e)}")
        return []

if __name__ == "__main__":
    extract_unique_types()
