import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FullApp } from "@/components/core/FullApp";
import { SafeAuthProvider } from "@/contexts/SafeAuthProvider";
// Alternative implementations available but not used:
// import FinalWorkingApp from "@/components/core/FinalWorkingApp";
// import { StandaloneApp } from "@/components/core/StandaloneApp";
// import { MinimalApp } from "@/components/core/MinimalApp";

// Debug utilities in development
if (import.meta.env.DEV) {
  import("./utils/debug");
  import("./utils/emailDemo");
}

// Initialize localStorage elimination service
import("./services/localStorageElimination");

const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAuthProvider>
        <FullApp />
      </SafeAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
