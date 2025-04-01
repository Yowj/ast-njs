"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      setErrorMsg(data.message || "Something went wrong");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>

        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
            {errorMsg}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
