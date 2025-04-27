# LLMs - Google Gemini, Anthropic Claude, OpenAI
# install pass and store all api keys securely before running this script 

# Assign the google keys to variables
MY_GEMINI_API_KEY=$(pass GEMINI_API_KEY)
MY_CLAUDE_API_KEY=$(pass CLAUDE_API_KEY)
MY_OPENAI_API_KEY=$(pass OPEN_API_KEY)

# Check if retrieval worked (optional but good practice)
if [ -z "$MY_GEMINI_API_KEY" ]; then
  echo "Failed to retrieve google gemini API key!"
  exit 1
fi
if [ -z "$MY_CLAUDE_API_KEY" ]; then
  echo "Failed to retrieve anthropic claude API key!"
  exit 1
fi
if [ -z "$MY_OPENAI_API_KEY" ]; then
  echo "Failed to retrieve openAI API key!"
  exit 1
fi

# display keys
echo "Using Google Gemini key: ${MY_GEMINI_API_KEY:0:4}..." # Show only first few chars for logging
echo "Using Anthropic Claude key: ${MY_CLAUDE_API_KEY:0:4}..." # Show only first few chars for logging
echo "Using OpenAI key: ${MY_OPENAI_API_KEY:0:4}..." # Show only first few chars for logging

# curl -H "Authorization: Bearer $MY_API_KEY" https://api.example.com/data

: <<EOF
# test google gemini api
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$MY_GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Explain how AI works"}]
    }]
   }'

# test anthropic claude api 
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $MY_CLAUDE_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --data \
'{
    "model": "claude-3-7-sonnet-20250219",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, world"}
    ]
}'

# test openai gpt model 
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $MY_OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4.1",
    "input": "Tell me a three sentence bedtime story about a unicorn."
  }'

EOF

# Unset the variable when done (good practice)
unset MY_GEMINI_API_KEY
unset MY_CLAUDE_API_KEY
unset MY_OPENAI_API_KEY
