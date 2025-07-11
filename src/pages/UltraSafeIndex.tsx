import React from "react";

const UltraSafeIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Peptok</h1>
            <nav className="space-x-4">
              <a href="/pricing" className="text-gray-600 hover:text-blue-600">
                Pricing
              </a>
              <a href="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero section */}
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
                professionals, creating meaningful mentorship connections that
                drive measurable business outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  Get Started Free
                  <span className="ml-2">→</span>
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  💰 View Pricing
                </a>
              </div>

              {/* Stats */}
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

        {/* Always show development navigation for demo */}
        <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg z-50">
          <div className="text-sm font-bold text-blue-600 mb-3">
            🚀 ALL FEATURES
          </div>
          <div className="space-y-2">
            <a
              href="/platform-admin"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
            >
              Platform Admin Dashboard
            </a>
            <a
              href="/admin/security-settings"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
            >
              Platform Settings ⭐
            </a>
            <a
              href="/admin/matching-settings"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
            >
              Matching Algorithm
            </a>
            <a
              href="/admin/email-settings"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
            >
              Email Settings
            </a>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Peptok. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UltraSafeIndex;
