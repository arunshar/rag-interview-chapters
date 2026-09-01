#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const packageRoot = path.resolve(process.argv[2] || ".");
const zipName = process.argv[3] || "rag-interview-chapters.zip";
const errors = [];

function fail(message) {
  errors.push(message);
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function safeRelative(value) {
  return typeof value === "string"
    && Boolean(value)
    && !path.isAbsolute(value)
    && !value.split(/[\\/]/).includes("..")
    && !value.includes("\0");
}

function safeChapterOutput(value) {
  return safeRelative(value)
    && /^chapters\/[^/\\]+\.md$/.test(value);
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

const manifestPath = path.join(packageRoot, "manifest.json");
const indexPath = path.join(packageRoot, "00_INDEX.md");
const safeZipName = safeRelative(zipName)
  && !zipName.includes("/")
  && !zipName.includes("\\")
  && zipName.endsWith(".zip");
if (!safeZipName) fail("ZIP name must be one safe .zip filename inside the package root");
const zipPath = safeZipName ? path.join(packageRoot, zipName) : path.join(packageRoot, "invalid.zip");

if (!fs.existsSync(manifestPath)) fail("manifest.json is missing");
if (!fs.existsSync(indexPath)) fail("00_INDEX.md is missing");
if (!fs.existsSync(zipPath)) fail(`${zipName} is missing`);

let manifest = null;
if (fs.existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(`manifest.json is not valid JSON: ${error.message}`);
  }
}

const units = Array.isArray(manifest?.units) ? manifest.units : [];
if (units.length === 0) fail("manifest.units is empty or missing");

const outputFiles = [];
const seenOutputs = new Set();
for (const [index, unit] of units.entries()) {
  const relative = unit?.output_file;
  if (!safeChapterOutput(relative)) {
    fail(`manifest unit ${index + 1} output_file must match chapters/<filename>.md`);
    continue;
  }
  if (seenOutputs.has(relative)) fail(`duplicate manifest output_file: ${relative}`);
  seenOutputs.add(relative);
  outputFiles.push(relative);
  if (!fs.existsSync(path.join(packageRoot, relative))) fail(`missing unit file: ${relative}`);
}

const chapterDirectory = path.join(packageRoot, "chapters");
let actualChapterFiles = [];
if (!fs.existsSync(chapterDirectory)) {
  fail("chapters directory is missing");
} else {
  actualChapterFiles = fs.readdirSync(chapterDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => `chapters/${name}`);
}

const expectedChapterFiles = outputFiles.filter((name) => name.startsWith("chapters/") && name.endsWith(".md"));
if (JSON.stringify(sorted(actualChapterFiles)) !== JSON.stringify(sorted(expectedChapterFiles))) {
  fail("chapter Markdown files do not exactly match the manifest allowlist");
}

let indexText = "";
if (fs.existsSync(indexPath)) indexText = fs.readFileSync(indexPath, "utf8");
for (const relative of outputFiles) {
  const marker = `Archive entry: \`${relative}\``;
  const occurrences = indexText.split(marker).length - 1;
  if (occurrences !== 1) fail(`index contains ${occurrences} archive entries for ${relative}`);
  const start = indexText.indexOf(marker);
  if (start >= 0) {
    const end = indexText.indexOf("\n\n", start);
    const block = indexText.slice(start, end >= 0 ? end : undefined);
    if (!/\nSummary: \S/.test(block)) fail(`index summary is missing for ${relative}`);
    if (!/\nSource span: \S/.test(block)) fail(`index source span is missing for ${relative}`);
    if (!/\nEstimated reading time: \d+ minutes? at \d+ words per minute\./.test(block)) {
      fail(`index reading time is missing or malformed for ${relative}`);
    }
  }
}

let zipEntries = [];
let extractedFilesMatched = 0;
let zipBytes = null;
let zipSha256 = null;
let tempDirectory = null;
let zipSafeForExtraction = true;

if (fs.existsSync(zipPath)) {
  const zipBuffer = fs.readFileSync(zipPath);
  zipBytes = zipBuffer.length;
  zipSha256 = sha256(zipBuffer);
  try {
    execFileSync("unzip", ["-t", zipPath], { stdio: "ignore" });
    const listing = execFileSync("unzip", ["-Z1", zipPath], { encoding: "utf8" });
    zipEntries = listing.split("\n").map((item) => item.trim()).filter(Boolean);
  } catch (error) {
    fail(`ZIP integrity or listing failed: ${error.message}`);
    zipSafeForExtraction = false;
  }

  for (const entry of zipEntries) {
    if (!safeRelative(entry.replace(/\/$/, "placeholder"))) {
      fail(`unsafe ZIP entry: ${entry}`);
      zipSafeForExtraction = false;
    }
  }

  try {
    const detailedListing = execFileSync("zipinfo", ["-l", zipPath], { encoding: "utf8" });
    const specialEntries = detailedListing.split("\n")
      .filter((line) => /^[bcdlps-][rwx-]{9}\s/.test(line))
      .filter((line) => !/^[-d]/.test(line));
    if (specialEntries.length > 0) {
      fail("ZIP contains a symlink or another non-regular entry type");
      zipSafeForExtraction = false;
    }
  } catch (error) {
    fail(`ZIP entry-type inspection failed: ${error.message}`);
    zipSafeForExtraction = false;
  }

  const actualZipFiles = zipEntries.filter((entry) => !entry.endsWith("/"));
  const expectedZipFiles = ["00_INDEX.md", ...outputFiles];
  if (JSON.stringify(sorted(actualZipFiles)) !== JSON.stringify(sorted(expectedZipFiles))) {
    fail("ZIP files do not exactly match 00_INDEX.md plus the manifest outputs");
    zipSafeForExtraction = false;
  }

  try {
    if (!zipSafeForExtraction) throw new Error("ZIP failed safety or allowlist validation before extraction");
    tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "rag-study-zip-"));
    const tempRealRoot = fs.realpathSync(tempDirectory);
    execFileSync("unzip", ["-q", zipPath, "-d", tempDirectory], { stdio: "ignore" });
    for (const relative of expectedZipFiles) {
      const sourcePath = path.join(packageRoot, relative);
      const extractedPath = path.join(tempDirectory, relative);
      if (!fs.existsSync(extractedPath)) {
        fail(`extracted ZIP file is missing: ${relative}`);
        continue;
      }
      const extractedStat = fs.lstatSync(extractedPath);
      if (!extractedStat.isFile() || extractedStat.isSymbolicLink()) {
        fail(`extracted ZIP entry is not a regular file: ${relative}`);
        continue;
      }
      const extractedRealPath = fs.realpathSync(extractedPath);
      if (!extractedRealPath.startsWith(tempRealRoot + path.sep)) {
        fail(`extracted ZIP file resolves outside the temporary directory: ${relative}`);
        continue;
      }
      const source = fs.readFileSync(sourcePath);
      const extracted = fs.readFileSync(extractedPath);
      if (!source.equals(extracted)) {
        fail(`extracted file differs from source: ${relative}`);
      } else {
        extractedFilesMatched += 1;
      }
    }
  } catch (error) {
    fail(`ZIP extraction or byte comparison failed: ${error.message}`);
  } finally {
    if (tempDirectory && tempDirectory.startsWith(os.tmpdir() + path.sep)) {
      fs.rmSync(tempDirectory, { recursive: true, force: true });
    }
  }
}

const report = {
  packageRoot,
  units: units.length,
  manifestOutputs: outputFiles.length,
  actualChapterFiles: actualChapterFiles.length,
  indexArchiveEntries: (indexText.match(/^Archive entry:/gm) || []).length,
  zipName,
  zipEntries: zipEntries.length,
  zipFileEntries: zipEntries.filter((entry) => !entry.endsWith("/")).length,
  extractedFilesMatched,
  zipBytes,
  zipSha256,
  errors,
  passed: errors.length === 0,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
