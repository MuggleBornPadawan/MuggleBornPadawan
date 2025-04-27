#!/bin/bash

# to to root directory to ensure that commands are executed from there
cd

# Script to echo date and time once per hour, at a random minute (at second 00).
# This version calculates the wait time until a random minute of the *next* hour.

echo "Starting hourly timer script. Press Ctrl+C to stop."
echo "Will print date once per clock hour at a random minute (around second 00)."
echo "committing"
while true
do
    # Get current minute (0-59) and second (0-59) of the hour
    # Use %-M, %-S to remove leading zeros (GNU date specific, safer for arithmetic)
    # If %-M/%-S not available, use %M/%S and force base-10: current_min=$((10#$(date +%M)))
    current_min=$(date +%-M)
    current_sec=$(date +%-S)

    # Calculate total seconds passed since the start of the current hour
    secs_past_this_hour=$((current_min * 60 + current_sec))

    # Calculate seconds remaining until the start of the next hour (3600 seconds in an hour)
    secs_to_next_hour=$((3600 - secs_past_this_hour))

    # Choose a random minute (0-59) within the *next* hour to trigger
    target_min_next_hour=$(($RANDOM % 60))

    # Convert the target minute offset into seconds (aiming for second 00 of that minute)
    target_offset_seconds=$((target_min_next_hour * 60))

    # Total sleep time = time remaining in this hour + random minute offset into next hour
    total_sleep=$((secs_to_next_hour + target_offset_seconds))

    # Uncomment the next line for debugging/seeing the plan
    echo "[DEBUG] Now: $(date '+%T'), Min: $current_min, Sec: $current_sec. Target min next hour: $target_min_next_hour. Sleeping: ${total_sleep}s..."

    # Sleep until the calculated random minute (at second 00) of the next hour
    # Note: Execution time of commands before sleep might make it trigger a second or so past :00
    sleep $total_sleep

    # Perform the action: run commits; print the date and time
    pwd
    cd~
    pwd
    ./MuggleBornPadawan/700_linux/bckp/commits.sh
    echo "----------------------------------------"
    echo "Commits triggered at: $(date)"
    echo "(Targeted minute was: ${target_min_next_hour} of the hour)"
    echo "----------------------------------------"

    # Loop repeats: calculates sleep time for the *next* hour based on the new current time after waking up

done

# This part is usually not reached because the loop is infinite
echo "Script stopped."
