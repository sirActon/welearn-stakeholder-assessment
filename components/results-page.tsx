"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Results } from "@/app/page"

interface ResultsPageProps {
  results: Results
  onViewReport: () => void
  onBackToLanding: () => void
}

const sectionNames = {
  strategy: "Learning Strategy & Alignment",
  culture: "Learning Culture & Engagement",
  content: "Content & Curriculum Design",
  technology: "Technology & Infrastructure",
  measurement: "Measurement & Analytics",
  innovation: "Innovation & Future Readiness",
}

export default function ResultsPage({ results, onViewReport, onBackToLanding }: ResultsPageProps) {
  const getMaturityColor = (level: string) => {
    switch (level) {
      case "Ad Hoc":
        return "text-red-600 bg-red-50 border-red-200"
      case "Operational":
        return "text-coral-600 bg-coral-50 border-coral-200"
      case "Strategic":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "Transformational":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              WE<span className="text-coral-500">LEARN</span>
            </h1>
            <Button
              variant="outline"
              onClick={onBackToLanding}
              className="px-6 py-3 font-medium rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
            >
              Start New Assessment
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-medium text-slate-900 mb-6 tracking-tight">
            Your Learning Strategy Results
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-light">
            Here's how your organization's learning strategy measures up
          </p>
        </div>

        {/* Overall Score */}
        <Card className="mb-12 shadow-2xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 lg:p-16">
            <div className="text-center">
              <div className="text-7xl lg:text-8xl font-light text-coral-500 mb-6">
                {results.totalScore}
                <span className="text-3xl text-slate-400 font-light">/150</span>
              </div>
              <div
                className={`inline-block px-8 py-4 rounded-2xl border-2 ${getMaturityColor(results.maturityLevel)} mb-8`}
              >
                <span className="text-2xl font-medium">{results.maturityLevel} Level</span>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                {results.maturityDescription}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {Object.entries(results.sectionScores).map(([sectionKey, score]) => (
            <Card
              key={sectionKey}
              className="shadow-lg shadow-slate-200/50 border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-medium text-slate-900">
                  {sectionNames[sectionKey as keyof typeof sectionNames]}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-light text-slate-900">{score}/25</span>
                  <span className="text-lg font-medium text-slate-500">{Math.round((score / 25) * 100)}%</span>
                </div>
                <Progress value={(score / 25) * 100} className="h-4 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Maturity Level Explanation */}
        <Card className="mb-12 shadow-lg shadow-slate-200/50 border-0 rounded-2xl overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-medium text-slate-900">Understanding Your Maturity Level</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Ad Hoc" ? "border-red-400 bg-red-50 shadow-md" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
              >
                <h4 className="font-medium text-red-600 mb-3 text-lg">Ad Hoc (0-50)</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Basic learning activities with limited strategy</p>
              </div>
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Operational" ? "border-coral-400 bg-coral-50 shadow-md" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
              >
                <h4 className="font-medium text-coral-600 mb-3 text-lg">Operational (51-85)</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Structured processes with some measurement</p>
              </div>
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Strategic" ? "border-blue-400 bg-blue-50 shadow-md" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
              >
                <h4 className="font-medium text-blue-600 mb-3 text-lg">Strategic (86-115)</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Aligned with business goals and data-driven</p>
              </div>
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${results.maturityLevel === "Transformational" ? "border-green-400 bg-green-50 shadow-md" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
              >
                <h4 className="font-medium text-green-600 mb-3 text-lg">Transformational (116-150)</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Innovation-driven with continuous improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            onClick={onViewReport}
            className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-12 py-6 text-xl font-medium rounded-2xl shadow-xl shadow-coral-200 hover:shadow-2xl hover:shadow-coral-300 transition-all duration-300 hover:scale-105"
            size="lg"
          >
            View Your Personalized Report
          </Button>
        </div>
      </main>
    </div>
  )
}
