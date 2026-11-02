# Receiving Review — Examples + Pushback

Disclosed reference for `receiving-code-review`. Load when handling contested feedback.

## Source-Specific Handling

### From human partner
Trusted — implement after understanding. Still ask if scope unclear. No performative agreement. Skip to action.

### From external reviewers
1. Technically correct for THIS codebase?
2. Breaks existing functionality?
3. Reason for current impl?
4. Works on all platforms/versions?
5. Reviewer understands full context?

Wrong → push back with reasoning. Can't verify → "I can't verify without [X]. Should I [investigate/ask/proceed]?" Conflicts with partner decision → stop, discuss with partner first.

Partner rule: "External feedback — be skeptical, but check carefully."

## YAGNI Check

Reviewer suggests "implement properly" → grep usage.
Unused → "Not called. Remove (YAGNI)?" Used → implement properly.
Partner rule: "You and reviewer both report to me. If we don't need it, don't add it."

## When To Push Back

- Breaks functionality, lacks context, violates YAGNI, technically incorrect, legacy reasons, conflicts with partner arch.
- How: technical reasoning, specific questions, reference tests/code, involve partner if arch.
- Uncomfortable → name tension, tell partner issue. Honesty appreciated.

## Acknowledging Correct Feedback

✅ "Fixed. [what changed]" / "Good catch — [issue]. Fixed in [loc]." / [just fix, show code]
❌ "You're absolutely right!" / "Great point!" / "Thanks for [anything]" / ANY gratitude.
Why: actions speak. About to write Thanks → DELETE, state fix.

## Correcting Your Pushback

✅ "You were right — checked [X], it does [Y]. Implementing now."
❌ Long apology / defending / over-explaining. State factually, move on.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Performative agreement | State requirement or just act |
| Blind implementation | Verify first |
| Batch without testing | One at a time |
| Assuming reviewer right | Check breakage |
| Avoiding pushback | Correctness > comfort |
| Partial implementation | Clarify all first |
| Can't verify, proceed | State limit, ask |

## Real Examples

Bad: Reviewer "Remove legacy code" → ❌ "You're absolutely right! Let me remove..."
Good: → ✅ "Checking... build 10.15+, API needs 13+. Need legacy for compat. Fix bundle ID or drop pre-13?"

YAGNI good: "Implement metrics DB + filters + CSV" → ✅ "Grepped — nothing calls endpoint. Remove? Or usage I'm missing?"

Unclear good: "Fix 1-6", understand 1,2,3,6 → ✅ "Understand 1,2,3,6. Need 4,5 before implementing."

## GitHub Thread Replies

Reply in thread (`gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies`), not top-level PR comment.
