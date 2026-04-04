import Image from "next/image";

// Photo gallery — social icon files excluded (tiny <2KB PNGs)
const PHOTOS = [
  { src: "/images/life_0.jpg",  alt: "" },
  { src: "/images/life_2.jpg",  alt: "" },
  { src: "/images/life_3.jpg",  alt: "" },
  { src: "/images/life_4.jpg",  alt: "" },
  { src: "/images/life_5.jpg",  alt: "" },
  { src: "/images/life_6.jpg",  alt: "" },
  { src: "/images/life_8.jpg",  alt: "" },
  { src: "/images/life_9.jpg",  alt: "" },
  { src: "/images/life_10.jpg", alt: "" },
  { src: "/images/life_11.jpg", alt: "" },
  { src: "/images/life_12.jpg", alt: "" },
  { src: "/images/life_13.jpg", alt: "" },
  { src: "/images/life_14.jpeg", alt: "" },
  { src: "/images/life_15.jpeg", alt: "" },
  { src: "/images/life_16.jpeg", alt: "" },
  { src: "/images/life_17.jpeg", alt: "" },
];

export default function LifePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882] mb-4">
          Outside the boardroom
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc]">
          Life
        </h1>
      </div>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden break-inside-avoid group"
          >
            <Image
              src={photo.src}
              alt={photo.alt || `Life photo ${i + 1}`}
              width={600}
              height={800}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
