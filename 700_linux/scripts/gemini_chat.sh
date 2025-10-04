#!/bin/bash

# Author: MuggleBornPadawan
# Date: 2025-05-28
# Description: A multi-turn conversation script for the Google Gemini API.
# License: GNU GPL v3

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

MY_GEMINI_API_KEY=$(pass GEMINI_API_KEY)

if [ -z "$MY_GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY environment variable is not set."
  exit 1
fi

MODEL="gemini-flash-lite-latest"
API_URL="https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${MY_GEMINI_API_KEY}"

# Initialize an empty JSON array to store the conversation history.
# The Gemini API expects a 'contents' array with alternating user/model roles.
HISTORY='[]'

echo "Starting chat with $MODEL. Type 'exit' or 'quit' to end."

while true; do
  # Prompt the user for input
  read -p "You: " PROMPT

  # Check for exit command
  if [[ "$PROMPT" == "exit" || "$PROMPT" == "quit" ]]; then
    break
  fi

  # Append the new user message to the history for the current request
  CURRENT_CONTENTS=$(jq -n --argjson history "$HISTORY" --arg prompt "$PROMPT" \
    '$history + [{role: "user", parts: [{text: $prompt}]}]')

  # Construct the full JSON payload
  JSON_PAYLOAD=$(jq -n --argjson contents "$CURRENT_CONTENTS" \
    '{contents: $contents}')

  # Make the API call
  RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" \
    --data "$JSON_PAYLOAD" "$API_URL")

  # Extract the model's response text
  GENERATED_TEXT=$(echo "$RESPONSE" | jq -r '.candidates[0].content.parts[0].text')

  if [ -z "$GENERATED_TEXT" ] || [ "$GENERATED_TEXT" == "null" ]; then
    echo "Error: Could not retrieve text from Gemini. Full response:"
    echo "$RESPONSE" | jq .
  else
    echo "Gemini: $GENERATED_TEXT"

    # Update the history with the user's prompt and the model's response
    # to maintain context for the next turn.
    HISTORY=$(jq -n --argjson contents "$CURRENT_CONTENTS" --arg model_response "$GENERATED_TEXT" \
      '$contents + [{role: "model", parts: [{text: $model_response}]}]')
  fi
done

echo "Session ended."
unset MY_GEMINI_API_KEY
