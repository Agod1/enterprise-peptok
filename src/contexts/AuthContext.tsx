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

// Create AuthContext with safety check
const AuthContext =
  typeof React !== "undefined" && React.createContext
    ? createContext<AuthContextType | undefined>(undefined)
    : null;

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use normal React hooks - the previous safety checks were causing issues
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  try {
    React.useEffect(() => {
      const initializeAuth = () => {
        try {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
          setCurrentUser(currentUser);

          if (currentUser) {
            analytics.setUser(currentUser.id, currentUser.userType, {
              email: currentUser.email,
              name: currentUser.name,
            });
          }
        } catch (error) {
          console.error("Failed to initialize auth:", error);
        } finally {
          setIsLoading(false);
        }
      };

      initializeAuth();
    }, []);
  } catch (error) {
    console.error("🚨 Failed to initialize useEffect in AuthProvider:", error);
    // Initialize auth synchronously as fallback
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setCurrentUser(currentUser);
      setIsLoading(false);
    } catch (authError) {
      console.error("Failed to initialize auth synchronously:", authError);
      setIsLoading(false);
    }
  }

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
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      setCurrentUser(null);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    updateUser,
  };

  if (!AuthContext) {
    console.warn("AuthContext not available, rendering children directly");
    return <>{children}</>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  // Comprehensive React hooks availability check
  const isReactAvailable =
    typeof React !== "undefined" &&
    React &&
    typeof React.useContext === "function";

  if (!isReactAvailable) {
    console.warn("🚨 React useContext not available, returning mock auth");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({ success: false, error: "Auth not available" }),
      logout: async () => {},
      updateUser: () => {},
    };
  }

  if (!AuthContext) {
    console.warn("🚨 AuthContext not available");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({
        success: false,
        error: "Auth context not available",
      }),
      logout: async () => {},
      updateUser: () => {},
    };
  }

  try {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      console.warn(
        "🚨 useAuth called outside of AuthProvider, returning mock auth",
      );
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: async () => ({
          success: false,
          error: "useAuth must be used within an AuthProvider",
        }),
        logout: async () => {},
        updateUser: () => {},
      };
    }
    return context;
  } catch (error) {
    console.error("🚨 Failed to use AuthContext:", error);
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({
        success: false,
        error: "Failed to access auth context",
      }),
      logout: async () => {},
      updateUser: () => {},
    };
  }
}

export default AuthContext;
