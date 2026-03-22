#!/bin/bash

# Check for the required confirmation argument
if [ "$1" != "iamsure" ]; then
    echo "Error: Confirmation required."
    echo "Usage: $0 iamsure"
    exit 1
fi

# Get absolute path of the current directory
TARGET_DIR=$(pwd)
SCRIPT_NAME=$(basename "$0")

echo "DANGER: This will securely shred and delete ALL files and folders in: $TARGET_DIR"
echo "This action is IRREVERSIBLE."
read -p "Type 'YES' to proceed with destruction: " final_check

if [ "$final_check" != "YES" ]; then
    echo "Operation aborted."
    exit 0
fi

echo "Starting recursive shredding..."

# 1. Shred all files recursively
# -u: truncate and remove file after overwriting
# -z: final overwrite with zeros to hide shredding
# -v: verbose output
# We exclude the script itself to prevent it from being killed mid-execution
find . -type f ! -name "$SCRIPT_NAME" -exec shred -u -z -v {} +

# 2. Remove all directories (starting from deepest)
find . -mindepth 1 -depth -type d -exec rm -rvf {} +

# 3. Finally, shred the script itself if requested, or just exit
echo "Cleanup complete. Most files have been shredded and directories removed."
echo "Note: The script '$SCRIPT_NAME' was preserved to finish the execution loop."
