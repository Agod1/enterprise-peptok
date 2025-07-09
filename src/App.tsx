import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactReady } from "@/components/core/ReactReady";
import { AppShell } from "@/components/core/AppShell";

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
      <ReactReady fallback={<div>Loading Peptok Platform...</div>}>
        <AppShell />
      </ReactReady>
    </QueryClientProvider>
  );
};

export default App;
