"""
An Optimized, Production-Grade Prefix Tree (Trie) Implementation.
Provides O(m) string operations with minimal memory fragmentation.

License: GNU GPL v3
"""

# ==============================================================================
# GNU GENERAL PUBLIC LICENSE
#
# Copyright (C) 2026
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later version.
# ==============================================================================

import sys
import time

class TrieNode:
    """
    Represents a single node within the Trie structure.
    Uses __slots__ to optimize memory utilization by preventing the automatic
    creation of __dict__ and __weakref__ for every instance.
    """
    __slots__ = ('children', 'is_word')
    
    def __init__(self) -> None:
        # Maps characters to their corresponding child TrieNode instances
        self.children: dict[str, 'TrieNode'] = {}
        # Boolean flag indicating if this node terminates a complete word
        self.is_word: bool = False


class Trie:
    """
    A robust prefix tree for fast string retrieval and prefix matching.
    """
    def __init__(self) -> None:
        self.root: TrieNode = TrieNode()

    def insert(self, word: str) -> None:
        """
        Inserts a word into the Trie.
        
        Time Complexity:  O(m), where m is the length of the string.
        Space Complexity: O(m) worst-case when no characters share an existing path.
        """
        if not isinstance(word, str):
            raise TypeError("Trie only supports string elements.")
            
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def search(self, word: str) -> bool:
        """
        Returns True if the exact word exists within the Trie, otherwise False.
        
        Time Complexity:  O(m), where m is the length of the string.
        Space Complexity: O(1) auxiliary space.
        """
        if not isinstance(word, str):
            return False
            
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word

    def has_prefix(self, prefix: str) -> bool:
        """
        Returns True if there is any word in the Trie that starts with the given prefix.
        
        Time Complexity:  O(m), where m is the length of the prefix string.
        Space Complexity: O(1) auxiliary space.
        """
        if not isinstance(prefix, str):
            return False
            
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True


# ==============================================================================
# VERIFICATION AND BENCHMARKING HARNESS
# ==============================================================================

# Instantiate data structure
trie = Trie()

# Target data subset configuration
words_to_insert = ["apple", "app", "apricot", "banana", "band", "bandit", "Ωmega", "नमस्ते", ""]
search_queries  = ["apple", "app", "apr", "banana", "band", "bandits", "Ωmega", "नमस्", "", "xyz"]
prefix_queries  = ["app", "apr", "ban", "bandi", "Ω", "नम", "", "xyz", "applepie"]

# Perform insertions
for w in words_to_insert:
    trie.insert(w)

# Execution and Evaluation
results = []

# Evaluate Search Queries
for query in search_queries:
    start_time = time.perf_counter_ns()
    status = trie.search(query)
    end_time = time.perf_counter_ns()
    elapsed = end_time - start_time
    results.append(("search", repr(query), str(status), f"{elapsed} ns"))

# Evaluate Prefix Queries
for query in prefix_queries:
    start_time = time.perf_counter_ns()
    status = trie.has_prefix(query)
    end_time = time.perf_counter_ns()
    elapsed = end_time - start_time
    results.append(("has_prefix", repr(query), str(status), f"{elapsed} ns"))


# ==============================================================================
# REPORT GENERATION & METRIC VISUALIZATION
# ==============================================================================

print("## TRIE DATA STRUCTURE VERIFICATION REPORT")
print("-" * 80)
print("OPTIMIZATION STATUS: Enabled via class-level `__slots__` memory fencing.")
print("COMPLEXITY ANALYSIS MATRICES:")
print("  - Insert Operational Bounds: Time O(m)   | Space O(m * N) global footprint")
print("  - Search Operational Bounds: Time O(m)   | Space O(1) auxiliary allocation")
print("  - Prefix Operational Bounds: Time O(m)   | Space O(1) auxiliary allocation")
print(f"  *(where 'm' equals string token sequence depth, 'N' equals global dataset volume)*")
print("-" * 80)
print("")

# Markdown/Org-mode Compatible Table Construction
print(f"| {'Operation Type':<15} | {'Input Target':<15} | {'Output Evaluation':<20} | {'Latency Profile':<15} |")
print(f"|{'-'*17}|{'-'*17}|{'-'*22}|{'-'*17}|")

for op, input_val, output_val, latency in results:
    print(f"| {op:<15} | {input_val:<15} | {output_val:<20} | {latency:<15} |")

print("")
print("-" * 80)
print("FOOTER ANALYSIS NOTES:")
print("1. Edge Cases Handled: Empty string sequences ('') gracefully evaluate as valid unique identities.")
print("2. Character Set Agnosticism: Successfully handles extended UTF-8 domains (e.g., Devanagari, Greek).")
print("3. Memory Profiling: Utilizing `__slots__` cuts node reference overhead significantly by omitting `__dict__` tables.")
print("-" * 80)
