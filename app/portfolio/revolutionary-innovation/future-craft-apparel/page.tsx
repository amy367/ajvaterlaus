import Image from "next/image";
import Link from "next/link";

export default function FutureCraftApparelPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Scalable Business Impact
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_future-craft-apparel_7.jpg" alt="Future Craft Apparel" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_future-craft-apparel_8.jpg" alt="Future Craft Apparel detail" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">VP Consumer and Tech</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Future Craft Apparel</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2019</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Directed the Future Craft Apparel initiative, which blended AI, scanning technology and inclusive experience innovation, to deliver custom tights in a retail environment.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            A vision of a truly inclusive experience — removing how we use templates to explore, try, fit and purchase sportswear.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            A vision for the future of creation — Reconsidering the inputs to determine the outputs of design, removing any one individual and the norms of production. &ldquo;I don&apos;t have an off-the-rack body.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
