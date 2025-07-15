import { toast } from "sonner";
import { User } from "../types";

// OAuth Configuration
const OAUTH_CONFIG = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "demo-google-client-id",
    redirectUri: `${window.location.origin}/auth/callback/google`,
    scope: "openid email profile",
    responseType: "code",
    authUrl: "https://accounts.google.com/oauth/authorize",
  },
  microsoft: {
    clientId:
      import.meta.env.VITE_MICROSOFT_CLIENT_ID || "demo-microsoft-client-id",
    redirectUri: `${window.location.origin}/auth/callback/microsoft`,
    scope: "openid email profile",
    responseType: "code",
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  },
};

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  isNewUser?: boolean;
}

// API Configuration for backend authentication
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3001";

class AuthService {
  private currentUser: User | null = null;

  // Initialize auth service - no localStorage usage
  constructor() {
    // No automatic user loading from localStorage
    console.log("🔐 Auth service initialized - backend-only mode");
  }

  // Verify backend authentication status
  private async verifyBackendAuth(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          ...data.user,
          isAuthenticated: true,
          token,
        };
      }
    } catch (error) {
      console.error("❌ Backend auth verification failed:", error);
    }
    return null;
  }

  // Save user session in memory only (no localStorage)
  private async saveUserToMemory(user: User, token: string) {
    try {
      console.log(
        `💾 Saving user to memory (backend-only mode): ${user.email} (${user.userType})`,
      );

      this.currentUser = {
        ...user,
        isAuthenticated: true,
        token,
      };

      console.log(`✅ User saved successfully to memory (backend-only mode)`);
    } catch (error) {
      console.error("❌ Failed to save user to memory:", error);
      throw error;
    }
  }

  // Clear authentication data from memory only
  private async clearAuth() {
    try {
      this.currentUser = null;
      console.log(
        "🧹 Authentication data cleared from memory (backend-only mode)",
      );
    } catch (error) {
      console.error("❌ Failed to clear auth from memory:", error);
      this.currentUser = null;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Backend service availability check
  async checkBackendAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      console.error("❌ Backend service unavailable:", error);
      return false;
    }
  }

  // Check if user is authenticated - backend only
  async isAuthenticated(): Promise<boolean> {
    if (this.currentUser?.token) {
      // Verify with backend service
      const user = await this.verifyBackendAuth(this.currentUser.token);
      return user !== null;
    }
    return false;
  }

  // Email/Password Login - Backend Only
  async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log(`🔐 Backend-only login attempt for email: ${email}`);

      // Check backend availability first
      const isBackendAvailable = await this.checkBackendAvailability();
      if (!isBackendAvailable) {
        return {
          success: false,
          error:
            "Backend service is currently unavailable. Please try again later or contact support.",
        };
      }

      // Backend authentication only
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          ...data.user,
          isAuthenticated: true,
          token: data.access_token,
        };

        console.log(
          `✅ Backend login successful for "${email}", user type: ${user.userType}`,
        );

        // Save authentication in memory only
        await this.saveUserToMemory(user, data.access_token);

        return {
          success: true,
          user,
          token: data.access_token,
        };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Invalid credentials" }));

        console.log(
          `❌ Backend login failed for "${email}": ${errorData.message}`,
        );

        return {
          success: false,
          error: errorData.message || "Invalid email or password.",
        };
      }
    } catch (error) {
      console.error(`💥 Login error for ${email}:`, error);
      return {
        success: false,
        error:
          "Login failed. Backend service might be unavailable. Please contact support.",
      };
    }
  }

  // Email/Password Signup - Backend Only
  async signupWithEmail(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company?: string;
    role?: string;
    userType: "company_admin" | "coach";
    businessDetails?: {
      companyName: string;
      industry: string;
      employeeCount: number;
      website?: string;
      phone?: string;
    };
  }): Promise<AuthResponse> {
    try {
      console.log(
        `🔐 Backend-only signup attempt for email: ${userData.email}`,
      );

      // Check backend availability first
      const isBackendAvailable = await this.checkBackendAvailability();
      if (!isBackendAvailable) {
        return {
          success: false,
          error:
            "Backend service is currently unavailable. Please try again later or contact support.",
        };
      }

      // Backend signup only
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          userType: userData.userType,
          businessDetails: userData.businessDetails,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          ...data.user,
          isAuthenticated: true,
          token: data.access_token,
          isNewUser: true,
        };

        console.log(
          `✅ Backend signup successful for "${userData.email}", user type: ${user.userType}`,
        );

        // Save authentication in memory only
        await this.saveUserToMemory(user, data.access_token);

        return {
          success: true,
          user,
          token: data.access_token,
          isNewUser: true,
        };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Signup failed" }));

        console.log(
          `❌ Backend signup failed for "${userData.email}": ${errorData.message}`,
        );

        return {
          success: false,
          error: errorData.message || "Signup failed. Please try again.",
        };
      }
    } catch (error) {
      console.error(`💥 Signup error for ${userData.email}:`, error);
      return {
        success: false,
        error:
          "Signup failed. Backend service might be unavailable. Please contact support.",
      };
    }
  }

  // Google OAuth Login - Backend Only
  async loginWithGoogle(): Promise<void> {
    try {
      // Check backend availability first
      const isBackendAvailable = await this.checkBackendAvailability();
      if (!isBackendAvailable) {
        toast.error(
          "Backend service is currently unavailable. Please try email login or contact support.",
        );
        return;
      }

      // Use backend OAuth flow only
      const params = new URLSearchParams({
        client_id: OAUTH_CONFIG.google.clientId,
        redirect_uri: OAUTH_CONFIG.google.redirectUri,
        scope: OAUTH_CONFIG.google.scope,
        response_type: OAUTH_CONFIG.google.responseType,
        state: this.generateState(),
      });

      // Redirect to Google OAuth (backend will handle state validation)
      window.location.href = `${OAUTH_CONFIG.google.authUrl}?${params.toString()}`;
    } catch (error) {
      console.error("Google OAuth error:", error);
      toast.error(
        "Backend service unavailable. Please try email login or contact support.",
      );
    }
  }

  // Microsoft OAuth Login - Backend Only
  async loginWithMicrosoft(): Promise<void> {
    try {
      // Check backend availability first
      const isBackendAvailable = await this.checkBackendAvailability();
      if (!isBackendAvailable) {
        toast.error(
          "Backend service is currently unavailable. Please try email login or contact support.",
        );
        return;
      }

      // Use backend OAuth flow only
      const params = new URLSearchParams({
        client_id: OAUTH_CONFIG.microsoft.clientId,
        redirect_uri: OAUTH_CONFIG.microsoft.redirectUri,
        scope: OAUTH_CONFIG.microsoft.scope,
        response_type: OAUTH_CONFIG.microsoft.responseType,
        state: this.generateState(),
      });

      // Redirect to Microsoft OAuth (backend will handle state validation)
      window.location.href = `${OAUTH_CONFIG.microsoft.authUrl}?${params.toString()}`;
    } catch (error) {
      console.error("Microsoft OAuth error:", error);
      toast.error(
        "Backend service unavailable. Please try email login or contact support.",
      );
    }
  }

  // Handle OAuth callback - Backend Only
  async handleOAuthCallback(
    provider: string,
    code: string,
    state: string,
  ): Promise<AuthResponse> {
    try {
      // Check backend availability first
      const isBackendAvailable = await this.checkBackendAvailability();
      if (!isBackendAvailable) {
        return {
          success: false,
          error: "Backend service is currently unavailable.",
        };
      }

      // Exchange code for token with backend
      const response = await fetch(`${API_BASE_URL}/auth/oauth/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, code, state }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          ...data.user,
          isAuthenticated: true,
          token: data.access_token,
        };

        // Save authentication in memory only
        await this.saveUserToMemory(user, data.access_token);

        return {
          success: true,
          user,
          token: data.access_token,
        };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "OAuth callback failed" }));

        return {
          success: false,
          error: errorData.message || "OAuth authentication failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "OAuth callback failed. Backend service might be unavailable.",
      };
    }
  }

  // Generate random state for OAuth
  private generateState(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Logout - Backend Only
  async logout(): Promise<void> {
    try {
      // Invalidate token on backend if user is authenticated
      if (this.currentUser?.token) {
        try {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.currentUser.token}`,
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.warn(
            "Backend logout failed, clearing local session anyway:",
            error,
          );
        }
      }

      this.clearAuth();
      toast.success("Successfully signed out");

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear memory auth even if server call fails
      this.clearAuth();
      window.location.href = "/";
    }
  }

  // Get saved business details for onboarding from backend
  async getSavedBusinessDetails() {
    try {
      if (!this.currentUser?.token) {
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/users/business-details`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.currentUser.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.businessDetails || null;
      }
    } catch (error) {
      console.error("Failed to load business details from backend:", error);
    }
    return null;
  }

  // Clear saved business details after onboarding from backend
  async clearSavedBusinessDetails() {
    try {
      if (!this.currentUser?.token) {
        return;
      }

      await fetch(`${API_BASE_URL}/users/business-details`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.currentUser.token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to clear business details:", error);
    }
  }

  // Password reset (email) - Backend Only
  async resetPassword(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Check backend availability first
      const isBackendAvailable = await this.checkBackendAvailability();
      if (!isBackendAvailable) {
        return {
          success: false,
          message:
            "Backend service is currently unavailable. Please try again later or contact support.",
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return {
          success: true,
          message: "Password reset instructions sent to your email.",
        };
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Password reset failed" }));

        return {
          success: false,
          message:
            errorData.message || "No account found with this email address.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message:
          "Failed to send password reset email. Backend service might be unavailable.",
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export utility functions
export const isAuthenticated = () => authService.isAuthenticated();
export const getCurrentUser = () => authService.getCurrentUser();
export const logout = () => authService.logout();
