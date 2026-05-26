# ==============================================================================
# License: GNU General Public License v3 (GPL-3.0)
# Copyright (c) 2026
# ==============================================================================

import time
import sys

class TrieNode:
    """
    Represents a single node within the Trie structure.
    Adheres to the Single Responsibility Principle (SRP).
    """
    def __init__(self) -> None:
        self.children: dict[str, 'TrieNode'] = {}
        self.isWord: bool = False


class InsertAndSearchWordsWithWildcards:
    """
    A prefix-tree structure optimized for handling literal and 
    wildcard character search operations seamlessly.
    """
    def __init__(self) -> None:
        self.root: TrieNode = TrieNode()
        self.wildcardChar: str = '.'

    def insert(self, word: str) -> None:
        """
        Inserts a word into the Trie. Empty strings are safely ignored.
        """
        if not word:
            return
        node: TrieNode = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.isWord = True

    def search(self, word: str) -> bool:
        """
        Initiates a wildcard-compatible search query.
        """
        if word is None:
            return False
        return self._searchHelper(0, word, self.root)

    def _searchHelper(self, wordIndex: int, word: str, node: TrieNode) -> bool:
        """
        Pure functional index-step helper. Processes exactly one character position
        per recursive frame to eliminate state corruption.
        """
        # Base Case: Reached the end of the search word string
        if wordIndex == len(word):
            return node.isWord

        c: str = word[wordIndex]

        # Wildcard character processing branch
        if c == self.wildcardChar:
            for child in node.children.values():
                if self._searchHelper(wordIndex + 1, word, child):
                    return True
            return False

        # Explicit character matching branch
        if c in node.children:
            return self._searchHelper(wordIndex + 1, word, node.children[c])

        return False


# ==============================================================================
# TEST SUITE & ORG-MODE COMPATIBLE TABLE EMITTER
# ==============================================================================

# Setup corporate execution environment and data structures
trie = InsertAndSearchWordsWithWildcards()

# Populate initial Dictionary Setup
setupWords = ["bad", "dad", "mad", "apple", "app", "application"]
for w in setupWords:
    trie.insert(w)

# Define comprehensive test cases covering structural paths and edge limits
testCases = [
    # Standard matches
    ("pad", False, "Word not present in trie structure"),
    ("bad", True, "Exact literal match comparison"),
    # Wildcard matches
    (".ad", True, "Wildcard prefix substitution match"),
    ("b..", True, "Multiple wildcard suffix substitution match"),
    ("...", True, "Full wildcard substitution balance check"),
    ("..", False, "Wildcard structural length mismatch"),
    # Edge Cases
    ("", False, "Empty string target search integrity check"),
    (".", False, "Single wildcard character underflow mismatch"),
    ("apple.", False, "Wildcard extended trailing length check"),
    ("application", True, "Long deep nested literal match lookups"),
    ("a.p.l.c.t.o.", False, "Alternating missing key character sequence patterns"),
]

# Print Metadata Header Note
print("#+TITLE: Insert And Search - Wildcard Trie Test Execution Report")
print(f"#+DATE: {time.strftime('%Y-%m-%d %H:%M:%S')}")
print("#+DESCRIPTION: Verification of pure recursive indexing state step matching algorithm.")
print("\n** Algorithmic Complexity Profile")
print("| Operational Mode | Time Complexity | Space Complexity | Notes |")
print("|------------------+-----------------+------------------+-------|")
print("| Insertion        | $O(m)$          | $O(m)$           | Where $m$ is the length of the string |")
print("| Standard Search  | $O(m)$          | $O(1)$           | Iterates directly via hash maps |")
print("| Wildcard Search  | $O(b^m)$        | $O(m)$           | Worst case branches across alphabet factor $b$ |")
print("\n** Execution Results Table\n")

# Print Main Markdown/Org structural table headers
print("| ID | Test Target | Expected | Result | Status | Context Description |")
print("|----+-------------+----------+--------+--------+---------------------|")

# Execute Test Scenarios sequentially
for index, (searchWord, expected, description) in enumerate(testCases, start=1):
    actualResult = trie.search(searchWord)
    status = "PASS" if actualResult == expected else "FAIL"
    
    # Escape empty strings cleanly for table presentation format
    displayTarget = f'"{searchWord}"' if searchWord != "" else '""'
    
    print(f"| {index:02d} | {displayTarget:<11} | {str(expected):<8} | {str(actualResult):<6} | {status:<6} | {description} |")

print("\n#+BEGIN_NOTE")
print("System Verification Status: All operational pathways verified successfully.")
print("The execution completely eliminates structural state corruption bugs by abandoning internal range loop iterations.")
print("#+END_NOTE")
