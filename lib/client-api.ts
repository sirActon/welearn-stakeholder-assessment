import type { AssessmentData } from '@/components/types';

/**
 * Submits the assessment data to the backend API
 * @param assessmentData The completed assessment data to submit
 * @returns The response from the API with success status and record ID
 */
export async function submitAssessment(assessmentData: AssessmentData): Promise<{
  success: boolean;
  recordId?: string;
  error?: string;
  message?: string;
}> {
  try {
    const response = await fetch('/api/submit-assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to submit assessment',
        message: data.message || 'An error occurred while submitting your assessment',
      };
    }

    return {
      success: true,
      recordId: data.recordId,
      message: data.message || 'Assessment submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return {
      success: false,
      error: 'Network or server error',
      message: 'Could not connect to the server. Please try again later.',
    };
  }
}
