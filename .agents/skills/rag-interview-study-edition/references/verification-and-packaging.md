# Verification and packaging

Use this reference after unit authoring or when repairing an existing edition.

## Read-only audit boundary

An audit request authorizes inspection and verification only. Do not rebuild the index, overwrite the ZIP, repair a unit, commit, push, or change repository visibility unless the user also requested that mutation.

## Independent source verification

Mechanical validation is necessary but not sufficient. For every unit, retain evidence that a different agent:

- read the complete source page range
- rendered every layout-sensitive page
- reconciled all sections in source order
- reconciled numbered figures and tables
- checked concrete numbers and recomputed arithmetic
- recorded source defects or underdetermined examples
- fixed supported defects in the unit

Keep author and verifier ownership explicit. A coordinator can verify a unit only when the coordinator did not author it.

## Mechanical unit audit

Run:

```text
RAG_AUDIT_DIR=$(mktemp -d)
node scripts/audit_markdown.mjs /absolute/path/to/package-root > "$RAG_AUDIT_DIR/audit.json"
```

Then inspect:

```text
jq '{errors:(.errors|length),warnings:(.warnings|length),unitsExpected,unitsChecked,totalLines,totalFigures,totalTables,totalMermaid,minLines:(.results|map(.lines)|min),maxLines:(.results|map(.lines)|max)}' "$RAG_AUDIT_DIR/audit.json"
```

Require zero errors and zero warnings before packaging.

The audit checks:

1. Carriage returns.
2. Raw LaTeX outside display math.
3. Fence and display-math closure.
4. Table integrity.
5. Forbidden dash and smart glyphs.
6. GitHub-blocked math macros and Markdown-sensitive math syntax, including `\operatorname` and unbraced `^*`.
7. Mermaid declarations, fixed color overrides, and theme configuration.
8. Heading order and exact level-2 section order.
9. Unit purpose, summary bullets, Decoder width, whiteboard sequence and script, and interview-trap sentence counts.
10. Line range, manifest captions, figure and table counts, and undeclared files.

## Real Mermaid parsing

The unit auditor checks declarations, not the full Mermaid grammar. Parse every block with a real Mermaid parser or CLI.

Prefer per-file or small-batch Markdown inputs. A single 175-diagram input reached the Node heap limit in the completed session. Per-file rendering with limited parallelism produced all 175 artifacts successfully.

Run the bundled helper from the skill directory:

```text
node scripts/verify_mermaid.mjs /absolute/path/to/package-root
```

Pass an explicit Mermaid CLI path as the second argument when `mmdc` is not on `PATH`. The optional third argument controls parallelism from one to eight. The optional fourth argument selects the Mermaid theme and defaults to `default`. The helper extracts each block into an isolated `.mmd` file, renders it to SVG, compares successful renders with the source block count, and deletes its temporary directory.

Run a second pass with the dark theme before GitHub publication:

```text
node scripts/verify_mermaid.mjs /absolute/path/to/package-root mmdc 3 dark
```

Parser success does not prove readable contrast. The Markdown auditor rejects fixed Mermaid `fill`, `color`, `background`, and `stroke` properties while allowing `stroke-width` and `stroke-dasharray`. After a diagram-style repair, inspect the affected figures in GitHub light and dark appearances.

## Index verification

Require exactly one of each per manifest unit:

- archive entry
- one-sentence summary
- source span
- estimated reading time

The summary must match the final purpose paragraph. The reading-time estimate must use the final unit text. Validate all relative paths and reading-route anchors.

## ZIP build

Build or refresh the ZIP only when the user requested packaging or a repair that requires it. A read-only audit uses the existing ZIP.

Build from the package root so the archive does not contain an enclosing directory:

```text
zip -r -X -q rag-interview-chapters.zip 00_INDEX.md chapters
```

Build a fresh archive. Do not update an old ZIP that could retain stale entries.

The exact expected files are:

```text
00_INDEX.md
chapters/<every manifest output file>
```

## ZIP verification

Run:

```text
node scripts/verify_package.mjs /absolute/path/to/package-root
```

The verifier checks:

- manifest uniqueness and unit existence
- no undeclared Markdown unit files
- index coverage
- ZIP integrity
- exact archive allowlist
- no PDF, manifest, tracker, audit log, or macOS metadata in the ZIP
- byte equality between every extracted file and the package root
- final SHA-256

## Final tree and acceptance report

Print the tree with file sizes and unit line counts. Report all acceptance boxes as checked only when the evidence supports them.

Minimum acceptance list:

```text
[x] every manifest unit has a chapter file
[x] figure and table counts match the manifest for every unit
[x] every file passed all requested lint checks
[x] every unit was verified by a non-author agent
[x] every unit has the required sections in order
[x] no unit exceeds the line ceiling
[x] ZIP built, extracted, and byte-verified
```

An unchecked item is a blocker. Fix it or report the task incomplete.
