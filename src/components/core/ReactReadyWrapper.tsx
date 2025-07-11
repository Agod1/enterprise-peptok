import React from "react";

interface ReactReadyWrapperProps {
  children: React.ReactNode;
}

// Simple wrapper that ensures React hooks are available before rendering children
export class ReactReadyWrapper extends React.Component<ReactReadyWrapperProps> {
  private isReady = false;
  private retryTimer: NodeJS.Timeout | null = null;

  constructor(props: ReactReadyWrapperProps) {
    super(props);
    this.state = { reactReady: false };
  }

  componentDidMount() {
    this.checkReactReady();
  }

  componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  checkReactReady = () => {
    try {
      // Check if React hooks are available without calling them
      const hasReact = typeof React !== "undefined";
      const hasUseState = React && typeof React.useState === "function";
      const hasUseEffect = React && typeof React.useEffect === "function";

      if (hasReact && hasUseState && hasUseEffect) {
        console.log("✅ React hooks ready, initializing components");
        this.isReady = true;
        this.setState({ reactReady: true });
      } else {
        console.log("⏳ React hooks not ready, retrying...");
        this.retryTimer = setTimeout(this.checkReactReady, 100);
      }
    } catch (error) {
      console.log("❌ React check error, retrying:", error);
      this.retryTimer = setTimeout(this.checkReactReady, 100);
    }
  };

  render() {
    const { reactReady } = this.state as { reactReady: boolean };

    if (!reactReady) {
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

    return <>{this.props.children}</>;
  }
}
