"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#fffaef]/90 backdrop-blur z-50 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="text-xl font-bold text-[#860021]">Edionaz</div>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#home" className="hover:text-[#860021]">Home</a>
          <a href="#courses" className="hover:text-[#860021]">Courses</a>
          <a href="#teachers" className="hover:text-[#860021]">Teachers</a>
          <a href="#faq" className="hover:text-[#860021]">FAQ</a>
          <a href="#contact" className="hover:text-[#860021]">Contact</a>
        </div>

        <div className="hidden md:flex gap-4">
          <button className="rounded-full border border-[#860021] px-4 py-2 text-sm text-[#860021]">
            Login
          </button>
          <button className="rounded-full bg-[#860021] px-4 py-2 text-sm text-[#fffaef]">
            Sign up
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#fffaef] border-t border-[#3b3c55]/10 p-4 text-sm">
          <a href="#home" className="block py-2">Home</a>
          <a href="#courses" className="block py-2">Courses</a>
          <a href="#teachers" className="block py-2">Teachers</a>
          <a href="#faq" className="block py-2">FAQ</a>
          <a href="#contact" className="block py-2">Contact</a>

          <div className="mt-4 flex gap-3">
            <button className="flex-1 rounded-full border border-[#860021] px-4 py-2 text-sm text-[#860021]">
              Login
            </button>
            <button className="flex-1 rounded-full bg-[#860021] px-4 py-2 text-sm text-[#fffaef]">
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
