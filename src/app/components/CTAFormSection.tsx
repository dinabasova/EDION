"use client";

export default function CTAFormSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      {/* FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#3b3c55]/10">
        <h2 className="text-3xl font-semibold mb-3">
          Birinci addımı indi at
        </h2>

        <p className="text-sm text-[#3b3c55]/70 mb-8">
          Formu doldur və komandamız səninlə əlaqə saxlayacaq.
        </p>

        <form className="space-y-5">
          <div>
            <label className="text-xs font-medium">Ad və Soyad</label>
            <input
              type="text"
              className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-medium">Telefon nömrəsi</label>
            <input
              type="text"
              className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-medium">E-mail</label>
            <input
              type="email"
              className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-medium">Qısa mesaj</label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-full bg-[#860021] py-3 text-sm text-[#fffaef]"
            >
              Sınaq dərsə qoşul
            </button>

            <button
              type="submit"
              className="flex-1 rounded-full border border-[#860021] py-3 text-sm text-[#860021]"
            >
              Konsultasiyaya qoşul
            </button>
          </div>
        </form>
      </div>

      {/* IMAGE AREA */}
      <div className="bg-[#3b3c55] rounded-3xl flex items-center justify-center text-[#fffaef]/70 p-8">
        Burada sənin əlavə edəcəyin şəkil olacaq.
      </div>
    </div>
  );
}
