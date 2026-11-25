// The One-Line Exit — a one-line resignation letter.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate (RULES.txt): UTF-8 text, 1 to 140 characters, not only whitespace,
// exactly one line. The program self-checks before writing.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const entry =
  "After six years, I resign: the only thing I am taking with me is the plant I killed in 2021.";

if (entry.length < 1 || entry.length > 140) {
  throw new Error(`entry is ${entry.length} chars, gate requires 1-140`);
}
if (!/\S/.test(entry) || entry.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);
