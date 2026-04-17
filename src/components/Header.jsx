import React from "react";
import logo2 from "../assets/logo-real-cropped.png";
import logo1 from "../assets/logo-light.png";

const Header = ({ isDark, onToggleTheme }) => {
  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={onToggleTheme}
        className={`absolute right-0 top-2 sm:top-4 inline-flex items-center justify-center rounded-full border p-3 transition-all duration-300 cursor-pointer ${
          isDark
            ? "border-zinc-700 bg-zinc-900/80 text-yellow-200 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:border-zinc-500 hover:bg-zinc-800 transition-colors duration-300"
            : "border-zinc-200 bg-white/90 text-teal-900 shadow-sm hover:border-zinc-300 hover:bg-white"
        }`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <i className={`bx ${isDark ? "bx-sun" : "bx-moon"} text-xl`}></i>
      </button>
      <div className="flex items-center justify-center">
        {/* Logo */}
        <img
          src={isDark ? logo1 : logo2}
          alt="Logo"
          className="w-full max-w-55 sm:max-w-xs md:max-w-md lg:max-w-xl h-auto -mt-12 -mb-10 sm:-mt-16 sm:-mb-14 md:-mt-24 md:-mb-24"
        />
      </div>
    </div>
  );
};

export default Header;
