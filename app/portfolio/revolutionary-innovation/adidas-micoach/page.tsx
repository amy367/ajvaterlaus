import Image from "next/image";
import Link from "next/link";

export default function AdidasMicoachPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Turning Ideas into Scalable Business Impact
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_adidas-micoach_8.jpg" alt="adidas miCoach coaching system" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Director Mechanical Engineer</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">adidas miCoach</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2008 – 2012</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Co-inventor and product and experience developer of the first interactive personal coaching system using heart rate monitor and shoe-mounted accelerometers. A system of wearable technology solutions to audibly guide users through their personalized running training plan, providing real-time coaching triggered by biometric feedback.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Family of products: iPhone, Android, Nokia, Blackberry app. Smart Run watch. Speed Cell Accelerometer for mobile coaching.
          </p>
        </div>
      </div>
    </div>
  );
}
