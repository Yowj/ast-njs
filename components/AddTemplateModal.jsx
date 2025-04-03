"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddTemplateModal({ onTemplateAdded }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch(() => toast.error("Failed to load categories"));
    }
  }, [isOpen]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setNewCategoryName("");
    setIsAddingNewCategory(false);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    let selectedCategoryId = category;

    if (isAddingNewCategory && newCategoryName) {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ categoryName: newCategoryName }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create category");
        return;
      }

      selectedCategoryId = data.category._id;
      toast.success("New category added!");
    }

    if (!title || !selectedCategoryId) {
      toast.error("Title and category are required");
      return;
    }

    const res = await fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content,
        category: selectedCategoryId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Error creating template");
    } else {
      toast.success("Template created!");
      onTemplateAdded?.();
      resetForm();
      router.push("/dashboard"); // ← Redirect to dashboard
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:opacity-90 shadow-lg transition"
      >
        + Add Template
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-8 w-full max-w-lg animate-slideUp space-y-5">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-white">
              📝 Create New Template
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Payment Reminder"
                  className="mt-1 w-full text-lg rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Enter template content here..."
                  className="mt-1 w-full text-base rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === "__add_new__") {
                      setIsAddingNewCategory(true);
                      setCategory("");
                    } else {
                      setIsAddingNewCategory(false);
                      setCategory(e.target.value);
                    }
                  }}
                  className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="__add_new__">+ Create New Category</option>
                </select>
              </div>

              {isAddingNewCategory && (
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="w-full mt-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800"
                />
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
