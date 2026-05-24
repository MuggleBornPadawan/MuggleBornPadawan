# License: GNU GPL v3
# Context: Binary Search Lower-Bound Verification Engine

from typing import List

def find_the_insertion_index(nums: List[int], target: int) -> int:
    """
    Finds the lower-bound insertion index for a target in a sorted list.
    Maintains O(log n) time complexity and O(1) space complexity.
    """
    left: int = 0
    right: int = len(nums)
    
    while left < right:
        # Rich Hickey style: Defensive, explicit mid calculation to prevent 
        # integer overflow vulnerabilities in fixed-width execution environments.
        mid: int = left + ((right - left) // 2)
        
        # Partition function: Split search space based on monotonic property
        if nums[mid] >= target:
            right = mid       # Squeeze window left to find the first occurrence
        else:
            left = mid + 1    # Move window right past smaller values
            
    return left

# ==============================================================================
# TEST RUNNER ENGINE (Configured for Emacs Org-Mode Table Generation)
# ==============================================================================

# Explicitly defining diverse structural edge cases
test_cases = [
    {"name": "Empty List Bounds", "nums": [], "target": 5, "expected": 0},
    {"name": "Target Smaller Than All", "nums": [10, 20, 30], "target": 5, "expected": 0},
    {"name": "Target Larger Than All", "nums": [10, 20, 30], "target": 40, "expected": 3},
    {"name": "Single Element (Match)", "nums": [10], "target": 10, "expected": 0},
    {"name": "Single Element (Insert Left)", "nums": [10], "target": 5, "expected": 0},
    {"name": "Single Element (Insert Right)", "nums": [10], "target": 15, "expected": 1},
    {"name": "Consecutive Duplicates", "nums": [2, 5, 5, 5, 8], "target": 5, "expected": 1},
    {"name": "All Elements Identical", "nums": [7, 7, 7, 7], "target": 7, "expected": 0},
    {"name": "Standard Interior Insertion", "nums": [1, 3, 5, 7], "target": 4, "expected": 2},
]

# Print Table Header Notes
print("#+TITLE: Binary Search Lower Bound Insertion Index Analysis")
print("#+DESCRIPTION: Automated verification metrics for state-partitioning binary search.")
print("\n** Algorithmic Complexity Metrics")
print("- **Time Complexity:** $\\mathcal{O}(\\log n)$ - Deterministically halves search space each iteration.")
print("- **Space Complexity:** $\\mathcal{O}(1)$ - Operates entirely in-place with static pointer allocations.")
print("\n** Verification Matrix")

# Print Org-Mode Table Headers
header = "| Test Scenario | Input Array | Target | Result Index | Expected | Status |"
separator = "|:---|:---|:---|:---|:---|:---|"
print(header)
print(separator)

# Execute cases and format table rows
for case in test_cases:
    res_index = find_the_insertion_index(case["nums"], case["target"])
    status = "PASS" if res_index == case["expected"] else "FAIL"
    
    # Format each cell cleanly for the markdown/org layout
    print(f"| {case['name']:<28} "
          f"| {str(case['nums']):<15} "
          f"| {case['target']:<6} "
          f"| {res_index:<12} "
          f"| {case['expected']:<8} "
          f"| {status:<6} |")

print("\n#+NOTE: All pointer operations safely converged without generating out-of-bounds exceptions.")
