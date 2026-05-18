import fs from 'fs';
import path from 'path';

function checkFile(filePath) {
    const buffer = fs.readFileSync(filePath);
    console.log(`File: ${filePath}`);
    console.log(`First 100 bytes (hex): ${buffer.slice(0, 100).toString('hex')}`);
    
    // Search for the bytes of "ą" (C4 85)
    const index = buffer.indexOf(Buffer.from([0xC4, 0x85]));
    if (index !== -1) {
        console.log(`Found UTF-8 'ą' (C4 85) at index ${index}`);
    } else {
        console.log(`NOT found UTF-8 'ą' (C4 85)`);
        // Search for the bytes of "Ä…" (C3 84 E2 80 A6)
        const index2 = buffer.indexOf(Buffer.from([0xC3, 0x84, 0xE2, 0x80, 0xA6]));
        if (index2 !== -1) {
            console.log(`Found DOUBLE-ENCODED 'ą' (C3 84 E2 80 A6) at index ${index2}`);
        }
    }
}

const filesToCheck = [
    'src/components/FoodCTA.tsx',
    'src/components/AboutV2.tsx',
    'src/i18n/homeTranslations.ts'
];

filesToCheck.forEach(f => {
    const fullPath = path.resolve(process.cwd(), f);
    if (fs.existsSync(fullPath)) {
        checkFile(fullPath);
    } else {
        console.log(`File not found: ${f}`);
    }
});
