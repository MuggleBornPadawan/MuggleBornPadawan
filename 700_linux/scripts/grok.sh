#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status.
# Treat unset variables as an error.
# The return value of a pipeline is the status of the last command to exit with a
# non-zero status, or zero if no command exited with a non-zero status.
set -euo pipefail

# Check for required commands: pass, jq, curl.
if ! command -v pass &> /dev/null || ! command -v jq &> /dev/null || ! command -v curl &> /dev/null; then
  echo "Error: Required command not found. Please install 'pass', 'jq', and 'curl'." >&2
  exit 1
fi

# Ensure a message is provided.
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 \"<your message>\"" >&2
  exit 1
fi

# Retrieve the API key securely from the 'pass' store.
# This avoids hardcoding secrets in the script.
readonly OPENROUTER_API_KEY=$(pass show OPENROUTER_API_KEY)
if [[ -z "$OPENROUTER_API_KEY" ]]; then
    echo "Error: OPENROUTER_API_KEY not found in pass store." >&2
    exit 1
fi

# The user's message is the first argument to the script.
readonly USER_MESSAGE=$1

# System prompt defining the AI's behavior and context.
# This establishes the expected tone and technical depth.
readonly SYSTEM_PROMPT="You are a master programmer and system architect. Your user is a novice running Debian Bookworm, Emacs, and Bash, focused on Clojure, ClojureScript, and LISP. Provide only direct, concise, and technically dense answers. Omit all conversational filler, apologies, subjective opinions, and emojis. Focus exclusively on facts, executable code, and algorithms. The user's goal is self-sufficiency; your goal is to provide information that builds their cognitive model, leading to your own obsolescence."

# Construct the JSON payload.
# Using jq with --arg ensures that the message content is correctly escaped,
# preventing JSON syntax errors or injection vulnerabilities.
readonly JSON_PAYLOAD=$(jq -n \
  --arg model "x-ai/grok-code-fast-1" \
  --arg system_prompt "$SYSTEM_PROMPT" \
  --arg user_message "$USER_MESSAGE" \
  '{
    "model": $model,
    "messages": [
      {"role": "system", "content": $system_prompt},
      {"role": "user", "content": $user_message}
    ]
  }')

# Make the API call using curl.
# -s: Silent mode. Don't show progress meter or error messages.
# -X POST: Specify POST request method.
# -H: Add request headers for Authorization and Content-Type.
# -d: The HTTP POST data.
# The output is piped to jq to parse the response.
# -r: Output raw strings, not JSON-escaped strings.
curl -s -X POST "https://openrouter.ai/api/v1/chat/completions" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" | jq -r '.choices[0].message.content'
