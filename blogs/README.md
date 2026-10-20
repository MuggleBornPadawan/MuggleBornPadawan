# Blog Repository

Collection of technical blog posts and publishing automation scripts.

## Contents

- **`publish_devto.bb`**: Babashka automation script. Publishes Markdown blog posts to dev.to using the dev.to API and pass secret manager.
- **`archive/blog-compiler-vs-ai.md`**: Article comparing compilers and AI transformers. Examines the limits of static analysis versus statistical pattern matching.
- **`archive/blog-local-coding-harness-hardware-guide.md`**: Hardware guide for local AI coding harnesses. Explores the 32k context cliff and compares Mac Studio M5 Ultra, NVIDIA RTX Pro 6000, and NVIDIA DGX Spark.

## Usage

Run the publishing script with Babashka:

```bash
bb publish_devto.bb
```
