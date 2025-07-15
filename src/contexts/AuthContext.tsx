import React, { createContext, useContext, useState, useEffect } from "react";
import { User, authService } from "@/services/auth";
import { setCurrentUser } from "@/services/apiEnhanced";
import { analytics } from "@/services/analytics";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use normal React hooks - the previous safety checks were causing issues
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state - backend-only mode
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("🔄 Initializing auth (backend-only mode)...");

        // No localStorage - only check if user is already in memory
        const currentUser = authService.getCurrentUser();

        if (currentUser) {
          // Verify with backend that token is still valid
          const isValid = await authService.isAuthenticated();

          if (isValid) {
            setUser(currentUser);
            setCurrentUser(currentUser);

            analytics.setUser(currentUser.id, currentUser.userType, {
              email: currentUser.email,
              name: currentUser.name,
            });

            console.log("✅ Valid user session found:", {
              id: currentUser.id,
              email: currentUser.email,
              userType: currentUser.userType,
              companyId: currentUser.companyId,
            });
          } else {
            console.log("⚠️ Invalid session - user logged out");
            setUser(null);
            setCurrentUser(null);
          }
        } else {
          console.log("ℹ️ No user session found (backend-only mode)");
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setUser(null);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.loginWithEmail(email, password);
      if (response.success && response.user) {
        setUser(response.user);
        setCurrentUser(response.user);

        analytics.track("user_login", {
          userType: response.user.userType,
          loginMethod: "email",
        });

        console.log("✅ User logged in (backend-only mode):", {
          id: response.user.id,
          email: response.user.email,
          userType: response.user.userType,
        });

        return { success: true };
      } else {
        return { success: false, error: response.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setCurrentUser(null);

      console.log("✅ User logged out (backend-only mode)");
    } catch (error) {
      console.error("Logout error:", error);
      // Ensure cleanup even if auth service fails
      setUser(null);
      setCurrentUser(null);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentUser(updatedUser);

    console.log("✅ User data updated (backend-only mode):", {
      id: updatedUser.id,
      email: updatedUser.email,
      userType: updatedUser.userType,
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
