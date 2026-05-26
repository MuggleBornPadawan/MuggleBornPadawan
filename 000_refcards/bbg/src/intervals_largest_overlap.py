#!/usr/bin/env python3
"""
Largest Overlap of Intervals for Half-Open [start, end) Intervals.

This script calculates the maximum number of concurrent overlapping intervals
using an optimized sweep-line algorithm tailored for half-open boundaries.

License: GNU GPL v3
"""

import sys
from typing import List, Tuple

class Interval:
    """Represents a half-open interval defined as [start, end)."""
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end

def largest_overlap_of_intervals(intervals: List[Interval]) -> int:
    """
    Calculates the maximum number of concurrent overlapping half-open intervals.
    
    Time Complexity:  O(N log N) where N is the number of intervals (dominated by sorting).
    Space Complexity: O(N) to store the flattened event points.
    """
    if not intervals:
        return 0

    points: List[Tuple[int, int]] = []
    
    for interval in intervals:
        if interval.start > interval.end:
            raise ValueError(f"Malformed interval: start ({interval.start}) cannot exceed end ({interval.end}).")
        
        # For half-open intervals [start, end), an interval ends *at* the end value.
        # If an end and a start match, the end must happen first to clear the space.
        # Therefore: End event = 0 (high priority), Start event = 1 (low priority).
        points.append((interval.start, 1))  # 1 represents Start
        points.append((interval.end, 0))    # 0 represents End

    # Sort primarily by time. If times match, 0 (End) comes before 1 (Start).
    points.sort(key=lambda x: (x[0], x[1]))

    active_intervals = 0
    max_overlaps = 0

    for _, event_type in points:
        if event_type == 1:
            active_intervals += 1
        else:
            active_intervals -= 1
            
        if active_intervals > max_overlaps:
            max_overlaps = active_intervals

    return max_overlaps

# ==============================================================================
# TEST EXECUTION SUITE
# ==============================================================================

# Define a comprehensive matrix of edge cases
test_cases = [
    {
        "id": 1,
        "desc": "Standard Overlapping Set",
        "intervals": [Interval(1, 4), Interval(2, 5), Interval(3, 6)],
        "expected": 3
    },
    {
        "id": 2,
        "desc": "Perfectly Touching Boundaries (Should Not Overlap)",
        "intervals": [Interval(1, 5), Interval(5, 10), Interval(10, 15)],
        "expected": 1
    },
    {
        "id": 3,
        "desc": "Identical Nested Enclosures",
        "intervals": [Interval(2, 5), Interval(2, 5), Interval(2, 5)],
        "expected": 3
    },
    {
        "id": 4,
        "desc": "Completely Disjoint Segments",
        "intervals": [Interval(1, 2), Interval(4, 5), Interval(7, 8)],
        "expected": 1
    },
    {
        "id": 5,
        "desc": "Empty Input Set",
        "intervals": [],
        "expected": 0
    },
    {
        "id": 6,
        "desc": "Single Point / Zero-Length Intervals",
        "intervals": [Interval(3, 3), Interval(3, 3)],
        "expected": 0
    }
]

# Generate Execution Output Table
print("## Execution Results: Sweep-Line Performance Metrics")
print("### Mathematical Constraints: Domain modeled using half-open intervals $[s, e)$.")
print("")
print("| Test ID | Scenario Description | Expected | Computed | Status |")
print("|:---|:---|:---|:---|:---|")

all_passed = True
for case in test_cases:
    try:
        result = largest_overlap_of_intervals(case["intervals"])
        status = "PASS ✅" if result == case["expected"] else "FAIL ❌"
        if result != case["expected"]:
            all_passed = False
    except Exception as e:
        result = "ERROR"
        status = f"FAIL ❌ ({str(e)})"
        all_passed = False
        
    print(f"| {case['id']} | {case['desc']} | {case['expected']} | {result} | {status} |")

print("")
print("---")
print("**Algorithmic Complexity Summary:**")
print("- **Time Complexity:** $\\mathcal{O}(N \\log N)$ — Linear-logarithmic scale bound directly to the foundational Timsort execution overhead.")
print("- **Space Complexity:** $\\mathcal{O}(N)$ — Linear auxiliary allocation footprint required to store split element coordinate boundaries.")
print(f"- **System Verification Status:** { 'ALL TESTS PASSED SUCCESSFULLY' if all_passed else 'ERRORS DETECTED WITHIN TEST SUITE' }")
print("---")
