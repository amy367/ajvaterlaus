import Image from "next/image";
import Link from "next/link";

export default function EsiPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_esi_8.jpg" alt="ESI robotic wafer handling equipment" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Mechanical Engineer</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">ESI</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">Semi conductor industry · 7 years</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Design and manufacture of robotic and automated wafer handling equipment. Laser, optics and electromechanical design.
          </p>
        </div>
      </div>
    </div>
  );
}
