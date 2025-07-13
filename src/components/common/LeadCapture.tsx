import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LocalStorageService from "@/services/localStorageService";
import { ArrowRight, CheckCircle } from "lucide-react";

interface LeadData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  companySize: string;
  interests: string;
  message?: string;
  source: string;
  createdAt: string;
}

interface LeadCaptureProps {
  title?: string;
  description?: string;
  source?: string;
  compact?: boolean;
}

export function LeadCapture({
  title = "Get Started with Peptok",
  description = "Connect with expert coaches and transform your workforce development.",
  source = "landing_page",
  compact = false,
}: LeadCaptureProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    companySize: "",
    interests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.company.trim()) {
      toast.error("Company name is required");
      return false;
    }
    if (!formData.jobTitle.trim()) {
      toast.error("Job title is required");
      return false;
    }
    if (!formData.companySize) {
      toast.error("Please select your company size");
      return false;
    }
    if (!formData.interests) {
      toast.error("Please select your primary interest");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const leadData: LeadData = {\n        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...formData,
        source,
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage
      const existingLeads = LocalStorageService.safeJsonParse(\n        localStorage.getItem(\"peptok_leads\") || \"[]\",\n        [],\n      );\n      existingLeads.push(leadData);\n      localStorage.setItem(\"peptok_leads\", JSON.stringify(existingLeads));\n\n      // Track in analytics\n      const analyticsData = LocalStorageService.getAnalyticsData();\n      const updatedAnalytics = {\n        ...analyticsData,\n        leads: {\n          ...analyticsData.leads,\n          total: (analyticsData.leads?.total || 0) + 1,\n          bySource: {\n            ...analyticsData.leads?.bySource,\n            [source]: (analyticsData.leads?.bySource?.[source] || 0) + 1,\n          },\n          recent: [\n            leadData,\n            ...(analyticsData.leads?.recent || []).slice(0, 9),\n          ],\n        },\n      };\n      LocalStorageService.setAnalyticsData(updatedAnalytics);\n\n      setIsSubmitted(true);\n      toast.success(\"Thank you! We'll be in touch soon.\");\n\n      // Reset form after a delay\n      setTimeout(() => {\n        setFormData({\n          firstName: \"\",\n          lastName: \"\",\n          email: \"\",\n          company: \"\",\n          jobTitle: \"\",\n          companySize: \"\",\n          interests: \"\",\n          message: \"\",\n        });\n        setIsSubmitted(false);\n      }, 3000);\n    } catch (error) {\n      console.error(\"Error submitting lead:\", error);\n      toast.error(\"Something went wrong. Please try again.\");\n    } finally {\n      setIsSubmitting(false);\n    }\n  };\n\n  if (isSubmitted) {\n    return (\n      <Card className=\"bg-green-50/80 border-green-200\">\n        <CardContent className=\"pt-6\">\n          <div className=\"text-center space-y-4\">\n            <CheckCircle className=\"h-12 w-12 text-green-600 mx-auto\" />\n            <div>\n              <h3 className=\"text-lg font-semibold text-green-800\">\n                Thank you for your interest!\n              </h3>\n              <p className=\"text-green-700\">\n                We've received your information and will be in touch within 24 hours.\n              </p>\n            </div>\n          </div>\n        </CardContent>\n      </Card>\n    );\n  }\n\n  return (\n    <Card className=\"bg-white/95 backdrop-blur-sm border-blue-200/50 shadow-xl\">\n      <CardHeader className={compact ? \"pb-4\" : \"\"}>\n        <CardTitle className={compact ? \"text-lg\" : \"text-xl\"}>\n          {title}\n        </CardTitle>\n        <CardDescription className=\"text-base\">\n          {description}\n        </CardDescription>\n      </CardHeader>\n      <CardContent>\n        <form onSubmit={handleSubmit} className=\"space-y-4\">\n          <div className=\"grid grid-cols-2 gap-4\">\n            <div className=\"space-y-2\">\n              <Label htmlFor=\"firstName\">First Name *</Label>\n              <Input\n                id=\"firstName\"\n                name=\"firstName\"\n                value={formData.firstName}\n                onChange={handleInputChange}\n                required\n                disabled={isSubmitting}\n                placeholder=\"John\"\n              />\n            </div>\n            <div className=\"space-y-2\">\n              <Label htmlFor=\"lastName\">Last Name *</Label>\n              <Input\n                id=\"lastName\"\n                name=\"lastName\"\n                value={formData.lastName}\n                onChange={handleInputChange}\n                required\n                disabled={isSubmitting}\n                placeholder=\"Doe\"\n              />\n            </div>\n          </div>\n\n          <div className=\"space-y-2\">\n            <Label htmlFor=\"email\">Work Email *</Label>\n            <Input\n              id=\"email\"\n              name=\"email\"\n              type=\"email\"\n              value={formData.email}\n              onChange={handleInputChange}\n              required\n              disabled={isSubmitting}\n              placeholder=\"john.doe@company.com\"\n            />\n          </div>\n\n          <div className=\"grid grid-cols-2 gap-4\">\n            <div className=\"space-y-2\">\n              <Label htmlFor=\"company\">Company *</Label>\n              <Input\n                id=\"company\"\n                name=\"company\"\n                value={formData.company}\n                onChange={handleInputChange}\n                required\n                disabled={isSubmitting}\n                placeholder=\"Your Company\"\n              />\n            </div>\n            <div className=\"space-y-2\">\n              <Label htmlFor=\"jobTitle\">Job Title *</Label>\n              <Input\n                id=\"jobTitle\"\n                name=\"jobTitle\"\n                value={formData.jobTitle}\n                onChange={handleInputChange}\n                required\n                disabled={isSubmitting}\n                placeholder=\"VP of People\"\n              />\n            </div>\n          </div>\n\n          <div className=\"space-y-2\">\n            <Label htmlFor=\"companySize\">Company Size *</Label>\n            <Select\n              value={formData.companySize}\n              onValueChange={(value) => handleSelectChange(\"companySize\", value)}\n              disabled={isSubmitting}\n            >\n              <SelectTrigger>\n                <SelectValue placeholder=\"Select company size\" />\n              </SelectTrigger>\n              <SelectContent>\n                <SelectItem value=\"1-10\">1-10 employees</SelectItem>\n                <SelectItem value=\"11-50\">11-50 employees</SelectItem>\n                <SelectItem value=\"51-200\">51-200 employees</SelectItem>\n                <SelectItem value=\"201-1000\">201-1,000 employees</SelectItem>\n                <SelectItem value=\"1000+\">1,000+ employees</SelectItem>\n              </SelectContent>\n            </Select>\n          </div>\n\n          <div className=\"space-y-2\">\n            <Label htmlFor=\"interests\">Primary Interest *</Label>\n            <Select\n              value={formData.interests}\n              onValueChange={(value) => handleSelectChange(\"interests\", value)}\n              disabled={isSubmitting}\n            >\n              <SelectTrigger>\n                <SelectValue placeholder=\"What interests you most?\" />\n              </SelectTrigger>\n              <SelectContent>\n                <SelectItem value=\"leadership-coaching\">\n                  Leadership Coaching\n                </SelectItem>\n                <SelectItem value=\"technical-coaching\">\n                  Technical Skills Coaching\n                </SelectItem>\n                <SelectItem value=\"career-development\">\n                  Career Development\n                </SelectItem>\n                <SelectItem value=\"team-building\">\n                  Team Building & Management\n                </SelectItem>\n                <SelectItem value=\"executive-coaching\">\n                  Executive Coaching\n                </SelectItem>\n                <SelectItem value=\"other\">Other</SelectItem>\n              </SelectContent>\n            </Select>\n          </div>\n\n          {!compact && (\n            <div className=\"space-y-2\">\n              <Label htmlFor=\"message\">Additional Message</Label>\n              <Textarea\n                id=\"message\"\n                name=\"message\"\n                value={formData.message}\n                onChange={handleInputChange}\n                disabled={isSubmitting}\n                placeholder=\"Tell us more about your coaching needs...\"\n                rows={3}\n              />\n            </div>\n          )}\n\n          <Button\n            type=\"submit\"\n            className=\"w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group\"\n            disabled={isSubmitting}\n          >\n            {isSubmitting ? (\n              <>\n                <div className=\"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2\" />\n                Submitting...\n              </>\n            ) : (\n              <>\n                Get Started\n                <ArrowRight className=\"ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform\" />\n              </>\n            )}\n          </Button>\n\n          <p className=\"text-xs text-muted-foreground text-center\">\n            By submitting, you agree to our Terms of Service and Privacy Policy.\n            No spam, unsubscribe anytime.\n          </p>\n        </form>\n      </CardContent>\n    </Card>\n  );\n}\n\nexport default LeadCapture;