/**
 * Clicks the "next" arrow in the Wix Pro Gallery to reveal hidden items,
 * then records any new pgids.
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

await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(5000);

// Take screenshot before clicking next
await page.screenshot({ path: path.join(ROOT, 'content/gallery-before-next.png') });

// Try clicking the next arrow
const nextSelectors = [
  '[aria-label="Next Item"]',
  '[aria-label="next"]',
  'button[data-hook="next-item"]',
  '[class*="navArrow"][class*="right"]',
  '[class*="next"]',
  'button svg', // arrow buttons often contain SVGs
];

let clicked = false;
for (const sel of nextSelectors) {
  const btn = await page.$(sel);
  if (btn) {
    console.log(`Found next button: ${sel}`);
    await btn.click();
    clicked = true;
    break;
  }
}

if (!clicked) {
  // Try clicking the right side of the gallery strip
  const gallery = await page.$('[class*="pro-gallery"], [data-hook*="gallery"]');
  if (gallery) {
    const box = await gallery.boundingBox();
    if (box) {
      // Click on the right arrow area
      await page.mouse.click(box.x + box.width - 30, box.y + box.height / 2);
      console.log('Clicked right edge of gallery');
      clicked = true;
    }
  }
}

await page.waitForTimeout(3000);
await page.screenshot({ path: path.join(ROOT, 'content/gallery-after-next.png') });

const countAfter = await page.evaluate(() =>
  document.querySelectorAll('[data-hook="item-wrapper"], [role="button"]').length
);
console.log(`Items after clicking next: ${countAfter}`);

// Get all item titles visible now
const titles = await page.evaluate(() => {
  const items = document.querySelectorAll('[data-hook="item-wrapper"], [role="button"]');
  return [...items].map(el => el.innerText?.trim() || el.getAttribute('aria-label') || '').filter(Boolean);
});
console.log('Visible item labels:', titles);

// Also check all aria-labels which Wix uses for gallery items
const ariaLabels = await page.evaluate(() =>
  [...document.querySelectorAll('[aria-label]')]
    .map(el => el.getAttribute('aria-label'))
    .filter(l => l && l.length > 2)
);
console.log('\nAll aria-labels:', ariaLabels);

await browser.close();
