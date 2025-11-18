"use client";

import AosWrapper from "./AosWrapper";

export default function MentorsSection() {
  const mentors = ["Teacher A", "Teacher B", "Teacher C"];

  return (
    <div>
      <AosWrapper type="fade-up" delayMs={150}>
        <h2 className="text-4xl font-bold text-[#860021]">Our Mentors</h2>
      </AosWrapper>

      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {mentors.map((name, i) => (
          <AosWrapper
            key={name}
            type="zoom-in-up"
            delayMs={300 + i * 150}
            className="transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mentors bg-white p-6 rounded-2xl shadow-sm border border-[#3b3c55]/10 transition-all duration-200">
              <div className="h-40 bg-[#3b3c55]/20 rounded-xl mb-4 transition-all duration-200 hover:scale-105"></div>
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm text-[#3b3c55]/70">Professional Mentor</p>
            </div>
          </AosWrapper>
        ))}
      </div>
    </div>
  );
}
