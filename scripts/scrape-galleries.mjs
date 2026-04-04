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

const GALLERIES = [
  { slug: '1st-gallery', label: 'Revolutionary Innovation' },
  { slug: '2nd-gallery', label: 'Strategic Growth' },
  { slug: '3rd-gallery', label: 'Connected Leadership' },
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 400);
        total += 400;
        if (total >= document.body.scrollHeight) { clearInterval(timer); resolve(); }
      }, 200);
    });
  });
  await page.waitForTimeout(2000);
}

const browser = await chromium.launch({ headless: true });

for (const { slug, label } of GALLERIES) {
  console.log(`\n=== Scraping ${label} (/${slug}) ===`);

  const saved = new Map();
  let counter = 0;
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });

  context.on('response', async (response) => {
    const url = response.url();
    const ct  = response.headers()['content-type'] || '';
    if (!url.includes('wixstatic.com/media')) return;
    if (!ct.startsWith('image/')) return;
    if (saved.has(url)) return;
    if (url.includes('w_24') || url.includes('h_24')) return;
    try {
      const buf = await response.body();
      if (!buf || buf.length < 8000) return;
      const ext = ct.includes('png') ? '.png' : '.jpg';
      const filename = `${slug.replace(/-/g, '_')}_${counter++}${ext}`;
      fs.writeFileSync(path.join(IMG_DIR, filename), buf);
      fs.copyFileSync(path.join(IMG_DIR, filename), path.join(PUBLIC_IMG, filename));
      saved.set(url, filename);
      console.log(`  ✓ ${filename} (${(buf.length/1024).toFixed(0)}KB)`);
    } catch {}
  });

  const page = await context.newPage();
  await page.goto(`https://www.ajvaterlaus.com/${slug}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  for (let i = 0; i < 4; i++) {
    await autoScroll(page);
    await page.waitForTimeout(1500);
  }

  // Also get page text
  const text = await page.evaluate(() => document.body.innerText);

  // Screenshot
  await page.screenshot({ path: path.join(ROOT, `content/${slug}-screenshot.png`), fullPage: true });
  console.log(`  → Screenshot: content/${slug}-screenshot.png`);

  const result = {
    slug,
    label,
    images: [...saved.entries()].map(([src, filename]) => ({ filename, src })),
    text: text.trim(),
  };
  fs.writeFileSync(path.join(ROOT, `content/${slug}.json`), JSON.stringify(result, null, 2));
  console.log(`  → ${result.images.length} images, text saved to content/${slug}.json`);

  await context.close();
}

await browser.close();
console.log('\nDone!');
