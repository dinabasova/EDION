"use client";

import AosWrapper from "./AosWrapper";
import {
  ArrowIcon,
  LocationIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
} from "./icons/FooterIcons";
import {
  InstagramIcon,
  XIcon,
  FacebookIcon,
  LinkedinIcon,
} from "./icons/SocialIcons";





export default function Footer() {
  return (
    <>
      <footer className="bg-[#3b3c55] text-[#fffaef] pt-14 pb-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

          {/* === COMPANY + SOCIAL === */}
          <AosWrapper type="fade-up" delayMs={150}>
            <div>
              <h2 className="text-3xl font-bold flex items-center mb-3">
                <i className="fa-solid fa-graduation-cap text-[#860021]"></i>
                Edionaz
              </h2>

              <p className="text-sm text-[#fffaef]/70 mb-5">
                Bizimlə əlaqə saxlaya bilərsiniz:
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-4 mt-4">
                {[
                  { icon: InstagramIcon, url: "https://www.instagram.com/edionaz/" },
                  { icon: XIcon, url: "https://x.com/yourprofile" },
                  { icon: FacebookIcon, url: "https://www.facebook.com/edionaz/" },
                  { icon: LinkedinIcon, url: "https://www.linkedin.com/company/edionaz/" },
                ].map(({ icon: Icon, url }, i) => (
                  <AosWrapper key={i} type="zoom-in" delayMs={200 + i * 80}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        h-12 w-12 flex items-center justify-center rounded-full
                        border-2 border-[#860021] text-[#860021]
                        hover:bg-[#860021] hover:text-[#fffaef]
                        transition-all duration-300 hover:scale-110
                      "
                    >
                      <Icon />
                    </a>
                  </AosWrapper>
                ))}
                
              </div>

              {/* LANGUAGE SWITCH */}
              <AosWrapper type="fade-up" delayMs={450}>
                <div className="mt-6">
                  <label className="text-xs block mb-1">Language:</label>
                  <select className="bg-[#ffffff25] text-[#fffaef] rounded-full px-3 py-1 text-sm outline-none">
                    <option value="az">AZ</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </AosWrapper>
            </div>
          </AosWrapper>

          {/* === QUICK LINKS === */}
          <AosWrapper type="fade-up" delayMs={250}>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

              <div className="space-y-4 text-[#fffaef]/80">
                {[
                  ["Home", "#home"],
                  ["Courses", "#courses"],
                  ["Teachers", "#teachers"],
                  ["Mentors", "#mentors"],
                  ["FAQ", "#faq"],
                  ["Contact", "#contact"],
                ].map(([label, href], i) => (
                  <AosWrapper key={href} type="fade-right" delayMs={300 + i * 60}>
                    <a
                      href={href}
                      className="
                        flex items-center gap-3 
                        group 
                        transition-colors duration-300 
                        hover:text-white hover:font-bold
                      "
                    >
                      <ArrowIcon />

                      <span
                        className="
                          inline-block
                          transition-transform duration-500 ease-out
                          group-hover:translate-x-2
                        "
                      >
                        {label}
                      </span>
                    </a>
                  </AosWrapper>
                ))}
              </div>
            </div>
          </AosWrapper>

          {/* === CONTACT INFO === */}
          <AosWrapper type="fade-up" delayMs={350}>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>

              <div className="space-y-4 text-[#fffaef]/80">
                {[
                  [LocationIcon, "Baku, Azerbaijan"],
                  [PhoneIcon, "+994 10 712 78 88"],
                  [MailIcon, "learnedionaz@gmail.com"],
                  [ClockIcon, "Always Available"],
                ].map(([Icon, text], i) => (
                  <AosWrapper key={i} type="fade-left" delayMs={400 + i * 60}>
                    <div className="flex items-center gap-3">
                      <Icon />
                      <span>
                        {text}
                      </span>
                    </div>
                  </AosWrapper>
                ))}
              </div>
            </div>
          </AosWrapper>

          {/* === NEWSLETTER === */}
          <AosWrapper type="fade-up" delayMs={450}>
            <div>
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>

              <p className="text-sm text-[#fffaef]/70 mb-4">
                Subscribe for latest updates
              </p>

              <AosWrapper type="zoom-in" delayMs={500}>
                <input
                  type="email"
                  placeholder="enter your email"
                  className="
                    w-full py-3 px-5 rounded-full 
                    bg-transparent border-2 border-[#fffaef]/70 
                    text-[#fffaef] placeholder-[#fffaef]/40 outline-none
                  "
                />
              </AosWrapper>

              <AosWrapper type="zoom-in" delayMs={600}>
                <button
                  className="
                    w-full mt-4 py-2 rounded-full 
                    border-2 border-[#860021]/80 
                    text-[#fffaef]
                    hover:bg-[#860021] hover:text-[#fffaef] hover:font-bold 
                    transition-all duration-300 hover:scale-[1.05]
                  "
                >
                  Subscribe
                </button>
              </AosWrapper>
            </div>
          </AosWrapper>
        </div>
      </footer>

      {/* === BOTTOM COPYRIGHT BAR === */}
      
        <div className="bg-[#860021] text-center text-sm py-3 text-[#fffaef]/70">
           <AosWrapper type="zoom-in" delayMs={100}>
              Created by{" "}
          <span className="text-[#fffaef] font-semibold">Diana Abbasova</span> |
          All Rights Reserved
          </AosWrapper>
        </div>
    </>
  );
}
