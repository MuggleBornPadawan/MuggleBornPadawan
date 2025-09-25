#!/bin/bash

# Log file
LOG_FILE="ascii_codepoints.log"

# Clear the log file or create it if it doesn't exist
> "$LOG_FILE"

# Write the header to the log file
{
  printf "| %-10s | %-10s | %-10s | %-10s | %-10s |\n" "Character" "ASCII" "UTF-8" "UTF-16" "UTF-32"
  printf "|------------|------------|------------|------------|------------|\n"
} >> "$LOG_FILE"

# Iterate through the ASCII range (0-127)
for i in {0..127}; do
  # Get the character representation, handling non-printable characters
  if (( i >= 32 && i <= 126 )); then
    char=$(printf "\\$(printf '%03o' "$i")")
  else
    char="Control"
  fi

  # Format for UTF-8 (1 byte for ASCII)
  utf8=$(printf "%02X" "$i")

  # Format for UTF-16 (2 bytes for ASCII)
  utf16=$(printf "00%02X" "$i")

  # Format for UTF-32 (4 bytes for ASCII)
  utf32=$(printf "000000%02X" "$i")

  # Write the row to the log file
  {
    printf "| %-10s | %-10d | %-10s | %-10s | %-10s |\n" "$char" "$i" "$utf8" "$utf16" "$utf32"
    printf "|------------|------------|------------|------------|------------|\n"
  } >> "$LOG_FILE"
done
