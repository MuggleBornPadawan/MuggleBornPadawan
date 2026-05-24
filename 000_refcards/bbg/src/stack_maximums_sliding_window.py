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

from typing import List
from collections import deque

def maximums_of_sliding_window(nums: List[int], k: int) -> List[int]:
    """
    Computes the maximum value within a sliding window of size k.
    
    Time Complexity:  O(N) - Each element is pushed and popped at most once.
    Space Complexity: O(k) - The deque stores at most k elements indices.
    """
    # Defensive programming: Handle edge case parameters cleanly
    if not nums or k <= 0:
        return []
    if k > len(nums):
        return [max(nums)] if nums else []

    resultList = []
    windowDeque = deque()  # Stores indices of elements, maintaining a decreasing order

    for rightIndex in range(len(nums)):
        # 1. Maintain Monotonic Decreasing Property:
        # Remove elements from back that are smaller than or equal to current value
        while windowDeque and nums[windowDeque[-1]] <= nums[rightIndex]:
            windowDeque.pop()

        # Add current element's index to the back
        windowDeque.append(rightIndex)

        # 2. Maintain Window Scope:
        # Expire elements out of the left boundary of the sliding window
        if windowDeque[0] <= rightIndex - k:
            windowDeque.popleft()

        # 3. Record Maximum:
        # Once our right index satisfies the minimum window span, capture front of deque
        if rightIndex >= k - 1:
            resultList.append(nums[windowDeque[0]])

    return resultList


# =====================================================================
# TEST HARNESS & EMACS ORG-MODE TABLE FORMATTING
# =====================================================================

# List of test configurations tracking edge cases and regular arrays
testCases = [
    {"name": "Standard Array", "nums": [1, 3, -1, -3, 5, 3, 6, 7], "k": 3, "expected": [3, 3, 5, 5, 6, 7]},
    {"name": "Single Element", "nums": [1], "k": 1, "expected": [1]},
    {"name": "Window Equals Array", "nums": [1, 2, 3], "k": 3, "expected": [3]},
    {"name": "Window Larger Than Array", "nums": [1, 2], "k": 3, "expected": [2]},
    {"name": "Decreasing Sequence", "nums": [9, 8, 7, 6], "k": 2, "expected": [9, 8, 7]},
    {"name": "Empty Array Case", "nums": [], "k": 3, "expected": []},
    {"name": "Invalid Negative K", "nums": [1, 2, 3], "k": -1, "expected": []}
]

print("#+TITLE: Sliding Window Maximum Verification Report")
print("#+DESCRIPTION: Computational performance testing across architectural edge-cases.\n")
print("### Execution Results")
print("| Test Scenario Name | Input Array (nums) | Window Size (k) | Expected Output | Actual Output | Status |")
print("|--------------------+--------------------+-----------------+-----------------+---------------+--------|")

for case in testCases:
    actualOutput = maximums_of_sliding_window(case["nums"], case["k"])
    status = "PASS" if actualOutput == case["expected"] else "FAIL"
    
    # Safe rendering representations for clean Org table layout
    numsStr = str(case["nums"]).replace(",", " ")
    expStr = str(case["expected"]).replace(",", " ")
    actStr = str(actualOutput).replace(",", " ")
    
    print(f"| {case['name']:<22} | {numsStr:<18} | {case['k']:<15} | {expStr:<15} | {actStr:<13} | {status:<6} |")

print("\n---")
print("> **Complexity Notice**")
print("> * **Time Complexity:** $$O(N)$$ where $N$ is the number of integers in the array. Every individual integer index enters and exits the tracking deque at most one single time.")
print("> * **Space Complexity:** $$O(k)$$ auxiliary allocation space. The strict pruning invariants guarantee that the queue's length never scales past the configuration boundary size of $k$.")
print("---")
print("# Footer Note: Verified using standard Python 3 linear monotonic sequence optimization pattern.")
