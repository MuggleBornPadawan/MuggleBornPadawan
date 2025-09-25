#!/bin/bash

# Displays various mathematical notations and symbols using their Unicode code points.

# Function to print a formatted table header
print_header() {
    printf "+-------------------------------------------------+\n"
    printf "| %-12s | %-10s | %-15s |\n" "Code Point" "Character" "UTF-8 (Hex)"
    printf "+-------------------------------------------------+\n"
}

# Function to print a Unicode block
# Takes the starting and ending code points of the block as arguments
print_unicode_block() {
    local start_hex=$1
    local end_hex=$2
    local start_dec=$((start_hex))
    local end_dec=$((end_hex))

    for i in $(seq "$start_dec" "$end_dec"); do
        char=$(perl -CS -le "print chr($i)")
        hex_i=$(printf "%X" "$i")
        utf8=$(echo -n "$char" | xxd -p | tr 'a-z' 'A-Z')
        printf "| U+%04s       |    %s         | %-15s |\n" "$hex_i" "$char" "$utf8"
    done
}

# --- Mathematical Operators (U+2200 to U+22FF) ---
echo "Mathematical Operators (U+2200 to U+22FF)"
print_header
print_unicode_block 0x2200 0x22FF
printf "+-------------------------------------------------+\n\n"

# --- Miscellaneous Mathematical Symbols-A (U+27C0 to U+27EF) ---
echo "Miscellaneous Mathematical Symbols-A (U+27C0 to U+27EF)"
print_header
print_unicode_block 0x27C0 0x27EF
printf "+-------------------------------------------------+\n\n"

# --- Miscellaneous Mathematical Symbols-B (U+2980 to U+29FF) ---
echo "Miscellaneous Mathematical Symbols-B (U+2980 to U+29FF)"
print_header
print_unicode_block 0x2980 0x29FF
printf "+-------------------------------------------------+\n\n"

# --- Miscellaneous Technical (U+2300 to U+23FF) ---
echo "Miscellaneous Technical (U+2300 to U+23FF)"
print_header
print_unicode_block 0x2300 0x23FF
printf "+-------------------------------------------------+\n\n"

# --- Letterlike Symbols (U+2100 to U+214F) ---
echo "Letterlike Symbols (U+2100 to U+214F)"
print_header
print_unicode_block 0x2100 0x214F
printf "+-------------------------------------------------+\n\n"

# --- Number Forms (U+2150 to U+218F) ---
echo "Number Forms (U+2150 to U+218F)"
print_header
print_unicode_block 0x2150 0x218F
printf "+-------------------------------------------------+\n\n"

# --- Arrows (U+2190 to U+21FF) ---
echo "Arrows (U+2190 to U+21FF)"
print_header
print_unicode_block 0x2190 0x21FF
printf "+-------------------------------------------------+\n\n"

# --- Supplemental Arrows-A (U+27F0 to U+27FF) ---
echo "Supplemental Arrows-A (U+27F0 to U+27FF)"
print_header
print_unicode_block 0x27F0 0x27FF
printf "+-------------------------------------------------+\n\n"

# --- Supplemental Arrows-B (U+2900 to U+297F) ---
echo "Supplemental Arrows-B (U+2900 to U+297F)"
print_header
print_unicode_block 0x2900 0x297F
printf "+-------------------------------------------------+\n\n"