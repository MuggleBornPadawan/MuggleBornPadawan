from typing import List

def largest_container(heights: List[int]) -> int:
    """
    Calculates the maximum water volume using the Two-Pointer approach.
    - Time Complexity: O(n)
    - Space Complexity: O(1)
    """
    if not heights or len(heights) < 2:
        return 0
        
    max_water = 0
    left, right = 0, len(heights) - 1
    
    while left < right:
        # Calculate area: height (min of two walls) * width (distance between them)
        width = right - left
        h_left = heights[left]
        h_right = heights[right]
        
        current_water = min(h_left, h_right) * width
        max_water = max(max_water, current_water)
        
        # Strategy: Move the pointer pointing to the shorter line.
        # This is the only way to potentially find a larger area despite decreasing width.
        if h_left < h_right:
            left += 1
        elif h_left > h_right:
            right -= 1
        else:
            left += 1
            right -= 1
            
    return max_water

# --- Test Suite and Org-Mode Formatting ---

test_cases = [
    ([1, 8, 6, 2, 5, 4, 8, 3, 7], 49, "Standard case (LeetCode Example 1)"),
    ([1, 1], 1, "Minimum valid length"),
    ([4, 3, 2, 1, 4], 16, "Equal heights at ends"),
    ([1, 2, 1], 2, "Peak in middle"),
    ([7, 1, 2, 3, 9], 28, "Tallest lines at far ends"),
    ([0, 2], 0, "One wall has zero height"),
    ([1, 2, 4, 3], 4, "Optimal container with reduced width"),
    ([], 0, "Edge Case: Empty list"),
    ([5], 0, "Edge Case: Single element")
]

print("#+TITLE: Algorithm Analysis: Container With Most Water")
print("#+OPTIONS: toc:nil")

print("\n* Complexity Profile")
print("- **Time Complexity:** O(n) :: The list is traversed once using two pointers meeting in the middle.")
print("- **Space Complexity:** O(1) :: Constant space used regardless of input size.")

print("\n* Test Results")
print("| Description | Input Sample | Expected | Actual | Status |")
print("|-------------+--------------+----------+--------+--------|")

for heights, expected, desc in test_cases:
    actual = largest_container(heights)
    status = "PASS" if actual == expected else "FAIL"
    # Truncate long lists for table clarity
    sample = str(heights)
    if len(sample) > 15:
        sample = sample[:12] + "..."
    print(f"| {desc} | {sample} | {expected} | {actual} | {status} |")

print("\n#+BEGIN_NOTE")
print("Footer Note: The greedy approach works because the area is always limited by the shorter bar.")
print("Moving the longer bar inward would only decrease the width without the possibility of increasing")
print("the limiting height, thus we safely discard those states.")
print("#+END_NOTE")
