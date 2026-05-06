# triplet_sum_logic.py
# License: GNU GPL v3
# This script is optimized for direct execution in Emacs Org-mode.

from typing import List

def triplet_sum(nums: List[int]) -> List[List[int]]:
    """
    Finds unique triplets that sum to zero. 
    Complexity: O(n^2) time | O(1) additional space (excluding output).
    """
    triplets: List[List[int]] = []
    # 1. Sort the list (The foundational 'Pivot' for the Two-Pointer strategy)
    nums.sort() 
    n = len(nums)

    for i in range(n):
        # Optimization: If anchor is positive, no triplet can sum to 0
        if nums[i] > 0:
            break
        
        # Skip duplicate anchor values
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, n - 1
        target = -nums[i]

        while left < right:
            current_sum = nums[left] + nums[right]
            
            if current_sum == target:
                triplets.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                # Skip duplicate 'b' values
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                # Skip duplicate 'c' values
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1
                
    return triplets

# --- Execution & Edge Case Testing ---

test_cases = {
    "Standard Case": [-1, 0, 1, 2, -1, -4],
    "Empty List": [],
    "Small List": [0],
    "All Zeros": [0, 0, 0, 0],
    "No Triplets": [1, 2, 3, 4],
    "Two Triplets": [-2, 0, 0, 2, 2],
}

print(f"{'Test Case':<20} | {'Input':<25} | {'Result'}")
print("-" * 70)

for name, data in test_cases.items():
    result = triplet_sum(data)
    print(f"{name:<20} | {str(data):<25} | {result}")
