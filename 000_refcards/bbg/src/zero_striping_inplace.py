# License: GNU GPL v3
from typing import List

def zeroStriping(matrix: List[List[int]]) -> None:
    """
    In-place matrix zeroing using the first row and column as markers.
    """
    if not matrix or not matrix[0]:
        return

    rowCount = len(matrix)
    colCount = len(matrix[0])
    
    firstRowHasZero = any(matrix[0][c] == 0 for c in range(colCount))
    firstColHasZero = any(matrix[r][0] == 0 for r in range(rowCount))

    # Use first row and column as markers
    for r in range(1, rowCount):
        for c in range(1, colCount):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0

    # Update sub-matrix based on markers
    for r in range(1, rowCount):
        for c in range(1, colCount):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0

    # Finalize first row and column
    if firstRowHasZero:
        for c in range(colCount):
            matrix[0][c] = 0
    if firstColHasZero:
        for r in range(rowCount):
            matrix[r][0] = 0

def runTests():
    testCases = [
        {
            "name": "Standard 3x3",
            "input": [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
            "expected": [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
        },
        {
            "name": "Multiple Zeroes",
            "input": [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]],
            "expected": [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
        },
        {
            "name": "First Row/Col Zero",
            "input": [[0, 1], [1, 1]],
            "expected": [[0, 0], [0, 1]]
        },
        {
            "name": "No Zeroes",
            "input": [[1, 2], [3, 4]],
            "expected": [[1, 2], [3, 4]]
        },
        {
            "name": "Single Element Zero",
            "input": [[0]],
            "expected": [[0]]
        },
        {
            "name": "All Zeroes",
            "input": [[0, 0], [0, 0]],
            "expected": [[0, 0], [0, 0]]
        }
    ]

    print("#+TITLE: Matrix Zero Striping Test Results")
    print("#+CAPTION: Complexity: Time O(MN), Space O(1)")
    print("| Test Case Name | Input Matrix | Expected | Result | Status |")
    print("|----------------+--------------+----------+--------+--------|")

    for case in testCases:
        # Deep copy for result preservation
        matrixInput = [row[:] for row in case["input"]]
        zeroStriping(matrixInput)
        
        status = "PASS" if matrixInput == case["expected"] else "FAIL"
        
        # Formatting matrices for the Org table
        fmtIn = str(case["input"]).replace(" ", "")
        fmtExp = str(case["expected"]).replace(" ", "")
        fmtRes = str(matrixInput).replace(" ", "")
        
        print(f"| {case['name']} | {fmtIn} | {fmtExp} | {fmtRes} | {status} |")
    
    print("\n# Note: Results generated using in-place mutation algorithm.")

runTests()
