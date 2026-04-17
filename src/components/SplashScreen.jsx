import React, { useEffect, useState } from "react";

const SplashScreen = ({ isDark, onFinish }) => {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit

  useEffect(() => {
    // Hold after entrance animation, then fade out
    const holdTimer = setTimeout(() => setPhase("exit"), 2000);
    const doneTimer = setTimeout(() => onFinish(), 2400);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1)",
        opacity: phase === "exit" ? 0 : 1,
        pointerEvents: phase === "exit" ? "none" : "all",
        background: isDark
          ? "radial-gradient(circle at 70% 20%, rgba(13,148,136,0.18) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20,184,166,0.10) 0%, transparent 50%), linear-gradient(135deg, #060f0e 0%, #0a1a18 60%, #020807 100%)"
          : "#F5F5F5",
      }}
    >
      {/* Animated ring */}
      <div style={{ position: "relative", width: 110, height: 110 }}>
        <svg
          viewBox="0 0 110 110"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            animation: "splashSpin 1.2s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          <circle
            cx="55"
            cy="55"
            r="48"
            fill="none"
            stroke={isDark ? "rgba(20,184,166,0.25)" : "rgba(13,148,136,0.15)"}
            strokeWidth="2"
          />
          <circle
            cx="55"
            cy="55"
            r="48"
            fill="none"
            stroke={isDark ? "#14b8a6" : "#0d9488"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="301.6"
            strokeDashoffset="301.6"
            style={{
              animation: "splashDraw 1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards",
              transformOrigin: "55px 55px",
              transform: "rotate(-90deg)",
            }}
          />
        </svg>

        {/* Center icon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "splashFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}
        >
          <i
            className="bx bx-book-reader"
            style={{
              fontSize: "2.4rem",
              color: isDark ? "#14b8a6" : "#0d9488",
            }}
          />
        </div>
      </div>

      {/* Brand name */}
      <div
        style={{
          textAlign: "center",
          animation: "splashFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.65s both",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            letterSpacing: "-0.02em",
            background: isDark
              ? "linear-gradient(135deg, #5eead4 0%, #14b8a6 50%, #0d9488 100%)"
              : "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1,
          }}
        >
          AdZU GPABud
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "0.82rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: isDark ? "rgba(161,161,170,0.7)" : "rgba(113,113,122,0.8)",
            marginTop: "0.4rem",
            animation: "splashFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.85s both",
          }}
        >
          Magis!
        </div>
      </div>

      {/* Loading dots */}
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          marginTop: "0.5rem",
          animation: "splashFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 1.0s both",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isDark ? "#14b8a6" : "#0d9488",
              animation: `splashDot 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes splashSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
