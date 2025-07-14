import { toast } from "sonner";

/**
 * Comprehensive utility to clear all dummy/mock data from the system
 * This ensures the application only shows real data
 */
export class DummyDataCleaner {
  private static readonly DUMMY_DATA_KEYS = [
    // Program-related dummy data
    "peptok_programs",
    "peptok_program_sessions",

    // Legacy dummy data
    "mentorship_requests",
    "demoMentorshipRequests",
    "coaching_requests",
    "peptok_coaching_requests",

    // Sarah Johnson specific data
    "sarah_johnson_programs",
    "leadership_development_q1_2024",

    // Session dummy data
    "peptok_sessions",
    "mock_sessions",
    "demo_sessions",

    // User and company dummy data
    "dummy_users",
    "demo_users",
    "mock_companies",
    "demo_companies",

    // Sample data from initializer
    "team_invitations",
    "sampleDataInitialized",

    // Analytics dummy data
    "demo_analytics",
    "mock_metrics",

    // Other potential dummy keys
    "sample_data",
    "test_data",
    "mock_data",
    "demo_data",
  ];

  /**
   * Clear ALL data from localStorage (complete reset)
   */
  static clearAllData(): void {
    try {
      const allKeys = Object.keys(localStorage);
      const totalKeys = allKeys.length;

      // Clear everything
      localStorage.clear();

      console.log(
        `🧹 COMPLETE DATA CLEAR: Removed ${totalKeys} items from localStorage`,
      );
      console.log("🔄 System reset - ready for fresh data");

      toast.success(`Complete data reset - ${totalKeys} items cleared`);
    } catch (error) {
      console.error("Failed to clear all data:", error);
      toast.error("Failed to perform complete data reset");
    }
  }

  /**
   * Clear all dummy data from localStorage
   */
  static clearAllDummyData(): void {
    try {
      let clearedCount = 0;

      // Clear specific dummy data keys
      this.DUMMY_DATA_KEYS.forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
          clearedCount++;
          console.log(`🧹 Cleared dummy data: ${key}`);
        }
      });

      // Clear any keys that contain "dummy", "mock", "demo", "sample", "test", "sarah", "react development", "leadership development"
      const suspiciousPatterns = [
        "dummy",
        "mock",
        "demo",
        "sample",
        "test",
        "sarah",
        "react development",
        "leadership development",
      ];
      const allKeys = Object.keys(localStorage);

      allKeys.forEach((key) => {
        const lowerKey = key.toLowerCase();
        if (suspiciousPatterns.some((pattern) => lowerKey.includes(pattern))) {
          localStorage.removeItem(key);
          clearedCount++;
          console.log(`🧹 Cleared suspicious dummy data: ${key}`);
        }
      });

      // Specifically check for and clean program data that contains mock references
      this.cleanMockProgramData();

      if (clearedCount > 0) {
        console.log(
          `✅ Cleared ${clearedCount} dummy data entries from localStorage`,
        );
        toast.success(
          `System cleaned - removed ${clearedCount} dummy data entries`,
        );
      } else {
        console.log("✅ No dummy data found to clear");
        toast.info("System is clean - no dummy data found");
      }
    } catch (error) {
      console.error("Failed to clear dummy data:", error);
      toast.error("Failed to clean system data");
    }
  }

  /**
   * Clear dummy data but preserve user settings and essential data
   */
  static clearDummyDataSafely(): void {
    try {
      const preserveKeys = [
        // User preferences
        "user_preferences",
        "ui_theme",
        "language_setting",

        // Authentication
        "auth_token",
        "refresh_token",
        "user_session",

        // Application state
        "app_settings",
        "feature_flags",

        // Valid program data (starts with real company IDs)
        // We'll preserve anything that doesn't match dummy patterns
      ];

      let clearedCount = 0;

      // Only clear the specific dummy data keys
      this.DUMMY_DATA_KEYS.forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
          clearedCount++;
          console.log(`🧹 Safely cleared dummy data: ${key}`);
        }
      });

      if (clearedCount > 0) {
        console.log(`✅ Safely cleared ${clearedCount} dummy data entries`);
        toast.success(
          `System cleaned safely - removed ${clearedCount} dummy entries`,
        );
      }
    } catch (error) {
      console.error("Failed to safely clear dummy data:", error);
      toast.error("Failed to clean system data safely");
    }
  }

  /**
   * Check if system has dummy data
   */
  static hasDummyData(): boolean {
    return this.DUMMY_DATA_KEYS.some(
      (key) => localStorage.getItem(key) !== null,
    );
  }

  /**
   * Get count of dummy data entries
   */
  static getDummyDataCount(): number {
    return this.DUMMY_DATA_KEYS.filter(
      (key) => localStorage.getItem(key) !== null,
    ).length;
  }

  /**
   * Clean mock program data from localStorage
   */
  private static cleanMockProgramData(): void {
    try {
      // Check for programs in localStorage
      const programsKey = "peptok_programs";
      const sessionsKey = "peptok_program_sessions";

      const programs = localStorage.getItem(programsKey);
      if (programs) {
        const programList = JSON.parse(programs);
        const cleanPrograms = programList.filter((program: any) => {
          const hasMockData =
            program.title?.includes("React Development Training") ||
            program.title?.includes("Leadership Development Program Q1 2024") ||
            program.assignedCoachName?.includes("Sarah Johnson") ||
            program.participants?.some((p: any) =>
              p.name?.includes("Sarah Johnson"),
            );

          if (hasMockData) {
            console.log(`🗑️ Removing mock program: ${program.title}`);
            return false;
          }
          return true;
        });

        if (cleanPrograms.length !== programList.length) {
          localStorage.setItem(programsKey, JSON.stringify(cleanPrograms));
          console.log(
            `✅ Cleaned ${programList.length - cleanPrograms.length} mock programs`,
          );
        }
      }

      // Clean sessions as well
      const sessions = localStorage.getItem(sessionsKey);
      if (sessions) {
        const sessionData = JSON.parse(sessions);
        let cleaned = false;

        for (const programId in sessionData) {
          const programSessions = sessionData[programId];
          if (
            programSessions.some(
              (s: any) =>
                s.coachName?.includes("Sarah Johnson") ||
                s.title?.includes("React Development") ||
                s.title?.includes("Leadership Development"),
            )
          ) {
            delete sessionData[programId];
            cleaned = true;
            console.log(`🗑️ Removed mock sessions for program: ${programId}`);
          }
        }

        if (cleaned) {
          localStorage.setItem(sessionsKey, JSON.stringify(sessionData));
          console.log("✅ Cleaned mock session data");
        }
      }
    } catch (error) {
      console.error("Failed to clean mock program data:", error);
    }
  }

  /**
   * Initialize completely clean system - call this on app startup
   * Performs complete data reset for fresh start
   */
  static initializeCompletelyCleanSystem(): void {
    console.log("🔄 INITIALIZING COMPLETE SYSTEM RESET...");

    // Perform complete data clear
    this.clearAllData();

    console.log("✅ Complete system reset finished - ready for fresh accounts");
  }

  /**
   * Initialize clean system - call this on app startup
   */
  static initializeCleanSystem(): void {
    console.log("🧹 Initializing clean system...");

    if (this.hasDummyData()) {
      console.log(
        `Found ${this.getDummyDataCount()} dummy data entries - cleaning...`,
      );
      this.clearDummyDataSafely();
    } else {
      console.log("✅ System is already clean");
    }

    // Always run mock program data cleanup
    this.cleanMockProgramData();
  }
}

// Export the cleaner instance
export const dummyDataCleaner = DummyDataCleaner;
