"""
Maximum Binary Tree Width Calculator & Verification Suite

This self-contained script calculates the maximum spatial width of a binary tree
using a heap-indexed Breadth-First Search (BFS) approach. It includes a multi-angle
test matrix ranging from null trees to extreme asymmetric geometries.

License: GNU GPL v3
Year: 2026
"""

from collections import deque
import sys

# ==============================================================================
# 1. CORE DATA STRUCTURE & ALGORITHM DEFINITION
# ==============================================================================

class TreeNode:
    """Represents a node in a binary tree."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def widest_binary_tree_level(root: TreeNode) -> int:
    """
    Computes the maximum width of a binary tree level.
    
    Time Complexity: O(N) where N is the total number of nodes.
    Space Complexity: O(W) where W is the maximum width of the tree level queue.
    """
    if not root:
        return 0

    max_width = 0
    # FIFO queue tracking tuples of: (node, heap_index)
    execution_queue = deque([(root, 0)])

    while execution_queue:
        level_size = len(execution_queue)
        
        # Pull boundaries directly from queue endpoints using O(1) random access
        leftmost_index = execution_queue[0][1]
        rightmost_index = execution_queue[-1][1]
        
        # Calculate coordinate-based width span
        current_level_width = rightmost_index - leftmost_index + 1
        if current_level_width > max_width:
            max_width = current_level_width

        # Flush current level elements and load the next level's children
        for _ in range(level_size):
            current_node, current_index = execution_queue.popleft()
            
            if current_node.left:
                execution_queue.append((
                    current_node.left, 
                    (current_index << 1) + 1  # Equivalent to: 2 * current_index + 1
                ))
            if current_node.right:
                execution_queue.append((
                    current_node.right, 
                    (current_index << 1) + 2  # Equivalent to: 2 * current_index + 2
                ))

    return max_width

# ==============================================================================
# 2. TEST CASE CONSTRUCTS (EDGE AND TOPOLOGICAL CASES)
# ==============================================================================

# Case 1: Empty Tree / Null Input
tree_null = None

# Case 2: Single Node Tree
tree_single = TreeNode(1)

# Case 3: Fully Balanced Tree (Width = 4 at level 2)
#        1
#       / \
#      2   3
#     / \ / \
#    4  5 6  7
tree_balanced = TreeNode(1,
    TreeNode(2, TreeNode(4), TreeNode(5)),
    TreeNode(3, TreeNode(6), TreeNode(7))
)

# Case 4: Deep Right-Skewed Degenerate Tree (Width = 1 at all levels)
#  1 -> 2 -> 3 -> 4
tree_right_skewed = TreeNode(1, right=TreeNode(2, right=TreeNode(3, right=TreeNode(4))))

# Case 5: Sparse Extreme Width Tree (Width = 8 at level 3)
#        1
#       / \
#      2   3
#     /     \
#    4       7
#   /         \
#  8           15
tree_sparse_extreme = TreeNode(1,
    TreeNode(2, left=TreeNode(4, left=TreeNode(8))),
    TreeNode(3, right=TreeNode(7, right=TreeNode(15)))
)

# Case 6: Asymmetric Inner Void (Width = 4 at level 2)
#        1
#       / \
#      2   3
#     /     \
#    4       7
tree_inner_void = TreeNode(1,
    TreeNode(2, left=TreeNode(4)),
    TreeNode(3, right=TreeNode(7))
)

# Test Suite Runner Matrix Definition
test_cases = [
    {"id": "TC-001", "name": "Null Root Input", "root": tree_null, "expected": 0},
    {"id": "TC-002", "name": "Single Isolated Node", "root": tree_single, "expected": 1},
    {"id": "TC-003", "name": "Perfect Balanced Tree", "root": tree_balanced, "expected": 4},
    {"id": "TC-004", "name": "Degenerate Linear Skew", "root": tree_right_skewed, "expected": 1},
    {"id": "TC-005", "name": "Sparse Extreme Outer Bounds", "root": tree_sparse_extreme, "expected": 8},
    {"id": "TC-006", "name": "Internal Structural Void", "root": tree_inner_void, "expected": 4},
]

# ==============================================================================
# 3. METADATA AND RESULTS FORMATTING (OUTPUT GENERATION)
# ==============================================================================

print("#+TITLE: Widest Level - Automated Algorithmic Verification Report")
print("-" * 90)
print(f"| {'Test ID':<8} | {'Test Scenario Description':<30} | {'Expected':<8} | {'Observed':<8} | {'Status':<6} |")
print(f"|{'-'*10}|{'-'*32}|{'-'*10}|{'-'*10}|{'-'*8}|")

passed_count = 0

for case in test_cases:
    observed_result = widest_binary_tree_level(case["root"])
    status = "PASS" if observed_result == case["expected"] else "FAIL"
    if status == "PASS":
        passed_count += 1
        
    print(f"| {case['id']:<8} | {case['name']:<30} | {case['expected']:<8} | {observed_result:<8} | {status:<6} |")

print("-" * 90)
print(f"#+FOOTER NOTE: Total Passed: {passed_count}/{len(test_cases)} cases.")
print("#+COMPLEXITY INFO:")
print("  - Time Complexity: O(N) linear time sequence tracking.")
print("  - Space Complexity: O(W) max level queue tracking (bounded by coordinate width).")
print("  - Value-Semantic Note: Large coordinates handled elegantly via Python arbitrary-precision integers.")
