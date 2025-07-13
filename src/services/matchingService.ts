import { apiEnhanced } from "./apiEnhanced";

export interface MatchingWeights {
  skillMatch: number;
  experience: number;
  rating: number;
  availability: number;
  price: number;
}

export interface MatchingRequest {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredExperience: string;
  budget: number;
  timeline: {
    startDate: string;
    endDate: string;
  };
  teamMembers: string[];
  goals: string[];
}

export interface CoachMatch {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  rating: number;
  availability: string;
  hourlyRate: number;
  profileImage?: string;
  bio: string;
  expertise: string[];
  yearsExperience: number;
  languages: string[];
  timezone: string;
  matchScore: number;
  matchReasons: string[];
  estimatedCost: number;
}

export interface MatchingResult {
  requestId: string;
  matches: CoachMatch[];
  algorithmVersion: string;
  configUsed: MatchingWeights;
  timestamp: string;
  totalMatches: number;
}

class MatchingService {
  private async getAlgorithmConfiguration(): Promise<MatchingWeights> {
    try {
      const response = await apiEnhanced.getMatchingConfiguration();
      if (response.success && response.data) {
        return response.data.weights;
      }
    } catch (error) {
      console.warn(
        "Failed to load algorithm configuration, using defaults:",
        error,
      );
    }

    // Default weights if admin configuration is not available
    return {
      skillMatch: 30,
      experience: 25,
      rating: 20,
      availability: 15,
      price: 10,
    };
  }

  private calculateMatchScore(
    coach: Omit<CoachMatch, "matchScore" | "matchReasons" | "estimatedCost">,
    request: MatchingRequest,
    weights: MatchingWeights,
  ): { score: number; reasons: string[] } {
    let totalScore = 0;
    const reasons: string[] = [];

    // 1. Skill Match Score
    const skillOverlap = coach.skills.filter((skill) =>
      request.requiredSkills.some(
        (reqSkill) =>
          skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(skill.toLowerCase()),
      ),
    );
    const skillScore = Math.min(
      skillOverlap.length / Math.max(request.requiredSkills.length, 1),
      1,
    );
    totalScore += skillScore * (weights.skillMatch / 100);

    if (skillScore > 0.7) {
      reasons.push(`Strong skill match (${Math.round(skillScore * 100)}%)`);
    }

    // 2. Experience Score
    const experienceMapping = {
      junior: 1,
      "mid-level": 2,
      senior: 3,
      expert: 4,
    };
    const coachExp =
      experienceMapping[coach.experience as keyof typeof experienceMapping] ||
      2;
    const reqExp =
      experienceMapping[
        request.preferredExperience as keyof typeof experienceMapping
      ] || 2;
    const experienceScore = Math.max(0, 1 - Math.abs(coachExp - reqExp) / 3);
    totalScore += experienceScore * (weights.experience / 100);

    if (experienceScore > 0.8) {
      reasons.push(`Perfect experience level match`);
    }

    // 3. Rating Score
    const ratingScore = Math.min(coach.rating / 5, 1);
    totalScore += ratingScore * (weights.rating / 100);

    if (coach.rating >= 4.5) {
      reasons.push(`Excellent rating (${coach.rating}/5)`);
    }

    // 4. Availability Score
    const availabilityScore =
      coach.availability === "immediate"
        ? 1
        : coach.availability === "this_week"
          ? 0.8
          : coach.availability === "next_week"
            ? 0.6
            : 0.4;
    totalScore += availabilityScore * (weights.availability / 100);

    if (availabilityScore >= 0.8) {
      reasons.push(`Quick availability`);
    }

    // 5. Price Score (inverse relationship - lower price = higher score)
    const maxBudget = request.budget || 200;
    const priceScore = Math.max(
      0,
      1 - Math.max(0, coach.hourlyRate - maxBudget) / maxBudget,
    );
    totalScore += priceScore * (weights.price / 100);

    if (coach.hourlyRate <= maxBudget * 0.8) {
      reasons.push(`Within budget ($${coach.hourlyRate}/hr)`);
    }

    return {
      score: Math.round(totalScore * 100) / 100,
      reasons: reasons.length > 0 ? reasons : ["Basic compatibility match"],
    };
  }

