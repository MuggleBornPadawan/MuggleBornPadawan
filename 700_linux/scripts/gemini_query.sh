#!/bin/bash

# Author: MuggleBornPadawan
# Date: 2025-05-28
# Description: A simple Bash script to query Google Gemini API.
# License: GNU GPL v3

# GNU GPL v3 License Snippet
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
  echo "Please set it using: export GEMINI_API_KEY='YOUR_API_KEY'"
  exit 1
fi

# Check if a prompt was provided
if [ -z "$1" ]; then
  echo "Usage: $0 \"Your prompt here\""
  exit 1
fi

PROMPT="$1"
MODEL="gemini-2.5-flash" # A good starting point, often free for basic usage
API_URL="https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${MY_GEMINI_API_KEY}"

JSON_PAYLOAD=$(jq -n --arg prompt "$PROMPT" \
  '{contents: [{parts: [{text: $prompt}]}]}')

RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" \
  --data "$JSON_PAYLOAD" "$API_URL")

# Extract the text content from the response
# Gemini's response structure can be nested, so we use jq to parse it
# This assumes a typical text generation response
GENERATED_TEXT=$(echo "$RESPONSE" | jq -r '.candidates[0].content.parts[0].text')

if [ -z "$GENERATED_TEXT" ] || [ "$GENERATED_TEXT" == "null" ]; then
  echo "Error: Could not retrieve text from Gemini. Full response:"
  echo "$RESPONSE" | jq .
else
  echo "$GENERATED_TEXT"
fi

unset MY_GEMINI_API_KEY
