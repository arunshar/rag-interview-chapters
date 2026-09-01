#!/usr/bin/env node

import { execFile, execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(process.argv[2] || ".");
const requestedCli = process.argv[3] || process.env.MMDC_PATH || "mmdc";
const requestedParallelism = Number.parseInt(process.argv[4] || "3", 10);
const parallelism = Number.isInteger(requestedParallelism)
  ? Math.max(1, Math.min(requestedParallelism, 8))
  : 3;
const errors = [];

function fail(message) {
  errors.push(message);
}

function resolveCli(value) {
  if (value.includes("/") || value.includes("\\")) {
    const absolute = path.resolve(value);
    fs.accessSync(absolute, fs.constants.X_OK);
    return absolute;
  }
  return execFileSync("which", [value], { encoding: "utf8" }).trim();
}

function extractBlocks(markdown) {
  const blocks = [];
  const pattern = /^```mermaid\s*\n([\s\S]*?)^```\s*$/gm;
  for (const match of markdown.matchAll(pattern)) blocks.push(match[1]);
  return blocks;
}

async function runPool(items, worker, limit) {
  let cursor = 0;
  async function runOneWorker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runOneWorker));
}

let cli = null;
let cliVersion = null;
try {
  cli = resolveCli(requestedCli);
  cliVersion = execFileSync(cli, ["--version"], { encoding: "utf8" }).trim();
} catch (error) {
  fail(`Mermaid CLI is unavailable: ${error.message}. Install @mermaid-js/mermaid-cli or pass an executable path as argument 2.`);
}

const manifestPath = path.join(packageRoot, "manifest.json");
let units = [];
if (!fs.existsSync(manifestPath)) {
  fail("manifest.json is missing");
} else {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    units = Array.isArray(manifest?.units) ? manifest.units : [];
  } catch (error) {
    fail(`manifest.json is not valid JSON: ${error.message}`);
  }
}
if (units.length === 0) fail("manifest.units is empty or missing");

const jobs = [];
for (const [unitIndex, unit] of units.entries()) {
  const relative = unit?.output_file;
  if (typeof relative !== "string" || !/^chapters\/[^/\\]+\.md$/.test(relative)) {
    fail(`manifest unit ${unitIndex + 1} output_file must match chapters/<filename>.md`);
    continue;
  }
  const sourcePath = path.join(packageRoot, relative);
  if (!fs.existsSync(sourcePath)) {
    fail(`missing unit file: ${relative}`);
    continue;
  }
  const markdown = fs.readFileSync(sourcePath, "utf8");
  const blocks = extractBlocks(markdown);
  blocks.forEach((source, blockIndex) => jobs.push({ relative, blockIndex: blockIndex + 1, source }));
}

let parsed = 0;
let tempDirectory = null;
if (cli && errors.length === 0) {
  try {
    tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "rag-study-mermaid-"));
    await runPool(jobs, async (job, index) => {
      const stem = String(index + 1).padStart(4, "0");
      const inputPath = path.join(tempDirectory, `${stem}.mmd`);
      const outputPath = path.join(tempDirectory, `${stem}.svg`);
      fs.writeFileSync(inputPath, job.source, "utf8");
      try {
        await execFileAsync(cli, ["-i", inputPath, "-o", outputPath, "-b", "transparent"], {
          maxBuffer: 10 * 1024 * 1024,
        });
        if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) {
          fail(`${job.relative} Mermaid block ${job.blockIndex} produced no SVG`);
          return;
        }
        parsed += 1;
      } catch (error) {
        const detail = String(error.stderr || error.message).trim().split("\n").slice(0, 3).join(" | ");
        fail(`${job.relative} Mermaid block ${job.blockIndex} failed: ${detail}`);
      }
    }, parallelism);
  } catch (error) {
    fail(`Mermaid verification failed: ${error.message}`);
  } finally {
    if (tempDirectory && tempDirectory.startsWith(os.tmpdir() + path.sep)) {
      fs.rmSync(tempDirectory, { recursive: true, force: true });
    }
  }
}

const report = {
  packageRoot,
  cli,
  cliVersion,
  parallelism,
  units: units.length,
  mermaidBlocks: jobs.length,
  parsed,
  errors,
  passed: errors.length === 0 && parsed === jobs.length,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = report.passed ? 0 : 1;
