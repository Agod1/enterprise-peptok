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
  // Daniel Hayes - Coach (98% aligned with Sales and Marketing Development program)
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
    bio: "Expert sales and marketing coach specializing in pipeline conversion and customer segmentation. Proven track record of improving sales performance through tailored solutions and strategic negotiation techniques.",
    skills: [
      "Marketing",
      "Sales Funnel Optimization",
      "Persuasion and Negotiation",
      "Customer Segmentation",
    ],
    experience: 12,
    rating: 4.95,
    totalRatings: 198,
    hourlyRate: 250,
    joinedAt: "2024-01-10T00:00:00Z",
    lastActive: "2024-03-15T18:00:00Z",
    status: "active",
  },
  // Additional Coaches (varying alignment with sales/marketing program)
  {
    id: "user_003",
    email: "coach.rivera@consulting.com",
    password: "coach123",
    name: "Maria Rivera",
    firstName: "Maria",
    lastName: "Rivera",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria-rivera",
    provider: "email",
    bio: "Leadership development coach with expertise in team building and organizational change.",
    skills: [
      "Leadership Development",
      "Team Building",
      "Change Management",
      "Communication Skills",
    ],
    experience: 9,
    rating: 4.7,
    totalRatings: 85,
    hourlyRate: 180,
    joinedAt: "2024-02-01T00:00:00Z",
    lastActive: "2024-03-15T17:30:00Z",
    status: "active",
  },
  {
    id: "user_004",
    email: "thompson.coach@business.com",
    password: "coach123",
    name: "James Thompson",
    firstName: "James",
    lastName: "Thompson",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=james-thompson",
    provider: "email",
    bio: "Sales performance specialist focusing on negotiation tactics and closing techniques.",
    skills: [
      "Sales Training",
      "Negotiation",
      "Customer Relations",
      "Performance Coaching",
    ],
    experience: 15,
    rating: 4.8,
    totalRatings: 142,
    hourlyRate: 220,
    joinedAt: "2024-01-25T00:00:00Z",
    lastActive: "2024-03-15T16:45:00Z",
    status: "active",
  },
  {
    id: "user_005",
    email: "coach.chen@digital.com",
    password: "coach123",
    name: "Lily Chen",
    firstName: "Lily",
    lastName: "Chen",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=lily-chen",
    provider: "email",
    bio: "Digital marketing strategist and content creation expert for modern businesses.",
    skills: [
      "Digital Marketing",
      "Content Strategy",
      "Social Media Marketing",
      "Brand Development",
    ],
    experience: 7,
    rating: 4.6,
    totalRatings: 73,
    hourlyRate: 165,
    joinedAt: "2024-02-15T00:00:00Z",
    lastActive: "2024-03-15T19:00:00Z",
    status: "active",
  },
  {
    id: "user_006",
    email: "coach.williams@executive.com",
    password: "coach123",
    name: "Robert Williams",
    firstName: "Robert",
    lastName: "Williams",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert-williams",
    provider: "email",
    bio: "Executive coach specializing in strategic thinking and high-level decision making.",
    skills: [
      "Executive Coaching",
      "Strategic Planning",
      "Decision Making",
      "Executive Presence",
    ],
    experience: 20,
    rating: 4.9,
    totalRatings: 156,
    hourlyRate: 300,
    joinedAt: "2024-01-05T00:00:00Z",
    lastActive: "2024-03-15T15:30:00Z",
    status: "active",
  },
  {
    id: "user_007",
    email: "coach.davis@sales.com",
    password: "coach123",
    name: "Ashley Davis",
    firstName: "Ashley",
    lastName: "Davis",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=ashley-davis",
    provider: "email",
    bio: "B2B sales coach with expertise in lead generation and customer acquisition strategies.",
    skills: [
      "B2B Sales",
      "Lead Generation",
      "Customer Acquisition",
      "Sales Process Optimization",
    ],
    experience: 11,
    rating: 4.75,
    totalRatings: 98,
    hourlyRate: 195,
    joinedAt: "2024-02-08T00:00:00Z",
    lastActive: "2024-03-15T18:15:00Z",
    status: "active",
  },
  {
    id: "user_008",
    email: "coach.martinez@tech.com",
    password: "coach123",
    name: "Carlos Martinez",
    firstName: "Carlos",
    lastName: "Martinez",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos-martinez",
    provider: "email",
    bio: "Technology industry coach focusing on agile methodologies and team productivity.",
    skills: [
      "Agile Coaching",
      "Team Productivity",
      "Project Management",
      "Technical Leadership",
    ],
    experience: 13,
    rating: 4.65,
    totalRatings: 107,
    hourlyRate: 210,
    joinedAt: "2024-01-30T00:00:00Z",
    lastActive: "2024-03-15T17:00:00Z",
    status: "active",
  },
  {
    id: "user_009",
    email: "coach.brown@communication.com",
    password: "coach123",
    name: "Jessica Brown",
    firstName: "Jessica",
    lastName: "Brown",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica-brown",
    provider: "email",
    bio: "Communication and presentation skills coach for professional development.",
    skills: [
      "Public Speaking",
      "Presentation Skills",
      "Communication Training",
      "Confidence Building",
    ],
    experience: 8,
    rating: 4.7,
    totalRatings: 89,
    hourlyRate: 175,
    joinedAt: "2024-02-20T00:00:00Z",
    lastActive: "2024-03-15T16:20:00Z",
    status: "active",
  },
  {
    id: "user_010",
    email: "coach.wilson@finance.com",
    password: "coach123",
    name: "Michael Wilson",
    firstName: "Michael",
    lastName: "Wilson",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-wilson",
    provider: "email",
    bio: "Financial planning and business analytics coach for data-driven decision making.",
    skills: [
      "Financial Planning",
      "Business Analytics",
      "Data Analysis",
      "Budget Management",
    ],
    experience: 14,
    rating: 4.8,
    totalRatings: 123,
    hourlyRate: 230,
    joinedAt: "2024-01-18T00:00:00Z",
    lastActive: "2024-03-15T14:45:00Z",
    status: "active",
  },
  {
    id: "user_011",
    email: "coach.taylor@hr.com",
    password: "coach123",
    name: "Emma Taylor",
    firstName: "Emma",
    lastName: "Taylor",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma-taylor",
    provider: "email",
    bio: "HR development coach specializing in employee engagement and talent retention.",
    skills: [
      "HR Development",
      "Employee Engagement",
      "Talent Retention",
      "Performance Management",
    ],
    experience: 10,
    rating: 4.6,
    totalRatings: 76,
    hourlyRate: 185,
    joinedAt: "2024-02-12T00:00:00Z",
    lastActive: "2024-03-15T18:30:00Z",
    status: "active",
  },
  {
    id: "user_012",
    email: "coach.anderson@operations.com",
    password: "coach123",
    name: "David Anderson",
    firstName: "David",
    lastName: "Anderson",
    userType: "coach",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=david-anderson",
    provider: "email",
    bio: "Operations efficiency coach helping organizations streamline processes and reduce waste.",
    skills: [
      "Process Optimization",
      "Operations Management",
      "Lean Manufacturing",
      "Quality Improvement",
    ],
    experience: 16,
    rating: 4.85,
    totalRatings: 134,
    hourlyRate: 245,
    joinedAt: "2024-01-12T00:00:00Z",
    lastActive: "2024-03-15T15:15:00Z",
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

// Get demo login credentials for Login component
export const getDemoLoginCredentials = () => {
  return demoUsers.map((user) => ({
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    userType: user.userType,
    companyId: user.companyId,
    status: user.status,
  }));
};

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
