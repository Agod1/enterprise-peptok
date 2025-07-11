import React from "react";
import FinalWorkingApp from "@/components/core/FinalWorkingApp";
// import { StandaloneApp } from "@/components/core/StandaloneApp"; // Using FinalWorkingApp instead
// import { QueryClient } from "@tanstack/react-query"; // Not needed
// import { FullApp } from "@/components/core/FullApp"; // Not needed
// import { SafeAuthProvider } from "@/contexts/SafeAuthProvider"; // Not needed
// import { SafeQueryProvider } from "@/components/providers/SafeQueryProvider"; // Not needed
// import { MinimalApp } from "@/components/core/MinimalApp"; // Keeping as backup

// Debug utilities in development - disabled for standalone
// if (import.meta.env.DEV) {
//   import("./utils/debug");
//   import("./utils/emailDemo");
// }

// Initialize localStorage elimination service - disabled for standalone
// import("./services/localStorageElimination");

// const queryClient = new QueryClient(); // Not needed for standalone

const App: React.FC = () => {
  // Force cache refresh with timestamp
  console.log("🚀 Loading FinalWorkingApp at:", new Date().toISOString());
  console.log("🚫 NO LOGIN REQUIRED - Demo Mode Active");

  // Final working app with no authentication needed
  return (
    <div key="final-working-app-v3" id="final-working-app-container">
      <FinalWorkingApp />
    </div>
  );
};

export default App;
