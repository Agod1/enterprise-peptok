import React from "react";

interface ReactSafeLoaderProps {
  children: React.ReactNode;
}

/**
 * ReactSafeLoader ensures React and all its hooks are properly available
 * before rendering any child components that might use hooks.
 */
export const ReactSafeLoader: React.FC<ReactSafeLoaderProps> = ({
  children,
}) => {
  // Comprehensive React availability check
  const isReactFullyLoaded = () => {
    try {
      return (
        typeof React !== "undefined" &&
        React !== null &&
        typeof React.useState === "function" &&
        typeof React.useEffect === "function" &&
        typeof React.useContext === "function" &&
        typeof React.createContext === "function" &&
        typeof React.Component === "function"
      );
    } catch (error) {
      console.error("🚨 React availability check failed:", error);
      return false;
    }
  };

  if (!isReactFullyLoaded()) {
    console.warn("🚨 React not fully loaded, showing loading screen");

    // Use vanilla DOM creation to avoid any React dependencies
    return React.createElement(
      "div",
      {
        style: {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#ffffff",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            textAlign: "center",
            padding: "2rem",
          },
        },
        [
          React.createElement("div", {
            key: "spinner",
            style: {
              width: "40px",
              height: "40px",
              border: "4px solid #e5e7eb",
              borderTop: "4px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            },
          }),
          React.createElement(
            "h1",
            {
              key: "title",
              style: {
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1f2937",
                margin: "0 0 0.5rem 0",
              },
            },
            "Loading Peptok...",
          ),
          React.createElement(
            "p",
            {
              key: "subtitle",
              style: {
                fontSize: "1rem",
                color: "#6b7280",
                margin: "0",
              },
            },
            "Initializing React components",
          ),
          React.createElement(
            "style",
            {
              key: "keyframes",
            },
            `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            `,
          ),
        ],
      ),
    );
  }

  // React is fully loaded, render children
  return children as React.ReactElement;
};
