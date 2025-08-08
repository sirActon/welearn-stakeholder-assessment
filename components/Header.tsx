// components/Header.tsx
import React from "react";

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function Header({ currentStep, totalSteps }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            WE<span className="text-coral-500">LEARN</span>
          </h1>
          <div className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>
      </div>
    </header>
  );
}
