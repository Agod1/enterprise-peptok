import * as React from "react";

// Lazy load the TooltipProvider to avoid React initialization issues
const LazyTooltipProvider = React.lazy(async () => {
  try {
    const { TooltipProvider } = await import("@/components/ui/tooltip");
    return {
      default: ({ children }: { children: React.ReactNode }) => (
        <TooltipProvider>{children}</TooltipProvider>
      ),
    };
  } catch (error) {
    console.warn("Failed to load TooltipProvider, using fallback", error);
    // Fallback component that just renders children
    return {
      default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
  }
});

export const SafeTooltipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <React.Suspense fallback={<>{children}</>}>
      <LazyTooltipProvider>{children}</LazyTooltipProvider>
    </React.Suspense>
  );
};
