import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edionaz",
  description: "Educational platform for communication and career growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body className="bg-[#fffaef] text-[#3b3c55] antialiased">
        {children}
      </body>
    </html>
  );
}
