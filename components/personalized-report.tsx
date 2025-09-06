"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AssessmentData, Results } from "@/app/page";
import { isEmbedded } from "@/lib/header-utils";
import {
  maturityLevelRecommendations,
  getSectionRecommendation,
} from "@/lib/recommendations";

interface PersonalizedReportProps {
  assessmentData: AssessmentData;
  results: Results;
  onBackToLanding: () => void;
  onAcknowledgeComplete?: () => void;
}

const sectionNames = {
  alignment: "Alignment to Business Strategy",
  governance: "Learning Governance",
  technology: "Technology and Ecosystem Integration",
  content: "Content and Experience Strategy",
  measurement: "Measurement and Analytics",
  culture: "Culture and Change Readiness",
} as const;

export default function PersonalizedReport({
  assessmentData,
  results,
  onBackToLanding,
  onAcknowledgeComplete,
}: PersonalizedReportProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [mounted, setMounted] = useState(false);
  const [embedded, setEmbedded] = useState(false);
  useEffect(() => {
    setMounted(true);
    setEmbedded(isEmbedded());
  }, []);
  const companyFromUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("company")
      : null;

  const getRecommendations = () =>
    maturityLevelRecommendations[
      results.maturityLevel as keyof typeof maturityLevelRecommendations
    ] || maturityLevelRecommendations["Reactive"];

  const getSectionSpecificRecommendations = () =>
    Object.keys(results.sectionScores)
      .map((sectionKey) => ({
        section:
          sectionNames[sectionKey as keyof typeof sectionNames] || sectionKey,
        score: results.sectionScores[sectionKey],
        recommendation: getSectionRecommendation(
          sectionKey,
          results.sectionScores[sectionKey]
        ),
      }))
      .filter((item) => item.recommendation);

  return (
    <div className="min-h-screen bg-white">
      {/* Header (white background for white logo) */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Real logo — keep aspect ratio */}
            <img
              src="/logo.jpg" // place your 721x227 white logo here
              alt="WeLearn Logo"
              className="h-10 w-auto"
            />

            <div className="flex gap-3 sm:gap-4">
              {!companyFromUrl && (
                <Button
                  variant="outline"
                  className="px-5 sm:px-6 py-2.5 font-semibold rounded-xl"
                  onClick={() => {
                    const dataToPass = {
                      assessmentData: {
                        ...assessmentData,
                        submissionId:
                          assessmentData.submissionId || "fldu0yi0EKKvAH2gr",
                      },
                      results,
                    };
                    const url = `/generate-pdf?data=${encodeURIComponent(
                      JSON.stringify(dataToPass)
                    )}`;
                    window.open(url, "_blank");
                  }}
                >
                  Download PDF
                </Button>
              )}
              {!mounted ? null : embedded ? (
                <Button
                  className="px-5 sm:px-6 py-2.5 font-semibold rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white"
                  onClick={() => onAcknowledgeComplete?.()}
                >
                  I’ve completed this assessment
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={onBackToLanding}
                  className="px-5 sm:px-6 py-2.5 font-semibold rounded-xl"
                >
                  New Assessment
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        {/* Report masthead */}
        <section className="mb-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Learning Strategy Scorecard Report
            </h1>
            <p className="mt-3 text-slate-600">
              A snapshot of your learning maturity with targeted recommendations
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto">
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Participant
              </p>
              <p className="text-base font-semibold text-slate-900">
                {assessmentData.demographics.name || "—"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Date
              </p>
              <p className="text-base font-semibold text-slate-900">
                {currentDate}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Overall Score
              </p>
              <p className="text-base font-semibold text-slate-900">
                {results.totalScore}/150
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Maturity Level
              </p>
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-coral-50 text-coral-700 border border-coral-200">
                {results.maturityLevel}
              </span>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Submission ID
              </p>
              <p className="text-base font-semibold text-slate-900">
                {assessmentData.submissionId || "fldu0yi0EKKvAH2gr"}
              </p>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <Card className="mb-12 border border-slate-200 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 bg-gradient-to-r from-slate-50 to-coral-50">
            <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-900">
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {results.maturityDescription}
            </p>
            <div className="bg-coral-50/80 border-l-4 border-coral-400 p-6 rounded-r-2xl">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Key Insight
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Your organization shows the strongest performance in areas where
                you’ve invested time and resources, while opportunities exist to
                strengthen alignment between learning initiatives and business
                outcomes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Maturity Model */}
        <Card className="mb-10 border border-slate-200 rounded-2xl overflow-hidden">
          <CardHeader className="px-8 py-6">
            <CardTitle className="text-xl lg:text-2xl font-semibold text-slate-900">
              Your Maturity Level{" "}
              <span className="font-bold text-coral-600">
                {results.maturityLevel}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <p className="text-slate-600 mb-6">{results.maturityDescription}</p>

            <h4 className="font-medium text-slate-800 mb-3">
              Understanding the Maturity Model
            </h4>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  key: "Reactive",
                  label: "Reactive (30–74)",
                  hint: "Learning is reactive, compliance-driven, and lacks strategic integration.",
                  activeClasses: "border-red-400 bg-red-50",
                  titleColor: "text-red-600",
                },
                {
                  key: "Operational",
                  label: "Operational (75–104)",
                  hint: "Structured processes with some alignment to goals and measurement.",
                  activeClasses: "border-coral-400 bg-coral-50",
                  titleColor: "text-coral-600",
                },
                {
                  key: "Strategic",
                  label: "Strategic (105–129)",
                  hint: "Data-informed, aligned with business priorities and leadership support.",
                  activeClasses: "border-blue-400 bg-blue-50",
                  titleColor: "text-blue-600",
                },
                {
                  key: "Transformational",
                  label: "Transformational (130–150)",
                  hint: "Fully embedded, innovative, and business-driving strategy.",
                  activeClasses: "border-green-400 bg-green-50",
                  titleColor: "text-green-600",
                },
              ].map((m) => (
                <div
                  key={m.key}
                  className={[
                    "p-4 rounded-xl border-2 transition-all duration-200",
                    results.maturityLevel === m.key
                      ? `${m.activeClasses} shadow-md`
                      : "border-slate-200 bg-slate-50",
                  ].join(" ")}
                >
                  <h4 className={`font-semibold mb-2 text-sm ${m.titleColor}`}>
                    {m.label}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.hint}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Section Results */}
        <Card className="mb-10 border border-slate-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl text-slate-900">
              Detailed Section Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(results.sectionScores).map(
                ([sectionKey, score]) => {
                  const pct = Math.round((score / 25) * 100);
                  return (
                    <div
                      key={sectionKey}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white"
                    >
                      <div className="px-5 py-4">
                        <h3 className="text-base font-semibold text-slate-900">
                          {
                            sectionNames[
                              sectionKey as keyof typeof sectionNames
                            ]
                          }
                        </h3>
                      </div>
                      <div className="px-5 pb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold text-coral-600">
                            {score}/25
                          </span>
                          <span className="text-sm font-medium text-slate-500">
                            {pct}%
                          </span>
                        </div>
                        <Progress value={pct} className="h-2.5 rounded-full" />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reflections */}
        {(assessmentData.actionPlanning?.improvementArea ||
          assessmentData.actionPlanning?.biggestChallenge ||
          assessmentData.actionPlanning?.successVision) && (
          <Card className="mb-10 border border-slate-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl text-slate-900">
                Your Reflections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentData.actionPlanning?.improvementArea && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Area for Improvement
                  </h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {assessmentData.actionPlanning.improvementArea}
                  </p>
                </div>
              )}
              {assessmentData.actionPlanning?.biggestChallenge && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Biggest Challenge
                  </h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {assessmentData.actionPlanning.biggestChallenge}
                  </p>
                </div>
              )}
              {assessmentData.actionPlanning?.successVision && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Vision of Success
                  </h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {assessmentData.actionPlanning.successVision}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Section-Specific Recommendations */}
        <Card className="mb-10 border border-slate-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl text-slate-900">
              Targeted Section Recommendations
            </CardTitle>
            <CardDescription>
              Based on your scores in each area, here are specific improvements
              you can make:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {getSectionSpecificRecommendations().map((item, index) => (
                <div
                  key={index}
                  className="p-5 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">
                      {item.section}
                    </h3>
                    {/* corrected denominator */}
                    <div className="px-2.5 py-1 bg-coral-100 text-coral-700 rounded font-medium text-sm">
                      Score: {item.score}/25
                    </div>
                  </div>
                  <p className="text-slate-700">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maturity-Level Next Steps */}
        <Card className="mb-12 border border-slate-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl text-slate-900">
              Maturity Level Next Steps: {getRecommendations().title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {getRecommendations().items.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-coral-50 rounded-lg border border-coral-200"
                >
                  <div className="w-6 h-6 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA (hidden in embed mode) */}
        {!embedded && (
          <Card className="bg-gradient-to-b from-slate-900 to-slate-800 text-white border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-12 lg:p-16 text-center">
              <div className="flex justify-center mb-8">
                {/* Optional: show logo reversed on dark if you have a dark-version; otherwise omit */}
                {/* <img src="/logo-white.png" alt="WeLearn" className="h-8 w-auto opacity-90" /> */}
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Take the Next Step?
              </h3>
              <p className="text-lg lg:text-xl mb-10 text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Connect with WeLearn to discuss how we can help you advance your
                learning strategy and build better humans through learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-8 py-4 text-base lg:text-lg font-bold rounded-2xl shadow-lg shadow-coral-200 hover:shadow-xl transition-all">
                  <a href="https://calendly.com/seans-oxq/ss" target="_blank" rel="noopener noreferrer">
                    Schedule a Consultation
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-coral-600 border-white hover:bg-white hover:text-slate-900 px-8 py-4 text-base lg:text-lg font-bold rounded-2xl"
                >
                  <a href="http://www.welearnls.com/" target="_blank" rel="noopener noreferrer">
                    Learn More About WeLearn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.jpg" alt="WeLearn Logo" className="h-7 w-auto" />
            <div className="text-center text-slate-600">
              <p className="mb-1">
                © 2024 WeLearn. Building Better Humans Through Learning.
              </p>
              <p className="text-sm">
                This report is confidential and intended solely for the named
                recipient.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
