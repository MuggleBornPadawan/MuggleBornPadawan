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

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>
#include <sstream>
#include <cstdint>
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
    if (cp < 0x10000) {
        ss << std::setw(4) << cp;
    } else {
        char32_t temp = cp - 0x10000;
        uint16_t high = 0xD800 + (temp >> 10);
        uint16_t low = 0xDC00 + (temp & 0x3FF);
        ss << std::setw(4) << high << std::setw(4) << low;
    }
    return ss.str();
}

// Converts a Unicode code point to its UTF-32 (Big Endian) hexadecimal representation.
std::string to_utf32_hex(char32_t cp) {
    std::stringstream ss;
    ss << std::hex << std::uppercase << std::setfill('0') << std::setw(8) << cp;
    return ss.str();
}

// Wraps a string in double quotes for CSV, escaping any internal quotes.
std::string csv_quote(const std::string& field) {
    std::string result = "\"";
    for (char c : field) {
        if (c == '"') {
            result += "\"\"";
        } else {
            result += c;
        }
    }
    result += "\"";
    return result;
}

int main() {
    const std::string log_file_name = "codepoints_all.csv";
    std::ofstream log_file(log_file_name);

    if (!log_file.is_open()) {
        std::cerr << "Error: Could not open log file " << log_file_name << std::endl;
        return 1;
    }
    
    log_file.imbue(std::locale("en_US.UTF-8"));
    
    // Write CSV header
    log_file << "\"Character\",\"Code Point\",\"UTF-8 (Hex)\",\"UTF-16BE (Hex)\",\"UTF-32BE (Hex)\"\n";

    for (char32_t cp = 0; cp <= 0x10FFFF; ++cp) {
        if (cp >= 0xD800 && cp <= 0xDFFF) {
            continue; // Skip surrogates
        }

        if (cp % 50000 == 0) {
            std::cerr << "Processing... at code point U+" << std::hex << std::uppercase << cp << std::endl;
        }

        std::stringstream cp_hex_ss;
        cp_hex_ss << "U+" << std::hex << std::uppercase << std::setfill('0') << std::setw(4) << cp;
        
        std::string character_str = to_utf8_string(cp);
        if (iscntrl(static_cast<unsigned char>(character_str[0])) && character_str.length() == 1) {
             character_str = ""; // Represent control characters as empty fields
        }

        log_file << csv_quote(character_str) << ","
                 << cp_hex_ss.str() << ","
                 << to_utf8_hex(cp) << ","
                 << to_utf16_hex(cp) << ","
                 << to_utf32_hex(cp) << "\n";
    }

    std::cerr << "Processing complete. Output written to " << log_file_name << std::endl;
    log_file.close();
    
    return 0;
}
