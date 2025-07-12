import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";

interface SafeAuthProviderProps {
  children: React.ReactNode;
}

export const SafeAuthProvider: React.FC<SafeAuthProviderProps> = ({
  children,
}) => {
  // Use class component style state to avoid hooks during initialization
  const [isReactReady, setIsReactReady] = React.useState(false);

  React.useEffect(() => {
    // Simple React readiness check without complex testing
    const initializeReact = () => {
      try {
        // Just check if React object has the basic properties we need
        if (
          React &&
          React.useState &&
          React.useEffect &&
          React.useContext &&
          React.createContext
        ) {
          console.log("✅ React ready, initializing AuthProvider");
          setIsReactReady(true);
        } else {
          console.log("⏳ React not ready, retrying...");
          setTimeout(initializeReact, 200);
        }
      } catch (error) {
        console.log("❌ React check error, retrying:", error);
        setTimeout(initializeReact, 200);
      }
    };

    // Start initialization immediately since we're already in a useEffect
    initializeReact();
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
