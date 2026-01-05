#!/bin/bash

# ==============================================================================
# Script Name: wisdom_nugget_generator_v2.sh
# Description: Fetches quotes and contributions of notable individuals using the
#              Gemini API (v2 style request), speaks them using espeak,
#              and logs them to a file.
# Author:      Gemini (based on user specifications)
# Version:     2.0 (Updated API call method)
# ==============================================================================

# --- Configuration & Globals ---
# API Key will be fetched from pass
# Names of individuals to process
# Note: You can easily change these names by editing this array
# Run from root; log available at root only 
cd

names=("Edward Oakley Thorp" "Kenneth Griffin" "Géraldine Honauer" "Juan Ferrer AR interactive art" " Natalia Cabrera AR interactive art" "Ìfẹ́olúwa Ọ̀ṣúnkọ̀yà VR art" "Raja Ravi Varma" "Leonardo da Vinci" "M.F. Husain" "Marie Curie" "Rabindranath Tagore" "Srinivasa Ramanujan" "Vera Molnár" "Manfred Mohr" "Harold Cohen" "Sol LeWitt" "John Whitney Sr." "Lillian Schwartz" "Casey Reas" "Ben Fry" "Golan Levin" "Zachary Lieberman" "Ryoji Ikeda" "Mario Klingemann" "Cory Arcangel" "Michael Hansmeyer" "Manolo Gamboa Naon (Manoloide)" "Harshit Agrawal" "Karthik Dondeti" "Pixelkar (Nitant Hirlekar)" "KALA (Ujjwal Agarwal)" "Sahej Rahal" "Kedar Undale" "Ritesh Lala" "Hanif Kureshi" "Frieder Nake" "Georg Nees" "A. Michael Noll" "Theo Watson" "Jared Tarbell" "Matt DesLauriers" "Anna Ridler" "Refik Anadol" "Helena Sarin" "Sofia Crespo" "Feileacan McCormick" "Mark Napier" "Jodi (Joan Heemskerk and Dirk Paesmans)" "Daniel Shiffman" "Hanne Darboven" "Alexandra Cárdenas" "Shelly Knotts" "Trevor Paglen" "Sougwen Chung" "Brian Eno" "Piero della Francesca" "Leonardo da Vinci" "Albrecht Dürer" "M.C. Escher" "Piet Mondrian" "Kazimir Malevich" "Donald Judd" "Victor Vasarely" "Bridget Riley" "Raja Ravi Varma" "Abanindranath Tagore" "Nandalal Bose" "Jamini Roy" "Amrita Sher-Gil" "Rabindranath Tagore" "Ramkinkar Baij" "M.F. Husain (Maqbool Fida Husain)" "F.N. Souza (Francis Newton Souza)" "S.H. Raza (Syed Haider Raza)" "Tyeb Mehta" "V.S. Gaitonde (Vasudeo S. Gaitonde)" "Ram Kumar" "Akbar Padamsee" "Satish Gujral" "Anjolie Ela Menon" "Arpita Singh" "Jogen Chowdhury" "Ganesh Pyne" "Subodh Gupta" "Bharti Kher" "Atul Dodiya" "Anish Kapoor" "Nalini Malani" "Ravinder Reddy" "Richard Stallman" "Eric S. Raymond" "Linus Torvalds" "Steve Wozniak" "Kevin Mitnick" "Tsutomu Shimomura" "Robert Tappan Morris" "HD Moore" "Charlie Miller" "Chris Valasek" "Dan Kaminsky" "Joanna Rutkowska" "Greg Hoglund" "Ken Thompson" "Dennis Ritchie" "Tim Berners-Lee" "Katie Moussouris" "Robert M. Lee" "Anand Prakash" "Maddie Stone" "Rich Hickey" "Alan Turing" "John von Neumann" "Claude Elwood Shannon" "Alonzo Church" "Marvin Lee Minsky" "John McCarthy" "Carl Edward Sagan" "Gerald Jay Sussman" "Bertrand Arthur William Russell" "Harold Abelson" "Guy Lewis Steele Jr" "Ada Lovelace" "Charles Babbage" "Jean-Pierre Serre" "Alexander Grothendieck" "Michael Atiyah" "Stephen Smale" "Shing-Tung Yau" "Edward Witten" "Grigori Perelman" "Terence Tao" "Maryam Mirzakhani" "Manjul Bhargava" "Akshay Venkatesh" "Geoffrey Hinton" "Yann LeCun" "Yoshua Bengio" "Fei-Fei Li" "Andrew Ng" "Demis Hassabis" "Ian Goodfellow" "Andrej Karpathy" "Stuart Russell" "Peter Norvig" "Timnit Gebru" "Kate Crawford" "Jeff Dean" "Ilya Sutskever" "Daphne Koller" "Sam Altman" "Clément Delangue" "Jensen Huang" "Kai-Fu Lee" "Cassie Kozyrkov" "Jeremy Howard" "Ray Kurzweil" "Dario Amodei" "Mustafa Suleyman" "Pranav Mistry" "Lex Fridman" "Aryabhatta, father of Indian Mathematics" "Bhāskara, Indian polymath" "Brahmagupta, Indian mathematician" "Shakuntala Devi, Indian mental calculator" "C.V. Raman" "Richard P. Gabriel" "Paul Graham" "Guy L. Steele Jr." "Alan J. Perlis" "chitrapata" "ganesh rajendran" "sushmita vobbilisetty" "ganesh chitrapata" "sushmita chitrapata" "ganesh art chitrapata" "sushmita art chitrapata" "chitrapata art" "chitrapata vision" "chitrapata visual art") 

