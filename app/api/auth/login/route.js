import { connectDB } from "@/lib/db.js";
import bcrypt from "bcryptjs";
import User from "@/models/User.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // 🔐 built-in cookie helper for App Router

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return Response.json({ message: "Email not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { userId: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie with JWT
    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // ✅ Success response
    return Response.json({
      message: "Successfully logged in",
      user: {
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json(
      { message: "Server Error. Please try again." },
      { status: 500 }
    );
  }
}
