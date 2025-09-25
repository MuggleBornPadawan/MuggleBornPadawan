/*
 * =====================================================================================
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

// Compile the C++ program after modifying file name
// g++ -std=c++11 -o utf_codepoints_cpp utf_codepoints.cpp

// Run the compiled program after modifying file name
//./utf_codepoints_cpp

// remove the pipleline symbol to optimize file size
// sed -i 's/|//g' all_codepoints_pipelined.txt

#include <iostream>
#include <fstream>
#include <string>
#include <locale>

// Converts a Unicode code point to a UTF-8 encoded std::string.
std::string to_utf8_string(char32_t cp) {
    std::string result;
    if (cp < 0x80) {
        result += static_cast<char>(cp);
    } else if (cp < 0x800) {
        result += static_cast<char>(0xC0 | (cp >> 6));
        result += static_cast<char>(0x80 | (cp & 0x3F));
    } else if (cp < 0x10000) {
        result += static_cast<char>(0xE0 | (cp >> 12));
        result += static_cast<char>(0x80 | ((cp >> 6) & 0x3F));
        result += static_cast<char>(0x80 | (cp & 0x3F));
    } else if (cp <= 0x10FFFF) {
        result += static_cast<char>(0xF0 | (cp >> 18));
        result += static_cast<char>(0x80 | ((cp >> 12) & 0x3F));
        result += static_cast<char>(0x80 | ((cp >> 6) & 0x3F));
        result += static_cast<char>(0x80 | (cp & 0x3F));
    }
    return result;
}

int main() {
    const std::string log_file_name = "all_codepoints_pipelined.txt";
    std::ofstream log_file(log_file_name);

    if (!log_file.is_open()) {
        std::cerr << "Error: Could not open log file " << log_file_name << std::endl;
        return 1;
    }

    // Set the file's locale to handle UTF-8 correctly.
    log_file.imbue(std::locale("en_US.UTF-8"));

    // Iterate through all Unicode code points.
    for (char32_t cp = 0; cp <= 0x10FFFF; ++cp) {
        // Skip surrogate pair code points.
        if (cp >= 0xD800 && cp <= 0xDFFF) {
            continue;
        }
        
        // Print progress to the console.
        if (cp % 50000 == 0) {
            std::cerr << "Processing... at code point U+" << std::hex << std::uppercase << cp << std::endl;
        }

        log_file << to_utf8_string(cp) << "|";
    }

    std::cerr << "Processing complete. Output written to " << log_file_name << std::endl;
    log_file.close();

    return 0;
}

// Compile the C++ program after modifying file name
// g++ -std=c++11 -o utf_codepoints_cpp utf_codepoints.cpp

// Run the compiled program after modifying file name
//./utf_codepoints_cpp

// remove the pipleline symbol to optimize file size
// sed -i 's/|//g' all_codepoints_pipelined.txt
