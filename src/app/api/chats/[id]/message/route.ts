import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Groq from "groq-sdk";
import { getUserIdFromRequest } from "@/lib/getUserId";

const prisma = new PrismaClient();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, fileText } = await req.json();

  const chat = await prisma.chat.findFirst({
    where: { id, userId },
    include: { messages: true },
  });

  if (!chat) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  // save user message
  await prisma.chatMessage.create({
    data: {
      chatId: id,
      role: "user",
      content: message,
    },
  });

  const recentMessages = chat.messages
    .slice(-4)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are Edionaz AI Mentor.

CORE BEHAVIOR:
- Talk like a real helpful mentor, not a textbook.
- Give SHORT, clear answers first.
- Never dump large explanations unless the user asks for detail.

RESPONSE STYLE:
- 3–6 short lines maximum by default.
- Use bullets only if helpful.
- Focus on what the user likely needs NEXT.
- After answering, ask ONE simple follow-up question.

IMPORTANT:
- If user message is short or vague (example: "ielts info"),
  give a quick overview, then guide the conversation forward.
- Avoid long paragraphs.
- Avoid listing everything.
`,
      },
      ...recentMessages,
      {
        role: "user",
        content: fileText
          ? `${message}\n\nThe user uploaded a document. Its extracted text is below:\n\n${fileText}`
          : message,
      },
    ],
  });

  const reply = completion.choices[0]?.message?.content || "";


  await prisma.chatMessage.create({
    data: {
      chatId: id,
      role: "assistant",
      content: reply,
    },
  });

  return NextResponse.json({ reply });
}