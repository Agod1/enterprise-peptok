import React from "react";
// import { Toaster } from "@/components/ui/toaster"; // Temporarily disabled due to React hook error
// import { Toaster as Sonner } from "@/components/ui/sonner"; // Temporarily disabled due to React hook error
// import { TooltipProvider } from "@/components/ui/tooltip"; // Temporarily disabled due to React hook error
import { Routes, Route } from "react-router-dom";
import { RouterWrapper } from "@/components/core/RouterWrapper";
import { SafeAuthWrapper } from "@/components/core/SafeAuthWrapper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardRouter from "@/components/auth/DashboardRouter";
// import OfflineIndicator from "@/components/common/OfflineIndicator"; // Temporarily disabled due to React hook error
// import DatabaseSyncMonitor from "@/components/common/DatabaseSyncMonitor"; // Temporarily disabled due to React hook error
// import DatabaseStatusIndicator from "@/components/common/DatabaseStatusIndicator"; // Temporarily disabled due to React hook error
// import LocalStorageEliminationIndicator from "@/components/common/LocalStorageEliminationIndicator"; // Temporarily disabled due to React hook error
// import { PageValidator } from "@/components/common/PageValidator"; // Temporarily disabled due to React hook error
import { QuickNav } from "@/components/common/QuickNav";
import {
  SimpleNotification,
  useNotifications,
} from "@/components/common/SimpleNotification";

// Import all page components
import SafeIndex from "@/pages/SafeIndex";
// import Index from "@/pages/Index"; // Temporarily disabled due to React hook issues
import Pricing from "@/pages/Pricing";
import CoachDirectory from "@/pages/CoachDirectory";
import EnterpriseDashboard from "@/pages/EnterpriseDashboard";
import CompanyDashboard from "@/pages/CompanyDashboard";
import CompanyDashboardEnhanced from "@/pages/CompanyDashboardEnhanced";
import CoachProfile from "@/pages/CoachProfile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import BusinessOnboarding from "@/pages/onboarding/BusinessOnboarding";
import CoachOnboarding from "@/pages/onboarding/CoachOnboarding";
import TeamMemberDashboard from "@/pages/TeamMemberDashboard";
import VideoConference from "@/components/sessions/VideoConference";
import Messages from "@/pages/Messages";
import CreateMentorshipRequest from "@/pages/mentorship/CreateMentorshipRequest";
import MentorshipRequestDetails from "@/pages/mentorship/MentorshipRequestDetails";
import { CoachMatching } from "@/pages/coach/CoachMatching";
import { CoachDashboard } from "@/pages/coach/CoachDashboard";
import CoachSettings from "@/pages/coach/CoachSettings";
import InvitationAccept from "@/pages/InvitationAccept";
import TestPermissions from "@/pages/TestPermissions";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import PricingConfig from "@/pages/admin/PricingConfig";
import PlatformSettings from "@/pages/admin/PlatformSettings";
import AnalyticsSettings from "@/pages/admin/AnalyticsSettings";
import MatchingSettings from "@/pages/admin/MatchingSettings";
import EmailSettings from "@/pages/admin/EmailSettings";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import PendingInvitations from "@/pages/PendingInvitations";
import Connections from "@/pages/Connections";
import ConnectionDetails from "@/pages/ConnectionDetails";
import NotFound from "@/pages/NotFound";
import PlatformAdminDashboard from "@/pages/PlatformAdminDashboard";
import EmployeeDashboard from "@/pages/EmployeeDashboard";

const NotificationDisplay: React.FC = () => {
  const { notifications, remove } = useNotifications();

  return (
    <>
      {notifications.map((notification) => (
        <SimpleNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => remove(notification.id)}
        />
      ))}
    </>
  );
};

export const FullApp: React.FC = () => {
  return (
    <>
      <NotificationDisplay />
      <RouterWrapper>
        <SafeAuthWrapper>
          <Routes>
            <Route path="/" element={<SafeIndex />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/coaches" element={<CoachDirectory />} />
            <Route path="/coaches/:id" element={<CoachProfile />} />

            {/* Auto-route authenticated users to their dashboard */}
            <Route path="/app" element={<DashboardRouter />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredUserType="company_admin">
                  <EnterpriseDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/dashboard"
              element={
                <ProtectedRoute requiredUserType="company_admin">
                  <CompanyDashboardEnhanced />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/dashboard/basic"
              element={
                <ProtectedRoute requiredUserType="company_admin">
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee-dashboard"
              element={
                <ProtectedRoute requiredUserType="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/team-member-dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["platform_admin", "company_admin", "coach"]}
                >
                  <TeamMemberDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/business"
              element={
                <ProtectedRoute requiredUserType="company_admin">
                  <BusinessOnboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/onboarding/coach"
              element={
                <ProtectedRoute requiredUserType="coach">
                  <CoachOnboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video-conference/:sessionId"
              element={
                <ProtectedRoute>
                  <VideoConference />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages/:conversationId?"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentorship/new"
              element={
                <ProtectedRoute
                  allowedRoles={["platform_admin", "company_admin"]}
                >
                  <CreateMentorshipRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentorship/requests/:id"
              element={
                <ProtectedRoute>
                  <MentorshipRequestDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentorship/matching"
              element={
                <ProtectedRoute
                  allowedRoles={["platform_admin", "company_admin"]}
                >
                  <CoachMatching />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach/dashboard"
              element={
                <ProtectedRoute allowedRoles={["coach"]}>
                  <CoachDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach/settings"
              element={
                <ProtectedRoute allowedRoles={["coach"]}>
                  <CoachSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invitations/accept/:token"
              element={<InvitationAccept />}
            />
            <Route path="/test-permissions" element={<TestPermissions />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin/pricing-config" element={<PricingConfig />} />
            <Route
              path="/admin/security-settings"
              element={
                <ProtectedRoute requiredUserType="platform_admin">
                  <PlatformSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics-settings"
              element={
                <ProtectedRoute requiredUserType="platform_admin">
                  <AnalyticsSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/matching-settings"
              element={
                <ProtectedRoute requiredUserType="platform_admin">
                  <MatchingSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/email-settings"
              element={
                <ProtectedRoute requiredUserType="platform_admin">
                  <EmailSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute
                  allowedRoles={["platform_admin", "company_admin", "coach"]}
                >
                  <AnalyticsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/platform-admin"
              element={
                <ProtectedRoute requiredUserType="platform_admin">
                  <PlatformAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending-invitations"
              element={
                <ProtectedRoute
                  allowedRoles={["platform_admin", "company_admin"]}
                >
                  <PendingInvitations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />
            <Route
              path="/connections/:id"
              element={
                <ProtectedRoute>
                  <ConnectionDetails />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Development Quick Navigation */}
          <QuickNav />
        </SafeAuthWrapper>
      </RouterWrapper>
    </>
  );
};
