import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Basic components that don't use complex hooks
const BasicIndex = () => (
  <div style={{ padding: "20px" }}>
    <h1>Peptok Platform</h1>
    <p>Welcome to the Peptok coaching platform.</p>
    <div>
      <a href="/login" style={{ marginRight: "10px" }}>
        Login
      </a>
      <a href="/signup" style={{ marginRight: "10px" }}>
        Sign Up
      </a>
      <a href="/admin/matching-settings">Admin: Matching Settings</a>
    </div>
  </div>
);

const BasicLogin = () => (
  <div style={{ padding: "20px" }}>
    <h1>Login</h1>
    <p>Login functionality will be loaded when React is fully ready.</p>
    <a href="/">← Back to Home</a>
  </div>
);

const BasicSignup = () => (
  <div style={{ padding: "20px" }}>
    <h1>Sign Up</h1>
    <p>Sign up functionality will be loaded when React is fully ready.</p>
    <a href="/">← Back to Home</a>
  </div>
);

const BasicMatchingSettings = () => (
  <div style={{ padding: "20px" }}>
    <h1>Matching Algorithm Settings</h1>
    <p>Matching settings will be loaded when React is fully ready.</p>
    <a href="/">← Back to Home</a>
  </div>
);

export const AppShell: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicIndex />} />
        <Route path="/login" element={<BasicLogin />} />
        <Route path="/signup" element={<BasicSignup />} />
        <Route
          path="/admin/matching-settings"
          element={<BasicMatchingSettings />}
        />
        <Route
          path="*"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Page Not Found</h1>
              <a href="/">← Back to Home</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
