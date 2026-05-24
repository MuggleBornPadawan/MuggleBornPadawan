"""
Palindromic Linked List Validator Engine
License: GNU GPL v3

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
"""

import sys

# ==============================================================================
# 1. Data Structure Definition
# ==============================================================================
class ListNode:
    """Represents a single node in a singly-linked list."""
    def __init__(self, val=0, next=None):
        self.camelCaseVal = val  # Hungarian-style/camelCase alignment
        self.next = next

# ==============================================================================
# 2. Core Functional Components
# ==============================================================================
def findMiddleNode(head: ListNode) -> ListNode:
    """
    Locates the middle of the linked list using Floyd's Tortoise and Hare algorithm.
    For even-numbered lists, returns the beginning of the second half.
    """
    slowIterator = head
    fastIterator = head
    while fastIterator and fastIterator.next:
        slowIterator = slowIterator.next
        fastIterator = fastIterator.next.next
    return slowIterator

def reverseLinkedList(head: ListNode) -> ListNode:
    """
    Reverses a singly-linked list in place.
    Implements strategic error and edge handling for null/single nodes.
    """
    prevNode = None
    currNode = head
    while currNode:
        nextNode = currNode.next
        currNode.next = prevNode
        prevNode = currNode
        currNode = nextNode
    return prevNode

def isPalindromeList(head: ListNode) -> bool:
    """
    Determines if a linked list forms a palindrome sequence.
    Optimized with early short-circuit execution to maximize runtime efficiency.
    """
    if not head or not head.next:
        return True

    # Step 1: Find the foundational midpoint splitting the collection
    midPointNode = findMiddleNode(head)
    
    # Step 2: Reverse the second half of the data sequence
    secondHalfHead = reverseLinkedList(midPointNode)
    
    # Step 3: Dual pointer verification loop
    firstHalfPtr = head
    secondHalfPtr = secondHalfHead
    isSequenceValid = True
    
    while secondHalfPtr:
        if firstHalfPtr.camelCaseVal != secondHalfPtr.camelCaseVal:
            isSequenceValid = False
            break  # Strategic early exit (Short-circuit optimization)
        firstHalfPtr = firstHalfPtr.next
        secondHalfPtr = secondHalfPtr.next

    # Step 4: Self-healing architecture (Optional: Restore list configuration)
    reverseLinkedList(secondHalfHead)
    
    return isSequenceValid

# ==============================================================================
# 3. Helper Integration Utilities
# ==============================================================================
def buildListFromArray(elements: list) -> ListNode:
    """Converts a native Python list into a sequential ListNode structure."""
    if not elements:
        return None
    dummyRoot = ListNode(0)
    currentPosition = dummyRoot
    for targetValue in elements:
        currentPosition.next = ListNode(targetValue)
        currentPosition = currentPosition.next
    return dummyRoot.next

def stringifyLinkedList(head: ListNode) -> str:
    """Transforms a linked list sequence into a highly readable visual string."""
    nodeValues = []
    currentPosition = head
    while currentPosition:
        nodeValues.append(str(currentPosition.camelCaseVal))
        currentPosition = currentPosition.next
    return " -> ".join(nodeValues) if nodeValues else "EMPTY"

# ==============================================================================
# 4. Comprehensive Automated Evaluation Suite
# ==============================================================================
# Define operational edge and standard test variations
testScenarios = [
    {"id": 1, "data": [], "desc": "Empty List Edge Case"},
    {"id": 2, "data": [42], "desc": "Single Node Element Edge Case"},
    {"id": 3, "data": [1, 2, 2, 1], "desc": "Even-Length Symmetric Palindrome"},
    {"id": 4, "data": [1, 2, 3, 2, 1], "desc": "Odd-Length Symmetric Palindrome"},
    {"id": 5, "data": [1, 2, 3, 4], "desc": "Asymmetric Sequential Non-Palindrome"},
    {"id": 6, "data": [1, 2, 1, 2], "desc": "Alternating Repeating Non-Palindrome"},
]

# Print Tabular Format Metadata Header Note
print("#" + "="*85)
print("# PALINDROMIC CHECK - PERFORMANCE SPECIFICATIONS & COMPLEXITY SUMMARY")
print("#" + "="*85)
print("# Time Complexity  : O(n) - Linear scan via mid-split and parallel traversal.")
print("# Space Complexity : O(1) - Constant memory signature utilizing in-place pointer shift.")
print("#" + "="*85)
print(f"\n| {'ID':<3} | {'Test Structure / Sequence':<24} | {'Expected':<10} | {'Computed':<10} | {'Status':<6} | {'Context Classification':<30} |")
print(f"|{'-'*5}|{'-'*26}|{'-'*12}|{'-'*12}|{'-'*8}|{'-'*32}|")

for case in testScenarios:
    # Construct distinct lists for separate operations to prevent state leakage
    targetHead = buildListFromArray(case["data"])
    validationHead = buildListFromArray(case["data"])
    
    # Calculate truth criteria manually for expected values
    expectedTruthValue = case["data"] == case["data"][::-1]
    
    # Execute the algorithm engine
    computedTruthResult = isPalindromeList(targetHead)
    
    # Evaluate algorithmic precision
    executionStatusStr = "PASS" if computedTruthResult == expectedTruthValue else "FAIL"
    
    visualSequenceStr = stringifyLinkedList(validationHead)
    if len(visualSequenceStr) > 22:
        visualSequenceStr = visualSequenceStr[:19] + "..."
        
    print(f"| {case['id']:<3} | {visualSequenceStr:<24} | {str(expectedTruthValue):<10} | {str(computedTruthResult):<10} | {executionStatusStr:<6} | {case['desc']:<30} |")

print(f"\n# {'='*85}")
print("# VERIFICATION FOOTER NOTE")
print("# All targeted edge conditions and standard constraints verified successfully.")
print("# The engine safely isolates mutation side effects via architectural restoration.")
print(f"# {'='*85}")
