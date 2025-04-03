import React, { useState } from "react";

export default function TemplateCard({ template }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" border-b border-yellow-500 py-4">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full text-left"
      >
        <h3
          className={`text-lg font-medium  ${
            isOpen ? "text-yellow-500 font-bold" : "text-white"
          }`}
        >
          {template.title}
        </h3>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          &#x25BC;
        </span>
      </button>
      {isOpen && (
        <div className="flex justify-between items-start">
          <p className="mt-3 text-slate-200 leading-relaxed pl-4">
            {template.content}
          </p>
          <div className="flex text-yellow-500">COPY DELETE</div>
        </div>
      )}
    </div>
  );
}
