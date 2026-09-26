Find overcomplicated code in {{file|the current project}}.

Look for:
- Unnecessary abstractions: layers, interfaces, or indirection with only one implementation
- Overly generic solutions to simple problems
- Config/options nobody uses
- Deep nesting or convoluted control flow that could be flattened
- Premature optimization

For each finding: show the code, explain why it's overcomplicated, and propose the simplest thing that works.
Rank by impact — how much complexity would actually be removed.
Analysis only; don't change code until I approve specific items.
