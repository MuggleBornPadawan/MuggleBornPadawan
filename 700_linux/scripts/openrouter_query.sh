#!/bin/bash
#
# This script queries the OpenRouter API with a user-provided prompt.
#
# Copyright (C) 2025 MuggleBornPadawan
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.
#

# --- Configuration Settings ---
# Externalize settings using configuration management and environmental variables.
# For simplicity, fixed values are hardcoded here, but could be read from a config file or env vars.
# Variable naming convention: use camelCase, descriptive self documenting names.
declare -r openRouterApiBaseUrl="https://openrouter.ai/api/v1/chat/completions"
declare -r openRouterModel="moonshotai/kimi-k2:free"
#declare -r openRouterModel="deepseek/deepseek-r1-0528-qwen3-8b:free"
#declare -r openRouterModel="deepseek/deepseek-r1-0528:free"
#declare -r openRouterModel="qwen/qwen3-235b-a22b:free"
#declare -r openRouterModel="microsoft/phi-4-reasoning-plus:free"
#declare -r openRouterModel="https://openrouter.ai/google/gemma-3n-e4b-it:free"

declare -r openRouterApiKeyPath="OPENROUTER_API_KEY" # Path in your 'pass' store

# --- Input Validation and Error Handling ---
# Build unwavering resilience with defensive programming.
# Ensure strategic error handling & exception management for undeniable resilience.
if [[ -z "$1" ]]; then
    echo "Error: Please provide a query as the first argument." >&2
    echo "Usage: $(basename "$0") \"Your query here\"" >&2
    exit 1
fi

declare -r userQuery="$1" # Capture the entire first argument as the query.
echo "Debug: User query received: \"$userQuery\"" # Basic logging for visibility

# --- Secure API Key Retrieval ---
# Meticulously handle external libraries with robust dependency management.
# Externalize settings using configuration management and environmental variables.
echo "Attempting to retrieve OpenRouter API key from 'pass'..."
declare openRouterApiKey="" # Declare variable first

# Check if 'pass' command is available
if ! command -v pass &> /dev/null; then
    echo "Error: 'pass' command not found. Please ensure it is installed and in your PATH." >&2
    exit 1
fi

# Attempt to retrieve the API key; redirect stderr to /dev/null to keep output clean,
# and check the exit status for success/failure.
if ! openRouterApiKey=$(pass show "$openRouterApiKeyPath" 2>/dev/null); then
    echo "Error: Failed to retrieve OpenRouter API key from 'pass'." >&2
    echo "Please ensure the entry 'pass show $openRouterApiKeyPath' exists and is accessible." >&2
    exit 1
fi

if [[ -z "$openRouterApiKey" ]]; then
    echo "Error: Retrieved an empty API key from 'pass'. Check your '$openRouterApiKeyPath' entry." >&2
    exit 1
fi
echo "Successfully retrieved API key."

# --- JSON Payload Construction ---
# Craft intuitive API design & integration.
# Embed security considerations from the outset—never treat it as an afterthought.
echo "Constructing JSON payload..."
declare -r requestPayload=$(jq -n \
    --arg model "$openRouterModel" \
    --arg content "$userQuery" \
    '{
        model: $model,
        messages: [
            {
                role: "user",
                content: $content
            }
        ]
    }')

# Check if jq successfully created the payload
if [[ -z "$requestPayload" ]]; then
    echo "Error: Failed to construct JSON payload. Is 'jq' installed correctly?" >&2
    exit 1
fi
echo "JSON payload constructed successfully."
# echo "Debug: Payload: $requestPayload" # Uncomment for debugging the payload

# --- API Call Execution and Response Processing ---
# Maintain crucial system visibility with robust logging & monitoring.
# Optimize performance through meticulous profiling, not guesswork (though less relevant for 'curl').
echo "Sending request to OpenRouter API..."
declare -r apiResponse=$(curl --silent --show-error \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $openRouterApiKey" \
    -d "$requestPayload" \
    "$openRouterApiBaseUrl")

# Check curl exit status
if [[ $? -ne 0 ]]; then
    echo "Error: curl command failed. Check network connectivity or API endpoint." >&2
    # curl --show-error already prints error to stderr.
    exit 1
fi

# Pretty-print the JSON response using jq
#  echo "--- OpenRouter API Response ---"
#  if ! echo "$apiResponse" | jq .; then
#      echo "Error: Failed to parse JSON response with 'jq'. Raw response:" >&2
#      echo "$apiResponse" >&2
#      exit 1
#  fi

# Attempt to extract and display only the content of the AI's message
echo "--- OpenRouter AI Response ---"
if ! echo "$apiResponse" | jq -r '.choices[0].message.content'; then
    # If the above jq command fails (e.g., response structure is unexpected),
    # print the raw response for debugging.
    echo "Error: Failed to extract AI response content. Raw JSON response was:" >&2
    echo "$apiResponse" >&2
    exit 1
fi
echo "--- End of Response ---"
