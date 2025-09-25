#!/bin/bash

# Displays all Tamil code points in UTF-8.

# The Unicode block for Tamil is U+0B80 to U+0BFF.

printf "+-------------------------------------------------+\n"
printf "| %-12s | %-10s | %-15s |\n" "Code Point" "Character" "UTF-8 (Hex)"
printf "+-------------------------------------------------+\n"

# Decimal range for U+0B80 to U+0BFF is 2944 to 3071
for i in $(seq 2944 3071); do
    char=$(perl -CS -le "print chr($i)")
    hex_i=$(printf "%X" "$i")
    utf8=$(echo -n "$char" | xxd -p | tr 'a-z' 'A-Z')
    printf "| U+%04s       |    %s         | %-15s |\n" "$hex_i" "$char" "$utf8"
done

printf "+-------------------------------------------------+\n"