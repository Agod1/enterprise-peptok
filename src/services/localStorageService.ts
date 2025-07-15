/**
 * ❌ REMOVED: localStorage service completely eliminated
 *
 * This service has been completely removed to enforce backend-only data storage.
 * All data must now come from the backend API.
 *
 * For any code still trying to use localStorage, this will throw an error
 * to make the violation clear.
 */

export class LocalStorageService {
  private static throwError(method: string): never {
    throw new Error(
      `❌ localStorage usage is completely eliminated! ` +
        `Called: ${method}. ` +
        `All data must come from backend API. ` +
        `No localStorage fallbacks allowed.`,
    );
  }

  // Authentication - REMOVED
  static setUser(): never {
    this.throwError("setUser");
  }
  static getUser(): never {
    this.throwError("getUser");
  }
  static setToken(): never {
    this.throwError("setToken");
  }
  static getToken(): never {
    this.throwError("getToken");
  }
  static clearAuth(): never {
    this.throwError("clearAuth");
  }

  // All other methods - REMOVED
  static setCoachingRequests(): never {
    this.throwError("setCoachingRequests");
  }
  static getCoachingRequests(): never {
    this.throwError("getCoachingRequests");
  }
  static addCoachingRequest(): never {
    this.throwError("addCoachingRequest");
  }
  static updateCoachingRequest(): never {
    this.throwError("updateCoachingRequest");
  }
  static getCoachingRequest(): never {
    this.throwError("getCoachingRequest");
  }
  static setCoachingRequestDraft(): never {
    this.throwError("setCoachingRequestDraft");
  }
  static getCoachingRequestDraft(): never {
    this.throwError("getCoachingRequestDraft");
  }
  static clearCoachingRequestDraft(): never {
    this.throwError("clearCoachingRequestDraft");
  }
  static setProgramId(): never {
    this.throwError("setProgramId");
  }
  static getProgramId(): never {
    this.throwError("getProgramId");
  }
  static setCompanyProfile(): never {
    this.throwError("setCompanyProfile");
  }
  static getCompanyProfile(): never {
    this.throwError("getCompanyProfile");
  }
  static setTeamMembers(): never {
    this.throwError("setTeamMembers");
  }
  static getTeamMembers(): never {
    this.throwError("getTeamMembers");
  }
  static addTeamMember(): never {
    this.throwError("addTeamMember");
  }
  static setSessions(): never {
    this.throwError("setSessions");
  }
  static getSessions(): never {
    this.throwError("getSessions");
  }
  static addSession(): never {
    this.throwError("addSession");
  }
  static setMessages(): never {
    this.throwError("setMessages");
  }
  static getMessages(): never {
    this.throwError("getMessages");
  }
  static addMessage(): never {
    this.throwError("addMessage");
  }
  static setDashboardPreferences(): never {
    this.throwError("setDashboardPreferences");
  }
  static getDashboardPreferences(): never {
    this.throwError("getDashboardPreferences");
  }
  static setAnalyticsData(): never {
    this.throwError("setAnalyticsData");
  }
  static getAnalyticsData(): never {
    this.throwError("getAnalyticsData");
  }
  static setMatchScores(): never {
    this.throwError("setMatchScores");
  }
  static getMatchScores(): never {
    this.throwError("getMatchScores");
  }
  static setOnboardingProgress(): never {
    this.throwError("setOnboardingProgress");
  }
  static getOnboardingProgress(): never {
    this.throwError("getOnboardingProgress");
  }
  static clearOnboardingProgress(): never {
    this.throwError("clearOnboardingProgress");
  }
  static setAppPreferences(): never {
    this.throwError("setAppPreferences");
  }
  static getAppPreferences(): never {
    this.throwError("getAppPreferences");
  }
  static setFeatureFlags(): never {
    this.throwError("setFeatureFlags");
  }
  static getFeatureFlags(): never {
    this.throwError("getFeatureFlags");
  }
  static getItem(): never {
    this.throwError("getItem");
  }
  static setItem(): never {
    this.throwError("setItem");
  }
  static removeItem(): never {
    this.throwError("removeItem");
  }
  static clearAllData(): never {
    this.throwError("clearAllData");
  }
  static exportData(): never {
    this.throwError("exportData");
  }
  static importData(): never {
    this.throwError("importData");
  }
  static migrateOldData(): never {
    this.throwError("migrateOldData");
  }
}

export default LocalStorageService;
