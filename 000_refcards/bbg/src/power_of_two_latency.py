# Memory calculation for a Power-of-Two Oxford English Dictionary (OED) 
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
word_count = 600000
k = math.ceil(math.log2(word_count))
allocated_slots = 2**k

oed_ram_with = calculate_dictionary_ram(word_count, include_definitions=True)
oed_ram_without = calculate_dictionary_ram(word_count, include_definitions=False)

print(f"Word count: {word_count}")
print(f"k (exponent): {k}")
print(f"Allocated slots (2^k): {allocated_slots}")
print(f"Wasted slots: {allocated_slots - word_count} ({(allocated_slots - word_count)/allocated_slots*100:.1f}%)")
print()
print("--- With definitions ---")
print(f"  Entry size: 184 B")
print(f"  Total: {allocated_slots} × 184 B = {allocated_slots * 184} bytes = {allocated_slots * 184 / 1024**2:.2f} MB")
print(f"  Allocated RAM (with definitions): {oed_ram_with:.2f} MB")
print()
print("--- Without definitions ---")
print(f"  Entry size: 8 B (pointer only)")
print(f"  Total: {allocated_slots} × 8 B = {allocated_slots * 8} bytes = {allocated_slots * 8 / 1024**2:.2f} MB")
print(f"  Allocated RAM (without definitions): {oed_ram_without:.2f} MB")
