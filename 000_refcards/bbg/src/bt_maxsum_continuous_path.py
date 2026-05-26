"""
Binary Tree Maximum Path Sum Solver
License: GNU GPL v3

This script calculates the maximum path sum of a binary tree structure.
It avoids global state mutable hazards by encapsulating operations within 
a dedicated computation class.
"""

# ==============================================================================
# LICENSE SNIPPET
# ==============================================================================
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# ==============================================================================

import sys
from typing import Optional, List, Any

# --- Data Structure Definition ---
class TreeNode:
    """Represents a single node in a binary tree."""
    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

# --- Core Algorithm Logic ---
class MaxPathSumSolver:
    """Encapsulates the path sum computation logic to avoid global state pollution."""
    
    def __init__(self):
        # Hungarian/Descriptive notation: iMaxSum tracks the running maximum sum found
        self.iMaxSum = float('-inf')

    def calculateMaxPathSum(self, rootNode: Optional[TreeNode]) -> int:
        """
        Public entry point to compute the maximum path sum of the tree.
        Resets and isolates internal state for each distinct calculation.
        """
        self.iMaxSum = float('-inf')
        self._computeSubtreeGain(rootNode)
        return int(self.iMaxSum)

    def _computeSubtreeGain(self, currentNode: Optional[TreeNode]) -> int:
        """
        Recursive helper that calculates the maximum single-branch gain 
        extending downwards from the current node.
        """
        # Base case: empty nodes contribute zero sum to a path
        if not currentNode:
            return 0

        # Recursively fetch max path sum from subtrees. 
        # Crucial choice: If the subtree sum is negative, we drop it (clamp to 0).
        iLeftSubtreeGain = max(self._computeSubtreeGain(currentNode.left), 0)
        iRightSubtreeGain = max(self._computeSubtreeGain(currentNode.right), 0)

        # Price out the complete path passing *through* the current node as a vertex
        iCurrentPathSum = currentNode.val + iLeftSubtreeGain + iRightSubtreeGain

        # Core Mutation Step: update the historical highest path sum seen anywhere in the tree
        if iCurrentPathSum > self.iMaxSum:
            self.iMaxSum = iCurrentPathSum

        # Return the maximum continuous branch sum that can be extended to this node's parent
        return currentNode.val + max(iLeftSubtreeGain, iRightSubtreeGain)


# --- Helper to Build Trees from Array/List Form (Breadth-First Style) ---
def buildTreeFromList(listValues: List[Any]) -> Optional[TreeNode]:
    """Constructs a binary tree from a list using level-order assignment."""
    if not listValues or listValues[0] is None:
        return None
        
    rootNode = TreeNode(listValues[0])
    queueNodes = [rootNode]
    iIndex = 1
    
    while queueNodes and iIndex < len(listValues):
        currentNode = queueNodes.pop(0)
        
        # Assign Left Child
        if iIndex < len(listValues) and listValues[iIndex] is not None:
            currentNode.left = TreeNode(listValues[iIndex])
            queueNodes.append(currentNode.left)
        iIndex += 1
        
        # Assign Right Child
        if iIndex < len(listValues) and listValues[iIndex] is not None:
            currentNode.right = TreeNode(listValues[iIndex])
            queueNodes.append(currentNode.right)
        iIndex += 1
        
    return rootNode


# ==============================================================================
# TEST RUNNER & EXECUTABLE CODE BLOCK SECTION
# ==============================================================================

# Define a robust cross-section of structural and numeric edge cases
testCases = [
    {
        "id": 1,
        "name": "Standard Balanced Tree",
        "data": [1, 2, 3],
        "expected": 6,
        "desc": "Simple root with two positive children: 2 + 1 + 3 = 6."
    },
    {
        "id": 2,
        "name": "Negative Subtree Branches",
        "data": [-10, 9, 20, None, None, 15, 7],
        "expected": 42,
        "desc": "The maximum path is contained entirely in the right subtree: 15 + 20 + 7 = 42."
    },
    {
        "id": 3,
        "name": "All Negative Elements",
        "data": [-3, -1, -2],
        "expected": -1,
        "desc": "Must select the single least negative individual node (-1) without combining paths."
    },
    {
        "id": 4,
        "name": "Single Element Tree",
        "data": [42],
        "expected": 42,
        "desc": "Only one node exists; its value is inherently the maximum path."
    },
    {
        "id": 5,
        "name": "Deep Linear Skewed Tree",
        "data": [5, -2, None, 10, None, -3, None, 1],
        "expected": 14,
        "desc": "Linear line of nodes; skips the negative leaf node to maximize sum."
    }
]

# Print Metadata Headers for Emacs Org-Mode Output
print("## Execution Results: Binary Tree Maximum Path Sum")
print("### Complexity Metrics")
print("> * **Time Complexity:** $\\mathcal{O}(N)$ where $N$ is the number of nodes. Every node is processed exactly once.")
print("> * **Space Complexity:** $\\mathcal{O}(H)$ where $H$ is the tree height, corresponding to the recursion stack allocation limits.\n")

print("### Test Verification Table")
# Print the Markdown Table Header
print("| Test ID | Scenario Name | Tree Structure (Level-Order) | Expected | Calculated | Verification Status |")
print("|---|---|---|---|---|---|")

solverInstance = MaxPathSumSolver()

# Execute verification runs
for case in testCases:
    treeRoot = buildTreeFromList(case["data"])
    iCalculatedResult = solverInstance.calculateMaxPathSum(treeRoot)
    
    sStatus = "PASS" if iCalculatedResult == case["expected"] else "FAIL"
    
    print(f"| {case['id']} | {case['name']} | {str(case['data'])} | {case['expected']} | {iCalculatedResult} | **{sStatus}** |")

print("\n### Case Interpretations & Descriptive Analytics")
for case in testCases:
    print(f"* **Case {case['id']} ({case['name']}):** {case['desc']}")

print("\n---")
print("*Execution completed successfully under Python 3. System execution sandbox isolated via instance encapsulation. No global namespaces were harmed in this layout.*")
