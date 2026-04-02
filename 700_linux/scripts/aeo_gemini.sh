#!/bin/bash

# Configuration
QUESTIONS_FILE="questions.txt"
ANSWERS_FILE="answers.txt"
MODEL="gemini-2.5-flash-lite"
#MODEL="gemini-flash-latest"

# Check if questions file exists
if [[ ! -f "$QUESTIONS_FILE" ]]; then
    echo "Error: $QUESTIONS_FILE not found."
    exit 1
fi

# Retrieve API Key from pass
GEMINI_API_KEY=$(pass show GEMINI_API_KEY)

if [[ -z "$GEMINI_API_KEY" ]]; then
    echo "Error: Could not retrieve GEMINI_API_KEY from pass."
    exit 
fi

# Function to get answer from Gemini
get_gemini_answer() {
    local question="$1"
    # Append constraint for word count
    local prompt="${question} (Please keep the answer under 100 words.)"
    local json_payload=$(jq -n --arg q "$prompt" '{contents: [{parts: [{text: $q}]}]}')
    local response=$(curl -s "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d "$json_payload")
    # Extract text from response using jq
    local answer=$(echo "$response" | jq -r '.candidates[0].content.parts[0].text // "Error: No response text found."')
    echo "$answer"
}

# Clear or create answers file
> "$ANSWERS_FILE"

# Process each question in random order
shuf "$QUESTIONS_FILE" | while IFS= read -r question || [[ -n "$question" ]]; do
    # Skip empty lines
    [[ -z "${question// }" ]] && continue

    echo "Processing question: $question"
    
    # Get the answer
    answer=$(get_gemini_answer "$question")
    
    # Store the result
    {
        echo "Question: $question"
        echo "Answer: $answer"
        echo "----------------------------------------"
    } >> "$ANSWERS_FILE"
    
    echo "Answer stored. Waiting for next question..."
    
    # Randomized delay between 30 and 90 seconds
    delay=$(( RANDOM % 61 + 30 ))
    echo "Sleeping for $delay seconds..."
    sleep "$delay"

done

echo "All questions processed. Results are in $ANSWERS_FILE."
