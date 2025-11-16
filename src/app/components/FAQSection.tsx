"use client";

import { useState } from "react";

const faqs = [
  { q: "Как происходит работа?", a: "Ваш ответ здесь..." },
  { q: "Я смогу поступить за 4,5 месяца?", a: "Ваш ответ здесь..." },
  { q: "Какая будет занятость?", a: "Ваш ответ здесь..." },
  { q: "Я вообще ничего не понимаю в поступлении — я тоже смогу поступить за пару месяцев?", a: "Ваш ответ здесь..." },
  { q: "Я поступаю на генную инженерию // гейм дизайн — очень узкое направление — вы с таким работали?", a: "Ваш ответ здесь..." },
  { q: "Зависит ли результат от тарифа?", a: "Ваш ответ здесь..." },
  { q: "А что если мне не подойдет ментор?", a: "Ваш ответ здесь..." },
  { q: "Вы гарантируете поступление?", a: "Ваш ответ здесь..." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#860021]">FAQ</h2>

      <div className="space-y-2 mt-10">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          const isHover = hoverIndex === i;

          return (
            <div
              key={i}
              className="border-b border-[#860021]/20 pb-4"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center py-3 text-left"
              >
                <span
                  className={`text-lg transition-colors ${
                    isOpen ? "text-[#860021] font-semibold" : "text-[#3b3c55]"
                  }`}
                >
                  {item.q}
                </span>

                {/* Circle appears only on hover */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                    ${isHover ? "bg-[#860021]" : ""}
                  `}
                >
                  <span
                    className={`text-3xl font-light block leading-none transition-all duration-300
                      ${isHover ? "text-white" : "text-[#860021]"}
                      ${isOpen ? "rotate-45" : ""}
                    `}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 opacity-100 pt-2" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#3b3c55]/80 leading-relaxed">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
