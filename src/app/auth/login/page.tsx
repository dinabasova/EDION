"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export default function LoginPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");         
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }


    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Login failed.");
        return;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("edionaz_token", data.token);
        localStorage.setItem("edionaz_user", JSON.stringify(data.user));
      }


      router.push("/chat");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#fffaef]">
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex items-center justify-center relative bg-[#fffaef] group">
        <div className="relative w-[90%] h-[90%] max-w-[900px] max-h-[900px] rounded-3xl overflow-hidden 
                        transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(134,0,33,0.4)]">
          <Image
            src="/lala.jpeg"
            alt="Login image"
            fill
            className="object-cover rounded-3xl transition-all duration-500 
                            group-hover:scale-105 group-hover:brightness-90"
          />
        </div>
      </div>

      {/* RIGHT FORM AREA */}
      <div className="flex items-start justify-center py-36 px-8 min-h-[720px]">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#3b3c55] mb-5">
            Welcome to Edionaz!
          </h2>

          {/* TABS */}
          <div className="relative w-full mb-6">
            <div className="absolute inset-0 bg-[#ffdce6] rounded-full h-12"></div>

            <div className="relative flex h-12">
              <Link
                href="/auth/login"
                className={`flex-1 flex items-center justify-center rounded-full text-sm transition-all relative
                  ${pathname === "/auth/login" ? "text-[#fffaef]" : "text-[#860021]"}`}
              >
                {pathname === "/auth/login" && (
                  <div className="absolute inset-1 mx-0 rounded-full bg-[#860021]"></div>
                )}
                <span className="relative z-10">Login</span>
              </Link>

              <Link
                href="/auth/signup"
                className={`flex-1 flex items-center justify-center rounded-full text-sm transition-all relative
                  ${pathname === "/auth/signup" ? "text-[#fffaef]" : "text-[#860021]"}`}
              >
                {pathname === "/auth/signup" && (
                  <div className="absolute inset-1 mx-0 rounded-full bg-[#860021]"></div>
                )}
                <span className="relative z-10">Register</span>
              </Link>
            </div>
          </div>

          <p className="text-sm text-[#3b3c55]/70 mb-6">
            Log in to continue learning with confidence.
          </p>

          {/* STATUS */}
          {error && (
            <div className="mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-[#86002140] px-4 py-3 mt-1 outline-none 
                focus:border-[#860021] bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-[#86002140] px-4 py-3 mt-1 outline-none 
                  focus:border-[#860021] bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="flex justify-between text-xs text-[#3b3c55]/70">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#860021]" />
                Remember me
              </label>
              <button type="button" className="hover:text-[#860021] transition">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#860021] text-[#fffaef] py-3 text-sm font-medium 
              transition-all duration-200 hover:bg-[#6a001a] hover:-translate-y-[2px] shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
