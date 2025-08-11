import { NextResponse } from 'next/server';
import type { AssessmentData } from '@/components/types';
import { submitAssessmentToAirtable } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const assessmentData: AssessmentData = await request.json();
    
    // Validate the data - all fields are optional except consent validation
    // If consent is given, name and email must be provided
    if (assessmentData.demographics?.consent && 
        (!assessmentData.demographics?.name || !assessmentData.demographics?.email)) {
      return NextResponse.json(
        { error: 'Name and email are required when consent is given' },
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
    
    // Send more detailed error information back to the client for debugging
    return NextResponse.json(
      {
        error: 'Failed to submit assessment',
        message: error.message || 'Unknown error occurred',
        stack: error.stack,
        name: error.name,
        details: JSON.stringify(error),
      },
      { status: error.status || 500 }
    );
  }
}
