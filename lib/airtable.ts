import type { AssessmentData } from "@/components/types";

// Mapping of question indexes to field IDs for each section
// Updated for Stakeholders table (tblKgK6Iw1AwfYsA7)
const FIELD_ID_MAPPING = {
  alignment: {
    questions: [
      "fldtLfcP8yNtbbTl8", // Alignment_Q1_Understands_Goals
      "fldtl6B3GE8XVJiSv", // Alignment_Q2_Supports_Performance
      "flddq3oRctdymtrQE", // Alignment_Q3_Proactive_Engagement
      "fldSvEhNrPX2oUkle", // Alignment_Q4_Adapts_Plans
      "fldcxaoQVjA63ZRoQ", // Alignment_Q5_Strategic_Enabler
    ],
  },
  governance: {
    questions: [
      "fldNRWlaQHaUtk7Zi", // Governance_Q1_Clear_Priorities
      "fld2xx8AbYQqdRr1A", // Governance_Q2_Decision_Rights
      "fldH3w467cLmntTyi", // Governance_Q3_Coordinated_Investments
      "fldYxdL6jUa62ErFX", // Governance_Q4_Stakeholder_Involvement
      "fldGKfxoCHcS15Sdp", // Governance_Q5_Efficient_Processes
    ],
  },
  technology: {
    questions: [
      "fldq3Dm59QGnr6hDM", // Technology_Q1_Easy_Platforms
      "fldtwulTbfL1wYraN", // Technology_Q2_Connected_Ecosystem
      "fldCeEDzLCKS1izgo", // Technology_Q3_Workflow_Friendly
      "fldVzY9MkHyZkEm2r", // Technology_Q4_Meaningful_Data
      "fldIVDETXNpV94KLM", // Technology_Q5_Modern_Approaches
    ],
  },
  content: {
    questions: [
      "fldv5r7s28BZcjXQL", // Content_Q1_Relevant
      "fldeiy4m889fx7AZR", // Content_Q2_Engaging_Practical
      "fldKmIiaKxXOZ5BeB", // Content_Q3_Current_Refreshed
      "fldTjEcQfMIDcY0yG", // Content_Q4_Accessible_Inclusive
      "fldvMlNnt7mXPnDxc", // Content_Q5_Format_Mix
    ],
  },
  measurement: {
    questions: [
      "fldoUOO3b8DlSqCwM", // Measurement_Q1_Beyond_Completions
      "fldIRz3jL0NU7WIhU", // Measurement_Q2_Business_Outcomes
      "fldhhmkXIkk1OzCGQ", // Measurement_Q3_Decision_Insights
      "fldJnzrmrEMNgcbWk", // Measurement_Q4_Continuous_Improvement
      "fldeuBJgIWw1dzjNV", // Measurement_Q5_Clear_Communication
    ],
  },
  culture: {
    questions: [
      "fldzw81AzKf4SFRuT", // Culture_Q1_Continuous_Learning
      "fld2Kz88WG8NQ9UOA", // Culture_Q2_Leader_Support
      "fldv9nZrgm5y7XJT3", // Culture_Q3_Performance_Integration
      "fldARqmdK34pIO2yq", // Culture_Q4_Employee_Encouraged
      "fldk0izL1SjTMiIMX", // Culture_Q5_Change_Role
    ],
  },
};

// Fields for demographics and summary data
// Updated for Stakeholders table (tblKgK6Iw1AwfYsA7)
const FIELD_IDS = {
  demographics: {
    name: "fldw6h6hsl13Edvi1", // Name
    email: "fldJZJCNAPUM987a3", // Email
    companyName: "fld5bPOZCavkwSp90", // Company_Name
    companySize: "fldTpwGhvZ1fOxnU9", // Company_Size
    industry: "fldOaPixLCkAIv0WP", // Industry
    // Note: industryOther, hasStrategy, strategyLastReviewed not in new table
  },
  summary: {
    totalScore: "fldFpbxv8kVRcb22q", // Total_Score
    maturityLevel: "fldJGyC6pOSDDjNRS", // Perception_Level
    submissionId: "fldT0BEv03eWWRRJx", // Submission_ID
  },
  links: {
    // Linked Company field on Stakeholders table
    company: "fldFn6uHI8jhJ6xSz",
  },
};

export function calculateMaturityLevel(totalScore: number): string {
  if (totalScore <= 74) return "Reactive";
  if (totalScore <= 104) return "Operational";
  if (totalScore <= 129) return "Strategic";
  return "Transformational";
}

