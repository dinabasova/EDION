import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromRequest } from "@/lib/getUserId";

const prisma = new PrismaClient();

// get all chats for user
export async function GET(req: Request) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(chats);
}