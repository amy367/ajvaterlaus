import Image from "next/image";
import Link from "next/link";

export default function Adidas1Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Scalable Business Impact
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_adidas-1_8.jpg" alt="adidas intelligent running shoe" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Director Mechanical Engineering</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">Adidas</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2005</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Directed the design, manufacturing and testing of the real-time responsive gearbox and cushioning system (adiPure). World&apos;s most advanced running shoe — the first intelligent personalized product. A running shoe that continuously senses and adapts the cushioning to the changing needs of the athlete based on speed, surface hardness and incline every few steps.
          </p>
          <div className="border border-[#2a2a2a] p-5 flex flex-col gap-2">
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555] mb-1">Awards</p>
            <p className="text-[#888070] text-sm">#1 Product Design Award 2005</p>
            <p className="text-[#888070] text-sm">Adidas &ldquo;Best of What&apos;s New&rdquo; Grand Award — Popular Science</p>
            <p className="text-[#888070] text-sm">The Good Design Award</p>
            <p className="text-[#888070] text-sm">Wallpaper Design Award</p>
          </div>
        </div>
      </div>
    </div>
  );
}
