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
  // For development, load the full app directly
  const LazyFullApp = React.lazy(() =>
    import("./components/core/FullApp").then((module) => ({
      default: module.FullApp,
    })),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading Peptok Platform...</div>}>
        <LazyFullApp />
      </React.Suspense>
    </QueryClientProvider>
  );
};

export default App;
