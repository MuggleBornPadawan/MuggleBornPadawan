#!/bin/bash
cd

# -- storing info in file
tempFileName="tempFile_$(date +%s).txt"
touch $tempFileName
#ls $tempFileName

# --- Configuration ---
NUM_UPPERCASE_REPLACEMENTS=40
NUM_OTHER_CHAR_REPLACEMENTS=2
NUM_SYMBOL_REPLACEMENTS=2

# Define a set of symbols to choose from
SYMBOLS='!@#$%^&*()_+-=[]{}|;:,.<>?'
# Define a set of other characters to choose from
OTHER_CHARS='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

# --- Step 1: Generate a UUID ---
echo "Step 1: Generating a UUID..."
original_uuid=$(uuidgen)
echo "Original UUID: $original_uuid"
echo ""

# --- Step 2: Replace random characters with uppercase letters ---
echo "Step 2: Replacing random characters with uppercase letters..."
modified_uuid_step2="$original_uuid"
uuid_length=${#modified_uuid_step2}

for ((i=0; i<NUM_UPPERCASE_REPLACEMENTS; i++)); do
    # Generate a random index within the UUID length
    random_index=$((RANDOM % uuid_length))

    # Get the character at the random index
    char_to_replace=${modified_uuid_step2:$random_index:1}

    # Convert the character to uppercase
    # Using tr is a simple way to do this. For more complex cases, you might use awk or sed.
    uppercase_char=$(echo "$char_to_replace" | tr '[:lower:]' '[:upper:]')

    # Replace the character at the random index
    modified_uuid_step2=$(echo "${modified_uuid_step2:0:$random_index}$uppercase_char${modified_uuid_step2:$((random_index + 1))}")
done
echo "After uppercase replacements: $modified_uuid_step2"
echo ""

# --- Step 3: Replace random characters with other random characters ---
echo "Step 3: Replacing random characters with other random characters..."
modified_uuid_step3="$modified_uuid_step2"
uuid_length=${#modified_uuid_step3}

for ((i=0; i<NUM_OTHER_CHAR_REPLACEMENTS; i++)); do
    # Generate a random index within the UUID length
    random_index=$((RANDOM % uuid_length))

    # Get a random character from the OTHER_CHARS string
    random_other_char_index=$((RANDOM % ${#OTHER_CHARS}))
    random_other_char=${OTHER_CHARS:$random_other_char_index:1}

    # Replace the character at the random index with the random other character
    modified_uuid_step4=$(echo "${modified_uuid_step3:0:$random_index}$random_other_char${modified_uuid_step3:$((random_index + 1))}")
done
echo "After other random character replacements: $modified_uuid_step3"
echo ""

echo "Final Modified UUID: $modified_uuid_step4"

# --- Step 4: Replace random characters with symbols ---
echo "Step 4: Replacing random characters with symbols..."
modified_uuid_step4="$modified_uuid_step3"
uuid_length=${#modified_uuid_step4}

for ((i=0; i<NUM_SYMBOL_REPLACEMENTS; i++)); do
    # Generate a random index within the UUID length
    random_index=$((RANDOM % uuid_length))

    # Get a random symbol from the SYMBOLS string
    random_symbol_index=$((RANDOM % ${#SYMBOLS}))
    random_symbol=${SYMBOLS:$random_symbol_index:1}

    # Replace the character at the random index with the random symbol
    modified_uuid_step4=$(echo "${modified_uuid_step4:0:$random_index}$random_symbol${modified_uuid_step4:$((random_index + 1))}")
done
echo "After symbol replacements: $modified_uuid_step4"
echo ""


# --- Character Counting and Display ---
echo "--- Character Analysis of Final String ---"

# Count total number of characters
total_char_count=${#modified_uuid_step4}
echo "Total number of characters: $total_char_count"

# Count uppercase characters
uppercase_count=$(echo "$modified_uuid_step4" | grep -o '[[:upper:]]' | wc -l)
echo "Number of uppercase characters: $uppercase_count"

# Count lowercase characters
lowercase_count=$(echo "$modified_uuid_step4" | grep -o '[[:lower:]]' | wc -l)
echo "Number of lowercase characters: $lowercase_count"

# Count symbols
symbol_count=$((total_char_count - uppercase_count - lowercase_count))
echo "Number of symbols: $symbol_count"

# Displaying final result
echo ""
echo "i: $original_uuid"
echo "o: $modified_uuid_step4"
echo "i: $original_uuid" >> $tempFileName
echo "o: $modified_uuid_step4" >> $tempFileName
echo "file name:" $tempFileName
