#!/bin/bash
# GNU General Public License v3.0

# Copyright (C) 2025 Your Name Here (Replace with your actual name)

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.

# Author: MuggleBornPadawan
# Date: 2025-06-02
# Description: A helper function to test Gemini LLM's arithmetic capabilities (addition, subtraction, multiplication, division)
#              with large random numbers over multiple iterations for statistical significance.
# Dependencies: pass, curl, jq (recommended), bash (>= 4.0 for local variables)
# Version: 1.1

# --- Configuration ---
# IMPORTANT: Adjust this path to your actual pass entry for the Gemini API key.
API_KEY_PATH="GEMINI_API_KEY"

# Number of digits for the large random numbers. 18-19 digits fits within 64-bit signed integers.
RANDOM_NUM_DIGITS=4

# Gemini API Endpoint
GEMINI_API_ENDPOINT="https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"

# --- Helper Functions ---

# Function to check for required commands
_check_dependencies() {
    local missing_deps=()
    for cmd in "pass" "curl" "jq"; do
        if ! command -v "$cmd" &> /dev/null; then
            missing_deps+=("$cmd")
        fi
    done

    if [[ ${#missing_deps[@]} -ne 0 ]]; then
        echo "Error: The following required commands are not installed: ${missing_deps[*]}" >&2
        echo "Please install them to proceed. For Debian/Ubuntu, you can often use 'sudo apt install <package_name>'." >&2
        return 1
    fi
    return 0
}

# Function to generate a large random integer string
_generate_random_large_num() {
    # Using /dev/urandom for good randomness and 'head', 'tr', 'head -c'
    # to extract a specific number of digits.
    # We ensure it's not starting with '0' to avoid octal interpretation issues in bash arithmetic,
    # and also to avoid single-digit numbers for "large" requirement.
    # Note: `head -c` can sometimes return less than requested if /dev/urandom is exhausted
    # or if tr filters too many characters. For this scale, it's generally fine.
    local num
    while true; do
        num=$(head /dev/urandom | tr -dc 0-9 | head -c "$RANDOM_NUM_DIGITS")
        # Ensure it's not empty and doesn't start with 0 (unless it's just '0' itself, which is unlikely for 18 digits)
        if [[ -n "$num" && "$num" != "0" && "${num:0:1}" != "0" ]]; then
            echo "$num"
            break
        fi
    done
}

# --- Main Script Logic ---


# Core function to test Gemini's arithmetic for a single operation
_test_gemini_arithmetic_single_op() {
    local operation="$1" # e.g., "add", "subtract", "multiply", "divide"
    local num1="$2"
    local num2="$3"
    local api_key="$4"
    local llm_raw_output
    local llm_result
    local manual_result
    local operator_symbol

    # Determine the operator symbol for the prompt and manual calculation
    case "$operation" in
        "add") operator_symbol="+"; manual_result=$((num1 + num2));;
        "subtract") operator_symbol="-"; manual_result=$((num1 - num2));;
        "multiply") operator_symbol="*"; manual_result=$((num1 * num2));;
        "divide")
            operator_symbol="/"
            # For division, ensure num2 is not zero to prevent division by zero errors.
            # Also, handle potential non-integer results if LLM gives floats.
            if [[ "$num2" -eq 0 ]]; then
                echo "Skipping division by zero." >&2
                echo "SKIP" # Indicate skip due to invalid operation
                return 0
            fi
            # Bash integer division truncates, which is what we'll expect from LLM for simplicity.
            manual_result=$((num1 / num2))
            ;;
        *)
            echo "Error: Invalid operation '$operation' provided." >&2
            echo "ERROR"
            return 1
            ;;
    esac

    # The prompt is crucial here. We need to be *extremely* prescriptive.
    local LLM_PROMPT="You are a pure arithmetic calculator. I will give you two numbers and an operation ($operator_symbol), and you will return *only* their integer result. Do not include any other text, greetings, explanations, punctuation, or formatting whatsoever. Just the raw integer result.
    Perform the following: $num1 $operator_symbol $num2"

    # Construct the JSON payload
    local JSON_PAYLOAD=$(cat <<EOF
{
    "contents": [
        {
            "parts": [
                {"text": "$LLM_PROMPT"}
            ]
        }
    ]
}
EOF
)

    # Use curl to send the request.
    if ! llm_raw_output=$(curl -s --fail --show-error -X POST \
        -H "Content-Type: application/json" \
        -H "x-goog-api-key: $api_key" \
        "$GEMINI_API_ENDPOINT" \
        -d "$JSON_PAYLOAD"); then
        echo "API_ERROR"
        # Log raw output for debugging if API call failed
        echo "Debug: Raw API Response (on error for $operation $num1 $operator_symbol $num2): $llm_raw_output" >&2
        return 0 # Return 0 so it doesn't stop the loop, but mark as API_ERROR
    fi

    # Use jq to parse the JSON and extract the text.
    # Then use 'sed' to strip any non-digit characters. This is defensive parsing.
    # Common beginner mistake: Assuming LLM will always return perfect output.
    # We must account for unexpected characters.
    llm_result=$(echo "$llm_raw_output" | jq -r '.candidates[0].content.parts[0].text' 2>/dev/null | sed 's/[^0-9\-]//g') # Allow minus for negative results

    if [[ -z "$llm_result" ]]; then
        echo "PARSE_ERROR"
        echo "Debug: Failed to parse numerical result from Gemini API response for $operation $num1 $operator_symbol $num2." >&2
        echo "Debug: Raw LLM output for debugging: $llm_raw_output" >&2
        return 0 # Return 0, mark as PARSE_ERROR
    fi

    if [[ "$llm_result" -eq "$manual_result" ]]; then
        echo "T"
    else
        echo "F"
        echo "Debug: Mismatch for $operation: LLM='$llm_result', Manual='$manual_result' ($num1 $operator_symbol $num2)" >&2
    fi
    return 0
}

