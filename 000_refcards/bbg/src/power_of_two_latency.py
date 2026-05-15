# Memory calculation for a Power-of-Two Dictionary
# License: GNU GPL v3

import math

def calculate_dictionary_ram(word_count, include_definitions=True):
    """
    Calculates required memory based on power-of-two alignment.
    """
    # Find the next power of two (Algebra: 2^k >= N)
    k = math.ceil(math.log2(word_count))
    allocated_slots = 2**k
    
    ptr_size = 8  # 64-bit pointers
    avg_entry_size = 184 if include_definitions else 8
    
    total_bytes = allocated_slots * avg_entry_size
    return total_bytes / (1024**2) # Convert to MB

# Usage for OED
oed_ram = calculate_dictionary_ram(600000)
print(f"Allocated RAM: {oed_ram:.2f} MB")
