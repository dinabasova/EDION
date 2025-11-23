"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const passwordMessage =
  "Password must be at least 8 characters and include an uppercase letter and a number.";

function validatePassword(value: string) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}

function InvalidTokenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaef]">
      <div className="text-center">
        <p className="text-red-600 text-sm mb-4">
          Invalid or missing reset token.
        </p>
        <Link href="/auth/login" className="text-[#860021] underline text-sm">
          Back to login
        </Link>
      </div>
    </div>
  );
}



export default function ResetPasswordPage() {

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

 const rawToken = searchParams.get("token");


if (!rawToken) {
  return <InvalidTokenPage />;
}

let token = rawToken.trim();

try {
  token = decodeURIComponent(token);
} catch {
  return <InvalidTokenPage />;
}

if (token.length < 40) {
  return <InvalidTokenPage />;
}



  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validatePassword(password)) {
      setError(passwordMessage);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not reset password.");
        return;
      }

      setSuccess("Your password has been updated. You can now log in.");
      setPassword("");
      setConfirm("");

      
      setTimeout(() => router.push("/auth/login"), 2000);

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
            alt="Reset password image"
            fill
            className="object-cover rounded-3xl transition-all duration-500 
                       group-hover:scale-105 group-hover:brightness-90"
          />
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-start justify-center py-36 px-8 min-h-[720px]">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#3b3c55] mb-5">
            Reset your password
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
                  <div className="absolute inset-1 mx-0 rounded-full bg-[#860021]" />
                )}
                <span className="relative z-10">Login</span>
              </Link>

              <Link
                href="/auth/signup"
                className={`flex-1 flex items-center justify-center rounded-full text-sm relative
                  ${pathname === "/auth/signup" ? "text-[#fffaef]" : "text-[#860021]"}`}
              >
                {pathname === "/auth/signup" && (
                  <div className="absolute inset-1 mx-0 rounded-full bg-[#860021]" />
                )}
                <span className="relative z-10">Register</span>
              </Link>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              {success}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-[#86002140] px-4 py-3 mt-1 outline-none 
                  focus:border-[#860021] bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#3b3c55]/80">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-full border border-[#86002140] px-4 py-3 mt-1 outline-none 
                  focus:border-[#860021] bg-white shadow-sm"
              />
            </div>

            <p className="text-xs text-[#3b3c55]/60">
              {passwordMessage}
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#860021] text-[#fffaef] py-3 text-sm font-medium 
              transition-all duration-200 hover:bg-[#6a001a] hover:-translate-y-[2px] shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Updating..." : "Update password"}
            </button>

            <div className="text-xs text-[#3b3c55]/70 mt-2 text-center">
              <Link href="/auth/login" className="hover:text-[#860021]">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
