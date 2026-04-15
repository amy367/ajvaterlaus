import Image from "next/image";
import Link from "next/link";

export default function SustainableMaterialsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Tangible Future(s)
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_sustainable-materials_7.jpg" alt="Sustainable shoe" fill className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image src="/images/product_sustainable-materials_8.jpg" alt="Sustainable materials" fill className="object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">VP Consumer and Tech</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Sustainable Materials &amp; Processes</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2019</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Leading a team of technologists, engineers and scientists to explore and develop sustainable material and processes of the future.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Aligning the future organization to brand Sustainability goals by integrating and commercializing sustainable materials into core innovation efforts: Bostro, Mylo, Algae, NTER-MAN — idea to commercialization.
          </p>
        </div>
      </div>
    </div>
  );
}