  private generateMockCoaches(): Omit<
    CoachMatch,
    "matchScore" | "matchReasons" | "estimatedCost"
  >[] {
    return [
      {
        id: "coach_1",
        name: "Sarah Wilson",
        title: "Senior Full-Stack Developer & Tech Lead",
        skills: [
          "JavaScript",
          "React",
          "Node.js",
          "TypeScript",
          "AWS",
          "Leadership",
        ],
        experience: "senior",
        rating: 4.9,
        availability: "immediate",
        hourlyRate: 120,
        profileImage:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1-3c?w=150",
        bio: "Experienced full-stack developer with 8+ years in building scalable web applications. Specialized in React ecosystem and team leadership.",
        expertise: [
          "Frontend Development",
          "Backend Development",
          "Team Leadership",
          "System Architecture",
        ],
        yearsExperience: 8,
        languages: ["English", "Spanish"],
        timezone: "PST",
      },
      {
        id: "coach_2",
        name: "Michael Chen",
        title: "React Specialist & UI/UX Expert",
        skills: ["React", "TypeScript", "CSS", "Design Systems", "GraphQL"],
        experience: "senior",
        rating: 4.7,
        availability: "this_week",
        hourlyRate: 135,
        profileImage:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        bio: "React specialist with expertise in creating beautiful, performant user interfaces. Strong background in design systems and user experience.",
        expertise: [
          "React Development",
          "UI/UX Design",
          "Performance Optimization",
          "Design Systems",
        ],
        yearsExperience: 6,
        languages: ["English", "Mandarin"],
        timezone: "EST",
      },
      {
        id: "coach_3",
        name: "Emma Rodriguez",
        title: "JavaScript Expert & Mentor",
        skills: ["JavaScript", "Vue.js", "Node.js", "MongoDB", "Testing"],
        experience: "mid-level",
        rating: 4.6,
        availability: "immediate",
        hourlyRate: 95,
        profileImage:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        bio: "Passionate JavaScript developer with expertise in Vue.js and Node.js. Strong focus on code quality and testing practices.",
        expertise: [
          "JavaScript Development",
          "Vue.js",
          "Backend Development",
          "Testing",
        ],
        yearsExperience: 5,
        languages: ["English", "Spanish", "Portuguese"],
        timezone: "CST",
      },
      {
        id: "coach_4",
        name: "David Kumar",
        title: "DevOps Engineer & Cloud Architect",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python", "Terraform"],
        experience: "expert",
        rating: 4.8,
        availability: "next_week",
        hourlyRate: 150,
        profileImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        bio: "DevOps expert specializing in cloud infrastructure and automation. Helps teams scale and improve their deployment processes.",
        expertise: [
          "DevOps",
          "Cloud Architecture",
          "Infrastructure",
          "Automation",
        ],
        yearsExperience: 10,
        languages: ["English", "Hindi"],
        timezone: "IST",
      },
      {
        id: "coach_5",
        name: "Lisa Thompson",
        title: "Product Manager & Agile Coach",
        skills: [
          "Product Management",
          "Agile",
          "Scrum",
          "User Research",
          "Analytics",
        ],
        experience: "senior",
        rating: 4.5,
        availability: "immediate",
        hourlyRate: 110,
        profileImage:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1-c?w=150",
        bio: "Experienced product manager with a strong background in agile methodologies and user-centered design. Helps teams build better products.",
        expertise: [
          "Product Management",
          "Agile Coaching",
          "User Research",
          "Strategy",
        ],
        yearsExperience: 7,
        languages: ["English"],
        timezone: "PST",
      },
      {
        id: "coach_6",
        name: "James Anderson",
        title: "Data Scientist & ML Engineer",
        skills: [
          "Python",
          "Machine Learning",
          "TensorFlow",
          "Data Analysis",
          "SQL",
        ],
        experience: "senior",
        rating: 4.7,
        availability: "this_week",
        hourlyRate: 140,
        profileImage:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        bio: "Data scientist with expertise in machine learning and data analysis. Helps teams implement AI solutions and data-driven decisions.",
        expertise: [
          "Data Science",
          "Machine Learning",
          "Analytics",
          "AI Strategy",
        ],
        yearsExperience: 9,
        languages: ["English"],
        timezone: "EST",
      },
    ];
  }