# Gemini API Configuration
# User specified model: gemini-2.0-flash
# IMPORTANT: Ensure 'gemini-2.0-flash' is a valid and available model identifier
# for your API key and project. Standard models are often like 'gemini-1.5-flash-latest'.
# If 'gemini-2.0-flash' is not valid, this will fail.
# GEMINI_MODEL_NAME="gemini-2.5-flash"
# GEMINI_MODEL_NAME="gemini-flash-lite-latest"
GEMINI_MODEL_NAME="gemini-3-flash-preview"
GEMINI_API_BASE_URL="https://generativelanguage.googleapis.com/v1beta/models"

# The API key will be appended to this URL as a query parameter.
PASS_ENTRY_NAME="GEMINI_API_KEY" # Name of the pass entry for the API key

# Output file
NUGGETS_FILE="daily_nuggets.txt"

# --- Helper Functions ---

# Function to print error messages to stderr
# Usage: error_exit "Error message" [exit_code]
error_exit() {
    local message="$1"
    local exit_code="${2:-1}" # Default exit code is 1
    echo "Error: ${message}" >&2
    exit "${exit_code}"
}

# Function to print warning messages to stderr
# Usage: warning_msg "Warning message"
warning_msg() {
    local message="$1"
    echo "Warning: ${message}" >&2
}

