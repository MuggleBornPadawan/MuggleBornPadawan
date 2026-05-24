# Copyright (c) 2026: GPL-3.0-or-later
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

from typing import List

def findTheTargetInARotatedSortedArray(nums: List[int], target: int) -> int:
    """
    Finds the index of a target value within a rotated sorted array.
    
    Time Complexity:  O(log n) - Halves the search space at each iteration.
    Space Complexity: O(1)     - Modifies pointers in place with zero allocation overhead.
    """
    # Defensive check for empty collection
    if not nums:
        return -1

    leftBoundary = 0
    rightBoundary = len(nums) - 1

    # Inclusive traversal ensures the final single element is verified as a mid point
    while leftBoundary <= rightBoundary:
        midPoint = (leftBoundary + rightBoundary) // 2

        if nums[midPoint] == target:
            return midPoint

        # Check if the left segment [leftBoundary : midPoint] is monotonically increasing
        if nums[leftBoundary] <= nums[midPoint]:
            if nums[leftBoundary] <= target < nums[midPoint]:
                rightBoundary = midPoint - 1  # Target is bounded inside the left sorted range
            else:
                leftBoundary = midPoint + 1   # Target is outside; search the right range
        # Otherwise, the right segment [midPoint : rightBoundary] must be sorted
        else:
            if nums[midPoint] < target <= nums[rightBoundary]:
                leftBoundary = midPoint + 1   # Target is bounded inside the right sorted range
            else:
                rightBoundary = midPoint - 1  # Target is outside; search the left range

    return -1


# ==============================================================================
# TEST SUITE & EXECUTION LAYER
# ==============================================================================

# Defining diverse test conditions including standard operations and extreme edge cases
testCases = [
    {"nums": [4, 5, 6, 7, 0, 1, 2], "target": 0, "desc": "Standard Rotated Array (Target Present)"},
    {"nums": [4, 5, 6, 7, 0, 1, 2], "target": 3, "desc": "Standard Rotated Array (Target Missing)"},
    {"nums": [1], "target": 1, "desc": "Single Element Array (Target Present)"},
    {"nums": [1], "target": 0, "desc": "Single Element Array (Target Missing)"},
    {"nums": [3, 1], "target": 1, "desc": "Two Elements Rotated (Target Present Right)"},
    {"nums": [3, 1], "target": 3, "desc": "Two Elements Rotated (Target Present Left)"},
    {"nums": [1, 3], "target": 3, "desc": "Two Elements Sorted (Target Present Right)"},
    {"nums": [], "target": 5, "desc": "Empty Array Edge Case"},
    {"nums": [11, 13, 15, 17], "target": 15, "desc": "Fully Sorted Array (No Rotation)"}
]

# Render execution headers
print("#+TITLE: Rotated Sorted Array Search Verification Report")
print("#+NOTE: The following execution grid maps out standard arrays alongside structural edge-cases.")
print("\n| ID | Array Condition | Target | Expected | Result | Status | Complexity Profile | Description |")
print("|----+-----------------+--------+----------+--------+--------+--------------------+-------------|")

for index, case in enumerate(testCases, 1):
    arrayInput = case["nums"]
    targetValue = case["target"]
    description = case["desc"]
    
    # Generate the expected baseline via python built-in index parsing
    try:
        expectedIndex = arrayInput.index(targetValue)
    except ValueError:
        expectedIndex = -1
        
    # Execute our custom algorithm
    actualIndex = findTheTargetInARotatedSortedArray(arrayInput, targetValue)
    status = "PASS" if actualIndex == expectedIndex else "FAIL"
    
    # Truncate array visualization for long lists to keep table neat
    arrayStr = str(arrayInput) if len(str(arrayInput)) <= 15 else f"{str(arrayInput[:3])[:-1]}...{str(arrayInput[-1:])}"
    
    print(f"| {index:02d} | {arrayStr:<15} | {targetValue:<6} | {expectedIndex:<8} | {actualIndex:<6} | {status:<6} | Time: O(log n), Space: O(1) | {description} |")

print("\n#+FOOTER: Verification audit complete. All edge test configurations run under strict verification invariants.")
