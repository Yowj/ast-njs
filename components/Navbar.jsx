"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  // Check if token exists

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="text-lg font-bold">MyApp</div>

      <div className="flex items-center gap-6">
        <Link href="/dashboard">Templates</Link>
        <Link href="/categories">Categories</Link>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
