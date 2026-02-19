"use client";

import Sidebar from "./Sidebar";

export default function ChatLayout({
  children,
  activeId,
}: {
  children: React.ReactNode;
  activeId?: string;
}) {
  return (
    <div className="min-h-screen flex bg-[#fffaef] text-[#3b3c55]">
      <Sidebar activeId={activeId} />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}