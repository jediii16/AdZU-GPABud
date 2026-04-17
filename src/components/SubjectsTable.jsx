import React, { useState } from "react";
import Select from "react-select";

const getSelectClassNames = (isDark) => ({
  control: ({ isFocused }) =>
    `min-h-[42px] w-full rounded-md border text-base cursor-pointer px-1 transition-colors duration-200
    ${
      isFocused
        ? "border-blue-500 ring-2 ring-blue-500/30"
        : isDark
          ? "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-blue-400"
          : "border-zinc-300 bg-white text-zinc-900 hover:border-blue-400"
    }`,
  menu: () =>
    `mt-1 rounded-md border shadow-md text-base z-50 overflow-hidden ${
      isDark
        ? "border-zinc-700 bg-zinc-900 text-zinc-100"
        : "border-zinc-200 bg-white text-zinc-900"
    }`,
  menuList: () => "py-1",
  groupHeading: () =>
    `px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider ${
      isDark ? "text-zinc-500" : "text-zinc-400"
    }`,
  option: ({ isSelected, isFocused }) =>
    `px-3 py-2 cursor-pointer
    ${
      isSelected
        ? "bg-blue-600 text-white"
        : isFocused
          ? isDark
            ? "bg-blue-500/15 text-zinc-100"
            : "bg-blue-50 text-zinc-900"
          : isDark
            ? "text-zinc-100"
            : "text-zinc-900"
    }`,
  singleValue: () =>
    `${isDark ? "text-zinc-100" : "text-zinc-900"} whitespace-normal break-words`,
  valueContainer: () => "flex flex-wrap gap-1 py-1 px-1",
  placeholder: () => (isDark ? "text-zinc-500" : "text-zinc-400"),
  indicatorSeparator: () => "hidden",
  dropdownIndicator: () =>
    `${isDark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"} pr-2`,
  clearIndicator: () =>
    isDark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600",
  noOptionsMessage: () =>
    `px-3 py-2 text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`,
});

const SubjectsTable = ({
  subjects,
  onRemoveSubject,
  availableSubjects,
  onAddSubject,
  onGradeChange,
  isDark,
}) => {
  const [selectedSubjectOption, setSelectedSubjectOption] = useState(null);
  const selectClassNames = getSelectClassNames(isDark);
  const addableSubjects = availableSubjects.filter(
    (availableSubject) =>
      !subjects.some(
        (subject) =>
          subject.code === availableSubject.code &&
          subject.name === availableSubject.name,
      ),
  );
  const subjectOptions = addableSubjects.map((subject) => ({
    value: subject.id,
    label: `${subject.code} - ${subject.name}`,
    subject,
  }));

  const handleAddSubject = () => {
    if (!selectedSubjectOption) {
      return;
    }

    onAddSubject(selectedSubjectOption.subject);
    setSelectedSubjectOption(null);
  };

  return (
    <div
      className={`mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 rounded-xl border max-w-7xl mx-auto transition-colors duration-500 ${
        isDark
          ? "bg-zinc-900 border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm"
          : "bg-white border-zinc-100 shadow-sm"
      }`}
    >
      <div className={`p-4 sm:p-6 border-b ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
        <h2 className={`font-heading ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>Subjects</h2>
        <p className={`text-xs sm:text-sm mt-1 font-body ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
          Enter grades (1.0-4.0 scale, 4.0 being highest). Leave blank for
          subjects not yet graded.
        </p>
      </div>

      <div className={`divide-y ${isDark ? "divide-zinc-800" : "divide-zinc-200"}`}>
        {subjects.map((subject) => (
          <div
            className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            key={subject.id}
          >
            <div className="flex-1">
              <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-body ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
                <span
                  className={`pr-2 border-r font-body text-xs sm:text-sm ${
                    isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-300 text-zinc-500"
                  }`}
                >
                  {subject.code}
                </span>
                <span className="text-sm sm:text-base">{subject.name}</span>
              </div>
              <div className={`text-xs sm:text-sm font-body ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                {subject.units} units
              </div>
            </div>

            <div className="flex w-full sm:w-auto items-center gap-3 sm:gap-4">
              <input
                type="number"
                min="1.0"
                max="4.0"
                step="0.5"
                placeholder="Grade"
                value={subject.grade}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "") {
                    onGradeChange(subject.id, value);
                    return;
                  }

                  const numericValue = Number(value);

                  if (Number.isNaN(numericValue)) {
                    return;
                  }

                  const clampedValue = Math.min(4, Math.max(1, numericValue));

                  onGradeChange(subject.id, String(clampedValue));
                }}
                onWheel={(e) => e.target.blur()}
                className={`font-body w-full sm:w-24 px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  isDark
                    ? "border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 disabled:bg-zinc-900 disabled:text-zinc-600"
                    : "border-zinc-300 text-zinc-900 disabled:bg-zinc-100 disabled:text-zinc-400"
                }`}
              />

              <button
                onClick={() => onRemoveSubject(subject.id)}
                className="w-full sm:w-auto px-3 py-2 text-white bg-red-600 hover:bg-red-700 cursor-pointer font-body rounded-md transition-colors duration-300 text-sm sm:text-base"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Add Subject */}
      <div className={`p-4 border-t ${isDark ? "bg-zinc-900/70 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1 min-w-0">
            <Select
              options={subjectOptions}
              value={selectedSubjectOption}
              onChange={setSelectedSubjectOption}
              isSearchable
              placeholder="Add Subject"
              unstyled
              classNames={selectClassNames}
              formatOptionLabel={(option, { context }) =>
                context === "menu" ? (
                  <div>
                    <div className="font-body text-inherit">
                      {option.subject.code} - {option.subject.name}
                    </div>
                    <div className="text-sm font-body text-inherit opacity-70">
                      {option.subject.units} units
                    </div>
                  </div>
                ) : (
                  <div className={`${isDark ? "text-zinc-100" : "text-zinc-900"} font-body`}>
                    {option.subject.code} - {option.subject.name}
                  </div>
                )
              }
            />
          </div>
          <button
            onClick={handleAddSubject}
            className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm sm:text-base font-semibold py-2.5 px-4 rounded-md transition-all duration-150 cursor-pointer"
          >
            Add Subject
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectsTable;
