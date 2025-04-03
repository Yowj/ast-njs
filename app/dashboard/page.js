"use client";

import { useEffect, useState } from "react";
import TemplateCard from "@/components/TemplateCard";
import AddTemplateModal from "@/components/AddTemplateModal";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTemplates(data);

      const uniqueCategories = [...new Set(data.map((t) => t.category.name))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message || "Failed to load templates");
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setSearchTerm("");
  };

  const handleShowAllClick = () => {
    setCurrentCategory("");
    setSearchTerm("");
  };

  const displayedTemplates = (
    currentCategory
      ? templates.filter((t) => t.category.name === currentCategory)
      : templates
  ).filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 text-gray-300 flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 shadow-md p-4 rounded-l-lg">
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
          onClick={handleShowAllClick}
        >
          Show All Templates
        </button>
        <h2 className="text-xl font-bold mb-4 text-white mt-6">Categories</h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category, index) => (
            <button
              className="text-left px-3 py-2 font-medium text-gray-300 hover:text-yellow-300 transition duration-300"
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="w-4/5 p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">📄 Your Templates</h1>
          <AddTemplateModal onTemplateAdded={fetchTemplates} />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search templates..."
            className="px-4 py-2 rounded-md w-1/2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h4 className="text-xl font-bold mb-4 text-white">
          {currentCategory || "All Templates"}
        </h4>

        {error && <p className="text-red-500">{error}</p>}

        {displayedTemplates.length > 0 ? (
          <div className="columns-2 gap-4 space-y-4">
            {displayedTemplates.map((template) => (
              <div className="break-inside-avoid" key={template._id}>
                <TemplateCard template={template} />
              </div>
            ))}
          </div>
        ) : (
          <h4 className="text-xl font-bold text-white">No Templates Found</h4>
        )}
      </div>
    </div>
  );  
}
