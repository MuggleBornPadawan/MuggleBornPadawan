#!/usr/bin/env bash
#
# ask-models.sh - Query multiple OpenRouter AI models from a local file.
#
# Author: Your Name <you@example.com>
# Version: 3.0.0
# License: GPL-3.0
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

# --- Configuration ---
# The log file will be created in the user's home directory.
readonly LOG_FILE="${HOME}/model_answers.log"
# Path to the API key in the 'pass' store.
readonly PASS_PATH="OPENROUTER_API_KEY"

# --- Script Rigor ---
# Set strict error-handling modes for robustness.
set -euo pipefail

# --- Functions ---

# Function to check for required dependencies.
check_dependencies() {
    local has_errors=0
    for cmd in curl jq pass; do
        if ! command -v "$cmd" &> /dev/null; then
            echo "Error: Required command '$cmd' is not installed." >&2
            has_errors=1
        fi
    done

    if [[ "$has_errors" -ne 0 ]]; then
        exit 1
    fi
}

# Function to display usage information.
print_usage() {
    echo "Usage: $0 \"<Your question here>\""
    echo "Example: $0 \"Explain quantum entanglement in one paragraph.\""
}

# --- Main Logic ---
main() {
    check_dependencies

    # Validate input: ensure a question is provided.
    if [[ $# -eq 0 || -z "$1" ]]; then
        echo "Error: No question provided." >&2
        print_usage
        exit 1
    fi

    local strUserQuestion="$1"
    
    # Determine the script's own directory to find models.txt robustly.
    local SCRIPT_DIR
    SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
    local strModelsFile="${SCRIPT_DIR}/models.txt"

    # Check if the models file exists and is readable in the script's directory.
    if [[ ! -f "$strModelsFile" || ! -r "$strModelsFile" ]]; then
        echo "Error: 'models.txt' not found or is not readable in the script's directory: ${SCRIPT_DIR}" >&2
        exit 1
    fi

    # Fetch the API key securely from pass.
    local strApiKey
    strApiKey=$(pass "${PASS_PATH}")
    if [[ -z "$strApiKey" ]]; then
        echo "Error: Could not retrieve API key from pass at path '${PASS_PATH}'." >&2
        exit 1
    fi

    # Log the start of the query session to screen and file.
    {
        printf "==================================================\n"
        printf "Query Timestamp: %s\n" "$(date)"
        printf "Question: %s\n" "$strUserQuestion"
        printf "==================================================\n"
    } | tee -a "$LOG_FILE"


    # Read the models file line by line.
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip empty or commented lines.
        if [[ -z "$line" || "$line" == \#* ]]; then
            continue
        fi

        # Parse the model name, removing anything after a colon (e.g., ':free').
        local model
        model=$(echo "$line" | cut -d':' -f1 | tr -d '"')

        {
            printf "\n--------------------------------------------------\n"
            printf "🤖 Querying Model: %s\n" "$model"
            echo -e "--------------------------------------------------\n\n"
        } | tee -a "$LOG_FILE"

        # Construct the JSON payload.
        json_payload=$(jq -n \
            --arg model "$model" \
            --arg question "$strUserQuestion" \
            '{
                "model": $model,
                "messages": [
                    { "role": "user", "content": $question }
                ]
            }')

        # The API call itself.
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
            -X POST "https://openrouter.ai/api/v1/chat/completions" \
            -H "Authorization: Bearer ${strApiKey}" \
            -H "Content-Type: application/json" \
            -d "$json_payload") || true

        http_body=$(echo "$response" | sed '$d')
        http_status=$(echo "$response" | tail -n1 | cut -d: -f2)

        # Handle API response and log appropriately.
        if [[ "$http_status" -ne 200 ]]; then
            {
                printf "❗️ Error fetching response for %s (HTTP Status: %s)\n" "$model" "$http_status"
                /usr/bin/printf "Response Body:\n%s\n\n" "$http_body"
            } | tee -a "$LOG_FILE"
        else
            answer=$(echo "$http_body" | jq -r '.choices[0].message.content')
            if [[ "$answer" == "null" || -z "$answer" ]]; then
                printf "❗️ Could not parse a valid answer from the API response for %s.\n\n" "$model" | tee -a "$LOG_FILE"
            else
                /usr/bin/printf "%s\n\n" "$answer" | tee -a "$LOG_FILE"
            fi
        fi
    done < "$strModelsFile"
}

# Execute the main function.
main "$@"
