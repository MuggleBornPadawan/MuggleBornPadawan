/*
 * =====================================================================================
 *
 * Filename:  randomWalker.cpp
 *
 * Description:  A C++ program to generate a 3D random walk path.
 *
 * Version:  1.0
 * Created:  09/17/2025
 * Revision:  none
 * Compiler:  g++
 *
 * Author:  MuggleBornPadawan
 *
 * =====================================================================================
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * =====================================================================================
 */
// compile - terminal command - g++ -std=c++17 -Wall -Wextra -o randomWalker randomWalker.cpp

#include <iostream>   // For standard input/output (e.g., std::cout)
#include <fstream>    // For file stream operations (writing to a file)
#include <vector>     // While not used for the path, good to know for storing data
#include <random>     // For modern, high-quality random number generation
#include <string>     // For using the string class

// --- Configuration Settings ---
// Externalize settings for easy modification. Avoids "magic numbers".
const int NUM_STEPS = 13;
const std::string OUTPUT_FILENAME = "path.dat";

// --- Data Structures ---
// Use a struct to group related data. This improves semantic clarity.
// A point in 3D space is a single concept, so its data should be grouped.
struct Point3D {
    int nX;
    int nY;
    int nZ;
};

/*
 * ===  FUNCTION  ======================================================================
 * Name:  main
 * Description:  Entry point of the program.
 * =====================================================================================
 */
int main() {
    // --- Initialization ---
    Point3D currentPosition = {0, 0, 0}; // Start at the origin

    // --- File Handling with Error Management ---
    // Use an output file stream (ofstream) to write data.
    std::ofstream outputFile;
    outputFile.open(OUTPUT_FILENAME);

    // Strategic Error Handling: Always check if file operations succeed.
    if (!outputFile.is_open()) {
        std::cerr << "Error: Could not open file " << OUTPUT_FILENAME << " for writing." << std::endl;
        return 1; // Return a non-zero exit code to indicate failure
    }

    // --- Modern Random Number Generation ---
    // KISS & YAGNI: We only need integers, so we set up for that.
    // Avoids the old `rand()`, which has poor statistical properties.
    std::random_device rd; // Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); // Standard mersenne_twister_engine seeded with rd()
    //std::uniform_int_distribution<> distrib(0, 5); // Six possible outcomes (0-5)
    std::uniform_int_distribution<> distrib(0, 2); // Three possible outcomes (0-2)
    // Write the starting position to the file
    outputFile << currentPosition.nX << " " << currentPosition.nY << " " << currentPosition.nZ << std::endl;

    // --- Main Logic Loop ---
    // The core of the random walk simulation.
    for (int i = 0; i < NUM_STEPS; ++i) {
        int iRandomMove = distrib(gen); // Generate a random integer from 0 to 5

        // Determine the next step based on the random number
        switch (iRandomMove) {
            case 0: currentPosition.nX++; break; // Move +X
	      //case 1: currentPosition.nX--; break; // Move -X
            case 1: currentPosition.nY++; break; // Move +Y
	      //case 3: currentPosition.nY--; break; // Move -Y
            case 2: currentPosition.nZ++; break; // Move +Z
	      //case 5: currentPosition.nZ--; break; // Move -Z
        }

        // Write the new position to our data file
        outputFile << currentPosition.nX << " " << currentPosition.nY << " " << currentPosition.nZ << std::endl;
    }

    // --- Cleanup ---
    // It's good practice to explicitly close the file.
    outputFile.close();

    std::cout << "Successfully generated " << NUM_STEPS << " steps into " << OUTPUT_FILENAME << std::endl;

    return 0; // Return 0 to indicate success
}
