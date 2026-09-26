Find overcomplicated code and YAGNI violations in {{file|the current project}}.

### Principles to Enforce:
- **Necessity:** Challenge whether code or features need to exist at all.
- **Native Over Custom:** Use standard library and language idioms instead of custom wrappers or extra dependencies.
- **Reuse:** Reuse existing project utilities and patterns before creating new helpers.
- **Minimal Footprint:** Write the minimum code required. Prefer simple data over complex abstractions.

### Look For:
- Unnecessary abstractions: layers, interfaces, or indirection with only one implementation
- Overly generic solutions to simple problems
- Configuration or options that are not used
- Deep nesting or convoluted control flow that can be flattened
- Premature optimization or speculative future-proofing

### Output Format:
For each finding:
1. Show the specific code snippet and location.
2. Explain why it is overcomplicated.
3. Propose the simplest working alternative using standard patterns.
4. Rank findings by impact (highest complexity reduction first).

**Safety Guard:** Analysis only. Do not edit code until specific recommendations are approved.
