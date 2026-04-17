import React from "react";

const GradingScale = ({ isDark }) => {
  return (
    <div
      className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl border max-w-7xl mx-auto transition-colors duration-500 ${
        isDark
          ? "bg-zinc-900 border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm"
          : "bg-white border-zinc-100 shadow-sm"
      }`}
    >
      <h3
        className={`mb-4 text-sm sm:text-base gap-2 font-heading flex items-center ${
          isDark ? "text-zinc-100" : "text-zinc-900"
        }`}
      >
        AdZU Grading Scale
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm sm:text-base font-body">
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>4.0</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Excellent</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>3.5</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Superior</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>3.0</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Above Average</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>2.5</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>High Average</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>2.0</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Average</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>1.5</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Low Average</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>1.0</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Passed</div>
        </div>
        <div>
          <div className={isDark ? "text-zinc-100" : "text-zinc-900"}>F</div>
          <div className={isDark ? "text-zinc-400" : "text-zinc-500"}>Failed</div>
        </div>
      </div>
    </div>
  );
};

export default GradingScale;
