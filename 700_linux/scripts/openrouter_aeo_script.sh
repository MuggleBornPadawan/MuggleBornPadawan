#!/bin/bash
cd

# GNU General Public License v3.0

# Copyright (C) 2025 Your Name Here (Replace with your actual name/info)
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

# Author: MuggleBornPadawan
# License: GNU GPL v3

# --- Configuration ---
# Externalize settings: Define your AI models and log file.
# Note: MODELS array can be easily extended or modified here.

#tencent / grok is the split

MODELS=(
    "x-ai/grok-4-fast:free"
    "openai/gpt-oss-20b:free"
    "anthropic/claude-3-haiku" 
    "google/gemini-2.5-flash-lite"
    "google/gemini-2.0-flash-exp:free"
    "google/gemma-3n-e4b-it:free"
    "nvidia/nemotron-nano-9b-v2:free"
    "amazon/nova-micro-v1"
    "mistralai/mistral-small-3.2-24b-instruct:free"
    "meta-llama/llama-3.3-8b-instruct:free"
    "meta-llama/llama-4-scout:free"
    "deepseek/deepseek-r1-0528:free"
    "deepseek/deepseek-chat-v3.1:free"
    "qwen/qwen3-235b-a22b:free"
    "qwen/qwen3-coder:free"
    "z-ai/glm-4.5-air:free"
    "moonshotai/kimi-k2:free"
    "tencent/hunyuan-a13b-instruct:free"
    "x-ai/grok-4-fast:free"
    "deepseek/deepseek-chat-v3.1:free"
    "deepseek/deepseek-r1-0528:free"
    "deepseek/deepseek-chat-v3-0324:free"
    "deepseek/deepseek-r1:free"
    "z-ai/glm-4.5-air:free"
    "tngtech/deepseek-r1t2-chimera:free"
    "qwen/qwen3-coder:free"
    "qwen/qwen3-235b-a22b:free"
    "tngtech/deepseek-r1t-chimera:free"
    "qwen/qwen3-235b-a22b:free"
    "microsoft/mai-ds-r1:free"
    "google/gemini-2.0-flash-exp:free"
    "meta-llama/llama-3.3-70b-instruct:free"
    "nvidia/nemotron-nano-9b-v2:free"
    "deepseek/deepseek-r1-distill-llama-70b:free"
    "openai/gpt-oss-20b:free"
    "deepseek/deepseek-r1-0528-qwen3-8b:free"
    "mistralai/mistral-small-3.2-24b-instruct:free"
    "qwen/qwen2.5-vl-72b-instruct:free"
    "meta-llama/llama-4-maverick:free"
    "cognitivecomputations/dolphin-mistral-24b-venice-edition:free"
    "mistralai/mistral-nemo:free"
    "qwen/qwen3-14b:free"
    "meta-llama/llama-3.3-8b-instruct:free"
    "moonshotai/kimi-dev-72b:free"
    "google/gemma-3-27b-it:free"
    "qwen/qwen3-30b-a3b:free"
    "agentica-org/deepcoder-14b-preview:free"
    "mistralai/mistral-7b-instruct:free"
    "qwen/qwen-2.5-coder-32b-instruct:free"
    "meta-llama/llama-4-scout:free"
    "qwen/qwen-2.5-72b-instruct:free"
    "mistralai/mistral-small-3.1-24b-instruct:free"
    "qwen/qwen3-8b:free"
    "qwen/qwen2.5-vl-32b-instruct:free"
    "shisa-ai/shisa-v2-llama3.3-70b:free"
    "moonshotai/kimi-vl-a3b-thinking:free"
    "qwen/qwen3-4b:free"
    "cognitivecomputations/dolphin3.0-mistral-24b:free"
    "nousresearch/deephermes-3-llama-3-8b-preview:free"
    "mistralai/devstral-small-2505:free"
    "moonshotai/kimi-k2:free"
    "tencent/hunyuan-a13b-instruct:free"
    "mistralai/mistral-small-24b-instruct-2501:free"
    "meta-llama/llama-3.2-3b-instruct:free"
    "arliai/qwq-32b-arliai-rpr-v1:free"
    "google/gemma-3-12b-it:free"
    "google/gemma-2-9b-it:free"
    "cognitivecomputations/dolphin3.0-r1-mistral-24b:free"
    "google/gemma-3n-e2b-it:free"
    "google/gemma-3n-e4b-it:free"
    "google/gemma-3-4b-it:free"
    "openai/gpt-oss-120b:free"
)    

