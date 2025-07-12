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
      // More thorough React readiness check
      const hasReact = typeof React !== "undefined" && React !== null;
      const hasWindow = typeof window !== "undefined";

      // Check if React hooks are properly initialized (not null)
      let hooksReady = false;
      if (hasReact) {
        try {
          // Test if accessing React hooks doesn't throw and they're not null
          const useStateRef = React.useState;
          const useEffectRef = React.useEffect;
          const useContextRef = React.useContext;

          hooksReady =
            useStateRef !== null &&
            useEffectRef !== null &&
            useContextRef !== null &&
            typeof useStateRef === "function" &&
            typeof useEffectRef === "function" &&
            typeof useContextRef === "function";
        } catch (hookError) {
          console.log("❌ React hooks not accessible:", hookError);
          hooksReady = false;
        }
      }

      if (hasReact && hasWindow && hooksReady) {
        console.log("✅ React and hooks fully ready, initializing components");
        this.isReady = true;
        this.setState({ reactReady: true });
      } else {
        console.log("⏳ React not fully ready, retrying...", {
          hasReact,
          hasWindow,
          hooksReady,
        });
        this.retryTimer = setTimeout(this.checkReactReady, 150);
      }
    } catch (error) {
      console.log("❌ React check error, retrying:", error);
      this.retryTimer = setTimeout(this.checkReactReady, 150);
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
