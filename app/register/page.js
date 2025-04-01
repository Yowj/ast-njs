"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.message || "Registration failed");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Register</h2>

        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{errorMsg}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
