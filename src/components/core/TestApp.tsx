import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PlatformSettings from "@/pages/admin/PlatformSettings";
import PlatformAdminDashboard from "@/pages/PlatformAdminDashboard";
import { useAuth } from "@/contexts/AuthContext";

// Mock user for testing
const mockUser = {
  id: "test-admin",
  name: "Test Admin",
  email: "admin@test.com",
  userType: "platform_admin" as const,
  companyId: "test-company",
};

// Simple test layout
const TestLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Peptok Platform Test</h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/")}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/admin/security-settings")}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
              >
                Platform Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
};

// Test Dashboard Component
const TestDashboard = () => {
  const navigate = useNavigate();

  return (
    <TestLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Platform Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Platform Settings Card */}
          <div
            className="bg-white p-6 rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/admin/security-settings")}
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">⚙️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Platform Settings</h3>
                <p className="text-sm text-gray-600">
                  Security, AI, and system configuration
                </p>
              </div>
            </div>
            <div className="text-xs text-blue-600">Security & AI controls</div>
          </div>

          {/* Test Matching Algorithm Card */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🧠</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Matching Algorithm</h3>
                <p className="text-sm text-gray-600">
                  Configure mentor-mentee matching weights
                </p>
              </div>
            </div>
            <div className="text-xs text-indigo-600">AI-powered matching</div>
          </div>
        </div>
      </div>
    </TestLayout>
  );
};

// Test Platform Settings Component
const TestPlatformSettings = () => {
  return (
    <TestLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Platform Settings</h2>

        {/* AI Settings Card */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧠</span>
            <h3 className="text-lg font-semibold">AI & Matching Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Matching Algorithm</div>
                <div className="text-sm text-gray-600">
                  Configure coach matching algorithm weights
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                Configure
              </button>
            </div>

            <hr />

            <div className="space-y-2">
              <div className="font-medium">Current Algorithm Status</div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                  Version 1.0.0
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  Active
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-xs text-gray-600">Skill Weight</div>
                <div className="font-semibold text-blue-600">30%</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-xs text-gray-600">Experience</div>
                <div className="font-semibold text-green-600">25%</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="text-xs text-gray-600">Rating</div>
                <div className="font-semibold text-yellow-600">20%</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="text-xs text-gray-600">Price</div>
                <div className="font-semibold text-purple-600">10%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔒</span>
            <h3 className="text-lg font-semibold">Security Settings</h3>
          </div>
          <div className="text-gray-600">
            Security controls and access management
          </div>
        </div>
      </div>
    </TestLayout>
  );
};

export const TestApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestDashboard />} />
        <Route
          path="/admin/security-settings"
          element={<TestPlatformSettings />}
        />
        <Route
          path="*"
          element={
            <TestLayout>
              <div className="text-center py-8">
                <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
                <p>This is a test version showing the changes you requested.</p>
              </div>
            </TestLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
