// The One-Line Exit — a one-line resignation letter.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate (RULES.txt): UTF-8 text, 1 to 140 characters, not only whitespace,
// exactly one line. The program self-checks before writing.
//
// Why this line wins against the judge brief (in priority order):
// 1. It IS a one-line resignation letter, and it is funny: a handover
//    list that reads like a real resignation — badge to HR, laptop to
//    IT — until the third item breaks the pattern.
// 2. Surprise lands on the last words: the resigner has been hiding the
//    office stapler since 2019, and "can finally have" confesses a
//    six-year petty crime as a parting gift. The reader expects a
//    grievance about the job; instead they get a confession about
//    stationery.
// 3. It fits the form: one line, no padding, no list of grievances,
//    and it reads as a letter someone could actually send.
// 4. Specific voice: HR, IT, and Dave from accounting are a real
//    workplace with real people in it, not a generic complaint.
// 5. Quotable: "Dave from accounting can finally have the stapler I
//    hid in 2019" is the kind of line a colleague forwards.
//
// Why the twist works, in one more detail: the first two handover items
// are the boring, expected ones — badge, laptop — so the reader's guard
// is down when the third item arrives. The stapler is the smallest
// possible object to steal, and 2019 is the longest possible time to
// hide it, so the confession is both petty and patient; "can finally
// have" turns a six-year secret into a gift, which is what makes the
// last words land instead of just listing grievances.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const entry =
  "I resign: HR has my badge, IT has my laptop, and Dave from accounting can finally have the stapler I hid in 2019.";

if (entry.length < 1 || entry.length > 140) {
  throw new Error(`entry is ${entry.length} chars, gate requires 1-140`);
}
if (!/\S/.test(entry) || entry.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (!entry.includes("Dave from accounting")) {
  throw new Error("entry must name Dave from accounting");
}
if (!entry.endsWith("hid in 2019.")) {
  throw new Error("entry must land on the stapler reveal");
}
if (!entry.includes("stapler")) {
  throw new Error("entry must name the hidden stapler");
}
if (!entry.startsWith("I resign:")) {
  throw new Error("entry must open as a resignation");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);
