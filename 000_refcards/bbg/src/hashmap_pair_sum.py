"""
File: pair_sum_test.py
License: GNU GPL v3
Description: Optimized O(n) Pair Sum finder with Org-mode table reporting.
"""

from typing import List

def findPairSum(nums: List[int], target: int) -> List[int]:
    """
    Finds the indices of two numbers that add up to a specific target.
    Logic: Uses a complement map to find the pair in a single pass.
    """
    if not isinstance(nums, list):
        return []

    complementMap = {}

    for currentIndex, currentVal in enumerate(nums):
        requiredVal = target - currentVal
        
        if requiredVal in complementMap:
            # Match found: return the index of the complement and current index
            return [complementMap[requiredVal], currentIndex]
        
        # Store current value and its index
        complementMap[currentVal] = currentIndex
        
    return []

# --- Test Suite and Reporting ---

test_cases = [
    {"name": "Standard Case", "nums": [2, 7, 11, 15], "target": 9, "expected": [0, 1]},
    {"name": "Unsorted Case", "nums": [3, 2, 4], "target": 6, "expected": [1, 2]},
    {"name": "Identical Values", "nums": [3, 3], "target": 6, "expected": [0, 1]},
    {"name": "Negative Numbers", "nums": [-1, -2, -3, -4, -5], "target": -8, "expected": [2, 4]},
    {"name": "No Solution", "nums": [1, 2, 3], "target": 7, "expected": []},
    {"name": "Empty List", "nums": [], "target": 0, "expected": []},
    {"name": "Large Target", "nums": [100, 200, 300], "target": 500, "expected": [1, 2]},
]

# Header Note & Complexity Info
print("ALGORITHM EXECUTION REPORT: PAIR SUM (HASH MAP)")
print("=" * 74)
print(f"{'Performance Metric':<20} | {'Complexity':<15} | {'Description'}")
print("-" * 74)
print(f"{'Time Complexity':<20} | {'O(n)':<15} | Single pass through the list.")
print(f"{'Space Complexity':<20} | {'O(n)':<15} | Storage for the complement hash map.")
print("=" * 74)
print()

# Table Header (Org-mode compatible style)
header = f"| {'Test Case':<20} | {'Input':<20} | {'Target':<8} | {'Result':<10} | {'Status':<7} |"
sep    = f"|{'-'*22}|{'-'*22}|{'-'*10}|{'-'*12}|{'-'*9}|"
print(header)
print(sep)

# Execute and Populate Table
for test in test_cases:
    actual = findPairSum(test["nums"], test["target"])
    status = "PASS" if actual == test["expected"] else "FAIL"
    
    # Truncate input string if too long for table layout
    input_str = str(test["nums"])
    if len(input_str) > 17:
        input_str = input_str[:14] + "..."
        
    print(f"| {test['name']:<20} | {input_str:<20} | {test['target']:<8} | {str(actual):<10} | {status:<7} |")

# Footer Note
print("-" * 74)
print("NOTES:")
print("- The hash map (complementMap) allows for O(1) average-time lookups.")
print("- This implementation returns the first valid pair of indices encountered.")
print("- Empty results are returned for invalid inputs or if no pair is found.")
print("=" * 74)
