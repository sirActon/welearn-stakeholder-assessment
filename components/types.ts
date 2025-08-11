// types.ts
export interface SectionResponse {
  questions: number[]; // expected fixed length (e.g., 5)
}

export interface Demographics {
  companySize: string;
  industry: string;
  industryOther: string;
  hasStrategy: string;
  strategyLastReviewed: string;
  name: string;
  company: string;
  email: string;
  consent: boolean;
}

export interface ActionPlanning {
  priorityAreas?: string;
  quickWins?: string;
  strategicShifts?: string;
  stakeholders?: string;
  successMetrics?: string;
  [key: string]: string | undefined;
}

export interface AssessmentData {
  demographics: Demographics;
  sections: Record<string, SectionResponse>;
  actionPlanning: ActionPlanning;
  submissionId?: string; // Unique identifier for the assessment submission
}
