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

    const fullName = (assessmentData.demographics?.name || '').trim();
    const [firstName, ...restName] = fullName.split(/\s+/);
    const lastName = restName.join(' ');
    const company = assessmentData.demographics?.company || '';

    // Extract HubSpot tracking cookie (hubspotutk) if present
    const cookieHeader = req.headers.get('cookie') || '';
    const hutkMatch = cookieHeader.match(/hubspotutk=([^;]+)/);
    const hutk = hutkMatch ? decodeURIComponent(hutkMatch[1]) : undefined;

    const referer = req.headers.get('referer') || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.learningstrategyscorecard.com';

    // Prepare fields using objectTypeId prefixes when the form expects multiple objects
    const fields: Array<{ name: string; value: string }> = [
      { name: '0-1/email', value: email },
      ...(firstName ? [{ name: '0-1/firstname', value: firstName }] : []),
      ...(lastName ? [{ name: '0-1/lastname', value: lastName }] : []),
    ];

    // Company name appears required based on error: "Required field '0-2/name' is missing"
    // Provide a fallback if not supplied
    const companyName = company || 'N/A';
    fields.push({ name: '0-2/name', value: companyName });

    const body: any = {
      submittedAt: Date.now(),
      fields,
      context: {
        hutk,
        pageUri: referer,
        pageName: 'Learning Strategy Scorecard',
      },
    };

    // Only include legal consent block if the user consented AND the form is GDPR-enabled
    if (assessmentData.demographics?.consent && process.env.HUBSPOT_GDPR_ENABLED === 'true') {
      body.legalConsentOptions = {
        consent: {
          consentToProcess: true,
          text: 'I agree to allow WeLearn to store and process my personal data.',
          communications: [
            {
              value: true,
              // If you have a real subscriptionTypeId, set it via env and include it; otherwise omit this field
              ...(process.env.HUBSPOT_SUBSCRIPTION_TYPE_ID
                ? { subscriptionTypeId: Number(process.env.HUBSPOT_SUBSCRIPTION_TYPE_ID) }
                : {}),
              text: 'I agree to receive communications from WeLearn.'
            }
          ]
        }
      };
    }

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.warn('HubSpot error response', {
        status: resp.status,
        message: (data as any)?.message,
        errors: (data as any)?.errors,
        raw: data,
        sentFields: fields,
      });
    }
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
      } else {
        // Success log without PII
        console.info('HubSpot submission succeeded', {
          status: hubspot.status,
          ok: true,
        });
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
