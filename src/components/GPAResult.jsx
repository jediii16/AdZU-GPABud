import React from "react";

const GPAResult = ({
  totalUnits,
  completedUnits,
  remainingUnits,
  currentGPA,
  currentStanding,
  neededForFirstHonors,
  neededForSecondHonors,
  neededForPassing,
  isDark,
}) => {
  const hasGPA = currentGPA > 0;

  const isFirstHonors = hasGPA && currentStanding === "First Honors";
  const isSecondHonors = hasGPA && currentStanding === "Second Honors";
  const isPassed = hasGPA && currentStanding === "Passed";
  const isBelowPassing = hasGPA && currentStanding === "Below Passing";

  const cardClass = isDark
    ? "bg-zinc-900 border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm"
    : "bg-white border-zinc-100 shadow-sm";
  const labelClass = isDark ? "text-zinc-400" : "text-zinc-600";
  const valueClass = isDark ? "text-zinc-100" : "text-zinc-900";
  const helperClass = isDark ? "text-zinc-500" : "text-zinc-500";

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
      <div
        className={`p-4 sm:p-6 rounded-xl border transition-colors duration-500 ${cardClass}`}
      >
        <h3 className={`mb-4 text-base sm:text-lg ${valueClass}`}>
          Current Status
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className={labelClass}>Total Units</span>
            <span className={valueClass}>{totalUnits}</span>
          </div>
          <div className="flex justify-between">
            <span className={labelClass}>Completed Units</span>
            <span className={valueClass}>{completedUnits}</span>
          </div>
          <div className="flex justify-between">
            <span className={labelClass}>Remaining Units</span>
            <span className={valueClass}>{remainingUnits}</span>
          </div>
          <div className={`pt-3 border-t ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
            <div className="flex justify-between items-center">
              <span className={valueClass}>Current GPA</span>
              <span className={`text-2xl ${valueClass}`}>
                {hasGPA ? currentGPA.toFixed(2) : "—"}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isFirstHonors
                    ? isDark
                      ? "bg-emerald-900/40 text-emerald-400"
                      : "bg-emerald-100 text-emerald-700"
                    : isDark
                      ? "bg-zinc-800 text-zinc-500"
                      : "bg-zinc-100 text-zinc-400"
                }`}
              >
                First Honors
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isSecondHonors
                    ? isDark
                      ? "bg-blue-900/40 text-blue-400"
                      : "bg-blue-100 text-blue-700"
                    : isDark
                      ? "bg-zinc-800 text-zinc-500"
                      : "bg-zinc-100 text-zinc-400"
                }`}
              >
                Second Honors
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isPassed
                    ? isDark
                      ? "bg-zinc-700 text-zinc-300"
                      : "bg-zinc-200 text-zinc-700"
                    : isDark
                      ? "bg-zinc-800 text-zinc-500"
                      : "bg-zinc-100 text-zinc-400"
                }`}
              >
                Passed
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isBelowPassing
                    ? isDark
                      ? "bg-red-900/40 text-red-400"
                      : "bg-red-100 text-red-700"
                    : isDark
                      ? "bg-zinc-800 text-zinc-500"
                      : "bg-zinc-100 text-zinc-400"
                }`}
              >
                Below Passing
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`p-4 sm:p-6 rounded-xl border transition-colors duration-500 ${cardClass}`}
      >
        <h3 className={`mb-4 text-base sm:text-lg ${valueClass}`}>
          Grade Needed in Remaining Subjects
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className={labelClass}>First Honors</span>
              <span className="text-lg sm:text-xl text-emerald-600">
                {neededForFirstHonors}
              </span>
            </div>
            <div className={`text-xs ${helperClass}`}>
              {neededForFirstHonors === "—"
                ? "Already achieved"
                : neededForFirstHonors === "Not eligible"
                  ? "A grade of 1.5 or below disqualifies honors"
                  : neededForFirstHonors === "❌"
                    ? "No remaining subjects to improve the result"
                    : neededForFirstHonors === "Not possible"
                      ? "Cannot be reached with remaining subjects"
                      : "Average needed in remaining subjects"}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className={labelClass}>Second Honors</span>
              <span className="text-lg sm:text-xl text-blue-500">
                {neededForSecondHonors}
              </span>
            </div>
            <div className={`text-xs ${helperClass}`}>
              {neededForSecondHonors === "—"
                ? "Already achieved"
                : neededForSecondHonors === "Not eligible"
                  ? "A grade of 1.5 or below disqualifies honors"
                  : neededForSecondHonors === "❌"
                    ? "No remaining subjects to improve the result"
                    : neededForSecondHonors === "Not possible"
                      ? "Cannot be reached with remaining subjects"
                      : "Average needed in remaining subjects"}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className={labelClass}>Passing Grade (2.0 GPA)</span>
              <span className={`text-lg sm:text-xl ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
                {neededForPassing}
              </span>
            </div>
            <div className={`text-xs ${helperClass}`}>
              {neededForPassing === "—"
                ? "Already achieved"
                : neededForPassing === "❌"
                  ? "No remaining subjects to improve the result"
                  : neededForPassing === "Not possible"
                    ? "Cannot be reached with remaining subjects"
                    : "Average needed in remaining subjects"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAResult;
