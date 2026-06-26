#!/bin/bash
# Description: Scrambles the inner letters of each word in the input text.
# Keep the first and last letters of each word intact.
# Randomly duplicates characters and drops/includes vowels based on configurable rates.
# Author: Antigravity

# --- Configuration ---
# Drop and duplication rates are percentages (0 to 100)
VOWEL_DROP_CHANCE=20
CHAR_DUP_CHANCE=10

# --- Color Definitions (if terminal supports colors) ---
if [ -t 1 ]; then
    COLOR_ORIGINAL="\e[1;36m" # Bold Cyan
    COLOR_SCRAMBLED="\e[1;33m" # Bold Yellow
    COLOR_RESET="\e[0m"
    COLOR_BORDER="\e[1;30m" # Bold Dark Gray
else
    COLOR_ORIGINAL=""
    COLOR_SCRAMBLED=""
    COLOR_RESET=""
    COLOR_BORDER=""
fi

# --- Helper Functions ---

# Check if a character is a vowel (case-insensitive English vowels)
is_vowel() {
    case "$1" in
        [aeiouAEIOU]) return 0 ;;
        *) return 1 ;;
    esac
}

# Determine if an event occurs based on a percentage chance
random_event() {
    local chance=$1
    local r=$(( RANDOM % 100 ))
    if (( r < chance )); then
        return 0
    else
        return 1
    fi
}

# Shuffle the characters of a string using the Fisher-Yates algorithm
shuffle_string() {
    local s="$1"
    local len=${#s}
    if (( len <= 1 )); then
        echo "$s"
        return
    fi
    
    local -a chars
    for (( i=0; i<len; i++ )); do
        chars[i]="${s:$i:1}"
    done
    
    # Fisher-Yates shuffle
    for (( i=len-1; i>0; i-- )); do
        local j=$(( RANDOM % (i + 1) ))
        # Swap
        local temp="${chars[i]}"
        chars[i]="${chars[j]}"
        chars[j]="$temp"
    done
    
    # Join array elements back into a string
    (IFS=; echo "${chars[*]}")
}

# Scramble a single word based on the rules
scramble_word() {
    local word="$1"
    local len=${#word}
    
    if (( len == 1 )); then
        # 1-letter word: duplicate randomly
        if random_event "$CHAR_DUP_CHANCE"; then
            echo "${word}${word}"
        else
            echo "$word"
        fi
    elif (( len == 2 )); then
        # 2-letter word: duplicate each letter randomly
        local c1="${word:0:1}"
        local c2="${word:1:1}"
        local res=""
        if random_event "$CHAR_DUP_CHANCE"; then
            res="${res}${c1}${c1}"
        else
            res="${res}${c1}"
        fi
        if random_event "$CHAR_DUP_CHANCE"; then
            res="${res}${c2}${c2}"
        else
            res="${res}${c2}"
        fi
        echo "$res"
    elif (( len == 3 )); then
        # 3-letter word: modify middle letter only
        local c1="${word:0:1}"
        local c2="${word:1:1}"
        local c3="${word:2:1}"
        
        if is_vowel "$c2" && random_event "$VOWEL_DROP_CHANCE"; then
            # Drop middle vowel
            echo "${c1}${c3}"
        else
            if random_event "$CHAR_DUP_CHANCE"; then
                echo "${c1}${c2}${c2}${c3}"
            else
                echo "${c1}${c2}${c3}"
            fi
        fi
    else
        # L >= 4: scramble inner characters, protect first and last
        local c1="${word:0:1}"
        local cl="${word: -1}"
        local inner="${word:1:len-2}"
        local inner_len=${#inner}
        local inner_mod=""
        
        # Apply vowel dropping and duplication to inner characters
        for (( i=0; i<inner_len; i++ )); do
            local char="${inner:i:1}"
            if is_vowel "$char" && random_event "$VOWEL_DROP_CHANCE"; then
                continue
            fi
            if random_event "$CHAR_DUP_CHANCE"; then
                inner_mod="${inner_mod}${char}${char}"
            else
                inner_mod="${inner_mod}${char}"
            fi
        done
        
        # Shuffle the modified inner characters
        local inner_scrambled
        inner_scrambled=$(shuffle_string "$inner_mod")
        echo "${c1}${inner_scrambled}${cl}"
    fi
}

# Process a single line of text
process_line() {
    local line="$1"
    local remaining="$line"
    local result=""
    
    # Parse alternating word and non-word sequences
    while [[ -n "$remaining" ]]; do
        if [[ "$remaining" =~ ^([[:alpha:]]+)(.*)$ ]]; then
            local word="${BASH_REMATCH[1]}"
            remaining="${BASH_REMATCH[2]}"
            local scrambled
            scrambled=$(scramble_word "$word")
            result="${result}${scrambled}"
        elif [[ "$remaining" =~ ^([^[:alpha:]]+)(.*)$ ]]; then
            local non_word="${BASH_REMATCH[1]}"
            remaining="${BASH_REMATCH[2]}"
            result="${result}${non_word}"
        else
            # Fallback for characters not handled by regex above
            local char="${remaining:0:1}"
            remaining="${remaining:1}"
            result="${result}${char}"
        fi
    done
    echo "$result"
}

# --- CLI Options & Argument Parsing ---
VERBOSE=false
HELP=false
INPUT_TEXT=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            HELP=true
            shift
            ;;
        --)
            shift
            break
            ;;
        -*)
            echo "Error: Unknown option $1" >&2
            echo "Use -h or --help for usage." >&2
            exit 1
            ;;
        *)
            break
            ;;
    esac
done

if [ "$HELP" = true ]; then
    echo -e "Usage: $0 [options] [text...]"
    echo
    echo "Scrambles the inner letters of words in the input text while keeping"
    echo "the first and last letters intact. Also randomly duplicates characters"
    echo "and drops vowels based on pre-configured probabilities."
    echo
    echo "Options:"
    echo "  -v, --verbose    Print original and scrambled text side-by-side/stacked"
    echo "  -h, --help       Show this help message"
    echo
    echo "If no text is provided, a default placeholder sentence will be used."
    exit 0
fi

# Determine input source: positional arguments or placeholder
if [[ $# -gt 0 ]]; then
    INPUT_TEXT="$*"
else
    INPUT_TEXT="The quick brown fox jumps over the lazy dog! This is a default placeholder text to demonstrate the text scrambling script."
fi

# Process the input line by line
while IFS= read -r line || [[ -n "$line" ]]; do
    scrambled=$(process_line "$line")
    if [ "$VERBOSE" = true ]; then
        echo -e "${COLOR_BORDER}------------------------------------------------------------${COLOR_RESET}"
        echo -e "${COLOR_ORIGINAL}Original:${COLOR_RESET}  $line"
        echo -e "${COLOR_SCRAMBLED}Scrambled:${COLOR_RESET} $scrambled"
    else
        echo "$scrambled"
    fi
done <<< "$INPUT_TEXT"

if [ "$VERBOSE" = true ]; then
    echo -e "${COLOR_BORDER}------------------------------------------------------------${COLOR_RESET}"
fi
