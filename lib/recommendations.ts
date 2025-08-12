// Recommendations organized by section and score ranges
export const sectionRecommendations = {
  "Alignment to Business Strategy": [
    {
      min: 6, 
      max: 14, 
      text: "Learning is not consistently linked to business priorities. Meet with senior leaders to identify 2–3 goals learning should support; document the linkage and define success metrics."
    },
    {
      min: 15, 
      max: 22, 
      text: "Some alignment exists but is informal. Create a lightweight intake + prioritization process tied to KPIs and review alignment quarterly."
    },
    {
      min: 23, 
      max: 30, 
      text: "Strong alignment. Revisit goals each quarter and add outcome measures (productivity, retention, speed-to-competency)."
    }
  ],
  "Learning Governance": [
    {
      min: 6, 
      max: 14, 
      text: "Introduce a basic governance model: clarify roles, decision rights, and approval steps; create a single backlog and cadence for prioritization."
    },
    {
      min: 15, 
      max: 22, 
      text: "Tighten consistency. Publish a RACI, streamline approvals, and add a monthly portfolio review with cross-functional stakeholders."
    },
    {
      min: 23, 
      max: 30, 
      text: "Governance is working. Guard against bottlenecks—run periodic retros to simplify steps and keep space for experimentation."
    }
  ],
  "Technology & Ecosystem Integration": [
    {
      min: 6, 
      max: 14, 
      text: "Stack appears fragmented or underused. Run a tool audit, remove redundancies, and define 2–3 critical integrations (LMS/LXP ↔ HRIS/BI)."
    },
    {
      min: 15, 
      max: 22, 
      text: "Tools are in place but not fully connected. Prioritize interoperability, single sign-on, skill-tagging, and consistent data flows."
    },
    {
      min: 23, 
      max: 30, 
      text: "Well-integrated ecosystem. Pilot AI-driven recommendations, xAPI data streams, and analytics to personalize experiences."
    }
  ],
  "Content & Experience Strategy": [
    {
      min: 6, 
      max: 14, 
      text: "Quality and relevance vary. Establish design standards, accessibility checks, and map content to roles/skills and moments of need."
    },
    {
      min: 15, 
      max: 22, 
      text: "Good base, but increase engagement and personalization. Add scenarios, practice/feedback loops, and curated pathways."
    },
    {
      min: 23, 
      max: 30, 
      text: "Advanced strategy. Test adaptive learning, micro-credentials, and cohort/social layers to deepen impact."
    }
  ],
  "Measurement & Analytics": [
    {
      min: 6, 
      max: 14, 
      text: "Move beyond completions. Define measurable objectives and track application, behavior change, and business outcomes."
    },
    {
      min: 15, 
      max: 22, 
      text: "You collect data—now use it. Build stakeholder dashboards that connect learning signals to performance KPIs."
    },
    {
      min: 23, 
      max: 30, 
      text: "Strong analytics. Explore predictive insights and data storytelling to influence decisions and funding."
    }
  ],
  "Culture & Change Readiness": [
    {
      min: 6, 
      max: 14, 
      text: "Learning isn't embedded yet. Secure leadership signals (role-modeling, recognition) and create visible campaigns for participation."
    },
    {
      min: 15, 
      max: 22, 
      text: "Supportive culture but inconsistent. Tie learning to performance conversations and highlight success stories regularly."
    },
    {
      min: 23, 
      max: 30, 
      text: "Strong culture. Scale mentoring/peer learning, managers-as-coaches, and link skills growth to internal mobility."
    }
  ]
};

// Map section keys from the assessment to the recommendation keys
export const sectionKeyToRecommendationKey = {
  "alignment": "Alignment to Business Strategy",
  "governance": "Learning Governance",
  "technology": "Technology & Ecosystem Integration",
  "content": "Content & Experience Strategy", 
  "measurement": "Measurement & Analytics",
  "culture": "Culture & Change Readiness"
};

// Legacy maturity level recommendations for backwards compatibility
export const maturityLevelRecommendations = {
  "Reactive": {
    title: "Building Your Foundation",
    items: [
      "Develop a formal learning strategy document",
      "Secure leadership buy-in and support",
      "Establish basic learning processes and workflows",
      "Begin tracking fundamental learning metrics",
    ],
  },
  "Operational": {
    title: "Expanding Your Capabilities",
    items: [
      "Align learning initiatives with business objectives",
      "Implement systematic measurement and evaluation",
      "Develop a more diverse learning content portfolio",
      "Strengthen manager engagement in learning",
    ],
  },
  "Strategic": {
    title: "Driving Innovation",
    items: [
      "Experiment with emerging learning technologies",
      "Develop predictive analytics capabilities",
      "Create personalized learning experiences",
      "Build a culture of continuous learning",
    ],
  },
  "Transformational": {
    title: "Leading the Way",
    items: [
      "Share best practices with the industry",
      "Mentor other organizations in their learning journey",
      "Continue pushing the boundaries of learning innovation",
      "Maintain your competitive advantage through learning",
    ],
  },
};

/**
 * Gets the specific recommendation for a section based on its score
 * @param sectionKey The key of the section from the assessment data
 * @param sectionScore The score achieved in that section
 * @returns The relevant recommendation text for that section score
 */
export function getSectionRecommendation(sectionKey: string, sectionScore: number): string {
  const recommendationKey = sectionKeyToRecommendationKey[sectionKey as keyof typeof sectionKeyToRecommendationKey];
  if (!recommendationKey) return "";
  
  const recommendations = sectionRecommendations[recommendationKey as keyof typeof sectionRecommendations];
  if (!recommendations) return "";

  // Find the applicable recommendation based on score range
  const recommendation = recommendations.find(
    rec => sectionScore >= rec.min && sectionScore <= rec.max
  );

  return recommendation?.text || "";
}
