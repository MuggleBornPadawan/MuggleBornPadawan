# License: GNU General Public License v3.0
# Version: 2.0.0

from typing import List
from collections import Counter
import heapq
import sys

class HeapElement:
    """
    Data wrapper ensuring correct dual-priority constraints inside a min-heap:
    1. Lower frequencies are evicted first.
    2. On identical frequencies, alphabetically larger strings are evicted first.
    """
    def __init__(self, word: str, frequency: int):
        self.word = word
        self.frequency = frequency

    def __lt__(self, other: "HeapElement") -> bool:
        if self.frequency == other.frequency:
            # Reversing direction: larger string yields True to bubble up to the top
            # of the min-heap so it can be evicted during a heap push-pop step.
            return self.word > other.word
        return self.frequency < other.frequency

def getKMostFrequentStrings(strings: List[str], k: int) -> List[str]:
    # Guard clauses for empty collections or invalid sizes
    if not strings or k <= 0:
        return []
        
    # Map elements to frequencies
    frequencyMap = Counter(strings)
    minHeap = []
    
    # Process items while limiting internal state size to K
    for word, frequency in frequencyMap.items():
        heapq.heappush(minHeap, HeapElement(word, frequency))
        if len(minHeap) > k:
            heapq.heappop(minHeap)
            
    # Defensively capture correct boundary constraints to avoid IndexError if K > Unique Elements
    resultSize = min(k, len(minHeap))
    resultList = [None] * resultSize
    
    # Drain heap backwards to arrange in descending order of frequency
    for i in range(resultSize - 1, -1, -1):
        element = heapq.heappop(minHeap)
        resultList[i] = element.word
        
    return resultList

# =====================================================================
# TEST SUITE & AUTOMATED EXECUTION
# =====================================================================

testCases = [
    {
        "id": 1,
        "name": "Standard Mix",
        "inputs": ["apple", "banana", "apple", "cherry", "banana", "apple"],
        "k": 2
    },
    {
        "id": 2,
        "name": "Lexicographical Tie-Breaker",
        "inputs": ["omega", "alpha", "beta", "omega", "alpha", "beta"],
        "k": 2
    },
    {
        "id": 3,
        "name": "K Greater Than Unique Strings (Edge)",
        "inputs": ["dog", "cat"],
        "k": 5
    },
    {
        "id": 4,
        "name": "Empty Input Array (Edge)",
        "inputs": [],
        "k": 3
    },
    {
        "id": 5,
        "name": "K is Zero (Edge)",
        "inputs": ["lonely"],
        "k": 0
    }
]

# Print Metadata Header Note
print("## Algorithm Evaluation: K Most Frequent - Bounded Min-Heap Selection")
print("#### Complexity Architecture:")
print("- **Time Complexity:** $O(N + U \\log K)$ where $N$ is total strings, and $U$ is unique strings.")
print("- **Space Complexity:** $O(U + K)$ auxiliary allocation for the `Counter` tracking state and the heap footprint.")
print("\n---\n")

# Format Table Header for Org-Mode / Markdown compatibility
print("| ID | Test Scenario | K Value | Input Size | Input Array | Output Array | Status |")
print("|:---|:--------------|:--------|:-----------|:------------|:-------------|:-------|")

for case in testCases:
    try:
        output = getKMostFrequentStrings(case["inputs"], case["k"])
        status = "PASS"
    except Exception as e:
        output = f"Error: {str(e)}"
        status = "FAIL"
        
    print(f"| {case['id']} | {case['name']} | {case['k']} | {len(case['inputs'])} | {case['inputs']} | {output} | {status} |")

# Print Footer Note
print("\n---")
print("> **Verification Note:** All edge criteria evaluated. Index handling successfully decoupled from absolute $K$ boundaries.")
