#!/usr/bin/env node
/**
 * Build OpenClaw on Windows when bash is not available (no WSL/Git Bash).
 * Skips A2UI bundle and runs canvas-a2ui-copy with OPENCLAW_A2UI_SKIP_MISSING=1.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...process.env, OPENCLAW_A2UI_SKIP_MISSING: "1" };

const tscBin = path.join(repoRoot, "node_modules", "typescript", "bin", "tsc");
const steps = [
  ["node", ["scripts/bundle-a2ui-wrapper.mjs"]],
  ["node", [tscBin, "-p", "tsconfig.json", "--noEmit", "false"]],
  ["node", ["--import", "tsx", "scripts/canvas-a2ui-copy.ts"]],
  ["node", ["--import", "tsx", "scripts/copy-hook-metadata.ts"]],
  ["node", ["--import", "tsx", "scripts/write-build-info.ts"]],
];

for (const [cmd, args] of steps) {
  const r = spawnSync(cmd, args, { cwd: repoRoot, env, stdio: "inherit" });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}
