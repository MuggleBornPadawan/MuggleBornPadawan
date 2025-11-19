#!/bin/bash

# Fetch the JSON data from the Ollama API
json_data=$(curl -s https://ollama.com/api/tags)

# Parse the JSON data using jq to extract model names
# .models[] iterates over each object in the 'models' array
# .name extracts the value of the 'name' field from each object
echo "$json_data" | jq -r '.models[].name'