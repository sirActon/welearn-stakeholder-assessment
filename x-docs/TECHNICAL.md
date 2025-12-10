# Stakeholder Perception Scorecard - Technical Documentation

## Tech Stack

| Layer                | Technology                      |
| -------------------- | ------------------------------- |
| **Framework**        | Next.js 15.2.6 (App Router)     |
| **Language**         | TypeScript                      |
| **UI Components**    | shadcn/ui (Radix UI primitives) |
| **Styling**          | Tailwind CSS                    |
| **State Management** | React useReducer + useState     |
| **PDF Generation**   | @react-pdf/renderer             |
| **Database**         | Airtable                        |
| **CRM Integration**  | HubSpot Forms API               |
| **Deployment**       | Vercel (recommended)            |

## Project Structure

```
welearn-scorecard/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main entry point & state machine
│   ├── layout.tsx                # Root layout with fonts
│   ├── generate-pdf/             # PDF generation route
│   └── api/
│       ├── submit-assessment/    # Assessment submission endpoint
│       └── test-airtable/        # Airtable connection test
├── components/
│   ├── landing-page.tsx          # Marketing/intro page
│   ├── assessment-flow.tsx       # Main assessment orchestrator
│   ├── IntroductionStep.tsx      # Assessment intro with accordions
│   ├── SectionStep.tsx           # Individual dimension questions
│   ├── DemographicsStep.tsx      # Contact & context collection
│   ├── results-page.tsx          # Score summary (legacy)
│   ├── personalized-report.tsx   # Detailed results & recommendations
│   ├── thank-you.tsx             # Company mode completion
│   ├── ReportPDF.tsx             # PDF document template
│   ├── Header.tsx                # Assessment header
│   ├── ProgressBar.tsx           # Step progress indicator
│   ├── types.ts                  # Shared TypeScript interfaces
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── assessment-data.ts        # Questions & Likert scale definitions
│   ├── recommendations.ts        # Score-based recommendation logic
│   ├── airtable.ts               # Airtable API integration
│   ├── client-api.ts             # Frontend API client
│   ├── header-utils.ts           # Embed mode detection
│   ├── id-generator.ts           # Submission ID generation
│   └── utils.ts                  # Utility functions (cn, etc.)
└── public/
    └── logo.png                  # WeLearn logo
```

## Core Concepts

### Application State Machine

The app uses a simple state machine in `app/page.tsx`:

```typescript
type Step = "landing" | "assessment" | "results" | "report" | "thanks";
```

**Flow:**

1. `landing` → User clicks "Start Assessment"
2. `assessment` → User completes all questions
3. `report` → Results calculated and displayed (skips `results` step)
4. `thanks` → Company mode completion acknowledgment

### Assessment Data Structure

```typescript
interface AssessmentData {
  demographics: Demographics; // User context & contact info
  sections: Record<string, SectionResponse>; // Question responses by section
  submissionId?: string; // Unique identifier
  companyRecordId?: string; // Optional company linkage
}

interface SectionResponse {
  questions: number[]; // Array of 5 scores (1-5)
}
```

### Scoring Logic

Located in `app/page.tsx`:

```typescript
// Calculate section scores
Object.entries(data.sections).forEach(([sectionKey, sectionData]) => {
  const sectionScore = sectionData.questions.reduce(
    (sum, score) => sum + score,
    0
  );
  sectionScores[sectionKey] = sectionScore; // Max 25 per section
  totalScore += sectionScore; // Max 150 total
});

// Determine maturity level
if (totalScore <= 74) maturityLevel = "Reactive";
else if (totalScore <= 104) maturityLevel = "Operational";
else if (totalScore <= 129) maturityLevel = "Strategic";
else maturityLevel = "Transformational";
```

### Recommendations Engine

`lib/recommendations.ts` provides two types of recommendations:

1. **Section-specific** - Based on individual dimension scores (6-14, 15-22, 23-30 ranges)
2. **Maturity-level** - General guidance based on overall classification

