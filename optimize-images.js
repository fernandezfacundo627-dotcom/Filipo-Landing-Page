import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FOTOS_DIR = './src/assets/fotos';
const GALERIA_DIR = './src/assets/galeria';
const ICONS_DIR = './src/assets/icons';

const FOTOS_CONFIGS = {
  'hero.webp': { maxWidth: 1920, quality: 75 },
  'nosotros.webp': { maxWidth: 1200, quality: 75 },
  'nosotros-detalle.webp': { maxWidth: 800, quality: 75 },
  'tablas.webp': { maxWidth: 1000, quality: 75 },
  'cafeteria.webp': { maxWidth: 800, quality: 75 },
  'cocteleria.webp': { maxWidth: 800, quality: 75 },
  'delivery-coffe.webp': { maxWidth: 800, quality: 75 },
  'hamburguesas.webp': { maxWidth: 800, quality: 75 },
  'menu-ejecutivo.webp': { maxWidth: 800, quality: 75 },
  'logo.png': { maxWidth: 400, quality: 80, png: true }
};

async function optimizeFotos() {
  if (!fs.existsSync(FOTOS_DIR)) return;
  console.log(`\n📸 Optimizando imágenes en ${FOTOS_DIR}...`);
  const files = fs.readdirSync(FOTOS_DIR);

  for (const file of files) {
    const filePath = path.join(FOTOS_DIR, file);
    const config = FOTOS_CONFIGS[file.toLowerCase()];
    if (!config) continue;

    try {
      const statsBefore = fs.statSync(filePath);
      const buffer = fs.readFileSync(filePath);
      const image = sharp(buffer);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > config.maxWidth) {
        pipeline = pipeline.resize({ width: config.maxWidth, withoutEnlargement: true });
      }

      const tempPath = filePath + '.tmp';
      if (config.png) {
        await pipeline.png({ quality: config.quality, compressionLevel: 9, palette: true }).toFile(tempPath);
      } else {
        await pipeline.webp({ quality: config.quality, effort: 6 }).toFile(tempPath);
      }

      const statsAfter = fs.statSync(tempPath);
      if (statsAfter.size < statsBefore.size) {
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        const percent = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(0);
        console.log(`  ✔ ${file}: ${(statsBefore.size / 1024).toFixed(1)}KB -> ${(statsAfter.size / 1024).toFixed(1)}KB (-${percent}%)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`  ➖ ${file} ya estaba optimizado (${(statsBefore.size / 1024).toFixed(1)}KB)`);
      }
    } catch (err) {
      console.error(`  ❌ Error procesando ${file}:`, err.message);
    }
  }
}

async function optimizeGaleria() {
  if (!fs.existsSync(GALERIA_DIR)) return;
  console.log(`\n🖼️ Optimizando imágenes de galería en ${GALERIA_DIR}...`);
  const files = fs.readdirSync(GALERIA_DIR);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const isJpg = ext === '.jpg' || ext === '.jpeg';
    const isWebp = ext === '.webp';
    if (!isJpg && !isWebp) continue;

    const filePath = path.join(GALERIA_DIR, file);
    const webpName = file.replace(/\.(jpg|jpeg|webp)$/i, '.webp');
    const webpPath = path.join(GALERIA_DIR, webpName);

    try {
      const statsBefore = fs.statSync(filePath);
      const buffer = fs.readFileSync(filePath);
      const image = sharp(buffer);

      const convertedBuffer = await image
        .resize({ width: 1080, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      if (isJpg) {
        fs.writeFileSync(webpPath, convertedBuffer);
        fs.unlinkSync(filePath);
        const percent = ((1 - convertedBuffer.length / statsBefore.size) * 100).toFixed(0);
        console.log(`  ✔ Convertido ${file} -> ${webpName}: ${(statsBefore.size / 1024).toFixed(1)}KB -> ${(convertedBuffer.length / 1024).toFixed(1)}KB (-${percent}%)`);
      } else if (isWebp) {
        if (convertedBuffer.length < statsBefore.size) {
          fs.writeFileSync(filePath, convertedBuffer);
          const percent = ((1 - convertedBuffer.length / statsBefore.size) * 100).toFixed(0);
          console.log(`  ✔ Re-optimizado ${file}: ${(statsBefore.size / 1024).toFixed(1)}KB -> ${(convertedBuffer.length / 1024).toFixed(1)}KB (-${percent}%)`);
        } else {
          console.log(`  ➖ ${file} ya estaba en su tamaño óptimo (${(statsBefore.size / 1024).toFixed(1)}KB)`);
        }
      }
    } catch (err) {
      console.error(`  ❌ Error procesando ${file}:`, err.message);
    }
  }
}

async function optimizeIcons() {
  if (!fs.existsSync(ICONS_DIR)) return;
  console.log(`\n🔣 Optimizando iconos en ${ICONS_DIR}...`);
  const files = fs.readdirSync(ICONS_DIR);

  for (const file of files) {
    if (!file.toLowerCase().endsWith('.png')) continue;
    const filePath = path.join(ICONS_DIR, file);

    try {
      const statsBefore = fs.statSync(filePath);
      const buffer = fs.readFileSync(filePath);
      const image = sharp(buffer);

      const optimizedBuffer = await image
        .resize({ width: 128, height: 128, fit: 'inside', withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();

      if (optimizedBuffer.length < statsBefore.size) {
        fs.writeFileSync(filePath, optimizedBuffer);
        const percent = ((1 - optimizedBuffer.length / statsBefore.size) * 100).toFixed(0);
        console.log(`  ✔ Optimizado ${file}: ${(statsBefore.size / 1024).toFixed(1)}KB -> ${(optimizedBuffer.length / 1024).toFixed(1)}KB (-${percent}%)`);
      } else {
        console.log(`  ➖ ${file} ya estaba optimizado (${(statsBefore.size / 1024).toFixed(1)}KB)`);
      }
    } catch (err) {
      console.error(`  ❌ Error procesando ${file}:`, err.message);
    }
  }
}

async function run() {
  console.log("=== INICIANDO OPTIMIZACIÓN DE ASSETS ===");
  await optimizeFotos();
  await optimizeGaleria();
  await optimizeIcons();
  console.log("\n=== OPTIMIZACIÓN DE ASSETS COMPLETADA CON ÉXITO ===");
}

run().catch(console.error);
