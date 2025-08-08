// components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Start",
  "Alignment",
  "Governance",
  "Technology",
  "Content",
  "Measurement",
  "Culture",
  "Planning",
];

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="bg-white border-b border-slate-200/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-slate-600">Progress</span>
          <span className="text-sm font-medium text-slate-600">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`flex-1 h-3 rounded-full transition-all duration-500 ease-out ${
                index <= currentStep
                  ? "bg-gradient-to-r from-coral-400 to-coral-500 shadow-sm"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-slate-500">
          {stepLabels.slice(0, totalSteps).map((label, i) => (
            <span
              key={i}
              className={`${currentStep === i 
                ? "text-coral-600 font-medium" 
                : "hidden md:inline"  /* Hide non-active sections on mobile */
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
