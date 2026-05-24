"""
An elegant, self-contained FIFO Queue implemented via dual LIFO Stacks.

License:
    GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
"""

from typing import TypeVar, Generic, Optional, Any
import time

T = TypeVar('T')

class Queue(Generic[T]):
    """
    FIFO Queue using two internal LIFO stacks.
    Maintains an amortized O(1) runtime profile for core mutations.
    """
    def __init__(self) -> None:
        self._enqueueStack: list[T] = []
        self._dequeueStack: list[T] = []

    def enqueue(self, item: T) -> None:
        self._enqueueStack.append(item)

    def _flushEnqueueToDequeue(self) -> None:
        if not self._dequeueStack:
            while self._enqueueStack:
                self._dequeueStack.append(self._enqueueStack.pop())

    def dequeue(self) -> T:
        self._flushEnqueueToDequeue()
        if not self._dequeueStack:
            raise IndexError("dequeue from an empty queue")
        return self._dequeueStack.pop()

    def peek(self) -> T:
        self._flushEnqueueToDequeue()
        if not self._dequeueStack:
            raise IndexError("peek from an empty queue")
        return self._dequeueStack[-1]

    def isEmpty(self) -> bool:
        return not self._enqueueStack and not self._dequeueStack

    def size(self) -> int:
        return len(self._enqueueStack) + len(self._dequeueStack)


# =====================================================================
# TEST HARNESS & MATRIX EXECUTION
# =====================================================================

# Define test scenarios including normal use cases and rigorous edge cases
testCases: list[dict[str, Any]] = [
    {
        "id": 1,
        "name": "Standard Sequential Operations",
        "operations": [("enqueue", 10), ("enqueue", 20), ("dequeue", None), ("enqueue", 30), ("peek", None)],
        "expected": [None, None, 10, None, 20]
    },
    {
        "id": 2,
        "name": "Edge: Dequeue on Empty Queue",
        "operations": [("dequeue", None)],
        "expected": ["IndexError"]
    },
    {
        "id": 3,
        "name": "Edge: Peek on Empty Queue",
        "operations": [("peek", None)],
        "expected": ["IndexError"]
    },
    {
        "id": 4,
        "name": "Interleaved High-Volume Stress",
        "operations": [("enqueue", i) for i in range(100)] + [("dequeue", None) for _ in range(50)],
        "expected": [None for _ in range(100)] + list(range(50))
    },
    {
        "id": 5,
        "name": "Edge: Complete Drainage & Refill",
        "operations": [("enqueue", 99), ("dequeue", None), ("enqueue", 88), ("peek", None)],
        "expected": [None, 99, None, 88]
    }
]

# Print Metadata Header Note
print("=" * 115)
print("DATA STRUCTURE TEST REPORT: DUAL-STACK FIFO QUEUE EXECUTION")
print("=" * 115)

# Print Table Header
print(f"{'ID':<4} | {'Test Scenario Description':<32} | {'Ops Count':<10} | {'Status':<8} | {'Complexity (Time/Space)':<25} | {'Notes':<20}")
print("-" * 115)

# Execute Tests
passedCount = 0

for case in testCases:
    queue: Queue[int] = Queue()
    actualResults = []
    status = "PASSED"
    notes = "Verified"
    
    # Track metrics if relevant, but mathematically bounds remain static
    timeComplexity = "Amortized O(1)"
    spaceComplexity = "O(N)"
    
    for op, val in case["operations"]:
        try:
            if op == "enqueue":
                queue.enqueue(val)
                actualResults.append(None)
            elif op == "dequeue":
                res = queue.dequeue()
                actualResults.append(res)
            elif op == "peek":
                res = queue.peek()
                actualResults.append(res)
        except IndexError:
            actualResults.append("IndexError")
        except Exception as e:
            actualResults.append(type(e).__name__)

    # Validate structural compliance
    if actualResults != case["expected"]:
        status = "FAILED"
        notes = f"Mismatch encountered"
    else:
        passedCount += 1
        
    if "Empty" in case["name"]:
        notes = "Exception caught ok"
    elif "Stress" in case["name"]:
        notes = f"Processed {len(case['operations'])} elements"

    # Display row
    complexityStr = f"{timeComplexity} / {spaceComplexity}"
    print(f"{case['id']:<4} | {case['name']:<32} | {len(case['operations']):<10} | {status:<8} | {complexityStr:<25} | {notes:<20}")

print("-" * 115)
# Footer Note
print(f"SUMMARY: {passedCount} of {len(testCases)} test suites executed perfectly.")
print("Complexity Deep-Dive:")
print("  - Enqueue operations spend O(1) appending directly to the input stack wrapper.")
print("  - Dequeue/Peek amortize out to O(1) as elements traverse the inversion threshold exactly once.")
print("  - Overall memory footprint scales strictly linearly with total concurrent items held.")
print("=" * 115)
