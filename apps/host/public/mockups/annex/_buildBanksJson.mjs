import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "_bankSelectRaw.html");
const html = readFileSync(htmlPath, "utf8");
const banks = [];
const re = /<option value="([^"]*)">([^<]*)<\/option>/g;
let m;
while ((m = re.exec(html)) !== null) {
  banks.push({ value: m[1], label: m[2] });
}
writeFileSync(
  join(__dirname, "getAllBanks.json"),
  JSON.stringify({ banks }, null, 2),
  "utf8"
);
console.log("banks:", banks.length);
