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
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_energy-bra_detail1.png" alt="Energy Bra — TechFit sports bra" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_energy-bra_detail2.png" alt="Energy Bra — TechFit tights" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            VP Apparel Innovation Future · 2022
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Energy Bra
          </h1>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Launch of TechFit bra powered by Rheon, absorbs 3x more energy than traditional material.
            Movement works with you, not against you.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Combined the data learnings from 3000+ body scans with human-centered insight learnings to
            build the foundation for a new sports bra. Creation of high-performance apparel, including
            the Techfit Control and Adizero Control lines, using reactive, energy-absorbing polymers.
            'Technology that stiffens upon impact to provide targeted, dynamic support to major muscle
            groups, aimed at enhancing athletic performance during high-intensity training and running.'
          </p>
        </div>
      </div>
    </div>
  );
}
