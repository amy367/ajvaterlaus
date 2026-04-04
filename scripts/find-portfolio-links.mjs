import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('https://www.ajvaterlaus.com/portfolio', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5000);

// Find all links and button targets
const links = await page.evaluate(() => {
  const found = [];
  document.querySelectorAll('a').forEach(a => {
    const href = a.href;
    const text = a.innerText.trim();
    if (href && !found.find(l => l.href === href)) {
      found.push({ text, href });
    }
  });
  // Also look for buttons with click handlers
  document.querySelectorAll('button, [role="button"]').forEach(btn => {
    found.push({ text: btn.innerText.trim(), tag: 'button' });
  });
  return found;
});

// Also get all visible text to read the section descriptions
const text = await page.evaluate(() => document.body.innerText);

console.log('=== ALL LINKS ===');
console.log(JSON.stringify(links, null, 2));
console.log('\n=== PAGE TEXT ===');
console.log(text.slice(0, 3000));

await browser.close();
