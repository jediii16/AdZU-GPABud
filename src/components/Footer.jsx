import React from "react";

const Footer = ({ isDark }) => {
  return (
    <footer
      className={`mt-10 sm:mt-12 border-t pt-6 pb-2 max-w-7xl mx-auto px-3 sm:px-4 transition-colors duration-500 ${
        isDark ? "border-zinc-800" : "border-zinc-200"
      }`}
    >
      <p
        className={`text-center text-xs sm:text-sm ${
          isDark ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        Copyright 2026 AdZU GPABud. All rights reserved.
      </p>
      <p
        className={`text-center text-[11px] sm:text-xs mt-3 max-w-lg mx-auto leading-relaxed ${
          isDark ? "text-zinc-500" : "text-zinc-400"
        }`}
      >
        This is an independent student project and is not affiliated with Ateneo
        de Zamboanga University. For official grades and academic records,
        please refer to the university&apos;s official student portal.
      </p>
    </footer>
  );
};

export default Footer;
