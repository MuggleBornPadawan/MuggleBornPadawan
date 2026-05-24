"""
Module: linked_list_midpoint_dual
Description: Implements dual-midpoint extraction for a singly linked list.
             Designed for execution within an Emacs Org-mode source block.
License: GNU GPL v3
"""

import sys
from typing import Optional, Tuple, Any

# ==============================================================================
# 1. CORE DATA STRUCTURE
# ==============================================================================

class ListNode:
    """
    A node in a singly linked list.
    Adheres to the Single Responsibility Principle: manages data and linkage only.
    """
    def __init__(self, val: Any = 0, next_node: Optional['ListNode'] = None):
        self.val: Any = val
        self.next: Optional['ListNode'] = next_node


# ==============================================================================
# 2. BUSINESS LOGIC (ALGORITHM)
# ==============================================================================

def find_linked_list_midpoints(head: Optional[ListNode]) -> Tuple[Optional[ListNode], Optional[ListNode]]:
    """
    Extracts both the lower and upper midpoints of a singly linked list using
    an adapted Tortoise and Hare approach.
    
    Variables Analyzed:
        - slow: Moves 1 step per iteration. Traverses to the midpoints.
        - fast: Moves 2 steps per iteration. Orchestrates loop termination.
        - mid1 (Lower Midpoint): Tracks slow's position or its precursor.
        - mid2 (Upper Midpoint): Tracks slow's absolute stopping position.

    Complexity:
        - Time Complexity: O(n) - Single pass over the nodes.
        - Space Complexity: O(1) - Modifies only local reference pointers.
    """
    # Defensive programming: Handle empty lists and single-node edge cases immediately
    if not head:
        return None, None
    if not head.next:
        return head, head

    slow: Optional[ListNode] = head
    fast: Optional[ListNode] = head
    
    # Track the node immediately preceding 'slow' to capture the lower middle in even lists
    prev_slow: Optional[ListNode] = None

    while fast and fast.next:
        prev_slow = slow
        slow = slow.next          # Move slow pointer 1 step
        fast = fast.next.next     # Move fast pointer 2 steps

    # If fast is None, the list length is EVEN
    if fast is None:
        return prev_slow, slow
    
    # If fast.next is None (fast is on the last node), the list length is ODD
    return slow, slow


# ==============================================================================
# 3. TEST UTILITIES & RUNNER
# ==============================================================================

def build_list(elements: list) -> Optional[ListNode]:
    """Helper factory to cleanly transform an array into a linked list."""
    if not elements:
        return None
    head = ListNode(elements[0])
    current = head
    for val in elements[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def execute_and_format_tests():
    """
    Executes multiple test profiles covering edge and typical cases.
    Formats performance, operational complexity, and results inside clean text tables.
    """
    # Define validation profiles
    test_cases = [
        {"id": 1, "name": "Empty List", "data": []},
        {"id": 2, "name": "Single Element", "data": [42]},
        {"id": 3, "name": "Odd Length (Small)", "data": [10, 20, 30]},
        {"id": 4, "name": "Even Length (Small)", "data": [10, 20, 30, 40]},
        {"id": 5, "name": "Odd Length (Longer)", "data": [1, 2, 3, 4, 5, 6, 7]},
        {"id": 6, "name": "Even Length (Longer)", "data": [1, 2, 3, 4, 5, 6, 7, 8]}
    ]

    # Render Header Note Block
    print("=" * 90)
    print("  LINKED LIST DUAL-MIDPOINT EXECUTION REPORT")
    print("=" * 90)
    print("\n### COMPLEXITY METRICS")
    print("-" * 50)
    print(f"{'Metric':<25} | {'Complexity':<10} | {'Justification'}")
    print("-" * 50)
    print(f"{'Time Complexity':<25} | {'O(n)':<10} | {'Linear traversal, fast pointer skips nodes.'}")
    print(f"{'Space Complexity':<25} | {'O(1)':<10} | {'In-place pointer mutation without allocation.'}")
    print("-" * 50)
    print("\n### VERIFICATION RESULTS TABLE")
    print("-" * 90)
    
    # Table Column Alignments
    header_format = "| {:<3} | {:<22} | {:<22} | {:<15} | {:<15} |"
    row_format    = "| {:<3} | {:<22} | {:<22} | {:<15} | {:<15} |"
    
    print(header_format.format("ID", "Scenario Name", "Input Structure", "Lower Middle", "Upper Middle"))
    print("-" * 90)

    for case in test_cases:
        head_node = build_list(case["data"])
        mid1, mid2 = find_linked_list_midpoints(head_node)
        
        val1 = mid1.val if mid1 else "None"
        val2 = mid2.val if mid2 else "None"
        
        input_str = str(case["data"]) if case["data"] else "Empty"
        
        print(row_format.format(
            case["id"], 
            case["name"], 
            input_str, 
            str(val1), 
            str(val2)
        ))
        
    print("-" * 90)
    print("\n> FOOTNOTE SUMMARY:")
    print("> - For ODD arrays, Lower Middle and Upper Middle converge on an identical value.")
    print("> - For EVEN arrays, the solution safely splits the collection symmetrically, extracting")
    print(">   both index (n/2)-1 and index (n/2) without breaking immutable design paradigms.")
    print("=" * 90)

# Execute the test suite directly on script run
if __name__ == "__main__":
    execute_and_format_tests()
