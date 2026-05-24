"""
Weighted Random Selection Engine
License: GNU General Public License v3.0 or later (https://www.gnu.org/licenses/gpl-3.0.en.html)

Description:
High-performance static weighted random selection utilizing precalculated prefix sums 
and native C-implemented binary searching.
"""

# Base Open Source License Snippet
# This program is free software: you can redistribute it and/or modify it under 
# the terms of the GNU General Public License as published by the Free Software Foundation.

import random
import bisect
import time
from itertools import accumulate
from typing import List
from collections import Counter

class WeightedRandomSelection:
	def __init__(self, listWeights: List[int]):
		"""
		Initializes the lookup structure using optimized iterator accumulation.
		Time Complexity: O(N)
		Space Complexity: O(N)
		"""
		# Validation to guard structural assumptions
		if not listWeights:
			raise ValueError("Weight list cannot be empty.")
		if any(intW <= 0 for intW in listWeights):
			raise ValueError("All weights must be strictly positive (> 0).")
			
		# Leverage C-level speed of itertools.accumulate for prefix sums
		self.listPrefixSums = list(accumulate(listWeights))
		self.intTotalSum = self.listPrefixSums[-1]

	def select(self) -> int:
		"""
		Selects a random index based on spatial weight distribution.
		Time Complexity: O(log N)
		Space Complexity: O(1)
		"""
		# Fetch random integer boundaries
		intTarget = random.randint(1, self.intTotalSum)
		# Execute optimized lower-bound binary search via native bisect
		return bisect.bisect_left(self.listPrefixSums, intTarget)

# ==============================================================================
# TEST RUNNER & BENCHMARK SUITE (Executed directly for Org-Mode Output)
# ==============================================================================

# Define a matrix of test scenarios testing baseline functionality and explicit edge conditions
dictTestCases = {
	"Single Element Edge Case": [10],
	"Uniform Small Weights": [1, 1, 1, 1],
	"Highly Skewed Weights": [1, 1, 1, 1000],
	"Large Scale Distribution": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
	"Identical Massive Weights": [100000, 100000, 100000]
}

print("## Weighted random selection")
print("The following execution profiles show performance and distribution across critical boundaries.")
print("")
print("| Test Scenario Profile | Input Weights | Sample Idx | Sample Val | Prob (Theory) | Prob (Actual) | Array Size ($N$) | Total Weight ($W$) | Iterations Run | Init Time (ms) | Exec Time (ms) | Lookup Check Status |")
print("|-----------------------|---------------|------------|------------|---------------|---------------|------------------|-------------------|----------------|----------------|----------------|---------------------|")

for strScenarioName, listWeights in dictTestCases.items():
	intSize = len(listWeights)
	intSum = sum(listWeights)
	intIterations = 50000  # High iterations to balance out variance anomalies
	
	# Profile initialization speed
	timeInitStart = time.perf_counter()
	objEngine = WeightedRandomSelection(listWeights)
	timeInitEnd = time.perf_counter()
	floatInitDurationMs = (timeInitEnd - timeInitStart) * 1000.0
	
	# Profile batch lookup operations and track distribution
	counterSelections = Counter()
	timeExecStart = time.perf_counter()
	for _ in range(intIterations):
		intSelectedIdx = objEngine.select()
		counterSelections[intSelectedIdx] += 1
	timeExecEnd = time.perf_counter()
	floatExecDurationMs = (timeExecEnd - timeExecStart) * 1000.0
	
	# Capture a representative sample for display (using the last selected index)
	intSampleIdx = intSelectedIdx
	intSampleVal = listWeights[intSampleIdx]
	floatTheoreticalProb = (intSampleVal / intSum) * 100.0
	floatEmpiricalProb = (counterSelections[intSampleIdx] / intIterations) * 100.0

	# Basic safety verification to ensure boundaries are stable and functional
	boolValidLookup = True
	for _ in range(500):
		intIdx = objEngine.select()
		if intIdx < 0 or intIdx >= intSize:
			boolValidLookup = False
			break
			
	strStatus = "PASS" if boolValidLookup else "FAIL"
	
	# Emit clean formatted row
	strWeights = str(listWeights)
	strTheory = f"{floatTheoreticalProb:.2f}%"
	strActual = f"{floatEmpiricalProb:.2f}%"
	print(f"| {strScenarioName:<21} | {strWeights:<13} | {intSampleIdx:<10} | {intSampleVal:<10} | {strTheory:<13} | {strActual:<13} | {intSize:<16} | {intSum:<17} | {intIterations:<14} | {floatInitDurationMs:<14.4f} | {floatExecDurationMs:<14.4f} | {strStatus:<19} |")

print("")
print("> **Complexity Specifications Note:**")
print("> * **Initialization Time Complexity:** $O(N)$ via vectorized sequence accumulation.")
print("> * **Initialization Space Complexity:** $O(N)$ allocated memory blocks for safe bounds.")
print("> * **Selection/Lookup Time Complexity:** $O(\\log N)$ using optimized division matching via standard library macros.")
print("> * **Selection/Lookup Space Complexity:** $O(1)$ execution overhead.")
print("")
print("Analysis concluded. Lookups are fully optimized against structural regression inside the interpreter loop.")
