"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import ChatLayout from "../components/ChatLayout";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: string;
  content: string;
};

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState("");
  const [fileText, setFileText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function init() {
      const { id } = await params;
      setChatId(id);

      const token = localStorage.getItem("edionaz_token");

      const res = await fetch(`/api/chats/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setMessages(data.messages || []);
    }

    init();
  }, [params]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FILE UPLOAD

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("edionaz_token");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      setFileText(data.text || "");
    } catch (err) {
      console.error("Upload failed:", err);
    }

    e.target.value = "";
  }

  // SEND MESSAGE

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!input.trim() && !fileText) return;

    const token = localStorage.getItem("edionaz_token");


    const visibleMessage = input || "File attached";

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: visibleMessage,
      },
    ]);

    const res = await fetch(`/api/chats/${chatId}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: input,
        fileText,
      }),
    });

    setFileText("");

    const data = await res.json();

    if (res.ok) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    }
  }

  return (
    <ChatLayout activeId={chatId}>
      <div className="flex flex-col h-screen">

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "ml-auto bg-[#860021] text-[#fffaef]"
                  : "mr-auto bg-white border border-[#3b3c55]/15"
              }`}
            >
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-[#3b3c55]/15 p-4 bg-[#fffaef]">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">

            {/* FILE BUTTON */}
            <label className="cursor-pointer rounded-full px-4 py-2 border border-[#3b3c55]/20 bg-white text-sm">
              📎
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                fileText ? "File attached ✔" : "Write a message..."
              }
              className="flex-1 rounded-full border border-[#3b3c55]/20 px-4 py-3 bg-white outline-none focus:border-[#860021]"
            />

            <button className="rounded-full bg-[#860021] text-[#fffaef] px-6 py-3 text-sm">
              Send
            </button>

          </form>
        </div>
      </div>
    </ChatLayout>
  );
}