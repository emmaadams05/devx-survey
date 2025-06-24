export type LikertScale = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;             // e.g., "day_to_day_impact"
  text?: string;
  scale: "impact" | "satisfaction" | "demographic" | "text";
  theme: string;              // grouping title shown by UI
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
  { id: "location", text: "Where are you primarily located?", scale: "demographic", theme: THEMES.DEMOGRAPHICS },
  {
    id: "tech",
    text: "Which technology areas do you primarily work in?",
    scale: "demographic",
    theme: THEMES.DEMOGRAPHICS
  },

  // --- Core DevEx items ---
  // Main grid questions use generated titles from GRID_TITLES
  {
    id: "day_to_day_impact",
    scale: "impact",
    theme: THEMES.DAY_TO_DAY
  },
  {
    id: "day_to_day_satisfaction",
    scale: "satisfaction",
    theme: THEMES.DAY_TO_DAY
  },

  {
    id: "delivery_speed_impact",
    scale: "impact",
    theme: THEMES.DELIVERY_SPEED
  },
  {
    id: "delivery_speed_satisfaction",
    scale: "satisfaction",
    theme: THEMES.DELIVERY_SPEED
  },

  {
    id: "build_test_impact",
    scale: "impact",
    theme: THEMES.BUILD_TEST
  },
  {
    id: "build_test_satisfaction",
    scale: "satisfaction",
    theme: THEMES.BUILD_TEST
  },

  {
    id: "code_review_impact",
    scale: "impact",
    theme: THEMES.CODE_REVIEW
  },
  {
    id: "code_review_satisfaction",
    scale: "satisfaction",
    theme: THEMES.CODE_REVIEW
  },

  {
    id: "incident_response_impact",
    scale: "impact",
    theme: THEMES.INCIDENT_RESPONSE
  },
  {
    id: "incident_response_satisfaction",
    scale: "satisfaction",
    theme: THEMES.INCIDENT_RESPONSE
  },

  {
    id: "codebase_clarity_impact",
    scale: "impact",
    theme: THEMES.CODEBASE_CLARITY
  },
  {
    id: "codebase_clarity_satisfaction",
    scale: "satisfaction",
    theme: THEMES.CODEBASE_CLARITY
  },

  {
    id: "dev_tools_impact",
    scale: "impact",
    theme: THEMES.DEV_TOOLS
  },
  {
    id: "dev_tools_satisfaction",
    scale: "satisfaction",
    theme: THEMES.DEV_TOOLS
  },

  {
    id: "dev_environments_impact",
    scale: "impact",
    theme: THEMES.TEST_ENVIRONMENTS
  },
  {
    id: "dev_environments_satisfaction",
    scale: "satisfaction",
    theme: THEMES.TEST_ENVIRONMENTS
  },

  {
    id: "deploy_autonomy_impact",
    scale: "impact",
    theme: THEMES.DEPLOY_AUTONOMY
  },
  {
    id: "deploy_autonomy_satisfaction",
    scale: "satisfaction",
    theme: THEMES.DEPLOY_AUTONOMY
  },

  {
    id: "security_compliance_impact",
    scale: "impact",
    theme: THEMES.SECURITY_COMPLIANCE
  },
  {
    id: "security_compliance_satisfaction",
    scale: "satisfaction",
    theme: THEMES.SECURITY_COMPLIANCE
  },

  {
    id: "onboarding_impact",
    scale: "impact",
    theme: THEMES.ONBOARDING
  },
  {
    id: "onboarding_satisfaction",
    scale: "satisfaction",
    theme: THEMES.ONBOARDING
  },

  {
    id: "meetings_handoffs_impact",
    scale: "impact",
    theme: THEMES.MEETINGS_HANDOFFS
  },
  {
    id: "meetings_handoffs_satisfaction",
    scale: "satisfaction",
    theme: THEMES.MEETINGS_HANDOFFS
  },

  {
    id: "sustainable_pace_impact",
    scale: "impact",
    theme: THEMES.SUSTAINABLE_PACE
  },
  {
    id: "sustainable_pace_satisfaction",
    scale: "satisfaction",
    theme: THEMES.SUSTAINABLE_PACE
  },

  // --- Qualitative ---
  {
    id: "q_biggest_friction",
    text: "What is the single biggest developer friction you hit in the last sprint?",
    scale: "text",
    theme: THEMES.MORE_DETAIL
  },
  {
    id: "q_best_change",
    text: "Describe one change that noticeably improved flow recently.",
    scale: "text",
    theme: THEMES.MORE_DETAIL
  }
];