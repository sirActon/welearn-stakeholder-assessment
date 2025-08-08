// components/DemographicsStep.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Demographics } from "./types";

interface Props {
  demographics: Demographics;
  onChange: (field: keyof Demographics, value: string | boolean) => void;
}

export function DemographicsStep({ demographics, onChange }: Props) {
  return (
    <Card className="shadow-xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-coral-50 p-10">
        <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
          Let's Get Started
        </CardTitle>
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          The Learning Strategy Scorecard is designed to help L&D leaders
          reflect on the strategic strength of their learning function. By
          evaluating your approach across six core dimensions, you'll gain
          clarity on your current state—and where to focus your efforts for
          maximum impact.
        </p>
        <p className="text-base text-slate-600 leading-relaxed">
          Please provide some basic information to personalize your report and
          experience.
        </p>
      </CardHeader>
      <CardContent className="p-10 space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="name"
            className="text-base font-semibold text-slate-800"
          >
            Full Name *
          </Label>
          <Input
            id="name"
            value={demographics.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Enter your full name"
            className="h-14 text-lg rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="text-base font-semibold text-slate-800"
          >
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={demographics.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="h-14 text-lg rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400"
          />
        </div>
        <div className="flex items-start space-x-4 p-6 bg-slate-50 rounded-2xl">
          <Checkbox
            id="consent"
            checked={demographics.consent}
            onCheckedChange={(checked) =>
              onChange("consent", checked as boolean)
            }
            className="mt-1 data-[state=checked]:bg-coral-500 data-[state=checked]:border-coral-500"
          />
          <Label
            htmlFor="consent"
            className="text-base leading-relaxed text-slate-700"
          >
            I consent to receive my personalized Learning Strategy Scorecard
            report via email and occasional updates from WeLearn about learning
            strategy insights and resources. *
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
