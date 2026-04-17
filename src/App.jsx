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

  const handleGradeChange = (subjectId, value) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === subjectId ? { ...subject, grade: value } : subject,
      ),
    );
  };

  const completedSubjects = subjects.filter((subject) => subject.grade !== "");

  const totalUnits = subjects.reduce((sum, subject) => sum + subject.units, 0);

  const completedUnits = completedSubjects.reduce(
    (sum, subject) => sum + subject.units,
    0,
  );

  const remainingUnits = totalUnits - completedUnits;

  const gpaSubjects = completedSubjects.filter(
    (subject) => subject.countForGPA !== false,
  );

  const hasDisqualifyingGradeForHonors = gpaSubjects.some(
    (subject) => Number(subject.grade) <= 1.5,
  );

  const totalWeightedGrades = gpaSubjects.reduce(
    (sum, subject) => sum + Number(subject.grade) * subject.units,
    0,
  );

  const totalGpaUnits = gpaSubjects.reduce(
    (sum, subject) => sum + subject.units,
    0,
  );

  const currentGPA =
    totalGpaUnits > 0 ? totalWeightedGrades / totalGpaUnits : 0;

  const remainingGpaSubjects = subjects.filter(
    (subject) => subject.grade === "" && subject.countForGPA !== false,
  );

  const remainingGpaUnits = remainingGpaSubjects.reduce(
    (sum, subject) => sum + subject.units,
    0,
  );

  const honorsThresholds =
    loadedSelection?.honorsSystemId === "old"
      ? {
          firstHonors: 3.5,
          secondHonors: 3.0,
          passing: 2.0,
        }
      : {
          firstHonors: 3.6,
          secondHonors: 3.3,
          passing: 2.0,
        };
  const getNeededAverage = (targetGPA) => {
    if (
      hasDisqualifyingGradeForHonors &&
      (targetGPA === honorsThresholds.firstHonors ||
        targetGPA === honorsThresholds.secondHonors)
    ) {
      return "Not eligible";
    }

    if (remainingGpaUnits === 0) {
      return "❌";
    }

    const totalUnitsForTarget = totalGpaUnits + remainingGpaUnits;
    const targetWeightedTotal = targetGPA * totalUnitsForTarget;
    const neededWeightedTotal = targetWeightedTotal - totalWeightedGrades;
    const neededAverage = neededWeightedTotal / remainingGpaUnits;

    if (neededAverage <= 0) {
      return "—";
    }

    if (neededAverage > 4.0) {
      return "Not possible";
    }

    return neededAverage.toFixed(2);
  };

  const neededForFirstHonors = getNeededAverage(honorsThresholds.firstHonors);
  const neededForSecondHonors = getNeededAverage(honorsThresholds.secondHonors);
  const neededForPassing = getNeededAverage(honorsThresholds.passing);

  let currentStanding = "No GPA Yet";

  if (totalGpaUnits > 0) {
    if (
      !hasDisqualifyingGradeForHonors &&
      currentGPA >= honorsThresholds.firstHonors
    ) {
      currentStanding = "First Honors";
    } else if (
      !hasDisqualifyingGradeForHonors &&
      currentGPA >= honorsThresholds.secondHonors
    ) {
      currentStanding = "Second Honors";
    } else if (currentGPA >= honorsThresholds.passing) {
      currentStanding = "Passed";
    } else {
      currentStanding = "Below Passing";
    }
  }

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
              onGradeChange={handleGradeChange}
            />
            <GPAResult
              totalUnits={totalUnits}
              completedUnits={completedUnits}
              remainingUnits={remainingUnits}
              currentGPA={currentGPA}
              currentStanding={currentStanding}
              honorsThresholds={honorsThresholds}
              neededForFirstHonors={neededForFirstHonors}
              neededForSecondHonors={neededForSecondHonors}
              neededForPassing={neededForPassing}
            />
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
    <div className="min-h-screen bg-[#F5F5F5] px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devfaq" element={<DevFAQ />} />
      </Routes>
    </div>
  );
};

export default App;
