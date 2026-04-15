import Image from "next/image";
import Link from "next/link";

export default function FutureEnvironmentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/product_future-environments.png"
            alt="Future Environments — Future Hotels concept"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            Strategic Positioning Consult · Temple Jones Consulting · 2022–2023
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Future Environments
          </h1>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            One example of Temple Jones work. Future Hotels — built on the concept of Circadian Rhythm
            and embedded tech environments.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Consumer, tech, science input.
          </p>
        </div>
      </div>
    </div>
  );
}
