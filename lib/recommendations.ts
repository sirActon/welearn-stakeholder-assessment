// Recommendations organized by section and score ranges (stakeholder perception focus)
export const sectionRecommendations = {
  "Alignment to Business Strategy": [
    {
      min: 6,
      max: 14,
      text: "Stakeholders perceive L&D as disconnected from business priorities. L&D should increase engagement with business leaders to understand goals and demonstrate how learning supports outcomes.",
    },
    {
      min: 15,
      max: 22,
      text: "Some alignment is recognized but inconsistent. L&D should formalize stakeholder engagement and communicate how initiatives tie to business KPIs.",
    },
    {
      min: 23,
      max: 30,
      text: "Strong perception of alignment. Continue reinforcing connections between learning and business outcomes through regular communication.",
    },
  ],
  "Learning Governance & Decision-Making": [
    {
      min: 6,
      max: 14,
      text: "Stakeholders find governance unclear or cumbersome. L&D should clarify decision rights, simplify processes, and improve transparency around priorities.",
    },
    {
      min: 15,
      max: 22,
      text: "Governance is recognized but could be more inclusive. L&D should involve stakeholders more consistently in prioritization decisions.",
    },
    {
      min: 23,
      max: 30,
      text: "Governance is perceived as effective. Continue streamlining and ensure stakeholders feel appropriately involved in decisions.",
    },
  ],
  "Technology & Learning Ecosystem Experience": [
    {
      min: 6,
      max: 14,
      text: "Stakeholders find learning tools difficult or disconnected. L&D should prioritize usability improvements and better integration into workflows.",
    },
    {
      min: 15,
      max: 22,
      text: "Tools are functional but not seamless. L&D should focus on improving the connected experience and making data more accessible.",
    },
    {
      min: 23,
      max: 30,
      text: "Strong technology perception. Continue exploring modern approaches and ensure tools remain workflow-friendly.",
    },
  ],
  "Content & Learning Experience Quality": [
    {
      min: 6,
      max: 14,
      text: "Stakeholders find content lacking relevance or engagement. L&D should gather feedback on content needs and refresh outdated materials.",
    },
    {
      min: 15,
      max: 22,
      text: "Content is adequate but could be more practical. L&D should focus on role-relevance and engaging formats.",
    },
    {
      min: 23,
      max: 30,
      text: "Content is perceived as high quality. Continue curating and refreshing to maintain relevance and engagement.",
    },
  ],
  "Measurement, Impact & Communication": [
    {
      min: 6,
      max: 14,
      text: "Stakeholders don't see clear evidence of L&D impact. L&D should improve how outcomes are measured and communicated to leadership.",
    },
    {
      min: 15,
      max: 22,
      text: "Some impact visibility exists but is inconsistent. L&D should share insights more regularly and connect learning to business results.",
    },
    {
      min: 23,
      max: 30,
      text: "Strong perception of impact communication. Continue demonstrating value through clear, consistent reporting.",
    },
  ],
  "Culture, Change & Organizational Readiness": [
    {
      min: 6,
      max: 14,
      text: "Stakeholders don't see L&D as embedded in culture or change. L&D should partner more visibly on transformation initiatives and support leaders as learning champions.",
    },
    {
      min: 15,
      max: 22,
      text: "Some cultural support is recognized but uneven. L&D should strengthen integration with performance conversations and change initiatives.",
    },
    {
      min: 23,
      max: 30,
      text: "Strong perception of cultural integration. Continue supporting leaders and embedding learning in growth conversations.",
    },
  ],
};

// Map section keys from the assessment to the recommendation keys
export const sectionKeyToRecommendationKey = {
  alignment: "Alignment to Business Strategy",
  governance: "Learning Governance & Decision-Making",
  technology: "Technology & Learning Ecosystem Experience",
  content: "Content & Learning Experience Quality",
  measurement: "Measurement, Impact & Communication",
  culture: "Culture, Change & Organizational Readiness",
};

// Maturity level recommendations based on stakeholder perception
export const maturityLevelRecommendations = {
  Reactive: {
    title: "Addressing Perception Gaps",
    items: [
      "Increase visibility of L&D's connection to business priorities",
      "Improve communication about learning initiatives and their purpose",
      "Gather more stakeholder input on learning needs and priorities",
      "Demonstrate quick wins that show L&D responsiveness",
    ],
  },
  Operational: {
    title: "Strengthening Stakeholder Confidence",
    items: [
      "Formalize stakeholder engagement in learning prioritization",
      "Improve how L&D impact is measured and communicated",
      "Ensure learning content stays relevant and practical",
      "Involve stakeholders more consistently in governance decisions",
    ],
  },
  Strategic: {
    title: "Deepening Strategic Partnership",
    items: [
      "Position L&D as a proactive partner in business planning",
      "Share insights that help stakeholders make better decisions",
      "Continue innovating with technology and personalization",
      "Strengthen L&D's role in change and transformation initiatives",
    ],
  },
  Transformational: {
    title: "Sustaining Excellence",
    items: [
      "Maintain strong stakeholder relationships and communication",
      "Continue demonstrating clear business impact",
      "Lead innovation in learning approaches and technology",
      "Serve as a model for L&D excellence across the organization",
    ],
  },
};

/**
 * Gets the specific recommendation for a section based on its score
 * @param sectionKey The key of the section from the assessment data
 * @param sectionScore The score achieved in that section
 * @returns The relevant recommendation text for that section score
 */
export function getSectionRecommendation(
  sectionKey: string,
  sectionScore: number
): string {
  const recommendationKey =
    sectionKeyToRecommendationKey[
      sectionKey as keyof typeof sectionKeyToRecommendationKey
    ];
  if (!recommendationKey) return "";

  const recommendations =
    sectionRecommendations[
      recommendationKey as keyof typeof sectionRecommendations
    ];
  if (!recommendations) return "";

  // Find the applicable recommendation based on score range
  const recommendation = recommendations.find(
    (rec) => sectionScore >= rec.min && sectionScore <= rec.max
  );

  return recommendation?.text || "";
}
