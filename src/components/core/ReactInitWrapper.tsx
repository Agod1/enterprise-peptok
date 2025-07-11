import React from "react";

interface ReactInitWrapperProps {
  children: React.ReactNode;
}

export const ReactInitWrapper: React.FC<ReactInitWrapperProps> = ({
  children,
}) => {
  const [isReactReady, setIsReactReady] = React.useState(false);

  React.useEffect(() => {
    // Ensure React is fully initialized
    const checkReactReady = () => {
      try {
        // Test if React hooks are available
        const testState = React.useState(true);
        const testContext = React.createContext(null);

        if (testState && testContext && React.useContext) {
          setIsReactReady(true);
        } else {
          // Retry after a short delay
          setTimeout(checkReactReady, 50);
        }
      } catch (error) {
        // React not ready, retry
        setTimeout(checkReactReady, 50);
      }
    };

    // Start checking with a small initial delay
    const timer = setTimeout(checkReactReady, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReactReady) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "4px solid #3b82f6",
              borderTop: "4px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <p style={{ color: "#6b7280", margin: 0 }}>Initializing React...</p>
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

  return <>{children}</>;
};
