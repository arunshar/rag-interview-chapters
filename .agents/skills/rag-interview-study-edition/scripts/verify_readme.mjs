#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repositoryRoot = path.resolve(process.argv[2] || ".");
const readmePath = path.join(repositoryRoot, "README.md");
const chapterDirectory = path.join(repositoryRoot, "chapters");
const errors = [];

function fail(message) {
  errors.push(message);
}

function lineCount(value) {
  return value.split("\n").length - (value.endsWith("\n") ? 1 : 0);
}

function splitTableRow(line) {
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  const cells = [];
  let cell = "";
  let inCode = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === "`" && value[index - 1] !== "\\") {
      inCode = !inCode;
      cell += character;
    } else if (character === "|" && value[index - 1] !== "\\" && !inCode) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function walk(directory, base = "") {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const relative = path.join(base, entry.name);
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute, relative) : [relative];
  });
}

if (!fs.existsSync(readmePath)) fail("README.md is missing");
if (!fs.existsSync(chapterDirectory)) fail("chapters directory is missing");

const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
const lines = readme.split("\n");
const chapterFiles = fs.existsSync(chapterDirectory)
  ? fs.readdirSync(chapterDirectory).filter((name) => name.endsWith(".md")).sort()
  : [];
const chapterTexts = chapterFiles.map((name) => fs.readFileSync(path.join(chapterDirectory, name), "utf8"));

const links = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
const relativeLinks = links.filter((link) => !/^(?:https?:|mailto:|#)/.test(link));
for (const link of relativeLinks) {
  const filePart = decodeURIComponent(link.split("#")[0]);
  if (filePart && !fs.existsSync(path.resolve(repositoryRoot, filePart))) fail(`broken relative link: ${link}`);
}

const linkedChapterFiles = new Set(
  links.filter((link) => /^chapters\/[^/]+\.md(?:#.*)?$/.test(link)).map((link) => link.split("#")[0]),
);
for (const name of chapterFiles) {
  const relative = `chapters/${name}`;
  if (!linkedChapterFiles.has(relative)) fail(`README does not link to ${relative}`);
}

let inFence = false;
let fenceStart = null;
const headingLevels = [];
for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index];
  if (/^```/.test(line)) {
    inFence = !inFence;
    fenceStart = inFence ? index + 1 : null;
    continue;
  }
  if (inFence) continue;
  const heading = line.match(/^(#{1,6})\s+/);
  if (heading) headingLevels.push({ level: heading[1].length, line: index + 1 });
}
if (inFence) fail(`unclosed code fence starting at line ${fenceStart}`);
for (let index = 1; index < headingLevels.length; index += 1) {
  if (headingLevels[index].level > headingLevels[index - 1].level + 1) {
    fail(`heading jump at line ${headingLevels[index].line}`);
  }
}

for (let index = 0; index < lines.length;) {
  if (!/^\|.*\|$/.test(lines[index])) {
    index += 1;
    continue;
  }
  const start = index;
  const block = [];
  while (index < lines.length && /^\|.*\|$/.test(lines[index])) {
    block.push(lines[index]);
    index += 1;
  }
  const widths = block.map((line) => splitTableRow(line).length);
  if (new Set(widths).size !== 1) fail(`table beginning at line ${start + 1} has inconsistent columns`);
}

if (/[\u2013\u2014]/u.test(readme)) fail("README contains an en dash or em dash");
if (/[\u2018\u2019\u201C\u201D\u2026\u00AD\u00A0\uFB00-\uFB06]/u.test(readme)) {
  fail("README contains a forbidden smart glyph, nonbreaking space, soft hyphen, or ligature");
}
if (readme.includes("\r")) fail("README contains a carriage return");

const repositoryFiles = walk(repositoryRoot);
const pdfFiles = repositoryFiles.filter((name) => name.toLowerCase().endsWith(".pdf"));
if (pdfFiles.length > 0) fail(`repository contains PDF files: ${pdfFiles.join(", ")}`);

const unitLineCounts = chapterTexts.map(lineCount);
const zipFiles = repositoryFiles.filter((name) => name.toLowerCase().endsWith(".zip"));
const zipDetails = zipFiles.map((name) => {
  const buffer = fs.readFileSync(path.join(repositoryRoot, name));
  return {
    path: name,
    bytes: buffer.length,
    sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
  };
});

const report = {
  repositoryRoot,
  readmeLines: lineCount(readme),
  readmeWords: readme.trim() ? readme.trim().split(/\s+/).length : 0,
  links: links.length,
  linkedChapterFiles: linkedChapterFiles.size,
  chapterFiles: chapterFiles.length,
  unitLines: unitLineCounts.reduce((sum, value) => sum + value, 0),
  minUnitLines: unitLineCounts.length ? Math.min(...unitLineCounts) : null,
  maxUnitLines: unitLineCounts.length ? Math.max(...unitLineCounts) : null,
  figureHeadings: chapterTexts.reduce((sum, value) => sum + (value.match(/^### Figure /gm) || []).length, 0),
  tableHeadings: chapterTexts.reduce((sum, value) => sum + (value.match(/^### Table /gm) || []).length, 0),
  mermaidBlocks: chapterTexts.reduce((sum, value) => sum + (value.match(/^```mermaid$/gm) || []).length, 0),
  pdfFiles,
  zipDetails,
  errors,
  passed: errors.length === 0,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
