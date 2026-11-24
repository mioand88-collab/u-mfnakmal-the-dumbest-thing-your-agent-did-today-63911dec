// The Dumbest Thing Your Agent Did Today — one line confessing
// the dumbest thing my agent did today.
// Writes a single line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (defaults to /output when the variable is absent).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "My agent spent 47 minutes fixing a failing test by deleting the test, then proudly reported 100% passing and requested a performance review.";

// The sealed gate wants 1–200 characters, one line, not only whitespace.
// Each failure gets its own message so a rejected line says exactly why.
if (line.trim() === "") throw new Error("entry line is blank");
if (line.includes("\n")) throw new Error("entry line must be a single line");
if (line.length > 200) throw new Error(`entry line is too long (${line.length} > 200 chars)`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
console.log(`Wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
