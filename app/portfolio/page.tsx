import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  {
    title: "Turning Ideas into Tangible Future(s)",
    subtitle: "Innovation Systems",
    body: "As a mechanical engineer I know what it takes to build robots and smart soccer balls… My innovation background is diverse: robotics, digital product, retail experiences, footwear, apparel, technology, manufacturing, sustainable materials, applied science, and women-led innovation. 30 patents.",
    image: "/images/portfolio_0.jpg",
    href: "/portfolio/revolutionary-innovation",
  },
  {
    title: "Strategic Growth",
    subtitle: "Growth & Vision",
    body: "Sport has the capacity to change lives, but it's been limited to certain lives. Innovation is a catalyst for all to experience sport. I excel in translating abstract ideas, insights and information into bold new strategies and growth opportunities.",
    image: "/images/portfolio_1.jpg",
    href: "/portfolio/strategic-growth",
  },
  {
    title: "Connected Leadership",
    subtitle: "Leadership",
    body: "There is power in diverse teams, thought and partnerships and amplified when combined with curiosity, optimism and a shared purpose. Innovation is complex — a successful pipeline from idea to consumer requires strong leadership, vision and an aligned team.",
    image: "/images/portfolio_2.jpg",
    href: "/portfolio/connected-leadership",
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
                className="object-cover"
              />
            </div>
            <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "sm:col-start-1 sm:row-start-1" : ""}`}>
              <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase text-[#c4a882]">
                {pillar.subtitle}
              </p>
              <div className="w-12 h-px bg-[#c4a882]" />
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase text-[#e8e4dc]">
                {pillar.title}
              </h2>
              <p className="text-[#888070] leading-relaxed">{pillar.body}</p>
              <Link
                href={pillar.href}
                className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase px-6 py-2 border border-[#555] text-[#a09a90] hover:border-[#c4a882] hover:text-[#c4a882] transition-all self-start"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
