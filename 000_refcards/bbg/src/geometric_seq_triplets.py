"""
Title: Geometric Sequence Triplet Counter
License: GNU GPL v3
Author: Gemini Polymath
Description: Analyzes lists for geometric progressions of length 3.
"""

from typing import List, Dict
from collections import defaultdict

def count_geometric_triplets(nums: List[int], r: int) -> int:
    """
    Calculates triplets (i, j, k) where nums[i]*r == nums[j] and nums[j]*r == nums[k].
    
    Variables:
    - n: Number of elements in 'nums'
    - left_map: Frequency of values to the left of the current 'center'
    - right_map: Frequency of values to the right of the current 'center'
    """
    if len(nums) < 3:
        return 0
        
    left_map = defaultdict(int)
    right_map = defaultdict(int)
    total_count = 0
    left_total = 0

    # Step 1: Initialize the 'future' state
    for x in nums:
        right_map[x] += 1

    # Step 2: Iterate through each element as a potential 'center' of a triplet
    for x in nums:
        # Remove current from future
        right_map[x] -= 1
        
        # Check if x can be the middle term (ar)
        if r == 0:
            if x == 0:
                # Any preceding number 'a' * 0 = 0 (middle), and 0 * 0 = 0 (next)
                total_count += left_total * right_map[0]
        elif x % r == 0:
            prev_term = x // r
            next_term = x * r
            total_count += left_map[prev_term] * right_map[next_term]
            
        # Add current to past for the next iteration
        left_map[x] += 1
        left_total += 1
        
    return total_count

# --- Test Suite and Org-Mode Table Generation ---

test_cases = [
    {"nums": [1, 3, 9, 9, 27, 81], "r": 3, "desc": "Standard progression"},
    {"nums": [1, 2, 1, 2, 4], "r": 2, "desc": "Duplicate elements"},
    {"nums": [1, 1, 1, 1], "r": 1, "desc": "Ratio of 1 (Identical)"},
    {"nums": [1, 5, 25], "r": 5, "desc": "Minimum triplet"},
    {"nums": [1, 2], "r": 2, "desc": "Insufficient length"},
    {"nums": [10, 5, 2, 1], "r": 2, "desc": "Descending (No triplets)"},
    {"nums": [1, 0, 0, 0], "r": 0, "desc": "Zero ratio case"},
    {"nums": [-1, 2, -4, 8], "r": -2, "desc": "Negative ratio and terms"},
    {"nums": [0, 0, 0], "r": 0, "desc": "All zeros, zero ratio"},
    {"nums": [0, 0, 0, 0], "r": 1, "desc": "All zeros, ratio 1"},
    {"nums": [], "r": 1, "desc": "Empty list"}
]

# Header Note
print("### Execution Results: Geometric Triplet Analysis")
print("#### Complexity Profile:")
print("- **Time Complexity**: $O(n)$ - Two linear passes over the input.")
print("- **Space Complexity**: $O(u)$ - Where $u$ is the number of unique elements stored in hash maps.\n")

# Table Header
print("| Test Case Description | Input List | Ratio (r) | Expected | Result | Status |")
print("|-----------------------+------------+-----------+----------+--------+--------|")

for test in test_cases:
    # Manual expectation calculation for table clarity
    if test["desc"] == "Standard progression": exp = 6
    elif test["desc"] == "Duplicate elements": exp = 3
    elif test["desc"] == "Ratio of 1 (Identical)": exp = 4
    elif test["desc"] == "Minimum triplet": exp = 1
    elif test["desc"] == "Insufficient length": exp = 0
    elif test["desc"] == "Zero ratio case": exp = 4
    elif test["desc"] == "Negative ratio and terms": exp = 2
    elif test["desc"] == "All zeros, zero ratio": exp = 1
    elif test["desc"] == "All zeros, ratio 1": exp = 4
    else: exp = 0
    
    res = count_geometric_triplets(test["nums"], test["r"])
    status = "PASS" if res == exp else "FAIL"
    
    print(f"| {test['desc']} | {test['nums']} | {test['r']} | {exp} | {res} | {status} |")

print("\n**Footer Note**: Results validated against the Single Responsibility Principle. "
      "All calculations assume integer-based geometric progressions.")
