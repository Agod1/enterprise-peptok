import * as React from "react";

// Lazy load the AuthProvider to avoid React initialization issues
const LazyAuthProvider = React.lazy(async () => {
  try {
    const { AuthProvider } = await import("@/contexts/AuthContext");
    return {
      default: ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    };
  } catch (error) {
    console.warn("Failed to load AuthProvider, using fallback", error);
    // Fallback component that just renders children
    return {
      default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
  }
});

export const SafeAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyAuthProvider>{children}</LazyAuthProvider>
    </React.Suspense>
  );
};
