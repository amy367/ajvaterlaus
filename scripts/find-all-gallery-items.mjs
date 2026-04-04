/**
 * Clicks every item in the 1st-gallery and records all unique pgids + text previews.
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();

async function loadGallery() {
  await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(5000);
  // Scroll fully to trigger lazy loads
  await page.evaluate(async () => {
    for (let i = 0; i < 20; i++) {
      window.scrollBy(0, 500);
      await new Promise(r => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);
}

await loadGallery();

// Count items
const count = await page.evaluate(() =>
  document.querySelectorAll('[data-hook="item-wrapper"], figure[data-hook], [class*="galleryItem"]').length
);
console.log(`Found ${count} gallery items\n`);

const seen = new Map(); // pgid → {text, index}

for (let i = 0; i < count; i++) {
  try {
    await loadGallery();
    const items = await page.$$('[data-hook="item-wrapper"], figure[data-hook], [class*="galleryItem"]');
    if (!items[i]) continue;

    await items[i].click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2500);

    const urlAfter = page.url();
    const pgidMatch = urlAfter.match(/pgid=([^&]+)/);
    if (!pgidMatch) continue;
    const pgid = pgidMatch[1];
    if (seen.has(pgid)) continue;

    const text = await page.evaluate(() => document.body.innerText.trim()).catch(() => '');
    // Find the first meaningful line (item title)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2 && !['AJV','Home','Portfolio','Life','About','Contact'].includes(l));
    const preview = lines.slice(0, 4).join(' | ');

    seen.set(pgid, { pgid, index: i, preview });
    console.log(`[${i}] pgid=${pgid}`);
    console.log(`     ${preview}\n`);
  } catch (err) {
    // skip
  }
}

await browser.close();

const results = [...seen.values()];
fs.writeFileSync(path.join(ROOT, 'content/all-gallery-items.json'), JSON.stringify(results, null, 2));
console.log(`\n✓ Found ${results.length} unique gallery items. Saved to content/all-gallery-items.json`);
