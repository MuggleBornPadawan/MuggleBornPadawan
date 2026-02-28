#!/bin/bash
# Author: MuggleBornPadawan
# License: GNU GPL v3
# Description: Triggers a chime sound on a Debian-based Chromebook

# GNU GPL v3 Snippet:
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License.

triggerTerminalChime() {
    # We use 'tput bel' to send the terminal-specific bell sequence.
    # We redirect to /dev/tty to ensure it hits the screen even during pipes.
    if command -v tput > /dev/null; then
        tput bel > /dev/tty
    else
        # Fallback to printf if tput is missing
        printf "\a" > /dev/tty
    fi
}

# Main Execution
triggerTerminalChime
