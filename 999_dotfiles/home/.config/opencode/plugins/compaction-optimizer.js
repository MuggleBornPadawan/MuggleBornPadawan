// OpenCode Compaction Optimizer Plugin (V2)
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "compaction-optimizer",
  async setup(ctx) {
    await ctx.session.hook("compaction", (event) => {
      event.system.push({
        type: "text",
        text: [
          "# CRITICAL STATE TO PRESERVE",
          "Do NOT summarize or omit the following information during compaction:",
          "- Active architectural constraints or user preferences.",
          "- Exact file paths, class/function names, and line numbers of the code under modification.",
          "- Unresolved compiler/lint errors and stack traces.",
          "- The current step-by-step roadmap or goal.",
          "",
          "Summarize the preceding conversation history.",
          "Keep a clear, concise bulleted list of:",
          "1. Decisions made.",
          "2. Files modified.",
          "3. Active pending bugs.",
          "Discard conversational filler, verbose command outputs that succeeded, and redundant explanations.",
        ].join("\n"),
      })
    })
  },
})
