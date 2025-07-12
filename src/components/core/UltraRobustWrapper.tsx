import React from "react";

interface UltraRobustWrapperProps {
  children: React.ReactNode;
}

// Completely hook-free wrapper to prevent React initialization issues
export const UltraRobustWrapper = (props: UltraRobustWrapperProps) => {
  // Check if React is available at all
  if (typeof React === "undefined" || React === null) {
    return React.createElement("div", {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
      },
      children: "Loading React...",
    });
  }

  // Return children directly without any hooks or complex logic
  return props.children;
};
