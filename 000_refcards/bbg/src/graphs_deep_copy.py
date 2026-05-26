# License: GNU General Public License v3.0
# Description: Self-contained Graph Deep Copy with explicit state isolation and dynamic Org-mode table reporting.

import sys
from typing import Optional, Dict, List, Set

# Define the GraphNode class inline to ensure standalone execution
class GraphNode:
    def __init__(self, val: int = 0, neighbors: Optional[List['GraphNode']] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
        
    def __repr__(self):
        return f"Node({self.val})"

def graph_deep_copy(node: Optional[GraphNode], clone_map: Optional[Dict[GraphNode, GraphNode]] = None) -> Optional[GraphNode]:
    """
    Performs a deep copy of a graph using an isolated, recursive DFS approach.
    By using clone_map = None as the default, we prevent Python's mutable default 
    argument trap entirely.
    """
    if not node:
        return None
        
    if clone_map is None:
        clone_map = {}
        
    if node in clone_map:
        return clone_map[node]
        
    cloned_node = GraphNode(node.val)
    clone_map[node] = cloned_node
    
    for neighbor in node.neighbors:
        cloned_neighbor = graph_deep_copy(neighbor, clone_map)
        cloned_node.neighbors.append(cloned_neighbor)
        
    return cloned_node

# --- Verification & Testing Framework ---

def serialize_graph(root: Optional[GraphNode]) -> str:
    """Helper to convert a graph topology into a predictable string format for verification."""
    if not root:
        return "Empty"
    visited: Set[GraphNode] = set()
    def dfs_serialize(node: GraphNode) -> str:
        if node in visited:
            return f"Ref({node.val})"
        visited.add(node)
        neighbor_vals = ", ".join(dfs_serialize(n) for n in node.neighbors)
        return f"[{node.val} -> ({neighbor_vals})]"
    return dfs_serialize(root)

def verify_deep_copy(original: Optional[GraphNode], cloned: Optional[GraphNode]) -> str:
    """Checks if the copy is deep structurally but completely independent in memory."""
    if original is None and cloned is None:
        return "PASS (Both None)"
    if (original is None) != (cloned is None):
        return "FAIL (Mismatched Nullability)"
        
    # Verify absolute structural equality vs memory pointer disparity
    orig_nodes: Set[GraphNode] = set()
    clone_nodes: Set[GraphNode] = set()
    
    def collect(node, storage):
        if not node or node in storage: return
        storage.add(node)
        for n in node.neighbors: collect(n, storage)
        
    collect(original, orig_nodes)
    collect(cloned, clone_nodes)
    
    # Check that no memory pointers are shared between original and clone sets
    if orig_nodes.intersection(clone_nodes):
        return "FAIL (Shared Memory Reference Detected)"
        
    # Check structural matching via serialization
    if serialize_graph(original) == serialize_graph(cloned):
        return "PASS (Independent Deep Copy)"
    return "FAIL (Structural Mismatch)"

# --- Test Case Setup ---

# Case 1: Empty Graph
case1 = None

# Case 2: Single Node
case2 = GraphNode(1)

# Case 3: Simple Linear Path (1 -> 2 -> 3)
n1, n2, n3 = GraphNode(1), GraphNode(2), GraphNode(3)
n1.neighbors.append(n2)
n2.neighbors.append(n3)
case3 = n1

# Case 4: Cyclical Graph (A -> B -> C -> A)
cA, cB, cC = GraphNode(10), GraphNode(20), GraphNode(30)
cA.neighbors.append(cB)
cB.neighbors.append(cC)
cC.neighbors.append(cA)
case4 = cA

# Case 5: Fully Connected Graph / Clique (K3)
k1, k2, k3 = GraphNode(5), GraphNode(6), GraphNode(7)
k1.neighbors.extend([k2, k3])
k2.neighbors.extend([k1, k3])
k3.neighbors.extend([k1, k2])
case5 = k1

test_cases = [
    ("Empty Graph (Null Input)", case1),
    ("Single Node Graph", case2),
    ("Linear Path Graph (1->2->3)", case3),
    ("Cyclical Graph (A->B->C->A)", case4),
    ("Fully Connected Clique (K3)", case5)
]

# --- Output Report Generation ---

print("#+TITLE: Graph Deep Copy Execution Report")
print("\n* Technical Complexity Analysis")
print("  - *Time Complexity:* O(V + E) where V is the number of vertices and E is the number of edges. Each vertex and edge is evaluated exactly once.")
print("  - *Space Complexity:* O(V) required by the stack allocation during depth exploration and the hash mapping structure.")
print("\n* Execution Test Results")
print("| Test Case Description | Original Graph Structure | Verification Status |")
print("|-----------------------+--------------------------+---------------------|")

for desc, root in test_cases:
    orig_structure = serialize_graph(root)
    # Execute the cut inside the runtime loop safely
    cloned_root = graph_deep_copy(root)
    status = verify_deep_copy(root, cloned_root)
    
    # Format cleanly into columns
    print(f"| {desc:<21} | {orig_structure:<24} | {status:<19} |")

print("\n#+BEGIN_NOTE")
print("Verification asserts that (1) Topology perfectly mirrors the original, and (2) Memory space intersections equal exactly 0 between sets.")
print("#+END_NOTE")
