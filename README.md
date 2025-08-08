# WeLearn Assessment

A Next.js application for conducting learning strategy assessments and storing results in Airtable.

## Features

- Multi-step assessment flow with demographic collection, section ratings, and action planning
- Progress tracking with visual indicators
- Form validation to ensure complete responses
- Results summary with maturity level calculation
- Automatic submission to Airtable
- Responsive UI built with Tailwind CSS and Radix UI components

## Tech Stack

- **Framework**: Next.js with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Data Storage**: Airtable API
- **State Management**: React Context + useReducer
- **Deployment**: Vercel (recommended)

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── api/                # Server-side API routes
│   │   └── submit-assessment/  # Airtable submission endpoint
│   └── layout.tsx          # Root layout component
├── components/             # React components
│   ├── assessment-flow.tsx # Main assessment flow logic
│   ├── DemographicsStep.tsx # User information collection
│   ├── SectionStep.tsx     # Assessment section with questions
│   ├── ActionPlanningStep.tsx # Action planning inputs
│   ├── Header.tsx          # Application header
│   ├── ProgressBar.tsx     # Progress indicator
│   └── types.ts           # TypeScript type definitions
├── lib/                    # Utility functions
│   ├── airtable.ts        # Airtable API integration
│   └── client-api.ts      # Client-side API utilities
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn
- Airtable account with API access

### Installation

1. Clone the repository:
   ```
   git clone git@github.com:sirActon/welearn-assessment.git
   cd welearn-assessment
   ```

2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```
   Note: The `--legacy-peer-deps` flag is required due to a peer dependency conflict between React 19 and the vaul package.

3. Create a `.env.local` file in the project root with your Airtable credentials:
   ```
   AIRTABLE_API_KEY=your_api_key
   AIRTABLE_BASE_ID=your_base_id
   AIRTABLE_TABLE_ID_SUBMISSIONS=your_table_id
   AIRTABLE_TYPECAST=true
   ```
   Refer to `env-example.txt` for all available configuration options.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Airtable Integration

The assessment data is submitted to Airtable using the API route at `/api/submit-assessment`. 

The submission includes:
- Demographic information (name, email)
- Section scores and comments
- Action planning details
- Calculated total score and maturity level

See `airtable-submission-api.md` for detailed field mappings and API documentation.

## Deployment

This project can be deployed to Vercel with minimal configuration:

1. Push your repository to GitHub
2. Connect your repository to Vercel
3. Set the environment variables in the Vercel project settings
4. Deploy the project

## License

This project is private and confidential.

## Contact

For questions or support, please contact the project maintainers.
