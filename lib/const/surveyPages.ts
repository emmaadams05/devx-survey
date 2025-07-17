import { THEMES } from './questions';

export enum PageType {
  Demographics,
  QuestionGrid,
  Text,
}

interface PageConfig {
  page: string;
  title: string;
  description?: string;
  title_description?: string;
  type: PageType;
}

export interface DemographicsPageConfig extends PageConfig {
  type: PageType.Demographics;
  questionIds: Array<string>;
}

export interface QuestionGridPageConfig extends PageConfig {
  type: PageType.QuestionGrid;
  themes: Array<(typeof THEMES)[keyof typeof THEMES]>;
}

export interface TextPageConfig extends PageConfig {
  type: PageType.Text;
  questionIds: Array<string>;
}

export type SurveyPageConfig = DemographicsPageConfig | QuestionGridPageConfig | TextPageConfig;

export const surveyPages: SurveyPageConfig[] = [
    {
        page: 'demographics',
        title: "Demographics",
        description: "Tell us a bit about your work context",
        type: PageType.Demographics,
        questionIds: ['location', 'tech']
    },
    {
        page: 'delivery-flow',
        title: "Delivery & Flow ",
        description: "Rate how important these factors are to your developer experience at Synchrony and how satisfied you are with them.",
        title_description: "refers to the speed and ease with which developers deliver code. This includes daily workflows, deployment frequency, CI/CD efficiency, and the quality of peer reviews.",
        type: PageType.QuestionGrid,
        themes: [
          THEMES.DELIVERY_SPEED,
          THEMES.BUILD_TEST,
          THEMES.DEPLOY_AUTONOMY,
          THEMES.CODE_REVIEW,
          THEMES.SUSTAINABLE_PACE
        ]
    },
    {
        page: 'quality-safety',
        title: "Quality & Safety ",
        description: "Rate how important these factors are to your developer experience at Synchrony and how satisfied you are with them.",
        title_description: "refers to systems and tools that reduce change failure rates. This includes incident response readiness, reliable tooling, and a clear codebase.",
        type: PageType.QuestionGrid,
        themes: [
          THEMES.INCIDENT_RESPONSE,
          THEMES.CODEBASE_CLARITY,
          THEMES.TEST_ENVIRONMENTS,
          THEMES.DEV_TOOLS
        ]
    },
    {
        page: 'team-dynamics',
        title: "Team Dynamics & Well-Being ",
        description: "Rate how important these factors are to your developer experience at Synchrony and how satisfied you are with them.",
        title_description: "refers to team-level conditions that influence developer experience and delivery. This includes operational load, new-hire ramp up time, and more.",
        type: PageType.QuestionGrid,
        themes: [
          THEMES.SECURITY_COMPLIANCE,
          THEMES.ONBOARDING,
          THEMES.MEETINGS_HANDOFFS,
          THEMES.TEAM_COMMUNICATION,
          THEMES.DAY_TO_DAY,
        ]
    },
    {
        page: 'additional-feedback',
        title: "Additional Feedback",
        description: "Please answer all questions before continuing.",
        title_description: ": Share any additional thoughts about your developer experience.",
        type: PageType.Text,
        questionIds: ['biggestFriction', 'bestChange']
    }
];

export const totalPages = surveyPages.length;

// Helper functions for string-based page navigation
export function getPageIndex(pageId: string): number {
  return surveyPages.findIndex(p => p.page === pageId);
}

export function getNextPage(pageId: string): string | null {
  const currentIndex = getPageIndex(pageId);
  if (currentIndex === -1 || currentIndex >= surveyPages.length - 1) {
    return null;
  }
  return surveyPages[currentIndex + 1].page;
}

export function getPreviousPage(pageId: string): string | null {
  const currentIndex = getPageIndex(pageId);
  if (currentIndex <= 0) {
    return null;
  }
  return surveyPages[currentIndex - 1].page;
}

export function calculatePageProgress(pageId: string): number {
  const currentIndex = getPageIndex(pageId);
  if (currentIndex === -1) return 0;
  return Math.round(((currentIndex + 1) / totalPages) * 100);
}

export function isLastPage(pageId: string): boolean {
  const currentIndex = getPageIndex(pageId);
  return currentIndex === surveyPages.length - 1;
} 