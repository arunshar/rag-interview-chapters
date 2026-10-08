# The RAG Interview website

The website contains all 57 study units on separate pages. The home page includes the complete book roadmap. The reader provides chapter filtering, reading routes, previous and next links, a section menu, light and dark themes, and a link to the last chapter opened in the same browser.

The book content comes from the existing Markdown study edition. The source book is by Hao Hoang. Original chapter files remain the source for future builds.

## Publish on GitHub Pages

The website is already built in `docs/`. Publishing does not require Python, Pandoc, Node, or an install step.

1. Extract `RAG-Interview-Website.zip`.
2. Open [the repository](https://github.com/arunshar/rag-interview-chapters). Choose **Add file**, then **Upload files**.
3. Drag the extracted `docs` folder into the upload area and commit the files to `main`. The entry page must be at `docs/index.html`. Keep its `assets` and `chapters` folders together. Include `docs/.nojekyll` when using Git to upload.
4. Open [Settings → Pages](https://github.com/arunshar/rag-interview-chapters/settings/pages).
5. Under **Build and deployment**, select **Deploy from a branch**. Choose **main** and **/docs**, then select **Save**.
6. Wait for the deployment to finish. GitHub says publishing can take up to 10 minutes. Use **Visit site** on the Pages settings page to confirm the live address.

The expected address is [https://arunshar.github.io/rag-interview-chapters/](https://arunshar.github.io/rag-interview-chapters/). This address is a publishing target. It has not been verified as live.

The repository and its GitHub Pages website are public.

## Files in this package

| Path | Purpose |
|---|---|
| `docs/` | Complete prebuilt website to publish |
| `site/assets/` | Reader styles, behavior, icon, and bundled diagram renderer |
| `site/navigation-guide.md` | Chapter outcomes, part groupings, and reading routes |
| `scripts/build_site.py` | Regenerates the website from the original Markdown |
| `WEBSITE.md` | Publishing and maintenance instructions |

Upload `site/`, `scripts/build_site.py`, and `WEBSITE.md` as well if you want the build source stored beside the website. The existing repository already supplies `chapters/`, `README.md`, and `00_INDEX.md`.

## Update the website later

Update the original chapter Markdown or the navigation guide. With Python 3 and Pandoc installed, run this command from the repository root.

```sh
python3 scripts/build_site.py
```

Commit the regenerated `docs/` along with the source changes. GitHub Pages republishes changes pushed to the configured branch and folder.

The original source files are never rewritten by the build script. Conversion joins multiline display equations only in memory to prevent Markdown heading parsing from corrupting equations.

## Reading and rendering

Each chapter loads separately. Chapter titles can be filtered with the sidebar search field. Press `/` to focus that field. Use the chapter's **On this page** menu to jump to a section.

Equations use native MathML. Mermaid 11.4.1 is bundled locally under its MIT license and loads when a diagram approaches the viewport. Each diagram also includes its complete source. No external font, analytics, or rendering service is required.

Theme preference and the last opened chapter are stored only in the reader's browser when browser storage is available. The website has no backend or account system.

## Build verification

The package was checked for missing chapter pages, broken local links and fragments, duplicate HTML identifiers, equation and diagram preservation, and JavaScript syntax. Browser rendering and deployment could not be verified in the current session.

GitHub Pages publishes the prebuilt `docs/` directory from `main` after its publishing source is configured.

## GitHub documentation

- [Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
