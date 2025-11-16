"use client";

import { useState } from "react";
import Image from "next/image";

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
    quote:
      "The most rewarding part is watching students grow in self-belief.",
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
    quote:
      "I enjoy guiding students through real-world challenges.",
    img: "/teacher3.png",
  },
];

export default function TeachersSection() {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((prev) => (prev + 1) % teachers.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? teachers.length - 1 : prev - 1
    );

  const t = teachers[index];

  return (
    <section id="teachers">
      <h2 className="text-4xl font-bold text-[#860021]">
        Our Teachers
      </h2>

      <div className="relative flex items-center justify-center mt-10 space-y-4">
        <button
          onClick={prev}
          className="absolute left-5 bg-[#860021] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow hover:scale-105 transition"
        >
          ‹
        </button>

        <div className="border border-[#860021]/30 bg-[#fffaf2] rounded-3xl p-24 flex gap-12 w-full shadow-sm">
          
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

          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-[#860021]">{t.name}</h3>

            <p>
              <strong>Country:</strong> {t.country}
            </p>
            <p>
              <strong>University:</strong> {t.university}
            </p>
            <p>
              <strong>Degree:</strong> {t.degree}
            </p>
            <p>
              <strong>Funding:</strong> {t.funding}
            </p>
            <p>
              <strong>Strong Side:</strong> {t.strongSide}
            </p>

            <p className="pt-4 italic text-[#860021] font-semibold">
              Because:{" "}
              <span className="text-[#6b001b] italic font-normal">
                {t.quote}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={next}
          className="absolute right-5 bg-[#860021] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow hover:scale-105 transition"
        >
          ›
        </button>
      </div>
    </section>
  );
}
