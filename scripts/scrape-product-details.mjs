/**
 * Clicks each image in the 1st-gallery and captures the detail view text + image.
 */
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

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});

const products = [];

// Intercept images
const capturedImages = new Map();
context.on('response', async (response) => {
  const url = response.url();
  const ct  = response.headers()['content-type'] || '';
  if (!url.includes('wixstatic.com/media')) return;
  if (!ct.startsWith('image/')) return;
  if (capturedImages.has(url)) return;
  if (url.includes('w_24') || url.includes('h_24')) return;
  try {
    const buf = await response.body();
    if (!buf || buf.length < 5000) return;
    capturedImages.set(url, buf);
  } catch {}
});

const page = await context.newPage();
console.log('→ Loading 1st-gallery...');
await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4000);

// Find all clickable items in the gallery
const items = await page.$$('[data-hook="item-wrapper"], [class*="galleryItem"], [class*="gallery-item"], figure, [role="button"]');
console.log(`→ Found ${items.length} potential gallery items`);

// Try clicking each one
for (let i = 0; i < items.length; i++) {
  try {
    // Reset to gallery page
    if (i > 0) {
      await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      const freshItems = await page.$$('[data-hook="item-wrapper"], [class*="galleryItem"], [class*="gallery-item"], figure, [role="button"]');
      if (!freshItems[i]) continue;
      await freshItems[i].click({ timeout: 5000 });
    } else {
      await items[i].click({ timeout: 5000 });
    }

    await page.waitForTimeout(2500);

    // Check if a lightbox/modal opened or if we navigated
    const url = page.url();
    const text = await page.evaluate(() => {
      // Try to get text from lightbox/modal first
      const modal = document.querySelector('[class*="lightbox"], [class*="modal"], [class*="overlay"], [class*="dialog"], [role="dialog"]');
      if (modal) return modal.innerText.trim();
      // Otherwise full page text
      return document.body.innerText.trim();
    });

    // Take screenshot
    const screenshotPath = path.join(ROOT, `content/product-detail-${i}.png`);
    await page.screenshot({ path: screenshotPath });

    // Save any new images captured
    const newImages = [];
    for (const [url, buf] of capturedImages.entries()) {
      const ext = '.jpg';
      const filename = `product_detail_${i}_${newImages.length}${ext}`;
      const destContent = path.join(IMG_DIR, filename);
      const destPublic  = path.join(PUBLIC_IMG, filename);
      if (!fs.existsSync(destContent)) {
        fs.writeFileSync(destContent, buf);
        fs.copyFileSync(destContent, destPublic);
        newImages.push(filename);
      }
    }

    products.push({ index: i, url, text: text.slice(0, 500), screenshot: `content/product-detail-${i}.png`, images: newImages });
    console.log(`  Item ${i}: ${url}`);
    console.log(`    Text: ${text.slice(0, 150).replace(/\n/g, ' ')}...`);
  } catch (err) {
    console.log(`  Item ${i}: skipped (${err.message.slice(0, 60)})`);
  }
}

fs.writeFileSync(path.join(ROOT, 'content/product-details.json'), JSON.stringify(products, null, 2));
console.log(`\n✓ Done. ${products.length} items captured.`);
await browser.close();
