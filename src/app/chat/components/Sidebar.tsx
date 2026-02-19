"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Chat = {
  id: string;
  title: string;
};

export default function Sidebar({ activeId }: { activeId?: string }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("edionaz_token");

      const res = await fetch("/api/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setChats(data);
    }

    load();
  }, [pathname]);

  async function renameChat(id: string, current: string) {
    const title = prompt("Rename chat:", current);
    if (!title) return;

    const token = localStorage.getItem("edionaz_token");

    await fetch(`/api/chats/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c))
    );
  }

  async function deleteChat(id: string) {
    const ok = confirm("Delete this chat?");
    if (!ok) return;

    const token = localStorage.getItem("edionaz_token");

    await fetch(`/api/chats/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setChats((prev) => prev.filter((c) => c.id !== id));

    if (activeId === id) {
      router.push("/chat");
    }
  }

  return (
    <aside className="w-[280px] h-screen border-r border-[#3b3c55]/15 bg-[#fffaef] flex flex-col">
      <div className="p-4">
        <Link
          href="/chat"
          className="w-full block rounded-xl bg-[#860021] text-[#fffaef] text-sm py-3 text-center"
        >
          + New Chat
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group rounded-lg px-3 py-2 text-sm flex items-start justify-between${
              activeId === chat.id
                ? "bg-[#860021]/15 text-[#860021] font-semibold"
                : "hover:bg-[#860021]/10"
            }`}
          >
                <Link
                    href={`/chat/${chat.id}`}
                    className="flex-1 pr-4 break-words leading-tight"
                    >
                    {chat.title}
                </Link>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => renameChat(chat.id, chat.title)}
                className="text-xs px-1"
              >
                ✒️
              </button>

              <button
                onClick={() => deleteChat(chat.id)}
                className="text-xs px-1"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}