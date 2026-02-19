"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatLayout from "./components/ChatLayout";

export default function ChatDraftPage() {
  const router = useRouter();
  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("edionaz_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const token = localStorage.getItem("edionaz_token");
    if (!token) return;

    const text = input;
    setInput("");

    const res = await fetch("/api/chat/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/chat/${data.chatId}`);
    }
  }

  return (
    <ChatLayout>
      {/* CENTERED CONTENT */}
      <div className="h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-semibold mb-6 text-[#860021]">
          Hi 👋 What do you want to work on today?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-[#3b3c55]/20 px-4 py-3 bg-white outline-none focus:border-[#860021]"
          />

          <button className="rounded-full bg-[#860021] text-[#fffaef] px-6 py-3 text-sm">
            Send
          </button>
        </form>
      </div>
    </ChatLayout>
  );
}