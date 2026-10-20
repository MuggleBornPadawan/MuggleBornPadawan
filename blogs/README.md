# Blog Repository

Collection of technical blog posts and publishing automation scripts.

## Contents

- **`publish_devto.bb`**: Babashka automation script. Publishes Markdown blog posts to dev.to using the dev.to API and pass secret manager.
- **`archive/blog-compiler-vs-ai.md`**: "The Self-Healing Code Thesis" — compilers, AI, and the next 10 years of software. Case study (GCC vs. Copilot on bubble sort), Self-Healing feedback loop with timeline roadmap, 11 academic citations.
- **`archive/blog-local-coding-harness-hardware-guide.md`**: Hardware guide for local AI coding harnesses. Explores the 32k context cliff and compares Mac Studio M5 Ultra, NVIDIA RTX Pro 6000, and NVIDIA DGX Spark.

## Usage

Publish blog posts to dev.to with Babashka (API key retrieved via `pass dev.to`):

```bash
# Publish immediately (title extracted from first # heading)
bb publish_devto.bb archive/blog-compiler-vs-ai.md

# Publish with custom tags (max 4, comma-separated)
bb publish_devto.bb archive/blog-compiler-vs-ai.md --tags ai,compilers,programming

# Save as draft on dev.to without publishing live
bb publish_devto.bb archive/blog-compiler-vs-ai.md --draft

# View CLI options
bb publish_devto.bb --help
```
