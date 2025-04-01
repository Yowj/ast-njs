import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json({ message: "Token set" });

    response.cookies.set("token", "abc123", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
