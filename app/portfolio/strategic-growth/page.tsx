import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "/images/2nd_gallery_0.jpg",
  "/images/2nd_gallery_1.jpg",
  "/images/2nd_gallery_2.jpg",
  "/images/2nd_gallery_3.jpg",
  "/images/2nd_gallery_4.jpg",
  "/images/2nd_gallery_5.jpg",
  "/images/2nd_gallery_6.jpg",
  "/images/2nd_gallery_7.jpg",
  "/images/2nd_gallery_8.jpg",
  "/images/2nd_gallery_9.jpg",
  "/images/2nd_gallery_10.jpg",
];

export default function StrategicGrowthPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <Link
        href="/portfolio"
        className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase text-[#555] hover:text-[#c4a882] transition-colors mb-12 inline-block"
      >
        ← Back to Portfolio
      </Link>

      <div className="text-center mb-16">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882] mb-4">
          Growth &amp; Vision
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc] mb-8">
          Strategic Growth
        </h1>
        <p className="text-[#a09a90] max-w-2xl mx-auto leading-relaxed">
          As a strategic visionary and systems thinker with a human-centered approach, my passion is to envision
          and identify new opportunities for all people to experience sport. I excel in translating abstract ideas,
          insights and information into bold new strategies and growth opportunities.
        </p>
        <p className="text-[#c4a882] font-[family-name:var(--font-display)] text-sm tracking-widest uppercase mt-6">
          Through sport we have the power to change all lives.
        </p>
      </div>

      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {IMAGES.map((src, i) => (
          <div key={i} className="relative overflow-hidden break-inside-avoid">
            <Image
              src={src}
              alt={`Strategic growth work ${i + 1}`}
              width={600}
              height={800}
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
