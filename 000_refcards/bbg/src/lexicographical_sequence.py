import time

def next_lexicographical_sequence(s: str) -> str:
    # 1. Handle Edge Cases
    if not s: return ""
    if len(s) == 1: return s
    
    letters = list(s)
    
    # 2. Locate the pivot
    # The first character from the right that breaks non-increasing order
    pivot = len(letters) - 2
    while pivot >= 0 and letters[pivot] >= letters[pivot + 1]:
        pivot -= 1
        
    # 3. If no pivot is found, the string is at its maximum permutation
    # Reverse it to return to the smallest permutation (standard behavior)
    if pivot == -1:
        return ''.join(reversed(letters))
        
    # 4. Find the rightmost successor to the pivot
    rightmost_successor = len(letters) - 1
    while letters[rightmost_successor] <= letters[pivot]:
        rightmost_successor -= 1
        
    # 5. Swap pivot and successor
    letters[pivot], letters[rightmost_successor] = letters[rightmost_successor], letters[pivot]
    
    # 6. Reverse the suffix (everything after the pivot)
    letters[pivot + 1:] = reversed(letters[pivot + 1:])
    
    return ''.join(letters)

# --- Test Execution & Benchmarking ---
test_cases = [
    ("abc", "Standard ascending"),
    ("acb", "Standard mixed"),
    ("cba", "Max permutation (wrap)"),
    ("a", "Single character"),
    ("", "Empty string"),
    ("abcc", "Duplicate characters"),
    ("pwick", "Random string"),
    ("123", "Numeric string")
]

print(f"{'INPUT':<10} | {'OUTPUT':<10} | {'CATEGORY':<25} | {'LATENCY'}")
print("-" * 65)

for s, desc in test_cases:
    start = time.perf_counter()
    res = next_lexicographical_sequence(s)
    end = time.perf_counter()
    
    duration = (end - start) * 1000 # convert to ms
    display_input = s if s else "(empty)"
    display_output = res if res else "(empty)"
    
    print(f"{display_input:<10} | {display_output:<10} | {desc:<25} | {duration:.4f} ms")

print("-" * 65)
print("Complexity Info:")
print("- Time Complexity: O(n) [Single pass pivot search + Suffix reverse]")
print("- Space Complexity: O(n) [String-to-list conversion]")
