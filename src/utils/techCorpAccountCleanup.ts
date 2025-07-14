import { toast } from "sonner";

/**
 * Specific cleanup utility for TechCorp account (admin@techcorp.com)
 * Removes Sarah Johnson's programs and ensures only real program data
 */
export class TechCorpAccountCleanup {
  private static readonly TECHCORP_EMAIL = "admin@techcorp.com";
  private static readonly TECHCORP_COMPANY_ID = "comp_001";

  /**
   * Clean Sarah Johnson's programs from TechCorp account
   */
  static cleanSarahJohnsonPrograms(): void {
    try {
      console.log(
        "🧹 Cleaning Sarah Johnson programs from TechCorp account...",
      );

      // Clean from program storage
      this.cleanProgramStorage();

      // Clean from session storage
      this.cleanSessionStorage();

      // Clean from coaching requests
      this.cleanCoachingRequests();

      // Clean from mentorship requests
      this.cleanMentorshipRequests();

      console.log("✅ Sarah Johnson programs cleaned from TechCorp account");
      toast.success(
        "TechCorp account cleaned - Sarah Johnson programs removed",
      );
    } catch (error) {
      console.error("Failed to clean Sarah Johnson programs:", error);
      toast.error("Failed to clean TechCorp account");
    }
  }

  private static cleanProgramStorage(): void {
    const programsKey = "peptok_programs";
    const programs = localStorage.getItem(programsKey);

    if (programs) {
      const programList = JSON.parse(programs);
      const cleanPrograms = programList.filter((program: any) => {
        const isInvalidProgram =
          // Remove programs with Sarah Johnson as coach
          program.assignedCoachName?.includes("Sarah Johnson") ||
          // Remove specific mock program titles
          program.title?.includes("Leadership Development Program Q1 2024") ||
          program.title?.includes("React Development Training") ||
          // Remove programs with Sarah Johnson as participant
          program.participants?.some((p: any) =>
            p.name?.includes("Sarah Johnson"),
          ) ||
          // Remove programs for TechCorp that are mock data
          (program.companyId === this.TECHCORP_COMPANY_ID &&
            (program.createdBy?.includes("sarah") ||
              program.lastModifiedBy?.includes("sarah")));

        if (isInvalidProgram) {
          console.log(`🗑️ Removing program: ${program.title}`);
          return false;
        }
        return true;
      });

      if (cleanPrograms.length !== programList.length) {
        localStorage.setItem(programsKey, JSON.stringify(cleanPrograms));
        console.log(
          `✅ Removed ${programList.length - cleanPrograms.length} invalid programs`,
        );
      }
    }
  }

  private static cleanSessionStorage(): void {
    const sessionsKey = "peptok_program_sessions";
    const sessions = localStorage.getItem(sessionsKey);

    if (sessions) {
      const sessionData = JSON.parse(sessions);
      let cleaned = false;

      for (const programId in sessionData) {
        const programSessions = sessionData[programId];
        const hasInvalidSessions = programSessions.some(
          (session: any) =>
            session.coachName?.includes("Sarah Johnson") ||
            session.coachId?.includes("sarah") ||
            session.title?.includes("React Development") ||
            session.title?.includes("Leadership Development Program"),
        );

        if (hasInvalidSessions) {
          delete sessionData[programId];
          cleaned = true;
          console.log(`🗑️ Removed sessions for program: ${programId}`);
        }
      }

      if (cleaned) {
        localStorage.setItem(sessionsKey, JSON.stringify(sessionData));
        console.log("✅ Cleaned invalid session data");
      }
    }
  }

  private static cleanCoachingRequests(): void {
    const keys = ["coaching_requests", "peptok_coaching_requests"];

    keys.forEach((key) => {
      const requests = localStorage.getItem(key);
      if (requests) {
        const requestList = JSON.parse(requests);
        const cleanRequests = requestList.filter((request: any) => {
          const isInvalid =
            request.assignedCoachId?.includes("sarah") ||
            request.assignedCoachName?.includes("Sarah Johnson") ||
            request.title?.includes("React Development Training") ||
            request.title?.includes("Leadership Development Program Q1 2024");

          if (isInvalid) {
            console.log(`🗑️ Removing coaching request: ${request.title}`);
            return false;
          }
          return true;
        });

        if (cleanRequests.length !== requestList.length) {
          localStorage.setItem(key, JSON.stringify(cleanRequests));
          console.log(`✅ Cleaned ${key}`);
        }
      }
    });
  }

  private static cleanMentorshipRequests(): void {
    const keys = ["mentorship_requests", "demoMentorshipRequests"];

    keys.forEach((key) => {
      const requests = localStorage.getItem(key);
      if (requests) {
        const requestList = JSON.parse(requests);
        const cleanRequests = requestList.filter((request: any) => {
          const isInvalid =
            request.assignedCoachId?.includes("sarah") ||
            request.assignedCoachName?.includes("Sarah Johnson") ||
            request.title?.includes("React Development Training") ||
            request.title?.includes("Leadership Development Program Q1 2024");

          if (isInvalid) {
            console.log(`🗑️ Removing mentorship request: ${request.title}`);
            return false;
          }
          return true;
        });

        if (cleanRequests.length !== requestList.length) {
          localStorage.setItem(key, JSON.stringify(cleanRequests));
          console.log(`✅ Cleaned ${key}`);
        }
      }
    });
  }

  /**
   * Complete cleanup for TechCorp account
   */
  static performCompleteCleanup(): void {
    console.log("🧹 Performing complete TechCorp account cleanup...");

    // Clean Sarah Johnson programs
    this.cleanSarahJohnsonPrograms();

    // Clear any user-specific caches for admin@techcorp.com
    const userCacheKeys = [
      `user_programs_${this.TECHCORP_EMAIL}`,
      `user_sessions_${this.TECHCORP_EMAIL}`,
      `user_requests_${this.TECHCORP_EMAIL}`,
      `company_data_${this.TECHCORP_COMPANY_ID}`,
    ];

    userCacheKeys.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`🗑️ Cleared cache: ${key}`);
      }
    });

    console.log("✅ Complete TechCorp account cleanup finished");
    toast.success("TechCorp account completely cleaned");
  }

  /**
   * Check if TechCorp account has any Sarah Johnson programs
   */
  static hasSarahJohnsonPrograms(): boolean {
    const programsKey = "peptok_programs";
    const programs = localStorage.getItem(programsKey);

    if (programs) {
      const programList = JSON.parse(programs);
      return programList.some(
        (program: any) =>
          program.assignedCoachName?.includes("Sarah Johnson") ||
          program.title?.includes("Leadership Development Program Q1 2024") ||
          program.title?.includes("React Development Training"),
      );
    }

    return false;
  }
}

// Export the cleanup utility
export const techCorpCleanup = TechCorpAccountCleanup;
