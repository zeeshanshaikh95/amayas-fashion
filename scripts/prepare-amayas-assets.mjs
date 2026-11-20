/**
 * Brand + catalogue asset pipeline for AMAYAS FASHION.
 *
 * Source photography: the brand's own public Instagram feed (@_amayas_fashion).
 * The originals are downloaded once into the folder passed on the command line
 * (default: ../amayas-source) and every web asset is derived from them.
 *
 *   node scripts/prepare-amayas-assets.mjs "C:/path/to/instagram-downloads"
 *
 * Produces:
 *   client/public/brand/amayas-logo.png              original roundel
 *   client/public/brand/amayas-logo-transparent.png  roundel, outside transparent
 *   client/public/brand/amayas-logo-trimmed.png      roundel for small UI slots
 *   client/public/favicon-32.png, favicon-48.png, apple-touch-icon.png
 *   client/public/og-image.png                       1200×630 social card
 *   client/public/images/products/*.webp             720px-wide catalogue shots
 *   client/public/images/hero-*.webp                 hero slider portraits
 *   client/public/images/about-six-years.webp        brand story visual
 *   client/public/images/gallery/*.webp              Instagram gallery
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'client/public');
const BRAND_DIR = path.join(PUBLIC_DIR, 'brand');
const PRODUCT_DIR = path.join(PUBLIC_DIR, 'images/products');
const GALLERY_DIR = path.join(PUBLIC_DIR, 'images/gallery');

const SOURCE = path.resolve(process.argv[2] || path.join(ROOT, 'amayas-source'));
if (!fs.existsSync(SOURCE)) {
  throw new Error(`Source folder not found: ${SOURCE}`);
}

const WINE = '#230A11';
const ROSE = '#C98B9A';
const GOLD = '#C9A464';
const IVORY = '#FCF9F5';

/**
 * Every reel thumbnail in the Instagram grid carries a baked-in play button.
 * A small gold-and-wine monogram is composited over it so the catalogue stays
 * purely photographic. Position is always the exact centre of the frame.
 */
const PLAY_BADGE = new Set([
  'beige-handwork-festive-dress',
  'the-wedding-guest-edit',
  'hania-inspired-coord-set',
  'everyday-casual-set',
  'embroidered-pakistani-suit',
  'premium-bag-pack-sling',
  'pink-diamond-shrug-burqa',
]);

const SEAL = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <circle cx="256" cy="256" r="248" fill="#6E2237" fill-opacity="0.95"/>
  <circle cx="256" cy="256" r="238" fill="none" stroke="${GOLD}" stroke-width="4"/>
  <circle cx="256" cy="256" r="212" fill="none" stroke="${GOLD}" stroke-width="1.5" stroke-opacity="0.8"/>
  <text x="256" y="316" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="190" fill="${IVORY}" letter-spacing="6">A</text>
  <circle cx="256" cy="112" r="4" fill="${GOLD}"/>
  <circle cx="256" cy="400" r="4" fill="${GOLD}"/>
