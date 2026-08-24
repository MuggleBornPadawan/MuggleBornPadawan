Diagnose and fix this problem:

{{error|description of the bug or the stack trace}}

Approach:
1. Reproduce or confirm the failure first (run the failing test/command if possible)
2. Form a hypothesis about the root cause before changing anything — state it explicitly
3. Verify the hypothesis by reading the relevant code (don't guess-and-patch)
4. Apply the minimal fix that addresses the root cause, not the symptom
5. Re-run to confirm the fix; check for similar issues nearby

Report: root cause, what you changed and why, and verification results.
