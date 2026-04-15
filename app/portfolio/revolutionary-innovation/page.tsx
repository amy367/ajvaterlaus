import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  { slug: "esi",                    title: "ESI",                          role: "Mechanical Engineer · 7 yrs",              image: "/images/product_esi_8.jpg" },
  { slug: "adidas-1",               title: "Adidas",                       role: "Director Mech. Engineering · 2005",         image: "/images/product_adidas-1_8.jpg" },
  { slug: "adidas-micoach",         title: "adidas miCoach",               role: "Director Mechanical Engineer · 2008–12",    image: "/images/product_adidas-micoach_8.jpg" },
  { slug: "adidas-smartball",       title: "adidas SmartBall",             role: "Director Digital Experience · 2014",        image: "/images/product_adidas-smartball_8.jpg" },
  { slug: "adidas-all-day",         title: "adidas All Day",               role: "Sr. Director Digital Experience · 2017",   image: "/images/product_adidas-all-day_8.jpg" },
  { slug: "strung",                 title: "Specialized — STRUNG",         role: "VP Consumer and Tech · 2019",               image: "/images/product_strung_8.jpg" },
  { slug: "4d",                     title: "Specialized — 4D",             role: "VP Consumer and Tech · 2019",               image: "/images/product_4d_8.jpg" },
  { slug: "sustainable-materials",  title: "Sustainable Materials",        role: "VP Consumer and Tech · 2019",               image: "/images/product_sustainable-materials_8.jpg" },
  { slug: "stay-in-play",           title: "Stay in Play",                 role: "Sr. Director Women's Innovation · 2019",   image: "/images/product_stay-in-play_7.jpg" },
  { slug: "future-craft-apparel",   title: "Future Craft Apparel",         role: "VP Consumer and Tech · 2019",               image: "/images/product_future-craft-apparel_7.jpg" },
  { slug: "shield",                 title: "Shield",                       role: "VP Consumer and Tech · 2020",               image: "/images/product_shield_7.jpg" },
  { slug: "energy-bra",             title: "Energy Bra",                   role: "Sr. Director Women's Innovation · 2019",   image: "/images/product_energy-bra_grid.png" },
  { slug: "personal-concierge",     title: "Personal Concierge",           role: "Product Strategy · Yohana & Panasonic Well", image: "/images/product_personal-concierge.png" },
  { slug: "nike-applied-science", title: "Nike Applied Science", role: "VP Product Research · Nike Advanced Innovation · 2024–2025", image: "/images/product_nike-applied-science.png" },
  { slug: "breaking-4", title: "Breaking 4", role: "Nike Advanced Innovation · June 2025 · Paris", image: "/images/product_breaking-4_1.png" },
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
          Innovation Systems
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc] mb-8">
          Turning Ideas into Tangible Future(s)
        </h1>
        <p className="text-[#a09a90] max-w-2xl mx-auto leading-relaxed">
          Many are industry firsts, award winning and all deliver against an athlete need, benefit and desire.
          My innovation background is diverse: robotics, digital product and experiences, retail experiences,
          footwear, apparel, technology, manufacturing, sustainable materials, applied science, women-led innovation. 30 patents.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            href={`/portfolio/revolutionary-innovation/${product.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.15em] uppercase text-[#e8e4dc] group-hover:text-[#c4a882] transition-colors">
              {product.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.1em] uppercase text-[#555] mt-1">
              {product.role}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