</svg>`);

/** source file → catalogue slug */
const PRODUCTS = {
  'mul-chanderi-festive-dress': 'hero-mul-chanderi.jpg',
  'beige-handwork-festive-dress': 'beige-handwork-festive-dress.jpg',
  'ivory-silver-handwork-outfit': 'ivory-silver-handwork-outfit.jpg',
  'the-wedding-guest-edit': 'the-wedding-guest-edit.jpg',
  'mirror-work-evening-dress': 'mirror-work-evening-dress.jpg',
  'hania-inspired-coord-set': 'hania-inspired-coord-set.jpg',
  'curve-confidence-coord-set': 'curve-confidence-coord-set.jpg',
  'plus-size-luxe-coord': 'plus-size-luxe-coord.jpg',
  'festive-2100-coord-set': 'festive-2100-coord-set.jpg',
  'korean-imported-shirt': 'korean-imported-shirt.jpg',
  'imported-printed-shirt': 'imported-printed-shirt.jpg',
  'everyday-casual-set': 'everyday-casual-set.jpg',
  'embroidered-pakistani-suit': 'embroidered-pakistani-suit.jpg',
  'premium-bag-pack-sling': 'premium-bag-pack-sling.jpg',
  'pink-diamond-shrug-burqa': 'pink-diamond-shrug-burqa.jpg',
};

/** The cleanest frame of each look, used in the hero slider. */
const HEROES = [
  { out: 'hero-1', src: 'hero-mul-chanderi.jpg', width: 1000 },
  { out: 'hero-2', src: 'hero-coord.jpg', width: 1000 },
  { out: 'hero-3', src: 'embroidered-pakistani-suit.jpg', width: 760 },
];

const GALLERY = [
  ['mirror-work-evening-dress.jpg', 'mirror-work', false],
  ['korean-imported-shirt.jpg', 'imported-shirts', false],
  ['plus-size-luxe-coord.jpg', 'plus-size', false],
  ['premium-bag-pack-sling.jpg', 'bags', true],
  ['hania-inspired-coord-set.jpg', 'hania-coord', true],
  ['festive-2100-coord-set.jpg', 'in-store', false],
];

async function seal(input) {
  const meta = await sharp(input).metadata();
  const size = Math.round(meta.width * 0.19);
  const badge = await sharp(SEAL).resize(size, size).png().toBuffer();
  return sharp(input)
    .composite([
      {
        input: badge,
        left: Math.round((meta.width - size) / 2),
        top: Math.round((meta.height - size) / 2),
      },
    ])
    .toBuffer();
}

async function main() {
  fs.mkdirSync(BRAND_DIR, { recursive: true });
  fs.mkdirSync(PRODUCT_DIR, { recursive: true });
  fs.mkdirSync(GALLERY_DIR, { recursive: true });

  // ── Catalogue ────────────────────────────────────────────────────────────
  for (const [slug, file] of Object.entries(PRODUCTS)) {
    const input = path.join(SOURCE, file);
    if (!fs.existsSync(input)) {
      console.warn(`missing: ${file}`);
      continue;
    }
    const prepared = PLAY_BADGE.has(slug) ? await seal(input) : input;
    await sharp(prepared)
      .resize({ width: 720, withoutEnlargement: false, kernel: 'lanczos3' })
      .sharpen({ sigma: 0.6 })
      .webp({ quality: 84 })
      .toFile(path.join(PRODUCT_DIR, `${slug}.webp`));
    console.log(`✓ products/${slug}.webp`);
  }

  // ── Hero portraits ───────────────────────────────────────────────────────
  for (const hero of HEROES) {
    const input = path.join(SOURCE, hero.src);
    await sharp(input)
      .resize({ width: hero.width, kernel: 'lanczos3' })
      .sharpen({ sigma: 0.5 })
      .webp({ quality: 86 })
      .toFile(path.join(PUBLIC_DIR, 'images', `${hero.out}.webp`));
    console.log(`✓ images/${hero.out}.webp`);
  }

  // ── Story visual ─────────────────────────────────────────────────────────
  await sharp(path.join(SOURCE, 'about-six-years.jpg'))
    .resize({ width: 1000, kernel: 'lanczos3' })
    .webp({ quality: 88 })
    .toFile(path.join(PUBLIC_DIR, 'images/about-six-years.webp'));
  console.log('✓ images/about-six-years.webp');

  // ── Gallery ──────────────────────────────────────────────────────────────
  for (const [file, name, needsSeal] of GALLERY) {
    const input = path.join(SOURCE, file);
    if (!fs.existsSync(input)) continue;
    const prepared = needsSeal ? await seal(input) : input;
    await sharp(prepared)
      .resize(700, 700, { fit: 'cover', position: 'top', kernel: 'lanczos3' })
      .webp({ quality: 82 })
      .toFile(path.join(GALLERY_DIR, `${name}.webp`));
    console.log(`✓ images/gallery/${name}.webp`);
  }

  // ── Logo roundel ─────────────────────────────────────────────────────────
  const logoSrc = path.join(SOURCE, 'logo-source.jpg');
  if (!fs.existsSync(logoSrc)) throw new Error(`Logo source missing: ${logoSrc}`);

  // Upscale the 150px Instagram avatar once, gently, then keep every derivative
  // from the same master so the artwork is never redrawn or recoloured.
  const master = await sharp(logoSrc)
    .resize(640, 640, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8 })
    .png()
    .toBuffer();
  fs.writeFileSync(
    path.join(BRAND_DIR, 'amayas-logo.webp'),
    await sharp(master).webp({ quality: 92 }).toBuffer()
  );

  const circleMask = Buffer.from(
    `<svg width="640" height="640"><circle cx="320" cy="320" r="318" fill="#fff"/></svg>`
  );
  const transparent = await sharp(master)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .webp({ quality: 92 })
    .toBuffer();
  fs.writeFileSync(path.join(BRAND_DIR, 'amayas-logo-transparent.webp'), transparent);

  const trimmed = await sharp(transparent).trim({ threshold: 1 }).webp({ quality: 92 }).toBuffer();
  fs.writeFileSync(path.join(BRAND_DIR, 'amayas-logo-trimmed.webp'), trimmed);

  // Favicons: the roundel on an ivory tile so it reads in a browser tab.
  for (const [size, name] of [
    [32, 'favicon-32.png'],
    [48, 'favicon-48.png'],
    [180, 'apple-touch-icon.png'],
  ]) {
    const pad = Math.round(size * 0.05);
    const mark = await sharp(master).resize(size - pad * 2, size - pad * 2).png().toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: IVORY },
    })
      .composite([{ input: mark, left: pad, top: pad }])
      .png()
      .toFile(path.join(PUBLIC_DIR, name));
  }

  // ── Social card ──────────────────────────────────────────────────────────
  const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${WINE}"/>
    <rect x="0" y="0" width="1200" height="630" fill="url(#g)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3A1020"/>
        <stop offset="1" stop-color="${WINE}"/>
      </linearGradient>
    </defs>
    <circle cx="1120" cy="70" r="230" fill="none" stroke="${GOLD}" stroke-opacity="0.28" stroke-width="1.5"/>
    <circle cx="1120" cy="70" r="180" fill="none" stroke="${GOLD}" stroke-opacity="0.18" stroke-width="1"/>
    <text x="86" y="170" fill="${GOLD}" font-family="Georgia, serif" font-size="18" letter-spacing="8">AMAYAS FASHION</text>
    <text x="82" y="300" fill="${IVORY}" font-family="Georgia, 'Times New Roman', serif" font-size="96" letter-spacing="2">AMAYAS</text>
    <text x="86" y="350" fill="${GOLD}" font-family="Georgia, serif" font-size="22" letter-spacing="12">F A S H I O N</text>
    <line x1="86" y1="392" x2="560" y2="392" stroke="${GOLD}" stroke-opacity="0.55"/>
    <text x="86" y="452" fill="#EAD4D9" font-family="Georgia, serif" font-size="34" font-style="italic">Elegance in Every Thread</text>
    <text x="86" y="520" fill="#C9A9B0" font-family="Arial, sans-serif" font-size="19" letter-spacing="2">DRESSES · CO-ORDS · TUNICS · BAGS · SMALL TO 10XL</text>
  </svg>`);

  const story = await sharp(path.join(SOURCE, 'about-six-years.jpg'))
    .resize(500, 630, { fit: 'cover' })
    .modulate({ brightness: 0.92 })
    .toBuffer();

  await sharp(card)
    .composite([{ input: story, left: 700, top: 0 }])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
  console.log('✓ og-image.png');

  // ── Cleanup: old brand/product files from the template project ───────────
  for (const f of ['ayesha-logo.png', 'ayesha-logo.svg', 'ayesha-logo-transparent.png', 'ayesha-logo-trimmed.png', 'amayas-logo.png', 'amayas-logo-transparent.png', 'amayas-logo-trimmed.png']) {
    const p = path.join(BRAND_DIR, f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
  console.log('\nAMAYAS assets generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
