# Reading website

Use this reference to build, repair, or verify the chapter-by-chapter reading website. The website is a static rendering of the Markdown study edition. The chapter Markdown stays the single source, and the website is regenerated from it.

## Layout

| Path | Role |
|---|---|
| `scripts/build_site.py` | Converts every unit with Pandoc and writes the site into `docs/` |
| `site/navigation-guide.md` | Part groupings, chapter outcomes, reading minutes, and reading routes |
| `site/assets/theme.js` | Sets the opening theme before the first paint |
| `site/assets/reader.js` | Navigation, chapter filter, theme toggle, lazy Mermaid rendering, and printing |
| `site/assets/style.css` | Reader styles for both themes and print |
| `site/assets/mermaid.min.js` | Bundled Mermaid 11.4.1 under its MIT license |
| `docs/` | Generated website that GitHub Pages serves from `main:/docs` |

The live reader is `https://arunshar.com/rag-interview-chapters/`. The GitHub Pages address redirects to the arunshar.com domain.

## Build

Run the build from the repository root:

```text
python3 scripts/build_site.py
```

The build stops before writing anything when either check fails:

1. Pandoc must be version 3.7.0.2. MathML output depends on the texmath library inside Pandoc, so another version can change every equation page. Set `ALLOW_ANY_PANDOC=1` only when you will review the equation pages afterward.
2. The chapter sources must not contain a table directly after a closing `$$` line or an unescaped `%` inside display math.

The build then removes `docs/chapters/`, converts all 57 units, and writes the home page, the reading routes, the original index, and the about page. Each page gets a description from its purpose sentence and a `noindex` robots tag. Each footer carries the unofficial-edition notice.

## Conversion rules that the GitHub view does not show

GitHub Markdown and Pandoc disagree on several patterns. A unit can look correct on GitHub and still break on the website.

- A table that starts on the line after a closing `$$` becomes paragraph text in Pandoc. Leave a blank line before the table.
- A `|` inside a code span in a table row splits the cell in Pandoc, and the text after it disappears. Write `\|` inside the code span.
- A `%` inside display math starts a TeX comment, and the rest of the line vanishes. Write `\%`.
- A parenthesized subscript such as `\Sigma_(i in D)` attaches only the opening parenthesis. Write `\Sigma_{i \in D}`.
- A bare function name such as `log`, `exp`, or `softmax` renders as italic single letters. Write `\log`, `\exp`, or `\mathop{\text{softmax}}`.
- Plain-text pseudo-code inside `$$` renders as a run of italic letters. Write real LaTeX, or move the pseudo-code into a fenced `text` block.
- A display equation that continues a list item without a blank line stays inside the list item. The build wraps every display equation in its own scroll box, so it cannot widen the page.

`audit_markdown.mjs` rejects the first five patterns. Review the sixth by reading the rendered page.

## Reader behavior

- `theme.js` runs in the page head and chooses the opening theme. `reader.js` keeps the toggle in sync and stores the reader's choice.
- Mermaid starts with the theme that matches the page. Diagrams already on screen redraw when the reader switches themes.
- The print button draws every diagram in the light Mermaid theme, prints, and then restores the page theme. A browser print shortcut cannot wait for rendering, so undrawn diagrams print their source instead.
- Question-bank answer spines are folded under "Show expected reasoning", so a reader can attempt each prompt first.
- Each reading route shows its total reading time from the same minutes the roadmap uses.

## Verification

Run these checks after every rebuild:

1. `node scripts/audit_markdown.mjs <package-root>` reports zero errors and zero warnings.
2. Serve `docs/` locally and parse every Mermaid block with the bundled Mermaid in a real browser, in both themes. `mmdc` is not required for this check.
3. Load every page in a 375-pixel frame and confirm that the document width does not exceed the frame.
4. Scan the generated HTML for literal table syntax such as `|---|` outside code, for `<merror>`, and for duplicate `id` values.
5. Compare Markdown and HTML counts for headings, display equations, and Mermaid blocks.
6. Confirm that every page has the notice, the `noindex` tag, and a page-specific description.
7. After a push, read the live pages back over HTTP and confirm the deployed commit.

## Publication boundary

The website, the repository, a second reader at `arunshar.com/reading/rag-interview/`, and the `arunshar/RAG-Interview-Notion-Markdown` repository are public. A content correction must reach all of them, or the copies will disagree. Every push and every visibility change still needs the user's current authorization.
