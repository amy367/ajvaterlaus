import Image from "next/image";
import Link from "next/link";

export default function NikeAppliedSciencePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/product_nike-applied-science.png"
            alt="Nike Applied Science — neuroscience research"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            VP Product Research NSRL · Nike Advanced Innovation · 2023–2025
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Nike Applied Science
          </h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">
            Apparel · Footwear · Mind Systems
          </p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Combined whole body science with Business of Innovation Thinking. Led team of Biomechanists,
            Physiologists, Neuro and Perception Scientists to launch new mind centered footwear to
            neuroscience at point of sale to Nike comfort material &apos;recipes&apos;.
          </p>
        </div>
      </div>
    </div>
  );
}
