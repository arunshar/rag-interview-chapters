# Study unit contract

Use this contract when the user wants the strict whiteboard-ready study-edition format used by the completed case study. Adapt only when the user requests a different format.

## Required order

Every unit contains:

1. One level-1 title.
2. One sentence stating what the unit is for.
3. `## TL;DR`
4. `## The story`
5. `## Decoder table`
6. `## Core mechanics`
7. `## Diagrams`
8. `## Whiteboard pack`
9. `## Interview traps`
10. Optional `## Key numbers` as the final level-2 section.

No other level-2 sections are allowed under the strict contract.

## TL;DR

- Use five to eight bullets.
- Translate every term into plain language.
- State mechanisms, decisions, failure modes, and meaningful trade-offs.
- Do not use empty framing or generic motivation.

## The story

- Use one sustained explanatory story or analogy.
- Keep component roles stable throughout the section.
- Translate any unavoidable jargon in the same sentence.
- Cover the full unit, not only its opening concept.

## Decoder table

Use exactly three columns:

| Term | Plain-English meaning | Why it matters |
|---|---|---|

The table is exhaustive for terms used in the unit. Include acronyms, symbols, metrics, datasets, benchmarks, models, papers, organizations, standards, laws, named systems, historical references, and overloaded notation.

## Core mechanics

For each source concept, cover:

- what it is
- why it exists
- what fails without it
- cost or complexity when applicable and supported by the source

Use short active sentences. Depth comes from source coverage and calculations, not dense prose.

## Diagrams

Recreate every numbered source figure and table:

- architecture and flow diagrams as triple-backtick Mermaid blocks
- matrices and structured comparisons as Markdown tables
- layout-sensitive or unsupported diagrams as ASCII code blocks
- unrepresentable visuals as precise blockquoted descriptions

Let the active renderer theme choose Mermaid fills, text colors, backgrounds, and stroke colors. Encode semantic differences with shapes, border width, and dash patterns so diagrams remain legible in light and dark themes.

Each numbered visual carries its number and source caption or reference exactly as the manifest defines it. Do not invent figure or table numbers for unnumbered artifacts.

## Whiteboard pack

Use these level-3 subsections:

```markdown
### What to draw

1. First box or label.
2. Next arrow or relationship.

### Spoken script

One conversational paragraph of roughly 100 words.
```

The drawing order comes before the script. The script answers the unit's core idea cold and does not use a list.

## Interview traps

- Include three to five questions.
- Give every question a two or three sentence answer.
- Include a negative-choice or trade-off question when the source supports one.
- Test causal understanding, not vocabulary recall.

## Key numbers

Include every concrete count, threshold, percentage, latency, size, dimension, complexity relation, trade-off, and worked result the source commits to. Omit the section when the source has none.

Distinguish direct source values, recomputed results, and preserved source discrepancies.

## Formatting rails

- Use ATX headings in strict order.
- Use GitHub-flavored tables.
- Keep every display equation delimiter `$$` on its own line.
- Keep raw LaTeX commands inside display math only.
- Do not use `\operatorname` because GitHub's math renderer rejects it. Use `\mathop{\text{label}}`. Add `\limits` when replacing starred operator behavior.
- Write superscript stars as `^{*}`. An unbraced `^*` can be consumed as Markdown emphasis before GitHub sends the expression to MathJax.
- Prefer Unicode and plain-language inline mathematics.
- Use no em dash or en dash glyphs.
- Use no prose semicolon or comma splice as a dash substitute.
- Normalize smart quotes, ligatures, nonbreaking spaces, and soft hyphens.
- Use no raw HTML, footnotes, image embeds, base64, or local filesystem links.
- Use no fixed Mermaid `fill`, `color`, `background`, or `stroke` properties. Theme defaults own color contrast. Use `stroke-width` and `stroke-dasharray` for emphasis.
- Define every acronym on first use in each unit.
- Keep each unit self-contained.
- Target 400 to 900 lines per unit. Split only when the user permits and a faithful unit cannot fit.

## Evidence rules

- The PDF is the content source unless the user authorizes outside research.
- If external research is authorized, label which content it supports.
- Do not repair a source contradiction without recording it.
- Do not treat extracted text as complete when a rendered page visibly clips or rearranges content.
- Do not call a unit verified until a non-author has checked its source range.
