import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const QuickNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!import.meta.env.DEV) {
    return null;
  }

  const links = [
    { path: "/platform-admin", label: "Platform Admin Dashboard" },
    { path: "/admin/security-settings", label: "Platform Settings (NEW)" },
    { path: "/admin/matching-settings", label: "Matching Algorithm" },
    { path: "/admin/email-settings", label: "Email Settings" },
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
