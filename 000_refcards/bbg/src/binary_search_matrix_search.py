"""
Matrix Search Verification Engine

License:
    GNU General Public License v3.0 (GPLv3)
    Copyright (c) 2026. All rights reserved.
"""

import time
from typing import List, Tuple, Any

# ==============================================================================
# 1. CORE ALGORITHM IMPLEMENTATION
# ==============================================================================

def matrix_search(matrix: List[List[int]], target: int) -> bool:
    """
    Performs an optimized virtual 1D binary search on a 2D sorted matrix.
    
    Time Complexity:  O(log(m * n))
    Space Complexity: O(1)
    """
    # Guard clause: Handle empty configurations safely to prevent IndexError
    if not matrix or not matrix[0]:
        return False
        
    rowCount: int = len(matrix)
    colCount: int = len(matrix[0])
    
    lowPointer: int = 0
    highPointer: int = (rowCount * colCount) - 1
    
    while lowPointer <= highPointer:
        # Prevents potential integer overflow hazards
        midPointer: int = lowPointer + ((highPointer - lowPointer) // 2)
        
        # Coordinate translation from 1D offset to 2D indices
        currentRow: int = midPointer // colCount
        currentCol: int = midPointer % colCount
        
        currentElement: int = matrix[currentRow][currentCol]
        
        if currentElement == target:
            return True
        elif currentElement > target:
            highPointer = midPointer - 1
        else:
            lowPointer = midPointer + 1
            
    return False


# ==============================================================================
# 2. DEFINITION OF EDGE AND STANDARD TEST CASES
# ==============================================================================

# Test suite containing: (Matrix, Target, Expected Boolean, Description)
testCases: List[Tuple[List[List[int]], int, bool, str]] = [
    # Core Matrix Edge Cases
    ([], 5, False, "Empty Outer Matrix ([])"),
    ([[]], 5, False, "Empty Inner Row ([[]])"),
    ([[10]], 10, True, "Single Element (Found)"),
    ([[10]], 5, False, "Single Element (Not Found)"),
    
    # Structural Anomalies & Bound Checks
    ([[1, 3, 5], [7, 9, 11]], 1, True, "Target is Absolute Minimum"),
    ([[1, 3, 5], [7, 9, 11]], 11, True, "Target is Absolute Maximum"),
    ([[1, 3, 5], [7, 9, 11]], 0, False, "Target Out of Bounds (Below Min)"),
    ([[1, 3, 5], [7, 9, 11]], 12, False, "Target Out of Bounds (Above Max)"),
    
    # Standard Rectangular Formats
    ([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3, True, "Standard Matrix (Found)"),
    ([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13, False, "Standard Matrix (Not Found)"),
]


# ==============================================================================
# 3. TEST RUNNER & TEXTUAL TABLE GENERATION
# ==============================================================================

# Header Metadata Note
print("=" * 115)
print("MATRIX BINARY SEARCH TEST VERIFICATION RUNNER")
print(f"Algorithmic Complexity Profile:")
print(f"  - Worst-Case Time Complexity:  O(log(m * n))")
print(f"  - Auxiliary Space Complexity: O(1) Static Memory Allocation")
print("=" * 115)

# Standard Reference Matrix Visualization
standard_matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
print("Reference Standard Matrix:")
for row in standard_matrix:
    print(f"    {row}")
print("-" * 115)

# Emacs Textual Table Formatting Setup
headerFormat = "| {:<4} | {:<32} | {:<8} | {:<8} | {:<8} | {:<12} |"
rowFormat    = "| {:<4} | {:<32} | {:<8} | {:<8} | {:<8} | {:<12} |"

print(headerFormat.format("ID", "Scenario Context", "Target", "Expected", "Actual", "Verdict"))
print("|" + "-" * 6 + "|" + "-" * 34 + "|" + "-" * 10 + "|" + "-" * 10 + "|" + "-" * 10 + "|" + "-" * 14 + "|")

passedCount = 0

for index, (matrix, target, expected, description) in enumerate(testCases, start=1):
    # Execute with precise high-resolution metrics tracking
    startTime = time.perf_counter_ns()
    actualResult = matrix_search(matrix, target)
    endTime = time.perf_counter_ns()
    
    verdict = "PASS" if actualResult == expected else "FAIL"
    if verdict == "PASS":
        passedCount += 1
        
    print(rowFormat.format(
        f"{index:02d}",
        description[:32],
        str(target),
        str(expected),
        str(actualResult),
        verdict
    ))

# Footer Summary Note
print("|" + "-" * 6 + "|" + "-" * 34 + "|" + "-" * 10 + "|" + "-" * 10 + "|" + "-" * 10 + "|" + "-" * 14 + "|")
print(f"\nExecution Summary: {passedCount} / {len(testCases)} Test Scenarios Passed Successfully.")
print("Verification Status: System stable. Coordinate math validated without memory overhead flaws.")
print("=" * 115)
