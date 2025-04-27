#!/bin/bash

# --- argument_demo.sh ---
# A simple script to show how command-line arguments work.

echo "Running script: '$0'" # $0 is the name of the script itself
echo "Number of arguments passed: $#" # $# is the count of arguments

# Check if at least one argument was given
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <your_name> [your_city]"
  exit 1 # Exit with an error status if not enough arguments
fi

# Access the first argument using $1
echo "Hello, $1!"

# Check if a second argument ($2) was provided
if [ -n "$2" ]; then
  echo "You mentioned your city is $2."
else
  echo "You didn't mention a city (no second argument)."
fi

# Display all arguments passed using "$@"
echo "All arguments received were:"
# Loop through each argument provided
count=1
for arg in "$@"; do
  echo "  Argument $count: '$arg'"
  count=$((count + 1))
done

echo "--- Script Finished ---"
exit 0 # Exit successfully
