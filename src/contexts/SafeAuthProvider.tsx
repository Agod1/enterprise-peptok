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
        // Test if React hooks are working
        const testState = useState(true);
        if (testState && React.useEffect && React.useContext) {
          setIsReactReady(true);
        } else {
          // Retry after a small delay
          setTimeout(initializeReact, 50);
        }
      } catch (error) {
        // React not ready yet, retry
        setTimeout(initializeReact, 50);
      }
    };

    // Start initialization after a small delay
    const timer = setTimeout(initializeReact, 100);
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
