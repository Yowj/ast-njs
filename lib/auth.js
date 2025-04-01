import jwt from "jsonwebtoken";

// 🔐 Middleware function to verify JWT token
export function verifyJWT(req) {
  try {
    // ✅ Get the Authorization header
    const authHeader = req.headers.get("authorization");

    // ❌ Check if header is missing or invalid format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorized. No token provided." };
    }

    // 🔍 Extract the token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token and decode user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧾 Return user info (e.g., { userId, email })
    return { user: decoded };

  } catch (error) {
    // ❌ If verification fails (expired or tampered)
    return { error: "Invalid or expired token." };
  }
}