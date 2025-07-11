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
    // Ensure React hooks are available before initializing AuthProvider
    const initializeReact = () => {
      try {
        // Test if React hooks are working properly
        const testState = useState(true);
        const testEffect = React.useEffect;
        const testContext = React.useContext;

        // Verify all essential React features are available
        if (
          testState &&
          testEffect &&
          testContext &&
          typeof testState[0] === "boolean" &&
          typeof testState[1] === "function"
        ) {
          console.log("✅ React hooks verified, initializing AuthProvider");
          setIsReactReady(true);
        } else {
          console.log("⏳ React hooks not ready, retrying...");
          setTimeout(initializeReact, 100);
        }
      } catch (error) {
        console.log("❌ React hooks error, retrying:", error);
        setTimeout(initializeReact, 100);
      }
    };

    // Start initialization with a longer delay to ensure React is fully loaded
    const timer = setTimeout(initializeReact, 200);
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
