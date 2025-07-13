import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Target,
  TrendingUp,
  Calendar as CalendarIcon,
  DollarSign,
  Plus,
  X,
  Lightbulb,
  Users,
  Clock,
  ChevronDown,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  CoachingRequest,
  CoachingGoal,
  TeamMember,
  SubscriptionTier,
  SessionPricingTier,
} from "@/types";

export interface CoachingRequestFormData {
  title: string;
  description: string;
  goals: CoachingGoal[];
  metricsToTrack: string[];
  teamMembers: TeamMember[];
  preferredExpertise: string[];
  budget?: {
    min: number;
    max: number;
  };
  timeline: {
    startDate: string;
    endDate: string;
    sessionFrequency: "weekly" | "bi-weekly" | "monthly";
  };
  expertise?: string[];
  level?: string;
}

interface CoachingRequestFormProps {
  onSubmit: (data: CoachingRequestFormData) => void;
  sessionPricingTier?: SessionPricingTier | null;
  onUpgradePrompt?: () => void;
  initialData?: CoachingRequestFormData;
  isLoading?: boolean;
  onFormDataChange?: (data: CoachingRequestFormData) => void;
}

const expertiseOptions = [
  "Leadership",
  "Technology",
  "Sales",
  "Marketing",
  "Product Management",
  "Project Management",
  "Data Science",
  "Software Engineering",
  "Design",
  "Finance",
  "Operations",
  "Strategy",
  "Communication",
  "Team Building",
  "Change Management",
];

const metricOptions = [
  "Employee Engagement",
  "Performance Ratings",
  "Skill Assessments",
  "Goal Achievement",
  "Team Collaboration",
  "Leadership Effectiveness",
  "Innovation Metrics",
  "Time to Proficiency",
  "Retention Rate",
  "Customer Satisfaction",
];

export function CoachingRequestForm({
  onSubmit,
  sessionPricingTier,
  onUpgradePrompt,
  initialData,
  isLoading = false,
  onFormDataChange,
}: CoachingRequestFormProps) {
  const [formData, setFormData] = useState<CoachingRequestFormData>({
    title: "",
    description: "",
    goals: [],
    metricsToTrack: [],
    teamMembers: [],
    preferredExpertise: [],
    timeline: {
      startDate: "",
      endDate: "",
      sessionFrequency: "bi-weekly",
    },
    ...initialData,
  });

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "leadership" as CoachingGoal["category"],
    priority: "medium" as CoachingGoal["priority"],
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
      if (initialData.timeline?.startDate) {
        setStartDate(new Date(initialData.timeline.startDate));
      }
      if (initialData.timeline?.endDate) {
        setEndDate(new Date(initialData.timeline.endDate));
      }
    }
  }, [initialData]);

  // Notify parent of form data changes
  useEffect(() => {
    onFormDataChange?.(formData);
  }, [formData, onFormDataChange]);

  const updateFormData = (updates: Partial<CoachingRequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) {
      toast.error("Please enter a goal title");
      return;
    }

    const goal: CoachingGoal = {
      id: `goal-${Date.now()}`,
      ...newGoal,
    };

    updateFormData({
      goals: [...formData.goals, goal],
    });

    setNewGoal({
      title: "",
      description: "",
      category: "leadership",
      priority: "medium",
    });
  };

  const removeGoal = (goalId: string) => {
    updateFormData({
      goals: formData.goals.filter((goal) => goal.id !== goalId),
    });
  };

  const handleExpertiseToggle = (expertise: string) => {
    const current = formData.preferredExpertise || [];
    const updated = current.includes(expertise)
      ? current.filter((e) => e !== expertise)
      : [...current, expertise];
    updateFormData({ preferredExpertise: updated });
  };

  const handleMetricToggle = (metric: string) => {
    const current = formData.metricsToTrack || [];
    const updated = current.includes(metric)
      ? current.filter((m) => m !== metric)
      : [...current, metric];
    updateFormData({ metricsToTrack: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a program title");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a program description");
      return;
    }

    if (formData.goals.length === 0) {
      toast.error("Please add at least one goal");
      return;
    }

    if (!formData.timeline.startDate || !formData.timeline.endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Coaching Program Details
        </CardTitle>
        <CardDescription>
          Define your coaching program structure, goals, and requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Program Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                placeholder="e.g., Leadership Development Program Q1 2024"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Program Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  updateFormData({ description: e.target.value })
                }
                placeholder="Describe the objectives and scope of this coaching program..."
                rows={4}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Goals Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <h3 className="text-lg font-semibold">Program Goals</h3>
            </div>

            {/* Add New Goal */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Goal Title</Label>
                    <Input
                      value={newGoal.title}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, title: e.target.value })
                      }
                      placeholder="e.g., Improve team leadership skills"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value: CoachingGoal["category"]) =>
                        setNewGoal({ ...newGoal, category: value })
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Goal Description</Label>
                    <Textarea
                      value={newGoal.description}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, description: e.target.value })
                      }
                      placeholder="Describe what success looks like for this goal..."
                      rows={2}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newGoal.priority}
                      onValueChange={(value: CoachingGoal["priority"]) =>
                        setNewGoal({ ...newGoal, priority: value })
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={addGoal}
                      variant="outline"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Goal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Goals */}
            {formData.goals.length > 0 && (
              <div className="space-y-3">
                {formData.goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{goal.title}</h4>
                            <Badge
                              variant={
                                goal.priority === "high"
                                  ? "destructive"
                                  : goal.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {goal.priority}
                            </Badge>
                            <Badge variant="outline">{goal.category}</Badge>
                          </div>
                          {goal.description && (
                            <p className="text-sm text-muted-foreground">
                              {goal.description}
                            </p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(goal.id)}
                          disabled={isLoading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Preferred Expertise */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <h3 className="text-lg font-semibold">Preferred Expertise</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {expertiseOptions.map((expertise) => (
                <div key={expertise} className="flex items-center space-x-2">
                  <Checkbox
                    id={expertise}
                    checked={formData.preferredExpertise?.includes(expertise)}
                    onCheckedChange={() => handleExpertiseToggle(expertise)}
                    disabled={isLoading}
                  />
                  <Label htmlFor={expertise} className="text-sm">
                    {expertise}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics to Track */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="text-lg font-semibold">Metrics to Track</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {metricOptions.map((metric) => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric}
                    checked={formData.metricsToTrack?.includes(metric)}
                    onCheckedChange={() => handleMetricToggle(metric)}
                    disabled={isLoading}
                  />
                  <Label htmlFor={metric} className="text-sm">
                    {metric}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-lg font-semibold">Program Timeline</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        updateFormData({
                          timeline: {
                            ...formData.timeline,
                            startDate: date?.toISOString() || "",
                          },
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        updateFormData({
                          timeline: {
                            ...formData.timeline,
                            endDate: date?.toISOString() || "",
                          },
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Session Frequency</Label>
                <Select
                  value={formData.timeline.sessionFrequency}
                  onValueChange={(value: "weekly" | "bi-weekly" | "monthly") =>
                    updateFormData({
                      timeline: {
                        ...formData.timeline,
                        sessionFrequency: value,
                      },
                    })
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
