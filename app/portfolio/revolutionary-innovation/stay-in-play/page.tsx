import Image from "next/image";
import Link from "next/link";

export default function StayInPlayPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image src="/images/product_stay-in-play_new.jpg" alt="Stay in Play apparel" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Sr. Director Women&apos;s Innovation</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Stay in Play</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2019</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Set future vision and direction for how we innovate for female athletes. Led industry leading first-ever menstrual innovation through breakthrough research and product launches.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Set holistic strategy and implementation plan to expand athlete community to better include menstruating athletes: Puberty, Menstruation, Maternity and Menopause.
          </p>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">
            Performance Superpowers
          </p>
        </div>
      </div>
    </div>
  );
}
