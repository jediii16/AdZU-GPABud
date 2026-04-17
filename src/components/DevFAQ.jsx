import React from "react";
import FAQList from "../faqcomponents/FAQList";

const DevFAQ = ({ isDark, onToggleTheme }) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-[radial-gradient(circle_at_80%_10%,rgba(13,148,136,0.10),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(20,184,166,0.06),transparent_45%),linear-gradient(to_bottom_right,#060f0e,#0a1a18,#020807)]"
          : "bg-linear-to-br bg-[#f5f5f5]"
      }`}
    >
      <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <header className="relative text-center">
          <button
            onClick={onToggleTheme}
            className={`absolute right-0 top-0 inline-flex items-center justify-center rounded-full border p-3 transition-all duration-300 cursor-pointer ${
              isDark
                ? "border-zinc-700 bg-zinc-900/80 text-amber-300 hover:border-zinc-500 hover:bg-zinc-800"
                : "border-zinc-200 bg-white/90 text-zinc-700 shadow-sm hover:border-zinc-300 hover:bg-white"
            }`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i className={`bx ${isDark ? "bx-sun" : "bx-moon"} text-xl`}></i>
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 inline-block text-transparent bg-clip-text">
            Developer FAQ
          </h1>
          <p
            className={`text-lg max-w-2xl font-body mx-auto transition-colors duration-500 ${
              isDark ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            Built for students. Designed with logic. Explained by the developer.
          </p>
        </header>
      </div>
      <FAQList isDark={isDark} />
    </div>
  );
};

export default DevFAQ;
