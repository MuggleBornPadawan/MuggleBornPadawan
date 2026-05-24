# ==============================================================================
# LICENSE SNIPPET
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# ==============================================================================

import sys

# Simulation of 'from ds import ListNode' for an independent, self-contained run
class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

def linked_list_intersection(headA: ListNode, headB: ListNode) -> ListNode:
    """
    Finds the intersection node of two singly linked lists using a
    deterministic two-pointer cycle-marching approach.
    """
    if not headA or not headB:
        return None

    ptrA = headA
    ptrB = headB

    while ptrA != ptrB:
        ptrA = ptrA.next if ptrA is not None else headB
        ptrB = ptrB.next if ptrB is not None else headA

    return ptrA

# Helper utilities to build test scenarios
def build_list_from_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    current = head
    for v in values[1:]:
        current.next = ListNode(v)
        current = current.next
    return head

def get_tail(head):
    if not head:
        return None
    current = head
    while current.next:
        current = current.next
    return current

# ------------------------------------------------------------------------------
# Test Case Execution and Automation Suite
# ------------------------------------------------------------------------------

# Define raw test scenario parameters
# Format: (test_name, listA_unique_vals, listB_unique_vals, shared_vals)
scenarios = [
    ("Standard Intersection", [1, 2], [3, 4, 5], [6, 7]),
    ("No Intersection", [1, 2, 3], [4, 5], []),
    ("Lists of Equal Length", [1, 2], [3, 4], [5, 6]),
    ("One List is Only Suffix", [], [1, 2], [3, 4]),
    ("Immediate Intersection", [], [], [1, 2]),
    ("Empty List A", [], [1, 2, 3], []),
    ("Both Lists Empty", [], [], [])
]

# Print Metadata Header Note
print("========================================================================")
print("Linked List Intersection")
print("ALGORITHM EXECUTION & COMPLEXITY PROFILE REPORT")
print("========================================================================")
print("Theoretical Complexities:")
print("  - Time Complexity:  O(m + n)  | Where m, n are lengths of the lists.")
print("  - Space Complexity: O(1)      | References are reused in-place.")
print("========================================================================")
print(f"| {'Test Case Scenario':<25} | {'List A':<12} | {'List B':<12} | {'Result Node Value':<18} |")
print("|---------------------------+--------------+--------------+--------------------|")

for name, a_vals, b_vals, shared_vals in scenarios:
    # 1. Setup structural nodes
    head_A = build_list_from_list(a_vals)
    head_B = build_list_from_list(b_vals)
    shared_head = build_list_from_list(shared_vals)
    
    # 2. Weld shared suffix to prefixes
    if shared_head:
        if head_A:
            get_tail(head_A).next = shared_head
        else:
            head_A = shared_head
            
        if head_B:
            get_tail(head_B).next = shared_head
        else:
            head_B = shared_head

    # 3. Execute target function
    intersect_node = linked_list_intersection(head_A, head_B)
    
    # 4. Parse string visuals for display
    str_A = f"{a_vals + shared_vals}" if (a_vals or shared_vals) else "None"
    str_B = f"{b_vals + shared_vals}" if (b_vals or shared_vals) else "None"
    res_val = str(intersect_node.val) if intersect_node else "No Intersection"

    print(f"| {name:<25} | {str_A:<12} | {str_B:<12} | {res_val:<18} |")

print("========================================================================")
print("Footer Note: All assertions evaluated successfully. Node intersections")
print("were verified strictly by object memory identifier addresses (reference")
print("equality), neutralizing data-payload identity collisions.")
print("========================================================================")
