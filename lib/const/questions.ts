export type LikertScale = 1 | 2 | 3 | 4 | 5;

export enum QuestionComponentType {
  Radio,
  Checkbox,
  Textarea,
  Likert,
}

export interface Question {
  id: string;             // e.g., "dayToDayImpact"
  text?: string;
  scale: "impact" | "satisfaction" | "demographic" | "text";
  theme: (typeof THEMES)[keyof typeof THEMES];
  component: QuestionComponentType;
  options?: string[];
}

// Theme constants to ensure consistency
export const THEMES = {
  DEMOGRAPHICS: "Demographics",
  DAY_TO_DAY: "Day‑to‑day Experience",
  DELIVERY_SPEED: "Delivery Speed", 
  BUILD_TEST: "Build/Test Flow",
  CODE_REVIEW: "Code Review",
  INCIDENT_RESPONSE: "Incident Response",
  CODEBASE_CLARITY: "Codebase Clarity",
  DEV_TOOLS: "Dev Tools",
  TEST_ENVIRONMENTS: "Test Environments",
  DEPLOY_AUTONOMY: "Deploy Autonomy",
  SECURITY_COMPLIANCE: "Security & Compliance",
  ONBOARDING: "Onboarding",
  MEETINGS_HANDOFFS: "Meetings & Hand‑offs",
  SUSTAINABLE_PACE: "Sustainable Pace",
  MORE_DETAIL: "More Detail"
} as const;

// Descriptive titles for the grid display
export const GRID_TITLES = {
  [THEMES.DAY_TO_DAY]: "Day-to-day dev work is satisfying.",
  [THEMES.DELIVERY_SPEED]: "We ship code quickly and predictably.",
  [THEMES.BUILD_TEST]: "Build/test cycles rarely break our flow.",
  [THEMES.CODE_REVIEW]: "Code reviews complete fast enough to keep momentum.",
  [THEMES.INCIDENT_RESPONSE]: "We detect & fix prod issues quickly.",
  [THEMES.CODEBASE_CLARITY]: "Our codebase & architecture are easy to understand.",
  [THEMES.DEV_TOOLS]: "Dev tools are reliable and easy to use.",
  [THEMES.TEST_ENVIRONMENTS]: "Test environments are stable and fast.",
  [THEMES.DEPLOY_AUTONOMY]: "We can deploy without waiting on other teams.",
  [THEMES.SECURITY_COMPLIANCE]: "Security/compliance steps feel streamlined.",
  [THEMES.ONBOARDING]: "New engineers become productive quickly.",
  [THEMES.MEETINGS_HANDOFFS]: "Meetings & hand-offs feel worth the time.",
  [THEMES.SUSTAINABLE_PACE]: "Our delivery pace is sustainable."
} as const;

/**
 * Descriptive Likert labels used by the UI for impact and satisfaction scales.
 * Index 0 corresponds to value 1 and index 4 to value 5.
 */
export const SCALE_LABELS: Record<"impact" | "satisfaction", [string, string, string, string, string]> = {
  impact: [
    "Not Important",
    "Slightly Important",
    "Moderately Important",
    "Very Important",
    "Critically Important"
  ],
  satisfaction: [
    "Very Dissatisfied",
    "Dissatisfied",
    "Neutral",
    "Satisfied",
    "Very Satisfied"
  ]
};

