#!/usr/bin/env node
/**
 * Deep scraper for the portfolio page — scrolls to trigger lazy loading
 * and captures all gallery images including background-image sources.
 *
 * Usage: node scripts/scrape-portfolio.mjs
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMG_DIR   = path.join(ROOT, 'content', 'images');
const PUBLIC_IMG = path.join(ROOT, 'public', 'images');

fs.mkdirSync(IMG_DIR,    { recursive: true });
fs.mkdirSync(PUBLIC_IMG, { recursive: true });

function downloadFile(rawUrl, destPath) {
  return new Promise((resolve, reject) => {
    // Strip Wix query params that enforce small sizes, request full resolution
    let cleanUrl = rawUrl;
    try {
      const u = new URL(rawUrl);
      // Wix image service: remove w/h constraints to get full res
      u.searchParams.delete('w');
      u.searchParams.delete('h');
      cleanUrl = u.toString();
    } catch {}

    const proto = cleanUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    proto.get(cleanUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
  // Scroll back to top, then wait for any remaining lazy loads
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('→ Loading portfolio page...');
  await page.goto('https://www.ajvaterlaus.com/portfolio', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });
  await page.waitForTimeout(4000);

  console.log('→ Scrolling to trigger lazy loading...');
  await autoScroll(page);
  await page.waitForTimeout(3000);

  console.log('→ Extracting all image sources...');
  const srcs = await page.evaluate(() => {
    const found = new Set();

    // Standard img tags
    document.querySelectorAll('img').forEach((el) => {
      const src = el.src || el.getAttribute('data-src') || el.getAttribute('data-lazy-src') || '';
      if (src && !src.startsWith('data:')) found.add(src);
      // srcset
      const srcset = el.srcset || el.getAttribute('data-srcset') || '';
      if (srcset) {
        srcset.split(',').forEach((part) => {
          const url = part.trim().split(' ')[0];
          if (url && !url.startsWith('data:')) found.add(url);
        });
      }
    });

    // Background images on any element
    document.querySelectorAll('*').forEach((el) => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundImage;
      if (bg && bg !== 'none') {
        const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
        if (match && match[1] && !match[1].startsWith('data:')) {
          found.add(match[1]);
        }
      }
      // Also check inline style
      const inlineBg = el.style?.backgroundImage;
      if (inlineBg && inlineBg !== 'none') {
        const match = inlineBg.match(/url\(["']?([^"')]+)["']?\)/);
        if (match && match[1] && !match[1].startsWith('data:')) {
          found.add(match[1]);
        }
      }
    });

    return [...found];
  });

  console.log(`→ Found ${srcs.length} image sources. Filtering and downloading...`);

  // Filter: keep only Wix media URLs (wixstatic.com or wix.com), skip icons/SVGs
  const mediaSrcs = srcs.filter((src) => {
    if (src.includes('wixstatic.com') || src.includes('wix.com/media')) return true;
    if (src.includes('/images/')) return true; // already local
    return false;
  }).filter((src) => {
    // Skip SVGs and very small likely-icon paths
    const lower = src.toLowerCase();
    return !lower.endsWith('.svg') && !lower.includes('icon') && !lower.includes('logo');
  });

  console.log(`→ ${mediaSrcs.length} Wix media images to download.`);

  const downloaded = [];
  for (let i = 0; i < mediaSrcs.length; i++) {
    const src = mediaSrcs[i];
    const ext = (() => {
      try {
        const u = new URL(src);
        const e = path.extname(u.pathname);
        return e && e.length <= 5 ? e : '.jpg';
      } catch { return '.jpg'; }
    })();
    const filename = `portfolio_gallery_${i}${ext}`;
    const destContent = path.join(IMG_DIR, filename);
    const destPublic  = path.join(PUBLIC_IMG, filename);

    try {
      await downloadFile(src, destContent);
      fs.copyFileSync(destContent, destPublic);
      downloaded.push({ filename, src });
      console.log(`  ✓ ${filename}`);
    } catch (err) {
      console.warn(`  ✗ ${filename}: ${err.message}`);
    }
  }

  await browser.close();

  // Write out the list so we can paste into the page
  const listPath = path.join(ROOT, 'content', 'portfolio-gallery.json');
  fs.writeFileSync(listPath, JSON.stringify(downloaded, null, 2));
  console.log(`\n✓ Done. ${downloaded.length} images saved.`);
  console.log('  Check content/portfolio-gallery.json for the full list.');
}

main().catch((err) => { console.error(err); process.exit(1); });
