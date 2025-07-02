import { THEMES } from './questions';

export enum PageType {
  Demographics,
  QuestionGrid,
  Text,
}

interface PageConfig {
  page: string;
  title: string;
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
        type: PageType.Demographics,
        questionIds: ['location', 'tech']
    },
    {
        page: 'delivery-flow',
        title: "Delivery & Flow",
        type: PageType.QuestionGrid,
        themes: [
          THEMES.DAY_TO_DAY,
          THEMES.DELIVERY_SPEED,
          THEMES.BUILD_TEST,
          THEMES.CODE_REVIEW
        ]
    },
    {
        page: 'quality-safety',
        title: "Quality & Safety",
        type: PageType.QuestionGrid,
        themes: [
          THEMES.INCIDENT_RESPONSE,
          THEMES.CODEBASE_CLARITY,
          THEMES.DEV_TOOLS,
          THEMES.TEST_ENVIRONMENTS
        ]
    },
    {
        page: 'team-dynamics',
        title: "Team Dynamics & Well-being",
        type: PageType.QuestionGrid,
        themes: [
          THEMES.DEPLOY_AUTONOMY,
          THEMES.SECURITY_COMPLIANCE,
          THEMES.ONBOARDING,
          THEMES.MEETINGS_HANDOFFS,
          THEMES.SUSTAINABLE_PACE
        ]
    },
    {
        page: 'additional-feedback',
        title: "Additional Feedback",
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