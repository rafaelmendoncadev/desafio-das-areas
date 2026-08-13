import sharp from 'sharp';
import { readFileSync } from 'fs';
import { mkdirSync } from 'fs';

const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

const svgBuffer = readFileSync('./logos/app-icon-concept1.svg');

async function generate() {
  for (const [folder, size] of Object.entries(sizes)) {
    const dir = `./android/app/src/main/res/${folder}`;
    mkdirSync(dir, { recursive: true });
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`${dir}/ic_launcher.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`${dir}/ic_launcher_round.png`);
    console.log(`✅ ${folder}: ${size}x${size}`);
  }

  // Also generate the notification icon and splash
  const splashBuffer = readFileSync('./logos/logo-concept1-combination.svg');
  mkdirSync('./android/app/src/main/res/drawable', { recursive: true });
  await sharp(splashBuffer)
    .resize(1000, 400, { fit: 'contain', background: '#4F46E5' })
    .png()
    .toFile('./android/app/src/main/res/drawable/splash.png');
  console.log('✅ splash: 1000x400');
}

generate().catch(console.error);