#    "openai/gpt-5-nano"
#    "openrouter/horizon-beta"
#    "google/gemini-2.5-pro"
#    "x-ai/grok-3-mini"
#    "sarvamai/sarvam-m:free"
#    "nvidia/llama-3.1-nemotron-ultra-253b-v1:free"


# Output log file
LOG_FILE="aeo_results_log.txt"

# OpenRouter API Endpoint
API_ENDPOINT="https://openrouter.ai/api/v1/chat/completions"

# Context for the AI models
CONTEXT_PHRASE="art"

# --- Core Best Practices Adherence ---
# Robust logging & monitoring: Ensure script progress and issues are visible.
# Defensive programming: Check for dependencies, files, and API key.
# Idempotency: While not strictly idempotent for API calls, the logging prevents redundant re-processing.
# Configuration management: MODELS array and LOG_FILE are easily adjustable.
# Error handling & exception management: Implemented with retries.
# Modularity & SRP: Functions for specific tasks.
# DRY: Helper functions reduce code repetition.
# KISS & YAGNI: Only essential dependencies (curl, jq), no unnecessary complexity.

# --- Global Variables ---
# We're using a counter to provide progress reporting.
declare -i currentQuestionNum=0
declare -i totalQuestions=0

# --- Function Definitions ---

## Function: log_message
# Purpose: Appends a message to the log file and optionally prints to stderr.
# Args: $1 (message to log), $2 (optional: "terminal" to print to stderr)
log_message() {
    local message="$1"
    local output_to_terminal="$2"
    echo "$message" >> "$LOG_FILE"
    if [[ "$output_to_terminal" == "terminal" ]]; then
        echo "$message" >&2 # Print to stderr for immediate visibility of critical logs
    fi
}

## Function: get_api_key
# Purpose: Retrieves the OpenRouter API key securely from pass.
# Returns: API key string or exits if not found.
# Error Handling: If 'pass' command fails or key isn't found, logs and exits.
get_api_key() {
    echo "Attempting to retrieve OpenRouter API key from 'pass openrouter/api-key'..." >&2
    if ! command -v pass &>/dev/null; then
        log_message "ERROR: 'pass' command not found. Please install 'pass' to manage your API keys securely." "terminal"
        exit 1
    fi

    local apiKey
    apiKey=$(pass OPENROUTER_API_KEY 2>/dev/null)
    if [ -z "$apiKey" ]; then
        log_message "ERROR: OpenRouter API key not found in 'pass' at 'openrouter/api-key'. Please ensure it's set up correctly." "terminal"
        exit 1
    fi
    echo "$apiKey" # Output the key
}

## Function: shuffle_questions
# Purpose: Reads questions from a file, shuffles them, and returns them as a newline-separated string.
# Args: $1 (path to questions file)
# Returns: Shuffled questions string.
# Error Handling: Checks if the file exists and is readable.
shuffle_questions() {
    local questionsFile="$1"
    if [[ ! -f "$questionsFile" ]]; then
        log_message "ERROR: Questions file not found: $questionsFile" "terminal"
        exit 1
    fi
    if [[ ! -r "$questionsFile" ]]; then
        log_message "ERROR: Questions file not readable: $questionsFile" "terminal"
        exit 1
    fi
    shuf "$questionsFile"
}

