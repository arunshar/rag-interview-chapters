#!/usr/bin/env python3
"""Build the static book reader from the original Markdown chapters."""
from concurrent.futures import ThreadPoolExecutor
from html import escape, unescape
from pathlib import Path
import hashlib
import json
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
OUT = ROOT / 'docs'
PANDOC = shutil.which('pandoc') or '/opt/local/bin/pandoc'
guide = (SITE / 'navigation-guide.md').read_text()
STYLE_VERSION = hashlib.sha256((SITE / 'assets/style.css').read_bytes()).hexdigest()[:12]
SCRIPT_VERSION = hashlib.sha256((SITE / 'assets/reader.js').read_bytes()).hexdigest()[:12]

def slug(text):
    return re.sub(r'[^\w\- ]', '', text.lower()).replace(' ', '-')

groups = []
for chunk in guide.split('### ')[1:]:
    heading, _, body = chunk.partition('\n')
    units = []
    for match in re.finditer(r'^\| \[([^\]]+)\]\(chapters/([^)#]+\.md)\) \| ([^|]+) \| (\d+) \|', body, re.M):
        title, filename, outcome, minutes = match.groups()
        units.append(dict(title=title, file=filename, outcome=outcome.strip(), minutes=int(minutes), url='chapters/' + Path(filename).stem + '.html', group=heading))
    if units:
        groups.append(dict(title=heading, id=slug(heading), units=units))
units = [u for group in groups for u in group['units']]
assert len(units) == 57, len(units)
assert {u['file'] for u in units} == {p.name for p in (ROOT / 'chapters').glob('*.md')}

def markdown(text):
    # A standalone equals sign in a display equation can be read as a heading.
    text = re.sub(r'^\$\$[ \t]*\n(.*?)\n\$\$[ \t]*$', lambda m: '$$' + re.sub(r'\s+', ' ', m[1]).strip() + '$$', text, flags=re.M | re.S)
    result = subprocess.run([PANDOC, '-f', 'gfm+tex_math_dollars', '-t', 'html5', '--mathml', '--wrap=none'], input=text, text=True, capture_output=True, check=True)
    if result.stderr.strip():
        raise RuntimeError(result.stderr)
    html = result.stdout
    html = re.sub(r'<pre class="mermaid"><code>(.*?)</code></pre>', lambda m: '<figure class="diagram"><div class="diagram-view" role="img" aria-label="Chapter diagram"></div><details><summary>Diagram source</summary><pre><code class="mermaid-source">' + m[1] + '</code></pre></details></figure>', html, flags=re.S)
    html = re.sub(r'(<table>.*?</table>)', r'<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable table">\1</div>', html, flags=re.S)
    return html

def rewrite_links(html, page):
    prefix = '../' if page.startswith('chapters/') else ''
    def replace(m):
        href = unescape(m[1])
        path, marker, fragment = href.partition('#')
        if path.startswith(('https:', 'http:', 'mailto:')) or not path:
            return m[0]
        if path == 'chapters/':
            target = 'index.html'
            marker, fragment = '#', 'complete-contents'
        elif path.startswith('chapters/') and path.endswith('.md'):
            target = path[:-3] + '.html'
        elif Path(path).name in {u['file'] for u in units}:
            target = 'chapters/' + Path(path).stem + '.html'
        elif path == '00_INDEX.md':
            target = 'source-index.html'
        elif path == 'README.md':
            target = 'about.html'
        elif path == 'BOOK.md':
            target = 'index.html'
        elif path.endswith('.md') or path.endswith('.zip') or path.startswith('.agents/'):
            target = 'https://github.com/arunshar/rag-interview-chapters/blob/main/' + path
            return 'href="' + escape(target + (marker + fragment if marker else ''), quote=True) + '"'
        else:
            return m[0]
        return 'href="' + prefix + target + (marker + fragment if marker else '') + '"'
    return re.sub(r'href="([^"]+)"', replace, html)

