import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const ctaRecipient = process.env.CTA_RECIPIENT_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, type } = body as {
      name?: string;
      phone?: string;
      email?: string;
      message?: string;
      type?: "trial" | "consultation";
    };

    if (!name || !phone || !email || !type) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }


    const record = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        email,
        message: message || "",
        type,
      },
    });


    if (resend && ctaRecipient) {
      await resend.emails.send({
        from: "Edionaz <onboarding@resend.dev>",
        to: [ctaRecipient],
        subject:
          type === "trial"
            ? "Yeni sınaq dərsi müraciəti"
            : "Yeni konsultasiya müraciəti",
        text: [
          `Ad və Soyad: ${name}`,
          `Telefon: ${phone}`,
          `E-mail: ${email}`,
          `Tip: ${type === "trial" ? "Sınaq dərsi" : "Konsultasiya"}`,
          "",
          "Mesaj:",
          message || "-",
          "",
          `ID: ${record.id}`,
          `Tarix: ${record.createdAt.toISOString()}`,
        ].join("\n"),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CTA form error:", err);
    return NextResponse.json(
      { error: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
