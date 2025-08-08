// components/ActionPlanningStep.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ActionPlanning } from "./types";

interface Props {
  actionPlanning: ActionPlanning;
  onChange: (field: keyof ActionPlanning, value: string) => void;
}

export function ActionPlanningStep({ actionPlanning, onChange }: Props) {
  return (
    <Card className="shadow-xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-coral-50 p-10">
        <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
          Action Planning
        </CardTitle>
        <p className="text-lg text-slate-600 leading-relaxed">
          Use this section to capture your insights and next steps based on your
          assessment. Reflect on your results and identify areas for
          improvement.
        </p>
      </CardHeader>
      <CardContent className="p-10 space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="priority-areas"
            className="text-base font-semibold text-slate-800"
          >
            Priority Areas for Improvement (Top 2-3)
          </Label>
          <Textarea
            id="priority-areas"
            value={actionPlanning.priorityAreas || ""}
            onChange={(e) => onChange("priorityAreas", e.target.value)}
            placeholder="Which dimensions or specific areas need the most attention?"
            rows={3}
            className="text-base rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400 resize-none"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="quick-wins"
            className="text-base font-semibold text-slate-800"
          >
            Quick Wins
          </Label>
          <Textarea
            id="quick-wins"
            value={actionPlanning.quickWins || ""}
            onChange={(e) => onChange("quickWins", e.target.value)}
            placeholder="What are some immediate actions you can take in the next 30-90 days?"
            rows={3}
            className="text-base rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400 resize-none"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="strategic-shifts"
            className="text-base font-semibold text-slate-800"
          >
            Long-Term Strategic Shifts
          </Label>
          <Textarea
            id="strategic-shifts"
            value={actionPlanning.strategicShifts || ""}
            onChange={(e) => onChange("strategicShifts", e.target.value)}
            placeholder="What fundamental changes need to happen over the next 6-18 months?"
            rows={3}
            className="text-base rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400 resize-none"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="stakeholders"
            className="text-base font-semibold text-slate-800"
          >
            Stakeholders to Engage
          </Label>
          <Textarea
            id="stakeholders"
            value={actionPlanning.stakeholders || ""}
            onChange={(e) => onChange("stakeholders", e.target.value)}
            placeholder="Who do you need to involve or get buy-in from to make these changes?"
            rows={3}
            className="text-base rounded-xl border-slate-200 focus:border-coral-400 focus:ring-coral-400 resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
