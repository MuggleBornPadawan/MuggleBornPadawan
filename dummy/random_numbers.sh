#!/usr/bin/env bash

# Random Number Generator Script
# Generates a list of random numbers with customizable parameters

# Default values
COUNT=10
MIN=1
MAX=100

# Display usage information
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Generate random numbers with customizable parameters."
    echo ""
    echo "Options:"
    echo "  -c COUNT    Number of random numbers to generate (default: $COUNT)"
    echo "  -min MIN    Minimum value (inclusive, default: $MIN)"
    echo "  -max MAX    Maximum value (inclusive, default: $MAX)"
    echo "  -h          Display this help message"
    echo ""
    echo "Examples:"
    echo "  $0                  # Generate 10 numbers between 1 and 100"
    echo "  $0 -c 5             # Generate 5 numbers between 1 and 100"
    echo "  $0 -min 10 -max 50  # Generate 10 numbers between 10 and 50"
    echo "  $0 -c 20 -min 0 -max 1000  # Generate 20 numbers between 0 and 1000"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c)
            COUNT="$2"
            shift 2
            ;;
        -min)
            MIN="$2"
            shift 2
            ;;
        -max)
            MAX="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Validate inputs
if ! [[ "$COUNT" =~ ^[0-9]+$ ]] || [ "$COUNT" -le 0 ]; then
    echo "Error: Count must be a positive integer"
    exit 1
fi

if ! [[ "$MIN" =~ ^-?[0-9]+$ ]]; then
    echo "Error: Min must be an integer"
    exit 1
fi

if ! [[ "$MAX" =~ ^-?[0-9]+$ ]]; then
    echo "Error: Max must be an integer"
    exit 1
fi

if [ "$MIN" -gt "$MAX" ]; then
    echo "Error: Min value cannot be greater than max value"
    exit 1
fi

# Calculate range for random number generation
RANGE=$((MAX - MIN + 1))

# Generate and display random numbers
echo "Generating $COUNT random numbers between $MIN and $MAX:"
for ((i=1; i<=COUNT; i++)); do
    # Generate random number in range [MIN, MAX]
    RANDOM_NUM=$(( (RANDOM % RANGE) + MIN ))
    echo "$RANDOM_NUM"
done