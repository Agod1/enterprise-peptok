import * as React from "react";

// Lazy load the Sonner Toaster to avoid React initialization issues
const LazySonner = React.lazy(async () => {
  try {
    const { Toaster } = await import("@/components/ui/sonner");
    return {
      default: () => <Toaster />,
    };
  } catch (error) {
    console.warn("Failed to load Sonner, using fallback", error);
    // Fallback component that renders nothing
    return {
      default: () => null,
    };
  }
});

export const SafeSonner: React.FC = () => {
  return (
    <React.Suspense fallback={null}>
      <LazySonner />
    </React.Suspense>
  );
};
