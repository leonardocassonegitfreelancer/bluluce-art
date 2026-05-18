import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "src", "assets");

const files = await readdir(assetsDir);
const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

let converted = 0;
let skipped = 0;
let saved = 0;

for (const file of images) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const input = path.join(assetsDir, file);
  const output = path.join(assetsDir, `${base}.webp`);

  // Skip if webp already exists and is newer
  try {
    const [inStat, outStat] = await Promise.all([stat(input), stat(output)]);
    if (outStat.mtimeMs > inStat.mtimeMs) {
      skipped++;
      continue;
    }
  } catch { /* output doesn't exist yet */ }

  try {
    const info = await sharp(input)
      .webp({ quality: 85, effort: 4 })
      .toFile(output);

    const origSize = (await stat(input)).size;
    const saving = Math.round((1 - info.size / origSize) * 100);
    saved += origSize - info.size;
    console.log(`✓ ${file} → ${base}.webp  ${saving}% smaller`);
    converted++;
  } catch (e) {
    console.log(`✗ ${file}: ${e.message}`);
  }
}

const savedKB = Math.round(saved / 1024);
console.log(`\nDone: ${converted} converted, ${skipped} skipped. Saved ~${savedKB} KB total.`);
