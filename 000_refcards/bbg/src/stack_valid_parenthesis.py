# License: GNU General Public License v3.0 (GPL-3.0)
# Description: Valid Parentheses Expression Checker demonstrating LIFO Stack operations.

import time

def valid_parenthesis_expression(s: str) -> bool:
    """Checks if an input string has balanced and correctly nested parentheses.

    Uses a Last-In, First-Out (LIFO) stack to track opening symbols.
    """
    # Map opening brackets to their corresponding closing brackets
    parenthesesMap = {"(": ")", "{": "}", "[": "]"}
    stack = []

    for c in s:
        # If it's an opening bracket, push it onto the LIFO stack
        if c in parenthesesMap:
            stack.append(c)
        else:
            # If the stack is empty or the top element doesn't match, it's invalid
            if stack and parenthesesMap[stack[-1]] == c:
                stack.pop()  # Pop the last pushed item (LIFO behavior)
            else:
                return False

    # The expression is valid only if all opened brackets are matched and popped
    return not stack


# ==============================================================================
# EXECUTION & TEST SUITE
# ==============================================================================

# Define a comprehensive set of edge cases and standard scenarios
testCases = [
    ("", True, "Empty string (Trivially valid)"),
    ("()[]{}", True, "Standard matching sequences"),
    ("{[()]}", True, "Deeply nested valid brackets"),
    ("(", False, "Single unclosed opening bracket"),
    (")", False, "Single unmatched closing bracket"),
    ("([)]", False, "Incorrect nesting order (Violates LIFO rule)"),
    ("(((((", False, "Multiple unclosed opening brackets"),
    ("]}", False, "Closing brackets without preceding opening brackets"),
    (
        "({[((([{}])))]})",
        True,
        "Complex deep valid nesting (Stress testing stack depth)",
    ),
    ("a", False, "Non-bracket characters (Evaluates as invalid closing)"),
]

# Print Metadata Header Note
print("#" + "=" * 78)
print("# Stack - valid parenthesis")
print("#" + "=" * 78)
print(f"\n{'| Test Case Pattern':<22} | {'Expected':<8} | {'Result':<6} | {'Status':<6} | {'Description':<50} |")
print(
    f"|{'-'*22}-|-{'-'*8}-|-{'-'*6}-|-{'-'*6}-|-{'-'*50}-|"
)

# Execute test suite and format output as a Markdown/Org table
for pattern, expected, description in testCases:
    actualResult = valid_parenthesis_expression(pattern)
    status = "PASS" if actualResult == expected else "FAIL"

    # Format empty string representation visually for the table
    displayPattern = f'"{pattern}"' if pattern == "" else pattern

    print(
        f"| {displayPattern:<20} | {str(expected):<8} | {str(actualResult):<6} | {status:<6} | {description:<48} |"
    )

# Print Optimization Details and Complexity Footnote
print("\n" + "=" * 80)
print("### Stack - valid parenthesis checker")
print("=" * 80)
print(
    "Time Complexity:  O(n) - Single pass iteration through string of length n."
)
print(
    "Space Complexity: O(n) - In the worst case (e.g., '(((((('), the LIFO stack holds"
)
print("                  all opening characters sequentially.")
print("-" * 80)
print("LIFO MECHANIC DIRECTIVE:")
print("The Last-In, First-Out property ensures that the most recently opened symbol")
print("must be closed before any outer scope can close. If a closing bracket fails")
print("to match the current top of the stack (stack[-1]), structural integrity is broken.")
print("=" * 80)
