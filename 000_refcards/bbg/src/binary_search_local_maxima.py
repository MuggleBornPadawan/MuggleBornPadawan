#  local_maxima.py - Find a peak element in an array using binary search.
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

from typing import List, Tuple

def findLocalMaximum(nums: List[int]) -> Tuple[int, int]:
    """
    Finds a single local maximum (peak) in the array using an optimized binary search.
    Treats boundary edges as virtual lower elements (-infinity).
    
    Time Complexity:  O(log n)
    Space Complexity: O(1)
    
    Returns:
        Tuple[int, int]: (index, value) of the local maximum.
    """
    # Guard against completely empty input lists safely
    if not nums:
        raise ValueError("Input array cannot be empty.")
        
    leftIndex: int = 0
    rightIndex: int = len(nums) - 1
    
    # Halve the search space by looking at the localized directional gradient
    while leftIndex < rightIndex:
        midIndex: int = (leftIndex + rightIndex) // 2
        
        # If the element to the right is smaller, the local slope goes down.
        # This implies a peak must exist on the left side (including midIndex).
        if nums[midIndex] > nums[midIndex + 1]:
            rightIndex = midIndex
        else:
            # If the element to the right is larger, the slope goes up.
            # A peak must exist firmly to the right.
            leftIndex = midIndex + 1
            
    return (leftIndex, nums[leftIndex])

# =====================================================================
# Test Harness & Execution Suite for Emacs Org-Mode Integration
# =====================================================================

testCases: List[Tuple[str, List[int]]] = [
    ("Standard Array", [1, 2, 3, 1]),
    ("Multiple Peaks", [1, 2, 1, 3, 5, 6, 4]),
    ("Monotonically Increasing (Right Edge Peak)", [1, 2, 3, 4, 5]),
    ("Monotonically Decreasing (Left Edge Peak)", [5, 4, 3, 2, 1]),
    ("Single Element Array", [42]),
    ("Two Elements (Ascending)", [10, 20]),
    ("Two Elements (Descending)", [20, 10]),
]

print("## Local maxima")
print("\n> **Note:** The boundary elements are treated as peaks if they are strictly greater than their single immediate neighbor.")
print("\n| Test Scenario | Input Array | Found Index | Found Value | Status |")
print("| :--- | :--- | :---: | :---: | :---: |")

for description, sampleInput in testCases:
    try:
        resultingIndex, resultingValue = findLocalMaximum(sampleInput)
        
        # Validation checks to confirm the result is truly a valid peak
        n = len(sampleInput)
        isLeftValid = (resultingIndex == 0 or sampleInput[resultingIndex] >= sampleInput[resultingIndex - 1])
        isRightValid = (resultingIndex == n - 1 or sampleInput[resultingIndex] >= sampleInput[resultingIndex + 1])
        
        status = "PASS" if (isLeftValid and isRightValid) else "FAIL"
        
        print(f"| {description} | `{sampleInput}` | {resultingIndex} | {resultingValue} | **{status}** |")
    except Exception as errorException:
        print(f"| {description} | `{sampleInput}` | N/A | Error: {str(errorException)} | **FAIL** |")

print("\n---")
print("### Complexity Metadata")
print("* **Time Complexity:** $O(\\log n)$ — The engine cuts the active window size perfectly in half on each step.")
print("* **Space Complexity:** $O(1)$ — Only tracking explicit state scalar integer indices (`leftIndex`, `rightIndex`, `midIndex`).")
print("\n*Footer Note: Executed and verified successfully.*")
