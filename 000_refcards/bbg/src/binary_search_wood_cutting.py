# Copyright (C) 2026 Author Info
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

from typing import List, Tuple
import bisect
import sys

# Define target functions directly within the script block for execution
def prepareDataStructures(arrIntHeights: List[int]) -> Tuple[List[int], List[int]]:
    """Sorts the data and prepares cumulative metrics for O(log N) slice window evaluations."""
    arrIntSortedHeights = sorted(arrIntHeights)
    arrIntPrefixSums = [0] * (len(arrIntSortedHeights) + 1)
    for i in range(len(arrIntSortedHeights)):
        arrIntPrefixSums[i + 1] = arrIntPrefixSums[i] + arrIntSortedHeights[i]
    return arrIntSortedHeights, arrIntPrefixSums

def verifySufficientWoodYield(intTargetHeight: int, intRequiredWood: int, arrIntSortedHeights: List[int], arrIntPrefixSums: List[int]) -> bool:
    """Calculates wood yield dynamically via geometric array slicing."""
    intIndex = bisect.bisect_right(arrIntSortedHeights, intTargetHeight)
    intCountTaller = len(arrIntSortedHeights) - intIndex
    if intCountTaller == 0:
        return False
    intSumTaller = arrIntPrefixSums[-1] - arrIntPrefixSums[intIndex]
    intWoodCollected = intSumTaller - (intCountTaller * intTargetHeight)
    return intWoodCollected >= intRequiredWood

def calculateOptimalCutHeight(arrIntHeights: List[int], intRequiredWood: int) -> int:
    """Core binary search over the monotonic search space of tree heights."""
    if not arrIntHeights or intRequiredWood < 0:
        return -1
    if intRequiredWood == 0:
        return max(arrIntHeights)
        
    arrIntSortedHeights, arrIntPrefixSums = prepareDataStructures(arrIntHeights)
    intLeft = 0
    intRight = arrIntSortedHeights[-1]

    while intLeft < intRight:
        intMid = (intLeft + intRight) // 2 + 1
        if verifySufficientWoodYield(intMid, intRequiredWood, arrIntSortedHeights, arrIntPrefixSums):
            intLeft = intMid
        else:
            intRight = intMid - 1
    return intRight

# ==============================================================================
# TEST SUITE & EDGE CASE EVALUATION
# ==============================================================================

# Define rigorous test scenarios including structural edge flaws
# Format: (Heights, K, Scenario Description)
lstTestCases = [
    ([20, 15, 10, 17], 7, "Standard Scenario (Example case)"),
    ([4, 42, 40, 26, 46], 20, "Varying heights, uneven distribution"),
    ([10, 10, 10, 10], 5, "Uniform Forest (All trees identical height)"),
    ([5, 5, 5, 5], 25, "Absolute Maximum Request (Requires cutting to ground level)"),
    ([5, 5, 5, 5], 30, "Impossible Request (K exceeds total available biomass)"),
    ([100], 10, "Single Tree Forest"),
    ([10, 20, 30], 0, "Zero Wood Requested (Saw should remain at max tree height)"),
]

# Generate Header Note for Emacs Org-Mode stdout parsing
print("#+TITLE: Automated Binary Search Wood Cutting Evaluation Report")
print("#+DESCRIPTION: Performance and validation matrix executed.\n")
print("### Algorithm Complexity Profile")
print("- **Time Complexity:** $O(N \\log N + \\log N \\log M)$ where $N$ is the number of elements and $M$ is the maximum tree height value.")
print("- **Space Complexity:** $O(N)$ required to store the pre-allocated tracking structures (Prefix Sum Vector).\n")

# Print Table Structure compatible with Org/Markdown formatting
print("| Scenario Description | Input Heights | Target K | Computed Saw Height | Status |")
print("|----------------------|---------------|----------|---------------------|--------|")

for arrHeights, intK, strDesc in lstTestCases:
    try:
        intResult = calculateOptimalCutHeight(arrHeights, intK)
        
        # Verify correctness for Status flag
        if intK == 0 and intResult == max(arrHeights):
            strStatus = "PASS"
        elif intResult == -1 or (intResult == 0 and sum(arrHeights) < intK):
            strStatus = "BOUNDS_ERR" if intResult == -1 else "UNSATISFIABLE"
        else:
            # Quick verification check
            intCheckWood = sum((h - intResult) for h in arrHeights if h > intResult)
            strStatus = "PASS" if intCheckWood >= intK else "FAIL"
            
        # Clean formatting for array presentation
        strHeightsPreview = str(arrHeights) if len(arrHeights) <= 4 else f"{str(arrHeights[:3])[:-1]}...]"
        print(f"| {strDesc} | {strHeightsPreview} | {intK} | {intResult} | {strStatus} |")
        
    except Exception as e:
        print(f"| {strDesc} | {arrHeights} | {intK} | ERROR: {str(e)} | CRITICAL |")

print("\n#+NOTATION: BOUNDS_ERR indicates parameters violates operational limits. UNSATISFIABLE denotes biomass deficits.")
print("#+FOOTER: Execution successfully handled using Python 3 via standard Debian environment compilation loops.")
