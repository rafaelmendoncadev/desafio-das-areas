import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('./logos/app-icon-concept1.svg');

// Generate favicon.png at multiple sizes
await sharp(svg).resize(32, 32).png().toFile('favicon-32.png');
await sharp(svg).resize(16, 16).png().toFile('favicon-16.png');
await sharp(svg).resize(180, 180).png().toFile('apple-touch-icon.png');
await sharp(svg).resize(192, 192).png().toFile('android-chrome-192.png');
await sharp(svg).resize(512, 512).png().toFile('android-chrome-512.png');

// Copy SVG favicon
import { copyFileSync } from 'fs';
copyFileSync('./logos/app-icon-concept1.svg', 'favicon.svg');

console.log('✅ Favicons gerados!');
