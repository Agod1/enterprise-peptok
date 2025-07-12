import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon-only";
}

const Logo = ({ className, size = "md", variant = "full" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src="/peptok-logo.png"
        alt="Peptok"
        className={cn("w-auto", sizeClasses[size])}
      />
    </div>
  );
};

export default Logo;
