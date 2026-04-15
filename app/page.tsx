import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#1a1a1a]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882] mb-6">
            Innovation Leader · Engineer · Visionary
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl tracking-widest uppercase text-[#e8e4dc] leading-tight mb-8">
            AJ Vaterlaus
          </h1>
          <p className="text-[#a09a90] text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            20+ years delivering billion-dollar platforms across robotics,
            digital products, footwear, apparel and human-centered innovation.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/portfolio"
              className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase px-8 py-3 border border-[#c4a882] text-[#c4a882] hover:bg-[#c4a882] hover:text-[#1a1a1a] transition-all"
            >
              View Work
            </Link>
            <Link
              href="/about"
              className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase px-8 py-3 border border-[#555] text-[#a09a90] hover:border-[#e8e4dc] hover:text-[#e8e4dc] transition-all"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid sm:grid-cols-3 gap-12 text-center">
        {[
          {
            title: "Turning Ideas into Scalable Business Impact",
            body: "Building the future through bold thinking and human-centered design.",
          },
          {
            title: "Strategic Growth",
            body: "Delivering billion-dollar platforms with cross-functional global teams.",
          },
          {
            title: "Connected Leadership",
            body: "Inspiring diverse teams across engineering, design, science and insight.",
          },
        ].map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-4">
            <div className="w-px h-12 bg-[#c4a882]/40" />
            <h2 className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] uppercase text-[#c4a882]">
              {item.title}
            </h2>
            <p className="text-[#888070] text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>

      {/* CTA strip */}
      <section className="border-t border-[#333] py-16 text-center px-6">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#555] mb-6">
          Let&apos;s connect
        </p>
        <Link
          href="/contact"
          className="font-[family-name:var(--font-display)] text-xs tracking-[0.25em] uppercase px-10 py-3 border border-[#555] text-[#a09a90] hover:border-[#c4a882] hover:text-[#c4a882] transition-all"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}
