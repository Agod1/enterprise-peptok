import React from "react";
import { StandaloneApp } from "@/components/core/StandaloneApp";
// import { QueryClient } from "@tanstack/react-query"; // Not needed for standalone
// import { FullApp } from "@/components/core/FullApp"; // Using StandaloneApp instead
// import { SafeAuthProvider } from "@/contexts/SafeAuthProvider"; // Not needed for standalone
// import { SafeQueryProvider } from "@/components/providers/SafeQueryProvider"; // Not needed for standalone
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
  // Standalone app - no auth setup needed
  return <StandaloneApp />;
};

export default App;
