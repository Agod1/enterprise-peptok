/**
 * ❌ ELIMINATED: Demo database completely removed
 *
 * This file previously contained demo user data and localStorage-based storage.
 * All data is now sourced exclusively from the backend-nestjs PostgreSQL database.
 *
 * For any code still trying to use demo data, this will throw an error
 * to make the violation clear.
 *
 * @see USER_CREDENTIALS.md for seeded user login information
 * @see backend-nestjs/src/database/seeds/run-seed.ts for database seeding
 */

// Prevent accidental usage of demo data
export const demoUsers: never[] = (() => {
  throw new Error(
    "❌ Demo database usage is eliminated! " +
      "All user data must come from backend-nestjs PostgreSQL database. " +
      "See USER_CREDENTIALS.md for login credentials.",
  );
})();

export const demoCompanies: never[] = (() => {
  throw new Error(
    "❌ Demo database usage is eliminated! " +
      "All company data must come from backend-nestjs PostgreSQL database.",
  );
})();

export const demoMentorshipRequests: never[] = (() => {
  throw new Error(
    "❌ Demo database usage is eliminated! " +
      "All mentorship request data must come from backend-nestjs PostgreSQL database.",
  );
})();

export const demoSessions: never[] = (() => {
  throw new Error(
    "❌ Demo database usage is eliminated! " +
      "All session data must come from backend-nestjs PostgreSQL database.",
  );
})();

export const demoReviews: never[] = (() => {
  throw new Error(
    "❌ Demo database usage is eliminated! " +
      "All review data must come from backend-nestjs PostgreSQL database.",
  );
})();

export const getDemoStatistics = (): never => {
  throw new Error(
    "❌ Demo statistics usage is eliminated! " +
      "All statistics must be calculated from backend-nestjs PostgreSQL database.",
  );
};

// Export types for backward compatibility (these types can still be used)
export interface DemoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  userType: "platform_admin" | "company_admin" | "coach" | "team_member";
  companyId?: string;
  picture: string;
  provider: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  rating?: number;
  totalRatings?: number;
  hourlyRate?: number;
  joinedAt: string;
  lastActive: string;
  status: "active" | "suspended" | "inactive";
}

export interface DemoCompany {
  id: string;
  name: string;
  industry: string;
  size: string;
  adminId: string;
  employeeCount: number;
  activePrograms: number;
  totalSessions: number;
  subscriptionTier: string;
  joinedAt: string;
  status: "active" | "trial" | "suspended";
  revenue: number;
}

// Note: These interfaces are kept for type compatibility
// but the actual data arrays are eliminated to force backend usage
