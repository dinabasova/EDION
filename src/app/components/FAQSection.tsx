"use client";
import { useState } from "react";

const FAQ = [
  { q: "How do I join?", a: "Fill out the form below and we will contact you." },
  { q: "Do you offer trial lessons?", a: "Yes, you can join a trial lesson anytime." },
  { q: "Are the teachers qualified?", a: "Yes, all mentors are experienced professionals." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-semibold">FAQ</h2>

      <div className="mt-10 space-y-4">
        {FAQ.map((item, i) => (
          <div
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-[#3b3c55]/10 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{item.q}</p>
              <span className="text-xl text-[#860021]">
                {open === i ? "–" : "+"}
              </span>
            </div>

            {open === i && (
              <p className="mt-3 text-sm text-[#3b3c55]/80">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
