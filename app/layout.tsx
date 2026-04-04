import type { Metadata } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AJ Vaterlaus",
  description:
    "Innovation leader, mechanical engineer, and strategic visionary with 20+ years creating the future across robotics, digital products, footwear, and apparel.",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/life", label: "Life" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1a1a1a] text-[#e8e4dc]">
        <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur border-b border-[#333]">
          <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-lg tracking-widest uppercase text-[#e8e4dc] hover:text-[#c4a882] transition-colors"
            >
              AJ Vaterlaus
            </Link>
            <ul className="flex gap-8">
              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#a09a90] hover:text-[#e8e4dc] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#333] py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#555] text-xs tracking-widest uppercase">
            <span className="font-[family-name:var(--font-display)]">
              © 2025 AJ Vaterlaus
            </span>
            <div className="flex gap-6">
              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-display)] hover:text-[#e8e4dc] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
