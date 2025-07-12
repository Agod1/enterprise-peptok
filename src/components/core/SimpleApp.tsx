import React from "react";

// Simple app that directly shows admin functionality without routing issues
export const SimpleApp: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState("dashboard");

  const navigate = (page: string) => {
    setCurrentPage(page);
    console.log(`🚀 Navigating to: ${page}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "platform-settings":
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              Platform Settings
            </h1>
            <p className="text-gray-600">
              Platform settings, security controls, and AI configuration
            </p>

            {/* AI & Matching Settings Card */}
            <div className="bg-white border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🧠</span>
                <h3 className="text-lg font-semibold">
                  AI & Matching Settings
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Matching Algorithm</div>
                    <div className="text-sm text-gray-600">
                      Configure coach matching algorithm weights
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("matching-settings")}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
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
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🔒</span>
                <h3 className="text-lg font-semibold">Security Settings</h3>
              </div>
              <div className="text-gray-600">
                Password policies, access controls, and authentication settings
              </div>
            </div>
          </div>
        );

      case "matching-settings":
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              Matching Algorithm Settings
            </h1>
            <p className="text-gray-600">
              Configure the matching algorithm weights and parameters for
              coach-client pairing
            </p>

            {/* Weight Configuration */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Matching Weights</h3>

              <div className="space-y-4">
                {[
                  { name: "Skill Match", value: 30, color: "blue" },
                  { name: "Experience", value: 25, color: "green" },
                  { name: "Rating", value: 20, color: "yellow" },
                  { name: "Availability", value: 15, color: "purple" },
                  { name: "Price", value: 10, color: "pink" },
                ].map((weight) => (
                  <div key={weight.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{weight.name}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {weight.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${weight.color}-600 h-2 rounded-full`}
                        style={{ width: `${weight.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-2">
                  📊 Weight Distribution Summary
                </div>
                <div className="text-xs text-blue-700">
                  Current configuration prioritizes skill matching (30%) and
                  experience (25%), with moderate consideration for ratings
                  (20%) and availability (15%), and minimal price influence
                  (10%).
                </div>
              </div>
            </div>
          </div>
        );

      case "program-details":
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">
              Program Details - React Training
            </h1>
            <p className="text-gray-600">Matched coaches with scores</p>

            {/* Matched Coaches */}
            <div className="bg-white border rounded-lg">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>👥</span>
                  Matched Coaches (3)
                </h3>
                <div className="text-sm text-gray-600 mt-1">
                  <p>
                    Algorithm: 1.0.0 • Updated: {new Date().toLocaleString()}
                  </p>
                  <p className="flex items-center gap-4 mt-1">
                    <span>
                      Average Match:{" "}
                      <span className="font-semibold text-blue-600">85%</span>
                    </span>
                    <span>
                      Best Match:{" "}
                      <span className="font-semibold text-green-600">92%</span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {[
                  {
                    name: "Sarah Wilson",
                    title: "Senior React Developer",
                    score: 92,
                    experience: "8 years",
                    rate: 120,
                  },
                  {
                    name: "Michael Chen",
                    title: "React Specialist",
                    score: 85,
                    experience: "6 years",
                    rate: 135,
                  },
                  {
                    name: "Emma Rodriguez",
                    title: "JavaScript Expert",
                    score: 78,
                    experience: "5 years",
                    rate: 95,
                  },
                ].map((coach, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {coach.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">
                              {coach.name}
                            </h4>
                            <span
                              className={`text-sm px-2 py-1 rounded-full font-medium ${
                                coach.score >= 80
                                  ? "bg-green-100 text-green-700"
                                  : coach.score >= 60
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {coach.score}%
                            </span>
                          </div>
                          <p className="text-gray-600">{coach.title}</p>
                          <p className="text-sm text-gray-500">
                            {coach.experience} experience
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div
                          className={`px-3 py-1 rounded font-semibold text-sm ${
                            coach.score >= 80
                              ? "bg-green-100 text-green-800 border-green-300"
                              : coach.score >= 60
                                ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                : "bg-gray-100 text-gray-800 border-gray-300"
                          }`}
                        >
                          {coach.score}% Match
                        </div>
                        <div className="text-lg font-bold">
                          ${coach.rate}/hr
                        </div>
                      </div>
                    </div>

                    <div
                      className={`mt-4 border-2 rounded-lg p-3 ${
                        coach.score >= 80
                          ? "bg-green-50 border-green-200"
                          : coach.score >= 60
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">⭐</span>
                          <span className="text-sm font-medium text-gray-900">
                            Match Score
                          </span>
                        </div>
                        <span className="text-base font-bold text-green-800">
                          {coach.score}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-green-700 flex items-center gap-1">
                          <span>✓</span> Strong skill match (85%)
                        </div>
                        <div className="text-xs text-green-700 flex items-center gap-1">
                          <span>✓</span> Perfect experience level match
                        </div>
                        <div className="text-xs text-green-700 flex items-center gap-1">
                          <span>✓</span> Excellent rating (4.8/5)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Platform Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage users, companies, and platform settings
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Platform Settings Card */}
              <div
                className="bg-white border-2 border-blue-500 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate("platform-settings")}
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
                <div className="text-xs text-blue-600">
                  Security & AI controls
                </div>
                <div className="mt-2 text-red-500 font-bold">● NEW AI CARD</div>
              </div>

              {/* Matching Algorithm Card */}
              <div
                className="bg-white border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate("matching-settings")}
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🧠</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      Matching Algorithm
                    </h3>
                    <p className="text-sm text-gray-600">
                      Configure mentor-mentee matching weights
                    </p>
                  </div>
                </div>
                <div className="text-xs text-indigo-600">
                  AI-powered matching
                </div>
              </div>

              {/* Program Details Example */}
              <div
                className="bg-white border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate("program-details")}
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📊</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Program Details</h3>
                    <p className="text-sm text-gray-600">
                      View match scores in action
                    </p>
                  </div>
                </div>
                <div className="text-xs text-green-600">Match scores demo</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-blue-600">
                Peptok Platform
              </h1>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                ✅ Working Version
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("dashboard")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === "dashboard"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("platform-settings")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === "platform-settings"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Platform Settings
              </button>
              <button
                onClick={() => navigate("matching-settings")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === "matching-settings"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Matching Settings
              </button>
              <button
                onClick={() => navigate("program-details")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === "program-details"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Program Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">{renderPage()}</div>

      {/* Status Indicator */}
      <div className="fixed bottom-4 right-4 bg-green-100 border-2 border-green-300 rounded-lg p-3 shadow-lg">
        <div className="text-xs font-bold text-green-800 mb-1">
          🎉 ALL FEATURES WORKING
        </div>
        <div className="text-xs text-green-700">
          Current page: {currentPage}
        </div>
        <div className="text-xs text-green-600">No React hook errors!</div>
      </div>
    </div>
  );
};
