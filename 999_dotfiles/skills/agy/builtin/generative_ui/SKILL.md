---
name: generative_ui
description: How to render rich interactive HTML widgets inline in the chat or as standalone artifacts. Use this skill when you want to show the user diagrams, data visualizations, interactive controls, educational walkthroughs, or any rich visual content beyond plain text and markdown.
---

# Generative UI

You can render custom, rich, interactive user interfaces (inline widgets or
larger artifacts) directly in the chat. This is a great way to communicate
complex information to the user, generate rich visualizations, and even create
small interactive experiences for the user.

## Workflow

1.  **Create the HTML Artifact**: Use `write_to_file` to save a self-contained
    `.html` file (using Tailwind CSS and inline JavaScript) to the artifact
    directory. Set `UserFacing: true` in `ArtifactMetadata`.
2.  **Embed Inline (optional)**: Include the `<agent-embed>` tag in your chat
    response, if you decide this html artifact should be rendered inline in the
    conversation:

    ```
    <agent-embed src="file:///<artifact_path>/widget.html" height="400px"></agent-embed>
    ```

## Constraints & Theming

*   **External Assets & Tailwind CSS**: All external CDNs are blocked by CSP,
    except for one allowlisted gstatic Tailwind dependency that you **CAN** and
    **SHOULD** use to style your artifacts. Include the following script tag in
    your `<head>` to enable Tailwind:

    ```html
    <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
    ```

*   **Use Provided Theme Variables**: The iframe injects the app's semantic
    design-system tokens, so widgets automatically match the host theme and the
    user's custom colors. Surfaces (`--background`, `--content`, `--card`,
    `--sidebar`), borders (`--border`), text (`--foreground`,
    `--muted-foreground`, `--placeholder`), and accents
    (`--primary`/`--primary-foreground`, `--secondary`/`--secondary-foreground`,
    `--accent`) are all available. Typography is applied for you on the document
    body — you do not need to set a font.

*   **Text & Surface Colors**: Use semantic variables (`bg-[var(--card)]`,
    `text-[var(--foreground)]`, `text-[var(--muted-foreground)]`)
    instead of hardcoded dark/light utility classes (e.g., `bg-slate-900`,
    `text-white`) to ensure high contrast across both light and dark themes.

*   **Do Not Declare Local Fallbacks on `:root`**: Never define local color
    fallbacks on `:root` in a `<style>` block; the host environment manages
    theme variables dynamically.

*   **HTML Boilerplate Template**: Recommended base template:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
    </head>
    <body class="bg-transparent text-[var(--foreground)] antialiased p-5">
      <div class="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
        <h2 class="text-[var(--foreground)] font-semibold text-lg">Title</h2>
        <p class="text-[var(--muted-foreground)] text-sm">Description</p>
        <!-- Interactive content goes here -->
      </div>
    </body>
    </html>
    ```

*   **General styling**: Aim for a clean, premium aesthetic. For `<canvas>`,
    check `document.documentElement.classList.contains('light')` to adapt
    colors.

## Deciding on Placement (Inline vs. Standalone)

**Default to artifact only** — reference the HTML artifact in your response and
let the user open it in the side pane. Consider inlining when the widget is
compact (fits in ~300–500 px) and directly illustrates the surrounding
explanation (e.g., a small educational widget, plot, or diagram). Larger, more
complex content (data dashboards, simulations, app prototypes) should stay
artifact-only. Always follow the user's explicit preference if stated.

## Designing Inline Widgets (Cards & Transparency)

When embedding inline in chat (`<agent-embed>`), style widgets as native chat
components:

*   **Transparent Root Background**: Always set `<body class="bg-transparent
    ...">` so the widget blends seamlessly into the chat container.
*   **Card-Based Layouts**: Wrap inline content and controls in a card container
    (as shown in the Boilerplate Template above) to provide elevation and
    prevent loose text in light mode.
*   **Standalone Artifacts**: For full-page side-pane artifacts (like
    dashboards), use a solid background (e.g., `bg-[var(--background)]`).

## Sizing Guidelines for Inline embeds

When embedding inline, you MUST specify a `height` attribute. Choose the height
that lets **all** content render without clipping. For compact inline widgets,
target 350px, and generally you should **never** exceed 500px height unless the
user asks.

> [!CAUTION] **Don't under-size the embed height.** The most common mistake is
> setting a height that is too small, causing the bottom of the widget to be
> clipped and invisible to the user. When in doubt, **round up**.
