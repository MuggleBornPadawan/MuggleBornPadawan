#  Median Finder for Two Sorted Arrays
#  Copyright (C) 2026 
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/>.

from typing import List, Tuple, Any

def find_the_median_from_two_sorted_arrays(nums1: List[int], nums2: List[int]) -> float:
	"""
	Calculates the median of two sorted arrays using binary search on partition sizes.
	
	Time Complexity: O(log(min(m, n))) - Narrowing down the smaller array search bounds.
	Space Complexity: O(1) - Iterative pointer modifications without auxiliary structures.
	"""
	# Always ensure nums1 is the smaller array to isolate minimal binary lookup overhead.
	if len(nums2) < len(nums1):
		nums1, nums2 = nums2, nums1
		
	iM: int = len(nums1)
	iN: int = len(nums2)
	iHalfTotalLen: int = (iM + iN + 1) // 2
	
	iLeftCountPrt: int = 0
	iRightCountPrt: int = iM
	
	while iLeftCountPrt <= iRightCountPrt:
		iCount1: int = (iLeftCountPrt + iRightCountPrt) // 2
		iCount2: int = iHalfTotalLen - iCount1
		
		fL1: float = float('-inf') if iCount1 == 0 else nums1[iCount1 - 1]
		fR1: float = float('inf') if iCount1 == iM else nums1[iCount1]
		
		fL2: float = float('-inf') if iCount2 == 0 else nums2[iCount2 - 1]
		fR2: float = float('inf') if iCount2 == iN else nums2[iCount2]
		
		# Partition validation invariant
		if fL1 <= fR2 and fL2 <= fR1:
			if (iM + iN) % 2 == 0:
				return (max(fL1, fL2) + min(fR1, fR2)) / 2.0
			else:
				return float(max(fL1, fL2))
		elif fL1 > fR2:
			iRightCountPrt = iCount1 - 1
		else:
			iLeftCountPrt = iCount1 + 1
			
	raise ValueError("Input arrays must be pre-sorted.")

# ==============================================================================
# AUTOMATED TEST EXECUTIVE & REPORT GENERATION
# ==============================================================================

# Comprehensive matrix mapping critical boundary conditions and classic edge cases
stTestCases: List[Tuple[str, List[int], List[int], float]] = [
	("Standard Even Total", [1, 3], [2, 4], 2.5),
	("Standard Odd Total", [1, 3], [2], 2.0),
	("Single Empty Array (Left)", [], [1, 2, 3, 4, 5], 3.0),
	("Single Empty Array (Right)", [1, 2, 3, 4], [], 2.5),
	("Completely Disjoint Arrays", [1, 2], [10, 11, 12], 10.0),
	("Overlapping Interleaved", [1, 5, 9], [2, 6, 10], 5.5),
	("Single Element Duplicates", [1], [1], 1.0),
	("All Identical Elements", [2, 2, 2], [2, 2, 2, 2], 2.0),
	("Negative and Positive Mixed", [-5, -3, -1], [1, 3, 5, 7], 1.0)
]

print("## Median of two sorted arrays")
print(
	"> **Mathematical Complexity Guarantees:**\n"
	"> - **Time Complexity:** $\\mathcal{O}(\\log(\\min(m, n)))$ via partition scaling.\n"
	"> - **Space Complexity:** $\\mathcal{O}(1)$ working memory overhead footprint."
)
print("")

# Print Markdown-compatible table headers for Emacs parsing
print("| Test Case Description | Array 1 (nums1) | Array 2 (nums2) | Expected | Computed | Status |")
print("|:---|:---|:---|:---|:---|:---|")

iPassed: int = 0
for sDesc, list1, list2, fExpected in stTestCases:
	try:
		fResult: float = find_the_median_from_two_sorted_arrays(list1, list2)
		sStatus: str = "PASS" if fResult == fExpected else "FAIL"
		if sStatus == "PASS":
			iPassed += 1
	except Exception as e:
		fResult = float('nan')
		sStatus = f"ERROR ({type(e).__name__})"
		
	print(f"| {sDesc} | {list1} | {list2} | {fExpected} | {fResult} | **{sStatus}** |")

print("")
print("---")
print(f"**Verification Execution Summary:** {iPassed} out of {len(stTestCases)} validation scenarios completed successfully.")
print("Horizontal partitioning checks verified across structural limits without standard out-of-bounds index leakage.")
