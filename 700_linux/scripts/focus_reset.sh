#!/bin/bash
# ---------------------------------------------------------------------------
# Focus Recovery Protocol v1.0
# License: GNU GPL v3
# Description: A checklist-driven utility to regain cognitive focus after 
#              encountering "toxic" or high-stress input.
# ---------------------------------------------------------------------------

# Variables for the session
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
SESSION_LOG="$HOME/focus_session_$(date +%s).txt"

# Function to pause and validate
validate_step() {
    echo -e "\n[SYSTEM CHECK]: $1"
    read -p "Type 'y' to confirm completion: " check
    if [[ $check != "y" ]]; then
        echo "Exiting. Take more time with this step."
        exit 1
    fi
}

clear
echo "========================================================="
echo "        INVOKING FOCUS RECOVERY PROTOCOL                 "
echo "        Session Started: $TIMESTAMP                      "
echo "========================================================="
echo "Goal: De-complect emotion from output and reset CPU cycles."
echo "---------------------------------------------------------"

# --- PHASE 1: PHYSIOLOGICAL RESET (The Hardware Layer) ---
echo -e "\nPHASE 1: HARDWARE RESET"
echo "1. Perform a 'Physiological Sigh' (Double inhale, long exhale)."
echo "2. Stand up and stretch for 30 seconds."
validate_step "Is your heart rate stabilizing?"

# --- PHASE 2: SENSORY GROUNDING (The Kernel Layer) ---
echo -e "\nPHASE 2: KERNEL GROUNDING"
echo "Identify: 3 things you see, 2 you hear, 1 you feel."
validate_step "Are you back in the physical present?"

# --- PHASE 3: DE-COMPLECTING (The Logic Layer) ---
echo -e "\nPHASE 3: LOGIC REFRAMING"
echo "The toxicity is 'External Noise' (Input Data)."
echo "It is not 'Code Logic' (Your Identity/Value)."
echo "Action: Write the toxic thought in a temporary buffer (scratchpad) 
      and then delete it."
validate_step "Have you isolated the 'noise' from your 'core logic'?"

# --- PHASE 4: RE-ENTRY (The Execution Layer) ---
echo -e "\nPHASE 4: TASK RE-ENTRY"
echo "Choose ONE 'Low-Stakes Win' (e.g., format one file, reply to one 
      neutral email, or clean one function)."
read -p "Enter your 5-minute task name: " task
echo "Executing: $task..."
sleep 2

validate_step "Is the 5-minute task complete?"

# --- CONCLUSION ---
echo "---------------------------------------------------------"
echo "PROTOCOL COMPLETE. RE-ATTACHING TO DEEP WORK HEADERS."
echo "Log saved to: $SESSION_LOG"
echo "Happy Hacking, mate."
echo "========================================================="

# Save session metadata
echo "Focus Session $TIMESTAMP: Successfully recovered focus." >> "$SESSION_LOG"
