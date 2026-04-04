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

const ITEMS = [
  { slug: 'esi',          pgid: 'ivmbx5xj-e0b60fb6-a2b0-4ccd-91f6-decca7bd4d1d' },
  { slug: 'adidas-1',     pgid: 'ivmbx5xj-ce570498-0b0f-45fb-8daf-5c7e2230dce9' },
  { slug: 'adidas-micoach', pgid: 'ivmbx5xj-99201625-2183-4503-8ed1-d0b75c8e5a9a' },
  { slug: 'adidas-smartball', pgid: 'ivmbx5xj-beb470bb-6eef-43a5-b67b-995e7482eb51' },
  { slug: 'adidas-all-day',  pgid: 'ivmbx5xj-71aa4b2a-2f1e-40e6-9c50-7b2afcb8323e' },
  { slug: 'strung',       pgid: 'ivmbx5xj-0b6db151-68a0-4e4a-88d5-042e9008d788' },
  { slug: '4d',           pgid: 'ivmbx5xj-3c3b2cd3-d5ec-4bd3-9b11-01be6aa0ea54' },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const item of ITEMS) {
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
  const url = `https://www.ajvaterlaus.com/1st-gallery?pgid=${item.pgid}`;
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(5000);

  // Get all text
  const text = await page.evaluate(() => {
    // Try the pro-gallery item panel first
    const panel = document.querySelector('[class*="item-info"], [class*="itemInfo"], [class*="pro-gallery"] [class*="info"]');
    if (panel) return panel.innerText.trim();
    return document.body.innerText.trim();
  });

  // Screenshot
  await page.screenshot({ path: path.join(ROOT, `content/product-${item.slug}.png`), fullPage: false });

  results.push({ slug: item.slug, pgid: item.pgid, text, images: saved });
  console.log(`  Text: ${text.slice(0, 200).replace(/\n/g,'  ')}`);

  await context.close();
}

await browser.close();

fs.writeFileSync(path.join(ROOT, 'content/products.json'), JSON.stringify(results, null, 2));
console.log(`\n✓ Done. Saved content/products.json`);
