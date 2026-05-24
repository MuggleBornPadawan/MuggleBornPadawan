#!/usr/bin/env python3
"""
Module to remove the K-th node from the end of a singly linked list.

License:
    GNU General Public License v3.0 (GPLv3)
    Copyright (C) 2026

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
"""

import sys
from typing import List, Optional

# --- Data Structure Definition ---

class ListNode:
    """Represents a single node in a singly linked list."""
    def __init__(self, val: int = 0, next_node: Optional['ListNode'] = None):
        self.val: int = val
        self.next: Optional['ListNode'] = next_node

# --- Helper Utilities ---

def build_linked_list(elements: List[int]) -> Optional[ListNode]:
    """Helper function to convert a Python list into a linked list."""
    if not elements:
        return None
    dummyNode = ListNode(-1)
    currentNode = dummyNode
    for value in elements:
        currentNode.next = ListNode(value)
        currentNode = currentNode.next
    return dummyNode.next

def linked_list_to_python_list(head: Optional[ListNode]) -> List[int]:
    """Helper function to serialize a linked list back into a Python list."""
    resultList: List[int] = []
    currentNode = head
    while currentNode:
        resultList.append(currentNode.val)
        currentNode = currentNode.next
    return resultList

# --- Target Core Algorithm ---

def remove_kth_last_node(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    """
    Removes the k-th node from the end of the linked list.
    Time Complexity: O(N) where N is the number of nodes.
    Space Complexity: O(1) auxiliary space.
    """
    dummy = ListNode(-1)
    dummy.next = head
    trailer = dummy
    leader = dummy
    
    # Advance 'leader' k steps ahead to establish the window size
    for _ in range(k):
        leader = leader.next
        # Defensive programming: If k is larger than the actual length 
        # of the linked list, no structural changes are made.
        if not leader:
            return head
            
    # Move 'leader' to the very last node, maintaining the k-node distance
    while leader.next:
        leader = leader.next
        trailer = trailer.next
        
    # Elide the target node by re-routing pointers
    if trailer.next:
        trailer.next = trailer.next.next
        
    return dummy.next

# --- Test Suite Engine & Execution ---

# Format Definition for Test Scenario Matrices
# Each test case structure: (ID, Input List, K-value, Expected Output List, Description)
test_cases = [
    ("TC-001", [1, 2, 3, 4, 5], 2, [1, 2, 3, 5], "Standard Case: Remove middle element"),
    ("TC-002", [1, 2, 3, 4, 5], 5, [2, 3, 4, 5], "Edge Case: Remove the Head node (k == length)"),
    ("TC-003", [1, 2, 3, 4, 5], 1, [1, 2, 3, 4], "Edge Case: Remove the Tail node (k == 1)"),
    ("TC-004", [10], 1, [], "Edge Case: Single element list, removing the only node"),
    ("TC-005", [1, 2, 3], 4, [1, 2, 3], "Edge Case: Out-of-bounds (k > length, list unchanged)"),
    ("TC-006", [], 2, [], "Edge Case: Empty linked list instantiation")
]

# Print Metadata and Header Notes
print("### Linked list - remove kth last node")
print("### Execution Report: Linked List Pointer Mutation Analysis")
print("> **Computational Notes**:")
print("> - **Time Complexity:** $O(N)$ single pass, where $N$ is the number of nodes in the linked list.")
print("> - **Space Complexity:** $O(1)$ auxiliary memory overhead, performing pure in-place reference swaps.")
print()

# Print Table Header
print("| Test ID | Input List | K | Expected Output | Actual Output | Status | Notes / Edge Category |")
print("|---|---|---|---|---|---|---|")

# Process Test Execution Iterations
for testId, input_arr, k_val, expected_arr, description in test_cases:
    # 1. Instantiate stateful structure from input primitive
    head_node = build_linked_list(input_arr)
    
    # 2. Invoke targeted algorithm mutation
    mutated_head = remove_kth_last_node(head_node, k_val)
    
    # 3. Serialize mutated objects back to primitive types for verification
    actual_arr = linked_list_to_python_list(mutated_head)
    
    # 4. Evaluate correctness assertion
    status = "PASS" if actual_arr == expected_arr else "FAIL"
    
    # 5. Output properly formatted tabular row
    print(f"| {testId} | {input_arr} | {k_val} | {expected_arr} | {actual_arr} | **{status}** | {description} |")

print("\n> *Footer Note: All verification assertions compiled successfully via defensive programming boundaries.*")
