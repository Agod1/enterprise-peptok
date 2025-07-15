// Debug utilities for development - Backend-only mode
export const debugBackendConnection = () => {
  console.log("=== Backend-Only Mode Debug Info ===");
  console.log("localStorage usage:", "❌ ELIMINATED");
  console.log("Demo data:", "❌ ELIMINATED");
  console.log("Data source:", "✅ Backend-nestjs PostgreSQL only");
  console.log("Auth method:", "✅ Backend API only");
  console.log("======================================");
};

// Legacy function - now shows warning
export const debugLocalStorage = () => {
  console.warn(
    "❌ localStorage debugging eliminated! Use debugBackendConnection() instead.",
  );
  debugBackendConnection();
};

export const clearMentorshipRequests = () => {
  console.warn(
    "❌ localStorage usage eliminated! All data comes from backend API.",
  );
  console.log("Use backend API endpoints to manage mentorship requests.");
};

export const addSampleRequest = () => {
  const sampleRequest = {
    id: `debug_request_${Date.now()}`,
    companyId: "debug-company",
    title: "Debug Test Request",
    description: "This is a test request created for debugging",
    goals: [
      {
        id: "debug_goal_1",
        title: "Test Goal",
        description: "A test goal",
        category: "technical",
        priority: "medium",
      },
    ],
    metricsToTrack: ["Test metric"],
    teamMembers: [],
    preferredExpertise: ["Testing"],
    timeline: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      sessionFrequency: "weekly",
    },
    status: "submitted",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.warn(
    "❌ localStorage usage eliminated! Use backend API to create requests.",
  );
  console.log("Sample request (for reference only):", sampleRequest);
  console.log(
    "To create this request, use the backend API endpoint: POST /api/mentorship-requests",
  );
};

// Make functions available globally in development
if (import.meta.env.DEV) {
  (window as any).debugBackend = debugBackendConnection;
  (window as any).debugLS = debugLocalStorage; // Legacy - shows warning
  (window as any).clearRequests = clearMentorshipRequests;
  (window as any).addSampleRequest = addSampleRequest;

  console.log("✅ Backend-only mode debug functions available:");
  console.log("  - debugBackend(): Show backend connection info");
  console.log("  - debugLS(): Legacy function (shows warning)");
  console.log("❌ localStorage functions eliminated - use backend API instead");
}
