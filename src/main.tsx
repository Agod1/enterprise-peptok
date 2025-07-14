import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Environment } from "./utils/environment";
import { dummyDataCleaner } from "./utils/clearDummyData";
import { techCorpCleanup } from "./utils/techCorpAccountCleanup";

// Make React globally available for external libraries
if (typeof window !== "undefined") {
  (window as any).React = React;
}

// Log environment information for debugging
console.log(`🌍 Environment: ${Environment.getEnvironmentName()}`);
console.log(`🔗 API Base URL: ${Environment.getApiBaseUrl()}`);
console.log(`🔌 Should try backend: ${Environment.shouldTryBackend()}`);

// Initialize clean system - clear all dummy data
dummyDataCleaner.initializeCleanSystem();

// Specific cleanup for TechCorp account to remove Sarah Johnson programs
techCorpCleanup.performCompleteCleanup();

// Suppress ResizeObserver loop errors (common with chart libraries like Recharts)
const resizeObserverErrorHandler = (e: ErrorEvent) => {
  if (
    e.message &&
    e.message.includes(
      "ResizeObserver loop completed with undelivered notifications",
    )
  ) {
    e.preventDefault();
    e.stopPropagation();
    // Optionally log a cleaner message instead
    console.debug(
      "ResizeObserver loop detected (suppressed - this is harmless)",
    );
    return false;
  }
  return true;
};

// Add error listener for ResizeObserver errors
window.addEventListener("error", resizeObserverErrorHandler);

// Also suppress uncaught promise rejections for ResizeObserver
window.addEventListener("unhandledrejection", (e) => {
  if (
    e.reason &&
    typeof e.reason === "string" &&
    e.reason.includes(
      "ResizeObserver loop completed with undelivered notifications",
    )
  ) {
    e.preventDefault();
    console.debug(
      "ResizeObserver loop detected in promise (suppressed - this is harmless)",
    );
  }
});

// Error boundary for production
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              Please check the browser console for error details, then refresh
              the page.
            </p>
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-left">
              <p className="text-sm text-red-700">
                Check browser console (F12) for detailed error information.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
