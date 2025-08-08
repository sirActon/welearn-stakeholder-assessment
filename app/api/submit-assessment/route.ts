import { NextResponse } from 'next/server';
import type { AssessmentData } from '@/components/types';
import { submitAssessmentToAirtable } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const assessmentData: AssessmentData = await request.json();
    
    // Validate the data
    if (!assessmentData.demographics?.name || !assessmentData.demographics?.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email' },
        { status: 400 }
      );
    }
    
    // Submit the data to Airtable
    const result = await submitAssessmentToAirtable(assessmentData);
    
    // Return success response
    return NextResponse.json({
      success: true,
      recordId: result.records[0].id,
      message: 'Assessment data submitted successfully'
    });
    
  } catch (error: any) {
    console.error('Error submitting assessment data:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to submit assessment',
        message: error.message || 'Unknown error occurred'
      },
      { status: error.status || 500 }
    );
  }
}