## Function: call_openrouter_api
# Purpose: Sends a question and context to an AI model via OpenRouter API.
# Args: $1 (model name), $2 (question), $3 (OpenRouter API Key)
# Returns: JSON response from the API.
# Error Handling: Retries on failure, logs errors.
call_openrouter_api() {
    local model="$1"
    local question="$2"
    local apiKey="$3"
    local attempt=1
    local max_attempts=2 # Initial attempt + one retry

    while [ "$attempt" -le "$max_attempts" ]; do
        local start_time=$(date +%s.%N) # High-precision timestamp

        # Construct JSON payload using jq for robustness.
        # This prevents issues with special characters in question or context.
        local json_payload
        json_payload=$(jq -n \
            --arg model "$model" \
            --arg question "$question" \
            --arg context "$CONTEXT_PHRASE" \
            '{
                model: $model,
                messages: [
                    {role: "user", content: $question}
                ]
            }')

        # Perform the curl request
        local response
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\nTOTAL_TIME:%{time_total}" \
            -X POST "$API_ENDPOINT" \
            -H "Authorization: Bearer $apiKey" \
            -H "Content-Type: application/json" \
            -d "$json_payload")

        local http_status=$(echo "$response" | awk -F: '/HTTP_STATUS/{print $2}')
        local total_time=$(echo "$response" | awk -F: '/TOTAL_TIME/{print $2}')
        local api_response=$(echo "$response" | sed -e '/HTTP_STATUS/d' -e '/TOTAL_TIME/d')

        local end_time=$(date +%s.%N)
        #local latency=$(echo "$end_time - $start_time" | bc -l | awk '{printf "%.2f", $1}') # Calculate latency

        if [[ "$http_status" -eq 200 ]]; then
            echo "$api_response" # Return the successful API response
            #echo "API_LATENCY:$latency" # Return latency as a special marker
            echo "HTTP_STATUS:$http_status" # Return HTTP status as a special marker
            return 0 # Success
        else
            log_message "WARNING: Attempt $attempt failed for model '$model' with question '$question'. HTTP Status: $http_status. Response: $api_response" "terminal"
            if [ "$attempt" -lt "$max_attempts" ]; then
                log_message "Pausing for 2 seconds before retrying..." "terminal"
                #sleep 2
            fi
            attempt=$((attempt + 1))
        fi
    done

    log_message "ERROR: Failed to get response after $max_attempts attempts for model '$model' with question '$question'." "terminal"
    return 1 # Failure after retries
}

## Function: parse_api_response
# Purpose: Parses the plain text answer and metadata from the raw API JSON response.
# Args: $1 (raw JSON response), $2 (latency), $3 (http_status)
# Returns: Parsed answer and metadata.
# Error Handling: Robustly handles cases where 'jq' might fail to find the path.
parse_api_response() {
    local raw_json="$1"
    local latency="$2"
    local http_status="$3"

    # Use 'jq -r' for raw output (no quotes)
    local answer=$(echo "$raw_json" | jq -r '.choices[0].message.content // "N/A"' 2>/dev/null)

    if [ -z "$answer" ] || [ "$answer" == "N/A" ]; then
        log_message "WARNING: Could not parse answer from API response. Raw JSON: $raw_json" "terminal"
        answer="[PARSE ERROR: Could not extract answer]"
    fi

    echo "Answer:$answer"
    echo "Meta: Latency=${latency}s; HTTP=${http_status}"
}