  private async getAvailableCoaches(): Promise<
    Omit<CoachMatch, "matchScore" | "matchReasons" | "estimatedCost">[]
  > {
    try {
      // Try to get real coaches from the platform
      const coaches = await apiEnhanced.getAllCoaches();

      if (coaches && coaches.length > 0) {
        // Transform platform coaches to matching format
        return coaches.map((coach: any) => ({
          id: coach.id,
          name: `${coach.firstName} ${coach.lastName}`,
          title: coach.title || "Professional Coach",
          skills: coach.skills || coach.coaching?.map((c: any) => c.name) || [],
          experience: this.mapExperienceLevel(
            coach.yearsExperience || coach.experience,
          ),
          rating: coach.metrics?.averageRating || coach.rating || 4.0,
          availability: coach.status === "active" ? "immediate" : "next_week",
          hourlyRate: coach.hourlyRate || 120,
          profileImage: coach.profilePicture || coach.avatar || "",
          bio:
            coach.bio ||
            "Experienced professional coach dedicated to helping individuals and teams achieve their goals.",
          expertise: coach.specializations || coach.expertise || [],
          yearsExperience: coach.yearsExperience || coach.experience || 3,
          languages: coach.languages || ["English"],
          timezone: coach.timezone || "EST",
        }));
      }
    } catch (error) {
      console.warn("Could not fetch real coaches, using mock data:", error);
    }

    // Fallback to mock coaches if real ones are not available
    const mockCoaches = this.generateMockCoaches();
    console.log("🤖 Using mock coaches for matching");
    return mockCoaches;
  }

  private mapExperienceLevel(years: number | string): string {
    if (typeof years === "string") return years;
    if (years < 2) return "junior";
    if (years < 5) return "mid-level";
    if (years < 10) return "senior";
    return "expert";
  }

  async findMatches(request: MatchingRequest): Promise<MatchingResult> {
    try {
      // Get current algorithm configuration from admin settings
      const weights = await this.getAlgorithmConfiguration();

      // Get available coaches from the platform
      const availableCoaches = await this.getAvailableCoaches();

      // Calculate match scores for each coach
      const matchedCoaches: CoachMatch[] = availableCoaches.map((coach) => {
        const { score, reasons } = this.calculateMatchScore(
          coach,
          request,
          weights,
        );

        // Calculate estimated cost based on timeline
        const startDate = new Date(request.timeline.startDate);
        const endDate = new Date(request.timeline.endDate);
        const weeks = Math.max(
          1,
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) /
              (1000 * 60 * 60 * 24 * 7),
          ),
        );
        const estimatedHours = weeks * 3; // Assuming 3 hours per week
        const estimatedCost = estimatedHours * coach.hourlyRate;

        return {
          ...coach,
          matchScore: score,
          matchReasons: reasons,
          estimatedCost,
        };
      });

