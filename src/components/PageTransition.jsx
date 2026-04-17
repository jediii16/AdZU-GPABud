import React, { useEffect, useState } from "react";

/**
 * PageTransition
 * Wrap route content with this. Animates in on mount.
 * Used for Home → DevFAQ and back.
 */
const PageTransition = ({ children, isDark }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the browser paints the hidden state first
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