export async function submitAssessmentToAirtable(
  assessmentData: AssessmentData
) {
  const { demographics, sections } = assessmentData;

  // Calculate total score
  let totalScore = 0;
  let fieldsToSubmit: Record<string, any> = {};

  // Add demographics fields (only add non-empty values)
  if (demographics.name) {
    fieldsToSubmit[FIELD_IDS.demographics.name] = demographics.name;
  }

  if (demographics.email) {
    fieldsToSubmit[FIELD_IDS.demographics.email] = demographics.email;
  }

  if (demographics.company) {
    fieldsToSubmit[FIELD_IDS.demographics.companyName] = demographics.company;
  }

  if (demographics.companySize) {
    fieldsToSubmit[FIELD_IDS.demographics.companySize] =
      demographics.companySize;
  }

  if (demographics.industry) {
    fieldsToSubmit[FIELD_IDS.demographics.industry] = demographics.industry;
  }

  // Note: industryOther, hasStrategy, strategyLastReviewed fields removed from Stakeholders table

  // Process sections data
  Object.entries(sections).forEach(([sectionKey, sectionData]) => {
    const sectionMapping =
      FIELD_ID_MAPPING[sectionKey as keyof typeof FIELD_ID_MAPPING];

    if (!sectionMapping) {
      console.warn(`No field mapping found for section: ${sectionKey}`);
      return;
    }

    // Add question scores
    sectionData.questions.forEach((score, index) => {
      if (index < sectionMapping.questions.length) {
        const fieldId = sectionMapping.questions[index];
        fieldsToSubmit[fieldId] = score;
        totalScore += score;
      }
    });

    // Comments have been removed from the data model
  });

  // Calculate maturity level
  const maturityLevel = calculateMaturityLevel(totalScore);

  // Add summary fields
  fieldsToSubmit[FIELD_IDS.summary.totalScore] = totalScore;
  fieldsToSubmit[FIELD_IDS.summary.maturityLevel] = maturityLevel;

  // Add submission ID to database
  fieldsToSubmit[FIELD_IDS.summary.submissionId] =
    assessmentData.submissionId || "fldu0yi0EKKvAH2gr";

  // Include linked company if provided
  if (assessmentData.companyRecordId) {
    // Linked record fields accept an array of record IDs
    fieldsToSubmit[FIELD_IDS.links.company] = [assessmentData.companyRecordId];
  }

  // Note: Action planning fields removed from Stakeholders table

  // Get environment variables
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID_SUBMISSIONS;
  const apiUrl = process.env.AIRTABLE_API_URL || "https://api.airtable.com/v0";
  // Force enable typecast to help with field type conversion
  const typecast = true;
  // Increase default timeout to 30 seconds to avoid abort errors
  const requestTimeoutMs = parseInt(
    process.env.AIRTABLE_REQUEST_TIMEOUT_MS || "30000",
    10
  );

  if (!apiKey || !baseId || !tableId) {
    throw new Error("Missing required Airtable configuration");
  }

  // Submit to Airtable
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

  console.log("Submitting to Airtable with:");
  console.log("- API URL:", `${apiUrl}/${baseId}/${tableId}`);
  console.log("- Base ID:", baseId);
  console.log("- Table ID:", tableId);
  console.log("- API Key (first 5 chars):", apiKey.substring(0, 5) + "...");

  try {
    // Add retry logic for more reliable submissions
    let response: Response | undefined;
    let retries = 2;
    let success = false;

    while (retries >= 0 && !success) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          requestTimeoutMs
        );

        response = await fetch(`${apiUrl}/${baseId}/${tableId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [{ fields: fieldsToSubmit }],
            typecast: typecast,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        success = true;
      } catch (err) {
        if (retries === 0) throw err;
        console.log(
          `Airtable request attempt failed, retrying... (${retries} attempts left)`
        );
        retries--;
        // Wait 1 second before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Make sure we have a response before proceeding
    if (!response) {
      throw new Error(
        "Failed to get a response from Airtable after multiple attempts"
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable API error:", errorData);
      console.error("Status:", response.status, response.statusText);
      console.error("Request details:", {
        url: `${apiUrl}/${baseId}/${tableId}`,
        method: "POST",
        headers: {
          Authorization: "Bearer [hidden]",
          "Content-Type": "application/json",
        },
        typecast,
      });

      throw new Error(
        `Airtable API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
