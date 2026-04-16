import Image from "next/image";
import Link from "next/link";

export default function FutureOfTrainingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/product_future-of-training.png"
            alt="Future of Training — Nike Advanced Innovation"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">
            Nike Advanced Innovation · 2024
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">
            Future of Training Framework
          </h1>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Business expansion into new products and experiences beyond the moment in sport.
            Warm Up, Move, Recover, Move Better.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            One half of the Mind Body Platform.
          </p>
        </div>
      </div>
    </div>
  );
}
