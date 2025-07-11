import React from "react";

interface UltraRobustWrapperProps {
  children: React.ReactNode;
}

// Ultra-robust wrapper that ensures React is completely ready
export class UltraRobustWrapper extends React.Component<UltraRobustWrapperProps> {
  private mounted = false;
  private retryCount = 0;
  private maxRetries = 50; // 5 seconds max

  constructor(props: UltraRobustWrapperProps) {
    super(props);
    // Start with React not ready
    this.state = {
      reactReady: false,
      error: null,
    };
  }

  componentDidMount() {
    this.mounted = true;
    // Start checking after component is mounted
    setTimeout(this.checkReactReadiness, 200);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkReactReadiness = () => {
    if (!this.mounted) return;

    try {
      this.retryCount++;

      // Multiple layers of React readiness checks
      const basicReactCheck = typeof React !== "undefined" && React !== null;
      const windowCheck = typeof window !== "undefined";
      const documentCheck = typeof document !== "undefined";

      let hooksCheck = false;
      let contextCheck = false;

      if (basicReactCheck) {
        try {
          // Test hooks existence and non-null status
          const useState = React.useState;
          const useEffect = React.useEffect;
          const useContext = React.useContext;
          const createContext = React.createContext;

          hooksCheck =
            useState !== null &&
            useEffect !== null &&
            useContext !== null &&
            createContext !== null &&
            typeof useState === "function" &&
            typeof useEffect === "function" &&
            typeof useContext === "function" &&
            typeof createContext === "function";

          // Test if createContext actually works
          if (hooksCheck) {
            const testContext = createContext(null);
            contextCheck =
              testContext !== null && typeof testContext === "object";
          }
        } catch (hookError) {
          console.log("🔧 Hook test failed:", hookError);
          hooksCheck = false;
          contextCheck = false;
        }
      }

      const allReady =
        basicReactCheck &&
        windowCheck &&
        documentCheck &&
        hooksCheck &&
        contextCheck;

      if (allReady) {
        console.log("🎉 React ecosystem fully ready!");
        if (this.mounted) {
          this.setState({ reactReady: true, error: null });
        }
      } else if (this.retryCount >= this.maxRetries) {
        console.error(
          "⚠️ React readiness timeout after",
          this.maxRetries,
          "attempts",
        );
        if (this.mounted) {
          this.setState({
            reactReady: false,
            error: "React initialization timeout",
          });
        }
      } else {
        console.log(
          `🔄 React not ready (${this.retryCount}/${this.maxRetries}):`,
          {
            basicReactCheck,
            windowCheck,
            documentCheck,
            hooksCheck,
            contextCheck,
          },
        );
        setTimeout(this.checkReactReadiness, 100);
      }
    } catch (error) {
      console.error("❌ React readiness check failed:", error);
      if (this.retryCount < this.maxRetries) {
        setTimeout(this.checkReactReadiness, 100);
      } else {
        if (this.mounted) {
          this.setState({
            reactReady: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    }
  };

  render() {
    const { reactReady, error } = this.state as {
      reactReady: boolean;
      error: string | null;
    };

    if (error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#fef2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{ textAlign: "center", maxWidth: "400px", padding: "20px" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <h2 style={{ color: "#dc2626", margin: "0 0 16px 0" }}>
              React Initialization Error
            </h2>
            <p style={{ color: "#7f1d1d", margin: "0 0 16px 0" }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

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
                width: "40px",
                height: "40px",
                border: "4px solid #3b82f6",
                borderTop: "4px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            ></div>
            <p
              style={{
                color: "#6b7280",
                margin: "0 0 8px 0",
                fontSize: "16px",
              }}
            >
              Initializing React...
            </p>
            <p style={{ color: "#9ca3af", margin: 0, fontSize: "12px" }}>
              Attempt {this.retryCount} of {this.maxRetries}
            </p>
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
