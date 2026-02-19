import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserId(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;

  try {
    const token = auth.split(" ")[1];
    const { payload } = await jwtVerify(token, secret);
    return payload.id as string;
  } catch {
    return null;
  }
}