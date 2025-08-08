"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import AssessmentFlow from "@/components/assessment-flow"
import ResultsPage from "@/components/results-page"
import PersonalizedReport from "@/components/personalized-report"

export type AssessmentData = {
  demographics: {
    name: string
    email: string
    consent: boolean
  }
  sections: {
    [key: string]: {
      questions: number[]
      comment: string
    }
  }
  actionPlanning: {
    [key: string]: string
  }
}

export type Results = {
  sectionScores: { [key: string]: number }
  totalScore: number
  maturityLevel: string
  maturityDescription: string
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"landing" | "assessment" | "results" | "report">("landing")
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    demographics: { name: "", email: "", consent: false },
    sections: {},
    actionPlanning: {},
  })
  const [results, setResults] = useState<Results | null>(null)

  const handleStartAssessment = () => {
    setCurrentStep("assessment")
  }

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data)

    // Calculate results
    const sectionScores: { [key: string]: number } = {}
    let totalScore = 0

    Object.entries(data.sections).forEach(([sectionKey, sectionData]) => {
      const sectionScore = sectionData.questions.reduce((sum, score) => sum + score, 0)
      sectionScores[sectionKey] = sectionScore
      totalScore += sectionScore
    })

    let maturityLevel = ""
    let maturityDescription = ""

    if (totalScore <= 74) {
      maturityLevel = "Ad Hoc"
      maturityDescription =
        "Learning is reactive, compliance driven and lacks strategic integration. Focus on building foundational practices and gaining leadership support."
    } else if (totalScore <= 104) {
      maturityLevel = "Operational"
      maturityDescription =
        "Some alignment to business goals but L&D is still seen as a support function. Consider expanding strategic influence and measuring impact more systematically."
    } else if (totalScore <= 129) {
      maturityLevel = "Strategic"
      maturityDescription =
        "L&D data informs business priorities, has leadership sponsorship and uses data to adapt. Focus on innovation and continuous improvement."
    } else {
      maturityLevel = "Transformational"
      maturityDescription =
        "Fully embedded, innovative, and business-driving strategy. Learning is a growth engine. Continue leading the way and sharing best practices."
    }

    setResults({
      sectionScores,
      totalScore,
      maturityLevel,
      maturityDescription,
    })

    setCurrentStep("results")
  }

  const handleViewReport = () => {
    setCurrentStep("report")
  }

  const handleBackToLanding = () => {
    setCurrentStep("landing")
    setAssessmentData({
      demographics: { name: "", email: "", consent: false },
      sections: {},
      actionPlanning: {},
    })
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === "landing" && <LandingPage onStartAssessment={handleStartAssessment} />}
      {currentStep === "assessment" && <AssessmentFlow onComplete={handleAssessmentComplete} />}
      {currentStep === "results" && results && (
        <ResultsPage results={results} onViewReport={handleViewReport} onBackToLanding={handleBackToLanding} />
      )}
      {currentStep === "report" && results && (
        <PersonalizedReport assessmentData={assessmentData} results={results} onBackToLanding={handleBackToLanding} />
      )}
    </div>
  )
}
