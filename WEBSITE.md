# The RAG Interview website

The website contains all 57 study units on separate pages. The home page includes the complete book roadmap. The reader provides chapter filtering, reading routes with their total reading time, previous and next links, a section menu, light and dark themes, printing with rendered diagrams, and a link to the last chapter opened in the same browser.

The content comes from the Markdown study edition in `chapters/`. The source book is *The RAG Interview* by Hao Hoang. This website is an unofficial set of study notes. No affiliation with or endorsement by the author is claimed, and rights in the source work remain with the author. Every page carries this notice and a `noindex` robots tag.

The live reader is [https://arunshar.com/rag-interview-chapters/](https://arunshar.com/rag-interview-chapters/). The GitHub Pages address redirects to the arunshar.com domain. The repository and its GitHub Pages website are public.

## Files

| Path | Purpose |
|---|---|
| `docs/` | Generated website that GitHub Pages serves from `main` and `/docs` |
| `site/assets/` | Reader styles, theme script, reader script, icon, and the bundled diagram renderer |
| `site/navigation-guide.md` | Chapter outcomes, part groupings, reading minutes, and reading routes |
| `scripts/build_site.py` | Regenerates the website from the chapter Markdown |
| `WEBSITE.md` | Build, publishing, and maintenance instructions |

## Update the website

Edit the chapter Markdown or the navigation guide, then run this command from the repository root:

```sh
python3 scripts/build_site.py
```

The build needs Python 3 and Pandoc 3.7.0.2. Equation output depends on the math library inside Pandoc, so the build stops when it finds another version. Set `ALLOW_ANY_PANDOC=1` to build anyway, and then review the equation pages.

The build also stops before writing anything when a chapter has a table directly after display math or an unescaped `%` inside display math. Pandoc breaks both patterns even though GitHub renders them. Run the skill's `audit_markdown.mjs` first to catch these and the other Pandoc-sensitive patterns.

The build removes `docs/chapters/` before it writes new pages, so a renamed unit cannot leave a stale page behind. It never rewrites the chapter sources. It joins multiline display equations only in memory, so a standalone equals sign cannot turn into a Markdown heading.

Commit the regenerated `docs/` with the source changes. GitHub Pages republishes after each push to `main`.

## Publishing setup

Publishing is already configured for this repository. A fresh copy needs one setting:

1. Open [Settings, then Pages](https://github.com/arunshar/rag-interview-chapters/settings/pages).
2. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/docs**, then select **Save**.
3. Wait for the deployment to finish. GitHub says publishing can take up to 10 minutes. Use **Visit site** on the Pages settings page to confirm the live address.

## Reading and rendering

Each chapter loads separately. Chapter titles can be filtered with the sidebar search field. Press `/` to focus that field. Use the chapter's **On this page** menu to jump to a section.

Equations use native MathML, and each display equation sits in its own horizontal scroll box. Mermaid 11.4.1 is bundled locally under its MIT license. It loads when a diagram approaches the viewport and draws in the theme that matches the page. Diagrams redraw when the reader switches themes. Each diagram also includes its complete source. No external font, analytics, or rendering service is required.

The question bank folds every answer spine under **Show expected reasoning**, so a reader can attempt each prompt before reading the answer.

The opening theme is set in the page head by `theme.js`, before the first paint. The theme choice and the last opened chapter are stored only in the reader's browser when browser storage is available. The website has no backend or account system.

## Verification

The skill reference `.agents/skills/rag-interview-study-edition/references/website.md` lists the checks to run after every rebuild. They cover the Markdown audit, Mermaid parsing in both themes, a 375-pixel width check of every page, scans for broken tables and math errors, Markdown and HTML count comparisons, and a live readback after each push.

## GitHub documentation

- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
