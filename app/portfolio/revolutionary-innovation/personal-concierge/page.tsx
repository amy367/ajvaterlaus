import Image from "next/image";
import Link from "next/link";

export default function PersonalConciergePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/product_personal-concierge.png"
            alt="Yohana — Personal Concierge app"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            Product Strategy and Visioning · TempleJones Consulting
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Personal Concierge &amp; Family Centered Product
          </h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">
            Yohana &amp; Panasonic Well
          </p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Led the integration of innovative smart home products across digital and physical ecosystems, expanding Panasonic&apos;s market presence in both US and Japanese markets.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Developed a comprehensive product strategy that unified connected household devices, resulting in increased customer engagement and new revenue streams.
          </p>
        </div>
      </div>
    </div>
  );
}
