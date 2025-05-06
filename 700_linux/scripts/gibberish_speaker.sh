#!/bin/bash

# This script speaks gibberish at intermittent time periods
echo "Starting the intermittent gibberish script."
echo "Press Ctrl+C to stop."

# --- Define your list of words here ---
words=(“Chromatic” “Mosaic” “Silhouette” “Texture” “Gradient” “Pixel” “Vivid” “Abstract” “Brushstroke” “Artistic” “Palette” “Canvas” “Blueprint” “Drawn” “Render” “Echo” “Resonance” “Flux” “Dimensional” “Veridian” “Nebula” “Whisper” “Silhouette” “Flow” “Paradox” “Luminary” “Replicate” “Polygon” “Retro” “Vintage” “Golden” “Kaleidoscope” “Void” “Echoes” “Abstraction” “Form” “Detail” “Sculpt” “Illuminated” “Spectral” “Fractured” “Infinite” “Aurora” “Zenith” “Proto” “Echo-dot” “Digitized” “Synth” “Myth” “Dream” “Reimagine” “Digital” “Organic” “Retro-pixel” “Artful” “Ephemeral” “Neon” “Lunar” “Metallic” “Shadow” “Pulse” “Pixelate” “Void-bloom” “Astro-etch” “Chromatic blur” “Geometric” “Spectral line” )
# --- End of list definition ---

# Get the total number of words in the array
num_words=${#words[@]}

# Check if the array is empty
if (( num_words == 0 )); then
  echo "Error: The list of words is empty." >&2 # Print errors to stderr
  exit 1 # Exit with a non-zero status to indicate failure
fi

# Start an infinite loop
while true
do
    # Print the message
    # echo "Hello World"

    # Calculate a random index
    # Index goes from 0 to num_words-1
    random_index=$(($RANDOM % num_words))

    # Retrieve the word at that index
    random_word=${words[$random_index]}

    # Strip quotes from the word
    stripped_string=$(echo "$random_word" | tr -d "'\"“")

    # Speak gibberish 
    echo "generating gibberish about $stripped_string"
    ollama run gemma3:1b "speak two to three line gibberish content about $stripped_string in the context of art; skip commentary; skip asking questions; skip notes" | espeak -v ta

    # Calculate a random sleep duration between 10 and 20 seconds
    sleep_time=$(($RANDOM % 60 + 30))
    
    # Uncomment the line below if you want to see the chosen sleep time
    echo "(Sleeping for $sleep_time seconds...)"

    # Pause execution for the calculated duration
    sleep $sleep_time
done

# This part is technically unreachable because the loop is infinite,
# but it's good practice to indicate the script's intended end.
echo "Script stopped." # You will only see this if the loop condition changes