# --- 1. Dependencies Check ---
# Verify that required command-line tools are available.
check_dependencies() {
    echo "Info: Checking dependencies..."
    local missing_tools=()
    local tools_to_check=("pass" "curl" "jq" "espeak")

    for tool in "${tools_to_check[@]}"; do
        if ! command -v "${tool}" &> /dev/null; then
            missing_tools+=("${tool}")
        fi
    done

    if [ ${#missing_tools[@]} -gt 0 ]; then
        error_exit "The following required tools are missing: ${missing_tools[*]}. Please install them." 1
    else
        echo "Info: All dependencies are satisfied."
    fi
}

# --- 2. API Key Retrieval ---
# Retrieve the Gemini API key from pass.
get_api_key() {
    echo "Info: Retrieving API key from pass..."
    # Ensure apiKey is exported or available if subshells are unexpectedly created by complex commands,
    # though for direct use here it's fine.
    apiKey=$(pass "${PASS_ENTRY_NAME}")
    # Check if pass command was successful and key is not empty
    if [ $? -ne 0 ] || [ -z "${apiKey}" ]; then
        error_exit "Could not retrieve Gemini API key from pass entry '${PASS_ENTRY_NAME}'." 2
    fi
    echo "Info: API key retrieved successfully."
}

# --- Main Script Logic ---

# Call dependency check
check_dependencies

# Call API key retrieval
get_api_key # The apiKey variable is now set

# --- 4. Processing Each Name ---
# Iterate through each name in the names array.
echo "Info: Starting to process names... log available at root only"
for person_name in "${names[@]}"; do
    echo "--------------------------------------------------"
    echo "Info: Processing: ${person_name}"

    # 4a. Construct API Request Prompt
    # Create a precise text prompt for the Gemini API.
    api_request_prompt="Give me one notable quote from ${person_name} and a random fact about this person. Format this as: Quote: [The Quote] Random fact: [A random fact]. Please include a dividing line (20 dashes) before the answer and two line spaces after the answer"
    echo "Info: Constructed API prompt for ${person_name}."

    # 4b. Gemini API Interaction via curl (Updated method)
    # Construct the JSON payload using jq for safety and correctness
    json_payload=$(jq -n --arg prompt_text "$api_request_prompt" \
      '{contents: [{parts: [{text: $prompt_text}]}]}')

    if [ $? -ne 0 ] || [ -z "$json_payload" ]; then
        warning_msg "Failed to construct JSON payload for ${person_name}. Skipping."
        continue
    fi

    # Construct the full API endpoint URL with the API key as a query parameter
    # The API key must be URL-encoded if it contains special characters,
    # but pass usually provides clean keys. If issues arise, URL encoding might be needed for apiKey.
    full_api_url="${GEMINI_API_BASE_URL}/${GEMINI_MODEL_NAME}:generateContent?key=${apiKey}"

    echo "Info: Sending request to Gemini API for ${person_name} using model ${GEMINI_MODEL_NAME}..."
    # Send a POST request to the Gemini API endpoint.
    # API key is now in the URL. Removed x-goog-api-key header.
    api_response=$(curl -s -f -S -X POST \
        -H "Content-Type: application/json" \
        -d "${json_payload}" \
        "${full_api_url}")

    # API Error Handling
    curl_exit_status=$?
    if [ ${curl_exit_status} -ne 0 ]; then
        warning_msg "API request failed for ${person_name}. curl exit status: ${curl_exit_status}. URL: ${GEMINI_API_BASE_URL}/${GEMINI_MODEL_NAME}:generateContent?key=YOUR_API_KEY_WAS_HERE. Skipping."
        # curl with -f -S should print its own error to stderr.
        continue
    fi
    echo "Info: API request successful for ${person_name}."

    # 4c. Parse API Response with jq and Define nugget
    # Assumption: The useful text is located at .candidates[0].content.parts[0].text
    # This parsing logic is UNCHANGED as the new example did not specify response format.
    nugget=$(echo "${api_response}" | jq -r '.candidates[0].content.parts[0].text')

    # Check if jq failed or if the extracted text is empty or "null" (jq might return literal "null" string)
    if [ $? -ne 0 ] || [ -z "${nugget}" ] || [ "${nugget}" == "null" ]; then
        warning_msg "Could not parse API response or find text for ${person_name}. Raw response was: ${api_response}. Skipping."
        continue
    fi
    echo "Info: Successfully extracted nugget for ${person_name}."
    # For debugging, you might want to see the nugget:
    # echo "Debug: Nugget: ${nugget}"

    # 4d. Introduce Delay
    # Pause for a random duration between 0 and 55 seconds.
    delay_seconds=$((RANDOM % 55))
    echo "Info: Delaying for ${delay_seconds} seconds..."
    sleep "${delay_seconds}"

    # 4e. Speak the Nugget with espeak
    if [ -n "${nugget}" ]; then # Check if nugget is not empty
        echo "Info: Speaking nugget for ${person_name}..."
        # Use -- to indicate end of options, in case nugget starts with '-'
        # espeak -v en-gb -s 150 -p 50 -- "${nugget}"
        if [ $? -ne 0 ]; then
            warning_msg "espeak failed for ${person_name}. Might be an issue with espeak or the audio system."
            # Continue execution as per requirements
        else
            echo "Info: espeak finished for ${person_name}."
        fi
    else
        warning_msg "Nugget is empty for ${person_name}, skipping espeak."
    fi

    # 4f. Log the Nugget
    # Append the content of the nugget variable to the file.
    if [ -n "${nugget}" ]; then # Check if nugget is not empty
        echo "Info: Appending nugget for ${person_name} to ${NUGGETS_FILE}..."
        if ! echo -e "${nugget}\nPerson: ${person_name} \n" >> "${NUGGETS_FILE}"; then
            # This error typically occurs if the directory is not writable or disk is full.
            warning_msg "Could not write to ${NUGGETS_FILE} for ${person_name}. Check permissions or disk space."
            # Continue execution as per requirements
        else
            echo "Info: Nugget for ${person_name} appended to ${NUGGETS_FILE}."
        fi
    else
         warning_msg "Nugget is empty for ${person_name}, not logging to file."
    fi
    #./MuggleBornPadawan/700_linux/scripts/openrouter_query.sh "tell me a new joke"

done

# Unset the variable when done (good practice)
unset apiKey

# done 
echo "--------------------------------------------------"
echo "Info: Script finished processing all names."

# check arithmetic
cd
#./MuggleBornPadawan/700_linux/scripts/gemini_artithmetic_test.sh >> daily_nuggets.txt 2>&1
cd

exit 0
