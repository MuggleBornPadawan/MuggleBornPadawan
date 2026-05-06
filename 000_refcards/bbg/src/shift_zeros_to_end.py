from typing import List
import time

def shift_zeros_to_the_end(nums: List[int]) -> None:
    """
    In-place transformation using the Two-Pointer technique.
    """
    left = 0
    for right in range(len(nums)):
        if nums[right] != 0:
            if right != left:
                nums[left], nums[right] = nums[right], nums[left]
            left += 1

# Define Edge and Standard Test Cases
test_cases = [
    {"name": "Standard Case", "input": [0, 1, 0, 3, 12], "expected": [1, 3, 12, 0, 0]},
    {"name": "All Zeros", "input": [0, 0, 0, 0], "expected": [0, 0, 0, 0]},
    {"name": "No Zeros", "input": [1, 2, 3, 4, 5], "expected": [1, 2, 3, 4, 5]},
    {"name": "Leading Zeros", "input": [0, 0, 5, 6], "expected": [5, 6, 0, 0]},
    {"name": "Single Zero", "input": [0], "expected": [0]},
    {"name": "Single Non-Zero", "input": [7], "expected": [7]},
    {"name": "Empty List", "input": [], "expected": []}
]

# Header and Complexity Section
print("#+TITLE: Algorithm Test Results: Shift Zeros to the End")
print("* Performance Complexity")
print("- **Time Complexity:** O(n), where n is the length of the list.")
print("- **Space Complexity:** O(1), performed in-place.")
print("\n* Test Execution Table")

# Table Header
print("| Test Case | Input | Output | Status | Time (µs) |")
print("|-----------+-------+--------+--------+-----------|")

for case in test_cases:
    arr = list(case["input"])  # Copy to preserve input for display
    
    start_time = time.perf_counter()
    shift_zeros_to_the_end(arr)
    end_time = time.perf_counter()
    
    duration = (end_time - start_time) * 1_000_000
    status = "PASSED" if arr == case["expected"] else "FAILED"
    
    # Format row for Org Mode table
    print(f"| {case['name']} | {case['input']} | {arr} | {status} | {duration:.2f} |")

# Footer Note
print("\n* Footer Note")
print("The 'right != left' check prevents redundant memory writes when the array starts with non-zero elements.")
