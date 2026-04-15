import Image from "next/image";
import Link from "next/link";

export default function WrapBraPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Scalable Business Impact
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="/images/product_wrap-bra_7.jpg" alt="Wrap Bra athlete" fill className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="/images/product_wrap-bra_8.jpg" alt="Wrap Bra detail" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">VP Consumer and Tech</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Wrap Bra</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2019</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Developed and executed Inclusivity 2019 research program, identified key consumer insights and opportunities.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            An adaptable bra platform that addresses individual shape, size, identity and movement. A bra that adapts to cup size, torso shape and lower and higher profile presentation.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Today&apos;s current standards of sizing, categorization and performance are failing women. They believe their body is the issue, not the product that are offered. Their breasts are in constant change — dynamic, while product is static.
          </p>
        </div>
      </div>
    </div>
  );
}
