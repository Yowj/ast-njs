import { connectDB } from "@/lib/db"; // ⛓️ Connect to MongoDB
import User from "@/models/User"; // 👤 User model
import bcrypt from "bcryptjs"; // 🔐 For hashing passwords

export async function POST(req) {
  try {
    connectDB(); // Connect to DB
    const { name, email, password } = await req.json();

    //Check if kumpleto yung info
    if (!name || !email || !password) {
      return Response.json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ email });

    //Check if nag-eexist na
    if (existUser) {
      return Response.json({ message: "Email already in used" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //post na natin sa db
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json({ message: "Succesfull created the new user!" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return Response.json(
      { message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
