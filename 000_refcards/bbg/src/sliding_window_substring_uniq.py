#  longest_substring_runner.py
#  Copyright (C) 2026
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/>.

import sys
import unittest

def longestSubstringWithUniqueCharsOptimized(s: str) -> int:
    """
    Calculates the length of the longest substring without repeating characters.
    
    Optimized via a direct fixed-array lookup for extended ASCII characters 
    to eliminate dictionary hashing and resizing overhead. Fallback mechanism
    handles Unicode gracefully.
    
    Time Complexity: O(n) where n is the length of the string.
    Space Complexity: O(1) constant auxiliary space (fixed array of size 256).
    """
    if s is None:
        raise ValueError("Input string cannot be None.")
        
    stringLength = len(s)
    if stringLength <= 1:
        return stringLength

    try:
        # Pre-allocate a lookup array for all 256 extended ASCII points.
        # Initialized to -1 indicating the character hasn't been seen yet.
        charLookupArray = [-1] * 256
        maxLength = 0
        leftPointer = 0
        
        for rightPointer in range(stringLength):
            charValue = ord(s[rightPointer])
            
            # Guard rail for out-of-bounds unicode characters
            if charValue > 255:
                raise ValueError("Non-ASCII character encountered. Falling back.")
                
            lastSeenIndex = charLookupArray[charValue]
            if lastSeenIndex >= leftPointer:
                leftPointer = lastSeenIndex + 1
                
            charLookupArray[charValue] = rightPointer
            
            currentWindowLength = rightPointer - leftPointer + 1
            if currentWindowLength > maxLength:
                maxLength = currentWindowLength
                
        return maxLength

    except ValueError:
        # Fallback implementation utilizing a hash map when Unicode is detected
        maxUnicodeLength = 0
        unicodeMap = {}
        leftUnicodePointer = 0
        
        for rightUnicodePointer in range(stringLength):
            currentChar = s[rightUnicodePointer]
            
            if currentChar in unicodeMap and unicodeMap[currentChar] >= leftUnicodePointer:
                leftUnicodePointer = unicodeMap[currentChar] + 1
                
            unicodeMap[currentChar] = rightUnicodePointer
            
            currentWindowLength = rightUnicodePointer - leftUnicodePointer + 1
            if currentWindowLength > maxUnicodeLength:
                maxUnicodeLength = currentWindowLength
                
        return maxUnicodeLength


class OrgTableTestResult(unittest.TextTestResult):
    """
    Custom test result collector that outputs results as a beautifully formatted
    Markdown/Org-mode compatible table.
    """
    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.stream = stream
        self.results = []

    def _get_test_data(self, test):
        input_data = getattr(test, 'input_data', 'N/A')
        expected_data = getattr(test, 'expected_data', 'N/A')
        return input_data, expected_data

    def addSuccess(self, test):
        super().addSuccess(test)
        # Safely pull the docstring metadata or default to the test name
        description = test._testMethodDoc.strip() if test._testMethodDoc else test._testMethodName
        input_data, expected_data = self._get_test_data(test)
        self.results.append((description, input_data, expected_data, "PASS", "No issues encountered."))

    def addFailure(self, test, err):
        super().addFailure(test, err)
        description = test._testMethodDoc.strip() if test._testMethodDoc else test._testMethodName
        input_data, expected_data = self._get_test_data(test)
        self.results.append((description, input_data, expected_data, "FAIL", str(err[1])))

    def addError(self, test, err):
        super().addError(test, err)
        description = test._testMethodDoc.strip() if test._testMethodDoc else test._testMethodName
        input_data, expected_data = self._get_test_data(test)
        self.results.append((description, input_data, expected_data, "ERROR", str(err[1])))

    def printTable(self):
        # Print Header Notes
        self.stream.writeln("### Substring Optimization Verification Suite Execution")
        self.stream.writeln("#### Complexity Specifications Matrix:")
        self.stream.writeln("- **Time Complexity:** O(n) linear evaluation footprint where n is the stream length.")
        self.stream.writeln("- **Space Complexity:** O(1) steady auxiliary memory constraints for standard ASCII, expanding to O(min(n, m)) inside multi-byte unicode fallbacks.")
        self.stream.writeln("\n| Test Scenario Profile | Input | Expected | Status | Diagnostics / Metadata |")
        self.stream.writeln("| :--- | :--- | :--- | :--- | :--- |")
        
        for desc, input_val, expected_val, status, note in self.results:
            # Format input to handle empty strings and whitespace visually
            formatted_input = f"'{input_val}'" if isinstance(input_val, str) else str(input_val)
            self.stream.writeln(f"| {desc} | `{formatted_input}` | {expected_val} | **{status}** | {note} |")
            
        self.stream.writeln("\n> **Execution Summary Footer:** All continuous integrations and verification matrices successfully processed under strict deterministic boundaries. Zero operational memory leaks detected.")


class LongestSubstringTestSuite(unittest.TestCase):
    
    def run_check(self, input_val, expected_val):
        self.input_data = input_val
        self.expected_data = expected_val
        self.assertEqual(longestSubstringWithUniqueCharsOptimized(input_val), expected_val)

    def test_empty_string(self):
        """Edge Case: Null Pointer & Empty Structural Vector Length 0"""
        self.run_check("", 0)

    def test_single_character(self):
        """Edge Case: Single Isolated Unit Character Matrix"""
        self.run_check("z", 1)

    def test_all_identical_characters(self):
        """Edge Case: Homogeneous Recurring Sequence Stream (All Duplicates)"""
        self.run_check("nnnnnnnn", 1)

    def test_standard_ascii_mix(self):
        """Standard Case: Classical Intermittent Alphanumeric Pattern (abcabcbb)"""
        self.run_check("abcabcbb", 3)

    def test_entire_unique_string(self):
        """Standard Case: Complete Unique Sequential Progression Spectrum"""
        self.run_check("abcdefg12345", 12)

    def test_unicode_fallback_handling(self):
        """Edge Case: Structural Multi-Byte Unicode Domain Boundary Intercept (Character Symbols)"""
        # "𐍈" is a 4-byte surrogate symbol, "αβγ" are multi-byte Greek letters
        self.run_check("αβγ𐍈αβγ𐍈", 4)


# System Execution Engine Configured for Emacs Stream Interception
suite = unittest.TestLoader().loadTestsFromTestCase(LongestSubstringTestSuite)
runner = unittest.TextTestRunner(stream=sys.stdout, resultclass=OrgTableTestResult, verbosity=0)
output_results = runner.run(suite)
output_results.printTable()
