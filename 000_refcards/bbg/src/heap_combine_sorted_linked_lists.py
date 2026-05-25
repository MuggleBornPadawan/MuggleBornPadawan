#!/usr/bin/env python3
"""
Module: combine_lists.py
Description: Optimal priority-queue based algorithm to merge K sorted linked lists.
License: GNU General Public License v3 (GPLv3)
         Copyright (C) 2026

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
"""

from typing import List, Optional, Tuple
import heapq
import sys

# ==============================================================================
# 1. Data Structure Definitions
# ==============================================================================

class ListNode:
    """Standard definition for a singly-linked list node."""
    def __init__(self, val: int = 0, next: Optional['ListNode'] = None):
        self.val: int = val
        self.next: Optional['ListNode'] = next

# ==============================================================================
# 2. Core Algorithmic Logic
# ==============================================================================

def combine_sorted_linked_lists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    """
    Merges K sorted linked lists into a single consolidated, sorted linked list.
    Utilizes a Min-Heap containing (value, entry_id, node) tuples to achieve
    optimal run-time complexity without mutating global class behaviors.
    """
    heap: List[Tuple[int, int, ListNode]] = []
    
    # Unique sequence counter to act as a tie-breaker when two nodes share identical values.
    # This completely eliminates the need for a custom __lt__ comparison operator on ListNode.
    entryId = 0
    
    # Initialize the min-heap with the root head element of each non-empty list
    for head in lists:
        if head is not None:
            heapq.heappush(heap, (head.val, entryId, head))
            entryId += 1
            
    dummy = ListNode(-1)
    curr = dummy
    
    while heap:
        val, _, smallestNode = heapq.heappop(heap)
        
        # Link the node to our growing merged tracking sequence
        curr.next = smallestNode
        curr = curr.next
        
        # If a downstream connected node exists, migrate its reference into the priority heap
        if smallestNode.next is not None:
            heapq.heappush(heap, (smallestNode.next.val, entryId, smallestNode.next))
            entryId += 1
            
    return dummy.next

# ==============================================================================
# 3. Helper Testing Utilities
# ==============================================================================

def build_linked_list(elements: List[int]) -> Optional[ListNode]:
    """Converts a standard Python list into a structured singly-linked list sequence."""
    if not elements:
        return None
    dummy = ListNode(-1)
    curr = dummy
    for val in elements:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

def serialize_linked_list(head: Optional[ListNode]) -> str:
    """Transforms a singly-linked list into a scannable string layout format."""
    elements = []
    curr = head
    while curr:
        elements.append(str(curr.val))
        curr = curr.next
    return " -> ".join(elements) if elements else "None"

# ==============================================================================
# 4. Testing Suite Execution & Table Verification Layout
# ==============================================================================

# Define a matrix containing diverse edge and structural test scenarios
testCases = [
    {
        "id": 1,
        "name": "Standard Mix Matrix",
        "input": [[1, 4, 5], [1, 3, 4], [2, 6]],
        "expected": "1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6"
    },
    {
        "id": 2,
        "name": "Completely Empty Master Container",
        "input": [],
        "expected": "None"
    },
    {
        "id": 3,
        "name": "Container Populated with Empties",
        "input": [[], [], []],
        "expected": "None"
    },
    {
        "id": 4,
        "name": "Single Populated List Entry",
        "input": [[1, 3, 9, 12]],
        "expected": "1 -> 3 -> 9 -> 12"
    },
    {
        "id": 5,
        "name": "Varying Multi-Length Lists",
        "input": [[10], [1, 20], [2, 3, 4, 30]],
        "expected": "1 -> 2 -> 3 -> 4 -> 10 -> 20 -> 30"
    },
    {
        "id": 6,
        "name": "Negative Integer Ranges Included",
        "input": [[-10, -5, 2], [-20, -1, 0, 5]],
        "expected": "-20 -> -10 -> -5 -> -1 -> 0 -> 2 -> 5"
    }
]

# Print execution results styled as an Org-mode friendly table
print("#+TITLE: Heap: Combine K Sorted Linked Lists")
print("#+DESCRIPTION: Performance logging capturing algorithmic structural viability across diverse boundary entries.")
print("\n| ID | Test Scenario Description | Input Representation | Expected Structured Output | Actual Computed Output | Status |")
print("|----+---------------------------+----------------------+----------------------------+------------------------+--------|")

for case in testCases:
    # Convert native arrays into structured linked-list node inputs
    linkedListsInput = [build_linked_list(arr) for arr in case["input"]]
    
    # Process through the sorted combination merge algorithm
    mergedHead = combine_sorted_linked_lists(linkedListsInput)
    actualOutputStr = serialize_linked_list(mergedHead)
    
    status = "PASS" if actualOutputStr == case["expected"] else "FAIL"
    inputPreview = str(case["input"]).replace("|", "\\vert") # Escape potential column pipe disruptions
    
    print(f"| {case['id']} | {case['name']:<25} | {inputPreview:<20} | {case['expected']:<26} | {actualOutputStr:<22} | {status:<6} |")

print("\n#+BEGIN_NOTE")
print("CORE PERFORMANCE ANALYSIS MATRIX:")
print("1. Time Complexity: O(N log K)")
print("   - Where 'K' corresponds to the total count of linked lists, and 'N' maps to the collective sum of elements across all lines.")
print("   - Extracting and inserting into the priority queue min-heap scales logarithmically relative to structural heap depth: O(log K).")
print("2. Space Complexity: O(K)")
print("   - The min-heap dynamically tracks at most 'K' element nodes simultaneously, keeping the memory overhead strictly bounded.")
print("#+END_NOTE")
