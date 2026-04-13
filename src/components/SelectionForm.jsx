import React, { useState } from 'react';
import Select from "react-select";
import {
  COURSES,
  HONORS_SYSTEMS,
  YEAR_LEVELS,
  SEMESTER,
} from "../data/courses";

const groupedCourses = COURSES.reduce((acc, course) => {
  const dept = course.department;
  if (!acc[dept]) acc[dept] = [];
  acc[dept].push(course);
  return acc;
}, {});

const groupedOptions = Object.entries(groupedCourses).map(([dept, courses]) => ({
  label: dept,
  options: courses.map(course => ({
    value: course.id,
    label: course.name,
  })),
}));

const yearOptions = YEAR_LEVELS.map(y => ({ value: y.id, label: y.label }));
const semesterOptions = SEMESTER.map(s => ({ value: s.id, label: s.label }));
const honorsOptions = HONORS_SYSTEMS.map(h => ({ value: h.id, label: h.label }));

const selectClassNames = {
  control: ({ isFocused }) =>
    `min-h-[42px] w-full rounded-md border bg-white text-base cursor-pointer px-1
    ${isFocused
      ? 'border-blue-500 ring-2 ring-blue-500/30'
      : 'border-zinc-300 hover:border-blue-400'}`,
  menu: () =>
    'mt-1 rounded-md border border-zinc-200 bg-white shadow-md text-base z-50 overflow-hidden',
  menuList: () => 'py-1',
  groupHeading: () =>
    'px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400',
  option: ({ isSelected, isFocused }) =>
    `px-3 py-2 cursor-pointer
    ${isSelected
      ? 'bg-blue-600 text-white'
      : isFocused
      ? 'bg-blue-50 text-zinc-900'
      : 'text-zinc-900'}`,
  singleValue: () => 'text-zinc-900 whitespace-normal break-words',
  valueContainer: () => 'flex flex-wrap gap-1 py-1 px-1',
  placeholder: () => 'text-zinc-400',
  indicatorSeparator: () => 'hidden',
  dropdownIndicator: () => 'text-zinc-400 hover:text-zinc-600 pr-2',
  clearIndicator: () => 'text-zinc-400 hover:text-zinc-600',
  noOptionsMessage: () => 'px-3 py-2 text-zinc-400 text-sm',
};

const SelectField = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-base font-semibold uppercase tracking-wider text-zinc-500">
      {label}
    </label>
    {children}
  </div>
);

const SelectionForm = ({ onLoadSubjects }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [honors, setHonors] = useState(null);

  const handleSubmit = () => {
  if (!selectedCourse || !year || !semester || !honors) {
    return;
  }

  onLoadSubjects({
    courseId: selectedCourse.value,
    yearId: year.value,
    semesterId: semester.value,
    honorsSystemId: honors.value,
  });
};

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-zinc-100 max-w-7xl mx-auto">

      {/* Course */}
      <div className="mb-5">
        <SelectField label="Course">
          <Select
            unstyled
            classNames={selectClassNames}
            options={groupedOptions}
            value={selectedCourse}
            onChange={setSelectedCourse}
            isSearchable
            placeholder="Select Course"
          />
        </SelectField>
      </div>

      {/* Year + Semester */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <SelectField label="Year Level">
          <Select
            unstyled
            classNames={selectClassNames}
            options={yearOptions}
            value={year}
            onChange={setYear}
            isSearchable={false}
            placeholder="Select Year Level"
          />
        </SelectField>

        <SelectField label="Semester">
          <Select
            unstyled
            classNames={selectClassNames}
            options={semesterOptions}
            value={semester}
            onChange={setSemester}
            isSearchable={false}
            placeholder="Select Semester"
          />
        </SelectField>
      </div>

      {/* Honors System */}
      <div className="mb-6">
        <SelectField label="Honors System">
          <Select
            unstyled
            classNames={selectClassNames}
            options={honorsOptions}
            value={honors}
            onChange={setHonors}
            isSearchable={false}
            placeholder="Select Honors System"
          />
        </SelectField>
      </div>

      {/* Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-base font-semibold py-2.5 px-4 rounded-md transition-all duration-150 cursor-pointer"
      onClick={handleSubmit}>
        Load Subjects
      </button>
    </div>
  );
};

export default SelectionForm;