def sidebar(page):
    prefix = '../' if page.startswith('chapters/') else ''
    result = f'<a class="brand" href="{prefix}index.html"><span class="brand-mark">R</span><span>The RAG Interview<small>STUDY EDITION</small></span></a>'
    result += '<label class="search-label" for="chapter-search">Find a chapter</label><div class="search-box"><input id="chapter-search" type="search" placeholder="Title or chapter number" autocomplete="off"><kbd>/</kbd></div>'
    result += f'<nav class="primary-nav" aria-label="Book navigation"><a href="{prefix}index.html"' + (' aria-current="page"' if page == 'index.html' else '') + f'>Book roadmap</a><a href="{prefix}reading-paths.html"' + (' aria-current="page"' if page == 'reading-paths.html' else '') + '>Reading routes</a></nav><p id="search-status" class="sr-only" role="status"></p><nav class="chapter-nav" aria-label="Chapters">'
    for group in groups:
        is_active = any(u['url'] == page for u in group['units'])
        opened = ' open' if is_active or page == 'index.html' else ''
        label = re.sub(r'^Part ', '', group['title'])
        result += f'<details class="nav-group"{opened}><summary>{escape(label)}</summary><ul>'
        for u in group['units']:
            active = ' aria-current="page"' if u['url'] == page else ''
            result += f'<li><a href="{prefix}{u["url"]}"{active}>{escape(u["title"])}</a></li>'
        result += '</ul></details>'
    result += f'</nav><p id="no-results" hidden>No chapters match. Try “retrieval” or “15”.</p><div class="sidebar-footer"><a href="{prefix}about.html">About this edition</a><a href="{prefix}source-index.html">Original index</a></div>'
    return result

def template(page, title, body, toc=None, unit=None, sequence=None):
    prefix = '../' if page.startswith('chapters/') else ''
    nav = ''
    if sequence is not None:
        prev = units[sequence - 1] if sequence else None
        nxt = units[sequence + 1] if sequence < len(units) - 1 else None
        nav = '<nav class="sequence" aria-label="Previous and next chapters">'
        for neighbor, label in [(prev, 'Previous'), (nxt, 'Next')]:
            if neighbor:
                nav += f'<a href="{prefix}{neighbor["url"]}"><small>{label}</small>{escape(neighbor["title"])}</a>'
            else:
                nav += f'<a href="{prefix}index.html"><small>Book home</small>Return to the roadmap</a>'
        nav += '</nav>'
    toc_html = ''
    if toc:
        toc_html = '<details class="page-toc"><summary>On this page</summary><nav aria-label="On this page">' + ''.join(f'<a href="#{escape(i)}">{escape(t)}</a>' for i, t in toc) + '</nav></details>'
    eyebrow = unit['group'] if unit else 'THE RAG INTERVIEW · STUDY EDITION'
    meta = f'<p class="chapter-meta">{unit["minutes"]} min estimated reading · Unit {sequence + 1} of 57</p>' if unit else ''
    progress = '<div class="reading-progress" aria-hidden="true"><div id="reading-progress-fill"></div></div>' if unit else ''
    html = f'''<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="description" content="A chapter-by-chapter reading guide to The RAG Interview, with a complete roadmap and study routes."><title>{escape(title)} | The RAG Interview</title><link rel="icon" href="{prefix}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="{prefix}assets/style.css?v={STYLE_VERSION}"><script src="{prefix}assets/reader.js?v={SCRIPT_VERSION}" defer data-root="{prefix}"></script></head>
<body data-page="{page}" data-chapter="{'true' if unit else 'false'}"><a class="skip-link" href="#main">Skip to reading</a>{progress}<header class="mobile-header"><button id="menu-toggle" aria-expanded="false" aria-controls="sidebar">Chapters</button><a href="{prefix}index.html">The RAG Interview</a></header><button id="menu-shade" tabindex="-1" aria-label="Close chapter menu" hidden></button><aside class="sidebar" id="sidebar">{sidebar(page)}</aside>
<div class="workspace"><div class="topbar"><a href="{prefix}index.html">Book home</a><div><button id="theme-toggle" aria-label="Switch to light theme">Light theme</button><button id="print-button">Print chapter</button></div></div><main id="main" tabindex="-1"><header class="page-heading"><p class="eyebrow">{escape(eyebrow)}</p><h1>{escape(title)}</h1>{meta}</header>{toc_html}<article class="prose">{body}</article>{nav}<footer class="page-footer"><span>Source book by Hao Hoang. Markdown study edition.</span><a href="#main">Back to top ↑</a></footer></main></div></body></html>'''
    target = OUT / page
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html)

