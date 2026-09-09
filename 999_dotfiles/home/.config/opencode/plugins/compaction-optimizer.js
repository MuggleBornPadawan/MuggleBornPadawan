// OpenCode Compaction Optimizer Plugin
export const compactionOptimizer = async (ctx) => {
  return {
    "experimental.session.compacting": async (input, output) => {
      // Inject preservation rules into the summarization prompt context
      output.context.push(`
        # CRITICAL STATE TO PRESERVE
        Do NOT summarize or omit the following information during compaction:
        - Active architectural constraints or user preferences.
        - Exact file paths, class/function names, and line numbers of the code under modification.
        - Unresolved compiler/lint errors and stack traces.
        - The current step-by-step roadmap or goal.
      `);
      
      // Control instructions given to the LLM for summarization
      output.prompt = `
        You are a session compaction assistant. Summarize the preceding conversation history.
        Ensure you keep a clear, concise bulleted list of:
        1. Decisions made.
        2. Files modified.
        3. Active pending bugs.
        Discard conversational filler, verbose command outputs that succeeded, and redundant explanations.
      `;
    },
  };
};
