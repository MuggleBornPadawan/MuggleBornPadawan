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
// g++ -std=c++11 -o codepoints_cpp codepoints.cpp

// Run the compiled program after modifying file name
//./codepoints_cpp

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>
#include <sstream>
#include <cstdint>

// Converts a Unicode code point to a UTF-8 encoded std::string.
std::string to_utf8_string(char32_t cp) {
    std::string result;
    if (cp < 0x80) { // 1-byte sequence
        result += static_cast<char>(cp);
    } else if (cp < 0x800) { // 2-byte sequence
        result += static_cast<char>(0xC0 | (cp >> 6));
        result += static_cast<char>(0x80 | (cp & 0x3F));
    } else if (cp < 0x10000) { // 3-byte sequence
        result += static_cast<char>(0xE0 | (cp >> 12));
        result += static_cast<char>(0x80 | ((cp >> 6) & 0x3F));
        result += static_cast<char>(0x80 | (cp & 0x3F));
    } else if (cp <= 0x10FFFF) { // 4-byte sequence
        result += static_cast<char>(0xF0 | (cp >> 18));
        result += static_cast<char>(0x80 | ((cp >> 12) & 0x3F));
        result += static_cast<char>(0x80 | ((cp >> 6) & 0x3F));
        result += static_cast<char>(0x80 | (cp & 0x3F));
    }
    return result;
}

// Converts a Unicode code point to its UTF-8 hexadecimal representation.
std::string to_utf8_hex(char32_t cp) {
    std::stringstream ss;
    ss << std::hex << std::uppercase << std::setfill('0');
    
    std::string utf8_char = to_utf8_string(cp);
    for (unsigned char c : utf8_char) {
        ss << std::setw(2) << static_cast<int>(c);
    }
    return ss.str();
}

// Converts a Unicode code point to its UTF-16 (Big Endian) hexadecimal representation.
std::string to_utf16_hex(char32_t cp) {
    std::stringstream ss;
    ss << std::hex << std::uppercase << std::setfill('0');

    if (cp < 0x10000) { // Basic Multilingual Plane (BMP)
        ss << std::setw(4) << cp;
    } else { // Supplementary Planes (requires surrogate pair)
        char32_t temp = cp - 0x10000;
        uint16_t high_surrogate = 0xD800 + (temp >> 10);
        uint16_t low_surrogate = 0xDC00 + (temp & 0x3FF);
        ss << std::setw(4) << high_surrogate;
        ss << std::setw(4) << low_surrogate;
    }
    return ss.str();
}

// Converts a Unicode code point to its UTF-32 (Big Endian) hexadecimal representation.
std::string to_utf32_hex(char32_t cp) {
    std::stringstream ss;
    ss << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << cp;
    return ss.str();
}

int main() {
    const std::string log_file_name = "codepoints_all_with_chars.log";
    std::ofstream log_file(log_file_name);

    if (!log_file.is_open()) {
        std::cerr << "Error: Could not open log file " << log_file_name << std::endl;
        return 1;
    }
    
    // Ensure the output file is encoded in UTF-8
    log_file.imbue(std::locale("en_US.UTF-8"));
    
    // Write header
    log_file << "| " << std::left << std::setw(10) << "Character"
             << "| " << std::left << std::setw(10) << "Code Point"
             << "| " << std::left << std::setw(15) << "UTF-8 (Hex)"
             << "| " << std::left << std::setw(15) << "UTF-16BE (Hex)"
             << "| " << std::left << std::setw(15) << "UTF-32BE (Hex)"
             << "|\n";
    log_file << "|------------|------------|-----------------|-----------------|-----------------|\n";

    // Iterate through all Unicode code points
    for (char32_t cp = 0; cp <= 0x10FFFF; ++cp) {
        // Skip surrogate pair code points, which are not valid characters.
        if (cp >= 0xD800 && cp <= 0xDFFF) {
            continue;
        }

        // Print progress to the console (stderr)
        if (cp % 50000 == 0) {
            std::cerr << "Processing... at code point U+" << std::hex << std::uppercase << cp << " (" << std::dec << cp << ")" << std::endl;
        }

        std::stringstream cp_hex_ss;
        cp_hex_ss << "U+" << std::hex << std::uppercase << std::setfill('0') << std::setw(4) << cp;
        
        // Get the actual character as a UTF-8 string
        std::string character_str = to_utf8_string(cp);
        // For non-printable ASCII, provide a placeholder to avoid breaking table format
        if (cp < 32 || (cp >= 127 && cp <= 159)) {
            character_str = "Ctrl";
        }


        log_file << "| " << std::left << std::setw(10) << character_str
                 << "| " << std::left << std::setw(10) << cp_hex_ss.str()
                 << "| " << std::left << std::setw(15) << to_utf8_hex(cp)
                 << "| " << std::left << std::setw(15) << to_utf16_hex(cp)
                 << "| " << std::left << std::setw(15) << to_utf32_hex(cp)
                 << "|\n";
    }

    std::cerr << "Processing complete. Output written to " << log_file_name << std::endl;
    log_file.close();
    
    return 0;
}