```typescript
function getSectionRecommendation(
  sectionKey: string,
  sectionScore: number
): string;
```

## Key Components

### AssessmentFlow (`components/assessment-flow.tsx`)

The main assessment orchestrator using `useReducer` for state management:

- **Actions:** `updateDemographics`, `updateSectionResponse`, `setStep`
- **Validation:** `canProceed()` checks if current step is complete
- **Navigation:** `goNext()`, `goPrev()` with scroll-to-top behavior
- **Submission:** Async submission to Airtable with error handling

### SectionStep (`components/SectionStep.tsx`)

Renders a single dimension with 5 questions:

- Radio button groups for Likert scale selection
- Visual feedback for selected options
- Optional descriptor hiding for embedded mode

### PersonalizedReport (`components/personalized-report.tsx`)

Comprehensive results display:

- Score visualization with progress bars
- Maturity level badge and description
- Section-by-section recommendations
- PDF download button (opens in new tab)

### ReportPDF (`components/ReportPDF.tsx`)

PDF document generation using @react-pdf/renderer:

- Branded header with logo
- Score summary and maturity level
- Section breakdown with recommendations
- Footer with generation date

## API Routes

### POST `/api/submit-assessment`

Handles assessment submission:

1. Validates consent requirements
2. Submits to Airtable via `submitAssessmentToAirtable()`
3. Optionally submits to HubSpot if email provided
4. Returns record ID on success

**Request Body:** `AssessmentData`

**Response:**

```json
{
  "success": true,
  "recordId": "rec...",
  "message": "Assessment data submitted successfully",
  "hubspot": { "ok": true, "status": 200 }
}
```

### Airtable Integration (`lib/airtable.ts`)

Transforms assessment data into Airtable field format:

- Flattens nested section scores into individual fields
- Maps demographics to corresponding columns
- Handles company record linkage

## Embed Mode

The app supports embedding via URL parameters:

| Parameter             | Purpose                                                   |
| --------------------- | --------------------------------------------------------- |
| `?company=<recordId>` | Links responses to a company record, shows thank-you page |
| `?showHeader=true`    | Forces header visibility                                  |
| `?embedded=true`      | Hides header and progress bar                             |

Detection utilities in `lib/header-utils.ts`:

```typescript
function isEmbedded(): boolean;
function shouldShowHeader(): boolean;
```

## Environment Variables

```env
# Airtable
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_NAME=Assessments

# HubSpot (optional)
HUBSPOT_PORTAL_ID=8668897
HUBSPOT_FORM_ID=cabcfef2-...
HUBSPOT_GDPR_ENABLED=true
HUBSPOT_SUBSCRIPTION_TYPE_ID=...

# Site
NEXT_PUBLIC_SITE_URL=https://www.learningstrategyscorecard.com
```

## Styling

### Brand Colors

Primary brand color (Vivid Orange): `#ee5732`

Tailwind `coral` color scale in `tailwind.config.ts`:

```typescript
coral: {
  50: "#fef5f2",
  500: "#ee5732",  // Primary
  600: "#d64421",
  // ... full scale 50-900
}
```

### UI Patterns

- **Cards** with rounded corners (`rounded-2xl`, `rounded-3xl`)
- **Gradients** for CTAs (`bg-gradient-to-r from-coral-500 to-coral-600`)
- **Shadows** for depth (`shadow-xl shadow-slate-200/50`)
- **Backdrop blur** for headers (`backdrop-blur-sm`)

## PDF Generation

The `/generate-pdf` route renders `ReportPDF` component:

1. Receives assessment data via URL query parameter (base64 encoded)
2. Renders PDF in browser using @react-pdf/renderer
3. User can download or print

**Note:** PDF generation happens client-side to avoid server memory issues with large documents.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing Airtable Connection

Visit `/api/test-airtable` to verify Airtable configuration is working correctly.
