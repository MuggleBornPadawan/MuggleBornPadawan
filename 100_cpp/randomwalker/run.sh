#!/bin/bash

# A simple script to compile and run the 3D random walker project.
# It enforces a clean workflow: compile -> run -> plot.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Step 1: Compiling C++ code ---"
g++ -std=c++17 -Wall -Wextra -o randomWalker randomWalker.cpp
echo "Compilation successful."

echo "--- Step 2: Running C++ executable to generate data ---"
./randomWalker
echo "Data file 'path.dat' generated."

echo "--- Step 3: Running gnuplot to create animation ---"
gnuplot plotter.gp
echo "--- All steps complete. Check for 'random_walk.gif' ---"
