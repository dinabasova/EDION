"use client";

export default function AuthWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaef] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 border border-[#3b3c55]/10">
        <h1 className="text-3xl font-bold text-[#860021] mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}