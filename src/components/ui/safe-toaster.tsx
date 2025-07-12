import * as React from "react";

// Lazy load the Toaster to avoid React initialization issues
const LazyToaster = React.lazy(async () => {
  try {
    const { Toaster } = await import("@/components/ui/toaster");
    return {
      default: () => <Toaster />,
    };
  } catch (error) {
    console.warn("Failed to load Toaster, using fallback", error);
    // Fallback component that renders nothing
    return {
      default: () => null,
    };
  }
});

export const SafeToaster: React.FC = () => {
  return (
    <React.Suspense fallback={null}>
      <LazyToaster />
    </React.Suspense>
  );
};