## Function: process_question_with_model
# Purpose: Orchestrates the process of sending a question to a single model, logging, and reporting.
# Args: $1 (question), $2 (model), $3 (API Key)
process_question_with_model() {
    local question="$1"
    local model="$2"
    local apiKey="$3"

    echo "---" >&2
    echo "Processing question [$(($currentQuestionNum + 1))/$totalQuestions] for model: $model" >&2
    echo "Date and time: $(date)"
    echo "Question: $question" >&2
    echo "---" >&2

    local raw_api_output
    raw_api_output=$(call_openrouter_api "$model" "$question" "$apiKey")
    local api_call_status=$?

    local current_timestamp=$(date +"%Y-%m-%d %H:%M:%S")

    log_message "=================================================="
    log_message "Timestamp: $current_timestamp"
    log_message "Question: $question"
    log_message "Model: $model"

    if [ "$api_call_status" -eq 0 ]; then
        local latency=$(echo "$raw_api_output" | awk -F: '/API_LATENCY/{print $2}')
        local http_status=$(echo "$raw_api_output" | awk -F: '/HTTP_STATUS/{print $2}')
        local actual_json=$(echo "$raw_api_output" | sed -e '/API_LATENCY/d' -e '/HTTP_STATUS/d')

        local parsed_output
        parsed_output=$(parse_api_response "$actual_json" "$latency" "$http_status")
        local answer=$(echo "$parsed_output" | awk -F: '/Answer/{print substr($0, index($0, ":")+1)}')
        local meta=$(echo "$parsed_output" | awk -F: '/Meta/{print substr($0, index($0, ":")+1)}')

        log_message "Answer:\n$answer"
        log_message "Meta: $meta"
    else
        log_message "Answer:\n[ERROR: API call failed for this question and model. See previous logs for details.]"
        log_message "Meta: Status=FAILED"
    fi
    log_message "=================================================="
    echo "" >> "$LOG_FILE" # Add an extra newline for readability between entries
}

# --- Main Script Execution ---

# Ensure we have curl and jq installed.
# From the perspective of Kevin Mitnick and Tsutomu Shimomura: "Always check your tools before the operation!"
echo "Checking for required dependencies: curl and jq..." >&2
if ! command -v curl &>/dev/null || ! command -v jq &>/dev/null; then
    log_message "CRITICAL ERROR: 'curl' or 'jq' not found. Please install them (e.g., 'sudo apt install curl jq') and retry." "terminal"
    exit 1
fi
echo "Dependencies found. Proceeding." >&2


# Step 1: Get the OpenRouter API Key
echo "Retrieving OpenRouter API key..." >&2
OPENROUTER_API_KEY=$(get_api_key)
echo "API key retrieved successfully." >&2
echo "---" >&2

# Step 2: Read and shuffle questions
echo "Reading and shuffling questions from questions.txt..." >&2
readarray -t SHUFFLED_QUESTIONS < <(shuffle_questions "questions.txt")
totalQuestions=${#SHUFFLED_QUESTIONS[@]}

if [[ "$totalQuestions" -eq 0 ]]; then
    log_message "ERROR: No questions found in questions.txt. Please ensure the file exists and contains questions." "terminal"
    exit 1
fi
echo "Found $totalQuestions questions. Shuffled." >&2
echo "---" >&2

# Step 3: Loop through each shuffled question
for question in "${SHUFFLED_QUESTIONS[@]}"; do
    currentQuestionNum=$((currentQuestionNum + 1))
    # Skip empty lines, just in case
    if [[ -z "$question" ]]; then
        echo "Skipping empty line in questions.txt..." >&2
        continue
    fi

    echo "Initiating processing for question #$currentQuestionNum..." >&2

    # Step 4: For each question, loop through each model
    for model in "${MODELS[@]}"; do
        process_question_with_model "$question" "$model" "$OPENROUTER_API_KEY"
    done

    # Step 5: Wait 30-60 seconds before the next question
    #random_sleep_time=.1 #$(( RANDOM % 5 + 1 )) # Generates a number between 1 and 6
    echo "---" >&2
    echo "Completed all models for current question. Pausing for $random_sleep_time seconds before next question..." >&2
    #sleep "$random_sleep_time"
    echo "Resume processing." >&2
done

echo "---" >&2
echo "All questions processed. Results logged to $LOG_FILE" >&2
echo "Script finished successfully!" >&2
