import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const QuickNav: React.FC = () => {
  // Safe hook usage with error handling
  let navigate: any = null;
  let location: any = { pathname: "/" };

  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    // Router hooks not ready, component will be disabled
    return null;
  }

  if (!import.meta.env.DEV || !navigate) {
    return null;
  }

  const links = [
    { path: "/", label: "🏠 Landing Page" },
    { path: "/dashboard", label: "📊 Company Dashboard" },
    { path: "/coaching/new", label: "➕ Create New Program" },
    { path: "/mentorship/new", label: "📝 Create Program (Legacy)" },
    { path: "/coach/dashboard", label: "👨‍🏫 Coach Dashboard" },
    { path: "/platform-admin", label: "⚙️ Platform Admin" },
    { path: "/admin/matching", label: "🎯 Matching Settings" },
    { path: "/admin/email", label: "📧 Email Settings" },
    { path: "/pricing", label: "💰 Pricing" },
    { path: "/coaches", label: "👥 Coach Directory" },
    { path: "/login", label: "🔐 Login" },
    { path: "/signup", label: "✍️ Sign Up" },
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg p-3 shadow-lg z-50">
      <div className="text-xs font-bold text-blue-600 mb-2">
        🚀 DEV NAVIGATION
      </div>
      <div className="space-y-1">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`block w-full text-left px-2 py-1 text-xs rounded transition-colors ${
              location.pathname === link.path
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.label}
            {link.label.includes("NEW") && (
              <span className="ml-1 text-red-500">●</span>
            )}
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
        Current: {location.pathname}
      </div>
    </div>
  );
};
