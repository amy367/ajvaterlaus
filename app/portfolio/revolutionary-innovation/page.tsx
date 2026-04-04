import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "/images/1st_gallery_0.jpg",
  "/images/1st_gallery_1.jpg",
  "/images/1st_gallery_2.jpg",
  "/images/1st_gallery_3.jpg",
  "/images/1st_gallery_4.jpg",
  "/images/1st_gallery_5.jpg",
  "/images/1st_gallery_6.jpg",
  "/images/1st_gallery_7.jpg",
  "/images/1st_gallery_8.jpg",
  "/images/1st_gallery_9.jpg",
  "/images/1st_gallery_10.jpg",
  "/images/1st_gallery_11.jpg",
  "/images/1st_gallery_12.jpg",
  "/images/1st_gallery_13.jpg",
  "/images/1st_gallery_14.jpg",
  "/images/1st_gallery_15.jpg",
  "/images/1st_gallery_16.jpg",
];

export default function RevolutionaryInnovationPage() {
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
          Disruptive Innovation
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc] mb-8">
          Revolutionary Innovation
        </h1>
        <p className="text-[#a09a90] max-w-2xl mx-auto leading-relaxed">
          Many are industry firsts, award winning and all deliver against an athlete need, benefit and desire.
          My innovation background is diverse: robotics, digital product and experiences, retail experiences,
          footwear, apparel, technology, manufacturing, sustainable materials, women-led innovation. 20+ patents.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {IMAGES.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={`Innovation work ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
