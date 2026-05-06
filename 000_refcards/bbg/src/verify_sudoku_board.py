from typing import List
import time

def verify_sudoku_board(board: List[List[int]]) -> bool:
    """
    Validates a 9x9 Sudoku board.
    Checks for duplicates in rows, columns, and 3x3 subgrids.
    Also validates that numbers are within the standard 1-9 range.
    """
    if len(board) != 9:
        return False
    for row in board:
        if len(row) != 9:
            return False
            
    row_sets = [set() for _ in range(9)]
    column_sets = [set() for _ in range(9)]
    subgrid_sets = [[set() for _ in range(3)] for _ in range(3)]
    
    for r in range(9):
        for c in range(9):
            num = board[r][c]
            if num == 0:
                continue
            
            # Constraint: Value must be within 1-9
            if not (1 <= num <= 9):
                return False
                
            # Check row, column, and subgrid constraints
            if (num in row_sets[r] or 
                num in column_sets[c] or 
                num in subgrid_sets[r // 3][c // 3]):
                return False
            
            row_sets[r].add(num)
            column_sets[c].add(num)
            subgrid_sets[r // 3][c // 3].add(num)
    return True

# --- Test Suite and Org-Mode Reporter ---

test_cases = [
    {
        "name": "Standard Valid Board",
        "board": [
            [5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0], [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        "expected": True
    },
    {
        "name": "Duplicate in Row",
        "board": [[5, 5] + [0]*7] + [[0]*9 for _ in range(8)],
        "expected": False
    },
    {
        "name": "Duplicate in Column",
        "board": [[8] + [0]*8, [0]*9, [8] + [0]*8] + [[0]*9 for _ in range(6)],
        "expected": False
    },
    {
        "name": "Duplicate in 3x3 Grid",
        "board": [[3, 0, 0] + [0]*6, [0, 3, 0] + [0]*6] + [[0]*9 for _ in range(7)],
        "expected": False
    },
    {
        "name": "Empty Board (Valid)",
        "board": [[0]*9 for _ in range(9)],
        "expected": True
    },
    {
        "name": "Invalid Range (Value 10)",
        "board": [[10] + [0]*8] + [[0]*9 for _ in range(8)],
        "expected": False
    }
]

# Output Results in Org-Table Format
print("#+TITLE: Sudoku Validator Report")
print(f"#+DATE: {time.strftime('%Y-%m-%d %H:%M:%S')}")
print("\n* Complexity Metrics")
print("- **Time Complexity:** O(N^2) (81 iterations for a 9x9 board).")
print("- **Space Complexity:** O(N^2) to store sets for rows, columns, and grids.")
print("\n* Test Results")
print("| ID | Scenario | Expected | Actual | Status | Latency (ms) |")
print("|----+---------------------------+----------+--------+--------+--------------|")

for i, test in enumerate(test_cases):
    start = time.perf_counter()
    actual = verify_sudoku_board(test["board"])
    end = time.perf_counter()
    
    status = "PASS" if actual == test["expected"] else "FAIL"
    latency = (end - start) * 1000
    
    print(f"| {i+1:02} | {test['name']:<25} | {str(test['expected']):<8} | {str(actual):<6} | {status:<6} | {latency:.4f} |")

print("\n#+BEGIN_NOTE")
print("This script validates board state only. It does not check if a board is 'solvable',")
print("only if the current placement of numbers adheres to Sudoku invariant rules.")
print("#+END_NOTE")
