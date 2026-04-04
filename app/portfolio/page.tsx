import Image from "next/image";

const PILLARS = [
  {
    title: "Revolutionary Innovation",
    body: "Driving bold, first-of-its-kind innovation across industries — from smart sport electronics and robotics to next-generation digital products and platforms.",
    image: "/images/portfolio_0.jpg",
  },
  {
    title: "Strategic Growth",
    body: "Translating abstract ideas into actionable growth strategies. Delivering billion-dollar product platforms and innovation pipelines from insight to market.",
    image: "/images/portfolio_1.jpg",
  },
  {
    title: "Connected Leadership",
    body: "Building and leading vibrant global teams of engineers, designers, scientists and insight experts through major organizational and brand transformations.",
    image: "/images/portfolio_2.jpg",
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882] mb-4">
          Work
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc]">
          Portfolio
        </h1>
      </div>

      <div className="space-y-24">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.title}
            className={`grid sm:grid-cols-2 gap-12 items-center ${
              i % 2 === 1 ? "sm:grid-flow-dense" : ""
            }`}
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden ${
                i % 2 === 1 ? "sm:col-start-2" : ""
              }`}
            >
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "sm:col-start-1 sm:row-start-1" : ""}`}>
              <div className="w-12 h-px bg-[#c4a882]" />
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-[#e8e4dc]">
                {pillar.title}
              </h2>
              <p className="text-[#888070] leading-relaxed">{pillar.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Expertise list */}
      <div className="mt-24 border-t border-[#333] pt-16">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#555] mb-10 text-center">
          Areas of Expertise
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            "Robotics & Automation",
            "Digital Product & Experience",
            "Footwear & Apparel",
            "Consumer Technology",
            "Women-Led Innovation",
            "Human-Centered Research",
            "Innovation Strategy",
            "Cross-Functional Leadership",
            "Patent Development",
          ].map((area) => (
            <div
              key={area}
              className="font-[family-name:var(--font-display)] text-xs tracking-[0.15em] uppercase text-[#555] border border-[#2a2a2a] py-4 px-3 hover:border-[#c4a882] hover:text-[#c4a882] transition-all"
            >
              {area}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
