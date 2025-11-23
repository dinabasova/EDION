import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, username } = body;


    if (!name || !email || !password || !username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }


    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters and include an uppercase letter and a number.",
        },
        { status: 400 }
      );
    }


    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }


    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }


    const hashed = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashed,
        verified: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });


    const token = crypto.randomBytes(32).toString("hex");

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), 
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Email Verification - Edionaz",
      html: `
        <p>Salam ${name},</p>
        <p>Hesabınızı aktivləşdirmək üçün aşağıdakı linkə keçid edin:</p>
        <a href="${verifyUrl}" style="color:#860021;font-weight:bold;">Hesabı doğrula</a>
        <p>Bu keçid 1 saat etibarlıdır.</p>
      `,
    });

    return NextResponse.json(
      { message: "User created successfully. Please verify your email." },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Signup error:", err);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email or username already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

