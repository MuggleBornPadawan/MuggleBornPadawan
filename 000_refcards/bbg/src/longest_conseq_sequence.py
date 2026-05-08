"""
Title: Longest Consecutive Sequence Analyzer
Author: Gemini
License: GNU GPL v3
"""

from typing import List
import time

def longest_chain_of_consecutive_numbers(nums: List[int]) -> int:
    """
    Finds the length of the longest consecutive elements sequence.
    
    Complexity Analysis:
    - Time Complexity: O(n). Although there is a nested while loop, 
      the 'if num - 1' check ensures each element is only processed 
      as part of a 'while' loop once.
    - Space Complexity: O(n). We store the input in a set to achieve 
      constant-time lookups.
    """
    if not nums:
        return 0
    
    num_set = set(nums)
    longest_chain = 0
    
    for num in num_set:
        # Only start counting if 'num' is the beginning of a sequence
        if (num - 1) not in num_set:
            current_num = num
            current_chain = 1
            
            while (current_num + 1) in num_set:
                current_num += 1
                current_chain += 1
            
            longest_chain = max(longest_chain, current_chain)
            
    return longest_chain

# --- Execution and Results Formatting ---

# Comprehensive Test Cases
# 1. Standard: Random order
# 2. Edge: Empty list
# 3. Edge: Single element
# 4. Logic: No consecutive numbers
# 5. Logic: Duplicates present (set handling)
# 6. Logic: Negative number chains
# 7. Performance: Already sorted
test_suite = [
    ("Standard Unsorted", [100, 4, 200, 1, 3, 2], 4),
    ("Empty Input", [], 0),
    ("Single Value", [42], 1),
    ("Sparse Values", [1, 10, 100, 1000], 1),
    ("Duplicate Handling", [1, 2, 0, 1, 2], 3),
    ("Negative Integers", [-3, -2, -1, 1, 0, 5], 5),
    ("Sequential Input", [1, 2, 3, 4, 5], 5)
]

# Header Note for Org-Mode
print("# Longest Consecutive Sequence Test Results")
print("# Generated on: " + time.strftime("%Y-%m-%d %H:%M:%S"))
print("\n| Test Case Name | Input Data | Expected | Actual | Status |")
print("|:---|:---|:---:|:---:|:---:|")

for name, data, expected in test_suite:
    actual = longest_chain_of_consecutive_numbers(data)
    status = "✅ PASS" if actual == expected else "❌ FAIL"
    # Format list as string for table visibility
    data_str = str(data)[:20] + "..." if len(str(data)) > 20 else str(data)
    print(f"| {name} | {data_str} | {expected} | {actual} | {status} |")

# Complexity and Footer info
print("\n**Computational Profile:**")
print("- **Time Complexity:** O(n) average case. We iterate once to build the set, and the inner loop only executes for the 'head' of each sequence.")
print("- **Space Complexity:** O(n). The primary overhead is the hash set storage.")
print("\n# End of Report: All logic validated via linear-time set-theory approach.")
