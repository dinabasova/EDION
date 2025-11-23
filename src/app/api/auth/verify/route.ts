import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token yoxdur." }, { status: 400 });
  }

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
  });

  if (!record) {
    return NextResponse.json(
      { error: "Token etibarsızdır." },
      { status: 400 }
    );
  }

  if (record.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Token vaxtı bitib." },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { verified: true },
  });

  await prisma.emailVerificationToken.delete({
    where: { token },
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return NextResponse.redirect(`${baseUrl}/auth/login?verified=1`);
}
