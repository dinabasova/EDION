"use client";
import { useState } from "react";

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
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-semibold">Courses we provide</h2>
      <p className="mt-2 text-sm text-[#3b3c55]/70 max-w-xl">
        Choose the path that fits your goals.
      </p>

      <div className="mt-10 space-y-4">
        {COURSES.map(course => (
          <div
            key={course.id}
            onClick={() => setOpen(open === course.id ? null : course.id)}
            className="cursor-pointer rounded-2xl bg-white border border-[#3b3c55]/10 p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <span className="text-xl text-[#860021]">
                {open === course.id ? "–" : "+"}
              </span>
            </div>

            {open === course.id && (
              <p className="mt-3 text-sm text-[#3b3c55]/80">{course.desc}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
