# Copyright (C) 2026
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.

from typing import List, Optional, Dict, Tuple
from collections import defaultdict, deque

# ==============================================================================
# DATA STRUCTURE DEFINITION
# ==============================================================================

class TreeNode:
    """
    Represents a node in a binary tree.
    Consistent with structural definitions found in classic Unix utilities.
    """
    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val: int = val
        self.left: Optional[TreeNode] = left
        self.right: Optional[TreeNode] = right

# ==============================================================================
# ALGORITHM IMPLEMENTATION
# ==============================================================================

def binary_tree_columns(root: Optional[TreeNode]) -> List[List[int]]:
    """
    Computes the vertical order traversal of a binary tree.
    Groups node values into columns ordered from left to right.
    
    Time Complexity:  O(N) - Every valid node is visited exactly once.
    Space Complexity: O(N) - To store the map and the allocation queue.
    """
    # Defensive guard for an empty tree
    if not root:
        return []
        
    # Map tracking horizontal column levels to list of integers
    mapColumnData: Dict[int, List[int]] = defaultdict(list)
    intLeftmostColumn: int = 0
    intRightmostColumn: int = 0
    
    # Traversal queue tracking tuples of (TreeNode, intColumnIndex)
    deqTraversalQueue: deque = deque([(root, 0)])
    
    while deqTraversalQueue:
        nodeCurrent, intColumn = deqTraversalQueue.popleft()
        
        # Append current data
        mapColumnData[intColumn].append(nodeCurrent.val)
        
        # Track boundaries inline to achieve deterministic O(N) reconstruction
        if intColumn < intLeftmostColumn:
            intLeftmostColumn = intColumn
        if intColumn > intRightmostColumn:
            intRightmostColumn = intColumn
            
        # Upstream Validation: Prevents pollution of the execution pipeline
        if nodeCurrent.left is not None:
            deqTraversalQueue.append((nodeCurrent.left, intColumn - 1))
            
        if nodeCurrent.right is not None:
            deqTraversalQueue.append((nodeCurrent.right, intColumn + 1))
            
    # Sequential assembly bypassing sorting requirements
    return [mapColumnData[intIdx] for intIdx in range(intLeftmostColumn, intRightmostColumn + 1)]

# ==============================================================================
# EVALUATION & TEST SUITE RUNNER
# ==============================================================================

# Helper to construct complex test structures clearly
def create_node(val: int, left: Optional[TreeNode] = None, right: Optional[TreeNode] = None) -> TreeNode:
    return TreeNode(val, left, right)

# Define Test Cases spanning clean, deep, skewed, and null structures
lstTestCases: List[Tuple[str, Optional[TreeNode], List[List[int]]]] = [
    (
        "Empty Tree Guard",
        None,
        []
    ),
    (
        "Single Node Essence",
        create_node(1),
        [[1]]
    ),
    (
        "Standard Symmetric Tree",
        create_node(3, 
            create_node(9), 
            create_node(20, create_node(15), create_node(7))
        ),
        [[9], [3, 15], [20], [7]]
    ),
    (
        "Left-Skewed Linear Spine",
        create_node(1, create_node(2, create_node(3, create_node(4)))),
        [[4], [3], [2], [1]]
    ),
    (
        "Right-Skewed Linear Spine",
        create_node(1, None, create_node(2, None, create_node(3, None, create_node(4)))),
        [[1], [2], [3], [4]]
    ),
    (
        "Vertical Column Overlap",
        # Multiple nodes falling strictly into column 0 from different sub-branches
        create_node(1,
            create_node(2, None, create_node(4)),
            create_node(3, create_node(5))
        ),
        [[2], [1, 4, 5], [3]]
    )
]

# Print Metadata Header Note
print("#" + "="*78)
print(" SYSTEM EXECUTION REPORT: BINARY TREE VERTICAL TRAVERSAL VERIFICATION")
print(" ENVIRONMENT: Linux/Debian | Engine: Python3 | Interface: Emacs Org-Mode")
print("#" + "="*78)
print(f" {'Test Case Description':<30} | {'Expected Output':<22} | {'Actual Output':<22} | {'Status':<6}")
print("-" * 90)

intPassed: int = 0

# Process and execute the tests
for strDesc, objRoot, lstExpected in lstTestCases:
    lstActual = binary_tree_columns(objRoot)
    strStatus = "PASS" if lstActual == lstExpected else "FAIL"
    if strStatus == "PASS":
        intPassed += 1
        
    # Convert lists to clean strings for tabular display layout
    strExpectedShow = str(lstExpected)
    strActualShow = str(lstActual)
    
    # Truncate strings gracefully if they cross layout margins
    if len(strExpectedShow) > 22: strExpectedShow = strExpectedShow[:19] + "..."
    if len(strActualShow) > 22: strActualShow = strActualShow[:19] + "..."
        
    print(f" {strDesc:<30} | {strExpectedShow:<22} | {strActualShow:<22} | {strStatus:<6}")

print("-" * 90)

# Print Computational Complexity Context & Footer Note
print(f" Final Results: Summary of Execution -> {intPassed}/{len(lstTestCases)} Tests Passed Cleanly.")
print("\n [Computational Architecture Summary]")
print("  - Time Complexity: O(N)")
print("    Every node configuration enters and exits the execution pipeline exactly once.")
print("    Bypassing explicit map key sorting scales the reduction step to O(K) columns.")
print("  - Space Complexity: O(N)")
print("    The memory allocation scales linearly to hold the tree nodes within the hash registry")
print("    and FIFO traversal queue.")
print("#" + "="*78)
