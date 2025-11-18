"use client";

import Image from "next/image";
import AosWrapper from "./AosWrapper";

export default function SocialMediaSection() {
  const socialLinks = [
    { href: "https://www.instagram.com/edionaz/", icon: "/social/instagram.png", alt: "Instagram" },
    { href: "https://www.facebook.com/edionaz/", icon: "/social/facebook.png", alt: "Facebook" },
    { href: "https://www.linkedin.com/company/edionaz/", icon: "/social/linkedin.png", alt: "LinkedIn" },
    { href: "https://www.tiktok.com/@edionaz", icon: "/social/tt.png", alt: "TikTok" },
    { href: "https://tiktok.com", icon: "/social/x.png", alt: "X" },
  ];

  return (
    <div className="text-center space-y-8">
      {/* TITLE */}
      <AosWrapper type="fade-up" delayMs={150}>
        <h2 className="text-3xl font-bold text-[#860021]">Our social medias</h2>
      </AosWrapper>

      <div className="flex justify-center gap-10 flex-wrap">
        {socialLinks.map((item, index) => (
          <AosWrapper
            key={item.alt}
            type="zoom-in-up"
            delayMs={300 + index * 150} 
          >
            <a 
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.alt}
            >
              <Image
                src={item.icon}
                alt={item.alt}
                width={50}
                height={50}
                className="transition-all duration-200 ease-linear hover:scale-125 hover:-translate-y-1"
              />
            </a>
          </AosWrapper>
        ))}
      </div>
    </div>
  );
}

