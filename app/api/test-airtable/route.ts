import { NextResponse } from 'next/server';

/**
 * Simple route to test Airtable API connectivity
 * This makes a GET request to list records, which requires less permissions than creating records
 */
export async function GET() {
  // Get environment variables
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID_SUBMISSIONS;
  const apiUrl = process.env.AIRTABLE_API_URL || 'https://api.airtable.com/v0';
  
  // Check if required variables are set
  if (!apiKey || !baseId || !tableId) {
    return NextResponse.json(
      { 
        error: 'Missing Airtable configuration',
        missingVars: {
          apiKey: !apiKey,
          baseId: !baseId,
          tableId: !tableId
        }
      },
      { status: 500 }
    );
  }
  
  try {
    // Log what we're about to do (will show in server logs)
    console.log('Testing Airtable connection with:');
    console.log('- API URL:', `${apiUrl}/${baseId}/${tableId}`);
    console.log('- Base ID:', baseId);
    console.log('- Table ID:', tableId);
    console.log('- API Key (first 5 chars):', apiKey.substring(0, 5) + '...');
    
    // Make a simple GET request to list records (first page only)
    const response = await fetch(`${apiUrl}/${baseId}/${tableId}?maxRecords=1`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });
    
    // If the response is not OK, return the error
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API test error:', errorData);
      return NextResponse.json(
        { 
          success: false, 
          error: errorData,
          status: response.status,
          statusText: response.statusText,
          requestDetails: {
            url: `${apiUrl}/${baseId}/${tableId}?maxRecords=1`,
            baseId,
            tableId
          }
        },
        { status: response.status }
      );
    }
    
    // Return success and the first record (if any)
    const result = await response.json();
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Airtable API',
      recordCount: result.records?.length || 0,
      tableExists: true,
      // Show partial record data for verification
      sampleRecord: result.records?.length > 0 ? {
        id: result.records[0].id,
        fieldCount: Object.keys(result.records[0].fields).length
      } : null
    });
    
  } catch (error: any) {
    console.error('Error testing Airtable connection:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
