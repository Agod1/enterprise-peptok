import React, { useState } from "react";
import UltraSafeIndex from "@/pages/UltraSafeIndex";
import PlatformAdminDashboard from "@/pages/PlatformAdminDashboard";
import PlatformSettings from "@/pages/admin/PlatformSettings";
import MatchingSettings from "@/pages/admin/MatchingSettings";
import EmailSettings from "@/pages/admin/EmailSettings";

export const StandaloneApp: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState(
    window.location.pathname || "/",
  );

  // Simple client-side routing without React Router
  const navigate = (path: string) => {
    setCurrentRoute(path);
    window.history.pushState({}, "", path);
  };

  // Handle browser back/forward
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case "/platform-admin":
        return <PlatformAdminDashboard />;
      case "/admin/security-settings":
        return <PlatformSettings />;
      case "/admin/matching-settings":
        return <MatchingSettings />;
      case "/admin/email-settings":
        return <EmailSettings />;
      default:
        return <UltraSafeIndex />;
    }
  };

  // Create a simple navigation context
  const navigationContext = React.useMemo(
    () => ({
      navigate,
      currentRoute,
    }),
    [currentRoute],
  );

  return (
    <div>
      {/* Provide navigation to child components */}
      <div style={{ display: "none" }} id="navigation-context">
        {JSON.stringify(navigationContext)}
      </div>

      {/* Global navigation panel */}
      <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg z-50">
        <div className="text-sm font-bold text-blue-600 mb-3">
          🚀 ALL FEATURES
        </div>
        <div className="space-y-2">
          <button
            onClick={() => navigate("/")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentRoute === "/"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🏠 Homepage
          </button>
          <button
            onClick={() => navigate("/platform-admin")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentRoute === "/platform-admin"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🎛️ Platform Admin Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/security-settings")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentRoute === "/admin/security-settings"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            ⚙️ Platform Settings ⭐
          </button>
          <button
            onClick={() => navigate("/admin/matching-settings")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentRoute === "/admin/matching-settings"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🧠 Matching Algorithm
          </button>
          <button
            onClick={() => navigate("/admin/email-settings")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentRoute === "/admin/email-settings"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            📧 Email Settings
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
          Current: {currentRoute}
        </div>
      </div>

      {/* Render current page */}
      {renderPage()}
    </div>
  );
};
