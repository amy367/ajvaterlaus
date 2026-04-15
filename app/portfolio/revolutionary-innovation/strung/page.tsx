import Image from "next/image";
import Link from "next/link";

export default function StrungPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_strung_8.jpg" alt="Specialized technology STRUNG" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">VP Consumer and Tech</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Specialized Technology — STRUNG</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2019</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Leading a team of technologists, engineers and scientists to discover and deliver disruptive material and manufacturing processes with high business and athlete impact. Commercially relevant and industry leadership.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Pioneered a new method that identifies Business, Consumer and Technology value throughout the innovation process. Commercialization stakeholder engagement, speed to market evaluation and digital tech benefits for Boost, 4D &amp; Strung.
          </p>
        </div>
      </div>
    </div>
  );
}
