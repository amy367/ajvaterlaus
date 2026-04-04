import Image from "next/image";
import Link from "next/link";

export default function AdidasSmartballPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link href="/portfolio/revolutionary-innovation" className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block">
        ← Revolutionary Innovation
      </Link>
      <div className="grid sm:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/product_adidas-smartball_8.jpg" alt="adidas SmartBall" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882]">Director Digital Experience Creation</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-widest uppercase text-[#e8e4dc]">adidas SmartBall</h1>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555]">2014</p>
          <div className="w-12 h-px bg-[#333]" />
          <p className="text-[#a09a90] leading-relaxed">
            Defined the SmartBall product experience and direction through consumer and business research and oversaw the design and launch of the SmartBall. The first interactive &lsquo;smart&rsquo; soccer ball and mobile app — a FIFA-regulated ball with a sensor-integrated button to tell you how fast you kicked the ball, where you should improve, and how to train like your favorite pro.
          </p>
          <p className="text-[#888070] text-sm leading-relaxed">
            A feedback system originally created for the 11–17 year old soccer player to get better, have fun and compete against their friends.
          </p>
          <div className="border border-[#2a2a2a] p-5 flex flex-col gap-2">
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#555] mb-1">Awards</p>
            <p className="text-[#888070] text-sm">CES 2015 Best of Innovation Award</p>
            <p className="text-[#888070] text-sm">2015 Red Dot Design Award</p>
          </div>
        </div>
      </div>
    </div>
  );
}
