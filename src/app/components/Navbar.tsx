"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AosWrapper from "./AosWrapper";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 w-full z-50 ${
        scrolled ? "bg-[#fffaef]/95 shadow-md" : "bg-[#fffaef]/80 shadow-sm"
      } backdrop-blur`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Logo */}
        <AosWrapper type="zoom-in-right" delayMs={150} className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Edionaz logo"
            width={100}
            height={40}
            className="object-contain cursor-pointer"
          />
        </AosWrapper>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-4 text-sm">
            <AosWrapper type="zoom-in-right" delayMs={300}>
              <a href="#home" className="nav-link">Home</a>
            </AosWrapper>

            <AosWrapper type="zoom-in-right" delayMs={450}>
              <a href="#courses" className="nav-link">Courses</a>
            </AosWrapper>

            <AosWrapper type="zoom-in-right" delayMs={600}>
              <a href="#teachers" className="nav-link">Teachers</a>
            </AosWrapper>

            <AosWrapper type="zoom-in-right" delayMs={600}>
              <a href="#mentors" className="nav-link">Mentors</a>
            </AosWrapper>

            <AosWrapper type="zoom-in-right" delayMs={750}>
              <a href="#faq" className="nav-link">FAQ</a>
            </AosWrapper>

            <AosWrapper type="zoom-in-right" delayMs={900}>
              <a href="#contact" className="nav-link">Contact</a>
            </AosWrapper>
          </div>

          {/* Right buttons */}
          <div className="flex gap-4">
            <AosWrapper type="zoom-in-right" delayMs={1150}>
              <Link href="/auth/login" className="btn-outline w-[90px] transition-all duration-200 ease-linear">Login</Link>
            </AosWrapper>

            <AosWrapper type="zoom-in-right" delayMs={1300}>
              <Link href="/auth/signup" className="btn-fill w-[100px] transition-all duration-200 ease-linear">Sign up</Link>
            </AosWrapper>
          </div>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#fffaef] border-t border-[#3b3c55]/10 p-4 text-sm">
          
          {[
            ["home", "Home"],
            ["courses", "Courses"],
            ["teachers", "Teachers"],
            ["mentors", "Mentors"],
            ["faq", "FAQ"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}

          <div className="mt-4 flex gap-3">
            <Link href="/auth/login" className="btn-outline flex-1 text-center">Login</Link>

            <Link href="/auth/signup" className="btn-fill flex-1 text-center">Sign up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
