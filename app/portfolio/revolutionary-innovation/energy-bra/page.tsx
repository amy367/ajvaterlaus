import Image from "next/image";
import Link from "next/link";

export default function EnergyBraPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square overflow-hidden col-span-2">
            <Image src="/images/product_energy-bra_8.jpg" alt="Energy Bra" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_energy-bra_7.jpg" alt="Energy Bra detail" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Sr. Director Women&apos;s Innovation</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Energy Bra</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2019</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Combined the data learnings from 3000+ body scans with human-centered insight learnings to build the foundation for DI.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Deliver a bra that is supportive and comfortable that allows diverse bodies to move freely. Zone-specific innovative design using a new knit-rate dependent material.
          </p>
        </div>
      </div>
    </div>
  );
}
