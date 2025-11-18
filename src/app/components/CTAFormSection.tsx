"use client";

import AosWrapper from "./AosWrapper";

export default function CTAFormSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* LEFT FORM */}
      <AosWrapper type="fade-up" delayMs={150}>
        <div className="form bg-white p-8 rounded-3xl shadow-lg border border-[#3b3c55]/10 transition-all duration-200">

          <h2 className="text-3xl font-semibold mb-3 text-[#860021]">Birinci addımı indi at</h2>

          <p className="text-sm text-[#3b3c55]/70 mb-8">
            Formu doldur və komandamız səninlə əlaqə saxlayacaq.
          </p>

          <form className="space-y-5">

            {/* Name */}
            <AosWrapper type="zoom-in" delayMs={300}>
              <div>
                <label className="text-xs font-medium">Ad və Soyad</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
                />
              </div>
            </AosWrapper>

            {/* Phone */}
            <AosWrapper type="zoom-in" delayMs={450}>
              <div>
                <label className="text-xs font-medium">Telefon nömrəsi</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
                />
              </div>
            </AosWrapper>

            {/* Email */}
            <AosWrapper type="zoom-in" delayMs={600}>
              <div>
                <label className="text-xs font-medium">E-mail</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
                />
              </div>
            </AosWrapper>

            {/* Message */}
            <AosWrapper type="zoom-in" delayMs={750}>
              <div>
                <label className="text-xs font-medium">Qısa mesaj</label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
                />
              </div>
            </AosWrapper>

            {/* Buttons */}
            <AosWrapper type="zoom-in" delayMs={900}>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="demo2 flex-1 rounded-full bg-[#860021] py-3 text-sm text-[#fffaef] transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  Sınaq dərsə qoşul
                </button>

                <button
                  type="submit"
                  className="consultation2 flex-1 rounded-full border border-[#860021] py-3 text-sm text-[#860021] transition-all duration-200 hover:-translate-y-1 hover:bg-[#860021]/10"
                >
                  Konsultasiyaya qoşul
                </button>
              </div>
            </AosWrapper>

          </form>
        </div>
      </AosWrapper>

      {/* RIGHT IMAGE AREA */}
      <AosWrapper type="zoom-in-up" delayMs={300}>
        <div className="bg-[#3b3c55] rounded-3xl shadow-lg border border-[#3b3c55]/10 overflow-hidden h-full">

          <div className="p-8 h-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]">
            <p className="text-[#fffaef]/70 text-center text-lg leading-relaxed">
              Burada sənin əlavə edəcəyin şəkil olacaq.
            </p>
          </div>

        </div>
      </AosWrapper>

    </div>
  );
}




