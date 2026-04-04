import Image from "next/image";
import Link from "next/link";

export default function AdidasAllDayPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Revolutionary Innovation
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_adidas-all-day_8.jpg" alt="adidas All Day women's app" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Sr. Director Digital Experience Creation</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">adidas All Day</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2017</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Built the All Day Women&apos;s App from the ground up — from identifying a new market focused on women and whole health to developing the technology and launching it for adidas. Winner: Best Sport BIJ, FastCo Fastbase 2018.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            It&apos;s not just your hour workout but the other 23hrs in a day. The first holistic fitness app designed for women, covering four pillars: movement, nutrition, mindfulness and sleep. Based in behavior change science for creating a healthier life.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            Partners: Volta, Duke, American College of Sports Medicine. Synced to Apple Health and Google Fit platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
