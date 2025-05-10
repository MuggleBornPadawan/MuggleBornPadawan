#!/bin/bash

# ==============================================================================
# Script Name: hello_world.sh
# Description: A simple script to print a "Hello, World" message with the
#              current date and time. Intended to be run by cron.
# Author:      MuggleBornPadawan (via Gemini Assistant)
# Date:        May 10, 2025
#
# Best Practice: Setting the PATH
# Cron jobs run with a minimal environment. Explicitly setting the PATH
# ensures that common commands like 'date' and 'echo' are found reliably,
# regardless of the system's default cron environment.
# ==============================================================================

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# The message to be printed (and subsequently emailed by cron)
# The $(date) command substitution will insert the current date and time.
/bin/echo "Hello, World from cron! The current date and time is: $(/bin/date)"

# Using absolute paths like /bin/echo and /bin/date is an alternative
# to setting the PATH variable. Both achieve environment robustness.
# For this script, we've set the PATH, but also used absolute paths for
# maximum clarity and safety. You could use just 'echo' and 'date'
# after setting the PATH variable.
