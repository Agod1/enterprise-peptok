import React, { useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

interface SafeAuthProviderProps {
  children: React.ReactNode;
}

export const SafeAuthProvider: React.FC<SafeAuthProviderProps> = ({
  children,
}) => {
  const [isReactReady, setIsReactReady] = useState(false);

  useEffect(() => {
    // Ensure React is ready before initializing AuthProvider
    const initializeReact = () => {
      try {
        // Check if React hooks are available as functions (without calling them)
        const hasUseState = typeof React.useState === "function";
        const hasUseEffect = typeof React.useEffect === "function";
        const hasUseContext = typeof React.useContext === "function";
        const hasCreateContext = typeof React.createContext === "function";

        // Verify all essential React features are available
        if (hasUseState && hasUseEffect && hasUseContext && hasCreateContext) {
          console.log("✅ React hooks verified, initializing AuthProvider");
          setIsReactReady(true);
        } else {
          console.log("⏳ React hooks not ready, retrying...", {
            useState: hasUseState,
            useEffect: hasUseEffect,
            useContext: hasUseContext,
            createContext: hasCreateContext,
          });
          setTimeout(initializeReact, 100);
        }
      } catch (error) {
        console.log("❌ React initialization error, retrying:", error);
        setTimeout(initializeReact, 100);
      }
    };

    // Start initialization with a delay to ensure React is fully loaded
    const timer = setTimeout(initializeReact, 150);
    return () => clearTimeout(timer);
  }, []);

  if (!isReactReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
};
