"use client";

import { useState } from "react";
import AosWrapper from "./AosWrapper";

const COURSES = [
  {
    id: "english",
    title: "Edion English",
    desc: "Speaking-focused English practice with real-life scenarios, interviews, and presentations.",
  },
  {
    id: "business",
    title: "Edion Business",
    desc: "Business communication, email writing, meetings, negotiation skills and workplace productivity.",
  },
  {
    id: "mentor",
    title: "Edion Mentor",
    desc: "1:1 mentoring for career, resumes, LinkedIn, motivation letters, interviews and academic guidance.",
  },
];

export default function CoursesSection() {
  const [open, setOpen] = useState<string | null>(COURSES[0].id);

  return (
    <section id="courses">
      <AosWrapper type="fade-up" delayMs={150}>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#860021]">
          Courses we provide
        </h2>
        <p className="mt-2 text-sm text-[#3b3c55]/75 max-w-xl">
          Choose the path that fits your goals.
        </p>
      </AosWrapper>

      <div className="mt-8 space-y-4">
        {COURSES.map((course, index) => {
          const isOpen = open === course.id;
          const delayMs = 150 + (index + 1) * 150; // 300, 450, 600...

          return (
            <AosWrapper
              key={course.id}
              type="fade-up"
              delayMs={delayMs}
              className="smooth-transition"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : course.id)}
                className="w-full text-left bg-white border border-[#3b3c55]/15 rounded-2xl px-5 py-4 transition-all duration-200 ease-linear hover:-translate-y-[3px] hover:shadow-lg"
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="text-lg font-semibold">
                    {course.title}
                  </span>
                  <span className="text-2xl text-[#860021]">
                    {isOpen ? "–" : "+"}
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-[#3b3c55]/80">{course.desc}</p>
                </div>
              </button>
            </AosWrapper>
          );
        })}
      </div>
    </section>
  );
}
