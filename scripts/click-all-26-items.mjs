import { chromium } from 'playwright';

const KNOWN_PGIDS = new Set([
  'ivmbx5xj-e0b60fb6-a2b0-4ccd-91f6-decca7bd4d1d',
  'ivmbx5xj-ce570498-0b0f-45fb-8daf-5c7e2230dce9',
  'ivmbx5xj-99201625-2183-4503-8ed1-d0b75c8e5a9a',
  'ivmbx5xj-beb470bb-6eef-43a5-b67b-995e7482eb51',
  'ivmbx5xj-71aa4b2a-2f1e-40e6-9c50-7b2afcb8323e',
  'ivmbx5xj-0b6db151-68a0-4e4a-88d5-042e9008d788',
  'ivmbx5xj-3c3b2cd3-d5ec-4bd3-9b11-01be6aa0ea54',
  'ivmbx5xj-4467e017-a623-4bff-95ea-cda1541d7bd3',
  'ivmbx5xj-2b373fda-aacc-460a-8eb5-29d7664a757a',
  'ivmbx5xj-4b755ace-5a23-4a45-904a-15257fbe91ef',
  'ivmbx5xj-9fd5da5c-f422-4a59-a404-b33e93c73d53',
  'ivmbx5xj-d9f4a642-82e3-4a09-a0f4-8d1f5cf48825',
  'ivmbx5xj-4ebb2401-eaa7-4abe-973e-6daf6db9f222',
]);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();

// Click Next once to load second set
async function loadPage(nextClicks = 0) {
  await page.goto('https://www.ajvaterlaus.com/1st-gallery', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(5000);
  for (let i = 0; i < nextClicks; i++) {
    const btn = await page.$('[aria-label="Next Item"]');
    if (btn) { await btn.click(); await page.waitForTimeout(1500); }
  }
  await page.waitForTimeout(2000);
}

// Try items 0-12 with 0 next clicks, items 0-12 with 1 next click
for (const nextClicks of [0, 1]) {
  await loadPage(nextClicks);
  const items = await page.$$('[role="button"][aria-label="image"]');
  console.log(`\n--- nextClicks=${nextClicks}, ${items.length} items ---`);

  for (let i = 0; i < items.length; i++) {
    try {
      await loadPage(nextClicks);
      const fresh = await page.$$('[role="button"][aria-label="image"]');
      if (!fresh[i]) continue;
      await fresh[i].click({ timeout: 5000 });
      await page.waitForTimeout(2000);
      const pgidMatch = page.url().match(/pgid=([^&]+)/);
      if (!pgidMatch) continue;
      const pgid = pgidMatch[1];
      const isNew = !KNOWN_PGIDS.has(pgid);
      const lines = (await page.evaluate(() => document.body.innerText))
        .split('\n').map(l => l.trim())
        .filter(l => l.length > 2 && !['AJV','Home','Portfolio','Life','About','Contact'].includes(l))
        .slice(0, 3);
      console.log(`[${i}] ${isNew ? '*** NEW ***' : ''} pgid=${pgid.slice(-8)} | ${lines.join(' | ').slice(0, 100)}`);
    } catch (e) {
      console.log(`[${i}] skip: ${e.message.slice(0, 40)}`);
    }
  }
}

await browser.close();
