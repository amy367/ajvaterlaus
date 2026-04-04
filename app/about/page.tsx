import Image from "next/image";

const BIO_PARAGRAPHS = [
  "I am a world class innovation leader of large global cross functional teams of engineers, designers, technologists, scientists and insight/foresight experts. A change leader, leading teams and brands through new innovation processes and thinking informed by business, technology and consumer shifts. Delivering billion dollars platforms to industry leading insights and research.",
  "I am a strategic visionary, a big thinker, with a human-centered approach to innovation and teams driven by creating equitable experiences for all. My curiosity, optimism and approach is informed by diverse communities and thought partners and fueled by collaboration. I excel in translating abstract ideas and information into bold new innovation strategies to drive forward momentum and growth.",
  "With over 20 years of experience creating the new, ranging from robotics and automation, digital product and experiences, footwear, apparel, technology, women-led innovation and human centered research.",
  "As a mechanical engineer I have built robots and smart soccer balls. As a leader, I build vibrant teams and new paths to deliver the future today to the future(s) of tomorrow.",
  "I am co-inventor of 20+ patents ranging from sport electronic training systems to digital content for physical product.",
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882] mb-4">
          The person behind the work
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc]">
          About Me
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-16 items-start">
        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src="/images/about_0.jpg"
            alt="AJ Vaterlaus"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-8">
          {BIO_PARAGRAPHS.map((para, i) => (
            <p key={i} className="text-[#a09a90] leading-relaxed">
              {para}
            </p>
          ))}

          {/* Highlights */}
          <div className="mt-4 grid grid-cols-2 gap-6">
            {[
              { stat: "20+", label: "Years of Experience" },
              { stat: "20+", label: "Patents Co-Invented" },
              { stat: "$B", label: "Platforms Delivered" },
              { stat: "Global", label: "Team Leadership" },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-[#c4a882] pl-4">
                <div className="font-[family-name:var(--font-display)] text-2xl text-[#c4a882]">
                  {item.stat}
                </div>
                <div className="font-[family-name:var(--font-display)] text-xs tracking-[0.15em] uppercase text-[#555] mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
