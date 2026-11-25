# Blog Writing Best Practices Checklist

Use this checklist after drafting a blog post and before publishing to `dev.to`.
Run `bb lint_blog.bb <file.md>` to verify automated checks, then complete the manual editorial checks below.

---

## 1. Frontmatter Schema

Standardize frontmatter in the following key order. Leave unavailable post-publish fields blank (`key:`) or omit them when not applicable (do **not** use empty quotes `""` for `canonical_url` or `cover_image`).

```yaml
---
title: "Keyword Phrase: Descriptive Hook"
published: true
description: "Concise 80-160 character summary with primary search keywords."
tags: tag1, tag2, tag3, tag4
series:
cover_image:
canonical_url:
devto_id:
---
```

- [ ] `title` is present and matches the post's main topic
- [ ] `published` is `true` (or `false` when saving a draft via `--draft`)
- [ ] `description` is present and 80–160 characters
- [ ] **tags**: Has at most 4 tags, comma-separated, lowercase alphanumeric only (`a-z`, `0-9`)
- [ ] **Tag relevance to SEO**: Tags directly reflect target search intent and the article's core subject. At least 1–2 tags align with keywords in the title or meta description, and every tag is substantiated in the body text (no detached or phantom tags)
- [ ] `series` is set if the post belongs to a multi-part series, or left blank/omitted otherwise
- [ ] `cover_image`, `canonical_url`, `devto_id` are populated if known, or left blank (`key:`) until published

---

## 2. dev.to Conformance

- [ ] **Tags**: Maximum 4 tags, no hyphens, spaces, or underscores (e.g. `generativeart`, not `generative-art`)
- [ ] **Headings**: Do not duplicate the frontmatter `title` as an H1 (`# Title`) in the body; start sections at `##`
- [ ] **Code fences**: Every fenced code block is properly closed and specifies a language tag (`clojure`, `bash`, `yaml`, etc.)
- [ ] **Images**: All image URLs use `https://` (no broken local relative paths) and include descriptive alt text (`![alt](url)`)
- [ ] **No placeholder links**: No empty links (`[text]()`), `TODO`/`TBD` URLs, `localhost`, or `example.com`
- [ ] **Working URLs**: All hyperlinks and image URLs are reachable and return valid HTTP responses (no 404s or broken anchors). Verify with `bb lint_blog.bb <file.md> --check-urls`
- [ ] **No local or personal repo links**: Remove all references to local documents/paths (`file://`, `/home/...`, `~/...`, relative `.md` links — including inside code blocks) and your own GitHub repositories (`github.com/MuggleBornPadawan/...`)

---

## 3. SEO

- [ ] **Title length**: `<= 65` characters (avoid SERP truncation; `keyword phrase — hook` format recommended)
- [ ] **Meta description**: `80–160` characters, includes primary long-tail keywords and a clear takeaway
- [ ] **Tag & keyword alignment**: Primary tags align with title and meta description keywords for strong SERP query relevance
- [ ] **Canonical URL**: Blank before first publish, or valid `https://dev.to/ganesh_rajendran_art/...` (or owned domain)

---

## 4. Series & Cross-Post Revisions

- [ ] **Series check**: Check `archive/` for existing series or related posts before publishing
- [ ] **Series header**: If part of a series, include the standardized numbered TOC blockquote at the top of the post:

```markdown
> *This is **Part N** of a M-part series on **Series Name**:*
> 1. [Part 1: Title](https://dev.to/ganesh_rajendran_art/...)
> 2. **Part 2: This Article Title** (this article)
```

- [ ] **Prior part revisions**: Update the TOC blockquote in all earlier posts of the series and re-publish them with `bb publish_devto.bb <file.md> --id <devto_id>`
- [ ] **Cross-linking previous blogs**: Any reference or mention of your previous blog posts (by title, series name, or conceptual continuation) in the prose must be hyperlinked directly to its published dev.to canonical URL (e.g. `[*Beyond the Rewrite Trap*](https://dev.to/ganesh_rajendran_art/...)`), never left as unlinked plain text or a local file link
- [ ] **Internal links**: Link naturally to relevant prior posts in the body where concepts build on earlier work

---

## 5. Editorial & Content Quality

- [ ] **Acronyms & abbreviations**: Expand on first use in prose (e.g., `Procedural Content Generation (PCG)`)
- [ ] **References**: Include a `## References` section at the bottom with primary sources, papers, or docs
- [ ] **Runnable artifacts**: Include self-contained code snippets or public external demos where applicable (no local files or personal GitHub repos)
- [ ] **AI usage footnote**: End the post with the standard footnote stub:

```markdown
---
*Crafted with AI: Research, drafting, review, and refinement assisted by frontier AI models.*
```

---

## 6. Post-Publish Wrap-Up

- [ ] Run `bb lint_blog.bb <file.md>` and resolve any `[FAIL]` or `[WARN]` items
- [ ] Publish with `bb publish_devto.bb <file.md>` (or `--draft` first)
- [ ] Backfill `devto_id`, `canonical_url`, and `cover_image` into the post's frontmatter
- [ ] Add the post entry (with link and 1-sentence summary) to [`README.md`](README.md)
- [ ] **Distribution & cadence**: Keep cadence to 1–2 posts/week; share relevant posts to r/Clojure, Hacker News, Lobsters, ClojureVerse, X, and Clojure Weekly
