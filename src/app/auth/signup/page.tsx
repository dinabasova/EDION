"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState<string | null>(null);

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }


  function validatePassword(value: string) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccess(null);

    const newErrors = { name: "", username: "", email: "", password: "" };

    if (!email) newErrors.email = "Email cannot be blank";
    else if (!validateEmail(email))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password cannot be blank";
    else if (!validatePassword(password))
      newErrors.password =
        "Password must be at least 8 characters and include an uppercase letter and a number.";

    if (!username) newErrors.username = "Username cannot be blank";
    if (!name) newErrors.name = "Name cannot be blank";

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) return;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "";

        if (errorMsg.toLowerCase().includes("email")) {
          setErrors((prev) => ({ ...prev, email: errorMsg }));
        } else if (errorMsg.toLowerCase().includes("username")) {
          setErrors((prev) => ({ ...prev, username: errorMsg }));
        } else {
          setErrors((prev) => ({
            ...prev,
            email: errorMsg || "Something went wrong.",
          }));
        }

        return;
      }

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({ name: "", username: "", email: "", password: "" });


      setSuccess(
        "Registration successful. Please check your email to verify your account."
      );
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: "Something went wrong. Try again.",
      }));
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#fffaef]">
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex items-center justify-center relative bg-[#fffaef] group">
        <div className="relative w-[90%] h-[90%] max-w-[900px] max-h-[900px] rounded-3xl overflow-hidden 
                        transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(134,0,33,0.4)]">
          <Image
            src="/lulu.jpeg"
            alt="Signup image"
            fill
            className="object-cover rounded-3xl transition-all duration-500 
                       group-hover:scale-105 group-hover:brightness-90"
          />
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-start justify-center py-12 px-8 min-h-[720px]">
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-semibold text-[#3b3c55] mb-5">
            Welcome to Edionaz!
          </h2>

          {/* TABS */}
          <div className="relative w-full mb-6">
            <div className="absolute inset-0 bg-[#ffdce6] rounded-full h-12" />
            <div className="relative flex h-12">

              <Link
                href="/auth/login"
                className={`flex-1 flex items-center justify-center rounded-full text-sm relative
                ${pathname === "/auth/login" ? "text-[#fffaef]" : "text-[#860021]"}`}
              >
                {pathname === "/auth/login" && (
                  <div className="absolute inset-1 rounded-full bg-[#860021]" />
                )}
                <span className="relative z-10">Login</span>
              </Link>

              <Link
                href="/auth/signup"
                className={`flex-1 flex items-center justify-center rounded-full text-sm relative
                ${pathname === "/auth/signup" ? "text-[#fffaef]" : "text-[#860021]"}`}
              >
                {pathname === "/auth/signup" && (
                  <div className="absolute inset-1 rounded-full bg-[#860021]" />
                )}
                <span className="relative z-10">Register</span>
              </Link>

            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#3b3c55]/70 mb-4">
            Create your account and start learning confidently.
          </p>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-4 text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Full Name*
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-full border px-4 py-3 mt-1 bg-white shadow-sm outline-none
                  ${errors.name ? "border-red-500" : "border-[#86002140] focus:border-[#860021]"}`}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">⚠ {errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Email*
              </label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-full border px-4 py-3 mt-1 bg-white shadow-sm outline-none
                  ${errors.email ? "border-red-500" : "border-[#86002140] focus:border-[#860021]"}`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">⚠ {errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Password*
              </label>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-full border px-4 py-3 mt-1 bg-white shadow-sm outline-none
                    ${errors.password ? "border-red-500" : "border-[#86002140] focus:border-[#860021]"}`}
                />
              </div>

              {errors.password && (
                <p className="text-red-600 text-xs mt-1">⚠ {errors.password}</p>
              )}

              <p className="text-xs text-[#3b3c55]/60 mt-1">
                Password must be at least <strong>8 characters</strong> and
                include an uppercase letter and a number.
              </p>
            </div>

            {/* USERNAME */}
            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Username*
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full rounded-full border px-4 py-3 mt-1 bg-white shadow-sm outline-none
                  ${errors.username ? "border-red-500" : "border-[#86002140] focus:border-[#860021]"}`}
              />
              {errors.username && (
                <p className="text-red-600 text-xs mt-1">⚠ {errors.username}</p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#860021] text-[#fffaef] py-3 text-sm font-medium 
                         transition-all duration-200 hover:bg-[#6a001a] shadow-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
