"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // ... create category if needed ...
        const res = await fetch("/api/templates", {
          method: "POST",
          body: JSON.stringify({ name, content, category: selectedCategoryId }),
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to create template");

        toast.success("Template created!");
        // reset form
      } catch (err) {
        toast.error(err.message || "Something went wrong.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">📂 Your Categories</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="p-3 bg-gray-100 rounded shadow">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
