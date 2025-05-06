#!/bin/bash

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

# Calculate a random index
# Index goes from 0 to num_words-1
random_index=$(($RANDOM % num_words))

# Retrieve the word at that index
random_word=${words[$random_index]}

# Strip quotes from the word
stripped_string=$(echo "$random_word" | tr -d "'\"“")

# Print the chosen word
echo "$stripped_string"

exit 0 # Exit successfully
