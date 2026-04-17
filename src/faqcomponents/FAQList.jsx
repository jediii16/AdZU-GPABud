import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQItem from "./FAQItem";
import faqData from "../data/faqData";

const FAQList = ({ isDark }) => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (openId && typeof window !== "undefined") {
      setTimeout(() => {
        const element = document.getElementById(`faq-item-${openId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    }
  }, [openId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center gap-1.5 transition-colors duration-200 cursor-pointer mb-8 ${
          isDark ? "text-zinc-500 hover:text-zinc-100" : "text-zinc-400 hover:text-zinc-700"
        }`}
      >
        <i className="bx bx-caret-left text-lg"></i>
        <span className="text-sm font-medium">Back</span>
      </button>

      <div
        className={`rounded-xl border overflow-hidden transition-colors duration-500 ${
          isDark
            ? "bg-[rgba(255,255,255,0.03)] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "bg-white border-zinc-100 shadow-sm"
        }`}
      >
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            onClick={toggleItem}
            isOpen={openId === item.id}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
