import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';

import Header from "./components/Header";
import SelectionForm from "./components/SelectionForm";
import GPAResult from "./components/GPAResult";
import SubjectsTable from "./components/SubjectsTable";
import GradingScale from "./components/GradingScale";
import Footer from "./components/Footer";
import DevFAQ from "./components/DevFAQ";
import SplashScreen from "./components/SplashScreen";
import PageTransition from "./components/PageTransition";
import {
  getSubjectsForCourseYear,
  getAllSubjectsForCourse,
} from "./data/courses";

const Home = ({ isDark, onToggleTheme }) => {
  const [loadedSelection, setLoadedSelection] = useState(null);
  const subjectsSectionRef = useRef(null);

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
    const isHonorsTarget =
      targetGPA === honorsThresholds.firstHonors ||
      targetGPA === honorsThresholds.secondHonors;

    if (hasDisqualifyingGradeForHonors && isHonorsTarget) {
      return "Not eligible";
    }

    if (remainingGpaUnits === 0) {
      if (currentGPA >= targetGPA) {
        return "—";
      }

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

    setTimeout(() => {
      subjectsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const navigate = useNavigate();

  return (
    <PageTransition isDark={isDark}>
      <Header isDark={isDark} onToggleTheme={onToggleTheme} />

      <div className="mt-6">
        <SelectionForm onLoadSubjects={handleLoadSubjects} isDark={isDark} />
        {subjects.length > 0 && (
          <div ref={subjectsSectionRef}>
            <SubjectsTable
              subjects={subjects}
              availableSubjects={availableSubjects}
              onRemoveSubject={removeSubject}
              onAddSubject={addSubject}
              onGradeChange={handleGradeChange}
              isDark={isDark}
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
              isDark={isDark}
            />
            <GradingScale isDark={isDark} />
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/devfaq")}
            className={`px-4 py-1.5 text-base border rounded-md transition-colors duration-200 cursor-pointer font-body ${
              isDark
                ? "text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white bg-zinc-900/70"
                : "text-zinc-500 border-zinc-300 hover:border-zinc-400 hover:text-zinc-700"
            }`}
          >
            Developer FAQ
          </button>
        </div>

        <Footer isDark={isDark} />
      </div>
    </PageTransition>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedTheme = window.localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Show splash only on first load, not on hot reload in dev
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    // Use sessionStorage so it only shows once per browser session
    const seen = window.sessionStorage.getItem("gpabud-splash-seen");
    return !seen;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  const handleSplashFinish = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("gpabud-splash-seen", "1");
    }
    setShowSplash(false);
  };

  const toggleTheme = () => {
    if (typeof window === "undefined") {
      setIsDark((prev) => !prev);
      return;
    }

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finalizeTransition = () => {
      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 650);
    };

    root.classList.add("theme-transitioning");

    if (!document.startViewTransition || prefersReducedMotion) {
      setIsDark((prev) => !prev);
      finalizeTransition();
      return;
    }

    document
      .startViewTransition(() => {
        flushSync(() => {
          setIsDark((prev) => !prev);
        });
      })
      .finished.finally(finalizeTransition);
  };

  return (
    <div
      className={`min-h-screen px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 transition-colors duration-500 ${
        isDark
          ? "bg-[radial-gradient(circle_at_80%_10%,rgba(13,148,136,0.10),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(20,184,166,0.06),transparent_45%),linear-gradient(to_bottom_right,#060f0e,#0a1a18,#020807)] text-zinc-100"
          : "bg-[#F5F5F5] text-zinc-900"
      }`}
    >
      {/* Splash screen — shown once per session */}
      {showSplash && (
        <SplashScreen isDark={isDark} onFinish={handleSplashFinish} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="/devfaq"
          element={
            <PageTransition isDark={isDark}>
              <DevFAQ
                isDark={isDark}
                onToggleTheme={toggleTheme}
              />
            </PageTransition>
          }
        />
      </Routes>
      <Analytics />
    </div>
  );
};

export default App;
