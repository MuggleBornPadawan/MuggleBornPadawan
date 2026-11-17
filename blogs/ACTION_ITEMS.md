# Blog SEO Action Items — dev.to/ganesh_rajendran_art

**Created:** 2026-11-16
**Source:** audit of https://dev.to/ganesh_rajendran_art (11 posts, Oct 19 – Nov 15 2026)

---

## Baseline (measured 2026-11-16)

| Metric | Value |
|---|---|
| Posts | 11 |
| Reactions / comments | 1 / 0 |
| Indexable | Yes — no `noindex` on any post |
| In dev.to sitemap | 7 of 11 |
| Canonical | All point to `dev.to` |
| Backlinks found | None (only scraper mirrors) |
| Titles over 65 chars | 5 |
| Forem author-trust | 0 |

**Google index status:** not directly verifiable here. Baseline =
`site:dev.to/ganesh_rajendran_art` in a private window. Record the count.

---

## Tier 1 — this week

- [ ] Shorten the 5 titles over 65 chars to `keyword phrase — hook`, ≤ 60 chars.
  - Breaking the 2D Plane… (86)
  - Beyond the Rewrite Trap… (84)
  - Proving What AI Generates… (83)
  - The Self-Healing Code Thesis… (78)
  - The Carmack Pipeline… (75), The 32k Cliff… (75)
- [ ] Rewrite profile bio: 3 words → 2 sentences containing `Clojure`, `generative art`, `creative coding`.
- [ ] Submit `https://dev.to/feed/ganesh_rajendran_art` to Planet Clojure.
- [ ] Post "Breaking the 2D Plane" (Part 3) to r/Clojure + Hacker News.
- [ ] Record baseline `site:dev.to/ganesh_rajendran_art` count in a private window.

## Tier 2 — next 2 weeks

- [ ] Add a runnable GitHub repo + one demo GIF per post. No per-post artifact = no links.
- [ ] Flip `validate-seo` in `publish_devto.bb:66` — currently warns when canonical is
      **not** dev.to. Should require a canonical on an owned domain.
- [ ] Add `canonical_url` frontmatter to all archived posts once the owned domain exists.
- [ ] Drop cadence to 1–2 posts/week. 4 posts in 3 days reads as scaled content.
- [ ] Add internal links: "Part N" cross-links + one pinned "Start here" post.

## Tier 3 — structural (1–2 months)

- [ ] Publish first, then syndicate. Canonical to your domain, dev.to copy carries
      `canonical_url` back to it.
      - Do **not** host Clojure/AI content on `chitrapata.in` (art gallery, wrong topic).
      - Use `lab.chitrapata.in` or a new domain.
- [ ] Target long-tail queries instead of head terms.
      Candidates: `quil opengl shader example`, `clojure lean4 integration`,
      `babashka devto api publish`, `clojure generative art tutorial`.
- [ ] Set up Google Search Console + Bing Webmaster Tools on the owned domain.
- [ ] Per-post distribution checklist: X thread, r/Clojure, Lobsters, HN,
      ClojureVerse, Clojure Weekly.

---

## Why this order

1. Canonical currently donates all ranking equity to dev.to.
2. Zero backlinks — nothing on the web points at these URLs.
3. Volume without engagement is the strongest negative signal you have.
4. Titles are concept-branded ("The 32k Cliff"), not query-matched.
5. No per-post artifact makes the posts structurally un-linkable.
