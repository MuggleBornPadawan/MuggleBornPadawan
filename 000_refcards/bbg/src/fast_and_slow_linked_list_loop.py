# Copyright (C) 2026
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

import sys
import time

# ==============================================================================
# DATA STRUCTURE DEFINITION
# ==============================================================================

class ListNode:
	"""
	A pure structural representation of a Singly Linked List Node.
	Embracing a minimalist design to minimize pointer-chasing overhead.
	"""
	def __init__(self, valuePass: int = 0):
		self.val = valuePass
		self.next = None

# ==============================================================================
# ALGORITHM IMPLEMENTATION
# ==============================================================================

def hasLinkedListLoop(headPointer: ListNode) -> bool:
	"""
	Detects cycles using Floyd's Cycle-Finding Algorithm (Tortoise and Hare).
	
	Time Complexity:  O(N) - Linear scan of at most 2N nodes.
	Space Complexity: O(1) - Constant tracking registers.
	"""
	# Defensive Programming: Eliminate empty lists or single unlinked nodes immediately
	if not headPointer or not headPointer.next:
		return False

	slowIterator = headPointer
	fastIterator = headPointer

	# Maintain structural invariants through strict look-ahead safety validation
	while fastIterator and fastIterator.next:
		slowIterator = slowIterator.next
		fastIterator = fastIterator.next.next

		# Explicit reference identity comparison avoiding value-duplication overhead
		if fastIterator is slowIterator:
			return True

	return False

# ==============================================================================
# TEST FIXTURE FACTORIES
# ==============================================================================

def createLinearList(nodeCount: int) -> ListNode:
	"""Generates a perfectly linear acyclic linked list."""
	if nodeCount == 0:
		return None
	rootNode = ListNode(1)
	currentNode = rootNode
	for i in range(2, nodeCount + 1):
		currentNode.next = ListNode(i)
		currentNode = currentNode.next
	return rootNode

def createCyclicList(nodeCount: int, intersectionIndex: int) -> ListNode:
	"""Generates a linked list that loops back to a specific 0-indexed position."""
	if nodeCount == 0:
		return None
	rootNode = ListNode(1)
	currentNode = rootNode
	loopTargetNode = rootNode if intersectionIndex == 0 else None
	
	for i in range(2, nodeCount + 1):
		currentNode.next = ListNode(i)
		currentNode = currentNode.next
		if i - 1 == intersectionIndex:
			loopTargetNode = currentNode
			
	# Intentionally closing the loop to create the cycle invariant
	currentNode.next = loopTargetNode
	return rootNode

# ==============================================================================
# EXECUTION & EVALUATION PIPELINE
# ==============================================================================

# Define diverse structural edge cases to pressure-test the algorithm
testScenarios = [
	("Empty List (Null Pointer)", None, False),
	("Single Isolated Node", ListNode(42), False),
	("Single Node Self-Looping", createCyclicList(1, 0), True),
	("Linear Trio (No Loop)", createLinearList(3), False),
	("Standard Loop (Tail to Middle)", createCyclicList(6, 2), True),
	("Full Circular Loop (Tail to Head)", createCyclicList(5, 0), True),
	("Large Scale Linear Topology (1,000 nodes)", createLinearList(1000), False),
	("Large Scale Cyclic Topology (1,000 nodes, loop at 500)", createCyclicList(1000, 500), True)
]

# Generate Header Information for Emacs Org-Mode Presentation
print("# PERFORMANCE & VERIFICATION REPORT: FLOYD'S CYCLE DETECTION")
print("-" * 90)
print(f"| {'Test Case Scenario Descriptions':<50} | {'Expected':<10} | {'Returned':<10} | {'Status':<10} |")
print(f"|{'-'*52}|{'-'*12}|{'-'*12}|{'-'*12}|")

passedCount = 0

for description, listHead, expectedResult in testScenarios:
	# Evaluate operational accuracy
	actualResult = hasLinkedListLoop(listHead)
	statusStr = "PASS" if actualResult == expectedResult else "FAIL"
	
	if statusStr == "PASS":
		passedCount += 1
		
	print(f"| {description:<50} | {str(expectedResult):<10} | {str(actualResult):<10} | {statusStr:<10} |")

print("-" * 90)
print(f"# EXTRACTION SUMMARY: {passedCount} out of {len(testScenarios)} test patterns completed successfully.")
print("# ALGORITHMIC COMPLEXITY ANALYSIS PROFILE:")
print("# -> Space Complexity: O(1) Constant Auxiliary Space. Pointers shift purely via reference redirection.")
print("# -> Time Complexity:  O(N) Linear Time. Bounds are strictly constrained within a maximum scale of O(N + K).")
print("# Validation framework closed gracefully.")
