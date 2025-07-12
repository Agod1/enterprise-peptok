import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardRouter from "@/components/auth/DashboardRouter";
import { QuickNav } from "@/components/common/QuickNav";

// Import all page components
import Index from "@/pages/Index";
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
import CreateCoachingRequest from "@/pages/coaching/CreateCoachingRequest";
import MentorshipRequestDetails from "@/pages/mentorship/MentorshipRequestDetails";
import CoachingRequestDetails from "@/pages/coaching/CoachingRequestDetails";
import { CoachMatching } from "@/pages/coach/CoachMatching";
import { CoachDashboard } from "@/pages/coach/CoachDashboard";
import { CoachSettings } from "@/pages/coach/CoachSettings";
import Connections from "@/pages/Connections";
import ConnectionDetails from "@/pages/ConnectionDetails";
import ExpertDirectory from "@/pages/ExpertDirectory";
import ExpertProfile from "@/pages/ExpertProfile";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import PlatformAdminDashboard from "@/pages/PlatformAdminDashboard";
import PendingInvitations from "@/pages/PendingInvitations";
import PricingConfig from "@/pages/admin/PricingConfig";
import AnalyticsSettings from "@/pages/admin/AnalyticsSettings";
import MatchingSettings from "@/pages/admin/MatchingSettings";
import EmailSettings from "@/pages/admin/EmailSettings";
import PlatformSettings from "@/pages/admin/PlatformSettings";

export const FullApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
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
            <ProtectedRoute requiredUserType="team_member">
              <TeamMemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coach-dashboard"
          element={
            <ProtectedRoute requiredUserType="coach">
              <CoachDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coach-settings"
          element={
            <ProtectedRoute requiredUserType="coach">
              <CoachSettings />
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

        {/* Onboarding */}
        <Route path="/onboarding/business" element={<BusinessOnboarding />} />
        <Route path="/onboarding/coach" element={<CoachOnboarding />} />

        {/* Mentorship/Coaching */}
        <Route
          path="/mentorship/new"
          element={
            <ProtectedRoute requiredUserType="company_admin">
              <CreateMentorshipRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coaching/new"
          element={
            <ProtectedRoute requiredUserType="company_admin">
              <CreateCoachingRequest />
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
          path="/coaching/requests/:id"
          element={
            <ProtectedRoute>
              <CoachingRequestDetails />
            </ProtectedRoute>
          }
        />

        {/* Coach Matching */}
        <Route
          path="/coach/matching/:mentorshipRequestId"
          element={
            <ProtectedRoute requiredUserType="coach">
              <CoachMatching />
            </ProtectedRoute>
          }
        />

        {/* Connections */}
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

        {/* Directory */}
        <Route path="/experts" element={<ExpertDirectory />} />
        <Route path="/experts/:id" element={<ExpertProfile />} />

        {/* Video Conference */}
        <Route
          path="/session/:sessionId"
          element={
            <ProtectedRoute>
              <VideoConference />
            </ProtectedRoute>
          }
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Team Member Invitations */}
        <Route path="/invitations" element={<PendingInvitations />} />

        {/* Platform Admin Routes */}
        <Route
          path="/admin/pricing"
          element={
            <ProtectedRoute requiredUserType="platform_admin">
              <PricingConfig />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute requiredUserType="platform_admin">
              <AnalyticsSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/matching"
          element={
            <ProtectedRoute requiredUserType="platform_admin">
              <MatchingSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/email"
          element={
            <ProtectedRoute requiredUserType="platform_admin">
              <EmailSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/platform"
          element={
            <ProtectedRoute requiredUserType="platform_admin">
              <PlatformSettings />
            </ProtectedRoute>
          }
        />

        {/* Legal Pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Development Quick Navigation */}
      <QuickNav />
    </BrowserRouter>
  );
};
