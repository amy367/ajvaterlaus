import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('https://www.ajvaterlaus.com/portfolio', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5000);

// Scroll to load everything
await page.evaluate(async () => {
  for (let i = 0; i < 10; i++) {
    window.scrollBy(0, 600);
    await new Promise(r => setTimeout(r, 500));
  }
});
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, 0));

await page.screenshot({ path: path.join(__dirname, '../content/portfolio-screenshot.png'), fullPage: true });
console.log('Screenshot saved to content/portfolio-screenshot.png');
await browser.close();
