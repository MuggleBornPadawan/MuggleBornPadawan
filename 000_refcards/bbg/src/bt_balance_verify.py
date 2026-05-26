# Copyright (C) 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

from typing import Tuple, Optional, Dict, Any, List

# ==============================================================================
# DATA STRUCTURE DEFINITION
# ==============================================================================
class TreeNode:
    """
    Represents a single node within a binary tree structure.
    Adheres to the Single Responsibility Principle: stores data and references.
    """
    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None) -> None:
        self.val: int = val
        self.left: Optional['TreeNode'] = left
        self.right: Optional['TreeNode'] = right

# ==============================================================================
# ALGORITHMIC IMPLEMENTATIONS
# ==============================================================================

# --- APPROACH 1: THE SIGNAL STRATEGY (Optimized Overloaded Integer) ---
def check_height_and_balance_signal(node: Optional[TreeNode]) -> int:
    """
    Computes tree height while using -1 as a failure token to signal imbalance.
    Optimized with proactive short-circuit evaluation.
    """
    if node is None:
        return 0
        
    leftHeight = check_height_and_balance_signal(node.left)
    if leftHeight == -1:
        return -1  # Short-circuit: skip evaluating the right subtree entirely
        
    rightHeight = check_height_and_balance_signal(node.right)
    if rightHeight == -1:
        return -1  # Short-circuit
        
    if abs(leftHeight - rightHeight) > 1:
        return -1  # Current node state is broken
        
    return 1 + max(leftHeight, rightHeight)

def is_balanced_signal(root: Optional[TreeNode]) -> bool:
    return check_height_and_balance_signal(root) != -1


# --- APPROACH 2: THE DE-COMPLECTED STRATEGY (Explicit Tuple Tracking) ---
def check_balance_explicit(node: Optional[TreeNode]) -> Tuple[bool, int]:
    """
    Follows Rich Hickey's 'Simple Made Easy' design philosophy. Separates the 
    logical state (is_balanced) from the structural metric (height) explicitly.
    """
    if node is None:
        return True, 0
        
    isLeftBalanced, leftHeight = check_balance_explicit(node.left)
    if not isLeftBalanced:
        return False, 0  # Short-circuit out immediately
        
    isRightBalanced, rightHeight = check_balance_explicit(node.right)
    if not isRightBalanced:
        return False, 0  # Short-circuit out immediately
        
    isCurrentBalanced = abs(leftHeight - rightHeight) <= 1
    currentHeight = 1 + max(leftHeight, rightHeight)
    
    return isCurrentBalanced, currentHeight

def is_balanced_explicit(root: Optional[TreeNode]) -> bool:
    balanced, _ = check_balance_explicit(root)
    return balanced

# ==============================================================================
# TEST ENVIRONMENT AND HARNESS (Executed on Script Run)
# ==============================================================================

# Constructing Test Cases
testSuites: List[Dict[str, Any]] = []

# Case 1: Empty Tree (The NULL Base Boundary)
testSuites.append({"id": 1, "name": "Null/Empty Tree", "root": None, "expected": True})

# Case 2: Leaf Node Only (Single Element Anchor)
testSuites.append({"id": 2, "name": "Single Leaf Node", "root": TreeNode(1), "expected": True})

# Case 3: Perfectly Symmetrical Balanced Tree
#       1
#      / \
#     2   3
#    /     \
#   4       5
balancedTree = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3, None, TreeNode(5)))
testSuites.append({"id": 3, "name": "Balanced Symmetric Tree", "root": balancedTree, "expected": True})

# Case 4: Linear Degenerate Chain / Linked List Architecture (Highly Unbalanced)
#   1
#    \
#     2
#      \
#       3
skewedTree = TreeNode(1, None, TreeNode(2, None, TreeNode(3)))
testSuites.append({"id": 4, "name": "Linear Skewed Right Tree", "root": skewedTree, "expected": False})

# Case 5: Deep Subtree Imbalance (The Trick Scenario)
#          1
#         / \
#        2   3
#       /     
#      4       
#     /        
#    5         
deepImbalance = TreeNode(1, TreeNode(2, TreeNode(4, TreeNode(5))), TreeNode(3))
testSuites.append({"id": 5, "name": "Deep Left Subtree Fault", "root": deepImbalance, "expected": False})


# Executing Tests and Rendering Results as a Clean Markdown/Org Compatible Table
print("# ======================================================================")
print("# SYSTEM METRIC REPORT: HEIGHT-BALANCED BINARY TREE VALIDATION RUN")
print("# ======================================================================\n")

# Print Table Header
print(f"| {'ID':<4} | {'Test Scenario Description':<30} | {'Expected':<10} | {'Signal Res':<10} | {'Explicit Res':<12} | {'Status':<6} |")
print(f"|{'-'*6}|{'-'*32}|{'-'*12}|{'-'*12}|{'-'*14}|{'-'*8}|")

failures = 0
for suite in testSuites:
    resSignal = is_balanced_signal(suite["root"])
    resExplicit = is_balanced_explicit(suite["root"])
    
    passed = (resSignal == suite["expected"]) and (resExplicit == suite["expected"])
    statusStr = "PASS" if passed else "FAIL"
    if not passed:
        failures += 1
        
    print(f"| {suite['id']:<4} | {suite['name']:<30} | {str(suite['expected']):<10} | {str(resSignal):<10} | {str(resExplicit):<12} | {statusStr:<6} |")

print("\n# ======================================================================")
print("# COMPLEXITY PROFILES & ARCHITECTURAL SUMMARY")
print("# ======================================================================")
print("# Time Complexity  : O(N) where N is the total number of nodes in the tree.")
print("#                    Both approaches visit each node at most once due to bottom-up backtracking.")
print("#                    The inclusion of short-circuit guards avoids scanning unneeded branches.")
print("#")
print("# Space Complexity : O(H) where H is the maximum height of the tree.")
print("#                    This represents the stack frame memory allocation required by recursion.")
print("#                    Worst Case (Degenerate Chain Tree): O(N)")
print("#                    Best/Average Case (Balanced Tree) : O(log N)")
print("#")
print(f"# Execution Result Summary: System run complete with {failures} unexpected algorithmic failures.")
print("# ======================================================================")
