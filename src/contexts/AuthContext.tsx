import React, { createContext, useContext, useEffect, useState } from "react";
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
  // Safety check for React hooks availability
  if (!React || !useState || !useEffect || !createContext) {
    console.warn("React hooks not available in AuthProvider, using fallback");
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #3b82f6",
              borderTop: "4px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p>Loading authentication...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
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
  // Safety check for React hooks availability
  if (!React || !useContext) {
    console.warn("React useContext not available, returning mock auth");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({ success: false, message: "Auth not available" }),
      logout: async () => {},
      updateUser: () => {},
    };
  }

  if (!AuthContext) {
    console.warn("AuthContext not available");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({
        success: false,
        message: "Auth context not available",
      }),
      logout: async () => {},
      updateUser: () => {},
    };
  }

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
