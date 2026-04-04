/**
 * Intercepts Wix API responses to find ALL gallery item IDs,
 * including ones that may require horizontal scrolling to reach.
 */
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});

const allText = [];

// Capture any JSON responses that mention gallery items
context.on('response', async (response) => {
  const ct = response.headers()['content-type'] || '';
  if (!ct.includes('json')) return;
  try {
    const text = await response.text();
    if (text.includes('pgid') || text.includes('galleryId') || text.includes('itemId') || text.includes('Personal') || text.includes('Concierge')) {
      allText.push({ url: response.url(), body: text.slice(0, 2000) });
    }
  } catch {}
});

const page = await context.newPage();
await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'load', timeout: 90000 });
await page.waitForTimeout(5000);

// Scroll in all directions
await page.evaluate(async () => {
  // Vertical scroll
  for (let i = 0; i < 30; i++) {
    window.scrollBy(0, 300);
    await new Promise(r => setTimeout(r, 200));
  }
  // Horizontal scroll on any scrollable elements
  document.querySelectorAll('*').forEach(el => {
    if (el.scrollWidth > el.clientWidth) {
      el.scrollLeft = el.scrollWidth;
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  window.scrollTo(0, 0);
});
await page.waitForTimeout(3000);

// Get all text content to look for "Personal Concierge"
const pageText = await page.evaluate(() => document.body.innerText);
const hasPersonal = pageText.toLowerCase().includes('personal') || pageText.toLowerCase().includes('concierge');
console.log(`Page text mentions "personal/concierge": ${hasPersonal}`);

// Count all possible clickable gallery elements with different selectors
const counts = await page.evaluate(() => ({
  itemWrapper: document.querySelectorAll('[data-hook="item-wrapper"]').length,
  figure: document.querySelectorAll('figure[data-hook]').length,
  galleryItem: document.querySelectorAll('[class*="galleryItem"]').length,
  proGalleryItem: document.querySelectorAll('[class*="pro-gallery"] *[role="button"]').length,
  allButtons: document.querySelectorAll('[role="button"]').length,
  allLinks: document.querySelectorAll('a[href*="pgid"]').length,
}));
console.log('\nElement counts:', counts);

// Extract any hrefs with pgid
const pgidLinks = await page.evaluate(() =>
  [...document.querySelectorAll('a[href*="pgid"], [data-pgid]')]
    .map(el => el.href || el.dataset.pgid)
);
console.log('\nDirect pgid links found:', pgidLinks);

// Print any JSON responses that might have item info
if (allText.length) {
  console.log('\n=== Intercepted JSON responses ===');
  allText.forEach(({ url, body }) => {
    console.log(`\nURL: ${url}`);
    // Look for titles/names
    const titleMatches = body.match(/"(title|name|text)"\s*:\s*"([^"]{3,60})"/g);
    if (titleMatches) console.log('Titles:', titleMatches.slice(0, 10).join(', '));
  });
}

await browser.close();
