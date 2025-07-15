/**
 * ❌ ELIMINATED: Demo data seeding completely removed
 *
 * This file previously seeded localStorage with demo data for development.
 * All data seeding is now handled by the backend-nestjs PostgreSQL database.
 *
 * @see USER_CREDENTIALS.md for seeded user login information
 * @see backend-nestjs/src/database/seeds/run-seed.ts for database seeding
 */

console.log(
  "🚨 Demo data seeding eliminated - using backend-nestjs PostgreSQL database only",
);

// Prevent any localStorage seeding
if (typeof window !== "undefined") {
  console.log(
    "✅ Backend-only mode active:",
    "\n  - No localStorage seeding",
    "\n  - No demo data fallbacks",
    "\n  - All data from PostgreSQL database",
    "\n  - See USER_CREDENTIALS.md for login info",
  );
}

// Export empty functions to prevent errors in existing imports
export const seedDemoData = () => {
  console.warn(
    "❌ seedDemoData() is eliminated! Use backend-nestjs database seeding instead.",
  );
};

export const initializeDemoData = () => {
  console.warn(
    "❌ initializeDemoData() is eliminated! Use backend-nestjs database seeding instead.",
  );
};

export const clearDemoData = () => {
  console.warn(
    "❌ clearDemoData() is eliminated! No localStorage data to clear.",
  );
};
