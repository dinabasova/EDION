import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await prisma.contactRequest.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete CTA error:", err);
    return NextResponse.json(
      { error: "Could not delete submission." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const { status } = body as { status?: string };

    // ⭐ ENUM FIX
    if (status !== "NEW" && status !== "DONE") {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    const updated = await prisma.contactRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update CTA status error:", err);
    return NextResponse.json(
      { error: "Could not update status." },
      { status: 500 }
    );
  }
}