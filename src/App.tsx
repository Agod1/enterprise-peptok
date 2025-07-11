import React from "react";
import { MinimalApp } from "@/components/core/MinimalApp";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Removed - causing React hook initialization issues
// import { ReactInitWrapper } from "@/components/core/ReactInitWrapper"; // Removed - causing initialization issues
// import { FullApp } from "@/components/core/FullApp"; // Temporarily disabled due to auth issues

// Debug utilities in development (disabled for demo)
// if (import.meta.env.DEV) {
//   import("./utils/debug");
//   import("./utils/emailDemo");
// }

// Initialize localStorage elimination service (disabled for demo)
// import("./services/localStorageElimination");

// const queryClient = new QueryClient(); // Removed - not needed for demo

const App: React.FC = () => {
  // Set up a mock admin user for development
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      const mockUser = {
        id: "admin-1",
        name: "Platform Admin",
        email: "admin@peptok.com",
        userType: "platform_admin" as const,
        companyId: "peptok-platform",
        status: "active" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store in localStorage for auth service
      localStorage.setItem("peptok_user", JSON.stringify(mockUser));
      localStorage.setItem("peptok_token", "mock-admin-token");
    }
  }, []);

  return <MinimalApp />;
};

export default App;
