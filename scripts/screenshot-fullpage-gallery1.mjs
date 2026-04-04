import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(5000);

// Slow full scroll to trigger all lazy loads
await page.evaluate(async () => {
  for (let i = 0; i < 40; i++) {
    window.scrollBy(0, 400);
    await new Promise(r => setTimeout(r, 400));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(3000);

await page.screenshot({
  path: path.join(ROOT, 'content/1st-gallery-fullpage.png'),
  fullPage: true,
});
console.log('Screenshot saved');

// Count gallery components
const galleryCount = await page.evaluate(() =>
  document.querySelectorAll('[data-testid*="gallery"], [class*="pro-gallery"], [id*="gallery"]').length
);
console.log(`Gallery components found: ${galleryCount}`);

// Count total item-wrappers including those further down the page
const totalItems = await page.evaluate(() =>
  document.querySelectorAll('[data-hook="item-wrapper"], [role="button"][aria-label="image"]').length
);
console.log(`Total gallery items in DOM: ${totalItems}`);

await browser.close();
