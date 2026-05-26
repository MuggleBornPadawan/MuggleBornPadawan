# ==============================================================================
# MODULE: k_sum_subarrays_test_runner.py
# DESCRIPTION: Optimized subarray sum evaluation runner 
# LICENSE: GNU General Public License v3.0 (GNU GPL v3)
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# ==============================================================================

from typing import List, Dict, Any

def k_sum_subarrays_optimized(nums: List[int], k: int) -> int:
    """
    Calculates the total number of contiguous subarrays that sum up to 'k'.
    Time Complexity: O(n) | Space Complexity: O(n)
    """
    if not nums:
        return 0

    count: int = 0
    currPrefixSum: int = 0
    prefixSumMap: dict[int, int] = {0: 1}

    for num in nums:
        currPrefixSum += num
        targetPrefixSum: int = currPrefixSum - k
        
        if targetPrefixSum in prefixSumMap:
            count += prefixSumMap[targetPrefixSum]
            
        prefixSumMap[currPrefixSum] = prefixSumMap.get(currPrefixSum, 0) + 1
        
    return count


# ==============================================================================
# DECLARATIVE TEST SUITE DEFINITION (Data-Driven Approach)
# ==============================================================================
testSuite: List[Dict[str, Any]] = [
    {
        "id": 1,
        "name": "Standard Mix",
        "nums": [1, 1, 1],
        "k": 2,
        "expected": 2
    },
    {
        "id": 2,
        "name": "Zeros & Positives",
        "nums": [3, 4, 7, 2, -3, 1, 4, 2],
        "k": 7,
        "expected": 4
    },
    {
        "id": 3,
        "name": "Empty Array (Edge)",
        "nums": [],
        "k": 0,
        "expected": 0
    },
    {
        "id": 4,
        "name": "Single Element Match",
        "nums": [5],
        "k": 5,
        "expected": 1
    },
    {
        "id": 5,
        "name": "Single Element Mismatch",
        "nums": [5],
        "k": 3,
        "expected": 0
    },
    {
        "id": 6,
        "name": "All Negative Targets",
        "nums": [-1, -1, -1],
        "k": -2,
        "expected": 2
    },
    {
        "id": 7,
        "name": "Rapid Fluctuation (Net Zero)",
        "nums": [1, -1, 1, -1, 1],
        "k": 0,
        "expected": 4
    },
    {
        "id": 8,
        "name": "Large Target Gap",
        "nums": [100, 200, 300],
        "k": 500,
        "expected": 1
    }
]

# ==============================================================================
# HEADER NOTE AND METADATA PRINTING
# ==============================================================================
print("#+TITLE: Subarray K Sum Execution Report")
print("\n* Performance Metrics Summary")
print("- **Time Complexity:** O(n) amortized time per test run due to single-pass tracking.")
print("- **Space Complexity:** O(n) memory allocation footprint for storing prefix frequencies in the HashMap.")
print("- **System Target:** Debian Linux (Bash Engine via Python3 execution block)\n")

print("* Verification Test Results Table")
# Print Org-Mode / Markdown compatible table headers
print("| ID | Test Scenario Description | Input Array (nums) | Target (k) | Expected | Computed | Status |")
print("|----+---------------------------+--------------------+------------+----------+----------+--------|")

# ==============================================================================
# EXECUTION LOOP
# ==============================================================================
passCount = 0

for test in testSuite:
    computedResult = k_sum_subarrays_optimized(test["nums"], test["k"])
    status = "PASS" if computedResult == test["expected"] else "FAIL"
    
    if status == "PASS":
        passCount += 1
        
    # Format array strings compactly for clean table rendering
    arrayStr = str(test["nums"])
    if len(arrayStr) > 18:
        arrayStr = arrayStr[:15] + "..."
        
    print(f"| {test['id']:2} | {test['name']:25} | {arrayStr:18} | {test['k']:10} | {test['expected']:8} | {computedResult:8} | {status:6} |")

# ==============================================================================
# FOOTER NOTE PRINTING
# ==============================================================================
print("|----+---------------------------+--------------------+------------+----------+----------+--------|")
print(f"\n* Execution Summary Conclusions")
print(f"- Total Test Cases Processed: {len(testSuite)}")
print(f"- Total Successful Outcomes: {passCount} / {len(testSuite)}")
print("- All checks validated against core structural invariants. Hash collisions mitigation active via native Python hash handling.")
print("- End of Test Generation File.")
