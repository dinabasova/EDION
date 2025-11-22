"use client";

import { useState, FormEvent } from "react";
import AosWrapper from "./AosWrapper";

type CTAType = "trial" | "consultation";

export default function CTAFormSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(
    e: FormEvent,
    selectedType: CTAType
  ) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // VALIDATION
    if (!name || !phone || !email) {
      setError("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Zəhmət olmasa düzgün E-mail daxil edin.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/cta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          type: selectedType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Xəta baş verdi. Yenidən yoxlayın.");
        return;
      }

      setSuccess(
        selectedType === "trial"
          ? "Sınaq dərs üçün müraciətiniz göndərildi!"
          : "Konsultasiya üçün müraciətiniz göndərildi!"
      );

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Server xətası. Zəhmət olmasa bir daha cəhd edin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* LEFT FORM */}
      <AosWrapper type="fade-up" delayMs={150}>
        <div className="form bg-white p-8 rounded-3xl shadow-lg border border-[#3b3c55]/10 transition-all duration-200">

          <h2 className="text-3xl font-semibold mb-3 text-[#860021]">
            Birinci addımı indi at
          </h2>

          <p className="text-sm text-[#3b3c55]/70 mb-8">
            Formu doldur və komandamız səninlə əlaqə saxlayacaq.
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              {success}
            </div>
          )}

          <form className="space-y-5">

            {/* Name */}
            <AosWrapper type="zoom-in" delayMs={300}>
              <div>
                <label className="text-xs font-medium">Ad və Soyad</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 mt-1"
                />
              </div>
            </AosWrapper>

            {/* Buttons */}
            <AosWrapper type="zoom-in" delayMs={900}>
              <div className="flex gap-4 pt-4">
                
                {/* TRIAL BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, "trial")}
                  className="demo2 flex-1 rounded-full bg-[#860021] py-3 text-sm text-[#fffaef]
                             transition-all duration-200 hover:-translate-y-1 hover:shadow-md disabled:opacity-60"
                >
                  {loading ? "Göndərilir..." : "Sınaq dərsə qoşul"}
                </button>

                {/* CONSULTATION BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, "consultation")}
                  className="consultation2 flex-1 rounded-full border border-[#860021] py-3 text-sm text-[#860021]
                             transition-all duration-200 hover:-translate-y-1 hover:bg-[#860021]/10 disabled:opacity-60"
                >
                  {loading ? "Göndərilir..." : "Konsultasiyaya qoşul"}
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
