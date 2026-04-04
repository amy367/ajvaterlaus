#!/usr/bin/env node
/**
 * Playwright scraper for ajvaterlaus.com
 * Extracts rendered content from each page and saves as Markdown + downloads images.
 *
 * Usage: node scripts/scrape.mjs
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

const BASE_URL = 'https://www.ajvaterlaus.com';
const PAGES = [
  { slug: 'home',      url: '/' },
  { slug: 'portfolio', url: '/portfolio' },
  { slug: 'life',      url: '/life' },
  { slug: 'about',     url: '/about' },
  { slug: 'contact',   url: '/contact' },
];

const CONTENT_DIR  = path.join(ROOT, 'content', 'pages');
const IMG_DIR      = path.join(ROOT, 'content', 'images');
const PUBLIC_IMG   = path.join(ROOT, 'public', 'images');
const MANIFEST     = path.join(ROOT, 'content', 'manifest.json');

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.mkdirSync(IMG_DIR,     { recursive: true });
fs.mkdirSync(PUBLIC_IMG,  { recursive: true });

// ─── helpers ────────────────────────────────────────────────────────────────

function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9_.-]/gi, '_').replace(/_+/g, '_').slice(0, 80);
}

function downloadFile(rawUrl, destPath) {
  return new Promise((resolve, reject) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      return reject(new Error(`Invalid URL: ${rawUrl}`));
    }
    const proto = parsedUrl.protocol === 'https:' ? https : http;
    const file = fs.createWriteStream(destPath);
    proto.get(rawUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${rawUrl}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function extFromUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    const ext = path.extname(u.pathname);
    // Wix images often have no extension — default to .jpg
    return ext && ext.length <= 5 ? ext : '.jpg';
  } catch {
    return '.jpg';
  }
}

// ─── page extraction ─────────────────────────────────────────────────────────

async function extractPage(page, slug, url) {
  const fullUrl = BASE_URL + url;
  console.log(`\n→ Scraping: ${fullUrl}`);

  await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 60000 });
  // Give Wix extra time to hydrate
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    // Title
    const title = document.title.replace(/\s*\|\s*Ajvaterlaus.*$/i, '').trim();

    // Headings
    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4').forEach((el) => {
      const text = el.innerText.trim();
      if (text) headings.push({ tag: el.tagName.toLowerCase(), text });
    });

    // Paragraphs / body text
    const paragraphs = [];
    document.querySelectorAll('p, [class*="paragraph"], [class*="richText"] span, [class*="body"]').forEach((el) => {
      const text = el.innerText.trim();
      if (text && text.length > 10 && !paragraphs.includes(text)) {
        paragraphs.push(text);
      }
    });

    // Images
    const images = [];
    const seen = new Set();
    document.querySelectorAll('img').forEach((el) => {
      let src = el.src || el.getAttribute('data-src') || '';
      // Skip tiny icons / tracking pixels
      if (!src || seen.has(src)) return;
      if (el.naturalWidth < 10 || el.naturalHeight < 10) return;
      seen.add(src);
      images.push({
        src,
        alt: el.alt || '',
        width: el.naturalWidth,
        height: el.naturalHeight,
      });
    });

    // Nav links (from the header / nav elements)
    const navLinks = [];
    document.querySelectorAll('nav a, header a, [class*="menu"] a').forEach((el) => {
      const href = el.getAttribute('href') || '';
      const text = el.innerText.trim();
      if (text && href && !navLinks.find((l) => l.href === href)) {
        navLinks.push({ text, href });
      }
    });

    return { title, headings, paragraphs, images, navLinks };
  });

  // Download images
  const imageRefs = [];
  for (const img of data.images) {
    try {
      const ext = extFromUrl(img.src);
      const filename = sanitizeFilename(`${slug}_${imageRefs.length}${ext}`);
      const destContent = path.join(IMG_DIR, filename);
      const destPublic  = path.join(PUBLIC_IMG, filename);

      await downloadFile(img.src, destContent);
      fs.copyFileSync(destContent, destPublic);

      imageRefs.push({ filename, alt: img.alt, originalUrl: img.src });
      console.log(`  ✓ image: ${filename}`);
    } catch (err) {
      console.warn(`  ✗ image failed (${img.src.slice(0, 60)}…): ${err.message}`);
    }
  }

  // Build Markdown
  const frontmatter = [
    '---',
    `title: "${data.title || slug}"`,
    `slug: "${slug}"`,
    `url: "${url}"`,
    `scrapedAt: "${new Date().toISOString()}"`,
    '---',
    '',
  ].join('\n');

  const headingsMd = data.headings
    .map((h) => `${'#'.repeat(h.tag === 'h1' ? 1 : h.tag === 'h2' ? 2 : h.tag === 'h3' ? 3 : 4)} ${h.text}`)
    .join('\n\n');

  const paragraphsMd = data.paragraphs.join('\n\n');

  const imagesMd = imageRefs
    .map((img) => `![${img.alt}](/images/${img.filename})`)
    .join('\n\n');

  const navMd = data.navLinks.length
    ? '## Navigation\n\n' + data.navLinks.map((l) => `- [${l.text}](${l.href})`).join('\n')
    : '';

  const md = [frontmatter, headingsMd, paragraphsMd, imagesMd, navMd]
    .filter(Boolean)
    .join('\n\n');

  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  fs.writeFileSync(mdPath, md, 'utf8');
  console.log(`  ✓ saved: content/pages/${slug}.md`);

  return {
    slug,
    url,
    title: data.title,
    headings: data.headings,
    imageCount: imageRefs.length,
    images: imageRefs,
    navLinks: data.navLinks,
  };
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const manifest = { scrapedAt: new Date().toISOString(), baseUrl: BASE_URL, pages: [] };

  for (const { slug, url } of PAGES) {
    try {
      const result = await extractPage(page, slug, url);
      manifest.pages.push(result);
    } catch (err) {
      console.error(`  ✗ FAILED ${slug}: ${err.message}`);
      manifest.pages.push({ slug, url, error: err.message });
    }
  }

  await browser.close();

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('\n✓ Manifest saved: content/manifest.json');
  console.log('\nDone! Review content/pages/*.md and fill in any missing content.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
