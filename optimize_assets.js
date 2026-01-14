
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'src/assets';
const OUTPUT_DIR = 'src/assets/optimized';

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const files = fs.readdirSync(ASSETS_DIR).filter(file => file.startsWith('시장') && file.endsWith('.png'));

async function processImages() {
    console.log(`Found ${files.length} images to optimize.`);

    for (const file of files) {
        const inputPath = path.join(ASSETS_DIR, file);
        const outputFilename = file.replace('.png', '.jpg');
        const outputPath = path.join(OUTPUT_DIR, outputFilename);

        console.log(`Optimizing ${file}...`);

        await sharp(inputPath)
            .resize({ width: 1280, withoutEnlargement: true }) // Resize to reasonable HD
            .jpeg({ quality: 80, mozjpeg: true }) // Convert to efficient JPG
            .toFile(outputPath);

        console.log(`Saved to ${outputFilename}`);
    }
    console.log("Optimization complete!");
}

processImages();
