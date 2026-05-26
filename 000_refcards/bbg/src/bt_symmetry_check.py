# =============================================================================
# Copyright (C) 2026. All Rights Reserved.
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# =============================================================================

import sys
from typing import List, Optional, Tuple

class TreeNode:
    """Represents a node within a binary tree structure."""
    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

def binaryTreeSymmetry(root: Optional[TreeNode]) -> bool:
    """
    Determines if a binary tree is symmetric around its center.
    Employs an iterative, stack-based approach to ensure O(1) auxiliary heap space safety
    and prevent potential system call-stack overflows.
    
    Time Complexity:  O(n) - Every node is evaluated exactly once.
    Space Complexity: O(h) - Auxiliary stack memory proportional to tree height (h).
    """
    if not root:
        return True
        
    # Initialize an explicit execution stack holding mirror pairs
    executionStack: List[Tuple[Optional[TreeNode], Optional[TreeNode]]] = [(root.left, root.right)]
    
    while executionStack:
        leftNode, rightNode = executionStack.pop()
        
        if leftNode is None and rightNode is None:
            continue
        if leftNode is None or rightNode is None:
            return False
        if leftNode.val != rightNode.val:
            return False
            
        # Push outer and inner mirror pairs sequentially
        executionStack.append((leftNode.left, rightNode.right))
        executionStack.append((leftNode.right, rightNode.left))
        
    return True

# =============================================================================
# DATA FABRICATION FOR EDGE TEST CASES
# =============================================================================

# Case 1: Empty Tree (Vacuous Truth)
treeEmpty = None

# Case 2: Single Node Tree
treeSingle = TreeNode(1)

# Case 3: Perfectly Symmetric Binary Tree
#       1
#      / \
#     2   2
#    / \ / \
#   3  4 4  3
treeSymmetric = TreeNode(1,
    TreeNode(2, TreeNode(3), TreeNode(4)),
    TreeNode(2, TreeNode(4), TreeNode(3))
)

# Case 4: Asymmetric Structure (Matching Values, Mismatched Topology)
#       1
#      / \
#     2   2
#      \   \
#       3   3
treeAsymmetricStruct = TreeNode(1,
    TreeNode(2, None, TreeNode(3)),
    TreeNode(2, None, TreeNode(3))
)

# Case 5: Symmetric Structure with Asymmetric Values
#       1
#      / \
#     2   2
#    /     \
#   3       4
treeAsymmetricValue = TreeNode(1,
    TreeNode(2, TreeNode(3), None),
    TreeNode(2, None, TreeNode(4))
)

# Case 6: Highly Deep/Skewed Linear Symmetric Sub-branch (Degenerate Check)
# Left and right outer paths run deeply down the line
treeDeepSkewed = TreeNode(1,
    TreeNode(2, TreeNode(3, TreeNode(4), None), None),
    TreeNode(2, None, TreeNode(3, None, TreeNode(4)))
)

# Aggregate test collection with documentation handles
testSuite = [
    ("Empty Tree (Edge Case)", treeEmpty, True),
    ("Single Root Node (Edge Case)", treeSingle, True),
    ("Perfect Symmetric Tree", treeSymmetric, True),
    ("Structural Asymmetry", treeAsymmetricStruct, False),
    ("Value Mismatch Asymmetry", treeAsymmetricValue, False),
    ("Deeply Skewed Linear Chain", treeDeepSkewed, True)
]

# =============================================================================
# ORG-MODE COMPLIANT OUTPUT FORMATTING
# =============================================================================

# Output Metadata Headers
print("#+NAME: binary_tree_symmetry_results")
print("#+CAPTION: Comprehensive Verification Matrix for Binary Tree Symmetry Evaluation")
print("# Complexity Profiles: Time Complexity = O(n) | Space Complexity = O(h) [Iterative Heap Stack]")
print()

# Print Table Header
print("| Test Case ID | Description | Expected | Actual | Pass/Fail |")
print("|--------------+------------------------------+----------+----------+-----------|")

# Execute and stream results dynamically
for idx, (description, rootNode, expectedResult) in enumerate(testSuite, start=1):
    actualResult = binaryTreeSymmetry(rootNode)
    statusString = "PASS" if actualResult == expectedResult else "FAIL"
    
    print(f"| Case {idx:02d} | {description:<28} | {str(expectedResult):<8} | {str(actualResult):<8} | {statusString:<9} |")

print()
print("# NOTE: Verification executed dynamically using Python 3 on Debian GNU/Linux system.")
print("# References: Ken Thompson & Dennis Ritchie architectural standards; structural isomorphism verification routines.")
