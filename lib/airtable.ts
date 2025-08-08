import type { AssessmentData } from "@/components/types";

// Mapping of question indexes to field IDs for each section
const FIELD_ID_MAPPING = {
  alignment: {
    questions: [
      "fldfGoESvnORT6lSm",
      "fldr0evRPWhnXlwkZ",
      "fldpK0YT2Czn9CgdB",
      "fldh2hke4QzP6BZvh",
      "fldYSqbpZhsbgUeXW",
    ],
  },
  governance: {
    questions: [
      "fldmDer24p3YQZOGQ",
      "fldb0oi5B85eNhTu8",
      "fldLY3nbcjipMncKm",
      "fldoXEf1LUSYOUqLu",
      "fldlvBEjb1HzigZsf",
    ],
  },
  technology: {
    questions: [
      "fldRtmJTzo4RoThkF",
      "fldNtLvIeL1pWGoLb",
      "fldXbCiHNW2PX3KHM",
      "fldIstntoIuaF0Ivy",
      "fldrLFmAbG5QPZ8iJ",
    ],
  },
  content: {
    questions: [
      "fldB3nH25QIZT7MoK",
      "fldVC1LhMgZA0LPLP",
      "fldLNsMXziWGF51Em",
      "flduex9kx8Y5NI3ux",
      "fldcmcELmymzWqRe0",
    ],
  },
  measurement: {
    questions: [
      "fldAEb4DqTqnQTBfS",
      "fld4wXhLaDJCaqGTd",
      "fldcADG1l28z2mGvK",
      "fldJ5bzvd3VPunhKg",
      "fldEsTyB0MrQeaVlU",
    ],
  },
  culture: {
    questions: [
      "fld0PCASZQQssZ5jZ",
      "fldQEHlpj610sum8S",
      "fldAibk1raCWW6GR0",
      "fld3igmes4V5aGdup",
      "fldXJUihfzHwcX5pw",
    ],
  },
};

// Fields for demographics and summary data
const FIELD_IDS = {
  demographics: {
    name: "fldNptclsp9416arf",
    email: "fld7jcYxfQQCfhUWI",
    companyName: "fldIGBJlDMIgtP3ms",
    companySize: "fld2jQmNSZ6wfsBmT",
    industry: "fldiJW8GV8t5d7fux",
    lastModifiedYear: "fldZPAsLHiHsUet6",
  },
  summary: {
    totalScore: "fldAlU8EvL3hV7C2c",
    maturityLevel: "fldwR6IcwXFej9Pzm",
  },
  actionPlanning: {
    priorityAreas: "flddZORL2bGfzixG3",
    quickWins: "fldsLXUc0JkfDOeYw",
    strategicShifts: "fldsCY8G1g4LY6Mdo",
    stakeholders: "fldTxUp9g9q6q1yDg",
    successMetrics: "fldlda1IgYKZTeZdT",
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
  const { demographics, sections, actionPlanning } = assessmentData;

  // Calculate total score
  let totalScore = 0;
  let fieldsToSubmit: Record<string, any> = {};

  // Add demographics fields
  fieldsToSubmit[FIELD_IDS.demographics.name] = demographics.name;
  fieldsToSubmit[FIELD_IDS.demographics.email] = demographics.email;

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

  // Add action planning fields
  // Handle multi-select fields - only add if there are non-empty values
  if (
    actionPlanning.priorityAreas &&
    actionPlanning.priorityAreas.trim() !== "None"
  ) {
    const areas = actionPlanning.priorityAreas
      .split(",")
      .map((s) => s.trim())
      .filter((area) => area && area !== "None");

    if (areas.length > 0) {
      fieldsToSubmit[FIELD_IDS.actionPlanning.priorityAreas] = areas;
    }
  }

  // Handle text fields - only add if non-empty
  if (actionPlanning.quickWins && actionPlanning.quickWins.trim() !== "None") {
    fieldsToSubmit[FIELD_IDS.actionPlanning.quickWins] =
      actionPlanning.quickWins;
  }

  if (
    actionPlanning.strategicShifts &&
    actionPlanning.strategicShifts.trim() !== "None"
  ) {
    fieldsToSubmit[FIELD_IDS.actionPlanning.strategicShifts] =
      actionPlanning.strategicShifts;
  }

  // Handle another multi-select field
  if (
    actionPlanning.stakeholders &&
    actionPlanning.stakeholders.trim() !== "None"
  ) {
    const stakeholders = actionPlanning.stakeholders
      .split(",")
      .map((s) => s.trim())
      .filter((person) => person && person !== "None");

    if (stakeholders.length > 0) {
      fieldsToSubmit[FIELD_IDS.actionPlanning.stakeholders] = stakeholders;
    }
  }

  if (
    actionPlanning.successMetrics &&
    actionPlanning.successMetrics.trim() !== "None"
  ) {
    fieldsToSubmit[FIELD_IDS.actionPlanning.successMetrics] =
      actionPlanning.successMetrics;
  }

  // Get environment variables
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID_SUBMISSIONS;
  const apiUrl = process.env.AIRTABLE_API_URL || "https://api.airtable.com/v0";
  // Force enable typecast to help with field type conversion
  const typecast = true;
  const requestTimeoutMs = parseInt(
    process.env.AIRTABLE_REQUEST_TIMEOUT_MS || "10000",
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
    const response = await fetch(`${apiUrl}/${baseId}/${tableId}`, {
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
