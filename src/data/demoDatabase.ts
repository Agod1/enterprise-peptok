// This file contains only the requested accounts - all other data has been cleared
// Sarah Johnson (admin@techcorp.com) as admin of TechCorp Industries
// Daniel Hayes (coach@marketing.com) as coach

export interface DemoUser {
  id: string;
  email: string;
  password: string; // For demo purposes only
  name: string;
  firstName: string;
  lastName: string;
  userType: "platform_admin" | "company_admin" | "coach" | "team_member";
  companyId?: string;
  picture: string;
  provider: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  rating?: number;
  totalRatings?: number;
  hourlyRate?: number;
  joinedAt: string;
  lastActive: string;
  status: "active" | "suspended" | "inactive";
}

export interface DemoCompany {
  id: string;
  name: string;
  industry: string;
  size: string;
  adminId: string;
  employeeCount: number;
  activePrograms: number;
  totalSessions: number;
  subscriptionTier: string;
  joinedAt: string;
  status: "active" | "trial" | "suspended";
  revenue: number;
}

export interface DemoMentorshipRequest {
  id: string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  skills: string[];
  participants: number;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  assignedCoachId?: string;
  createdAt: string;
  updatedAt: string;
  teamMembers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
  goals: Array<{
    id: string;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }>;
}

export interface DemoSession {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  mentorName: string;
  participants: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
  scheduledAt: string;
  duration: number;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  type: "video" | "audio" | "chat" | "in-person";
  meetingLink?: string;
  recordingUrl?: string;
  earnings: number;
  currency: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
}

export interface DemoReview {
  id: string;
  sessionId: string;
  coachId: string;
  coachName: string;
  participantId: string;
  participantName: string;
  companyId: string;
  companyName: string;
  rating: number;
  review: string;
  reviewerName: string;
  createdAt: string;
}

// Clean Users Database - Only requested accounts
export const demoUsers: DemoUser[] = [
  // Sarah Johnson - Company Admin for TechCorp Industries
  {
    id: "user_001",
    email: "admin@techcorp.com",
    password: "admin123",
    name: "Sarah Johnson",
    firstName: "Sarah",
    lastName: "Johnson",
    userType: "company_admin",
    companyId: "comp_001",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-johnson",
    provider: "email",
    joinedAt: "2024-03-15T00:00:00Z",
    lastActive: "2024-03-15T18:00:00Z",
    status: "active",
  },
  // Daniel Hayes - Coach
  {
    id: "user_002",
    email: "coach@marketing.com",
    password: "coach123",
    name: "Daniel Hayes",
    firstName: "Daniel",
    lastName: "Hayes",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-hayes",
    provider: "email",
    bio: "Professional executive coach specializing in marketing strategy and leadership development.",
    skills: [
      "Marketing Strategy",
      "Leadership Development",
      "Team Building",
      "Executive Coaching",
    ],
    experience: 8,
    rating: 4.9,
    totalRatings: 127,
    hourlyRate: 200,
    joinedAt: "2024-03-15T00:00:00Z",
    lastActive: "2024-03-15T18:00:00Z",
    status: "active",
  },
];

// Clean Companies Database - Only TechCorp Industries for Sarah Johnson
export const demoCompanies: DemoCompany[] = [
  {
    id: "comp_001",
    name: "TechCorp Industries",
    industry: "Technology",
    size: "Medium (50-200 employees)",
    adminId: "user_001",
    employeeCount: 85,
    activePrograms: 0,
    totalSessions: 0,
    subscriptionTier: "Growth Plan",
    joinedAt: "2024-03-15T00:00:00Z",
    status: "active",
    revenue: 0,
  },
];

// Clean Mentorship Requests - Empty to start fresh
export const demoMentorshipRequests: DemoMentorshipRequest[] = [];

// Clean Sessions - Empty to start fresh
export const demoSessions: DemoSession[] = [];

// Clean Reviews - Empty to start fresh
export const demoReviews: DemoReview[] = [];

// Statistics based on clean data
export const getDemoStatistics = () => {
  const totalUsers = demoUsers.length;
  const totalCompanies = demoCompanies.length;
  const totalCoaches = demoUsers.filter((u) => u.userType === "coach").length;
  const totalSessions = demoSessions.length;
  const completedSessions = demoSessions.filter(
    (s) => s.status === "completed",
  ).length;
  const totalRevenue = demoSessions.reduce(
    (sum, session) => sum + session.earnings,
    0,
  );

  return {
    platformStats: {
      totalUsers,
      totalCompanies,
      totalCoaches,
      totalSessions,
      monthlyRevenue: totalRevenue,
      activeSubscriptions: demoCompanies.filter((c) => c.status === "active")
        .length,
    },
    userGrowth: [
      { month: "Jan", users: 0 },
      { month: "Feb", users: 0 },
      { month: "Mar", users: totalUsers },
    ],
    sessionActivity: [
      { month: "Jan", sessions: 0 },
      { month: "Feb", sessions: 0 },
      { month: "Mar", sessions: totalSessions },
    ],
    revenueData: [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
      { month: "Mar", revenue: totalRevenue },
    ],
  };
};
