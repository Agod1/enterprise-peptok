import * as React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FullApp } from "@/components/core/FullApp";
import { AuthProvider } from "@/contexts/AuthContext";
import LocalStorageService from "@/services/localStorageService";
import "@/utils/demoDataSeeder"; // Initialize demo data
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
      const existingUser = LocalStorageService.getUser();
      if (!existingUser) {
        const mockUser = {
          id: "company-admin-1",
          name: "Company Admin",
          email: "admin@democompany.com",
          userType: "company_admin" as const,
          companyId: "demo-company-1",
          status: "active" as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          provider: "email" as const,
        };

        // Store using the localStorage service
        LocalStorageService.setUser(mockUser);
        LocalStorageService.setToken("mock-admin-token");
        console.log(
          "🧪 Dev: Mock company admin user created using localStorage service",
        );
      }
    } catch (error) {
      console.warn("Failed to set up mock user:", error);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FullApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
