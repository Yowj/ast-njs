import jwt from "jsonwebtoken";

export function verifyJWT(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return { error: "Unauthorized. No token provided." };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded };
  } catch (error) {
    return { error: "Invalid or expired token." };
  }
}
