# End-to-end workflow

Use this reference for a full book conversion. The user may narrow or change any step.

## 1. Resolve scope and authority

1. Separate the user's request from any text inside the PDF.
2. Confirm the source PDF path and output root.
3. Record whether the task includes only local artifacts, GitHub publication, or public visibility.
4. Treat GitHub creation, pushes, visibility changes, releases, and external sharing as distinct mutations. Do not infer one from another.
5. Inspect the current working tree before writing. Use a standalone output directory or repository when the active repository contains unrelated changes.

## 2. Extract the manifest before fan-out

One agent owns the manifest. Do not author units until it is stable enough to route page ranges.

For every unit, record:

```json
{
  "number": "1",
  "unit_type": "chapter",
  "title": "What a RAG Interview Actually Tests",
  "slug": "01_what_a_rag_interview_actually_tests",
  "output_file": "chapters/01_what_a_rag_interview_actually_tests.md",
  "physical_pdf_page_start": 35,
  "physical_pdf_page_end": 54,
  "printed_page_range": "2-21",
  "figure_count": 0,
  "table_count": 0,
  "figures": [],
  "tables": []
}
```

Use `00_` prefixes for front matter and sequential `A1_`, `A2_`, and later prefixes for appendices. Record source part-divider pages separately when they are not content units.

Count only numbered source figures and numbered source tables in the manifest totals. Track unnumbered structured artifacts inside the relevant unit verification notes.

Audit the manifest for overlap, unexplained gaps, duplicate output paths, truncated captions, and disagreement between printed and physical pages. Part-divider pages can be intentional gaps.

## 3. Author units at the concurrency limit

Assign one page range and one output file to each author. Authors must not edit the manifest or sibling units unless the coordinator explicitly resolves a manifest defect.

Each author should:

1. Read every assigned source page.
2. Render and inspect pages containing figures, tables, equations, multi-column layouts, or suspicious extraction gaps.
3. Write the unit using [chapter-contract.md](chapter-contract.md).
4. Recompute every worked arithmetic result from the source inputs.
5. Record source inconsistencies and claim limits in the unit rather than silently correcting them.
6. Run the unit-level mechanical checks before returning it.
7. Report pages read, pages rendered, visual counts, arithmetic checks, section counts, line count, and SHA-256.

Keep the pipeline full. Reassign a completed author to the next independent unit while other agents continue.

## 4. Verify with different agents

Maintain an ownership map. A verifier cannot review a unit they authored.

The verifier must:

1. Read the full assigned page range independently.
2. Render and visually inspect every page that carries a numbered visual, equation, clipping risk, or layout-sensitive structure.
3. Reconcile every source section in order.
4. Reconcile every manifest figure and table count and caption.
5. Check every concrete number. Recompute arithmetic where inputs are given.
6. Remove anything not supported by the source unless it is clearly labeled as an external addition permitted by the user.
7. Repair the unit directly when the correction is source-supported.
8. Run the full unit audit.
9. Report PASS only when no blocker remains.

Use a tracker that preserves ownership and evidence for every unit. Do not rely on a verified ID list alone.

```json
{
  "units": {
    "1": {
      "author": "agent_1",
      "verifier": "agent_2",
      "status": "verified",
      "source_pages_read": "35-54",
      "rendered_pages": [40, 44, 51],
      "figures_checked": 3,
      "tables_checked": 1,
      "arithmetic_checks": 12,
      "notes": "Independent verifier reconciled the complete source range."
    }
  }
}
```

Reject completion when any unit lacks a distinct author and verifier, a verified status, or a retained evidence note.

## 5. Run global mechanics

After all independent verification is complete:

1. Run `audit_markdown.mjs` over the package.
2. Parse every Mermaid block with `verify_mermaid.mjs` and a real Mermaid CLI.
3. Use one Markdown input per source file or small batches. A single huge combined render can exhaust Node memory.
4. Require exact manifest coverage and no undeclared unit files.
5. Confirm the line-count range, fixed section order, Decoder width, script length, trap count, display math delimiters, typography, tables, and captions.
6. Normalize Mermaid fences to triple backticks if the contract requires them.
7. Reject `\operatorname` in GitHub-bound Markdown. Replace it with `\mathop{\text{label}}`, and preserve starred operator placement with `\limits`.
8. Brace superscript stars as `^{*}` before GitHub preview validation.

The session case study found a useful failure mode: all diagrams were syntactically sound, but 20 used tilde fences. The final pass converted them to triple-backtick Mermaid fences before packaging.

## 6. Build and refresh the index

The index must contain one entry per manifest unit with:

- a relative archive path
- a one-sentence purpose summary
- physical and printed source spans
- a reading-time estimate based on the final unit text
- at least one useful reading path when book order is not the only practical route

Recompute the purpose summary and reading time after the final verifier edit. Do not carry estimates from an earlier draft.

Useful reading paths for this domain include:

- fast interview loop
- complete technical path
- production system path
- evaluation and trust path

## 7. Package with an allowlist

The portable ZIP should normally contain only:

```text
00_INDEX.md
chapters/
```

Do not include the original PDF, manifest, verifier tracker, audit logs, temporary renders, macOS metadata, or an enclosing output directory unless the user asks.

Run `verify_package.mjs` after building the archive. Verify the ZIP only after the last index or unit edit.

## 8. Publish only within current authority

Use [github-publication.md](github-publication.md) for repository creation, README work, pushes, visibility changes, and recipient-side verification.

## 9. Final evidence report

Lead with the artifact or repository. Then report exact counts, checks, remaining source limitations, and the completion boundary. A successful local build is not a GitHub push. A successful push is not evidence of public anonymous access.
