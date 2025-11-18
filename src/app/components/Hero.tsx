"use client";

import AosWrapper from "./AosWrapper";

export default function Hero() {
  return (
    <section className="min-h-[40vh] flex flex-col lg:flex-row items-center gap-12">
      {/* LEFT: text */}
      <div className="flex-1 space-y-6">
        <AosWrapper type="fade-up" delayMs={150}>
          <p className="inline-block bg-[#860021]/10 text-[#860021] text-sm px-4 py-1 rounded-full tracking-wide">
            Edionaz • Education platform
          </p>
        </AosWrapper>

        <AosWrapper type="fade-up" delayMs={300}>
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
            Axıcı danış,{" "}
            <span className="text-[#860021]">özgüvənlə ünsiyyət qur.</span>
          </h1>
        </AosWrapper>

        <AosWrapper type="fade-up" delayMs={450}>
          <p className="max-w-xl text-sm sm:text-base text-[#3b3c55]/80">
            Speaking, communication, career and academic skills — built together
            with mentors who understand both your local reality and global
            opportunities.
          </p>
        </AosWrapper>

        <AosWrapper type="fade-up" delayMs={600}>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="demo rounded-full bg-[#860021] px-7 py-3 text-sm text-[#fffaef] shadow-md transition-all duration-200 ease-linear hover:-translate-y-[2px] hover:shadow-lg"
            >
              Sınaq dərsə qoşul
            </a>

            <a
              href="#contact"
              className="consultation rounded-full border border-[#860021] px-7 py-3 text-sm text-[#860021] transition-all duration-200 ease-linear hover:-translate-y-[2px] hover:bg-[#860021]/10"
            >
              Konsultasiyaya qoşul
            </a>
          </div>
        </AosWrapper>
      </div>

    {/* RIGHT: text */}
      <AosWrapper type="fade-up" delayMs={600} className="flex-1 flex justify-center">
        <div className="relative h-80 w-80 sm:h-96 sm:w-96 transition-all duration-200 ease-linear hover:scale-[1.02]">
          <div className="absolute inset-0 -rotate-3 bg-[#860021]/10 rounded-3xl" />
          <div className="absolute inset-4 rotate-3 bg-[#3b3c55]/90 rounded-3xl" />
          <div className="relative z-10 h-full w-full bg-[#fffaef] rounded-3xl flex items-center justify-center">
            <span className="text-xs text-[#3b3c55]/60 text-center px-4">
              Burada sonra hero şəkil / illustration olacaq.
            </span>
          </div>
        </div>
      </AosWrapper>
    </section>
  );
}


