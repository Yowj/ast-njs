import { verifyJWT } from "@/lib/auth";

export async function authenticateRequest(req) {
  const user = await verifyJWT(req);
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  return user;
}
