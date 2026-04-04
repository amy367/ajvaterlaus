import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase text-[#c4a882] mb-4">
          Reach out
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl tracking-widest uppercase text-[#e8e4dc] leading-tight">
          Look forward to<br />hearing from you.
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-16 items-start">
        {/* Contact image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/contact_0.jpg"
            alt="Contact"
            fill
            className="object-cover"
          />
        </div>

        {/* Contact details */}
        <div className="flex flex-col gap-10 justify-center">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase text-[#555] mb-2">
              Phone
            </p>
            <a
              href="tel:+15038301150"
              className="text-[#e8e4dc] hover:text-[#c4a882] transition-colors text-lg"
            >
              +1-503-830-1150
            </a>
          </div>

          <div>
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] uppercase text-[#555] mb-2">
              Email
            </p>
            <a
              href="mailto:jonesae9@gmail.com"
              className="text-[#e8e4dc] hover:text-[#c4a882] transition-colors text-lg"
            >
              jonesae9@gmail.com
            </a>
          </div>

          <div className="w-12 h-px bg-[#333]" />

          <p className="text-[#888070] leading-relaxed text-sm">
            Available for speaking engagements, consulting, and leadership
            opportunities. Please reach out via email or phone.
          </p>
        </div>
      </div>
    </div>
  );
}
