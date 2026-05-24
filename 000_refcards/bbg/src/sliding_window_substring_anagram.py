#!/usr/bin/env python3
"""
Substring Anagram Match Counter & Verification Suite
Copyright (C) 2026

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
"""

import sys
from collections import Counter

def substring_anagrams(s: str, t: str) -> int:
    """
    Counts how many substrings of 's' are permutations/anagrams of 't'.
    
    Time Complexity:  O(N) where N is len(s). Each character is touched twice.
    Space Complexity: O(K) where K is the number of unique characters in 't'.
    """
    len_s, len_t = len(s), len(t)
    if len_t > len_s or len_t == 0:
        return 0

    anagram_count = 0
    target_counts = Counter(t)
    window_counts = {}
    
    matches = 0
    unique_targets = len(target_counts)
    
    left = 0
    for right in range(len_s):
        char_in = s[right]
        
        # Ingest character at right edge of window
        if char_in in target_counts:
            window_counts[char_in] = window_counts.get(char_in, 0) + 1
            if window_counts[char_in] == target_counts[char_in]:
                matches += 1
            elif window_counts[char_in] == target_counts[char_in] + 1:
                matches -= 1

        # Evaluate window when it reaches target footprint length
        if right - left + 1 == len_t:
            if matches == unique_targets:
                anagram_count += 1
                
            char_out = s[left]
            if char_out in target_counts:
                if window_counts[char_out] == target_counts[char_out]:
                    matches -= 1
                window_counts[char_out] -= 1
                if window_counts[char_out] == target_counts[char_out]:
                    matches += 1
                    
            left += 1

    return anagram_count


# =====================================================================
# Test Execution and Tabular Formatting Engine
# =====================================================================

test_cases = [
    # (String S, Target T, Expected Output, Description)
    ("cbaebabacd", "abc", 2, "Standard case (anagrams at start and middle)"),
    ("abab", "ab", 3, "Overlapping substrings sliding match"),
    ("af", "be", 0, "Same length, completely mismatched alphabet"),
    ("abc", "abcd", 0, "Edge: Target string length is larger than search space"),
    ("", "a", 0, "Edge: Search space string is entirely empty"),
    ("abcde", "", 0, "Edge: Target matching string is entirely empty"),
    ("AnAgRaM", "nag", 0, "Edge: Case sensitivity verification check"),
    ("sub-string-test!", "tri-", 1, "Edge: Special characters, dashes, and symbols"),
    ("a" * 1000, "a" * 10, 991, "Stress Test: Monotonous deep repetition bounds")
]

# Header Note
print("================================================================================")
print("SUBSTRING ANAGRAM ENGINE AGNOSTIC TESTING ENVIRONMENT")
print("================================================================================")
print("Theoretical Performance Matrix:")
print("  - Time Complexity:  O(N) Linear Scan Pass")
print("  - Space Complexity: O(K) Auxiliary Hash Boundaries")
print("================================================================================")
print("")

# Print Table Header
print(f"{'ID':<3} | {'Input S':<20} | {'Target T':<10} | {'Expected':<8} | {'Actual':<6} | {'Status':<5} | {'Test Scenario Notes'}")
print("-" * 110)

# Run Cases
for idx, (s_input, t_input, expected, desc) in enumerate(test_cases, start=1):
    # Truncate long display fields for clean table formatting
    disp_s = s_input if len(s_input) <= 20 else f"{s_input[:17]}..."
    disp_t = t_input if len(t_input) <= 10 else f"{t_input[:7]}..."
    
    try:
        actual_result = substring_anagrams(s_input, t_input)
        status = "PASS" if actual_result == expected else "FAIL"
    except Exception as err:
        actual_result = "ERROR"
        status = f"FAIL ({type(err).__name__})"
        
    print(f"{idx:<3} | {disp_s:<20} | {disp_t:<10} | {expected:<8} | {actual_result:<6} | {status:<5} | {desc}")

print("-" * 110)
# Footer Note
print("Execution Note: Evaluation successfully handled")
print("All ASCII index assumptions have been discarded in favor of universal map boundaries.")
print("================================================================================")
