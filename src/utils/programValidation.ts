import { programService } from "@/services/programService";
import { CreateProgramRequest } from "@/types/program";

/**
 * Validation utility to test program creation and session generation
 */
export class ProgramValidation {
  /**
   * Test that creating a program generates the correct number of sessions
   */
  static async validateProgramCreation(): Promise<{
    success: boolean;
    message: string;
    details?: any;
  }> {
    try {
      console.log("🧪 Testing program creation and session generation...");

      // Create a test program request with Sales & Marketing structure
      const testRequest: CreateProgramRequest = {
        title: "Test Sales and Marketing Development",
        description: "Test program to validate session generation",
        goals: [
          {
            id: "goal_1",
            title: "Sales",
            description: "Test sales goal",
            category: "business" as const,
            priority: "high" as const,
          },
          {
            id: "goal_2",
            title: "Marketing",
            description: "Test marketing goal",
            category: "business" as const,
            priority: "medium" as const,
          },
        ],
        timeline: {
          totalSessions: 16, // 16 weeks
          hoursPerSession: 1,
          sessionFrequency: "weekly",
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date(Date.now() + 16 * 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          sessionType: "video",
        },
        participants: [
          {
            id: "test_participant_1",
            name: "Test Participant",
            email: "test@example.com",
            role: "Sales Manager",
          },
        ],
        companyId: "comp_001", // TechCorp Industries
        createdBy: "user_001", // Sarah Johnson
        budget: {
          min: 15000,
          max: 30000,
          currency: "CAD",
        },
      };

      // Create the program
      const createdProgram = await programService.createProgram(testRequest);

      // Validate the program was created
      if (!createdProgram || !createdProgram.id) {
        return {
          success: false,
          message: "Program creation failed - no program returned",
        };
      }

      // Validate sessions were generated
      if (!createdProgram.sessions || createdProgram.sessions.length === 0) {
        return {
          success: false,
          message: "Session generation failed - no sessions created",
        };
      }

      // Validate correct number of sessions
      if (createdProgram.sessions.length !== 16) {
        return {
          success: false,
          message: `Wrong number of sessions: expected 16, got ${createdProgram.sessions.length}`,
        };
      }

      // Validate session details
      const firstSession = createdProgram.sessions[0];
      if (
        !firstSession.title.includes("Test Sales and Marketing Development")
      ) {
        return {
          success: false,
          message: "Session title doesn't match program title",
        };
      }

      // Clean up test data
      await this.cleanupTestData(createdProgram.id);

      return {
        success: true,
        message: `✅ Program creation validation passed! Created ${createdProgram.sessions.length} sessions successfully`,
        details: {
          programId: createdProgram.id,
          sessionCount: createdProgram.sessions.length,
          firstSessionTitle: firstSession.title,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Program validation failed: ${error.message}`,
        details: error,
      };
    }
  }

  /**
   * Clean up test data after validation
   */
  private static async cleanupTestData(programId: string): Promise<void> {
    try {
      // Remove test program from localStorage
      const programs = await programService.getPrograms();
      const filteredPrograms = programs.filter((p) => p.id !== programId);

      localStorage.setItem("peptok_programs", JSON.stringify(filteredPrograms));

      // Remove test sessions
      const sessionsKey = "peptok_program_sessions";
      const allSessions = JSON.parse(localStorage.getItem(sessionsKey) || "{}");
      delete allSessions[programId];
      localStorage.setItem(sessionsKey, JSON.stringify(allSessions));

      console.log("🧹 Test data cleaned up");
    } catch (error) {
      console.warn("Could not clean up test data:", error);
    }
  }

  /**
   * Run validation and log results
   */
  static async runValidation(): Promise<void> {
    const result = await this.validateProgramCreation();

    if (result.success) {
      console.log("✅ VALIDATION PASSED:", result.message);
    } else {
      console.error("❌ VALIDATION FAILED:", result.message);
    }

    if (result.details) {
      console.log("📋 Details:", result.details);
    }
  }
}
