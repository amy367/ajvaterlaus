#!/usr/bin/env node
/**
 * Uses Playwright to intercept and save all gallery images from the portfolio page.
 * This captures images that block direct downloads (403) by fetching them
 * through the browser with proper cookies and headers.
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

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const dist = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, dist);
        total += dist;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  await page.waitForTimeout(2000);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });

  // Intercept all image responses and save them
  const saved = new Map(); // url → filename
  let counter = 0;

  context.on('response', async (response) => {
    const url = response.url();
    const ct  = response.headers()['content-type'] || '';

    // Only capture Wix media images (not icons)
    if (!url.includes('wixstatic.com/media') && !url.includes('wix.com/media')) return;
    if (!ct.startsWith('image/')) return;
    if (saved.has(url)) return;

    // Skip tiny icons (social media etc — 24x24)
    if (url.includes('w_24') || url.includes('h_24')) return;

    try {
      const buf = await response.body();
      if (!buf || buf.length < 5000) return; // skip tiny files

      const ext = ct.includes('png') ? '.png' : ct.includes('webp') ? '.webp' : '.jpg';
      const filename = `portfolio_img_${counter++}${ext}`;
      const destContent = path.join(IMG_DIR, filename);
      const destPublic  = path.join(PUBLIC_IMG, filename);

      fs.writeFileSync(destContent, buf);
      fs.copyFileSync(destContent, destPublic);
      saved.set(url, filename);
      console.log(`  ✓ ${filename} (${(buf.length / 1024).toFixed(0)}KB)`);
    } catch (err) {
      // ignore
    }
  });

  const page = await context.newPage();
  console.log('→ Loading portfolio page...');
  await page.goto('https://www.ajvaterlaus.com/portfolio', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
  await page.waitForTimeout(4000);

  console.log('→ Scrolling to trigger all lazy loads...');
  // Scroll multiple times to ensure all gallery items load
  for (let i = 0; i < 3; i++) {
    await autoScroll(page);
    await page.waitForTimeout(2000);
  }

  await browser.close();

  const results = [...saved.entries()].map(([src, filename]) => ({ filename, src }));
  const outPath = path.join(ROOT, 'content', 'portfolio-gallery-full.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log(`\n✓ Captured ${results.length} portfolio images.`);
  console.log('  Saved to content/portfolio-gallery-full.json\n');

  if (results.length > 0) {
    console.log('Add these to app/portfolio/page.tsx:\n');
    results.forEach(({ filename }) => {
      console.log(`  { src: "/images/${filename}", alt: "" },`);
    });
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
