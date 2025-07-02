import type { LikertScale } from "../const/questions";

// Original survey answers type matching the question IDs
export type SurveyAnswers = {
  location: string;
  tech: string[];
  dayToDayImpact: LikertScale;
  dayToDaySatisfaction: LikertScale;
  deliverySpeedImpact: LikertScale;
  deliverySpeedSatisfaction: LikertScale;
  buildTestImpact: LikertScale;
  buildTestSatisfaction: LikertScale;
  codeReviewImpact: LikertScale;
  codeReviewSatisfaction: LikertScale;
  incidentResponseImpact: LikertScale;
  incidentResponseSatisfaction: LikertScale;
  codebaseClarityImpact: LikertScale;
  codebaseClaritySatisfaction: LikertScale;
  devToolsImpact: LikertScale;
  devToolsSatisfaction: LikertScale;
  devEnvironmentsImpact: LikertScale;
  devEnvironmentsSatisfaction: LikertScale;
  deployAutonomyImpact: LikertScale;
  deployAutonomySatisfaction: LikertScale;
  securityComplianceImpact: LikertScale;
  securityComplianceSatisfaction: LikertScale;
  onboardingImpact: LikertScale;
  onboardingSatisfaction: LikertScale;
  meetingsHandoffsImpact: LikertScale;
  meetingsHandoffsSatisfaction: LikertScale;
  sustainablePaceImpact: LikertScale;
  sustainablePaceSatisfaction: LikertScale;
  biggestFriction: string;
  bestChange: string;
};

// More specific types for different stages of the survey
export type DemographicAnswers = Pick<SurveyAnswers, 'location' | 'tech'>;

export type LikertAnswers = Pick<SurveyAnswers, 
  | 'dayToDayImpact' | 'dayToDaySatisfaction'
  | 'deliverySpeedImpact' | 'deliverySpeedSatisfaction'
  | 'buildTestImpact' | 'buildTestSatisfaction'
  | 'codeReviewImpact' | 'codeReviewSatisfaction'
  | 'incidentResponseImpact' | 'incidentResponseSatisfaction'
  | 'codebaseClarityImpact' | 'codebaseClaritySatisfaction'
  | 'devToolsImpact' | 'devToolsSatisfaction'
  | 'devEnvironmentsImpact' | 'devEnvironmentsSatisfaction'
  | 'deployAutonomyImpact' | 'deployAutonomySatisfaction'
  | 'securityComplianceImpact' | 'securityComplianceSatisfaction'
  | 'onboardingImpact' | 'onboardingSatisfaction'
  | 'meetingsHandoffsImpact' | 'meetingsHandoffsSatisfaction'
  | 'sustainablePaceImpact' | 'sustainablePaceSatisfaction'
>;

export type TextAnswers = Pick<SurveyAnswers, 'biggestFriction' | 'bestChange'>;

export type Answers = Partial<SurveyAnswers>;
export type SaveAnswer = <K extends keyof SurveyAnswers>(id: K, value: SurveyAnswers[K]) => void;

// Type guards
export function isLikertAnswer(value: unknown): value is LikertScale {
  return typeof value === 'number' && value >= 1 && value <= 5;
}

export function isDemographicAnswer(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isTextAnswer(value: unknown): value is string {
  return typeof value === 'string';
}

export function isArrayAnswer(value: unknown): value is string[] {
  return Array.isArray(value);
}