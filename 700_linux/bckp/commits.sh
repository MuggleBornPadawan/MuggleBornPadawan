#!/bin/bash

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

# Helper function to potentially pause script execution for a random duration.
# Arguments:
#   $1 - The first argument to check (e.g., "r")

delay_timer() {
  # Access the first argument passed to the function
  local func_arg="$1"

  # Check if the function argument is exactly "r"
  if [ "$func_arg" = "r" ]; then
    # If it is "r", calculate a random number of seconds between 60 and 240
    local random_duration # Use 'local' for variables inside functions
    random_duration=$(shuf -i 60-240 -n 1)

    # Print a message indicating the duration before sleeping
    echo "Argument 'r' received by delay_timer. Sleeping for ${random_duration} seconds..."

    # Pause script execution for the calculated random duration
    sleep "${random_duration}"

    # Print a message after sleeping finishes
    echo "Sleep finished."
  # else
    # Optionally, add an 'else' block here if you want to do something
    # when the argument is NOT "r", e.g., print a message.
    # echo "Argument '$func_arg' is not 'r'. No delay triggered."
  fi
}

# --- Example Usage of the function ---
# To use the function, you call it by name, passing any required arguments.
# For instance, to make the function behave based on the argument
# passed to the *script* itself, you would call it like this:

# echo "Script started."
# delay_timer "$1" # Pass the script's first argument ($1) to the function
# echo "Script continued after delay_timer (or immediately if no delay)."

# You can call the function multiple times with different arguments:
# delay_timer "r"   # This call would trigger the delay
# delay_timer "xyz" # This call would not trigger the delay

# For this specific request, I'll provide just the function definition
# without the example calls, as you asked for the function itself.
# But keep the example usage commented out for reference!

# --- Function Definition Ends Here ---

# Note: When you run this script, if you provide 'r' as the first argument,
# nothing will visibly happen because the example usage is commented out.
# Uncomment the example usage section above to see the function in action
# based on script arguments.

echo " - - - "
echo "test programming blocks"
cd
cd MuggleBornPadawan/130_mit_scheme
scheme --load hello_world.scm --eval '(exit)' | tail -n 4
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily mit-scheme"
cd
delay_timer "$1"
cd MuggleBornPadawan/150_racket_scheme
racket hello_world.rkt | head -n 2
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily racket"
cd
delay_timer "$1"
cd MuggleBornPadawan/100_cpp
./hello
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily cpp"
cd
delay_timer "$1"
cd MuggleBornPadawan/200_java
java -jar HelloWorld.jar
cd
delay_timer "$1"
cd MuggleBornPadawan/
git add .
git commit -m "daily java"
cd
delay_timer "$1"
cd MuggleBornPadawan/300_python
python3 hello_world.py
cd
delay_timer "$1"
cd MuggleBornPadawan/
git add .
git commit -m "daily python"
cd
delay_timer "$1"
cd MuggleBornPadawan/140_clisp
clisp hello-world.lisp
cd
delay_timer "$1"
cd MuggleBornPadawan/
git add .
git commit -m "daily clisp"
cd
delay_timer "$1"
cd MuggleBornPadawan/400_r
Rscript hello_world.R
cd
delay_timer "$1"
cd MuggleBornPadawan/
git add .
git commit -m "daily r"
cd
delay_timer "$1"
cd MuggleBornPadawan/110_clojure
clojure hello_world.clj
cd
delay_timer "$1"
cd MuggleBornPadawan/
git add .
git commit -m "daily clj"
cd
delay_timer "$1"
cd MuggleBornPadawan/120_elisp
emacs -Q --script hello_world.el
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily elisp"
cd
delay_timer "$1"
cd MuggleBornPadawan/700_linux/bckp/
git add daily_nuggets.txt.enc
git commit -m "daily nuggets"
cd
echo " - - - "
neofetch
