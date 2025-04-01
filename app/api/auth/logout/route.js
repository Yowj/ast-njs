import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out" });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
