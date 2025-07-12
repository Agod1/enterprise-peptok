import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

interface RouterWrapperProps {
  children: React.ReactNode;
}

export const RouterWrapper: React.FC<RouterWrapperProps> = ({ children }) => {
  // Comprehensive React hooks availability check
  const isReactAvailable =
    typeof React !== "undefined" &&
    React &&
    typeof React.useState === "function" &&
    typeof React.useEffect === "function";

  if (!isReactAvailable) {
    console.warn(
      "🚨 React hooks not available in RouterWrapper, rendering children directly",
    );
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  // Safe hook initialization with try-catch
  let isReady = false;
  let setIsReady: (ready: boolean) => void = () => {};

  try {
    const readyState = React.useState(false);
    isReady = readyState[0];
    setIsReady = readyState[1];
  } catch (error) {
    console.error("🚨 Failed to initialize useState in RouterWrapper:", error);
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  // Safe useEffect with try-catch
  try {
    React.useEffect(() => {
      // Small delay to ensure React is fully initialized
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 10);

      return () => clearTimeout(timer);
    }, []);
  } catch (error) {
    console.error("🚨 Failed to initialize useEffect in RouterWrapper:", error);
    // Set ready immediately as fallback
    setIsReady(true);
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading application...</p>
        </div>
      </div>
    );
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};
