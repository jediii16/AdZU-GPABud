import React from "react";

const GPAResult = ({
  totalUnits,
  completedUnits,
  remainingUnits,
  currentGPA,
  currentStanding,
  honorsThresholds,
  neededForFirstHonors,
  neededForSecondHonors,
  neededForPassing,
}) => {
  const hasGPA = currentGPA > 0;

  const isFirstHonors = hasGPA && currentStanding === "First Honors";
  const isSecondHonors = hasGPA && currentStanding === "Second Honors";
  const isPassed = hasGPA && currentStanding === "Passed";
  const isBelowPassing = hasGPA && currentStanding === "Below Passing";
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
      {/* Current Status */}
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-900 mb-4 text-base sm:text-lg">
          Current Status
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-600">Total Units</span>
            <span className="text-zinc-900">{totalUnits}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Completed Units</span>
            <span className="text-zinc-900">{completedUnits}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Remaining Units</span>
            <span className="text-zinc-900">{remainingUnits}</span>
          </div>
          <div className="pt-3 border-t border-zinc-200">
            <div className="flex justify-between items-center">
              <span className="text-zinc-900">Current GPA</span>
              <span className="text-2xl text-zinc-900">
                {hasGPA ? currentGPA.toFixed(2) : "—"}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isFirstHonors
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                First Honors
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isSecondHonors
                    ? "bg-blue-100 text-blue-700"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                Second Honors
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isPassed
                    ? "bg-zinc-200 text-zinc-700"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                Passed
              </span>
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm ${
                  isBelowPassing
                    ? "bg-red-100 text-red-700"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                Below Passing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Required Grades */}
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-900 mb-4 text-base sm:text-lg">
          Grade Needed in Remaining Subjects
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-600">First Honors</span>
              <span className="text-lg sm:text-xl text-emerald-600">
                {neededForFirstHonors}
              </span>
            </div>
            <div className="text-xs text-zinc-500">
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
              <span className="text-zinc-600">Second Honors</span>
              <span className="text-lg sm:text-xl text-blue-600">
                {neededForSecondHonors}
              </span>
            </div>
            <div className="text-xs text-zinc-500">
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
              <span className="text-zinc-600">Passing Grade (2.0 GPA)</span>
              <span className="text-lg sm:text-xl text-zinc-600">
                {neededForPassing}
              </span>
            </div>
            <div className="text-xs text-zinc-500">
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
