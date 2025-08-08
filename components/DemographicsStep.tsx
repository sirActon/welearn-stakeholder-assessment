// components/DemographicsStep.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
          Demographic & Contextual Information
        </CardTitle>
        <p className="text-lg text-slate-600 leading-relaxed mb-4">
          Please help us understand your organization better. This information will be used to provide benchmarking insights and shape future research.
        </p>
      </CardHeader>
      <CardContent className="p-10 space-y-12">
        {/* Company Size */}
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-slate-800">1. Company Size</h3>
          <p className="text-slate-600">Select the range that best describes your organization:</p>
          
          <RadioGroup
            value={demographics.companySize}
            onValueChange={(value) => onChange("companySize", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="<100" id="size-lt100" />
              <Label htmlFor="size-lt100" className="text-slate-800">Fewer than 100 employees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="100-499" id="size-100-499" />
              <Label htmlFor="size-100-499" className="text-slate-800">100–499 employees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="500-999" id="size-500-999" />
              <Label htmlFor="size-500-999" className="text-slate-800">500–999 employees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1000-4999" id="size-1000-4999" />
              <Label htmlFor="size-1000-4999" className="text-slate-800">1,000–4,999 employees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5000-9999" id="size-5000-9999" />
              <Label htmlFor="size-5000-9999" className="text-slate-800">5,000–9,999 employees</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10000+" id="size-10000" />
              <Label htmlFor="size-10000" className="text-slate-800">10,000+ employees</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Industry */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-800">2. Industry</h3>
          <p className="text-slate-600">What industry best represents your organization?</p>
          <Input
            placeholder="e.g. Healthcare, Finance, Technology, Education, etc."
            value={demographics.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className="w-full py-6 px-5 text-base rounded-xl"
          />
        </div>
        
        {/* Learning Strategy */}
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-slate-800">3. Do you currently have a formal learning strategy in place?</h3>
          
          <RadioGroup
            value={demographics.hasStrategy}
            onValueChange={(value) => onChange("hasStrategy", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="strategy-yes" />
              <Label htmlFor="strategy-yes" className="text-slate-800">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="strategy-no" />
              <Label htmlFor="strategy-no" className="text-slate-800">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-development" id="strategy-dev" />
              <Label htmlFor="strategy-dev" className="text-slate-800">In development</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Strategy Review */}
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-slate-800">4. If yes, when was your learning strategy last created or reviewed?</h3>
          
          <RadioGroup
            value={demographics.strategyLastReviewed}
            onValueChange={(value) => onChange("strategyLastReviewed", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="<6months" id="review-6mo" />
              <Label htmlFor="review-6mo" className="text-slate-800">Within the last 6 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6-12months" id="review-6-12" />
              <Label htmlFor="review-6-12" className="text-slate-800">6–12 months ago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-2years" id="review-1-2" />
              <Label htmlFor="review-1-2" className="text-slate-800">1–2 years ago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">2years" id="review-2plus" />
              <Label htmlFor="review-2plus" className="text-slate-800">More than 2 years ago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-sure" id="review-unsure" />
              <Label htmlFor="review-unsure" className="text-slate-800">Not sure</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Contact Information */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Stay Connected</h3>
          <p className="text-slate-600 mb-6">
            WeLearn is producing research, benchmarks, and insights based on aggregated data from this scorecard. 
            If you'd like to receive those findings and future resources:
          </p>
          
          <h4 className="text-lg font-medium text-slate-800 mb-4">5. Please provide your contact details (optional):</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium text-slate-800">Name:</Label>
              <Input
                id="name"
                value={demographics.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="w-full py-6 px-5 text-base rounded-xl"
                placeholder="Your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-base font-medium text-slate-800">Company:</Label>
              <Input
                id="company"
                value={demographics.company}
                onChange={(e) => onChange("company", e.target.value)}
                className="w-full py-6 px-5 text-base rounded-xl"
                placeholder="Your company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium text-slate-800">Email Address:</Label>
              <Input
                id="email"
                type="email"
                value={demographics.email}
                onChange={(e) => onChange("email", e.target.value)}
                className="w-full py-6 px-5 text-base rounded-xl"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox 
                id="consent" 
                checked={demographics.consent as boolean}
                onCheckedChange={(checked) => onChange("consent", !!checked)}
              />
              <Label htmlFor="consent" className="text-sm text-slate-600">
                I consent to receive emails from WeLearn with research findings and future resources.
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
