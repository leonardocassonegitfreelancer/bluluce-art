import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '../src');

const replacements = [
    // Double UTF-8 corruptions
    { bad: /Ã /g, good: 'à' },
    { bad: /Ã¨/g, good: 'è' },
    { bad: /Ã©/g, good: 'é' },
    { bad: /Ã¬/g, good: 'ì' },
    { bad: /Ã²/g, good: 'ò' },
    { bad: /Ã¹/g, good: 'ù' },
    { bad: /â€”/g, good: '—' },
    { bad: /â€“/g, good: '–' },
    { bad: /â€™/g, good: '’' },
    { bad: /â€œ/g, good: '“' },
    { bad: /â€/g, good: '”' },
    { bad: /â†’/g, good: '→' },
    { bad: /Â·/g, good: '·' },
    { bad: /Â©/g, good: '©' },
    { bad: /Â /g, good: ' ' }, // Non-breaking space corruption
    { bad: /Ä…/g, good: 'ą' },
    { bad: /Ä—/g, good: 'ė' },
    { bad: /Ä¯/g, good: 'į' },
    { bad: /Å³/g, good: 'ų' },
    { bad: /Å«/g, good: 'ū' },
    { bad: /Å¡/g, good: 'š' },
    { bad: /Å¾/g, good: 'ž' },
    { bad: /Ä/g, good: 'č' },
    { bad: /Ä™/g, good: 'ę' },
    { bad: /ÄŒ/g, good: 'Č' },
    { bad: /Å /g, good: 'Š' },
    { bad: /Å½/g, good: 'Ž' },
    { bad: /Ä„/g, good: 'Ą' },
    { bad: /Ä˜/g, good: 'Ę' },
    { bad: /Ä–/g, good: 'Ė' },
    { bad: /Ä®/g, good: 'Į' },
    { bad: /Å²/g, good: 'Ų' },
    { bad: /Åª/g, good: 'Ū' },
];

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk(srcDir, (filePath) => {
    if (!filePath.match(/\.(ts|tsx|astro|js|jsx|css|json)$/)) return;

    let buffer = fs.readFileSync(filePath);
    
    // Remove UTF-8 BOM if present
    if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        console.log(`Removing BOM from ${filePath}`);
        buffer = buffer.slice(3);
    }

    let content = buffer.toString('utf8');
    let originalContent = content;

    for (const r of replacements) {
        content = content.replace(r.bad, r.good);
    }

    if (content !== originalContent) {
        console.log(`Fixed encoding in ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
