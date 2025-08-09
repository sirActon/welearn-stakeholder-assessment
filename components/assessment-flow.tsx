// AssessmentFlow.tsx
"use client";

import React, { useReducer, useCallback, useState, useEffect } from "react";
import { shouldShowHeader } from "@/lib/header-utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { AssessmentData, Demographics, ActionPlanning, SectionResponse } from "./types";
import { DemographicsStep } from "./DemographicsStep";
import { SectionStep } from "./SectionStep";
import { ActionPlanningStep } from "./ActionPlanningStep";
import { IntroductionStep } from "./IntroductionStep";
import { Header } from "./Header";
import { ProgressBar } from "./ProgressBar";
import { submitAssessment } from "@/lib/client-api";


interface AssessmentFlowProps {
  onComplete: (data: AssessmentData) => void;
  showHeader?: boolean; // Optional prop to control header visibility
}

type State = AssessmentData & { currentStep: number };

type Action =
  | {
      type: "updateDemographics";
      field: keyof Demographics;
      value: string | boolean;
    }
  | {
      type: "updateSectionResponse";
      sectionKey: string;
      questionIndex: number;
      value: number;
    }
  | { type: "updateActionPlanning"; field: keyof ActionPlanning; value: string }
  | { type: "setStep"; step: number };

const initialState: State = {
  demographics: { 
    companySize: "", 
    industry: "", 
    industryOther: "",
    hasStrategy: "", 
    strategyLastReviewed: "", 
    name: "", 
    company: "",
    email: "", 
    consent: false 
  },
  sections: {},
  actionPlanning: {},
  currentStep: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateDemographics":
      return {
        ...state,
        demographics: { ...state.demographics, [action.field]: action.value },
      };
    case "updateSectionResponse": {
      const prevSection = state.sections[action.sectionKey] || {
        questions: [],
      };
      const questions = [...(prevSection.questions || [])];
      questions[action.questionIndex] = action.value;
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.sectionKey]: { ...prevSection, questions },
        },
      };
    }
    // updateSectionComment case removed
    case "updateActionPlanning":
      return {
        ...state,
        actionPlanning: {
          ...state.actionPlanning,
          [action.field]: action.value,
        },
      };
    case "setStep":
      return { ...state, currentStep: action.step };
    default:
      return state;
  }
}

const sections = [
  {
    key: "alignment",
    title: "Alignment to Business Strategy",
    description:
      "Ensuring that learning initiatives directly support key organizational goals, priorities, and KPIs.",
    questions: [
      "Does your learning strategy directly support key business goals?",
      "Are learning initiatives tied to performance metrics and KPIs?",
      "Do you have regular conversations with executive stakeholders?",
      "Is your learning strategy updated in response to changes in business direction?",
      "Do business leaders see L&D as a strategic enabler?",
    ],
  },
  {
    key: "governance",
    title: "Learning Governance",
    description:
      "Establishing decision-making structures and enterprise-level prioritization for learning investments and initiatives.",
    questions: [
      "Is there a cross-functional governance body overseeing learning strategy?",
      "Are there clear decision rights and accountability structures?",
      "Are learning initiatives prioritized at an enterprise level?",
      "Are governance practices reviewed and updated regularly?",
      "Are stakeholders from across the organization involved in governance?",
    ],
  },
  {
    key: "technology",
    title: "Technology and Ecosystem Integration",
    description:
      "Connecting your learning platforms, tools, systems and data to create a seamless and scalable learning environment.",
    questions: [
      "Are your platforms integrated (LMS, LXP, content library, analytics)?",
      "Is learner data used to drive personalization?",
      "Do you have a strategy for AI and automation in learning?",
      "Are learning technologies user-friendly and widely adopted?",
      "Is there a roadmap for evolving your learning tech stack?",
    ],
  },
  {
    key: "content",
    title: "Content and Experience Strategy",
    description:
      "Designing engaging, inclusive, and strategic learning experiences aligned to learner needs and business outcomes.",
    questions: [
      "Do you have a defined content strategy and taxonomy?",
      "Is content regularly curated and updated?",
      "Is learning accessible, inclusive, and engaging?",
      "Is learning content aligned to critical skills and roles?",
      "Is there a blend of modalities (video, social, interactive, etc.)?",
    ],
  },
  {
    key: "measurement",
    title: "Measurement and Analytics",
    description:
      "Capturing learning outcomes and using data to drive decisions to inform strategy and decision making.",
    questions: [
      "Do you track more than just completions and satisfaction?",
      "Are learning outcomes tied to business impact?",
      "Do you have dashboards that inform strategic decisions?",
      "Is data used to continuously improve programs?",
      "Are learning metrics communicated clearly to leadership?",
    ],
  },
  {
    key: "culture",
    title: "Culture and Change Readiness",
    description:
      "Embedding learning into the culture ensuring people are equipped and motivated to grow and adapt.",
    questions: [
      "Is learning embedded in the company culture?",
      "Are leaders modeling continuous learning?",
      "Is learning connected to performance and growth conversations?",
      "Do employees feel supported and encouraged to learn?",
      "Is learning a component of change initiatives and transformation?",
    ],
  },
] as const;

