"use client";

import { useState, Suspense } from "react";
import LandingPage from "@/components/landing-page";
import AssessmentFlow from "@/components/assessment-flow";
import ResultsPage from "@/components/results-page";
import PersonalizedReport from "@/components/personalized-report";
import ThankYou from "@/components/thank-you";
import type { AssessmentData as SharedAssessmentData } from "@/components/types";

// Re-export the shared AssessmentData to keep existing imports working
export type AssessmentData = SharedAssessmentData;

export type Results = {
  sectionScores: { [key: string]: number };
  totalScore: number;
  maturityLevel: string;
  maturityDescription: string;
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<
    "landing" | "assessment" | "results" | "report" | "thanks"
  >("landing");
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    demographics: {
      companySize: "",
      industry: "",
      industryOther: "",
      hasStrategy: "",
      strategyLastReviewed: "",
      name: "",
      company: "",
      email: "",
      consent: false,
    },
    sections: {},
    // actionPlanning is optional in the shared type
  });
  const [results, setResults] = useState<Results | null>(null);

  const handleStartAssessment = () => {
    setCurrentStep("assessment");
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);

    // Company mode: show Thank You page and do not compute/display report
    if (data.companyRecordId) {
      setResults(null);
      setCurrentStep("thanks");
      return;
    }

    // Calculate results for individual mode
    const sectionScores: { [key: string]: number } = {};
    let totalScore = 0;

    Object.entries(data.sections).forEach(([sectionKey, sectionData]) => {
      const sectionScore = sectionData.questions.reduce(
        (sum, score) => sum + score,
        0
      );
      sectionScores[sectionKey] = sectionScore;
      totalScore += sectionScore;
    });

    let maturityLevel = "";
    let maturityDescription = "";

    if (totalScore <= 74) {
      maturityLevel = "Reactive";
      maturityDescription =
        "Learning is reactive, compliance driven and lacks strategic integration. Focus on building foundational practices and gaining leadership support.";
    } else if (totalScore <= 104) {
      maturityLevel = "Operational";
      maturityDescription =
        "Some alignment to business goals but L&D is still seen as a support function. Consider expanding strategic influence and measuring impact more systematically.";
    } else if (totalScore <= 129) {
      maturityLevel = "Strategic";
      maturityDescription =
        "L&D data informs business priorities, has leadership sponsorship and uses data to adapt. Focus on innovation and continuous improvement.";
    } else {
      maturityLevel = "Transformational";
      maturityDescription =
        "Fully embedded, innovative, and business-driving strategy. Learning is a growth engine. Continue leading the way and sharing best practices.";
    }

    setResults({
      sectionScores,
      totalScore,
      maturityLevel,
      maturityDescription,
    });

    // Skip the results step and go directly to the report
    setCurrentStep("report");
  };

  const handleViewReport = () => {
    setCurrentStep("report");
  };

  const handleBackToLanding = () => {
    setCurrentStep("landing");
    setAssessmentData({
      demographics: {
        companySize: "",
        industry: "",
        industryOther: "",
        hasStrategy: "",
        strategyLastReviewed: "",
        name: "",
        company: "",
        email: "",
        consent: false,
      },
      sections: {},
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === "landing" && (
        <Suspense fallback={null}>
          <LandingPage onStartAssessment={handleStartAssessment} />
        </Suspense>
      )}
      {currentStep === "assessment" && (
        <AssessmentFlow onComplete={handleAssessmentComplete} />
      )}
      {currentStep === "results" && results && (
        <ResultsPage
          results={results}
          onViewReport={handleViewReport}
          onBackToLanding={handleBackToLanding}
        />
      )}
      {currentStep === "thanks" && (
        <ThankYou onBackToLanding={handleBackToLanding} />
      )}
      {currentStep === "report" && results && (
        <PersonalizedReport
          assessmentData={assessmentData}
          results={results}
          onBackToLanding={handleBackToLanding}
        />
      )}
    </div>
  );
}
