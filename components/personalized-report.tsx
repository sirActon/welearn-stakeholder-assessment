"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { AssessmentData, Results } from "@/app/page"
import { isEmbedded } from "@/lib/header-utils"

interface PersonalizedReportProps {
  assessmentData: AssessmentData
  results: Results
  onBackToLanding: () => void
}

const sectionNames = {
  alignment: "Alignment to Business Strategy",
  governance: "Learning Governance",
  technology: "Technology and Ecosystem Integration",
  content: "Content and Experience Strategy",
  measurement: "Measurement and Analytics",
  culture: "Culture and Change Readiness",
}

// Import the recommendations from the dedicated file
import { maturityLevelRecommendations, getSectionRecommendation, sectionKeyToRecommendationKey } from '@/lib/recommendations';

// PDF Download functionality will be implemented in a simpler way to avoid SSR issues

export default function PersonalizedReport({ assessmentData, results, onBackToLanding }: PersonalizedReportProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getRecommendations = () => {
    return maturityLevelRecommendations[results.maturityLevel as keyof typeof maturityLevelRecommendations] || maturityLevelRecommendations["Reactive"]
  }

  const embedded = isEmbedded()
  
  // Get section-specific recommendations based on scores
  const getSectionSpecificRecommendations = () => {
    return Object.keys(results.sectionScores).map(sectionKey => ({
      section: sectionNames[sectionKey as keyof typeof sectionNames] || sectionKey,
      score: results.sectionScores[sectionKey],
      recommendation: getSectionRecommendation(sectionKey, results.sectionScores[sectionKey])
    })).filter(item => item.recommendation);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <h1 className="text-3xl font-light tracking-tight">
              WE<span className="text-coral-400">LEARN</span>
            </h1>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent px-6 py-3 font-semibold rounded-xl"
                onClick={() => {
                  // Let's create a dedicated page for PDF generation
                  // Make sure the submission ID is included in the assessment data
                  const dataToPass = {
                    assessmentData: {
                      ...assessmentData,
                      // Ensure the submission ID is passed to the PDF generation page
                      submissionId: assessmentData.submissionId || "fldu0yi0EKKvAH2gr"
                    },
                    results,
                  };
                  const url = `/generate-pdf?data=${encodeURIComponent(JSON.stringify(dataToPass))}`;
                  window.open(url, '_blank');
                }}
              >
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={onBackToLanding}
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent px-6 py-3 font-semibold rounded-xl"
              >
                New Assessment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Report Header */}
        <div className="text-center mb-16 pb-12 border-b border-slate-200">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Learning Strategy Scorecard Report
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Participant</p>
              <p className="text-lg font-bold text-slate-900">{assessmentData.demographics.name}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Date</p>
              <p className="text-lg font-bold text-slate-900">{currentDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Overall Score</p>
              <p className="text-lg font-bold text-slate-900">{results.totalScore}/150</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Maturity Level</p>
              <p className="text-lg font-bold text-coral-600">{results.maturityLevel}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Submission ID</p>
              <p className="text-lg font-bold text-slate-900">{assessmentData.submissionId || "fldu0yi0EKKvAH2gr"}</p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="mb-12 shadow-xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-coral-50 p-10">
            <CardTitle className="text-3xl font-bold text-slate-900">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <p className="text-xl text-slate-700 leading-relaxed mb-8">{results.maturityDescription}</p>
            <div className="bg-coral-50 border-l-4 border-coral-400 p-8 rounded-r-2xl">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Key Insight</h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                Your organization shows the strongest performance in areas where you've invested time and resources,
                while opportunities exist to strengthen alignment between learning initiatives and business outcomes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Maturity Model */}
        <Card className="mb-8 shadow-xl shadow-slate-200/50 border-0 rounded-xl overflow-hidden">
          <CardHeader className="px-8 py-6">
            <CardTitle className="text-2xl font-medium text-slate-800">
              Your Maturity Level: <span className="text-coral-600">{results.maturityLevel}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <p className="text-slate-600 mb-6">{results.maturityDescription}</p>
            
            {/* Maturity Level Explanation */}
            <h4 className="font-medium text-slate-800 mb-4">Understanding the Maturity Model</h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Reactive" ? "border-red-400 bg-red-50 shadow-md" : "border-gray-200 bg-gray-50"}`}
              >
                <h4 className="font-medium text-red-600 mb-2 text-sm">Reactive (0-74)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Basic learning activities with limited strategy</p>
              </div>
              <div
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Operational" ? "border-coral-400 bg-coral-50 shadow-md" : "border-gray-200 bg-gray-50"}`}
              >
                <h4 className="font-medium text-coral-600 mb-2 text-sm">Operational (75-104)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Structured processes with some measurement</p>
              </div>
              <div
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Strategic" ? "border-blue-400 bg-blue-50 shadow-md" : "border-gray-200 bg-gray-50"}`}
              >
                <h4 className="font-medium text-blue-600 mb-2 text-sm">Strategic (105-129)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Aligned with business goals and data-driven</p>
              </div>
              <div
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Transformational" ? "border-green-400 bg-green-50 shadow-md" : "border-gray-200 bg-gray-50"}`}
              >
                <h4 className="font-medium text-green-600 mb-2 text-sm">Transformational (130-150)</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Innovation-driven with continuous improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Detailed Section Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Detailed Section Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(results.sectionScores).map(([sectionKey, score]) => (
                <div key={sectionKey} className="shadow-md shadow-slate-200/50 border border-slate-100 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 bg-white">
                    <h3 className="text-base font-medium text-slate-800">
                      {sectionNames[sectionKey as keyof typeof sectionNames]}
                    </h3>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-semibold text-coral-600">{score}/25</span>
                      <span className="text-sm font-medium text-slate-500">{Math.round((score / 25) * 100)}%</span>
                    </div>
                    <Progress value={(score / 25) * 100} className="h-3 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Planning Reflections */}
        {(assessmentData.actionPlanning?.improvementArea ||
          assessmentData.actionPlanning?.biggestChallenge ||
          assessmentData.actionPlanning?.successVision) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Your Reflections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentData.actionPlanning?.improvementArea && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Area for Improvement</h4>
                  <p className="text-slate-600 bg-gray-50 p-4 rounded-lg">
                    {assessmentData.actionPlanning?.improvementArea}
                  </p>
                </div>
              )}
              {assessmentData.actionPlanning?.biggestChallenge && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Biggest Challenge</h4>
                  <p className="text-slate-600 bg-gray-50 p-4 rounded-lg">
                    {assessmentData.actionPlanning?.biggestChallenge}
                  </p>
                </div>
              )}
              {assessmentData.actionPlanning?.successVision && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Vision of Success</h4>
                  <p className="text-slate-600 bg-gray-50 p-4 rounded-lg">
                    {assessmentData.actionPlanning?.successVision}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Section-Specific Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">
              Targeted Section Recommendations
            </CardTitle>
            <CardDescription>
              Based on your scores in each area, here are specific improvements you can make:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {getSectionSpecificRecommendations().map((item, index) => (
                <div key={index} className="p-5 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-800">{item.section}</h3>
                    <div className="px-2 py-1 bg-coral-100 text-coral-700 rounded font-medium text-sm">
                      Score: {item.score}/30
                    </div>
                  </div>
                  <p className="text-slate-700">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* General Maturity Level Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">
              Maturity Level Next Steps: {getRecommendations().title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {getRecommendations().items.map((item: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-coral-50 rounded-lg">
                  <div className="w-6 h-6 bg-coral-400 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action (hidden in embed mode) */}
        {!embedded && (
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl shadow-slate-400/50 border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-12 lg:p-16 text-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Take the Next Step?</h3>
              <p className="text-xl mb-10 text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Connect with WeLearn to discuss how we can help you advance your learning strategy and build better humans
                through learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-10 py-4 text-lg font-bold rounded-2xl shadow-xl shadow-coral-200 hover:shadow-2xl transition-all duration-200">
                  Schedule a Consultation
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-slate-900 px-10 py-4 text-lg font-bold bg-transparent rounded-2xl"
                >
                  Learn More About WeLearn
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="mb-2">© 2024 WeLearn. Building Better Humans Through Learning.</p>
            <p className="text-sm">This report is confidential and intended solely for the named recipient.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
