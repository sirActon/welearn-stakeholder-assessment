// components/DemographicsStep.tsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Demographics } from "./types";

interface Props {
  demographics: Demographics;
  onChange: (field: keyof Demographics, value: string | boolean) => void;
}

export function DemographicsStep({ demographics, onChange }: Props) {
  const [showOtherIndustry, setShowOtherIndustry] = useState(false);

  // Industry options
  const industryOptions = [
    "Accounting",
    "Advertising & Marketing",
    "Agriculture",
    "Arts & Entertainment",
    "Automotive",
    "Construction",
    "Consulting",
    "Consumer Goods",
    "Education",
    "Energy & Utilities",
    "Engineering",
    "Financial Services",
    "Food & Beverage",
    "Government",
    "Healthcare & Medical",
    "Hospitality",
    "Information Technology (IT)",
    "Insurance",
    "Legal Services",
    "Logistics & Transportation",
    "Manufacturing",
    "Media & Publishing",
    "Nonprofit",
    "Pharmaceuticals & Biotech",
    "Professional Services",
    "Real Estate",
    "Retail & E-Commerce",
    "Software & Internet",
    "Telecommunications",
    "Travel & Tourism",
    "Veterinary & Pet Services",
    "Other",
  ];

  // Check if we need to show the "Other" input field
  useEffect(() => {
    setShowOtherIndustry(demographics.industry === "Other");
  }, [demographics.industry]);

  return (
    <Card className="shadow-xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-coral-50 p-10">
        <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
          Demographic & Contextual Information
        </CardTitle>
        <p className="text-lg text-slate-600 leading-relaxed">
          Help us understand your context so we can provide more relevant
          insights and benchmarking. Your contact information is optional, but
          allows us to share personalized recommendations.
        </p>
      </CardHeader>

      <CardContent className="p-10 space-y-8">
        {/* Question 1: Company Size */}
        <div className="space-y-3">
          <Label
            className="text-base font-semibold text-slate-800 block mb-2"
            htmlFor="company-size"
          >
            1. What is your company size?
          </Label>
          <Select
            value={demographics.companySize || ""}
            onValueChange={(value) => onChange("companySize", value)}
          >
            <SelectTrigger className="w-full rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-50">1-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="201-500">201-500 employees</SelectItem>
              <SelectItem value="501-1000">501-1000 employees</SelectItem>
              <SelectItem value="1001-5000">1001-5000 employees</SelectItem>
              <SelectItem value="5000+">5000+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question 2: Industry */}
        <div className="space-y-3">
          <Label
            className="text-base font-semibold text-slate-800 block mb-2"
            htmlFor="industry"
          >
            2. What industry are you in?
          </Label>
          <Select
            value={demographics.industry || ""}
            onValueChange={(value) => onChange("industry", value)}
          >
            <SelectTrigger className="w-full rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Show "Other" text input if selected */}
          {showOtherIndustry && (
            <div className="mt-3 ml-4 pl-3 border-l-2 border-coral-200">
              <Label
                htmlFor="industry-other"
                className="text-sm font-medium text-slate-700 block mb-1.5"
              >
                Please specify your industry:
              </Label>
              <Input
                id="industry-other"
                placeholder="Your industry"
                className="rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400"
                value={demographics.industryOther || ""}
                onChange={(e) => onChange("industryOther", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Question 3: Learning Strategy */}
        <div className="space-y-3">
          <Label
            className="text-base font-semibold text-slate-800 block mb-2"
            htmlFor="has-strategy"
          >
            3. Do you have a formal learning strategy?
          </Label>
          <Select
            value={demographics.hasStrategy || ""}
            onValueChange={(value) => onChange("hasStrategy", value)}
          >
            <SelectTrigger className="w-full rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="in-development">In development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Question 4: Strategy Review - Conditionally shown based on Question 3 */}
        {(demographics.hasStrategy === "yes" ||
          demographics.hasStrategy === "in-development") && (
          <div className="space-y-3 ml-4 pl-3 border-l-2 border-coral-200 mt-4">
            <Label
              htmlFor="strategy-reviewed"
              className="text-sm font-medium text-slate-700 block mb-1.5"
            >
              When was your learning strategy last reviewed?
            </Label>
            <Select
              value={demographics.strategyLastReviewed || ""}
              onValueChange={(value) => onChange("strategyLastReviewed", value)}
            >
              <SelectTrigger className="w-full rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="within-6-months">
                  Within the last 6 months
                </SelectItem>
                <SelectItem value="6-12-months">6-12 months ago</SelectItem>
                <SelectItem value="1-2-years">1-2 years ago</SelectItem>
                <SelectItem value="2-plus-years">
                  More than 2 years ago
                </SelectItem>
                <SelectItem value="never">Never been reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Contact Details Section */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Contact Details (Optional)
          </h3>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-slate-700 block mb-1.5"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400"
                value={demographics.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="company"
                className="text-sm font-medium text-slate-700 block mb-1.5"
              >
                Company
              </Label>
              <Input
                id="company"
                placeholder="Your company name"
                className="rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400"
                value={demographics.company || ""}
                onChange={(e) => onChange("company", e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 block mb-1.5"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400"
                value={demographics.email || ""}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={demographics.consent || false}
                onCheckedChange={(checked) =>
                  onChange("consent", checked === true)
                }
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium text-slate-700"
              >
                I consent to receiving emails from WeLearn with personalized
                assessment feedback.
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
