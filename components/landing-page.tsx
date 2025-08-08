"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { shouldShowHeader } from "@/lib/header-utils";

interface LandingPageProps {
  onStartAssessment: () => void;
}

export default function LandingPage({ onStartAssessment }: LandingPageProps) {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setShowHeader(shouldShowHeader());
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-coral-50">
      {/* Header - conditionally rendered based on URL param */}
      {showHeader && (
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Image
                  src="/logo.jpg"
                  alt="WeLearn Logo"
                  width={225}
                  height={75}
                  className="object-contain"
                  priority
                />
              </div>
              <nav className="hidden md:flex space-x-10">
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-24 lg:py-32 text-center">
          <div className="max-w-5xl mx-auto">
            {/*<div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-coral-100 text-coral-800 mb-8">
                ✨ Assess Your Learning Strategy Maturity
              </span>
            </div>*/}

            <h1 className="text-6xl lg:text-7xl font-medium text-slate-900 mb-8 tracking-tight leading-tight">
              Learning Strategy
              <span className="block text-coral-500">Scorecard</span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-600 mb-16 leading-relaxed max-w-3xl mx-auto">
              Assess the maturity of your organization's learning strategy and
              receive a personalized report with actionable insights to guide
              your next steps.
            </p>

            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-10 lg:p-16 mb-20 border border-slate-100">
              <div className="grid lg:grid-cols-3 gap-12 mb-12">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-coral-200 group-hover:scale-105 transition-transform duration-200">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Complete Assessment
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Answer questions across 6 key areas of learning strategy
                    maturity
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-coral-200 group-hover:scale-105 transition-transform duration-200">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Get Your Score
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Receive your maturity level and detailed performance
                    breakdown
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-coral-200 group-hover:scale-105 transition-transform duration-200">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Take Action
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Use personalized insights to advance your learning strategy
                  </p>
                </div>
              </div>

              <Button
                onClick={onStartAssessment}
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Start Your Assessment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
