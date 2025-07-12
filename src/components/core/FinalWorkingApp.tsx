import React, { useState } from "react";

const FinalWorkingApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname || "/",
  );

  // Simple navigation without React Router
  const navigate = (path: string) => {
    setCurrentPage(path);
    window.history.pushState({}, "", path);
  };

  // Handle browser navigation
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  console.log("🚀 FinalWorkingApp loaded, current page:", currentPage);

  // Platform Admin Dashboard
  const PlatformAdminPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 mr-4"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl font-bold">Platform Admin Dashboard</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                🧠
              </div>
              <div>
                <h3 className="font-semibold text-lg">Matching Algorithm</h3>
                <p className="text-gray-600 text-sm">
                  Configure matching weights
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/matching-settings")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Configure →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                ⚙️
              </div>
              <div>
                <h3 className="font-semibold text-lg">Platform Settings</h3>
                <p className="text-gray-600 text-sm">System configuration</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/security-settings")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage →
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                📧
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Settings</h3>
                <p className="text-gray-600 text-sm">Email configuration</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/email-settings")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Configure →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Platform Settings Page
  const PlatformSettingsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate("/platform-admin")}
            className="text-blue-600 hover:text-blue-700 mr-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Platform Settings</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            🤖 AI & Matching Settings
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <div>
                <div className="font-medium">Algorithm Status</div>
                <div className="text-sm text-gray-600">
                  Active with weighted scoring
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Active
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">30%</div>
                <div className="text-xs text-gray-600">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25%</div>
                <div className="text-xs text-gray-600">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">20%</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15%</div>
                <div className="text-xs text-gray-600">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10%</div>
                <div className="text-xs text-gray-600">Price</div>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/matching-settings")}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Configure Algorithm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Matching Algorithm Configuration
  const MatchingSettingsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate("/admin/security-settings")}
            className="text-blue-600 hover:text-blue-700 mr-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">
            Matching Algorithm Configuration
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            Algorithm Weight Settings
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Weight: 30%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="30"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Weight: 25%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="25"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating Weight: 20%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="20"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Weight: 15%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="15"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Weight: 10%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="10"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
                Save Configuration
              </button>
              <button className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700">
                Test Algorithm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Email Settings Page
  const EmailSettingsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate("/platform-admin")}
            className="text-blue-600 hover:text-blue-700 mr-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Email Settings</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Email Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                EmailJS Service ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="service_xxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="template_xxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public Key
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your EmailJS public key"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
                Save Settings
              </button>
              <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
                Send Test Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Homepage
  const HomePage = () => (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Peptok</h1>
            <nav className="space-x-4">
              <span className="text-gray-600">
                Demo Mode - No Login Required
              </span>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border-blue-200 mb-6">
                ⚡ Trusted by 8+ companies worldwide
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
                Connect with{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Retired Experts
                </span>{" "}
                for{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Enterprise Growth
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Peptok bridges the gap between your enterprises and seasoned
                professionals, creating meaningful coaching connections that
                drive measurable business outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => navigate("/platform-admin")}
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  Explore Admin Features
                  <span className="ml-2">→</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    12
                  </div>
                  <div className="text-sm text-gray-600">
                    Professional Coaches
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    45
                  </div>
                  <div className="text-sm text-gray-600">
                    Sessions Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    4.8/5.0
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                  <div className="text-sm text-gray-600">Companies Served</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case "/platform-admin":
        return <PlatformAdminPage />;
      case "/admin/security-settings":
        return <PlatformSettingsPage />;
      case "/admin/matching-settings":
        return <MatchingSettingsPage />;
      case "/admin/email-settings":
        return <EmailSettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      {/* Navigation Panel */}
      <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg z-50">
        <div className="text-sm font-bold text-blue-600 mb-3">
          🚀 ALL FEATURES
        </div>
        <div className="space-y-2">
          <button
            onClick={() => navigate("/")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentPage === "/"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🏠 Homepage
          </button>
          <button
            onClick={() => navigate("/platform-admin")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentPage === "/platform-admin"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🎛️ Platform Admin
          </button>
          <button
            onClick={() => navigate("/admin/security-settings")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentPage === "/admin/security-settings"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            ⚙️ Platform Settings ⭐
          </button>
          <button
            onClick={() => navigate("/admin/matching-settings")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentPage === "/admin/matching-settings"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🧠 Matching Algorithm
          </button>
          <button
            onClick={() => navigate("/admin/email-settings")}
            className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
              currentPage === "/admin/email-settings"
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            📧 Email Settings
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
          Path: {currentPage}
        </div>
      </div>

      {renderPage()}
    </div>
  );
};

export default FinalWorkingApp;
