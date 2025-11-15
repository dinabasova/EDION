"use client";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* LEFT */}
      <div className="flex-1 space-y-6">
        <p className="inline-block bg-[#860021]/10 text-[#860021] text-sm px-4 py-1 rounded-full">
          Edionaz • Education platform
        </p>

        <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
          Axıcı danış,{" "}
          <span className="text-[#860021]">özgüvənlə ünsiyyət qur</span>
        </h1>

        <p className="max-w-xl text-sm text-[#3b3c55]/80">
          A modern educational platform helping you improve communication,
          speaking, career and academic skills with mentors who understand both
          local context and global standards.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a
            href="#contact"
            className="rounded-full bg-[#860021] px-6 py-3 text-sm text-[#fffaef]"
          >
            Sınaq dərsə qoşul
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[#860021] px-6 py-3 text-sm text-[#860021]"
          >
            Konsultasiyaya qoşul
          </a>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-center">
        <div className="relative h-80 w-80 sm:h-96 sm:w-96">
          <div className="absolute inset-0 -rotate-3 bg-[#860021]/10 rounded-3xl"></div>
          <div className="absolute inset-4 rotate-3 bg-[#3b3c55]/90 rounded-3xl"></div>

          <div className="relative z-10 h-full w-full bg-[#fffaef] rounded-3xl flex items-center justify-center">
            <span className="text-xs text-[#3b3c55]/60">
              [Add your image here]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
