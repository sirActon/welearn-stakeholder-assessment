import { NextResponse } from 'next/server';
import type { AssessmentData } from '@/components/types';
import { submitAssessmentToAirtable } from '@/lib/airtable';

async function submitToHubSpot(
  assessmentData: AssessmentData,
  req: Request
) {
  try {
    const portalId = process.env.HUBSPOT_PORTAL_ID || '8668897';
    const formGuid = process.env.HUBSPOT_FORM_ID || 'cabcfef2-b350-4888-b5d8-c17fa8ed966c';
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const email = assessmentData.demographics?.email?.trim();
    if (!email) return { ok: false, skipped: true, reason: 'no-email' };

    const name = assessmentData.demographics?.name || '';
    const company = assessmentData.demographics?.company || '';

    // Extract HubSpot tracking cookie (hubspotutk) if present
    const cookieHeader = req.headers.get('cookie') || '';
    const hutkMatch = cookieHeader.match(/hubspotutk=([^;]+)/);
    const hutk = hutkMatch ? decodeURIComponent(hutkMatch[1]) : undefined;

    const referer = req.headers.get('referer') || undefined;

    const body = {
      submittedAt: Date.now(),
      fields: [
        { name: 'email', value: email },
        ...(name ? [{ name: 'firstname', value: name }] : []),
        ...(company ? [{ name: 'company', value: company }] : []),
      ],
      context: {
        hutk,
        pageUri: referer,
        pageName: 'Learning Strategy Scorecard',
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: Boolean(assessmentData.demographics?.consent),
          text: 'I agree to allow WeLearn to store and process my personal data.',
          communications: [
            {
              value: Boolean(assessmentData.demographics?.consent),
              subscriptionTypeId: 999, // Placeholder; not required but structure kept
              text: 'I agree to receive communications from WeLearn.'
            }
          ]
        }
      }
    } as any;

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json().catch(() => ({}));
    return { ok: resp.ok, status: resp.status, data };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'unknown-error' };
  }
}

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

    // Best-effort HubSpot form submission when an email is provided
    let hubspot: any = null;
    if (assessmentData.demographics?.email) {
      hubspot = await submitToHubSpot(assessmentData, request);
      if (!hubspot?.ok) {
        console.warn('HubSpot submission failed or skipped:', hubspot);
      }
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      recordId: result.records[0].id,
      message: 'Assessment data submitted successfully',
      hubspot: hubspot || { skipped: true }
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