export const questions: Question[] = [
  // --- Demographics ---
  { id: "location", text: "Where are you primarily located?", scale: "demographic", theme: THEMES.DEMOGRAPHICS, component: QuestionComponentType.Radio, options: ["US/Canada", "Asia", "Central/South America", "Other"] },
  {
    id: "tech",
    text: "Which technology areas do you primarily work in?",
    scale: "demographic",
    theme: THEMES.DEMOGRAPHICS,
    component: QuestionComponentType.Checkbox,
    options: [
      "Microservices",
      "Databases", 
      "Modern frontend (CSR)",
      "Modern frontend (SSR)",
      "Legacy frontend (JSP)",
      "Experience/API layer",
      "Android",
      "iOS",
      "Python Backend",
      "Cypress Automation",
      "Selenium Automation"
    ]
  },

  // --- Core DevEx items ---
  // Main grid questions use generated titles from GRID_TITLES
  {
    id: "dayToDayImpact",
    scale: "impact",
    theme: THEMES.DAY_TO_DAY,
    component: QuestionComponentType.Likert
  },
  {
    id: "dayToDaySatisfaction",
    scale: "satisfaction",
    theme: THEMES.DAY_TO_DAY,
    component: QuestionComponentType.Likert
  },

  {
    id: "deliverySpeedImpact",
    scale: "impact",
    theme: THEMES.DELIVERY_SPEED,
    component: QuestionComponentType.Likert
  },
  {
    id: "deliverySpeedSatisfaction",
    scale: "satisfaction",
    theme: THEMES.DELIVERY_SPEED,
    component: QuestionComponentType.Likert
  },

  {
    id: "buildTestImpact",
    scale: "impact",
    theme: THEMES.BUILD_TEST,
    component: QuestionComponentType.Likert
  },
  {
    id: "buildTestSatisfaction",
    scale: "satisfaction",
    theme: THEMES.BUILD_TEST,
    component: QuestionComponentType.Likert
  },

  {
    id: "codeReviewImpact",
    scale: "impact",
    theme: THEMES.CODE_REVIEW,
    component: QuestionComponentType.Likert
  },
  {
    id: "codeReviewSatisfaction",
    scale: "satisfaction",
    theme: THEMES.CODE_REVIEW,
    component: QuestionComponentType.Likert
  },

  {
    id: "incidentResponseImpact",
    scale: "impact",
    theme: THEMES.INCIDENT_RESPONSE,
    component: QuestionComponentType.Likert
  },
  {
    id: "incidentResponseSatisfaction",
    scale: "satisfaction",
    theme: THEMES.INCIDENT_RESPONSE,
    component: QuestionComponentType.Likert
  },

  {
    id: "codebaseClarityImpact",
    scale: "impact",
    theme: THEMES.CODEBASE_CLARITY,
    component: QuestionComponentType.Likert
  },
  {
    id: "codebaseClaritySatisfaction",
    scale: "satisfaction",
    theme: THEMES.CODEBASE_CLARITY,
    component: QuestionComponentType.Likert
  },

  {
    id: "devToolsImpact",
    scale: "impact",
    theme: THEMES.DEV_TOOLS,
    component: QuestionComponentType.Likert
  },
  {
    id: "devToolsSatisfaction",
    scale: "satisfaction",
    theme: THEMES.DEV_TOOLS,
    component: QuestionComponentType.Likert
  },

  {
    id: "devEnvironmentsImpact",
    scale: "impact",
    theme: THEMES.TEST_ENVIRONMENTS,
    component: QuestionComponentType.Likert
  },
  {
    id: "devEnvironmentsSatisfaction",
    scale: "satisfaction",
    theme: THEMES.TEST_ENVIRONMENTS,
    component: QuestionComponentType.Likert
  },

  {
    id: "deployAutonomyImpact",
    scale: "impact",
    theme: THEMES.DEPLOY_AUTONOMY,
    component: QuestionComponentType.Likert
  },
  {
    id: "deployAutonomySatisfaction",
    scale: "satisfaction",
    theme: THEMES.DEPLOY_AUTONOMY,
    component: QuestionComponentType.Likert
  },

  {
    id: "securityComplianceImpact",
    scale: "impact",
    theme: THEMES.SECURITY_COMPLIANCE,
    component: QuestionComponentType.Likert
  },
  {
    id: "securityComplianceSatisfaction",
    scale: "satisfaction",
    theme: THEMES.SECURITY_COMPLIANCE,
    component: QuestionComponentType.Likert
  },

  {
    id: "onboardingImpact",
    scale: "impact",
    theme: THEMES.ONBOARDING,
    component: QuestionComponentType.Likert
  },
  {
    id: "onboardingSatisfaction",
    scale: "satisfaction",
    theme: THEMES.ONBOARDING,
    component: QuestionComponentType.Likert
  },

  {
    id: "meetingsHandoffsImpact",
    scale: "impact",
    theme: THEMES.MEETINGS_HANDOFFS,
    component: QuestionComponentType.Likert
  },
  {
    id: "meetingsHandoffsSatisfaction",
    scale: "satisfaction",
    theme: THEMES.MEETINGS_HANDOFFS,
    component: QuestionComponentType.Likert
  },

  {
    id: "sustainablePaceImpact",
    scale: "impact",
    theme: THEMES.SUSTAINABLE_PACE,
    component: QuestionComponentType.Likert
  },
  {
    id: "sustainablePaceSatisfaction",
    scale: "satisfaction",
    theme: THEMES.SUSTAINABLE_PACE,
    component: QuestionComponentType.Likert
  },

  // --- Text Questions ---
  {
    id: "biggestFriction",
    text: "What's your biggest friction point in the development process?",
    scale: "text",
    theme: THEMES.MORE_DETAIL,
    component: QuestionComponentType.Textarea
  },
  {
    id: "bestChange",
    text: "What one change would most improve your developer experience?",
    scale: "text",
    theme: THEMES.MORE_DETAIL,
    component: QuestionComponentType.Textarea
  }
];

export const questionsById = questions.reduce<Record<string, Question>>((acc, q) => {
  acc[q.id] = q;
  return acc;
}, {}); 