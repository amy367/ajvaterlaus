import Image from "next/image";
import Link from "next/link";

export default function ShieldPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Revolutionary Innovation
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_shield_7.jpg" alt="adidas Shield mask" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">VP Consumer and Tech · Future Apparel Team</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Shield</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2020</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Building a culture that values process and re-frames failure, by highlighting the ongoing outputs of innovation projects that don&apos;t get to market. Blown Fiber Bra to Shield.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Taking a technology that failed and launching in a new product, new story and strategy.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Tokyo Olympics, Future Craft 2021, World Cup Qatar to knit commercialization for FW22.
          </p>
        </div>
      </div>
    </div>
  );
}
