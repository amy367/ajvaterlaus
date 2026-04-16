import Image from "next/image";
import Link from "next/link";

export default function NikeWomensInnovationPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/product_nike-womens-innovation.png"
            alt="Nike Women's Innovation — Advanced Innovation Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            Nike Advanced Innovation · 2024–2025
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Nike Women&apos;s Innovation
          </h1>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Built and Led the Women&apos;s Innovation Agenda for the Advanced Innovation Team.
            Strategic Growth. Founded in Science.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Accelerating the 6% industry wide knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
}
