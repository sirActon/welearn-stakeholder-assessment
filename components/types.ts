// types.ts
export interface SectionResponse {
  questions: number[]; // expected fixed length (e.g., 5)
}

export interface Demographics {
  name: string;
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
}
