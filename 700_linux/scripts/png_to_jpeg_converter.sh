#!/bin/bash

# ==============================================================================
# Script Name: png_to_jpeg_converter.sh
# Description: Converts PNG files to JPEG format using ImageMagick's 'convert'.
#              Handles transparency by flattening it onto a white background,
#              preserves the original PNG files, and places the JPEGs alongside.
# Author:      Gemini Assistant
# Date:        June 23, 2026
# ==============================================================================

# --- Configuration Settings ---
# Set the directory containing the PNG files to be converted.
# Replace this placeholder with your actual path (e.g., "/home/user/Pictures").
TARGET_DIR="/home/rgroot/MuggleBornPadawan/700_linux/scripts/test_images"

# Quality of the output JPEG files (0 to 100). Higher means better quality, larger size.
QUALITY=90

# File extension for the output JPEGs (typically "jpg" or "jpeg").
EXTENSION="jpg"

# Background color used to fill transparent areas of PNGs.
BACKGROUND_COLOR="white"

# Whether to search recursively in subdirectories (true/false).
RECURSIVE=true

# ==============================================================================
# --- Dependency & Environment Verification ---
# ==============================================================================

# Ensure convert (ImageMagick) is installed
if ! command -v convert >/dev/null 2>&1; then
    echo "Error: ImageMagick ('convert' command) is not installed."
    echo "Please install it using your package manager. For example:"
    echo "  Ubuntu/Debian: sudo apt-get update && sudo apt-get install imagemagick"
    echo "  CentOS/RHEL:   sudo yum install ImageMagick"
    echo "  Fedora:        sudo dnf install ImageMagick"
    echo "  Arch Linux:    sudo pacman -S imagemagick"
    exit 1
fi

# ==============================================================================
# --- Target Directory Validation ---
# ==============================================================================

# Check if the target directory is still the default placeholder
if [ "$TARGET_DIR" = "/path/to/your/png/files" ] || [ -z "$TARGET_DIR" ]; then
    echo "Error: Please edit this script and configure the 'TARGET_DIR' variable"
    echo "with the actual path containing your PNG files."
    echo "Current value: '$TARGET_DIR'"
    exit 1
fi

# Check if target directory exists and is a directory
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Target directory does not exist or is not a directory: '$TARGET_DIR'"
    exit 1
fi

# ==============================================================================
# --- File Conversion Process ---
# ==============================================================================

echo "Starting PNG to JPEG conversion in: $TARGET_DIR"
echo "Options: Quality=$QUALITY%, Extension=.$EXTENSION, Background=$BACKGROUND_COLOR, Recursive=$RECURSIVE"
echo "------------------------------------------------------------"

# Initialize counters
success_count=0
fail_count=0

# Configure find command arguments depending on recursion setting
find_args=("$TARGET_DIR")
if [ "$RECURSIVE" = "false" ]; then
    find_args+=("-maxdepth" "1")
fi
find_args+=("-type" "f" "-iname" "*.png" "-print0")

# Run find and process each file in a null-terminated loop (safe for spaces/newlines in filenames)
while IFS= read -r -d '' png_file; do
    # Define output filename by stripping the suffix and appending the new extension
    dir_name=$(dirname "$png_file")
    base_name=$(basename "$png_file")
    
    # Strip .png or .PNG from the end
    file_no_ext="${base_name%.*}"
    jpg_file="$dir_name/${file_no_ext}.${EXTENSION}"

    echo "Converting: '$png_file' -> '$jpg_file'..."
    
    # Perform conversion:
    # 1. -background specifies the fill color for transparency
    # 2. -alpha remove removes the alpha channel by blending pixels with the background color
    # 3. -alpha off disables the alpha channel flag in the output image
    # 4. -quality sets the compression quality
    if convert "$png_file" -background "$BACKGROUND_COLOR" -alpha remove -alpha off -quality "$QUALITY" "$jpg_file" 2>/dev/null; then
        echo "  [SUCCESS]"
        success_count=$((success_count + 1))
    else
        echo "  [FAILED]" >&2
        fail_count=$((fail_count + 1))
    fi
done < <(find "${find_args[@]}")

# ==============================================================================
# --- Execution Summary ---
# ==============================================================================
echo "------------------------------------------------------------"
echo "Conversion complete!"
echo "Successfully converted: $success_count file(s)"
if [ "$fail_count" -gt 0 ]; then
    echo "Failed to convert:     $fail_count file(s)"
    exit 1
else
    exit 0
fi