const likertOptions = [
  {
    value: 1,
    label: "Not Yet in Place",
    description: "No formal efforts or practices are currently in place.",
  },
  {
    value: 2,
    label: "Early Development",
    description:
      "Some initial steps have been taken, but efforts are limited or informal.",
  },
  {
    value: 3,
    label: "Inconsistent Practice",
    description:
      "Practices are present but applied unevenly across the organization.",
  },
  {
    value: 4,
    label: "Consistently Applied",
    description:
      "Practices are well established and applied reliably across teams or functions.",
  },
  {
    value: 5,
    label: "Fully Mature",
    description:
      "Practices are embedded, optimized, and inform ongoing strategic evolution.",
  },
];

export default function AssessmentFlow({ onComplete, showHeader = false }: AssessmentFlowProps) {
  // Check URL parameters for header visibility using shared utility
  const [headerVisible, setHeaderVisible] = useState<boolean>(showHeader);
  
  // Effect to check for URL parameters on client-side
  useEffect(() => {
    // Use the shared header visibility utility
    const showHeaderFromUrl = shouldShowHeader();
    
    // Update header visibility based on URL parameter or prop
    setHeaderVisible(showHeaderFromUrl || showHeader);
  }, [showHeader]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const totalSteps = 1 + sections.length + 1 + 1; // introduction + each dimension + action planning + demographics

  const goNext = useCallback(() => {
    if (state.currentStep < totalSteps - 1) {
      dispatch({ type: "setStep", step: state.currentStep + 1 });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  }, [state.currentStep, totalSteps]);

  const goPrev = useCallback(() => {
    if (state.currentStep > 0) {
      dispatch({ type: "setStep", step: state.currentStep - 1 });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  }, [state.currentStep]);

  const canProceed = useCallback(() => {
    if (state.currentStep === 0) {
      // Introduction step - always allow proceeding
      return true;
    }
    // Action Planning step is now after all sections
    if (state.currentStep === sections.length + 1) {
      // Always allow proceeding from Action Planning
      return true;
    }
    // Demographics step is now at the end - ALL fields are optional
    if (state.currentStep === totalSteps - 1) {
      // Everything is optional except for the consent validation
      
      // If consent is checked, then name and email are required
      const consentValidation = !state.demographics.consent || 
                               (state.demographics.consent && !!state.demographics.name && !!state.demographics.email);
      
      // If industry is "Other", then industryOther should be provided
      const industryValidation = state.demographics.industry !== "Other" || 
                               (state.demographics.industry === "Other" && !!state.demographics.industryOther);
      
      return consentValidation && industryValidation;
    }
    if (state.currentStep > 0 && state.currentStep <= sections.length) {
      const sectionKey = sections[state.currentStep - 1].key;
      const sectionData = state.sections[sectionKey];
      return (
        sectionData &&
        Array.isArray(sectionData.questions) &&
        sectionData.questions.filter((q) => q !== undefined).length === 5
      );
    }
    return true;
  }, [state, totalSteps]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare the data
      const processedData: AssessmentData = {
        demographics: state.demographics,
        sections: Object.fromEntries(
          Object.entries(state.sections).map(([key, section]) => [
            key,
            {
              questions: section.questions,
            },
          ])
        ),
        actionPlanning: state.actionPlanning,
      };
      
      // Submit to Airtable
      const result = await submitAssessment(processedData);
      
      if (result.success) {
        toast.success("Assessment submitted successfully!");
        // Pass the data to the parent component
        onComplete(processedData);
      } else {
        setSubmitError(result.error || "Failed to submit assessment");
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setSubmitError("An unexpected error occurred");
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [state, onComplete]);

  return (
    <div className="min-h-screen bg-gray-50">
      {headerVisible && (
        <Header currentStep={state.currentStep} totalSteps={totalSteps} />
      )}
      <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />

      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {state.currentStep === 0 && (
          <IntroductionStep />
        )}

        {state.currentStep > 0 && state.currentStep <= sections.length && (
          <SectionStep
            section={sections[state.currentStep - 1] as any}
            sectionData={state.sections[sections[state.currentStep - 1].key]}
            likertOptions={likertOptions}
            onResponse={(qIndex, value) =>
              dispatch({
                type: "updateSectionResponse",
                sectionKey: sections[state.currentStep - 1].key,
                questionIndex: qIndex,
                value,
              })
            }
            /* onComment prop removed */
            dimensionNumber={state.currentStep}
          />
        )}

        {/* Action Planning step comes after all sections and before demographics */}
        {state.currentStep === sections.length + 1 && (
          <ActionPlanningStep
            actionPlanning={state.actionPlanning}
            onChange={(field, value) =>
              dispatch({ type: "updateActionPlanning", field, value })
            }
          />
        )}

        {/* Demographics step now comes at the end */}
        {state.currentStep === totalSteps - 1 && (
          <DemographicsStep
            demographics={state.demographics}
            onChange={(field, value) =>
              dispatch({ type: "updateDemographics", field, value })
            }
          />
        )}

        <div className="flex justify-between items-center mt-12 pt-8">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={state.currentStep === 0}
            className="px-8 py-4 text-lg font-semibold rounded-xl border-slate-300 hover:bg-slate-50 disabled:opacity-50 bg-transparent"
          >
            Previous
          </Button>

          {state.currentStep < totalSteps - 1 ? (
            <Button
              onClick={goNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-coral-200 hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              Continue
            </Button>
          ) : (
            <div className="flex flex-col items-end">
              {submitError && (
                <div className="text-red-500 text-sm mb-2">
                  {submitError} Please try again.
                </div>
              )}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-coral-200 hover:shadow-xl transition-all duration-200 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Complete Assessment"
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
