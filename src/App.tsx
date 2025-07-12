import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FullApp } from "@/components/core/FullApp";
import { AuthProvider } from "@/contexts/AuthContext";
// Removed unused safety wrapper imports
// Alternative implementations available but not used:
// import { ReactReadyWrapper } from "@/components/core/ReactReadyWrapper"; // Using UltraRobustWrapper instead
// import { SafeAuthProvider } from "@/contexts/SafeAuthProvider";
// import FinalWorkingApp from "@/components/core/FinalWorkingApp";
// import { StandaloneApp } from "@/components/core/StandaloneApp";
// import { MinimalApp } from "@/components/core/MinimalApp";

// Debug utilities in development
if (import.meta.env.DEV) {
  import("./utils/debug");
  import("./utils/emailDemo");
}

// Removed: localStorage elimination service (deleted)

const queryClient = new QueryClient();

const App: React.FC = () => {
  // Set up a mock admin user for development - do this immediately without hooks
  if (import.meta.env.DEV && typeof window !== "undefined") {
    try {
      const existingUser = localStorage.getItem("peptok_user");
      if (!existingUser) {
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
        console.log("🧪 Dev: Mock admin user created");
      }
    } catch (error) {
      console.warn("Failed to set up mock user:", error);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div style={{ padding: "20px" }}>
          <h1>App Loading Test</h1>
          <p>QueryClientProvider and AuthProvider are working.</p>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
