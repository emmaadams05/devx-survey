import type { Question } from "../const/questions";
import { THEMES } from "../const/questions";

export interface QuestionPair {
  impactQuestion: Question;
  satisfactionQuestion: Question;
  theme: string;
}

export function createDeliveryFlowPairs(questions: Question[]): QuestionPair[] {
  const themes = [THEMES.DAY_TO_DAY, THEMES.DELIVERY_SPEED, THEMES.BUILD_TEST];
  return createPairsForThemes(questions, themes);
}

export function createQualitySafetyPairs(questions: Question[]): QuestionPair[] {
  const themes = [THEMES.CODE_REVIEW, THEMES.INCIDENT_RESPONSE, THEMES.CODEBASE_CLARITY, THEMES.DEV_TOOLS];
  return createPairsForThemes(questions, themes);
}

export function createTeamDynamicsPairs(questions: Question[]): QuestionPair[] {
  const themes = [THEMES.TEST_ENVIRONMENTS, THEMES.DEPLOY_AUTONOMY, THEMES.SECURITY_COMPLIANCE, THEMES.ONBOARDING, THEMES.MEETINGS_HANDOFFS, THEMES.SUSTAINABLE_PACE];
  return createPairsForThemes(questions, themes);
}

export function createPairsForThemes(questions: Question[], themes: string[]): QuestionPair[] {
  return themes.map(theme => {
    const impactQuestion = questions.find(q => q.theme === theme && q.scale === "impact");
    const satisfactionQuestion = questions.find(q => q.theme === theme && q.scale === "satisfaction");
    
    if (!impactQuestion || !satisfactionQuestion) {
      throw new Error(`Missing impact or satisfaction question for theme: ${theme}`);
    }
    
    return {
      impactQuestion,
      satisfactionQuestion,
      theme
    };
  });
} 