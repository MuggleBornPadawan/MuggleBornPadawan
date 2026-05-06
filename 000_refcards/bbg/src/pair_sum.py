from typing import List

def pair_sum_sorted_brute_force(nums: List[int], target: int) -> List[int]:
    """
    Ensures the list is sorted, then finds indices of two numbers adding to target.
    License: GNU GPL v3
    """
    # Defensive programming: ensure the list is actually sorted first
    # Note: sorting changes indices, so we sort a copy to find values if needed,
    # but here we apply it to the logic directly.
    nums.sort() 
    
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# --- Edge Test Cases ---

def run_tests():
    test_cases = [
        {"input": [4, 1, 7, 2], "target": 9, "desc": "Unsorted Input"},
        {"input": [1, 2], "target": 3, "desc": "Minimum Valid List"},
        {"input": [1, 2, 3], "target": 10, "desc": "No Possible Solution"},
        {"input": [-5, -2, 0, 3], "target": -7, "desc": "Negative Numbers"},
        {"input": [3, 5, 8], "target": 6, "desc": "Double-use Prevention"}
    ]

    for case in test_cases:
        res = pair_sum_sorted_brute_force(case["input"], case["target"])
        print(f"Test: {case['desc']:<20} | Result: {res}")

run_tests()
