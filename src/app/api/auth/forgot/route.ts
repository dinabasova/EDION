import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });


    const genericMessage =
      "If an account with this email exists, we have sent password reset instructions.";

    if (!user) {
      return NextResponse.json({ message: genericMessage }, { status: 200 });
    }

  
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), 
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your password - Edionaz",
      html: `
        <p>Salam ${user.name},</p>
        <p>Parolunuzu yeniləmək üçün aşağıdakı linkə klik edin:</p>
        <a href="${resetUrl}" style="color:#860021;font-weight:bold;">Parolu yenilə</a>
        <p>Bu keçid 1 saat ərzində etibarlıdır.</p>
      `,
    });

    return NextResponse.json({ message: genericMessage }, { status: 200 });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
