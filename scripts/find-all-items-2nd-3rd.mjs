import { chromium } from 'playwright';

const GALLERIES = [
  { name: '2nd-gallery', url: 'https://www.ajvaterlaus.com/2nd-gallery' },
  { name: '3rd-gallery', url: 'https://www.ajvaterlaus.com/3rd-gallery' },
];

const browser = await chromium.launch({ headless: true });

for (const { name, url } of GALLERIES) {
  console.log(`\n=== ${name} ===`);
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(5000);

  // Scroll to load all items
  await page.evaluate(async () => {
    for (let i = 0; i < 20; i++) {
      window.scrollBy(0, 500);
      await new Promise(r => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);

  const count = await page.evaluate(() =>
    document.querySelectorAll('[data-hook="item-wrapper"], figure[data-hook], [class*="galleryItem"]').length
  );
  console.log(`Found ${count} items`);

  const seen = new Map();
  for (let i = 0; i < count; i++) {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      await page.waitForTimeout(4000);
      const items = await page.$$('[data-hook="item-wrapper"], figure[data-hook], [class*="galleryItem"]');
      if (!items[i]) continue;
      await items[i].click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(2000);
      const pgidMatch = page.url().match(/pgid=([^&]+)/);
      if (!pgidMatch) continue;
      const pgid = pgidMatch[1];
      if (seen.has(pgid)) continue;
      const lines = (await page.evaluate(() => document.body.innerText)).split('\n')
        .map(l => l.trim()).filter(l => l.length > 3 && !['AJV','Home','Portfolio','Life','About','Contact'].includes(l));
      seen.set(pgid, lines.slice(0, 5).join(' | '));
      console.log(`[${i}] ${pgid}: ${lines.slice(0, 3).join(' | ')}`);
    } catch {}
  }
  await context.close();
}

await browser.close();
