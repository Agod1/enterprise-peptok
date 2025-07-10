import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TestApp } from "@/components/core/TestApp";

// Debug utilities in development
if (import.meta.env.DEV) {
  import("./utils/debug");
  import("./utils/emailDemo");
}

// Initialize localStorage elimination service
import("./services/localStorageElimination");

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TestApp />
    </QueryClientProvider>
  );
};

export default App;
