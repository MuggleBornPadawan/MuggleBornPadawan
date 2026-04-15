#!/bin/bash
# License: GNU GPL v3
# Author: MuggleBornPadawan
# Description: A robust ROT13 utility for Debian/Bash.

# 1. Capture the original input
# If no argument is provided, use a default test string
ORIGINAL="${1:-"The quick brown fox jumps over the lazy dog!"}"

# 2. Define our transformation function
# This is our 'Black Box'
rot13() {
    echo "$1" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
}

# 3. Perform the transformations (Step-by-Step)
ROTATED=$(rot13 "$ORIGINAL")
BACK_AGAIN=$(rot13 "$ROTATED")

# 4. Visual Output
echo "------------------------------------------------"
echo "PHASE 1 (Original):   $ORIGINAL"
echo "------------------------------------------------"
echo "PHASE 2 (Rotated):    $ROTATED"
echo "------------------------------------------------"
echo "PHASE 3 (Restored):   $BACK_AGAIN"
echo "------------------------------------------------"

# 5. Logic Check
if [ "$ORIGINAL" == "$BACK_AGAIN" ]; then
    echo "SUCCESS: The data was restored perfectly."
else
    echo "FAILURE: There is a mismatch in the transformation."
fi
