import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "/images/3rd_gallery_0.jpg",
  "/images/3rd_gallery_1.jpg",
];

export default function ConnectedLeadershipPage() {
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
          Leadership
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc] mb-8">
          Connected Leadership
        </h1>
        <p className="text-[#a09a90] max-w-2xl mx-auto leading-relaxed">
          Innovation is complex and a successful pipeline from idea to consumer requires strong leadership,
          vision, focus and an aligned and motivated team. One team with a culture to dream big and deliver
          impact. With strong relationships, we can do great things — activate the SBP, be recognized as a
          top global innovator and be the Best Sport Brand in the world.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {IMAGES.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={src}
              alt={`Connected leadership ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
