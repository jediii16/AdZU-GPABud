import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import SelectionForm from "./components/SelectionForm";
import GPAResult from "./components/GPAResult";
import SubjectsTable from "./components/SubjectsTable";
import GradingScale from "./components/GradingScale";
import Footer from "./components/Footer";
import DevFAQ from "./components/DevFAQ";
import {
  getSubjectsForCourseYear,
  getAllSubjectsForCourse,
} from "./data/courses";

const Home = () => {
  const [loadedSelection, setLoadedSelection] = useState(null);

  const availableSubjects = loadedSelection
    ? getAllSubjectsForCourse(
        loadedSelection.courseId,
        loadedSelection.honorsSystemId,
      )
    : [];

  const addSubject = (subjectToAdd) => {
    setSubjects((prevSubjects) => {
      const alreadyExists = prevSubjects.some(
        (subject) =>
          subject.code === subjectToAdd.code &&
          subject.name === subjectToAdd.name,
      );

      if (alreadyExists) {
        return prevSubjects;
      }

      const newSubject = {
        ...subjectToAdd,
        id: `added-${subjectToAdd.code.replace(/\s+/g, "")}-${Date.now()}`,
        enabled: true,
        isCustom: false,
        status: "Not Yet Taken",
        requiredGrade: "3.30",
        grade: "",
      };

      return [...prevSubjects, newSubject];
    });
  };

  const removeSubject = (subjectId) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.id !== subjectId),
    );
  };
  const [subjects, setSubjects] = useState([]);
  const handleLoadSubjects = ({
    courseId,
    yearId,
    semesterId,
    honorsSystemId,
  }) => {
    const loadedSubjects = getSubjectsForCourseYear(
      courseId,
      yearId,
      semesterId,
      honorsSystemId,
    );

    const subjects = loadedSubjects.map((subject) => ({
      ...subject,
      status: "Not Yet Taken",
      requiredGrade: "3.30",
      grade: "",
    }));

    setSubjects(subjects);
    setLoadedSelection({
      courseId,
      honorsSystemId,
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="mt-6">
        <SelectionForm onLoadSubjects={handleLoadSubjects} />
        {subjects.length > 0 && (
          <>
            <SubjectsTable
              subjects={subjects}
              availableSubjects={availableSubjects}
              onRemoveSubject={removeSubject}
              onAddSubject={addSubject}
            />
            <GPAResult />
            <GradingScale />
          </>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/devfaq")}
            className="px-4 py-1.5 text-base text-zinc-500 border border-zinc-300 rounded-md hover:border-zinc-400 hover:text-zinc-700 transition-colors duration-200 cursor-pointer font-body"
          >
            Developer FAQ
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="min-h-screen p-6 bg-[#F5F5F5]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devfaq" element={<DevFAQ />} />
      </Routes>
    </div>
  );
};

export default App;
