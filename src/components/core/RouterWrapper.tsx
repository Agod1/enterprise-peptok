import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

interface RouterWrapperProps {
  children: React.ReactNode;
}

export const RouterWrapper: React.FC<RouterWrapperProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure React is fully initialized
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

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
