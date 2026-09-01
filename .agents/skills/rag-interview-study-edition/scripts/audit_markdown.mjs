#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const packageRoot = path.resolve(process.argv[2] || "output/rag-interview-chapters");
const manifestPath = path.join(packageRoot, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];
const warnings = [];
const results = [];

function add(kind, file, line, message) {
  const target = kind === "error" ? errors : warnings;
  target.push({ file, line, message });
}

function asciiTypography(value) {
  return value
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .replace(/\u00AD/g, "")
    .replace(/\uFB00/g, "ff")
    .replace(/\uFB01/g, "fi")
    .replace(/\uFB02/g, "fl")
    .replace(/\uFB03/g, "ffi")
    .replace(/\uFB04/g, "ffl")
    .replace(/\uFB05/g, "st")
    .replace(/\uFB06/g, "st");
}

function normalizedCaption(value) {
  return asciiTypography(value.replace(/-\s*\n\s*/g, ""))
    .replace(/[`*_]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0370-\u03FF]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTableRow(line) {
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  const cells = [];
  let cell = "";
  let inCode = false;
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char === "`" && value[i - 1] !== "\\") {
      inCode = !inCode;
      cell += char;
    } else if (char === "|" && value[i - 1] !== "\\" && !inCode) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function countWords(value) {
  const clean = value
    .replace(/^\s*```.*$/gm, " ")
    .replace(/^\s*\|.*\|\s*$/gm, " ")
    .replace(/^\s*#{1,6}\s+.*$/gm, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*(?:[-*+] |\d+\. )/gm, " ");
  return clean.match(/[A-Za-z0-9\u0370-\u03FF]+(?:['-][A-Za-z0-9\u0370-\u03FF]+)*/g)?.length || 0;
}

function countSentences(value) {
  return value.match(/[.!?](?=\s|$)/g)?.length || 0;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isTableRow(line) {
  const value = line.trim();
  return value.startsWith("|") && value.endsWith("|") && value.length > 2;
}

function findSection(lines, title) {
  const start = lines.findIndex((line) => line === `## ${title}`);
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^## /.test(lines[i])) {
      end = i;
      break;
    }
  }
  return { start, end, lines: lines.slice(start + 1, end) };
}

for (const unit of manifest.units) {
  const relativeFile = unit.output_file;
  const absoluteFile = path.join(packageRoot, relativeFile);
  if (!fs.existsSync(absoluteFile)) {
    add("error", relativeFile, 0, "Expected file is missing");
    continue;
  }

  const text = fs.readFileSync(absoluteFile, "utf8");
  const lines = text.split("\n");
  const displayLines = lines.at(-1) === "" ? lines.slice(0, -1) : lines;
  const headings = [];
  const mermaidBlocks = [];
  let inFence = false;
  let fenceMarker = null;
  let fenceLanguage = null;
  let fenceStart = null;
  let fenceContent = [];
  let inMath = false;

  if (text.includes("\r")) add("error", relativeFile, 0, "Contains a carriage return");
  if (/[\u2013\u2014]/u.test(text)) add("error", relativeFile, 0, "Contains an en dash or em dash");
  if (/[\u2018\u2019\u201C\u201D\u2026\u00AD\u00A0\uFB00-\uFB06]/u.test(text)) {
    add("error", relativeFile, 0, "Contains a forbidden smart glyph, nonbreaking space, soft hyphen, or ligature");
  }
  if (displayLines.length < 400 || displayLines.length > 900) {
    add("error", relativeFile, 0, `Line count ${displayLines.length} is outside 400 to 900`);
  }
  if (/!\[[^\]]*\]\([^)]*\)/.test(text)) add("error", relativeFile, 0, "Contains a Markdown image embed");
  if (/(?:file:\/\/|\/Users\/|[A-Za-z]:\\\\)/.test(text)) add("error", relativeFile, 0, "Contains a local path");
  if (/\[[^\]]+\]\((?:file:\/\/|\/Users\/|\.{0,2}\/)[^)]*\)/.test(text)) add("error", relativeFile, 0, "Contains a link to a local file");
  if (/(?:<!--[\s\S]*?-->|<\/?[A-Za-z][^>]*>)/.test(text)) add("error", relativeFile, 0, "Contains raw HTML");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const lineNumber = i + 1;
    const fenceMatch = line.match(/^\s*(```+|~~~+)\s*([^\s]*)?.*$/);
    if (fenceMatch) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fenceMatch[1][0];
        fenceLanguage = fenceMatch[2] || "";
        fenceStart = lineNumber;
        fenceContent = [];
      } else if (fenceMatch[1][0] === fenceMarker) {
        if (fenceLanguage === "mermaid") {
          mermaidBlocks.push({ start: fenceStart, content: fenceContent.join("\n") });
        }
        inFence = false;
        fenceMarker = null;
        fenceLanguage = null;
        fenceStart = null;
        fenceContent = [];
      } else {
        fenceContent.push(line);
      }
      continue;
    }
    if (inFence) {
      fenceContent.push(line);
      continue;
    }

    if (line.trim() === "$$") {
      inMath = !inMath;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) headings.push({ level: heading[1].length, title: heading[2], line: lineNumber });

    if (inMath && /\\operatorname\*?\s*\{/.test(line)) {
      add("error", relativeFile, lineNumber, "Contains GitHub-blocked \\operatorname. Use \\mathop{\\text{label}} instead");
    }
    if (inMath && /\^\*/.test(line)) {
      add("error", relativeFile, lineNumber, "Contains an unbraced superscript star that GitHub Markdown can consume. Use ^{*}");
    }

    if (!inMath) {
      if (/\\[([]|\\[)\]]/.test(line)) add("error", relativeFile, lineNumber, "Contains a raw LaTeX inline or display delimiter");
      if (/\\(?:begin|end|frac|dfrac|tfrac|text|mathrm|mathbf|operatorname|cdot|times|sqrt|sum|prod|left|right|theta|Delta|alpha|beta|gamma|ell|mid|ldots|dots|geq|leq|approx|star|mathbb|overline|underbrace|hat|log|exp|min|max|arg)\b/.test(line)) {
        add("error", relativeFile, lineNumber, "Contains a raw LaTeX command outside display math");
      }
      if (!isTableRow(line) && !/^#{1,6}\s+/.test(line) && line.includes(";")) {
        add("error", relativeFile, lineNumber, "Contains a prose semicolon");
      }
    }
  }

  if (inFence) add("error", relativeFile, fenceStart || 0, "Has an unclosed fenced code block");
  if (inMath) add("error", relativeFile, 0, "Has an unclosed display math block");
  if (headings.length === 0 || headings[0].level !== 1) add("error", relativeFile, 1, "First heading is not level 1");
  if (headings.filter((item) => item.level === 1).length !== 1) add("error", relativeFile, 0, "File must contain exactly one level 1 heading");

  const firstHeadingIndex = lines.findIndex((line) => /^#\s+/.test(line));
  let purposeStart = firstHeadingIndex + 1;
  while (purposeStart < lines.length && !lines[purposeStart].trim()) purposeStart += 1;
  let purposeEnd = purposeStart;
  while (purposeEnd < lines.length && lines[purposeEnd].trim() && !/^#{1,6}\s+/.test(lines[purposeEnd])) purposeEnd += 1;
  const purposeSentences = countSentences(lines.slice(purposeStart, purposeEnd).join(" "));
  if (purposeSentences !== 1) add("error", relativeFile, purposeStart + 1, `Purpose paragraph has ${purposeSentences} sentences instead of 1`);
  for (let i = 1; i < headings.length; i += 1) {
    if (headings[i].level > headings[i - 1].level + 1) {
      add("error", relativeFile, headings[i].line, `Heading jumps from level ${headings[i - 1].level} to ${headings[i].level}`);
    }
  }

  const expectedSections = ["TL;DR", "The story", "Decoder table", "Core mechanics", "Diagrams", "Whiteboard pack", "Interview traps"];
  const levelTwo = headings.filter((item) => item.level === 2).map((item) => item.title);
  const requiredObserved = levelTwo.filter((title) => expectedSections.includes(title));
  if (requiredObserved.join("|") !== expectedSections.join("|")) {
    add("error", relativeFile, 0, `Required level 2 section order is wrong: ${requiredObserved.join(" | ")}`);
  }
  const extraLevelTwo = levelTwo.filter((title) => !expectedSections.includes(title) && title !== "Key numbers");
  if (extraLevelTwo.length > 0) add("error", relativeFile, 0, `Unexpected level 2 sections: ${extraLevelTwo.join(" | ")}`);
  if (levelTwo.includes("Key numbers") && levelTwo.at(-1) !== "Key numbers") {
    add("error", relativeFile, 0, "Key numbers must be the final level 2 section");
  }

  const tldr = findSection(lines, "TL;DR");
  if (tldr) {
    const bulletCount = tldr.lines.filter((line) => /^-\s+/.test(line)).length;
    if (bulletCount < 5 || bulletCount > 8) add("error", relativeFile, tldr.start + 1, `TL;DR has ${bulletCount} bullets, expected 5 to 8`);
  }

  const decoder = findSection(lines, "Decoder table");
  if (decoder) {
    let foundDecoder = false;
    for (let i = decoder.start + 1; i + 1 < decoder.end; i += 1) {
      if (isTableRow(lines[i]) && isTableRow(lines[i + 1])) {
        const header = splitTableRow(lines[i]);
        const delimiter = splitTableRow(lines[i + 1]);
        if (delimiter.every((cell) => /^:?-{3,}:?$/.test(cell))) {
          foundDecoder = true;
          if (header.length !== 3) add("error", relativeFile, i + 1, `Decoder table has ${header.length} columns instead of 3`);
          break;
        }
      }
    }
    if (!foundDecoder) add("error", relativeFile, decoder.start + 1, "Decoder table is missing a valid GFM table");
  }

  for (let i = 1; i < lines.length; i += 1) {
    if (!isTableRow(lines[i]) || !isTableRow(lines[i - 1])) continue;
    const delimiter = splitTableRow(lines[i]);
    if (!delimiter.every((cell) => /^:?-{3,}:?$/.test(cell))) continue;
    const expectedColumns = splitTableRow(lines[i - 1]).length;
    if (delimiter.length !== expectedColumns) add("error", relativeFile, i + 1, "Table delimiter column count differs from its header");
    let row = i + 1;
    while (row < lines.length && isTableRow(lines[row])) {
      const observedColumns = splitTableRow(lines[row]).length;
      if (observedColumns !== expectedColumns) {
        add("error", relativeFile, row + 1, `Table row has ${observedColumns} columns, expected ${expectedColumns}`);
      }
      row += 1;
    }
  }

  const whiteboard = findSection(lines, "Whiteboard pack");
  let scriptWords = null;
  if (whiteboard) {
    const absoluteStart = whiteboard.start + 1;
    const scriptHeadingOffset = whiteboard.lines.findIndex((line) => /^### .*script/i.test(line));
    if (scriptHeadingOffset < 0) {
      add("error", relativeFile, whiteboard.start + 1, "Whiteboard pack has no level 3 script heading");
    } else {
      const scriptHeadingIndex = absoluteStart + scriptHeadingOffset;
      let scriptEnd = whiteboard.end;
      for (let i = scriptHeadingIndex + 1; i < whiteboard.end; i += 1) {
        if (/^#{2,3}\s+/.test(lines[i])) {
          scriptEnd = i;
          break;
        }
      }
      scriptWords = countWords(lines.slice(scriptHeadingIndex + 1, scriptEnd).join("\n"));
      if (scriptWords < 90 || scriptWords > 100) add("error", relativeFile, scriptHeadingIndex + 1, `Whiteboard script has ${scriptWords} words, expected 90 to 100`);
    }
    if (!whiteboard.lines.some((line) => /^\d+\.\s+/.test(line))) {
      add("error", relativeFile, whiteboard.start + 1, "Whiteboard pack has no numbered drawing order");
    }
    const firstDrawingOffset = whiteboard.lines.findIndex((line) => /^\d+\.\s+/.test(line));
    if (scriptHeadingOffset >= 0 && firstDrawingOffset >= scriptHeadingOffset) {
      add("error", relativeFile, whiteboard.start + 1, "Whiteboard spoken script appears before the numbered drawing order");
    }
  }

  const traps = findSection(lines, "Interview traps");
  let trapCount = null;
  if (traps) {
    const trapHeadings = [];
    for (let i = traps.start + 1; i < traps.end; i += 1) {
      if (/^###\s+/.test(lines[i])) trapHeadings.push(i);
    }
    trapCount = trapHeadings.length;
    if (trapCount < 3 || trapCount > 5) add("error", relativeFile, traps.start + 1, `Interview traps has ${trapCount} prompts, expected 3 to 5`);
    for (let i = 0; i < trapHeadings.length; i += 1) {
      const start = trapHeadings[i] + 1;
      const end = trapHeadings[i + 1] || traps.end;
      const answer = lines.slice(start, end).join(" ").trim();
      if (countWords(answer) < 3) add("error", relativeFile, trapHeadings[i] + 1, "Interview trap does not have a substantive answer");
      const sentenceCount = countSentences(answer);
      if (sentenceCount < 2 || sentenceCount > 3) {
        add("error", relativeFile, trapHeadings[i] + 1, `Interview trap answer has ${sentenceCount} sentences, expected 2 or 3`);
      }
    }
  }

  for (const figure of unit.figures || []) {
    const expression = new RegExp(`^\\s*>?\\s*\\*{0,2}Figure\\s+${escapeRegex(figure.number)}:\\*{0,2}\\s*(.*)$`);
    const matches = lines.map((line, index) => ({ match: line.match(expression), index })).filter((item) => item.match);
    if (matches.length !== 1) {
      add("error", relativeFile, 0, `Figure ${figure.number} caption occurs ${matches.length} times, expected once`);
    } else if (normalizedCaption(matches[0].match[1]) !== normalizedCaption(figure.caption)) {
      add("error", relativeFile, matches[0].index + 1, `Figure ${figure.number} caption differs from the manifest`);
    }
  }

  for (const table of unit.tables || []) {
    const expression = new RegExp(`^\\s*>?\\s*\\*{0,2}Table\\s+${escapeRegex(table.number)}:\\*{0,2}\\s*(.*)$`);
    const matches = lines.map((line, index) => ({ match: line.match(expression), index })).filter((item) => item.match);
    if (matches.length !== 1) {
      add("error", relativeFile, 0, `Table ${table.number} caption occurs ${matches.length} times, expected once`);
    } else if (normalizedCaption(matches[0].match[1]) !== normalizedCaption(table.caption)) {
      add("error", relativeFile, matches[0].index + 1, `Table ${table.number} caption differs from the manifest`);
    }
  }

  const observedFigureHeadings = lines.filter((line) => /^### Figure\s+/.test(line)).length;
  const observedTableHeadings = lines.filter((line) => /^### Table\s+/.test(line)).length;
  if (observedFigureHeadings !== unit.figure_count) add("error", relativeFile, 0, `Has ${observedFigureHeadings} figure headings, manifest requires ${unit.figure_count}`);
  if (observedTableHeadings !== unit.table_count) add("error", relativeFile, 0, `Has ${observedTableHeadings} table headings, manifest requires ${unit.table_count}`);
  for (const block of mermaidBlocks) {
    if (!/^\s*(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|quadrantChart|mindmap|timeline|sankey-beta|xychart-beta)\b/m.test(block.content)) {
      add("error", relativeFile, block.start, "Mermaid block has no recognized diagram declaration");
    }
    for (const [offset, mermaidLine] of block.content.split("\n").entries()) {
      const lineNumber = block.start + offset + 1;
      if (/^\s*(?:style|classDef|linkStyle)\b.*\b(?:fill|color|background|stroke)\s*:/i.test(mermaidLine)) {
        add("error", relativeFile, lineNumber, "Contains theme-dependent Mermaid color styling. Use theme defaults and distinguish nodes with shapes, stroke-width, or stroke-dasharray");
      }
      if (/^\s*%%\{.*\b(?:theme|themeVariables|themeCSS)\b/i.test(mermaidLine)) {
        add("error", relativeFile, lineNumber, "Contains a Mermaid theme override. Let the host renderer select its light or dark theme");
      }
    }
  }

  results.push({
    file: relativeFile,
    lines: displayLines.length,
    scriptWords,
    traps: trapCount,
    figures: unit.figure_count,
    tables: unit.table_count,
    mermaid: mermaidBlocks.length,
  });
}

const chapterDirectory = path.join(packageRoot, "chapters");
const expected = new Set(manifest.units.map((unit) => path.resolve(packageRoot, unit.output_file)));
for (const name of fs.readdirSync(chapterDirectory).filter((item) => item.endsWith(".md"))) {
  const absolute = path.resolve(chapterDirectory, name);
  if (!expected.has(absolute)) add("error", `chapters/${name}`, 0, "Markdown file is not declared in the manifest");
}

const report = {
  packageRoot,
  unitsExpected: manifest.units.length,
  unitsChecked: results.length,
  totalLines: results.reduce((sum, item) => sum + item.lines, 0),
  totalFigures: results.reduce((sum, item) => sum + item.figures, 0),
  totalTables: results.reduce((sum, item) => sum + item.tables, 0),
  totalMermaid: results.reduce((sum, item) => sum + item.mermaid, 0),
  errors,
  warnings,
  results,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
