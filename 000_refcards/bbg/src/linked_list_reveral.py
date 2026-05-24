# Copyright (C) 2026 MuggleBornPadawan
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

import sys

# 1. Define the Node Structure
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 2. The Simple, Fixed Reversal Logic
def linkedListReversal(pHeadNode: ListNode) -> ListNode:
    pCurrNode = pHeadNode
    pPrevNode = None
    
    while pCurrNode is not None:
        pNextNode = pCurrNode.next
        pCurrNode.next = pPrevNode
        pPrevNode = pCurrNode
        pCurrNode = pNextNode  # Securely aligned inside the loop block
        
    return pPrevNode

# Helper function to turn a linked list into a clean printable string
def serializeList(pNode: ListNode) -> str:
    if not pNode:
        return "Empty (None)"
    elements = []
    pTmp = pNode
    while pTmp:
        elements.append(str(pTmp.val))
        pTmp = pTmp.next
    return " -> ".join(elements)

# Helper function to construct a list from a Python array
def buildList(arr):
    if not arr:
        return None
    pHead = ListNode(arr[0])
    pCurr = pHead
    for val in arr[1:]:
        pCurr.next = ListNode(val)
        pCurr = pCurr.next
    return pHead

# 3. Execution and Table Formatting
print("# Linked list reversal")
print("# PERFORMANCE DATA: Time Complexity: O(n) | Space Complexity: O(1)")
print("# Calculated over 'n' nodes representing total elements processed sequentially.")
print("")
print("| Test Case Type | Input List Shape | Output List Shape | Status |")
print("|----------------|------------------|-------------------|--------|")

# --- Test Case 1: Standard Multi-Node List ---
list1_inputs = [10, 20, 30, 40]
pList1 = buildList(list1_inputs)
strInput1 = serializeList(pList1)

pResult1 = linkedListReversal(pList1)
strOutput1 = serializeList(pResult1)
status1 = "PASS" if strOutput1 == "40 -> 30 -> 20 -> 10" else "FAIL"
print(f"| Standard List  | {strInput1}    | {strOutput1}    | {status1}   |")

# --- Test Case 2: Single-Node Edge Case ---
list2_inputs = [5]
pList2 = buildList(list2_inputs)
strInput2 = serializeList(pList2)

pResult2 = linkedListReversal(pList2)
strOutput2 = serializeList(pResult2)
status2 = "PASS" if strOutput2 == "5" else "FAIL"
print(f"| Single Node    | {strInput2}            | {strOutput2}                | {status2}   |")

# --- Test Case 3: Empty List (None) Edge Case ---
pList3 = buildList([])
strInput3 = serializeList(pList3)

pResult3 = linkedListReversal(pList3)
strOutput3 = serializeList(pResult3)
status3 = "PASS" if strOutput3 == "Empty (None)" else "FAIL"
print(f"| Empty List     | {strInput3}     | {strOutput3}        | {status3}   |")

print("")
print("# Note: Memory allocations remain strictly O(1) as references are reassigned in-place.")
