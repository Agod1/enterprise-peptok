import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Environment } from "./utils/environment";
import { dummyDataCleaner } from "./utils/clearDummyData";
import { accountVerification } from "./utils/accountVerification";

// Make React globally available for external libraries
if (typeof window !== "undefined") {
  (window as any).React = React;
}

// Log environment information for debugging
console.log(`🌍 Environment: ${Environment.getEnvironmentName()}`);
console.log(`🔗 API Base URL: ${Environment.getApiBaseUrl()}`);
console.log(`🔌 Should try backend: ${Environment.shouldTryBackend()}`);

// COMPLETE DATA RESET - Clear everything and start fresh
console.log("🔄 PERFORMING COMPLETE DATA RESET FOR FRESH ACCOUNTS");
dummyDataCleaner.initializeCompletelyCleanSystem();

// Extra cleanup for program data specifically
dummyDataCleaner.clearAllProgramData();

// Also clear all analytics, statistics, session data, and any cached metrics
try {
  // Clear any remaining data that might show on dashboards
  const additionalKeys = [
    "analytics_data",
    "dashboard_stats",
    "recent_activity",
    "upcoming_sessions",
    "peptok_analytics_data",
    "peptok_sessions",
    "mock_sessions",
    "platform_statistics",
    "company_statistics",
    "coach_statistics",
    "user_analytics",
    "session_analytics",
    "revenue_data",
    "engagement_metrics",
    "performance_metrics",
    "activity_feed",
    "recent_activities",
    "notification_data",
    "dashboard_cache",
    // Session and metrics cache
    "cached_sessions",
    "cached_metrics",
    "dashboard_metrics_cache",
    "active_sessions",
    "completed_sessions",
    "session_outcomes",
    "goals_progress",
    "coaching_hours",
    "session_statistics",
  ];
  additionalKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
  console.log(
    "✅ Cleared all dashboard, analytics, and session data - metrics will be computed from scratch",
  );
} catch (error) {
  console.warn("Could not clear additional data:", error);
}

// Verify the new accounts are properly set up
setTimeout(() => {
  accountVerification.performCompleteVerification();
}, 1000); // Small delay to ensure cleanup is complete

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
