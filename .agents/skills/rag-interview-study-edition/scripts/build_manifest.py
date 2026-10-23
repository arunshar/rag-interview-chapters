"""Reconstruct manifest.json from 00_INDEX.md order and the current chapter files.

Use it when the creation-time manifest is missing. Captions are read from the units themselves,
so the result checks structure and count drift, not fidelity to the source book.
Usage: python3 build_manifest.py <package-root>
"""
import json, re, sys
from pathlib import Path

root = Path(sys.argv[1])
index = (root / '00_INDEX.md').read_text(encoding='utf-8')
order = []
for m in re.finditer(r'chapters/([A-Za-z0-9_]+\.md)', index):
    if m.group(1) not in order:
        order.append(m.group(1))
files = sorted(p.name for p in (root / 'chapters').glob('*.md'))
assert set(order) == set(files), (set(files) - set(order), set(order) - set(files))

def captions(lines, kind):
    out = []
    for line in lines:
        m = re.match(rf'^\s*>?\s*\*{{0,2}}{kind}\s+([A-Z]?\d+(?:\.\d+)*):\*{{0,2}}\s*(.*)$', line)
        if m:
            out.append({'number': m.group(1), 'caption': m.group(2)})
    return out

units = []
for name in order:
    lines = (root / 'chapters' / name).read_text(encoding='utf-8').split('\n')
    units.append({
        'slug': name[:-3],
        'title': lines[0].lstrip('# ').strip(),
        'output_file': f'chapters/{name}',
        'figure_count': sum(1 for l in lines if re.match(r'^### Figure\s+', l)),
        'table_count': sum(1 for l in lines if re.match(r'^### Table\s+', l)),
        'figures': captions(lines, 'Figure'),
        'tables': captions(lines, 'Table'),
    })
manifest = {
    '_provenance': 'Reconstructed from 00_INDEX.md order and the current chapter files. Page spans live in 00_INDEX.md.',
    'units': units,
}
(root / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(len(units), 'units', sum(u['figure_count'] for u in units), 'figures', sum(u['table_count'] for u in units), 'tables',
      sum(len(u['figures']) for u in units), 'figure captions', sum(len(u['tables']) for u in units), 'table captions')
