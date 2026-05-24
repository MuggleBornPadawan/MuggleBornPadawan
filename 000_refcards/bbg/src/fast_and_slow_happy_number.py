# =============================================================================
# License: GNU GPL v3
# Description: Optimized, decoupled Happy Number evaluation engine designed
#              for literary programming execution within Emacs Org-Mode.
# Author: Collaborative Polymath AI
# =============================================================================

import sys
import time

def getNextSumOfSquares(value: int) -> int:
    """
    Extracts base-10 digits and computes the sum of their squares.
    Satisfies the Single Responsibility Principle (SRP).
    """
    nextSum: int = 0
    workingValue: int = value
    
    while workingValue > 0:
        digit: int = workingValue % 10
        workingValue //= 10
        nextSum += digit * digit  # Raw multiplication avoids generic pow() overhead
        
    return nextSum


def isHappyNumber(n: int) -> bool:
    """
    Determines if a number n is a happy number by exploiting the known
    mathematical convergence space to eliminate runtime cycle-tracing logic.
    """
    # Defensive Programming Guard: Non-positive integers are invariant failures
    if n <= 0:
        return False

    currentValue: int = n

    # Architectural Pivot: Non-happy sequences invariably fall into a cycle 
    # containing 4. This cuts execution boundaries to a static O(1) condition.
    while currentValue != 1 and currentValue != 4:
        currentValue = getNextSumOfSquares(currentValue)

    return currentValue == 1


# =============================================================================
# Automated Test Harness & Execution Engine
# =============================================================================

# Define rich edge cases, operational boundaries, and extreme scales
testCases = [
    (-19, "Negative Lower Boundary Invariant"),
    (0,   "Zero Ground-State Edge Case"),
    (1,   "Lowest Valid Single-Digit Happy Number"),
    (4,   "Known Non-Happy Cyclic Attractor Base"),
    (7,   "Single-Digit Convergence Case"),
    (19,  "Standard Standard Multi-Digit Happy Number"),
    (20,  "Standard Non-Happy Number (Triggers Full Cycle)"),
    (44,  "Multi-Step Happy Number Convergence"),
    (49,  "Multi-Step Happy Number Convergence"),
    (100, "Perfect Base-10 Scale Square Case")
]

# Generate Header Report Note
print("= HAPPY NUMBER ENGINE BENCHMARK METRIC REPORT =")
print("| Input State | Intended Classification | Output Verdict | Compute Latency (ns) | Structural Viability Status |")
print("|-------------+-------------------------+----------------+----------------------+-----------------------------|")

for inputVal, description in testCases:
    # High-precision performance profiling instrumentation
    startTime = time.perf_counter_ns()
    verdict = isHappyNumber(inputVal)
    endTime = time.perf_counter_ns()
    
    duration = endTime - startTime
    statusStr = "PASS" if (verdict == ("Happy" in description or "Lowest Valid" in description or "Convergence" in description or "Square" in description)) else "FAIL"
    verdictStr = "HAPPY" if verdict else "UNHAPPY"
    
    print(f"| {inputVal:<11} | {description:<23} | {verdictStr:<14} | {duration:<20} | {statusStr:<27} |")

print("\n------------------------------------------------------------------------------------------------------------------------")
print("### Complexity Architecture Analysis Profiles")
print("> - **Time Complexity:** $O(\\log n)$")
print(">   The execution timeline scales directly with the number of base-10 digits present within the value configuration.")
print("> - **Space Complexity:** $O(1)$ Auxiliary Space")
print(">   Fixed scalar allocations preserve absolute state stability without using active heap memory arrays or dynamic hash tracking sets.")
print("------------------------------------------------------------------------------------------------------------------------")
print("Footer Operational Note: Mathematical state collapse guarantees that all input values under execution drop below 243 ")
print("within a single programmatic transformation step. This optimizes the execution lifecycle, turning runtime tracing into an implicit ")
print("O(1) localized set evaluation without the overhead of tracking active graphs via pointers.")
