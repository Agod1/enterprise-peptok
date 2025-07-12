import React from "react";

interface SafeAuthWrapperProps {
  children: React.ReactNode;
}

export const SafeAuthWrapper: React.FC<SafeAuthWrapperProps> = ({
  children,
}) => {
  // Simple context that provides mock auth for development
  const [user] = React.useState({
    id: "admin-1",
    name: "Platform Admin",
    email: "admin@peptok.com",
    userType: "platform_admin" as const,
    companyId: "peptok-platform",
    status: "active" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Create a simple auth context value
  const authValue = React.useMemo(
    () => ({
      user,
      isAuthenticated: true,
      isLoading: false,
      login: async () => ({ success: true }),
      logout: async () => {},
      updateUser: () => {},
    }),
    [user],
  );

  // Create a simple auth context
  const AuthContext = React.createContext(authValue);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

// Export a hook to use this context
export const useSafeAuth = () => {
  const context = React.useContext(
    React.createContext({
      user: {
        id: "admin-1",
        name: "Platform Admin",
        email: "admin@peptok.com",
        userType: "platform_admin" as const,
        companyId: "peptok-platform",
        status: "active" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      isAuthenticated: true,
      isLoading: false,
      login: async () => ({ success: true }),
      logout: async () => {},
      updateUser: () => {},
    }),
  );

  return context;
};
