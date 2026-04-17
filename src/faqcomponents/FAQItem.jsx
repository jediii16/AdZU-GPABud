import React from "react";

const FAQItem = ({ item, onClick, isOpen, isDark }) => {
  return (
    <div
      id={`faq-item-${item.id}`}
      className={`border-b last:border-none transition-colors duration-500 ${
        isDark
          ? `border-zinc-800 hover:bg-linear-to-r hover:from-zinc-900/60 hover:to-transparent ${
              isOpen ? "bg-blue-500/10" : ""
            }`
          : `border-gray-200 hover:bg-linear-to-r hover:from-gray-50/50 hover:to-transparent ${
              isOpen ? "bg-indigo-50" : ""
            }`
      }`}
    >
      <button
        className={`w-full py-5 px-4 flex justify-between items-center text-left font-heading focus:outline-none rounded-lg transition-all duration-200 cursor-pointer ${
          isOpen
            ? "text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600"
            : isDark
              ? "text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-indigo-400 hover:to-blue-300"
              : "text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-indigo-600 hover:to-purple-600"
        }`}
        onClick={() => onClick(item.id)}
      >
        <span className="text-lg font-medium pr-6">{item.question}</span>
        <i
          className={`bx ${isOpen ? "bx-caret-up" : "bx-caret-down"} text-xl ${
            isDark ? "text-zinc-500" : "text-gray-500"
          }`}
        ></i>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        id={`answer-${item.id}`}
      >
        <div
          className={`p-4 pt-0 pb-5 font-body ${
            isDark ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          <div
            className={`p-3 rounded-lg overflow-y-auto max-h-75 ${
              isDark ? "bg-zinc-900/80" : "bg-transparent"
            }`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