def extract_toc(html):
    return [(i, re.sub('<[^>]+>', '', unescape(t))) for i, t in re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', html, re.S)]

def chapter(item):
    n, unit = item
    source = (ROOT / 'chapters' / unit['file']).read_text()
    body = rewrite_links(markdown(source.split('\n', 1)[1]), unit['url'])
    template(unit['url'], unit['title'], body, extract_toc(body), unit, n)

def main():
    OUT.mkdir(exist_ok=True)
    shutil.copytree(SITE / 'assets', OUT / 'assets', dirs_exist_ok=True)
    (OUT / '.nojekyll').write_text('')
    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(chapter, enumerate(units)))
    home = '<p class="lead">A complete path from RAG fundamentals to system design. Open a chapter, work through the examples, and return to the roadmap whenever you need your bearings.</p><div class="book-stats"><span><strong>41</strong> chapters</span><span><strong>12</strong> parts</span><span><strong>7</strong> appendices</span></div>'
    home += f'<div class="start-reading"><a class="button" href="{units[3]["url"]}">Start with the study guide →</a><a href="reading-paths.html#one-week-interview-path">Interview next week? Take the short route →</a><a id="resume-reading" hidden></a></div>'
    home += '<section id="book-roadmap"><h2>Your book roadmap</h2><p>Follow the parts in order, or choose a <a href="reading-paths.html">reading route</a> for your role. Each chapter opens as its own page.</p>'
    roadmap = guide.split('## Book roadmap\n', 1)[1].split('## Complete contents', 1)[0]
    table_lines = '\n'.join(line for line in roadmap.splitlines() if line.startswith('|'))
    home += markdown(table_lines) + '</section><section id="complete-contents"><h2>Complete contents</h2><p>All 57 study units, including front matter and appendices. Times are reading estimates from the original index.</p>'
    for group in groups:
        home += f'<section class="contents-group" id="{group["id"]}"><h3>{escape(group["title"])}</h3><ul class="chapter-list">'
        for u in group['units']:
            home += f'<li><a href="{u["url"]}"><span class="chapter-title">{escape(u["title"])}</span><span class="reading-time">{u["minutes"]} min</span><span class="chapter-outcome">{escape(u["outcome"])}</span></a></li>'
        home += '</ul></section>'
    home += '</section>'
    template('index.html', 'Your RAG reading desk', home, [('book-roadmap', 'Book roadmap'), ('complete-contents', 'Complete contents')])
    routes = '## Reading routes\n' + guide.split('## Reading routes\n', 1)[1].split('## Edition and provenance', 1)[0]
    body = rewrite_links(markdown(routes), 'reading-paths.html')
    for group in groups:
        body = body.replace(f'href="#{group["id"]}"', f'href="index.html#{group["id"]}"')
    body = body.replace('href="#complete-contents"', 'href="index.html#complete-contents"')
    template('reading-paths.html', 'Choose your reading route', body, extract_toc(body))
    for source, page, title in [('00_INDEX.md', 'source-index.html', 'Original source index'), ('README.md', 'about.html', 'About this study edition')]:
        body = rewrite_links(markdown((ROOT / source).read_text().split('\n', 1)[1]), page)
        template(page, title, body, extract_toc(body))
    (OUT / 'assets' / 'chapters.json').write_text(json.dumps(units, indent=2) + '\n')
    print(f'Built {len(units)} chapter pages and 4 guide pages in {OUT}')

if __name__ == '__main__':
    main()