      // Sort by match score (highest first) and limit to top 10
      const sortedMatches = matchedCoaches
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10);

      const result: MatchingResult = {
        requestId: request.id,
        matches: sortedMatches,
        algorithmVersion: "1.0.0",
        configUsed: weights,
        timestamp: new Date().toISOString(),
        totalMatches: sortedMatches.length,
      };

      // Store the result for later retrieval
      this.storeMatchingResult(result);

      console.log(`🎯 Matching completed for request ${request.id}:`, {
        totalMatches: result.totalMatches,
        topScore: sortedMatches[0]?.matchScore,
        weightsUsed: weights,
      });

      return result;
    } catch (error) {
      console.error("Matching service error:", error);
      throw new Error("Failed to find matches");
    }
  }

  private storeMatchingResult(result: MatchingResult): void {
    // Store in localStorage for demo purposes
    // In production, this would be stored in a database
    const key = `matching_result_${result.requestId}`;
    localStorage.setItem(key, JSON.stringify(result));

    // Also store in a general results index
    const allResults = this.getAllResults();
    const existingIndex = allResults.findIndex(
      (r) => r.requestId === result.requestId,
    );

    if (existingIndex >= 0) {
      allResults[existingIndex] = result;
    } else {
      allResults.push(result);
    }

    localStorage.setItem("all_matching_results", JSON.stringify(allResults));
  }

  async getMatchingResult(requestId: string): Promise<MatchingResult | null> {
    try {
      const key = `matching_result_${requestId}`;
      const stored = localStorage.getItem(key);

      if (stored) {
        return JSON.parse(stored);
      }

      return null;
    } catch (error) {
      console.error("Failed to retrieve matching result:", error);
      return null;
    }
  }

  getAllResults(): MatchingResult[] {
    try {
      const stored = localStorage.getItem("all_matching_results");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to retrieve all results:", error);
      return [];
    }
  }

  async rerunMatching(requestId: string): Promise<MatchingResult | null> {
    // Find the original request and re-run matching with current settings
    // This would typically fetch the original request from storage
    console.log(
      `Re-running matching for request ${requestId} with current algorithm settings`,
    );

    // For demo purposes, we'll create a sample request
    // In production, this would fetch the actual request data
    const sampleRequest: MatchingRequest = {
      id: requestId,
      title: "Updated Matching Request",
      description: "Re-running with new algorithm settings",
      requiredSkills: ["JavaScript", "React"],
      preferredExperience: "senior",
      budget: 150,
      timeline: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      teamMembers: [],
      goals: [],
    };

    return await this.findMatches(sampleRequest);
  }
}

export const matchingService = new MatchingService();

// Type alias for compatibility
export type MatchedCoach = CoachMatch;

// Wrapper functions for coach-specific matching
export async function findCoachMatches(
  request: MatchingRequest,
): Promise<MatchingResult> {
  return await matchingService.findMatches(request);
}

export async function acceptCoachMatch(
  requestId: string,
  coachId: string,
): Promise<boolean> {
  try {
    console.log(
      `🎯 Accepting coach match: ${coachId} for request ${requestId}`,
    );

    // Store the acceptance in localStorage for demo purposes
    const acceptanceKey = `acceptance_${requestId}_${coachId}`;
    localStorage.setItem(
      acceptanceKey,
      JSON.stringify({
        requestId,
        coachId,
        status: "accepted",
        timestamp: new Date().toISOString(),
      }),
    );

    // Update the request status
    const requestKey = `coaching_request_${requestId}`;
    const existingRequest = localStorage.getItem(requestKey);
    if (existingRequest) {
      const request = JSON.parse(existingRequest);
      request.status = "matched";
      request.matchedCoachId = coachId;
      request.updatedAt = new Date().toISOString();
      localStorage.setItem(requestKey, JSON.stringify(request));
    }

    return true;
  } catch (error) {
    console.error("Failed to accept coach match:", error);
    return false;
  }
}

export async function rejectCoachMatch(
  requestId: string,
  coachId: string,
  reason?: string,
): Promise<boolean> {
  try {
    console.log(
      `🎯 Rejecting coach match: ${coachId} for request ${requestId}`,
    );

    // Store the rejection in localStorage for demo purposes
    const rejectionKey = `rejection_${requestId}_${coachId}`;
    localStorage.setItem(
      rejectionKey,
      JSON.stringify({
        requestId,
        coachId,
        status: "rejected",
        reason: reason || "No reason provided",
        timestamp: new Date().toISOString(),
      }),
    );

    return true;
  } catch (error) {
    console.error("Failed to reject coach match:", error);
    return false;
  }
}
