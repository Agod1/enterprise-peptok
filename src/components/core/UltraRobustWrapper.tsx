import React from "react";

interface UltraRobustWrapperProps {
  children: React.ReactNode;
}

// Simplified wrapper that just renders children immediately
export const UltraRobustWrapper: React.FC<UltraRobustWrapperProps> = ({
  children,
}) => {
  return <>{children}</>;
};
