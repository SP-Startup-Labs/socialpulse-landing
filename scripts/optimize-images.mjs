import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const files = [
  'public/logo.png',
  'public/logos/SocialPulse_Log_v02.png',
  'public/logos/Logos_varios.png',
  'public/logos/Logo_fondo_claro.png',
  'public/logos/Logo_fondo_oscuro.png',
  'public/logos/Logo_banner_fondo_claro.png',
  'public/logos/logo_banner_fondo_oscuro.png'
];

for (const file of files) {
  const input = path.resolve(file);
  const output = input.replace(/\.png$/i, '.webp');

  await sharp(input)
    .webp({ quality: 82 })
    .toFile(output);

  const before = (await fs.stat(input)).size;
  const after = (await fs.stat(output)).size;

  console.log(`${file}: ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB`);
}