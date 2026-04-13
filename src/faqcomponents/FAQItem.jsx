import React, { useRef } from "react";

const FAQItem = ({ item, onClick, isOpen }) => {
  const answerRef = useRef(null);
  return (
    <div
      id={`faq-item-${item.id}`}
      className={`border-b border-gray-200 last:border-none transition-colors duration-500 hover:bg-linear-to-r hover:from-gray-50/50 hover:to-transparent ${isOpen ? "bg-indigo-50" : ""}`}
    >
      <button
        className={`w-full py-5 px-4 flex justify-between items-center text-left font-heading focus:outline-none rounded-lg transition-all duration-200 cursor-pointer ${
    isOpen
      ? "text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600"
      : "text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-indigo-600 hover:to-purple-600"
  }`}
        onClick={() => onClick(item.id)}
      >
        <span className="text-lg font-medium pr-6">{item.question}</span>
        <i className={`bx ${isOpen ? "bx-caret-up" : "bx-caret-down"} text-xl text-gray-500`}></i>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        id={`answer-${item.id}`}
        ref={answerRef}
        style={{
          maxHeight: isOpen ? answerRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="p-4 pt-0 pb-5 text-gray-600 font-body">
          <div className="p-3 rounded-lg overflow-y-auto max-h-75">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
