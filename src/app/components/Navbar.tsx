"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#fffaef]/90 backdrop-blur z-50 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Edionaz logo"
            width={100}
            height={40}
            className="object-contain cursor-pointer"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-12">

          {/* Menu */}
          <div className="hidden md:flex gap-4 text-sm">
            <a href="#home" className="nav-link">Home</a>
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#teachers" className="nav-link">Teachers</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex gap-4">
            <button className="btn-outline w-[90px]">Login</button>
            <button className="btn-fill w-[100px]">Sign up</button>
          </div>

        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#fffaef] border-t border-[#3b3c55]/10 p-4 text-sm">
          <a href="#home" className="block py-2">Home</a>
          <a href="#courses" className="block py-2">Courses</a>
          <a href="#teachers" className="block py-2">Teachers</a>
          <a href="#faq" className="block py-2">FAQ</a>
          <a href="#contact" className="block py-2">Contact</a>

          <div className="mt-4 flex gap-3">
            <button className="btn-outline flex-1">Login</button>
            <button className="btn-fill flex-1">Sign up</button>
          </div>
        </div>
      )}
    </header>
  );
}
