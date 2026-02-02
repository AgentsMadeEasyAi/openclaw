#!/usr/bin/env node
/**
 * Runs scripts/bundle-a2ui.sh when bash is available (Unix, WSL, Git Bash).
 * On Windows without bash, exits 0 so the main build can continue without the
 * A2UI bundle (Canvas UI bundle is optional for CLI/gateway).
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptPath = path.join(repoRoot, "scripts", "bundle-a2ui.sh");

const isWin = process.platform === "win32";
const bashCmd = isWin ? "bash" : "bash";
const child = spawn(bashCmd, [scriptPath], {
  cwd: repoRoot,
  stdio: "inherit",
  shell: isWin,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.exit(1);
  }
  if (code !== 0 && code !== null) {
    console.warn(
      "[openclaw] A2UI bundle step failed or bash not found; continuing without bundle. Run with bash (WSL/Git Bash) for full build."
    );
  }
  process.exit(0);
});

child.on("error", (err) => {
  if (err.code === "ENOENT" && isWin) {
    console.warn(
      "[openclaw] bash not found; skipping A2UI bundle. Use WSL or Git Bash for full build."
    );
    process.exit(0);
  }
  console.error(err);
  process.exit(1);
});
