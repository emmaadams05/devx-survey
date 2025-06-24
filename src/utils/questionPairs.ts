import type { Question } from "../const/questions";
import { GRID_TITLES, THEMES } from "../const/questions";

export interface QuestionPair {
  title: string;
  impactQuestion: Question;
  satisfactionQuestion: Question;
}

export function createQuestionPairs(questions: Question[]): QuestionPair[] {
  const pairs: QuestionPair[] = [];
  
  // Group questions by theme, excluding demographics and text questions
  const themeGroups = new Map<string, Question[]>();
  
  questions
    .filter(q => q.scale === "impact" || q.scale === "satisfaction")
    .forEach(question => {
      if (!themeGroups.has(question.theme)) {
        themeGroups.set(question.theme, []);
      }
      themeGroups.get(question.theme)!.push(question);
    });

  // Create pairs from each theme group
  themeGroups.forEach((themeQuestions, theme) => {
    const impactQ = themeQuestions.find(q => q.scale === "impact");
    const satisfactionQ = themeQuestions.find(q => q.scale === "satisfaction");
    
    if (impactQ && satisfactionQ) {
      // Use the descriptive title from GRID_TITLES
      const title = GRID_TITLES[theme as keyof typeof GRID_TITLES] || theme;
      pairs.push({
        title,
        impactQuestion: impactQ,
        satisfactionQuestion: satisfactionQ
      });
    }
  });

  return pairs;
}

// New functions for the three DevEx page groups
export function createDeliveryFlowPairs(questions: Question[]): QuestionPair[] {
  const targetThemes = [
    THEMES.DELIVERY_SPEED,
    THEMES.BUILD_TEST, 
    THEMES.DEV_TOOLS,
    THEMES.DEPLOY_AUTONOMY
  ];
  
  return createPairsForThemes(questions, targetThemes);
}

export function createQualitySafetyPairs(questions: Question[]): QuestionPair[] {
  const targetThemes = [
    THEMES.CODE_REVIEW,
    THEMES.INCIDENT_RESPONSE,
    THEMES.SECURITY_COMPLIANCE,
    THEMES.CODEBASE_CLARITY,
    THEMES.TEST_ENVIRONMENTS
  ];
  
  return createPairsForThemes(questions, targetThemes);
}

export function createTeamDynamicsPairs(questions: Question[]): QuestionPair[] {
  const targetThemes = [
    THEMES.DAY_TO_DAY,
    THEMES.ONBOARDING,
    THEMES.MEETINGS_HANDOFFS,
    THEMES.SUSTAINABLE_PACE
  ];
  
  return createPairsForThemes(questions, targetThemes);
}

function createPairsForThemes(questions: Question[], themes: string[]): QuestionPair[] {
  const pairs: QuestionPair[] = [];
  
  themes.forEach(theme => {
    const themeQuestions = questions.filter(q => 
      q.theme === theme && (q.scale === "impact" || q.scale === "satisfaction")
    );
    
    const impactQ = themeQuestions.find(q => q.scale === "impact");
    const satisfactionQ = themeQuestions.find(q => q.scale === "satisfaction");
    
    if (impactQ && satisfactionQ) {
      const title = GRID_TITLES[theme as keyof typeof GRID_TITLES] || theme;
      pairs.push({
        title,
        impactQuestion: impactQ,
        satisfactionQuestion: satisfactionQ
      });
    }
  });
  
  return pairs;
} 