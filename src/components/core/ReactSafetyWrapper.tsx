import React from "react";

interface ReactSafetyWrapperProps {
  children: React.ReactNode;
}

// Safety wrapper that ensures React is available before rendering children
export const ReactSafetyWrapper: React.FC<ReactSafetyWrapperProps> = ({
  children,
}) => {
  // Check if React and its hooks are available
  if (!React || !React.useState || !React.useEffect || !React.useContext) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
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
          <p style={{ color: "#6b7280", margin: 0 }}>Loading React...</p>
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