# --- Main Function ---

# function gemini_arithmetic_test [iterations] [operations]
# iterations: Number of times to run the test (default: 10)
# operations: Comma-separated list of operations to test (default: "add,subtract,multiply,divide")
function gemini_arithmetic_test() {
    if ! _check_dependencies; then
        return 1
    fi

    local num_iterations=${1:-10} # Default to 10 iterations if no argument provided
    local operations_str=${2:-"add,subtract,multiply,divide"}
    IFS=',' read -ra operations_array <<< "$operations_str" # Split operations string into an array

    echo "--- Gemini Arithmetic Test ---"
    echo "Iterations: $num_iterations"
    echo "Operations to test: ${operations_array[*]}"
    echo "Random numbers will have $RANDOM_NUM_DIGITS digits."
    echo "Fetching Gemini API key securely from '$API_KEY_PATH'..."

    local GEMINI_API_KEY
    if ! GEMINI_API_KEY=$(pass show "$API_KEY_PATH" | tr -d '[:space:]'); then
        echo "Error: Failed to retrieve Gemini API key from 'pass show $API_KEY_PATH'." >&2
        echo "Please ensure 'pass' is configured and the key exists at the specified path." >&2
        return 1
    fi
    echo "API key fetched successfully."

    local total_tests=0
    local successful_tests=0
    declare -A operation_counts # Associative array to store counts for each operation
    declare -A operation_successes

    for op in "${operations_array[@]}"; do
        operation_counts["$op"]=0
        operation_successes["$op"]=0
    done

    echo ""
    echo "Starting test iterations..."
    for (( i=1; i<=$num_iterations; i++ )); do
	# Iteration begins
        echo "--- Iteration $i/$num_iterations ---"
        local RANDOM_NUM1=$(_generate_random_large_num)
        local RANDOM_NUM2=$(_generate_random_large_num)

        # For division, ensure num2 is not zero. If it is, regenerate.
        if [[ " ${operations_array[*]} " =~ " divide " ]]; then
            while [[ "$RANDOM_NUM2" -eq 0 ]]; do
                echo "Generated Num2 was zero for division, regenerating..."
                RANDOM_NUM2=$(_generate_random_large_num)
            done
        fi

        echo "Numbers for this iteration: Num1=$RANDOM_NUM1, Num2=$RANDOM_NUM2"

        for op in "${operations_array[@]}"; do
            echo "  Testing $op..."
            local result=$(_test_gemini_arithmetic_single_op "$op" "$RANDOM_NUM1" "$RANDOM_NUM2" "$GEMINI_API_KEY")
            operation_counts["$op"]=$((operation_counts["$op"] + 1))
            total_tests=$((total_tests + 1))

            case "$result" in
                "T")
                    echo "    Result: T (Correct)"
                    successful_tests=$((successful_tests + 1))
                    operation_successes["$op"]=$((operation_successes["$op"] + 1))
                    ;;
                "F")
                    echo "    Result: F (Incorrect)"
                    ;;
                "SKIP")
                    echo "    Result: SKIP (e.g., division by zero)"
                    # Don't increment total_tests for skipped operations
                    total_tests=$((total_tests - 1))
                    ;;
                "API_ERROR")
                    echo "    Result: API_ERROR (Gemini API call failed)"
                    ;;
                "PARSE_ERROR")
                    echo "    Result: PARSE_ERROR (Could not extract number from LLM output)"
                    ;;
                *)
                    echo "    Result: UNKNOWN_ERROR ($result)"
                    ;;
            esac
        done
	# Introduce Delay
	# Pause for a random duration between 0 and 59 seconds.
	delay_seconds=$((60 + (RANDOM % 59)))
	echo "Info: Delaying for ${delay_seconds} seconds..."
	#./MuggleBornPadawan/700_linux/scripts/openrouter_query.sh "tell me a new joke"
	sleep "${delay_seconds}"
        echo "" # Newline for readability between iterations
    done

    echo "--- Test Summary ---"
    echo "Total individual operations attempted: $total_tests"
    echo "Total successful comparisons: $successful_tests"
    echo "Overall Success Rate: $(( (successful_tests * 100) / total_tests ))%"

    echo "Success rates per operation:"
    for op in "${operations_array[@]}"; do
        if [[ ${operation_counts["$op"]} -gt 0 ]]; then
            local op_success_rate=$(( (operation_successes["$op"] * 100) / operation_counts["$op"] ))
            echo "  $op: ${op_success_rate}% (${operation_successes["$op"]}/${operation_counts["$op"]} correct)"
        else
            echo "  $op: No tests performed."
        fi
    done

    if [[ "$successful_tests" -eq "$total_tests" ]]; then
        echo "All tests passed successfully!"
        return 0
    else
        echo "Some tests failed or encountered errors."
        return 1
    fi
}

# Example of how to use the function:
# To run 20 iterations, testing all operations:
gemini_arithmetic_test 20

# To run 5 iterations, testing only addition and multiplication:
# gemini_arithmetic_test 5 "add,multiply"

# To run the default (10 iterations, all operations):
# gemini_arithmetic_test

# Uncomment the line below to run the default test directly when sourcing the script:
# gemini_arithmetic_test
