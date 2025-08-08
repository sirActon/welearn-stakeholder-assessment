"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { AssessmentData, Results } from "@/app/page"

interface PersonalizedReportProps {
  assessmentData: AssessmentData
  results: Results
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

const recommendations = {
  "Ad Hoc": {
    title: "Building Your Foundation",
    items: [
      "Develop a formal learning strategy document",
      "Secure leadership buy-in and support",
      "Establish basic learning processes and workflows",
      "Begin tracking fundamental learning metrics",
    ],
  },
  Operational: {
    title: "Expanding Your Capabilities",
    items: [
      "Align learning initiatives with business objectives",
      "Implement systematic measurement and evaluation",
      "Develop a more diverse learning content portfolio",
      "Strengthen manager engagement in learning",
    ],
  },
  Strategic: {
    title: "Driving Innovation",
    items: [
      "Experiment with emerging learning technologies",
      "Develop predictive analytics capabilities",
      "Create personalized learning experiences",
      "Build a culture of continuous learning",
    ],
  },
  Transformational: {
    title: "Leading the Way",
    items: [
      "Share best practices with the industry",
      "Mentor other organizations in their learning journey",
      "Continue pushing the boundaries of learning innovation",
      "Maintain your competitive advantage through learning",
    ],
  },
}

export default function PersonalizedReport({ assessmentData, results, onBackToLanding }: PersonalizedReportProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getRecommendations = () => {
    return recommendations[results.maturityLevel as keyof typeof recommendations] || recommendations["Ad Hoc"]
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
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

        {/* Detailed Section Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Detailed Section Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(results.sectionScores).map(([sectionKey, score]) => (
                <div key={sectionKey} className="border-b pb-6 last:border-b-0">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-slate-800">
                      {sectionNames[sectionKey as keyof typeof sectionNames]}
                    </h4>
                    <span className="text-xl font-bold text-slate-800">{score}/25</span>
                  </div>
                  <Progress value={(score / 25) * 100} className="h-4 mb-2" />
                  <p className="text-sm text-slate-600">
                    Performance: {Math.round((score / 25) * 100)}% -{" "}
                    {score >= 20 ? "Excellent" : score >= 15 ? "Good" : score >= 10 ? "Developing" : "Needs Attention"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Planning Reflections */}
        {(assessmentData.actionPlanning.improvementArea ||
          assessmentData.actionPlanning.biggestChallenge ||
          assessmentData.actionPlanning.successVision) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Your Reflections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentData.actionPlanning.improvementArea && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Area for Improvement</h4>
                  <p className="text-slate-600 bg-gray-50 p-4 rounded-lg">
                    {assessmentData.actionPlanning.improvementArea}
                  </p>
                </div>
              )}
              {assessmentData.actionPlanning.biggestChallenge && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Biggest Challenge</h4>
                  <p className="text-slate-600 bg-gray-50 p-4 rounded-lg">
                    {assessmentData.actionPlanning.biggestChallenge}
                  </p>
                </div>
              )}
              {assessmentData.actionPlanning.successVision && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Vision of Success</h4>
                  <p className="text-slate-600 bg-gray-50 p-4 rounded-lg">
                    {assessmentData.actionPlanning.successVision}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">
              Recommended Next Steps: {getRecommendations().title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {getRecommendations().items.map((item, index) => (
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

        {/* Call to Action */}
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
