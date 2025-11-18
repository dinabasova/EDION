"use client";

import { useState } from "react";
import Image from "next/image";
import AosWrapper from "./AosWrapper";

export default function TeachersSection() {
  const teachers = [
    {
      name: "Teacher A",
      country: "USA",
      university: "Harvard University",
      degree: "Computer Science",
      funding: "$150,000",
      strongSide:
        "Helps students improve communication and structure strong applications.",
      quote:
        "I joined Edionaz because I love helping young people find confidence and direction.",
      img: "/teacher1.png",
    },
    {
      name: "Teacher B",
      country: "UK",
      university: "Oxford University",
      degree: "Data Science",
      funding: "$90,000",
      strongSide:
        "Clear explanations and deep mentorship in analytical reasoning.",
      quote: "The most rewarding part is watching students grow in self-belief.",
      img: "/teacher2.png",
    },
    {
      name: "Teacher C",
      country: "Canada",
      university: "University of Toronto",
      degree: "Software Engineering",
      funding: "$120,000",
      strongSide:
        "Helps students build strong portfolios and practical technical projects.",
      quote: "I enjoy guiding students through real-world challenges.",
      img: "/teacher3.png",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % teachers.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? teachers.length - 1 : prev - 1));

  const t = teachers[index];

  return (
    <section id="teachers">
      <AosWrapper type="fade-up" delayMs={150}>
        <h2 className="text-4xl font-bold text-[#860021] mb-10">
          Our Teachers
        </h2>
      </AosWrapper>

      <AosWrapper type="fade-left" delayMs={300}>
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-6xl">
            <div
              className="
                bg-[#fffaf2] border border-[#860021]/30 rounded-3xl 
                p-16 flex gap-12 shadow-md transition-transform duration-300
                hover:shadow-xl hover:scale-[1.005]">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-[#244b50] overflow-hidden flex items-center justify-center">
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-[#860021]">{t.name}</h3>

                <p><strong>Country:</strong> {t.country}</p>
                <p><strong>University:</strong> {t.university}</p>
                <p><strong>Degree:</strong> {t.degree}</p>
                <p><strong>Funding:</strong> {t.funding}</p>
                <p><strong>Strong Side:</strong> {t.strongSide}</p>

                <p className="pt-4 italic text-[#860021] font-semibold">
                  Because:{" "}
                  <span className="text-[#6b001b] italic font-normal">
                    {t.quote}
                  </span>
                </p>
              </div>
            </div>

            {/* LEFT BUTTON */}
            <button
              onClick={prev}
              className="
                group absolute left-[10px] top-1/2 -translate-y-1/2
                bg-[#860021] text-white w-12 h-12 rounded-full
                flex items-center justify-center text-2xl shadow
                transition-all duration-200
              "
            >
              <span className="transition-transform duration-200 group-hover:scale-125">
                ‹
              </span>
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={next}
              className="
                group absolute right-[10px] top-1/2 -translate-y-1/2
                bg-[#860021] text-white w-12 h-12 rounded-full
                flex items-center justify-center text-2xl shadow
                transition-all duration-200
              "
            >
              <span className="transition-transform duration-200 group-hover:scale-125">
                ›
              </span>
            </button>
          </div>
        </div>
      </AosWrapper>
    </section>
  );
}

