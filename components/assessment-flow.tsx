// AssessmentFlow.tsx
"use client";

import React, { useReducer, useCallback, useState, useEffect } from "react";
import { shouldShowHeader, isEmbedded } from "@/lib/header-utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type {
  AssessmentData,
  Demographics,
  ActionPlanning,
  SectionResponse,
} from "./types";
import { DemographicsStep } from "./DemographicsStep";
import { SectionStep } from "./SectionStep";
// Action planning step removed
import { IntroductionStep } from "./IntroductionStep";
import { Header } from "./Header";
import { ProgressBar } from "./ProgressBar";
import { submitAssessment } from "@/lib/client-api";
import { generateSubmissionId } from "@/lib/id-generator";
import { sections, likertOptions } from "@/lib/assessment-data";

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
  // Action planning action type removed
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
    consent: false,
  },
  sections: {},
  // actionPlanning removed
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
    // Action planning case removed
    case "setStep":
      return { ...state, currentStep: action.step };
    default:
      return state;
  }
}

// sections and likertOptions are now imported from '@/lib/assessment-data'

export default function AssessmentFlow({
  onComplete,
  showHeader = false,
}: AssessmentFlowProps) {
  // Check URL parameters for header visibility using shared utility
  const [headerVisible, setHeaderVisible] = useState<boolean>(showHeader);
  const embedded = isEmbedded();

  // Effect to check for URL parameters on client-side
  useEffect(() => {
    // Use the shared header visibility utility
    const showHeaderFromUrl = shouldShowHeader();

    // Update header visibility based on URL parameter or prop
    setHeaderVisible(!isEmbedded() && (showHeaderFromUrl || showHeader));
  }, [showHeader]);
  const [state, dispatch] = useReducer(reducer, initialState);
  // Demographics step is hidden for now - will be re-enabled when confirmed
  const showDemographics = false;
  const totalSteps = 1 + sections.length + (showDemographics ? 1 : 0); // introduction + each dimension + optional demographics

  // Read optional company record ID from URL (?company=<recordId>)
  const companyRecordId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("company") || undefined
      : undefined;

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
    // Action Planning step has been removed
    // Demographics step is now at the end - ALL fields are optional (when enabled)
    if (showDemographics && state.currentStep === totalSteps - 1) {
      // Everything is optional except for the consent validation

      // If consent is checked, then name and email are required
      const consentValidation =
        !state.demographics.consent ||
        (state.demographics.consent &&
          !!state.demographics.name &&
          !!state.demographics.email);

      // If industry is "Other", then industryOther should be provided
      const industryValidation =
        state.demographics.industry !== "Other" ||
        (state.demographics.industry === "Other" &&
          !!state.demographics.industryOther);

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
      // Generate a submission ID
      const submissionId = generateSubmissionId();

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
        // Action planning removed
        submissionId, // Add the submission ID
        // Include company linkage if provided via URL
        ...(companyRecordId ? { companyRecordId } : {}),
      };

      // Submit to Airtable database
      const result = await submitAssessment(processedData);

      if (result.success) {
        toast.success("Assessment submitted successfully!");
        // Pass the data to the parent component
        onComplete(processedData);
      } else {
        // Log detailed error information for debugging
        console.error("Submission error details:", result);

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
  }, [state, onComplete, companyRecordId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {headerVisible && (
        <Header currentStep={state.currentStep} totalSteps={totalSteps} />
      )}
      {!embedded && (
        <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />
      )}

      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {state.currentStep === 0 && <IntroductionStep />}

        {state.currentStep > 0 && state.currentStep <= sections.length && (
          <SectionStep
            key={sections[state.currentStep - 1].key}
            section={sections[state.currentStep - 1] as any}
            sectionData={state.sections[sections[state.currentStep - 1].key]}
            likertOptions={likertOptions}
            hideDescriptors={embedded}
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

        {/* Demographics step now comes at the end (when enabled) */}
        {showDemographics && state.currentStep === totalSteps - 1 && (
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
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
