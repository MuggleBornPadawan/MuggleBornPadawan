"""
Module: Palindrome_Org_Executor
License: GNU GPL v3
Author: Gemini Polymath
Description: Optimized for Emacs Org-mode execution.
"""

def is_palindrome_valid(s: str) -> bool:
    # 1. Handle non-string types immediately
    if not isinstance(s, str):
        return False

    # 2. Initialize pointers
    left, right = 0, len(s) - 1

    # 3. Two-pointer traversal
    while left < right:
        # Move left pointer if current char is not alphanumeric
        if not s[left].isalnum():
            left += 1
            continue
        # Move right pointer if current char is not alphanumeric
        if not s[right].isalnum():
            right -= 1
            continue
            
        # Case-insensitive comparison
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
        
    return True

# --- EDGE CASE TEST SUITE ---
# Designed to print results directly to the Org-mode results block
test_data = [
    ("A man, a plan, a canal: Panama", True),  # Standard phrase
    ("race a car", False),                     # Not a palindrome
    ("", True),                                # Empty string
    (" ", True),                               # Whitespace only
    ("a.", True),                              # Single char + symbol
    (".,", True),                              # Symbols only
    ("12321", True),                           # Numbers
    ("No 'x' in Nixon", True),                 # Famous political palindrome
    ("0P", False),                             # Mixed mismatch
    ("!, (?)", True),                          # Tests a string with no alphanumeric characters
    ("12.02.2021", True),                      # Tests a palindrome with punctuation and numbers
    ("21.02.2021", False),                     # Tests a non-palindrome with punctuation and numbers
    ("hello, world!", False)                   # Tests a non-palindrome with punctuation
]

print(f"{'INPUT':<35} | {'EXPECTED':<10} | {'ACTUAL':<10} | {'STATUS'}")
print("-" * 75)

for text, expected in test_data:
    actual = is_palindrome_valid(text)
    status = "PASS ✅" if actual == expected else "FAIL ❌"
    # Format the display for clarity in Org-mode
    display_text = f"'{text}'" if text.strip() else f"'{text}' (whitespace/empty)"
    print(f"{display_text:<35} | {str(expected):<10} | {str(actual):<10} | {status}")
