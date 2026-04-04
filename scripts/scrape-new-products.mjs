import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMG_DIR    = path.join(ROOT, 'content', 'images');
const PUBLIC_IMG = path.join(ROOT, 'public', 'images');
fs.mkdirSync(IMG_DIR,    { recursive: true });
fs.mkdirSync(PUBLIC_IMG, { recursive: true });

const NEW_ITEMS = [
  { slug: 'sustainable-materials', pgid: 'ivmbx5xj-4467e017-a623-4bff-95ea-cda1541d7bd3' },
  { slug: 'stay-in-play',          pgid: 'ivmbx5xj-2b373fda-aacc-460a-8eb5-29d7664a757a' },
  { slug: 'future-craft-apparel',  pgid: 'ivmbx5xj-4b755ace-5a23-4a45-904a-15257fbe91ef' },
  { slug: 'shield',                pgid: 'ivmbx5xj-9fd5da5c-f422-4a59-a404-b33e93c73d53' },
  { slug: 'energy-bra',            pgid: 'ivmbx5xj-d9f4a642-82e3-4a09-a0f4-8d1f5cf48825' },
  { slug: 'wrap-bra',              pgid: 'ivmbx5xj-4ebb2401-eaa7-4abe-973e-6daf6db9f222' },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const item of NEW_ITEMS) {
  console.log(`\n→ Scraping: ${item.slug}`);
  const saved = [];
  let imgIdx = 0;

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });

  context.on('response', async (response) => {
    const url = response.url();
    const ct  = response.headers()['content-type'] || '';
    if (!url.includes('wixstatic.com/media')) return;
    if (!ct.startsWith('image/')) return;
    if (url.includes('w_24') || url.includes('h_24')) return;
    if (saved.find(s => s.src === url)) return;
    try {
      const buf = await response.body();
      if (!buf || buf.length < 8000) return;
      const ext = ct.includes('png') ? '.png' : '.jpg';
      const filename = `product_${item.slug}_${imgIdx++}${ext}`;
      fs.writeFileSync(path.join(IMG_DIR, filename), buf);
      fs.copyFileSync(path.join(IMG_DIR, filename), path.join(PUBLIC_IMG, filename));
      saved.push({ filename, src: url });
      console.log(`  ✓ ${filename} (${(buf.length/1024).toFixed(0)}KB)`);
    } catch {}
  });

  const page = await context.newPage();
  await page.goto(`https://www.ajvaterlaus.com/1st-gallery?pgid=${item.pgid}`, {
    waitUntil: 'load', timeout: 90000,
  });
  await page.waitForTimeout(5000);

  const text = await page.evaluate(() => document.body.innerText.trim());
  await page.screenshot({ path: path.join(ROOT, `content/product-${item.slug}.png`), fullPage: false });

  // Parse the meaningful lines — skip nav/footer boilerplate
  const lines = text.split('\n').map(l => l.trim()).filter(l =>
    l.length > 2 &&
    !['AJV','Home','Portfolio','Life','About','Contact','disruptive innovation',
      '< Back to Portfolio','© 2023 by The Art of Food. Proudly created with Wix.com',
      'Many are industry firsts, award winning and all deliver against an athlete need, benefit and desire.  My innovation background is diverse: robotics, digital product and experiences, retail experiences, footwear, apparel, technology, manufacturing, sustainable materials, women-led innovation.  20+ patents.'
    ].includes(l)
  );

  console.log(`  Text lines: ${lines.join(' | ').slice(0, 300)}`);
  results.push({ slug: item.slug, pgid: item.pgid, lines, images: saved });
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(ROOT, 'content/new-products.json'), JSON.stringify(results, null, 2));
console.log(`\n✓ Done. Saved content/new-products.json`);
