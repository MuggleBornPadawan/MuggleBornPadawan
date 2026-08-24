Write tests for {{file|the specified code}}.

Rules:
1. Match the existing test framework and style in this project — look at neighboring test files first
2. Cover the happy path first, then edge cases, error paths, and boundary values
3. One behavior per test; use descriptive test names that read as specifications
4. Arrange–Act–Assert structure; keep fixtures minimal
5. Do not modify production code to make testing easier unless you flag it explicitly

Run the tests when done and report results.
