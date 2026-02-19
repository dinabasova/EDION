import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Groq from "groq-sdk";
import { getUserIdFromRequest } from "@/lib/getUserId";

const prisma = new PrismaClient();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // AI reply first
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are Edionaz AI mentor. Give structured, clear, practical answers.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const reply = completion.choices[0]?.message?.content ?? "";

  // Generate title BEFORE saving chat
  const titleCompletion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You generate short chat titles.

RULES:
- Maximum 4 words
- No punctuation
- No full sentences
- If topic is unclear, random, or meaningless → return EXACTLY: General Chat
`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  let title =
    titleCompletion.choices[0]?.message?.content?.trim() || "General Chat";

  // extra safety 
  if (title.length > 40 || title.includes(".") || title.includes(",")) {
    title = "General Chat";
  }

  // create chat
  const chat = await prisma.chat.create({
    data: {
      userId,
      title,
      messages: {
        create: [
          {
            role: "user",
            content: message,
          },
          {
            role: "assistant",
            content: reply,
          },
        ],
      },
    },
  });

  return NextResponse.json({
    chatId: chat.id,
  });
}