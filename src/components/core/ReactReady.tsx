import * as React from "react";

interface ReactReadyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ReactReady: React.FC<ReactReadyProps> = ({
  children,
  fallback = <div>Initializing...</div>,
}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [loadFullApp, setLoadFullApp] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Test if React hooks are working properly
    try {
      const testRef = React.createRef();
      if (
        testRef &&
        typeof React.useState === "function" &&
        typeof React.useEffect === "function"
      ) {
        setIsReady(true);
        console.log("✅ React is ready and hooks are working");

        // Load the full app immediately after React is ready
        setLoadFullApp(true);
        console.log("✅ Loading full application features");
      } else {
        throw new Error("React hooks not available");
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Unknown React error";
      setError(errorMsg);
      console.error("❌ React initialization failed:", errorMsg);
    }
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          background: "#fee",
          border: "1px solid #fcc",
          borderRadius: "4px",
          margin: "20px",
        }}
      >
        <h3>React Initialization Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  if (!isReady) {
    return <>{fallback}</>;
  }

  // Progressive loading: start with basic app, then load full features
  if (!loadFullApp) {
    return <>{children}</>;
  }

  // Lazy load the full app
  const LazyFullApp = React.lazy(() =>
    import("./FullApp").then((module) => ({ default: module.FullApp })),
  );

  return (
    <React.Suspense fallback={<>{children}</>}>
      <LazyFullApp />
    </React.Suspense>
  );
};
