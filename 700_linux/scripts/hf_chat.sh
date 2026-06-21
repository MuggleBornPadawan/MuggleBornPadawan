#!/usr/bin/env bash

set -e

# Configuration
MODEL="moonshotai/Kimi-K2-Thinking:cheapest"
#MODEL="zai-org/GLM-5.2:cheapest"
URL="https://router.huggingface.co/v1/chat/completions"
MAX_HISTORY=10 # Max messages to remember (e.g., 10 = last 5 Q&A turns)

# 1. Parse CLI args
SYSTEM_PROMPT=""
while getopts "s:" opt; do
    case $opt in
        s) SYSTEM_PROMPT="$OPTARG" ;;
        *) echo "Usage: $0 [-s \"system prompt\"]"; exit 1 ;;
    esac
done

# 1. Get Token
if [ -z "$HF_TOKEN" ]; then
    if command -v pass &> /dev/null && pass show hf &> /dev/null; then
        HF_TOKEN=$(pass show hf)
    else
        read -s -p "Enter Hugging Face Token: " HF_TOKEN
        echo ""
    fi
fi

# Check for jq
if ! command -v jq &> /dev/null; then
    echo "Error: 'jq' is required. Please install it."
    exit 1
fi

# Initialize history — prompt for system message if not provided via -s
if [ -z "$SYSTEM_PROMPT" ]; then
    echo "Enter a system prompt (or press Enter to skip):"
    read -r SYSTEM_PROMPT
fi

if [ -n "$SYSTEM_PROMPT" ]; then
    HISTORY=$(jq -n --arg msg "$SYSTEM_PROMPT" '[{"role": "system", "content": $msg}]')
    echo "System prompt set."
else
    HISTORY="[]"
fi

echo "Connected to $MODEL."
echo "Commands: 'clear' to reset history | 'exit' or 'quit' to end."

# 2. Interactive Loop
while true; do
    echo -e "\n"
    read -p "You: " USER_INPUT

    if [[ -z "$USER_INPUT" ]]; then
        continue
    fi
    if [[ "$USER_INPUT" == "exit" || "$USER_INPUT" == "quit" ]]; then
        echo "Goodbye!"
        break
    fi
    if [[ "$USER_INPUT" == "clear" ]]; then
        if [ -n "$SYSTEM_PROMPT" ]; then
            HISTORY=$(jq -n --arg msg "$SYSTEM_PROMPT" '[{"role": "system", "content": $msg}]')
        else
            HISTORY="[]"
        fi
        echo "Conversation history cleared."
        continue
    fi

    # Append User prompt to history
    HISTORY=$(jq -n --argjson hist "$HISTORY" --arg msg "$USER_INPUT" \
        '$hist + [{"role": "user", "content": $msg}]')

    # Build Payload
    PAYLOAD=$(jq -n --arg model "$MODEL" --argjson msgs "$HISTORY" \
        '{model: $model, messages: $msgs, stream: false}')

    echo -n "AI is thinking..."

    # Send Request
    RESPONSE=$(curl -s -X POST "$URL" \
        -H "Authorization: Bearer $HF_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$PAYLOAD")

    # Clear "thinking..." line
    printf "\r\033[K"
    
    # Parse response
    ANSWER=$(echo "$RESPONSE" | jq -r '.choices[0].message.content' 2>/dev/null)
    
    if [ -n "$ANSWER" ] && [ "$ANSWER" != "null" ]; then
        echo -e "AI: $ANSWER"
        
        # Append AI response to history and slice to keep only the last $MAX_HISTORY messages
        HISTORY=$(jq -n --argjson hist "$HISTORY" --arg msg "$ANSWER" --argjson max "$MAX_HISTORY" \
            '($hist + [{"role": "assistant", "content": $msg}])[-$max:]')
    else
        echo "Error: Could not retrieve response."
        echo "Raw Response: $RESPONSE"
        # Rollback history (remove last user query) if the request failed
        HISTORY=$(jq -n --argjson hist "$HISTORY" '$hist[:-1]')
    fi
done
