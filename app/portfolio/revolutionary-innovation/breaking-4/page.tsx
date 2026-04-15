import Image from "next/image";
import Link from "next/link";

export default function Breaking4Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_breaking-4_1.png" alt="Breaking 4 — Nike performance apparel" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_breaking-4_2.png" alt="Breaking 4 — Nike spike shoe" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            Nike Advanced Innovation · June 2025 · Paris
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Breaking 4
          </h1>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Faith Kipyegon&apos;s 4 min mile attempt to redefine human potential. Led Innovation program
            delivering breakthrough apparel and footwear products, pioneering manufacturing methods and
            material innovations, advancing women&apos;s performance science, and unlocking growth in Nike
            running and LA Olympic &apos;28 offerings.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Aerodynamics being the primary performance lever. Mastering the &apos;wildness&apos; of air.
          </p>
        </div>
      </div>
    </div>
  );
}
